import { showcaseSections } from '../data/showcase.js';
import LivePreviewPlayer from './LivePreviewPlayer.jsx';
import Reveal from './Reveal.jsx';

// Reuse a music video as the closing backdrop (different from the hero reel),
// pinned to its own moment so it differs from that video's showcase tile
// (the tile plays 130-136 per the owner's timestamp sheet).
const baseClosingVideo =
  showcaseSections.find((section) => section.id === 'music-videos')?.videos?.[0] ??
  showcaseSections[0]?.videos?.[0];
const closingVideo = baseClosingVideo
  ? { ...baseClosingVideo, start: 87, end: 93 }
  : undefined;

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
          Now booking
        </p>
        <h2 className="mt-5 text-4xl font-semibold text-white drop-shadow sm:text-6xl">
          Let's create something cinematic.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-zinc-300">
          One conversation is enough to scope it — send the idea and get a plan
          and a quote back.
        </p>
      </Reveal>
    </section>
  );
}
