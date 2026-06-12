import logoIcon from '../assets/lumetric-icon.png';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Photography', href: '#photography' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Instagram', href: 'https://www.instagram.com/lumetricfilms', external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm text-zinc-400 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="" className="h-8 w-8 rounded-md" aria-hidden="true" />
            <p className="font-semibold text-zinc-300">Lumetric Films · Bronx, New York</p>
          </div>
          <p className="mt-3">
            <a href="mailto:lumetricfilms@gmail.com" className="transition hover:text-cyan-200">
              lumetricfilms@gmail.com
            </a>
            <span className="px-2 text-zinc-600">·</span>
            <a href="tel:+13478473788" className="transition hover:text-cyan-200">
              (347) 847-3788
            </a>
          </p>
          <p className="mt-3 text-zinc-500">
            Copyright {new Date().getFullYear()} Lumetric Films. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="transition hover:text-cyan-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
