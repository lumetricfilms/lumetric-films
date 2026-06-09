import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import logoIcon from '../assets/lumetric-icon.svg';
import { showcaseSections } from '../data/showcase.js';
import LivePreviewPlayer from './LivePreviewPlayer.jsx';
import Wordmark from './Wordmark.jsx';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Use the first portfolio video as the hero background reel, pinned to its own
// moment so it differs from that video's showcase tile.
const baseHeroVideo = showcaseSections[0]?.videos?.[0];
const heroVideo = baseHeroVideo ? { ...baseHeroVideo, start: 359, end: 367 } : undefined;

// Entrance timeline: the dot flickers (ends ~0.2s delay + 2.8s = 3.0s), then
// the "i" stem fades in slowly, then everything else appears.
const STEM_DELAY_MS = 3000;
const REVEAL_DELAY_MS = 3800;

export default function Hero() {
  const [stemIn, setStemIn] = useState(prefersReducedMotion);
  const [entered, setEntered] = useState(prefersReducedMotion);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const stemTimer = window.setTimeout(() => setStemIn(true), STEM_DELAY_MS);
    const revealTimer = window.setTimeout(() => setEntered(true), REVEAL_DELAY_MS);
    return () => {
      window.clearTimeout(stemTimer);
      window.clearTimeout(revealTimer);
    };
  }, []);

  const rise = `transition-all duration-700 ease-out ${
    entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  }`;
  const fade = `transition-opacity duration-1000 ease-out ${
    entered ? 'opacity-100' : 'opacity-0'
  }`;

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-5 pt-28 sm:px-8"
    >
      {/* Background reel, revealed after the flicker. */}
      <div className={`absolute inset-0 ${fade}`} aria-hidden="true">
        {heroVideo ? (
          <div className="vignette absolute inset-0 overflow-hidden">
            <LivePreviewPlayer video={heroVideo} cover muted={!soundOn} quality="large" />
          </div>
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,.68),rgba(9,9,11,.6)_42%,rgba(9,9,11,.88))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,.12),transparent_36%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />

        <div className="pointer-events-none absolute inset-x-5 top-28 bottom-12 hidden sm:block">
          <span className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-white/50" />
          <span className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-white/50" />
          <span className="absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-white/50" />
          <span className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-white/50" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <img
            src={logoIcon}
            alt=""
            className={`mb-8 h-20 w-20 rounded-xl border border-white/10 shadow-[0_0_40px_rgba(34,211,238,.28)] sm:h-24 sm:w-24 ${rise}`}
            aria-hidden="true"
          />
          <p className={`mb-6 text-sm font-semibold uppercase tracking-[0.34em] text-cyan-200 ${rise}`}>
            Video Production + Photography
          </p>
          <h1 className="w-full">
            <span className="sr-only">Lumetric Films</span>
            <Wordmark
              revealed={entered}
              stemRevealed={stemIn}
              className="mx-auto h-auto w-full max-w-2xl drop-shadow-[0_0_32px_rgba(34,211,238,.18)]"
            />
          </h1>
          <p
            className={`mt-8 max-w-2xl text-xl leading-8 text-zinc-200 sm:text-2xl sm:leading-9 ${rise}`}
            style={{ transitionDelay: entered ? '120ms' : '0ms' }}
          >
            Cinematic video and photography for artists, brands, and unforgettable moments.
          </p>
          <div
            className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row ${rise} ${
              entered ? '' : 'pointer-events-none'
            }`}
            style={{ transitionDelay: entered ? '220ms' : '0ms' }}
          >
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-7 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_28px_rgba(34,211,238,.35)] transition hover:bg-white"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-cyan-200 hover:bg-white/10"
            >
              Book a Project
            </a>
          </div>
        </div>
      </div>

      {heroVideo ? (
        <button
          type="button"
          onClick={() => setSoundOn((value) => !value)}
          aria-pressed={soundOn}
          aria-label={soundOn ? 'Turn off sound' : 'Turn on sound'}
          className={`absolute bottom-7 right-6 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:border-cyan-200 hover:bg-cyan-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${fade} ${
            entered ? '' : 'pointer-events-none'
          }`}
        >
          {soundOn ? (
            <Volume2 className="h-5 w-5" aria-hidden="true" />
          ) : (
            <VolumeX className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      ) : null}

      <span
        className={`pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/60 ${fade}`}
      >
        Scroll
      </span>
    </section>
  );
}
