import Reveal from './Reveal.jsx';

const clients = ['Bronx Dance Academy', 'MMCC', 'Puri', 'Gensler', 'Fitzroy'];

const stats = [
  { value: '5+', label: 'Years filming' },
  { value: '9', label: 'Featured projects' },
  { value: '5', label: 'Disciplines' },
];

export default function Clients() {
  return (
    <section className="border-y border-white/5 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
            Selected work for
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {clients.map((client) => (
              <span
                key={client}
                className="text-lg font-semibold uppercase tracking-[0.12em] text-zinc-300 transition hover:text-cyan-200 sm:text-xl"
              >
                {client}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal
          delay={120}
          className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/5 pt-10 text-center"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold text-white sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
