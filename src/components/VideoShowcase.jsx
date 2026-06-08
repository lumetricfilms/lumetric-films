import { useState } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { showcaseSections } from '../data/showcase.js';
import LivePreviewPlayer from './LivePreviewPlayer.jsx';
import VideoLightbox from './VideoLightbox.jsx';

// Flatten sections into one full screen tile per video, tagging the first video
// of each category so it carries the large centered category title overlay.
const items = showcaseSections.flatMap((section) =>
  section.videos.map((video, index) => ({
    video,
    category: index === 0 ? section : null,
  })),
);

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div id="work">
      {items.map((item, index) => (
        <section
          key={item.video.id}
          id={index === 0 ? 'top' : undefined}
          className="relative h-screen w-full overflow-hidden bg-black"
        >
          <button
            type="button"
            onClick={() => setActiveVideo(item.video)}
            aria-label={`Play ${item.video.title}`}
            className="group block h-full w-full text-left focus:outline-none"
          >
            <LivePreviewPlayer video={item.video} />

            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />

            {item.category ? (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <h2 className="text-4xl font-semibold uppercase tracking-[0.25em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,.6)] sm:text-6xl sm:tracking-[0.35em]">
                  {item.category.eyebrow}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-200 drop-shadow sm:text-lg">
                  {item.category.title}
                </p>
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-10">
              <div>
                <p className="text-lg font-semibold text-white drop-shadow sm:text-2xl">
                  {item.video.title}
                </p>
                {item.video.role ? (
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
                    {item.video.role}
                  </p>
                ) : null}
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition duration-300 group-hover:border-cyan-200 group-hover:bg-cyan-300/20 group-focus-visible:border-cyan-200 group-focus-visible:bg-cyan-300/20">
                <Play className="h-4 w-4" fill="currentColor" aria-hidden="true" />
                Watch full video
              </span>
            </div>

            {index === 0 ? (
              <span className="pointer-events-none absolute bottom-28 left-1/2 -translate-x-1/2 animate-bounce text-white/70 motion-reduce:animate-none sm:bottom-32">
                <ChevronDown className="h-7 w-7" aria-hidden="true" />
              </span>
            ) : null}
          </button>
        </section>
      ))}

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
