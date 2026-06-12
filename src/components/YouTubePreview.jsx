import { useCallback, useEffect, useRef, useState } from 'react';
import { loadYouTubeApi, thumbnailUrl } from '../lib/youtube.js';
import { hoverCapable, prefersReducedMotion } from '../lib/media.js';

// Plays a silent, looping preview of a start..end segment, scaled to cover the
// tile when `cover`. When `scrub` (desktop only), moving the pointer across the
// tile scrubs through the full clip. `muted` can be toggled live. `suspended`
// pauses the preview while something else (the lightbox) is playing. Player is
// created lazily and torn down off screen.
export default function YouTubePreview({
  video,
  cover = false,
  scrub = false,
  muted = true,
  suspended = false,
}) {
  const { youTubeId, start = 0, end } = video;

  const containerRef = useRef(null);
  const hostRef = useRef(null);
  const playerRef = useRef(null);
  const loopTimerRef = useRef(null);
  const wantPlayRef = useRef(false);
  const scrubbingRef = useRef(false);
  const lastScrubRef = useRef(-1);
  const mutedRef = useRef(muted);
  const suspendedRef = useRef(suspended);
  // Remembers whether the visibility observer wanted this preview playing, so
  // un-suspending can resume without waiting for the next intersection change.
  const visibleWantRef = useRef(false);

  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [thumbQuality, setThumbQuality] = useState('maxresdefault');

  const shouldInit = near && !prefersReducedMotion();
  const scrubEnabled = scrub && hoverCapable();

  // Keep the live player's audio in sync with the muted prop.
  useEffect(() => {
    mutedRef.current = muted;
    const player = playerRef.current;
    if (player && typeof player.mute === 'function') {
      try {
        if (muted) player.mute();
        else player.unMute();
      } catch {
        // ignore
      }
    }
  }, [muted]);

  const stopLoop = useCallback(() => {
    if (loopTimerRef.current) {
      clearInterval(loopTimerRef.current);
      loopTimerRef.current = null;
    }
  }, []);

  const startLoop = useCallback(() => {
    if (loopTimerRef.current) return;
    loopTimerRef.current = window.setInterval(() => {
      const player = playerRef.current;
      if (
        !player ||
        !wantPlayRef.current ||
        scrubbingRef.current ||
        typeof player.getCurrentTime !== 'function'
      ) {
        return;
      }
      const time = player.getCurrentTime();
      if (typeof end === 'number' && time >= end - 0.1) {
        try {
          player.seekTo(start, true);
          player.playVideo();
        } catch {
          // ignore
        }
      }
    }, 120);
  }, [start, end]);

  const stopPreview = useCallback(() => {
    wantPlayRef.current = false;
    stopLoop();
    const player = playerRef.current;
    if (player && typeof player.pauseVideo === 'function') {
      try {
        player.pauseVideo();
      } catch {
        // ignore
      }
    }
    setPlaying(false);
  }, [stopLoop]);

  const startPreview = useCallback(() => {
    if (prefersReducedMotion() || suspendedRef.current) return;
    wantPlayRef.current = true;
    if (scrubbingRef.current) return;
    const player = playerRef.current;
    if (player && typeof player.playVideo === 'function') {
      try {
        if (mutedRef.current) player.mute();
        else player.unMute();
        player.seekTo(start, true);
        player.playVideo();
        startLoop();
      } catch {
        // player not fully ready yet; onReady will honor wantPlayRef
      }
    }
  }, [start, startLoop]);

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

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wantVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
          visibleWantRef.current = wantVisible;
          if (wantVisible) {
            startPreview();
          } else {
            stopPreview();
          }
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
    if (suspended) {
      stopPreview();
    } else if (visibleWantRef.current) {
      startPreview();
    }
  }, [suspended, startPreview, stopPreview]);

  useEffect(() => {
    if (!shouldInit) return undefined;
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !YT || !hostRef.current || playerRef.current) return;

      playerRef.current = new YT.Player(hostRef.current, {
        host: 'https://www.youtube-nocookie.com',
        videoId: youTubeId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          mute: 1,
          start,
          iv_load_policy: 3,
          cc_load_policy: 0,
        },
        events: {
          onReady: (event) => {
            if (mutedRef.current) event.target.mute();
            else event.target.unMute();
            // Keep the decorative preview iframe out of the tab order; the
            // surrounding container is aria-hidden. (The API replaces the
            // host div, so query from the container.)
            containerRef.current
              ?.querySelector('iframe')
              ?.setAttribute('tabindex', '-1');
            if (wantPlayRef.current) {
              try {
                event.target.seekTo(start, true);
                event.target.playVideo();
                startLoop();
              } catch {
                // ignore
              }
            }
          },
          onStateChange: (event) => {
            const state = window.YT?.PlayerState;
            if (!state) return;
            if (event.data === state.PLAYING) {
              setPlaying(true);
            } else if (event.data === state.ENDED) {
              // Only restart if the preview is still supposed to be playing.
              if (scrubbingRef.current || !wantPlayRef.current) return;
              try {
                event.target.seekTo(start, true);
                event.target.playVideo();
              } catch {
                // ignore
              }
            }
          },
        },
      });
      // The API inserts the iframe synchronously; pull it out of the tab
      // order right away (onReady repeats this as a backstop).
      containerRef.current?.querySelector('iframe')?.setAttribute('tabindex', '-1');
    });

    return () => {
      cancelled = true;
      stopLoop();
      const player = playerRef.current;
      playerRef.current = null;
      if (player && typeof player.destroy === 'function') {
        try {
          player.destroy();
        } catch {
          // ignore
        }
      }
      setPlaying(false);
    };
  }, [shouldInit, youTubeId, start, end, startLoop, stopLoop]);

  const handlePointerMove = useCallback(
    (event) => {
      const el = containerRef.current;
      const player = playerRef.current;
      if (!el || !player || typeof player.seekTo !== 'function') return;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0) return;
      const frac = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      if (!scrubbingRef.current) {
        scrubbingRef.current = true;
        try {
          player.pauseVideo();
        } catch {
          // ignore
        }
      }
      let duration = 0;
      try {
        duration = typeof player.getDuration === 'function' ? player.getDuration() : 0;
      } catch {
        duration = 0;
      }
      // Wait for real metadata before mapping the pointer to a time.
      if (!duration || !Number.isFinite(duration) || duration <= 0) return;
      if (Math.abs(frac - lastScrubRef.current) < 0.012) return;
      lastScrubRef.current = frac;
      try {
        player.seekTo(frac * duration, true);
      } catch {
        // ignore
      }
    },
    [],
  );

  const handlePointerLeave = useCallback(() => {
    if (!scrubbingRef.current) return;
    scrubbingRef.current = false;
    lastScrubRef.current = -1;
    const player = playerRef.current;
    if (player) {
      try {
        player.seekTo(start, true);
        if (wantPlayRef.current) player.playVideo();
      } catch {
        // ignore
      }
    }
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
        src={thumbnailUrl(youTubeId, thumbQuality)}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => {
          if (thumbQuality !== 'hqdefault') setThumbQuality('hqdefault');
        }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          playing ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {shouldInit ? (
        <div
          className={`${cover ? 'yt-cover' : 'absolute inset-0'} transition-opacity duration-700 ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div ref={hostRef} className="h-full w-full" />
        </div>
      ) : null}
    </div>
  );
}
