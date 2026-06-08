import { useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';
import { thumbnailUrl } from '../lib/youtube.js';

const FOCUSABLE =
  'button, [href], iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Theater style modal: a large player with a strip of every video in the same
// category below it. Picking a thumbnail swaps the player (from the start, with
// sound) without leaving the modal. Behaves as a real focus trapping dialog.
export default function VideoLightbox({ active, onClose, onSelect }) {
  const video = active?.video ?? null;
  const section = active?.section ?? null;
  const isOpen = Boolean(video);

  const backdropRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

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
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
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
  }, [isOpen, onClose]);

  // When the selected video changes, bring the player back into view.
  useEffect(() => {
    backdropRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [video?.youTubeId]);

  if (!isOpen) return null;

  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  const src = `https://www.youtube-nocookie.com/embed/${video.youTubeId}?${params.toString()}`;
  const playlist = section?.videos ?? [video];

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/92 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${section?.eyebrow ?? 'Video'}: ${video.title}`}
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          ref={dialogRef}
          className="relative w-full max-w-6xl"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:border-cyan-200 hover:bg-cyan-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl shadow-cyan-950/30">
            <iframe
              key={video.youTubeId}
              className="h-full w-full"
              src={src}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {video.title}
              </h3>
              {video.role ? (
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
                  {video.role}
                </p>
              ) : null}
            </div>
            {section?.eyebrow ? (
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                {section.eyebrow}
              </span>
            ) : null}
          </div>

          {playlist.length > 1 ? (
            <div className="mt-8">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                More from {section?.eyebrow ?? 'this set'}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {playlist.map((item) => {
                  const isActive = item.youTubeId === video.youTubeId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelect(item)}
                      aria-label={`Play ${item.title}`}
                      aria-current={isActive}
                      className={`group relative block aspect-video w-full overflow-hidden rounded-md border text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                        isActive
                          ? 'border-cyan-300 ring-2 ring-cyan-300/60'
                          : 'border-white/10 hover:border-cyan-200/50'
                      }`}
                    >
                      <img
                        src={thumbnailUrl(item.youTubeId, 'mqdefault')}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                      {isActive ? (
                        <span className="absolute right-2 top-2 rounded-full bg-cyan-300 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-950">
                          Now playing
                        </span>
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur">
                            <Play className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true" />
                          </span>
                        </span>
                      )}
                      <span className="absolute inset-x-2 bottom-2 line-clamp-2 text-xs font-medium text-white drop-shadow">
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
