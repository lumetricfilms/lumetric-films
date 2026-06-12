import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { INCLUDED_NOTE, pricingTabs } from '../data/pricing.js';
import Eyebrow from './Eyebrow.jsx';
import PlanCard from './PlanCard.jsx';
import Reveal from './Reveal.jsx';

// One pricing section for the whole studio: video production, editing,
// short-form, and photography as tabs instead of 5,000px of stacked cards.
// Every panel stays in the DOM (hidden) so the full rate card prints and
// remains indexable.
export default function Pricing() {
  const [activeId, setActiveId] = useState(pricingTabs[0].id);
  const tabRefs = useRef({});

  // Standard tablist arrow-key behavior: Left/Right move and focus tabs.
  const onTabKeyDown = (event) => {
    const index = pricingTabs.findIndex((tab) => tab.id === activeId);
    let target = null;
    if (event.key === 'ArrowRight') target = (index + 1) % pricingTabs.length;
    else if (event.key === 'ArrowLeft')
      target = (index - 1 + pricingTabs.length) % pricingTabs.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = pricingTabs.length - 1;
    if (target === null) return;
    event.preventDefault();
    const tab = pricingTabs[target];
    setActiveId(tab.id);
    tabRefs.current[tab.id]?.focus();
  };

  return (
    <section id="pricing" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
            Flat rates. No surprises.
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Video and photography packages with clear communication, close attention to
            detail, and one complimentary revision on every project. Pick a starting
            point — custom quotes are a message away.
          </p>
        </Reveal>

        <Reveal>
          <div
            role="tablist"
            aria-label="Pricing categories"
            className="mb-10 flex flex-wrap gap-2"
          >
            {pricingTabs.map((tab) => {
              const Icon = tab.icon;
              const selected = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`pricing-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`pricing-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(tab.id)}
                  onKeyDown={onTabKeyDown}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                    selected
                      ? 'border-cyan-200 bg-cyan-200 text-zinc-950 shadow-[0_0_24px_rgba(34,211,238,.3)]'
                      : 'border-white/15 text-zinc-300 hover:border-cyan-200/50 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {pricingTabs.map((tab) => {
          const active = tab.id === activeId;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`pricing-panel-${tab.id}`}
              aria-labelledby={`pricing-tab-${tab.id}`}
              tabIndex={0}
              className={active ? 'print:block' : 'hidden print:block'}
            >
              <p className="mb-8 max-w-2xl text-sm leading-7 text-zinc-400">{tab.blurb}</p>
              <div className={`grid items-stretch gap-4 sm:grid-cols-2 ${tab.cols}`}>
                {tab.plans.map((plan, index) => (
                  <Reveal key={plan.name} className="h-full" delay={(index % 3) * 90}>
                    <PlanCard plan={plan} cta={tab.cta} />
                  </Reveal>
                ))}
              </div>
              <p className="mt-6 text-xs leading-5 text-zinc-400">{INCLUDED_NOTE}</p>

              <Reveal className="mt-12">
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-7 sm:p-9">
                  <h3 className="text-xl font-semibold text-white">Additional services</h3>
                  <div
                    className={`mt-6 grid gap-4 sm:grid-cols-2 ${
                      tab.addons.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                    }`}
                  >
                    {tab.addons.map(({ name, price, description, icon: Icon }) => (
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
            </div>
          );
        })}

        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-lg border border-cyan-200/20 bg-[radial-gradient(circle_at_82%_28%,rgba(34,211,238,.16),transparent_30%),linear-gradient(135deg,rgba(24,24,27,.96),rgba(9,9,11,.98))] p-8 sm:p-12">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                  Not sure which package fits?
                </h3>
                <p className="mt-3 max-w-xl text-base leading-7 text-zinc-300">
                  Promoting a business, dropping a video, or booking a session — describe
                  the project and we will point you to the right starting point, or build
                  a custom quote around it.
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
