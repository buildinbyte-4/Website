'use client';

export default function DemoModal({ project, onClose, onOpenInquiry }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-bg-primary-dark backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-primary-dark border border-accent-blue rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-bg-primary-dark text-text-primary font-bold flex items-center justify-center hover:bg-accent-blue hover:text-white transition-all"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="badge-available">{project.category}</span>
          {project.industry && (
            <span className="text-xs font-bold text-text-muted">{project.industry}</span>
          )}
        </div>

        <h2 className="font-display font-bold text-2xl text-text-primary mb-2">
          {project.title} — Solution Overview
        </h2>

        <p className="text-xs text-text-secondary mb-6 leading-relaxed">
          {project.desc}
        </p>

        {/* Solution Preview / Live Iframe Container */}
        {project.demoUrl ? (
          <div className="mb-6 border border-accent-blue rounded-xl overflow-hidden shadow-inner bg-bg-primary-dark">
            <div className="bg-[#4A0E17] px-4 py-2 flex items-center justify-between text-xs text-[#FFFDF9]">
              <span className="font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Live Static Website Preview
              </span>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-blue hover:bg-[#9E1B32] text-white px-3 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1"
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
          <div className="rounded-xl overflow-hidden aspect-[16/9] bg-bg-primary-dark border border-border-subtle mb-6 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span className="font-bold text-text-primary">Solution Capabilities</span>
              <span className="font-mono bg-bg-primary-dark px-2 py-0.5 rounded">Status: Ready to Customize</span>
            </div>

            <div className="bg-bg-primary-dark p-4 rounded-xl border border-border-subtle shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-primary">Solution Architecture</span>
                <span className="text-xs font-display font-bold text-accent-blue">Enterprise Grade</span>
              </div>
              <div className="h-3 w-full bg-accent-blue/15 rounded-full overflow-hidden">
                <div className="h-full bg-accent-blue w-3/4 rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* What's Included */}
        <div className="mb-6 p-4 rounded-xl bg-bg-primary-dark border border-border-subtle">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-3">
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
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-text-primary">
                <span className="text-accent-blue font-bold">✓</span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-2">
            Technology Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item, idx) => (
              <span key={idx} className="text-xs font-bold px-3 py-1 rounded-lg bg-bg-primary-dark text-text-primary border border-border-subtle">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-accent-blue">
          <div>
            <span className="text-[10px] text-text-muted block font-bold uppercase">Ready to Customize</span>
            <span className="font-display font-bold text-lg text-accent-blue">Tailored for Your Brand</span>
          </div>

          <div className="flex gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2.5 px-3 flex items-center gap-1"
              >
                Live Demo ↗
              </a>
            )}
            <button onClick={onClose} className="btn-secondary text-xs py-2.5 px-3">
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry({ title: `Request a Quote — ${project.title}` });
              }}
              className="btn-primary text-xs py-2.5 px-4"
            >
              Request Quote
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
