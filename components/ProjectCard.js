'use client';

import ProjectCoverArt from './ProjectCoverArt';

export default function ProjectCard({ project, index, isVisible, onOpenDemo, onOpenInquiry }) {
  const hasDemo = Boolean(project.demoUrl);

  return (
    <article
      className={`group ui-card flex h-full flex-col justify-between p-0 card-reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <ProjectCoverArt project={project} />

      <div className="flex-1 border-b border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-bg-surface-dark">
        <h4 className="mb-3 font-display text-2xl font-semibold tracking-tight text-foreground">
          {project.title}
        </h4>

        <p className="mb-6 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-zinc-400">
          {project.desc}
        </p>

        <div className="mb-2 flex flex-wrap gap-2">
          {project.stack?.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-bg-surface-dark dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 dark:bg-bg-surface-dark">
        <div className="grid grid-cols-2 gap-3">
          {hasDemo ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-invert cursor-pointer justify-center py-3 text-xs"
            >
              Live demo
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onOpenDemo?.(project)}
              className="btn-secondary-invert cursor-pointer justify-center py-3 text-xs"
            >
              View architecture
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenInquiry?.({ title: `Technical Inquiry — ${project.title}` })}
            className="btn-secondary-invert cursor-pointer justify-center py-3 text-xs"
          >
            Customize
          </button>
        </div>
      </div>
    </article>
  );
}
