function getMonogram(title = '') {
  const words = title.split(/\s+/).filter(word => word && !/^(buildinbyte|template|website|app)$/i.test(word));
  if (!words.length) return 'BI';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export default function ProjectCoverArt({ project }) {
  if (!project) return null;
  const category = project.industry || project.category || 'Custom project';

  return (
    <div className="relative h-40 shrink-0 overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-canvas">
      <div className="relative flex h-full items-center justify-center">
        <span className="font-display text-5xl font-semibold tracking-[-0.05em] text-slate-800/80 dark:text-white/85">{getMonogram(project.title)}</span>
      </div>
      <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/75 px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-canvas/60 dark:text-zinc-300">
        {category}
      </div>
    </div>
  );
}
