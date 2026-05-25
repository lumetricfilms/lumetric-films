import { Instagram, Mail, Phone } from 'lucide-react';

const contactItems = [
  {
    label: 'Email',
    value: 'booking@lumetricfilms.com',
    href: 'mailto:booking@lumetricfilms.com',
    icon: Mail,
  },
  {
    label: 'Phone',
    value: '(000) 000-0000',
    href: 'tel:+10000000000',
    icon: Phone,
  },
  {
    label: 'Instagram',
    value: '@lumetricfilms',
    href: 'https://www.instagram.com/lumetricfilms',
    icon: Instagram,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-7xl rounded-lg border border-cyan-200/20 bg-[radial-gradient(circle_at_78%_28%,rgba(34,211,238,.18),transparent_24%),linear-gradient(135deg,rgba(24,24,27,.96),rgba(9,9,11,.98))] p-7 sm:p-10 lg:p-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
              Contact
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Ready to shape the next frame?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Share the project, date, location, and the kind of feeling the finished
              piece needs to carry.
            </p>
            <a
              href="mailto:booking@lumetricfilms.com?subject=Project%20Booking%20Inquiry"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-200 px-7 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white"
            >
              Book a Project
            </a>
          </div>
          <div className="space-y-4">
            {contactItems.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-200/40 hover:bg-cyan-300/[0.07]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-200/10 text-cyan-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.22em] text-zinc-500">
                    {label}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-white">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
