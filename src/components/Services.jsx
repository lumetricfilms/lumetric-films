import { Camera, Edit3, GraduationCap, Music2, Sparkles } from 'lucide-react';
import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';

const services = [
  {
    title: 'Music Videos',
    description: 'Performance, narrative, and stylized visuals shaped around the sound.',
    icon: Music2,
  },
  {
    title: 'School Videography',
    description: 'Clean coverage for school events, programs, recaps, and milestone moments.',
    icon: GraduationCap,
  },
  {
    title: 'Short Form Edits',
    description: 'Fast social cuts for reels, viral clips, campaigns, and creator content.',
    icon: Sparkles,
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
    <section id="services" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-3xl">
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
            Production support from first concept to final frame.
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {services.map(({ title, description, icon: Icon }, index) => (
            <Reveal key={title} className="h-full" delay={index * 90}>
              <article className="group h-full rounded-lg border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/40 hover:bg-cyan-300/[0.06]">
                <Icon
                  className="h-7 w-7 text-cyan-200 transition duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <h3 className="mt-8 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
