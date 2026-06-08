import { useCallback, useEffect, useRef, useState } from 'react';
import { loadYouTubeApi, thumbnailUrl } from '../lib/youtube.js';

// Respect users who ask for less motion: never autoplay moving video, just keep
// the static thumbnail. Clicking still opens the full lightbox.
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Plays a silent, looping preview of a single start..end segment of a YouTube
// video. The preview autoplays whenever the tile is in view. With `cover` the
// video is scaled to fill a full screen tile (cropping overflow); without it
// the video simply fills its 16:9 tile. The player is created lazily while near
// the viewport and destroyed when it scrolls away so iframes do not accumulate.
export default function LivePreviewPlayer({ video, cover = false }) {
  const { youTubeId, start = 0, end } = video;

  const containerRef = useRef(null);
  const hostRef = useRef(null);
  const playerRef = useRef(null);
  const loopTimerRef = useRef(null);
  const wantPlayRef = useRef(false);

  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [thumbQuality, setThumbQuality] = useState('maxresdefault');

  const shouldInit = near && !prefersReducedMotion;

  const stopLoop = useCallback(() => {
    if (loopTimerRef.current) {
      clearInterval(loopTimerRef.current);
      loopTimerRef.current = null;
    }
  }, []);

  // Poll often enough that short segments do not visibly overshoot `end`, and
  // always resume play after seeking so the loop never freezes on a still.
  const startLoop = useCallback(() => {
    if (loopTimerRef.current) return;
    loopTimerRef.current = window.setInterval(() => {
      const player = playerRef.current;
      if (!player || !wantPlayRef.current || typeof player.getCurrentTime !== 'function') {
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
    if (prefersReducedMotion) return;
    wantPlayRef.current = true;
    const player = playerRef.current;
    if (player && typeof player.playVideo === 'function') {
      try {
        player.mute();
        player.seekTo(start, true);
        player.playVideo();
        startLoop();
      } catch {
        // player not fully ready yet; onReady will honor wantPlayRef
      }
    }
  }, [start, startLoop]);

  // Two way viewport observer: mark near when within an expanded margin and not
  // near once it leaves, which drives player teardown for off screen tiles.
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

  // Autoplay the preview whenever this tile is sufficiently on screen, pause it
  // otherwise.
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const el = containerRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
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

  // Create the YouTube player while the tile is near, and destroy it (releasing
  // the iframe and loop timer) when it scrolls out of view.
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
            event.target.mute();
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

  return (
    <div ref={containerRef} className="live-preview absolute inset-0" aria-hidden="true">
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
