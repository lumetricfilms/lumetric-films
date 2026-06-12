import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';

// Editorial index rows instead of an icon-card grid, carrying the showcase's
// numbered, typographic DNA into the lower half of the page. Display only —
// not links.
const services = [
  {
    title: 'Music Videos',
    description: 'Performance, narrative, and stylized visuals shaped around the sound.',
  },
  {
    title: 'Live Events & School Shows',
    description:
      'Concerts, showcases, recitals, and school programs — covered live, delivered as recap films and full-show cuts.',
  },
  {
    title: 'Short Form Edits',
    description: 'Fast social cuts for reels, viral clips, campaigns, and creator content.',
  },
  {
    title: 'Photography',
    description: 'Portraits, editorial imagery, event stills, and campaign photography.',
  },
  {
    title: 'Editing',
    description: 'Your footage, finished — rhythmic cuts, color grading, and a final polish ready to post.',
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
        {/* One shared grid: the title column is sized by the longest service
            name (max-content), so every description starts at the same edge.
            Each row spans the parent's columns via subgrid. */}
        <Reveal>
          <div className="border-t border-white/10 lg:grid lg:grid-cols-[5rem_max-content_minmax(0,1fr)]">
            {services.map(({ title, description }, index) => (
              <div
                key={title}
                className="flex flex-col gap-2 border-b border-white/10 py-7 sm:py-8 lg:col-span-3 lg:grid lg:grid-cols-subgrid lg:items-baseline lg:gap-6"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200/70">
                  {pad(index + 1)}
                </span>
                <span className="font-['Space_Grotesk',Inter,sans-serif] text-2xl font-semibold text-white sm:text-3xl">
                  {title}
                </span>
                <span className="max-w-xl text-sm leading-6 text-zinc-400">{description}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
