'use client';

export default function DemoModal({ project, onClose, onOpenInquiry }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-ink/40 z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-line max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 border border-line text-muted hover:text-ink hover:border-accent flex items-center justify-center transition-colors duration-atelier"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="atelier-chip">{project.category}</span>
          {project.industry && (
            <span className="text-xs text-faint">{project.industry}</span>
          )}
        </div>

        <h2 className="font-display font-semibold text-2xl text-ink mb-2">
          {project.title} — Solution overview
        </h2>

        <p className="text-sm text-muted mb-6 leading-relaxed">
          {project.desc}
        </p>

        {project.demoUrl ? (
          <div className="mb-6 border border-line overflow-hidden bg-canvas">
            <div className="px-4 py-2 flex items-center justify-between text-xs text-muted border-b border-line">
              <span>Live preview</span>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                Open fullscreen
              </a>
            </div>
            <div className="w-full h-80 bg-surface">
              <iframe
                src={project.demoUrl}
                title={project.title}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        ) : (
          <div className="border border-line mb-6 p-4">
            <div className="flex items-center justify-between text-xs text-muted mb-3">
              <span className="text-ink font-medium">Solution capabilities</span>
              <span className="font-mono">Ready to customize</span>
            </div>
            <p className="text-sm text-muted">Enterprise-grade architecture, tailored to your brand.</p>
          </div>
        )}

        <div className="mb-6 p-4 border border-line bg-canvas">
          <span className="label-meta block mb-3">What's included</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Fully customizable code',
              'Responsive design',
              'Modern UI & performance',
              'Complete source ownership',
              'Deployment assistance',
              'Tailored to your brand',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-ink">
                <span className="text-accent">–</span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <span className="label-meta block mb-2">Technology stack</span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item, idx) => (
              <span key={idx} className="atelier-chip">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-line">
          <div>
            <span className="label-meta block">Ready to customize</span>
            <span className="font-display font-semibold text-ink">Tailored for your brand</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-xs py-2.5 px-3"
              >
                Live demo
              </a>
            )}
            <button onClick={onClose} className="btn-ghost text-xs py-2.5 px-3">
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry({ title: `Request a Quote — ${project.title}` });
              }}
              className="btn-primary text-xs py-2.5 px-4"
            >
              Request quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
