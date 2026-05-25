const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Instagram', href: 'https://www.instagram.com/lumetricfilms' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <p>Copyright 2026 Lumetric Films. All rights reserved.</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-cyan-200">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
