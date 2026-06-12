import { ArrowRight, Check } from 'lucide-react';

// One pricing card, shared by every tab of the Pricing section. `popular`
// lifts the recommended option so hierarchy comes from layout, not just color.
export default function PlanCard({ plan, cta = 'Book This Package' }) {
  const { name, price, cadence, tagline, features, fine, popular } = plan;
  return (
    <article
      className={`group relative flex h-full flex-col rounded-lg border p-7 transition duration-300 hover:-translate-y-1 ${
        popular
          ? 'border-cyan-200/50 bg-cyan-300/[0.06] shadow-[0_0_42px_-14px_rgba(34,211,238,.55)] lg:scale-[1.02]'
          : 'border-white/10 bg-white/[0.035] hover:border-cyan-200/40 hover:bg-cyan-300/[0.06]'
      }`}
    >
      {popular ? (
        <span className="absolute -top-3 right-6 rounded-full bg-cyan-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-950">
          Most popular
        </span>
      ) : null}

      <h3 className="text-lg font-semibold text-white">{name}</h3>
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
        {fine ? <p className="text-xs leading-5 text-zinc-400">{fine}</p> : null}
        <a
          href="#contact"
          className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
            popular
              ? 'bg-cyan-200 text-zinc-950 shadow-[0_0_24px_rgba(34,211,238,.32)] hover:bg-white'
              : 'border border-cyan-300/40 text-cyan-100 hover:border-cyan-200 hover:bg-cyan-300/10'
          }`}
        >
          {cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
