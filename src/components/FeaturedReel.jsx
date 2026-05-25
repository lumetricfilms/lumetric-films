import { videoProjects } from '../data/projects.js';
import VideoEmbed from './VideoEmbed.jsx';

export default function FeaturedReel() {
  const reel = videoProjects.find((project) => project.featured) ?? videoProjects[0];

  return (
    <section className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Featured Reel
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            A first look at the Lumetric visual language.
          </h2>
        </div>
        <VideoEmbed project={reel} />
      </div>
    </section>
  );
}
