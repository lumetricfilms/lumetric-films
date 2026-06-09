import { useEffect, useRef } from 'react';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Self-hosted muted background reel (a small local MP4) that covers its
// container and loops. Far faster than a YouTube embed. Plays only while in
// view, honors reduced motion (poster only), and `muted` can be toggled live.
export default function BackgroundVideo({ src, poster, muted = true }) {
  const ref = useRef(null);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            el.muted = mutedRef.current;
            const played = el.play();
            if (played && typeof played.catch === 'function') played.catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: [0, 0.35, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      poster={poster}
      muted={muted}
      loop
      playsInline
      preload="auto"
      autoPlay={!prefersReducedMotion}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
