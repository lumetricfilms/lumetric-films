import logoIcon from '../assets/lumetric-icon.svg';
import wordmarkLogo from '../assets/lumetric-wordmark.svg';
import Reveal from './Reveal.jsx';

// Soft cyan glow spots that fade in, drift, and fade out around the screen.
const spots = [
  { top: '18%', left: '10%', size: 200, dx: '26px', dy: '-34px', opacity: 0.35, dur: '14s', delay: '0s' },
  { top: '64%', left: '16%', size: 150, dx: '-22px', dy: '26px', opacity: 0.3, dur: '18s', delay: '2.4s' },
  { top: '24%', left: '80%', size: 240, dx: '32px', dy: '22px', opacity: 0.4, dur: '16s', delay: '1.1s' },
  { top: '70%', left: '84%', size: 160, dx: '-28px', dy: '-24px', opacity: 0.32, dur: '20s', delay: '3.2s' },
  { top: '50%', left: '46%', size: 120, dx: '20px', dy: '30px', opacity: 0.22, dur: '13s', delay: '4.5s' },
  { top: '84%', left: '50%', size: 130, dx: '-18px', dy: '-28px', opacity: 0.3, dur: '17s', delay: '1.8s' },
  { top: '10%', left: '58%', size: 110, dx: '24px', dy: '26px', opacity: 0.28, dur: '15s', delay: '3.8s' },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-28 sm:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(34,211,238,.22),transparent_30%),linear-gradient(135deg,rgba(3,7,18,.95),rgba(9,9,11,.7)_45%,rgba(0,0,0,.98))]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />

      {/* Drifting grid */}
      <div className="hero-grid absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* Floating cyan spots */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {spots.map((spot, index) => (
          <span
            key={index}
            className="hero-spot absolute rounded-full bg-cyan-300/40 blur-3xl"
            style={{
              top: spot.top,
              left: spot.left,
              width: spot.size,
              height: spot.size,
              '--spot-dx': spot.dx,
              '--spot-dy': spot.dy,
              '--spot-opacity': spot.opacity,
              '--spot-dur': spot.dur,
              '--spot-delay': spot.delay,
            }}
          />
        ))}
      </div>

      {/* Pulsing glow behind the logo */}
      <div
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] rounded-full bg-cyan-400/15 blur-3xl"
        aria-hidden="true"
      />

      {/* Corner frame */}
      <div className="pointer-events-none absolute inset-x-5 top-28 bottom-12 hidden sm:block">
        <span className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-white/60" />
        <span className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-white/60" />
        <span className="absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-white/60" />
        <span className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-white/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <img
            src={logoIcon}
            alt=""
            className="mb-8 h-20 w-20 rounded-xl border border-white/10 shadow-[0_0_40px_rgba(34,211,238,.28)] sm:h-24 sm:w-24"
            aria-hidden="true"
          />
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.34em] text-cyan-200">
            Video Production + Photography
          </p>
          <h1 className="w-full">
            <span className="sr-only">Lumetric Films</span>
            <img
              src={wordmarkLogo}
              alt=""
              className="mx-auto w-full max-w-2xl object-contain drop-shadow-[0_0_32px_rgba(34,211,238,.18)]"
              aria-hidden="true"
            />
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-zinc-300 sm:text-2xl sm:leading-9">
            Cinematic video and photography for artists, brands, and unforgettable moments.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-7 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_28px_rgba(34,211,238,.35)] transition hover:bg-white"
            >
              View Work
            </a>
            <a
              href="mailto:lumetricfilms@gmail.com"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-cyan-200 hover:bg-white/10"
            >
              Book a Project
            </a>
          </div>
        </Reveal>
      </div>

      <span className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50">
        Scroll
      </span>
    </section>
  );
}
