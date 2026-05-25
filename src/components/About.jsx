export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            About
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            Built by Jordan Williams for cinematic school, music, and social stories.
          </h2>
        </div>
        <div className="space-y-6 text-lg leading-8 text-zinc-300">
          <p>
            Lumetric Films is led by founder Jordan Williams, a videographer and editor
            with 5 years of experience creating school videography, multimedia music
            videos, and short-form viral content.
          </p>
          <p>
            The work blends cinematic lighting, movement, emotion, and clean post-production
            in DaVinci Resolve Studio, shaping polished visuals for artists, schools,
            brands, and moments that deserve to be remembered with care.
          </p>
        </div>
      </div>
    </section>
  );
}
