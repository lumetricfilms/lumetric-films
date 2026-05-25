import { Camera, Clapperboard, Edit3, Music2, Sparkles } from 'lucide-react';

const services = [
  {
    title: 'Music Videos',
    description: 'Performance, narrative, and stylized visuals shaped around the sound.',
    icon: Music2,
  },
  {
    title: 'Events',
    description: 'Cinematic coverage for milestone nights, showcases, and live moments.',
    icon: Sparkles,
  },
  {
    title: 'Commercial Work',
    description: 'Polished brand films, social spots, and product-focused visuals.',
    icon: Clapperboard,
  },
  {
    title: 'Photography',
    description: 'Portraits, editorial imagery, event stills, and campaign photography.',
    icon: Camera,
  },
  {
    title: 'Editing',
    description: 'Rhythmic cuts, color, polish, and delivery for public or review-ready cuts.',
    icon: Edit3,
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Services
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            Production support from first concept to final frame.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {services.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-lg border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-cyan-200/40 hover:bg-cyan-300/[0.06]"
            >
              <Icon className="h-7 w-7 text-cyan-200" aria-hidden="true" />
              <h3 className="mt-8 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
