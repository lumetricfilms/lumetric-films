import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <Eyebrow>About</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
            Built by Jordan Williams for cinematic school, music, and social stories.
          </h2>
        </Reveal>
        <Reveal delay={120} className="space-y-6 text-lg leading-8 text-zinc-300">
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
        </Reveal>
      </div>
    </section>
  );
}
