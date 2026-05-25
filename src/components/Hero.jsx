import logoIcon from '../assets/lumetric-icon.svg';
import wordmarkLogo from '../assets/lumetric-wordmark.svg';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 sm:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_34%,rgba(34,211,238,.24),transparent_22%),linear-gradient(135deg,rgba(3,7,18,.95),rgba(9,9,11,.68)_45%,rgba(0,0,0,.98))]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
      <div className="absolute right-[10%] top-[24%] h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute right-[18%] top-[30%] h-20 w-20 rounded-full border border-cyan-100/50 bg-cyan-200/20 shadow-[0_0_76px_rgba(34,211,238,.74)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute inset-x-5 top-28 bottom-12 hidden rounded-lg border border-white/10 opacity-70 sm:block" />
      <div className="pointer-events-none absolute inset-x-5 top-28 bottom-12 hidden sm:block">
        <span className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-white/70" />
        <span className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-white/70" />
        <span className="absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-white/70" />
        <span className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-white/70" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="max-w-4xl">
          <img
            src={logoIcon}
            alt=""
            className="mb-8 h-20 w-20 rounded-xl border border-white/10 shadow-[0_0_40px_rgba(34,211,238,.22)] sm:h-24 sm:w-24"
            aria-hidden="true"
          />
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.34em] text-cyan-200">
            Video Production + Photography
          </p>
          <h1 className="max-w-5xl">
            <span className="sr-only">Lumetric Films</span>
            <img
              src={wordmarkLogo}
              alt=""
              className="w-full max-w-3xl object-contain object-left drop-shadow-[0_0_32px_rgba(34,211,238,.14)]"
              aria-hidden="true"
            />
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-zinc-300 sm:text-2xl sm:leading-9">
            Cinematic video and photography for artists, brands, and unforgettable moments.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-7 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_28px_rgba(34,211,238,.35)] transition hover:bg-white"
            >
              View Work
            </a>
            <a
              href="mailto:booking@lumetricfilms.com"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-cyan-200 hover:bg-white/10"
            >
              Book a Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
