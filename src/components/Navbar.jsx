import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { showcaseSections } from '../data/showcase.js';
import logoIcon from '../assets/lumetric-icon.svg';
import wordmarkLogo from '../assets/lumetric-wordmark.svg';

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
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
  const [workOpen, setWorkOpen] = useState(false);

  const menuRef = useRef(null);
  const closeRef = useRef(null);
  const workRef = useRef(null);
  const workBtnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile drawer if the viewport grows to desktop while it is open.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Mobile drawer: lock scroll, move focus in, trap Tab, restore focus, Escape.
  useEffect(() => {
    if (!open) return undefined;

    const opener = document.activeElement;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !menuRef.current) return;
      const items = Array.from(menuRef.current.querySelectorAll(FOCUSABLE)).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      if (opener && typeof opener.focus === 'function') opener.focus();
    };
  }, [open]);

  // Desktop Work dropdown: close on outside click and on Escape.
  useEffect(() => {
    if (!workOpen) return undefined;
    const onPointerDown = (event) => {
      if (workRef.current && !workRef.current.contains(event.target)) {
        setWorkOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setWorkOpen(false);
        workBtnRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [workOpen]);

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
          <div
            ref={workRef}
            className="relative"
            onMouseEnter={() => setWorkOpen(true)}
            onMouseLeave={() => setWorkOpen(false)}
          >
            <button
              ref={workBtnRef}
              type="button"
              aria-haspopup="true"
              aria-expanded={workOpen}
              onClick={() => setWorkOpen((value) => !value)}
              className="inline-flex items-center gap-1 text-base font-medium tracking-wide text-zinc-200 transition hover:text-white lg:text-lg"
            >
              Work
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  workOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 transition duration-200 ${
                workOpen
                  ? 'visible translate-y-0 opacity-100'
                  : 'invisible translate-y-1 opacity-0'
              }`}
            >
              <div
                role="menu"
                aria-label="Work categories"
                className="rounded-lg border border-white/10 bg-zinc-900/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl"
              >
                <a
                  role="menuitem"
                  href="#work"
                  onClick={() => setWorkOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-zinc-300 transition hover:bg-cyan-300/10 hover:text-cyan-100"
                >
                  All Work
                </a>
                {categories.map((category) => (
                  <a
                    key={category.href}
                    role="menuitem"
                    href={category.href}
                    onClick={() => setWorkOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-zinc-300 transition hover:bg-cyan-300/10 hover:text-cyan-100"
                  >
                    {category.label}
                  </a>
                ))}
              </div>
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
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white transition hover:bg-white/10 md:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            ref={menuRef}
            className="absolute right-0 top-0 flex h-full w-72 max-w-[82vw] flex-col overflow-y-auto border-l border-white/10 bg-zinc-950 p-6"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                Menu
              </span>
              <button
                ref={closeRef}
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
