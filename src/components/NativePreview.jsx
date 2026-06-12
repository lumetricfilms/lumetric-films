import { useCallback, useEffect, useRef, useState } from 'react';
import { hoverCapable, prefersReducedMotion } from '../lib/media.js';
import { posterFor } from '../lib/video.js';

// Self-hosted twin of the YouTube preview: plays a silent, looping preview of
// the start..end segment of `video.src`. (`cover` needs no special handling —
// object-cover fills both tile layouts.) When `scrub` (desktop only), moving
// the pointer across the tile scrubs through the full clip. `suspended`
// pauses the preview while the lightbox is open. The <video> element only
// mounts near the viewport and unmounts off screen, releasing its buffers
// like the YT player teardown.
export default function NativePreview({ video, scrub = false, muted = true, suspended = false }) {
  const { src, start = 0, end } = video;

  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const wantPlayRef = useRef(false);
  const scrubbingRef = useRef(false);
  const lastScrubRef = useRef(-1);
  const suspendedRef = useRef(suspended);
  const visibleWantRef = useRef(false);

  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);

  const shouldInit = near && !prefersReducedMotion();
  const scrubEnabled = scrub && hoverCapable();

  useEffect(() => {
    const el = videoRef.current;
    if (el) el.muted = muted;
  }, [muted, shouldInit]);

  const stopPreview = useCallback(() => {
    wantPlayRef.current = false;
    videoRef.current?.pause();
    setPlaying(false);
  }, []);

  const startPreview = useCallback(() => {
    if (prefersReducedMotion() || suspendedRef.current) return;
    wantPlayRef.current = true;
    if (scrubbingRef.current) return;
    const el = videoRef.current;
    if (!el) return;
    // Before metadata arrives seeking throws; loadedmetadata below retries.
    if (el.readyState >= HTMLMediaElement.HAVE_METADATA) {
      try {
        el.currentTime = start;
      } catch {
        // ignore
      }
    }
    el.play().catch(() => {
      // autoplay rejected (e.g. data-saver); the poster simply stays
    });
  }, [start]);

  // Mount the element when near the viewport (250px margin), like the YT path.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        setNear(entry.isIntersecting);
      },
      { rootMargin: '250px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play while >=50% visible, pause otherwise.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wantVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
          visibleWantRef.current = wantVisible;
          if (wantVisible) startPreview();
          else stopPreview();
        });
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startPreview, stopPreview]);

  // Pause while suspended (lightbox open); resume if still in view after.
  useEffect(() => {
    suspendedRef.current = suspended;
    if (suspended) stopPreview();
    else if (visibleWantRef.current) startPreview();
  }, [suspended, startPreview, stopPreview]);

  // Loop the preview stamp: jump back to `start` when passing `end`.
  const handleTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el || scrubbingRef.current || !wantPlayRef.current) return;
    if (typeof end === 'number' && el.currentTime >= end - 0.1) {
      try {
        el.currentTime = start;
      } catch {
        // ignore
      }
    }
  }, [start, end]);

  const handleEnded = useCallback(() => {
    const el = videoRef.current;
    if (!el || scrubbingRef.current || !wantPlayRef.current) return;
    try {
      el.currentTime = start;
    } catch {
      // ignore
    }
    el.play().catch(() => {});
  }, [start]);

  const handleLoadedMetadata = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    try {
      el.currentTime = start;
    } catch {
      // ignore
    }
    if (wantPlayRef.current && !scrubbingRef.current) el.play().catch(() => {});
  }, [start]);

  const handlePointerMove = useCallback((event) => {
    const host = containerRef.current;
    const el = videoRef.current;
    if (!host || !el) return;
    const rect = host.getBoundingClientRect();
    if (rect.width <= 0) return;
    const frac = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    if (!scrubbingRef.current) {
      scrubbingRef.current = true;
      el.pause();
    }
    const { duration } = el;
    if (!duration || !Number.isFinite(duration)) return;
    if (Math.abs(frac - lastScrubRef.current) < 0.012) return;
    lastScrubRef.current = frac;
    try {
      el.currentTime = frac * duration;
    } catch {
      // ignore
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (!scrubbingRef.current) return;
    scrubbingRef.current = false;
    lastScrubRef.current = -1;
    const el = videoRef.current;
    if (!el) return;
    try {
      el.currentTime = start;
    } catch {
      // ignore
    }
    if (wantPlayRef.current) el.play().catch(() => {});
  }, [start]);

  return (
    <div
      ref={containerRef}
      className="live-preview absolute inset-0"
      aria-hidden="true"
      onPointerMove={scrubEnabled ? handlePointerMove : undefined}
      onPointerLeave={scrubEnabled ? handlePointerLeave : undefined}
    >
      <img
        src={posterFor(video)}
        alt=""
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          playing ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {shouldInit ? (
        <video
          ref={videoRef}
          src={src}
          preload="metadata"
          muted
          playsInline
          tabIndex={-1}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={handleLoadedMetadata}
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : null}
    </div>
  );
}
