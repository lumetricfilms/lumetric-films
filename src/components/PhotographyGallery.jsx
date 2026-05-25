import { galleryImages } from '../data/projects.js';

export default function PhotographyGallery() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Photography
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            Placeholder frames for the first gallery edit.
          </h2>
        </div>
        <div className="grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <article
              key={image.title}
              className={`group relative overflow-hidden rounded-lg border border-white/10 bg-zinc-900 ${
                index === 0 || index === 3 ? 'sm:row-span-2' : ''
              }`}
            >
              <div
                className="absolute inset-0 scale-100 transition duration-700 group-hover:scale-105"
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
          ))}
        </div>
      </div>
    </section>
  );
}
