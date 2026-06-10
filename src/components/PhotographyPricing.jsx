import { ArrowRight, Check, Clock, ImagePlus, RotateCcw, Zap } from 'lucide-react';
import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';

// One card per photography session type. `popular` highlights the recommended
// option, matching the video pricing section.
const packages = [
  {
    name: 'Graduation Session',
    price: '$250',
    tagline:
      'Celebrate your accomplishments with a personalized session built around this milestone.',
    features: [
      'Up to 1.5 hours of coverage',
      'One location of your choice',
      'Unlimited outfit changes within your session',
      '15 professionally edited high-resolution images',
      'Online gallery to view and download',
      '1 complimentary revision on selected edits',
    ],
    fine: 'Additional edited images $10 each',
  },
  {
    name: 'Creative Portrait Session',
    price: '$300',
    popular: true,
    tagline:
      'Personal branding, artistic concepts, lifestyle portraits, birthdays, and social content.',
    features: [
      'Up to 2 hours of coverage',
      'One to two nearby locations',
      'Multiple outfit changes',
      'Creative direction and posing assistance',
      '20 professionally edited high-resolution images',
      'Online gallery delivery',
      '1 complimentary revision on selected edits',
    ],
    fine: 'Additional edited images $10 each',
  },
  {
    name: 'Professional Headshots',
    price: '$175',
    tagline: 'Clean, polished portraits for LinkedIn, business websites, and professional use.',
    features: [
      'Up to 45 minutes of coverage',
      'One outfit change',
      '5 professionally edited high-resolution images',
      'Online gallery delivery',
      '1 complimentary revision on selected edits',
    ],
    fine: 'Additional edited images $15 each',
  },
  {
    name: 'Event Coverage',
    price: 'From $200',
    cadence: 'per hour',
    tagline:
      'Celebrations, community events, and corporate gatherings, captured as they happen.',
    features: [
      'Professional event coverage',
      'Candid and posed photographs',
      'Professionally edited online gallery',
      'About 40 to 60 edited images per hour',
      '1 complimentary revision on selected edits',
    ],
    fine: 'Starting rate · 2 hour minimum booking',
  },
  {
    name: 'Mini Session',
    price: '$150',
    tagline: 'A shorter, budget-friendly option for individuals, couples, or seasonal portraits.',
    features: [
      'Up to 30 minutes of coverage',
      'One location',
      '8 professionally edited high-resolution images',
      'Online gallery delivery',
      '1 complimentary revision on selected edits',
    ],
    fine: 'Additional edited images $10 each',
  },
];

const addons = [
  {
    name: 'Extra Session Time',
    price: '$75 / hour',
    description: 'Need more coverage? Extra time can be added based on availability.',
    icon: Clock,
  },
  {
    name: 'Additional Edited Images',
    price: 'From $10 each',
    description: 'Choose more images from your gallery to receive professional editing.',
    icon: ImagePlus,
  },
  {
    name: 'Rush Delivery',
    price: '$100',
    description: 'Receive your finished gallery sooner with expedited editing.',
    icon: Zap,
  },
  {
    name: 'Additional Revisions',
    price: '$50',
    description: 'One revision is included with every session. Extra revisions on request.',
    icon: RotateCcw,
  },
];

function PackageCard({ plan }) {
  const { name, price, cadence, tagline, features, fine, popular } = plan;
  return (
    <article
      className={`group relative flex h-full flex-col rounded-lg border p-7 transition duration-300 hover:-translate-y-1 ${
        popular
          ? 'border-cyan-200/50 bg-cyan-300/[0.06] shadow-[0_0_42px_-14px_rgba(34,211,238,.55)]'
          : 'border-white/10 bg-white/[0.035] hover:border-cyan-200/40 hover:bg-cyan-300/[0.06]'
      }`}
    >
      {popular ? (
        <span className="absolute -top-3 right-6 rounded-full bg-cyan-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-950">
          Most popular
        </span>
      ) : null}

      <h4 className="text-lg font-semibold text-white">{name}</h4>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{tagline}</p>

      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-4xl font-semibold text-white">{price}</span>
        {cadence ? <span className="text-sm text-zinc-400">{cadence}</span> : null}
      </div>

      <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-6 text-zinc-300">
            <Check className="mt-0.5 h-4 w-4 flex-none text-cyan-200" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <p className="text-xs leading-5 text-zinc-500">{fine}</p>
        <a
          href="#contact"
          className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
            popular
              ? 'bg-cyan-200 text-zinc-950 shadow-[0_0_24px_rgba(34,211,238,.32)] hover:bg-white'
              : 'border border-cyan-300/40 text-cyan-100 hover:border-cyan-200 hover:bg-cyan-300/10'
          }`}
        >
          Book session
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function PhotographyPricing() {
  return (
    <section id="photography-pricing" className="scroll-mt-24 px-5 pb-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
            Photography services and pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Capture life's milestones, celebrate your achievements, and bring your creative vision
            to life with professional photography tailored to your story. Every session includes
            professional editing and one complimentary revision on your selected images.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((plan, index) => (
            <Reveal key={plan.name} className="h-full" delay={(index % 3) * 90}>
              <PackageCard plan={plan} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-7 sm:p-9">
            <h3 className="text-xl font-semibold text-white">Additional services</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {addons.map(({ name, price, description, icon: Icon }) => (
                <div
                  key={name}
                  className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-5"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-cyan-200/10 text-cyan-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h4 className="text-base font-semibold text-white">{name}</h4>
                      <span className="text-sm font-semibold text-cyan-200">{price}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-lg border border-cyan-200/20 bg-[radial-gradient(circle_at_82%_28%,rgba(34,211,238,.16),transparent_30%),linear-gradient(135deg,rgba(24,24,27,.96),rgba(9,9,11,.98))] p-8 sm:p-12">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">Ready to book?</h3>
                <p className="mt-3 max-w-xl text-base leading-7 text-zinc-300">
                  Let's create images you'll cherish for years to come. Reach out to discuss your
                  vision, reserve your date, and get an experience tailored to you.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex flex-none items-center justify-center gap-2 rounded-full bg-cyan-200 px-8 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_28px_rgba(34,211,238,.35)] transition hover:bg-white"
              >
                Book a Session
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
