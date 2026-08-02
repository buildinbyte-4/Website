'use client';

export default function DemoModal({ project, onClose, onOpenInquiry }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border-2 border-[#000000] rounded-lg max-w-2xl w-full p-6 shadow-[6px_6px_0px_#000000] relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#FFFFFF] border-2 border-[#000000] text-[#000000] font-bold flex items-center justify-center hover:bg-[#000000] hover:text-white transition-all"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="badge-available">{project.category}</span>
          {project.industry && (
            <span className="text-xs font-bold text-text-muted">{project.industry}</span>
          )}
        </div>

        <h2 className="font-display font-bold text-2xl text-[#000000] mb-2">
          {project.title} — Solution Overview
        </h2>

        <p className="text-xs text-[#18181B] mb-6 leading-relaxed">
          {project.desc}
        </p>

        {/* Solution Preview / Live Iframe Container */}
        {project.demoUrl ? (
          <div className="mb-6 border-2 border-[#000000] rounded-lg overflow-hidden bg-[#FFFFFF]">
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
          <div className="rounded-lg overflow-hidden aspect-[16/9] bg-[#F8FAFC] border-2 border-[#000000] mb-6 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#18181B]">
              <span className="font-bold text-[#000000]">Solution Capabilities</span>
              <span className="font-mono bg-[#FFFFFF] border border-[#000000] text-[#000000] px-2 py-0.5 rounded">Status: Ready to Customize</span>
            </div>

            <div className="bg-[#FFFFFF] p-4 rounded-lg border-2 border-[#000000] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#000000]">Solution Architecture</span>
                <span className="text-xs font-display font-bold text-accent-blue">Enterprise Grade</span>
              </div>
              <div className="h-3 w-full bg-accent-blue/15 rounded-full overflow-hidden">
                <div className="h-full bg-accent-blue w-3/4 rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* What's Included */}
        <div className="mb-6 p-4 rounded-lg bg-[#F8FAFC] border-2 border-[#000000]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#18181B] block mb-3">
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
              <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#000000]">
                <span className="text-accent-blue font-black">✓</span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#18181B] block mb-2">
            Technology Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item, idx) => (
              <span key={idx} className="text-xs font-bold px-3 py-1 rounded bg-[#FFFFFF] text-[#000000] border border-[#000000]">
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
