import logoIcon from '../assets/lumetric-icon.svg';
import wordmarkLogo from '../assets/lumetric-wordmark.svg';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Lumetric Films home">
          <img src={logoIcon} alt="" className="h-9 w-9 rounded-md" aria-hidden="true" />
          <img
            src={wordmarkLogo}
            alt="Lumetric Films"
            className="h-9 w-32 object-contain object-left sm:w-40"
          />
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-300 transition hover:text-cyan-200"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:lumetricfilms@gmail.com"
          className="rounded-full border border-cyan-300/40 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
        >
          Book
        </a>
      </nav>
    </header>
  );
}
