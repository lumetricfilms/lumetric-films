import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/media.js';
import logoIcon from '../assets/lumetric-icon.svg';
import Wordmark from './Wordmark.jsx';

// Play the flicker entrance once per tab session; instant on return visits.
const INTRO_SEEN_KEY = 'lf-intro-seen';

function introAlreadySeen() {
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    // private mode; the intro just replays
  }
}

// Glow spots that fade in, drift, and fade out one at a time, mixing cyan,
// green, and red at varied sizes.
const SPOT_INTERVAL = 4.5;
const spots = [
  { top: '18%', left: '10%', size: 200, dx: '26px', dy: '-34px', opacity: 0.45, color: 'bg-cyan-300/45' },
  { top: '64%', left: '16%', size: 150, dx: '-22px', dy: '26px', opacity: 0.45, color: 'bg-emerald-400/45' },
  { top: '24%', left: '80%', size: 240, dx: '32px', dy: '22px', opacity: 0.5, color: 'bg-cyan-300/45' },
  { top: '70%', left: '84%', size: 160, dx: '-28px', dy: '-24px', opacity: 0.45, color: 'bg-red-500/45' },
  { top: '50%', left: '46%', size: 120, dx: '20px', dy: '30px', opacity: 0.4, color: 'bg-cyan-300/45' },
  { top: '84%', left: '50%', size: 130, dx: '-18px', dy: '-28px', opacity: 0.45, color: 'bg-emerald-400/45' },
  { top: '10%', left: '58%', size: 110, dx: '24px', dy: '26px', opacity: 0.45, color: 'bg-red-500/45' },
];
const SPOT_CYCLE = spots.length * SPOT_INTERVAL;

// Entrance timeline: the dot flickers (ends ~0.1s delay + 1s = 1.1s), the "i"
// stem fades in just behind it, then everything else appears. Kept tight so
// the headline and CTAs exist within ~1.3s of first paint.
const STEM_DELAY_MS = 1000;
const REVEAL_DELAY_MS = 1300;

export default function Hero() {
  const [skipIntro] = useState(() => prefersReducedMotion() || introAlreadySeen());
  const [stemIn, setStemIn] = useState(skipIntro);
  const [entered, setEntered] = useState(skipIntro);
  const sectionRef = useRef(null);
  // Pause the infinite hero animations while scrolled past the hero, so they
  // stop consuming compositor/paint time for the rest of the page.
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => setIdle(!entries[entries.length - 1].isIntersecting),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (skipIntro) return undefined;
    const stemTimer = window.setTimeout(() => setStemIn(true), STEM_DELAY_MS);
    const revealTimer = window.setTimeout(() => {
      setEntered(true);
      markIntroSeen();
    }, REVEAL_DELAY_MS);
    return () => {
      window.clearTimeout(stemTimer);
      window.clearTimeout(revealTimer);
    };
  }, [skipIntro]);

  const rise = `transition-all duration-700 ease-out ${
    entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  }`;
  const fade = `transition-opacity duration-1000 ease-out ${
    entered ? 'opacity-100' : 'opacity-0'
  }`;

  return (
    <section
      id="top"
      ref={sectionRef}
      className={`relative flex min-h-svh items-center justify-center overflow-hidden bg-zinc-950 px-5 pt-28 sm:px-8 ${
        idle ? 'hero-idle' : ''
      }`}
    >
      {/* Decorative background, revealed after the flicker. */}
      <div className={`absolute inset-0 ${fade}`} aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(34,211,238,.22),transparent_30%),linear-gradient(135deg,rgba(3,7,18,.95),rgba(9,9,11,.7)_45%,rgba(0,0,0,.98))]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />

        {/* Oversized by one 72px cell so the transform pan never shows an edge. */}
        <div className="hero-grid absolute -inset-[72px] opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="pointer-events-none absolute inset-0">
          {spots.map((spot, index) => (
            <span
              key={index}
              className={`hero-spot absolute rounded-full blur-3xl ${spot.color}`}
              style={{
                top: spot.top,
                left: spot.left,
                width: spot.size,
                height: spot.size,
                '--spot-dx': spot.dx,
                '--spot-dy': spot.dy,
                '--spot-opacity': spot.opacity,
                '--spot-dur': `${SPOT_CYCLE}s`,
                '--spot-delay': `${index * SPOT_INTERVAL}s`,
              }}
            />
          ))}
        </div>

        <div className="hero-glow pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="pointer-events-none absolute inset-x-5 top-28 bottom-12 hidden sm:block">
          <span className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-white/60" />
          <span className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-white/60" />
          <span className="absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-white/60" />
          <span className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-white/60" />
        </div>
      </div>

      {/* Long fade of the whole hero (grid, glow, base) into pure black, so it
          melts seamlessly into the black first video below instead of cutting. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-64 bg-gradient-to-b from-transparent to-black sm:h-80"
        aria-hidden="true"
      />

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
            className={`mt-8 max-w-2xl text-xl leading-8 text-zinc-300 sm:text-2xl sm:leading-9 ${rise}`}
            style={{ transitionDelay: entered ? '120ms' : '0ms' }}
          >
            Music videos, live shows, and brand films with a cinematic eye — shot, cut,
            and colored in the Bronx, NYC.
          </p>
          <div
            className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row ${rise}`}
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

      <span
        className={`pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50 ${fade}`}
      >
        Scroll
      </span>
    </section>
  );
}
