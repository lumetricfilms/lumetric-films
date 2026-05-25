import { ExternalLink } from 'lucide-react';
import { videoProjects } from '../data/projects.js';
import VideoEmbed from './VideoEmbed.jsx';

export default function SelectedWork() {
  const projects = videoProjects.filter((project) => !project.featured);

  return (
    <section
      id="work"
      className="scroll-mt-24 bg-[linear-gradient(180deg,rgba(9,9,11,0),rgba(8,47,73,.18),rgba(9,9,11,0))] px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
              Selected Work
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Projects organized under Lumetric Films.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-zinc-400">
            Each entry can point to YouTube or Google Drive, and lists Lumetric&apos;s role
            clearly even when footage is hosted on another account.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950/70"
            >
              <VideoEmbed project={project} />
              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-cyan-200">
                  <span>{project.category}</span>
                  <span className="h-1 w-1 rounded-full bg-cyan-200" />
                  <span>{project.year}</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm font-medium text-zinc-300">{project.role}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{project.description}</p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white"
                >
                  Discuss a similar project
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
