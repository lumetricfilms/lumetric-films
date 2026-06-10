import { galleryImages } from '../data/projects.js';
import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';

export default function PhotographyGallery() {
  return (
    <section className="px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-3xl">
          <Eyebrow>Photography</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
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
              <article className="group relative h-full overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
                <div
                  className="absolute inset-0 scale-100 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: image.image }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition group-hover:opacity-60" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">
                    {image.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{image.title}</h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
