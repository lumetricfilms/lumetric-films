import { useState } from 'react';
import { Play } from 'lucide-react';
import { showcaseSections } from '../data/showcase.js';
import LivePreviewPlayer from './LivePreviewPlayer.jsx';
import VideoLightbox from './VideoLightbox.jsx';

function VideoTile({ video, onOpen }) {
  const isFull = video.layout === 'full';

  return (
    <article className={isFull ? 'lg:col-span-2' : ''}>
      <button
        type="button"
        onClick={() => onOpen(video)}
        aria-label={`Play ${video.title}`}
        className="group relative block aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-zinc-950 text-left shadow-2xl shadow-cyan-950/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        <LivePreviewPlayer video={video} />

        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/10" />

        <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-100 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,.9)]" />
          Live Preview
        </span>

        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <Play className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true" />
          </span>
        </span>

        <span className="pointer-events-none absolute inset-x-4 bottom-4">
          <span className="block text-lg font-semibold text-white drop-shadow sm:text-xl">
            {video.title}
          </span>
          {video.role ? (
            <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-cyan-200">
              {video.role}
            </span>
          ) : null}
        </span>
      </button>

      {video.blurb ? (
        <p className="mt-3 text-sm leading-6 text-zinc-400">{video.blurb}</p>
      ) : null}
    </article>
  );
}

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="work" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Selected Work
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            Live previews of recent Lumetric work.
          </h2>
          <p className="mt-5 text-base leading-7 text-zinc-400">
            A selection of recent work across live performance, music video,
            brand, and social. Hover any clip to watch a short silent preview,
            then click to play the full video with sound.
          </p>
        </div>

        <div className="space-y-20">
          {showcaseSections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-28">
              <header className="mb-8 max-w-3xl border-b border-white/10 pb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">
                  {section.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {section.blurb}
                </p>
              </header>

              <div className="grid gap-6 lg:grid-cols-2">
                {section.videos.map((video) => (
                  <VideoTile key={video.id} video={video} onOpen={setActiveVideo} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
