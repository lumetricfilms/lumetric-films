export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            About
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            Cinematic storytelling shaped by light, motion, and emotion.
          </h2>
        </div>
        <div className="space-y-6 text-lg leading-8 text-zinc-300">
          <p>
            Lumetric Films is a creative video and photography brand focused on
            professional visuals with a modern cinematic edge. The work centers on
            atmosphere, timing, and the details that make a scene feel intentional.
          </p>
          <p>
            From music videos and event coverage to commercial edits and photo sessions,
            Lumetric builds polished visual stories for artists, brands, and moments that
            deserve to be remembered with care.
          </p>
        </div>
      </div>
    </section>
  );
}
