import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { showcaseSections } from '../data/showcase.js';
import logoIcon from '../assets/lumetric-icon.svg';
import wordmarkLogo from '../assets/lumetric-wordmark.svg';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const categories = showcaseSections.map((section) => ({
  label: section.eyebrow,
  href: `#${section.id}`,
}));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? 'border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Lumetric Films home"
        >
          <img
            src={logoIcon}
            alt=""
            className="h-10 w-10 rounded-md transition duration-300 group-hover:scale-105"
            aria-hidden="true"
          />
          <img
            src={wordmarkLogo}
            alt="Lumetric Films"
            className="h-9 w-36 object-contain object-left sm:h-10 sm:w-44"
          />
        </a>

        <div className="hidden items-center gap-9 md:flex">
          <div className="group relative">
            <a
              href="#work"
              className="relative text-base font-medium tracking-wide text-zinc-200 transition hover:text-white lg:text-lg"
            >
              Work
            </a>
            <div className="invisible absolute left-1/2 top-full z-50 mt-4 w-56 -translate-x-1/2 translate-y-1 rounded-lg border border-white/10 bg-zinc-900/95 p-2 opacity-0 shadow-2xl shadow-black/50 backdrop-blur-xl transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {categories.map((category) => (
                <a
                  key={category.href}
                  href={category.href}
                  className="block rounded-md px-3 py-2 text-sm text-zinc-300 transition hover:bg-cyan-300/10 hover:text-cyan-100"
                >
                  {category.label}
                </a>
              ))}
            </div>
          </div>
          {navItems.slice(1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-base font-medium tracking-wide text-zinc-200 transition hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-cyan-200 after:shadow-[0_0_8px_rgba(34,211,238,.7)] after:transition-transform after:duration-300 hover:after:scale-x-100 lg:text-lg"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="mailto:lumetricfilms@gmail.com"
            className="hidden rounded-full border border-cyan-300/40 px-5 py-2.5 text-sm font-semibold tracking-wide text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10 sm:inline-flex sm:text-base"
          >
            Book
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white transition hover:bg-white/10 md:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-72 max-w-[82vw] flex-col overflow-y-auto border-l border-white/10 bg-zinc-950 p-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white transition hover:bg-white/10"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/5 py-3 text-lg font-semibold text-white transition hover:text-cyan-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <p className="mb-2 mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Categories
            </p>
            <nav className="flex flex-col">
              {categories.map((category) => (
                <a
                  key={category.href}
                  href={category.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm text-zinc-300 transition hover:text-cyan-200"
                >
                  {category.label}
                </a>
              ))}
            </nav>

            <a
              href="mailto:lumetricfilms@gmail.com"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white"
            >
              Book a Project
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
