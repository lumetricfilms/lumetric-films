import { ArrowRight } from 'lucide-react';
import { showcaseSections } from '../data/showcase.js';
import LivePreviewPlayer from './LivePreviewPlayer.jsx';
import Reveal from './Reveal.jsx';

// Reuse a music video as the closing backdrop (different from the hero reel).
const closingVideo =
  showcaseSections.find((section) => section.id === 'music-videos')?.videos?.[0] ??
  showcaseSections[0]?.videos?.[0];

export default function ClosingCTA() {
  return (
    <section className="vignette relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black px-5 py-28 sm:px-8">
      {closingVideo ? (
        <div className="absolute inset-0 overflow-hidden">
          <LivePreviewPlayer video={closingVideo} cover />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,.72),rgba(9,9,11,.6)_45%,rgba(9,9,11,.85))]" />

      <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">
          Let's work together
        </p>
        <h2 className="mt-5 text-4xl font-semibold text-white drop-shadow sm:text-6xl">
          Let's create something cinematic.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-zinc-300">
          Tell us about your project and the feeling it should carry, and we will
          shape the visuals to match.
        </p>
        <a
          href="#contact"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-cyan-200 px-8 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_28px_rgba(34,211,238,.35)] transition hover:bg-white"
        >
          Book a Project
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
