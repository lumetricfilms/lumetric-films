import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';

const facts = ['Based in the Bronx, NYC', '5+ years behind the camera', 'DaVinci Resolve Studio'];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <Eyebrow>About</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
            The eye behind every Lumetric frame.
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {facts.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-300"
              >
                {fact}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} className="space-y-6 text-lg leading-8 text-zinc-300">
          <p>
            Lumetric Films is run by Jordan Williams, a Bronx-based videographer and
            editor who has spent five years filming the moments people don't get back —
            school shows, music videos, and the seconds before a crowd erupts.
          </p>
          <p>
            Every project gets the same treatment: cinematic lighting, deliberate
            movement, and a finish graded frame by frame in DaVinci Resolve Studio.
            The work is built to be watched twice.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
