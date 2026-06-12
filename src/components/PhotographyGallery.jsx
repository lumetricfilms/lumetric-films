import { galleryImages } from '../data/projects.js';
import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';

export default function PhotographyGallery() {
  return (
    <section id="photography" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-3xl">
          <Eyebrow>Photography</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-semibold text-white sm:text-5xl">
            Stills and frames from recent sets.
          </h2>
        </Reveal>
        <div className="grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <Reveal
              key={image.title}
              variant="zoom"
              delay={(index % 3) * 110}
              className={index === 0 || index === 1 ? 'sm:row-span-2' : ''}
            >
              <figure className="group relative h-full overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
                <img
                  src={image.src}
                  alt={`${image.title} — ${image.category.toLowerCase()} photography by Lumetric Films`}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full scale-100 object-cover object-[50%_25%] transition duration-700 group-hover:scale-105"
                />
                {/* Hover-revealed on mouse devices; always visible on touch. */}
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100 pointer-coarse:opacity-100">
                  <span className="text-sm font-semibold text-white">{image.title}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-cyan-200">
                    {image.category}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
