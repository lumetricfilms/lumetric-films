import { useCallback, useState } from 'react';
import { Play } from 'lucide-react';
import { showcaseSections } from '../data/showcase.js';
import LivePreviewPlayer from './LivePreviewPlayer.jsx';
import VideoLightbox from './VideoLightbox.jsx';
import Reveal from './Reveal.jsx';

const total = showcaseSections.length;
const pad = (n) => String(n).padStart(2, '0');

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
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
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
  return (
    <Reveal
      className={
        overlay
          ? 'pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center'
          : 'flex flex-col items-center px-6 text-center'
      }
    >
      <span className="text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300/90">
        {pad(number)} <span className="text-cyan-300/40">/ {pad(total)}</span>
      </span>
      <h2 className="mt-5 text-4xl font-semibold uppercase tracking-[0.25em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,.6)] sm:text-6xl sm:tracking-[0.35em]">
        {section.eyebrow}
      </h2>
      <Reveal
        as="span"
        variant="line"
        className="mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
      />
      <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-300 drop-shadow sm:text-base">
        {section.title}
      </p>
    </Reveal>
  );
}

function FullScreenVideo({ video, section, showTitle, number, onOpen }) {
  return (
    <section className="vignette relative h-screen w-full overflow-hidden bg-black">
      <button
        type="button"
        onClick={() => onOpen(video, section)}
        aria-label={`Play ${video.title}`}
        className="group block h-full w-full text-left focus:outline-none"
      >
        <LivePreviewPlayer video={video} cover />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />
        {showTitle ? (
          <CategoryTitle section={section} number={number} overlay />
        ) : null}
        <VideoCaption video={video} />
      </button>
    </section>
  );
}

function TwoColumnVideo({ video, section, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(video, section)}
      aria-label={`Play ${video.title}`}
      className="group relative block aspect-video w-full overflow-hidden bg-black text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300"
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
        <LivePreviewPlayer video={video} />
      </div>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/10" />
      <VideoCaption video={video} />
    </button>
  );
}

export default function VideoShowcase() {
  const [active, setActive] = useState(null);

  const openVideo = useCallback((video, section) => {
    setActive({ video, section });
  }, []);
  const closeVideo = useCallback(() => setActive(null), []);
  const selectVideo = useCallback(
    (video) => setActive((current) => (current ? { ...current, video } : current)),
    [],
  );

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
                        <TwoColumnVideo video={video} section={section} onOpen={openVideo} />
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
