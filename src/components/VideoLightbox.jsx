import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { loadYouTubeApi, thumbnailUrl } from '../lib/youtube.js';
import useFocusTrap from '../lib/useFocusTrap.js';

// Theater style modal: a large player with a strip of every video in the same
// category below it. Picking a thumbnail swaps the player; when a video ends it
// autoplays the next one in the category. Behaves as a focus trapping dialog.
export default function VideoLightbox({ active, onClose, onSelect }) {
  const video = active?.video ?? null;
  const section = active?.section ?? null;
  const isOpen = Boolean(video);

  const backdropRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);
  const playerReadyRef = useRef(false);

  const [swapping, setSwapping] = useState(false);
  // 'loading' | 'ready' | 'unavailable' (YouTube API blocked or failed)
  const [playerState, setPlayerState] = useState('loading');
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);

  // Keep the latest props available to the keyboard handler and player callbacks.
  const latest = useRef({ video, section, onSelect });
  useEffect(() => {
    latest.current = { video, section, onSelect };
  });

  useFocusTrap({
    active: isOpen,
    containerRef: dialogRef,
    initialFocusRef: closeButtonRef,
    onClose,
  });

  // Arrow keys move through the category playlist.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      const { video: current, section: group, onSelect: select } = latest.current;
      const list = group?.videos ?? [];
      const index = list.findIndex((item) => item.youTubeId === current?.youTubeId);
      if (index >= 0) {
        const target = event.key === 'ArrowRight' ? index + 1 : index - 1;
        if (target >= 0 && target < list.length) {
          event.preventDefault();
          select(list[target]);
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // Create the player once per open session. Switching videos swaps the source
  // in place (see the next effect) instead of rebuilding the iframe.
  useEffect(() => {
    if (!isOpen) return undefined;
    const container = playerContainerRef.current;
    if (!container) return undefined;

    let cancelled = false;
    playerReadyRef.current = false;
    setPlayerState('loading');
    setPaused(false);
    setMuted(false);

    loadYouTubeApi().then((YT) => {
      if (cancelled || !playerContainerRef.current) return;
      if (!YT) {
        // API blocked or failed: show a fallback so the click still converts.
        setPlayerState('unavailable');
        return;
      }
      const host = document.createElement('div');
      host.style.width = '100%';
      host.style.height = '100%';
      playerContainerRef.current.appendChild(host);

      const advanceToNext = () => {
        const { video: current, section: group, onSelect: select } = latest.current;
        const list = group?.videos ?? [];
        const index = list.findIndex((item) => item.youTubeId === current?.youTubeId);
        const next = index >= 0 && index < list.length - 1 ? list[index + 1] : null;
        if (next) select(next);
      };

      const createdId = latest.current.video?.youTubeId;
      playerRef.current = new YT.Player(host, {
        host: 'https://www.youtube-nocookie.com',
        videoId: createdId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            playerReadyRef.current = true;
            setPlayerState('ready');
            playerContainerRef.current
              ?.querySelector('iframe')
              ?.setAttribute('tabindex', '-1');
            const want = latest.current.video?.youTubeId;
            if (want && want !== createdId && playerRef.current?.loadVideoById) {
              try {
                playerRef.current.loadVideoById(want);
              } catch {
                // ignore
              }
            }
          },
          onStateChange: (event) => {
            const state = window.YT?.PlayerState;
            if (!state) return;
            if (event.data === state.PLAYING) setPaused(false);
            else if (event.data === state.PAUSED) setPaused(true);
            if (event.data !== state.ENDED) return;
            advanceToNext();
          },
          onError: () => {
            // A blocked or removed video never fires ENDED; skip to the next.
            advanceToNext();
          },
        },
      });
      // The API inserts the iframe synchronously; pull it out of the tab
      // order right away (onReady repeats this as a backstop).
      playerContainerRef.current
        ?.querySelector('iframe')
        ?.setAttribute('tabindex', '-1');
    });

    return () => {
      cancelled = true;
      playerReadyRef.current = false;
      const player = playerRef.current;
      playerRef.current = null;
      if (player && typeof player.destroy === 'function') {
        try {
          player.destroy();
        } catch {
          // ignore
        }
      }
      if (container) container.innerHTML = '';
    };
  }, [isOpen]);

  // Swap the source inside the existing player when the selection changes.
  useEffect(() => {
    if (!isOpen) return;
    const player = playerRef.current;
    if (
      player &&
      playerReadyRef.current &&
      typeof player.loadVideoById === 'function' &&
      video?.youTubeId
    ) {
      try {
        player.loadVideoById(video.youTubeId);
      } catch {
        // ignore
      }
    }
  }, [isOpen, video?.youTubeId]);

  // Brief crossfade on the player when the selection changes.
  useEffect(() => {
    if (!isOpen) {
      setSwapping(false);
      return undefined;
    }
    setSwapping(true);
    const timer = window.setTimeout(() => setSwapping(false), 240);
    return () => window.clearTimeout(timer);
  }, [isOpen, video?.youTubeId]);

  // When the selected video changes, bring the player back into view.
  useEffect(() => {
    backdropRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [video?.youTubeId]);

  if (!isOpen) return null;

  const playlist = section?.videos ?? [video];

  // Keyboard-reachable transport controls; the cross origin iframe itself is
  // excluded from the tab order so it cannot break the focus trap.
  const togglePause = () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (paused) player.playVideo();
      else player.pauseVideo();
    } catch {
      // ignore
    }
  };
  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (muted) player.unMute();
      else player.mute();
      setMuted(!muted);
    } catch {
      // ignore
    }
  };

  const controlClass =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:border-cyan-200 hover:bg-cyan-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300';

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
          <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
            {playerState === 'ready' ? (
              <>
                <button
                  type="button"
                  onClick={togglePause}
                  aria-label={paused ? 'Play video' : 'Pause video'}
                  className={controlClass}
                >
                  {paused ? (
                    <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true" />
                  ) : (
                    <Pause className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                  className={controlClass}
                >
                  {muted ? (
                    <VolumeX className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Volume2 className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </>
            ) : null}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className={controlClass}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl shadow-cyan-950/30">
            {playerState === 'unavailable' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                <img
                  src={thumbnailUrl(video.youTubeId, 'hqdefault')}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-30"
                />
                <p className="relative text-base font-medium text-white">
                  The player could not load on this connection.
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.youTubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white"
                >
                  Watch on YouTube
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            ) : (
              <div
                ref={playerContainerRef}
                className={`lightbox-player absolute inset-0 transition-opacity duration-300 ${
                  swapping ? 'opacity-0' : 'opacity-100'
                }`}
              />
            )}
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
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
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
