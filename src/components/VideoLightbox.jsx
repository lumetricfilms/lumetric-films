import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const FOCUSABLE =
  'button, [href], iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Full screen modal that plays the complete video with sound and controls,
// starting at the same timestamp the preview loops from. Manages focus so it
// behaves as a real aria-modal dialog (move in, trap Tab, restore on close).
export default function VideoLightbox({ video, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!video) return undefined;

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const items = Array.from(
        dialogRef.current.querySelectorAll(FOCUSABLE),
      ).filter((el) => !el.hasAttribute('disabled'));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [video, onClose]);

  if (!video) return null;

  // Play the full video from the beginning (not the preview timestamp).
  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  const src = `https://www.youtube-nocookie.com/embed/${video.youTubeId}?${params.toString()}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:border-cyan-200 hover:bg-cyan-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="aspect-video overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl shadow-cyan-950/30">
          <iframe
            className="h-full w-full"
            src={src}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-lg font-semibold text-white">{video.title}</p>
          {video.role ? (
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
              {video.role}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
