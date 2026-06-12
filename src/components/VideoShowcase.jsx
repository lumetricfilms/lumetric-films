import { useCallback, useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { showcaseSections } from '../data/showcase.js';
import LivePreviewPlayer from './LivePreviewPlayer.jsx';
import VideoLightbox from './VideoLightbox.jsx';
import Reveal from './Reveal.jsx';

const total = showcaseSections.length;
const pad = (n) => String(n).padStart(2, '0');

// Hash prefix for deep-linkable videos (#play-<video.id>).
const HASH_PREFIX = '#play-';

function findVideoByHash(hash) {
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const id = hash.slice(HASH_PREFIX.length);
  for (const section of showcaseSections) {
    const video = section.videos.find((item) => item.id === id);
    if (video) return { video, section };
  }
  return null;
}

// Split a category's videos into runs of the same layout so consecutive
// 'half' videos render together as a two column row.
function groupConsecutive(videos) {
  const groups = [];
  videos.forEach((video) => {
    const last = groups[groups.length - 1];
    if (last && last.layout === video.layout) {
      last.videos.push(video);
    } else {
      groups.push({ layout: video.layout, videos: [video] });
    }
  });
  return groups;
}

function WatchPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition duration-300 group-hover:border-cyan-200 group-hover:bg-cyan-300/20 group-focus-visible:border-cyan-200 group-focus-visible:bg-cyan-300/20">
      <Play className="h-4 w-4" fill="currentColor" aria-hidden="true" />
      Watch full video
    </span>
  );
}

function VideoCaption({ video }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
      <div>
        <p className="text-lg font-semibold text-white drop-shadow sm:text-2xl">
          {video.title}
        </p>
        {video.role ? (
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-200 drop-shadow-[0_1px_8px_rgba(0,0,0,.9)]">
            {video.role}
          </p>
        ) : null}
      </div>
      <WatchPill />
    </div>
  );
}

// The large centered category title, used both overlaid on full screen videos
// and standalone above two column rows.
function CategoryTitle({ section, number, overlay = false }) {
  const accent = section.accent || '#67e8f9';
  return (
    <Reveal
      className={
        overlay
          ? 'pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center'
          : 'flex flex-col items-center px-6 text-center'
      }
    >
      {/* Local darkening so the headline never depends on the luck of the
          loop frame behind it. */}
      {overlay ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_50%,rgba(0,0,0,.55),transparent_70%)]"
        />
      ) : null}
      <span
        className="text-xs font-semibold uppercase tracking-[0.45em] drop-shadow-[0_1px_10px_rgba(0,0,0,.85)]"
        style={{ color: accent }}
      >
        {pad(number)} <span className="opacity-40">/ {pad(total)}</span>
      </span>
      <h2 className="mt-5 text-4xl font-semibold uppercase tracking-[0.25em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,.6)] sm:text-6xl sm:tracking-[0.35em]">
        {section.eyebrow}
      </h2>
      <Reveal
        as="span"
        variant="line"
        className="mt-6 block h-px w-24"
        style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
      />
      <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-200 drop-shadow-[0_1px_10px_rgba(0,0,0,.8)] sm:text-base">
        {section.title}
      </p>
      <p className="mt-2 max-w-xl text-xs leading-6 text-zinc-300 drop-shadow-[0_1px_10px_rgba(0,0,0,.8)] sm:text-sm">
        {section.blurb}
      </p>
    </Reveal>
  );
}

function FullScreenVideo({ video, section, showTitle, number, onOpen, suspended }) {
  return (
    <section className="vignette relative h-svh w-full overflow-hidden bg-black">
      <button
        type="button"
        onClick={() => onOpen(video, section)}
        aria-label={`Play ${video.title}`}
        className="group block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300"
      >
        <LivePreviewPlayer video={video} cover scrub suspended={suspended} />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/55" />
        <VideoCaption video={video} />
      </button>
      {/* Sibling of the button so the category h2 stays in the document
          outline instead of being erased by the button's aria-label. */}
      {showTitle ? <CategoryTitle section={section} number={number} overlay /> : null}
    </section>
  );
}

function TwoColumnVideo({ video, section, onOpen, suspended }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(video, section)}
      aria-label={`Play ${video.title}`}
      className="group relative block aspect-video w-full overflow-hidden bg-black text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300"
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
        <LivePreviewPlayer video={video} scrub suspended={suspended} />
      </div>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <VideoCaption video={video} />
    </button>
  );
}

export default function VideoShowcase() {
  const [active, setActive] = useState(null);
  // Whether we pushed a history entry for the open lightbox (false when the
  // visitor arrived on a #play- deep link, where back should leave the site).
  const pushedRef = useRef(false);

  const openVideo = useCallback((video, section) => {
    setActive({ video, section });
    window.history.pushState({ lfLightbox: true }, '', `${HASH_PREFIX}${video.id}`);
    pushedRef.current = true;
  }, []);

  const closeVideo = useCallback(() => {
    // Close immediately; history cleanup follows. Never depend on popstate to
    // clear the UI (the previous history entry may itself be a lightbox entry).
    setActive(null);
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    } else {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search,
      );
    }
  }, []);

  const selectVideo = useCallback((video) => {
    setActive((current) => (current ? { ...current, video } : current));
    window.history.replaceState(
      { lfLightbox: true },
      '',
      `${HASH_PREFIX}${video.id}`,
    );
  }, []);

  // Back gesture/button closes the lightbox, forward reopens it from the
  // hash; a #play- hash on load opens it directly.
  useEffect(() => {
    const onPopState = (event) => {
      if (event.state?.lfLightbox) {
        setActive(findVideoByHash(window.location.hash));
      } else {
        pushedRef.current = false;
        setActive(null);
      }
    };
    window.addEventListener('popstate', onPopState);
    const fromHash = findVideoByHash(window.location.hash);
    if (fromHash) setActive(fromHash);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const suspended = Boolean(active);

  return (
    <div id="work">
      {showcaseSections.map((section, sectionIndex) => {
        const groups = groupConsecutive(section.videos);
        const number = sectionIndex + 1;
        return (
          <div key={section.id} id={section.id} className="scroll-mt-24">
            {groups.map((group, groupIndex) => {
              if (group.layout === 'full') {
                return group.videos.map((video, videoIndex) => (
                  <FullScreenVideo
                    key={video.id}
                    video={video}
                    section={section}
                    showTitle={groupIndex === 0 && videoIndex === 0}
                    number={number}
                    onOpen={openVideo}
                    suspended={suspended}
                  />
                ));
              }

              return (
                <div key={`${section.id}-row-${groupIndex}`}>
                  {groupIndex === 0 ? (
                    <div className="py-20 sm:py-28">
                      <CategoryTitle section={section} number={number} />
                    </div>
                  ) : null}
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {group.videos.map((video, i) => (
                      <Reveal key={video.id} variant="zoom" delay={i * 120}>
                        <TwoColumnVideo
                          video={video}
                          section={section}
                          onOpen={openVideo}
                          suspended={suspended}
                        />
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      <VideoLightbox active={active} onClose={closeVideo} onSelect={selectVideo} />
    </div>
  );
}
