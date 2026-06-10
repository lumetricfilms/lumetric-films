import {
  ArrowRight,
  Check,
  Clapperboard,
  Clock,
  RotateCcw,
  Scissors,
  Smartphone,
  Zap,
} from 'lucide-react';
import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';

// Service tiers grouped by the kind of project. Each group renders as a row of
// pricing cards; `popular` highlights the recommended option in that group.
const groups = [
  {
    id: 'production',
    title: 'Video production',
    blurb: 'Full coverage, from on-site filming to a finished, polished cut.',
    icon: Clapperboard,
    cols: 'lg:grid-cols-2',
    plans: [
      {
        name: 'Basic Production',
        price: '$350',
        tagline:
          'Perfect for social media content, interviews, event highlights, and promotional videos.',
        features: [
          'Up to 2 hours of on-site filming',
          'Professional video editing',
          'Final video up to 2 minutes',
          'Basic color correction',
          'Music integration (provided or royalty-free)',
          'Simple text and title graphics',
          'Delivery in your preferred format',
          '1 complimentary revision',
        ],
        fine: 'Additional revisions $50 each · Extra filming $75 per hour',
      },
      {
        name: 'Standard Production',
        price: '$500',
        popular: true,
        tagline:
          'Ideal for businesses, organizations, and creators who want a more polished, comprehensive video.',
        features: [
          'Up to 4 hours of on-site filming',
          'Professional video editing',
          'Final video up to 5 minutes',
          'Enhanced color grading',
          'Audio balancing and cleanup',
          'Motion graphics and custom text elements',
          'Music integration',
          'Delivery in your preferred format',
          '1 complimentary revision',
        ],
        fine: 'Additional revisions $50 each · Extra filming $75 per hour',
      },
    ],
  },
  {
    id: 'editing',
    title: 'Editing services',
    blurb: 'Already have footage? We turn your raw clips into engaging, finished content.',
    icon: Scissors,
    cols: 'lg:grid-cols-2',
    plans: [
      {
        name: 'Basic Editing',
        price: '$150',
        tagline: 'Best for straightforward edits that need clean cuts and simple enhancements.',
        features: [
          'Final video up to 3 minutes',
          'Cutting and arrangement of your footage',
          'Basic transitions',
          'Music synchronization',
          'Simple titles and text overlays',
          'Export optimized for your platform',
          '1 complimentary revision',
        ],
        fine: 'Additional revisions $50 each',
      },
      {
        name: 'Advanced Editing',
        price: '$350',
        popular: true,
        tagline:
          'For YouTube creators and businesses who want a dynamic, polished final product.',
        features: [
          'Final video up to 10 minutes',
          'Advanced editing techniques and pacing',
          'Color correction and grading',
          'Audio enhancement and balancing',
          'Motion graphics and animated text',
          'B-roll integration',
          'Platform-specific export settings',
          '1 complimentary revision',
        ],
        fine: 'Additional revisions $50 each',
      },
    ],
  },
  {
    id: 'short-form',
    title: 'Short-form content',
    blurb: "Vertical content built to capture attention on today's leading platforms.",
    icon: Smartphone,
    cols: 'lg:grid-cols-3',
    plans: [
      {
        name: 'Single Short Edit',
        price: '$100',
        tagline: 'Perfect for creators and businesses keeping a consistent online presence.',
        features: [
          'One short video up to 60 seconds',
          'Editing optimized for audience retention',
          'Captions and subtitles',
          'Sound synchronization',
          'Vertical format for TikTok, Reels, and Shorts',
          '1 complimentary revision',
        ],
        fine: 'Additional revisions $50 each',
      },
      {
        name: 'Short-Form Bundle',
        price: '$250',
        cadence: 'for 3 videos',
        tagline: 'A cost-effective option for clients who need several pieces of content at once.',
        features: [
          'Three professionally edited short videos',
          'Captions and subtitles included',
          'Optimized for TikTok, Reels, and Shorts',
          'Consistent editing style across all videos',
          '1 complimentary revision per video',
        ],
        fine: 'Additional revisions $50 each',
      },
      {
        name: 'Monthly Creator',
        price: '$500',
        cadence: 'per month',
        popular: true,
        tagline: 'A recurring solution for creators and businesses committed to steady growth.',
        features: [
          'Five short videos every month',
          'Priority scheduling and turnaround',
          'Captions and subtitles included',
          'Optimized for TikTok, Reels, and Shorts',
          'Consistent branding and editing style',
          '1 complimentary revision per video',
        ],
        fine: 'Additional revisions $50 each',
      },
    ],
  },
];

const addons = [
  {
    name: 'Rush Delivery',
    price: '$100',
    description: 'Need it sooner? Rush turnaround is available for qualifying projects.',
    icon: Zap,
  },
  {
    name: 'Additional Filming',
    price: '$75 / hour',
    description: 'For coverage beyond the hours included in your selected package.',
    icon: Clock,
  },
  {
    name: 'Additional Revisions',
    price: '$50 each',
    description: 'One revision is included with every service. Extra rounds are billed per round.',
    icon: RotateCcw,
  },
];

function PlanCard({ plan }) {
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
          Get started
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
            Video services and pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Professional video content that helps brands, creators, and organizations tell their
            stories with impact. Every project includes clear communication, close attention to
            detail, and one complimentary revision, so the final piece matches your vision.
          </p>
        </Reveal>

        <div className="space-y-16">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.id}>
                <Reveal className="mb-8 flex items-center gap-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-cyan-200/10 text-cyan-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{group.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{group.blurb}</p>
                  </div>
                </Reveal>
                <div className={`grid gap-4 sm:grid-cols-2 ${group.cols}`}>
                  {group.plans.map((plan, index) => (
                    <Reveal key={plan.name} className="h-full" delay={index * 90}>
                      <PlanCard plan={plan} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Reveal className="mt-16">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-7 sm:p-9">
            <h3 className="text-xl font-semibold text-white">Additional services</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
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
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                  Ready to get started?
                </h3>
                <p className="mt-3 max-w-xl text-base leading-7 text-zinc-300">
                  Whether you are promoting your business, building your brand, or creating content
                  for your audience, we bring your vision to life. Reach out for a custom quote.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex flex-none items-center justify-center gap-2 rounded-full bg-cyan-200 px-8 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_28px_rgba(34,211,238,.35)] transition hover:bg-white"
              >
                Book a Project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
