import { ArrowUpRight } from 'lucide-react';
import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';

// Editorial index rows instead of an icon-card grid, carrying the showcase's
// numbered, typographic DNA into the lower half of the page.
const services = [
  {
    title: 'Music Videos',
    description: 'Performance, narrative, and stylized visuals shaped around the sound.',
    href: '#music-videos',
  },
  {
    title: 'Live Events & School Shows',
    description:
      'Concerts, showcases, recitals, and school programs — covered live, delivered as recap films and full-show cuts.',
    href: '#live-performances',
  },
  {
    title: 'Short Form Edits',
    description: 'Fast social cuts for reels, viral clips, campaigns, and creator content.',
    href: '#social-short-form',
  },
  {
    title: 'Photography',
    description: 'Portraits, editorial imagery, event stills, and campaign photography.',
    href: '#photography',
  },
  {
    title: 'Editing',
    description: 'Your footage, finished — rhythmic cuts, color grading, and a final polish ready to post.',
    href: '#pricing',
  },
];

const pad = (n) => String(n).padStart(2, '0');

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-3xl">
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
            Production support from first concept to final frame.
          </h2>
        </Reveal>
        <div className="border-t border-white/10">
          {services.map(({ title, description, href }, index) => (
            <Reveal key={title} delay={index * 60}>
              <a
                href={href}
                className="group grid items-baseline gap-2 border-b border-white/10 py-7 transition duration-300 hover:bg-cyan-300/[0.04] sm:grid-cols-[5rem_1fr_auto] sm:gap-6 sm:py-8"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200/70 transition group-hover:text-cyan-200">
                  {pad(index + 1)}
                </span>
                <span className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="font-['Space_Grotesk',Inter,sans-serif] text-2xl font-semibold text-white transition duration-300 group-hover:translate-x-1 group-hover:text-cyan-100 sm:text-3xl">
                    {title}
                  </span>
                  <span className="max-w-md text-sm leading-6 text-zinc-400">{description}</span>
                </span>
                <ArrowUpRight
                  className="hidden h-5 w-5 text-zinc-500 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-200 sm:block"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
