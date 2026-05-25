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
          <span className="relative h-4 w-4 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(34,211,238,.9)]">
            <span className="absolute inset-1 rounded-full bg-white" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
            Lumetric Films
          </span>
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
          href="mailto:booking@lumetricfilms.com"
          className="rounded-full border border-cyan-300/40 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
        >
          Book
        </a>
      </nav>
    </header>
  );
}
