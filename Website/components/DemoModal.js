'use client';

export default function DemoModal({ project, onClose, onOpenInquiry }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="glass-panel rounded-xl p-8 md:p-12 relative overflow-hidden border-0 max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 border-2 border-white/20 bg-surface/50 dark:bg-surface/50 text-on-surface-variant dark:text-on-surface-variant font-bold flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-pointer select-none"
        >
          ✕
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase bg-primary/10 px-2 py-1 rounded border border-primary/20">
              {project.category}
            </span>
            {project.industry && (
              <span className="font-body-md text-body-md text-on-surface-variant ml-2">{project.industry}</span>
            )}
          </div>

          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
            {project.title} — Solution Overview
          </h2>

          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            {project.desc}
          </p>

          {/* Solution Preview / Live Iframe Container */}
          {project.demoUrl ? (
            <div className="mb-6 rounded-lg overflow-hidden border border-outline/20 bg-surface-container-high">
              <div className="bg-primary/10 px-4 py-2 flex items-center justify-between text-xs text-primary">
                <span className="font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Live Static Website Preview
                </span>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-on-primary px-3 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1"
                >
                  Open in Fullscreen ↗
                </a>
              </div>
              <div className="w-full h-80 bg-white">
                <iframe
                  src={project.demoUrl}
                  title={project.title}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden aspect-[16/9] bg-surface-container-high border border-outline/20 mb-6 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span className="font-bold">Solution Capabilities</span>
                <span className="font-mono bg-white border border-outline/10 text-on-surface px-2 py-0.5 rounded">Status: Ready to Customize</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-outline/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface-variant">Solution Architecture</span>
                  <span className="font-display font-bold text-lg text-primary">Enterprise Grade</span>
                </div>
                <div className="h-3 w-full bg-primary/15 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/4 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* What's Included */}
          <div className="mb-6 p-4 rounded-lg border border-outline/20">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-3">
              What's Included
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Fully Customizable Static/Dynamic Code',
                'Responsive Design Across All Devices',
                'Modern Clean UI & High Speed Performance',
                'Complete Source Code Ownership',
                'Deployment & Hosting Assistance',
                'Tailored to Your Specific Brand',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
                  <span className="text-primary font-black">✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
              Technology Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item, idx) => (
                <span key={idx} className="text-xs font-bold px-3 py-1 rounded bg-white text-on-surface border border-outline/10">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-outline/20">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block">Ready to Customize</span>
              <span className="font-display font-bold text-lg text-primary">Tailored for Your Brand</span>
            </div>

            <div className="flex gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel border border-primary text-primary font-label-caps text-label-caps px-6 py-3 rounded hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Live Demo <span class="material-symbols-outlined">arrow_forward</span>
                </a>
              )}
              <button onClick={onClose} className="glass-panel border border-primary text-primary font-label-caps text-label-caps px-6 py-3 rounded hover:bg-primary/10 transition-all duration-300">
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry({ title: `Request a Quote — ${project.title}` });
                }}
                className="w-full bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded hover:bg-primary-fixed transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2"
              >
                Request Quote
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}