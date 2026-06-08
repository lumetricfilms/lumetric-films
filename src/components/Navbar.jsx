import { useEffect, useState } from 'react';
import logoIcon from '../assets/lumetric-icon.svg';
import wordmarkLogo from '../assets/lumetric-wordmark.svg';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
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
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-base font-medium tracking-wide text-zinc-200 transition hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-cyan-200 after:shadow-[0_0_8px_rgba(34,211,238,.7)] after:transition-transform after:duration-300 hover:after:scale-x-100 lg:text-lg"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:lumetricfilms@gmail.com"
          className="rounded-full border border-cyan-300/40 px-5 py-2.5 text-sm font-semibold tracking-wide text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10 sm:text-base"
        >
          Book
        </a>
      </nav>
    </header>
  );
}
