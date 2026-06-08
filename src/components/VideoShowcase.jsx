import { useState } from 'react';
import { Play } from 'lucide-react';
import { showcaseSections } from '../data/showcase.js';
import LivePreviewPlayer from './LivePreviewPlayer.jsx';
import VideoLightbox from './VideoLightbox.jsx';

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
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
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

function FullScreenVideo({ video, category, onOpen }) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <button
        type="button"
        onClick={() => onOpen(video)}
        aria-label={`Play ${video.title}`}
        className="group block h-full w-full text-left focus:outline-none"
      >
        <LivePreviewPlayer video={video} cover />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />
        {category ? (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="text-4xl font-semibold uppercase tracking-[0.25em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,.6)] sm:text-6xl sm:tracking-[0.35em]">
              {category.eyebrow}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-200 drop-shadow sm:text-lg">
              {category.title}
            </p>
          </div>
        ) : null}
        <VideoCaption video={video} />
      </button>
    </section>
  );
}

function TwoColumnVideo({ video, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(video)}
      aria-label={`Play ${video.title}`}
      className="group relative block aspect-video w-full overflow-hidden bg-black text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300"
    >
      <LivePreviewPlayer video={video} />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/10" />
      <VideoCaption video={video} />
    </button>
  );
}

function CategoryHeading({ section }) {
  return (
    <div className="px-6 py-16 text-center sm:py-20">
      <h2 className="text-3xl font-semibold uppercase tracking-[0.3em] text-white sm:text-5xl">
        {section.eyebrow}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
        {section.title}
      </p>
    </div>
  );
}

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div id="work">
      {showcaseSections.map((section) => {
        const groups = groupConsecutive(section.videos);
        return (
          <div key={section.id} id={section.id}>
            {groups.map((group, groupIndex) => {
              if (group.layout === 'full') {
                return group.videos.map((video, videoIndex) => (
                  <FullScreenVideo
                    key={video.id}
                    video={video}
                    category={groupIndex === 0 && videoIndex === 0 ? section : null}
                    onOpen={setActiveVideo}
                  />
                ));
              }

              return (
                <div key={`${section.id}-row-${groupIndex}`}>
                  {groupIndex === 0 ? <CategoryHeading section={section} /> : null}
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {group.videos.map((video) => (
                      <TwoColumnVideo
                        key={video.id}
                        video={video}
                        onOpen={setActiveVideo}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
