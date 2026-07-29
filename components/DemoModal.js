'use client';

export default function DemoModal({ project, onClose, onOpenInquiry }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-[#1A0E09]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] border border-[#800020]/20 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5EFEB] text-[#2C1D11] font-bold flex items-center justify-center hover:bg-[#800020] hover:text-white transition-all"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="badge-available">{project.category}</span>
          {project.industry && (
            <span className="text-xs font-bold text-[#8C7B6E]">{project.industry}</span>
          )}
        </div>

        <h2 className="font-serif font-bold text-2xl text-[#4A0E17] mb-2">
          {project.title} — Solution Overview
        </h2>

        <p className="text-xs text-[#5C4B3E] mb-6 leading-relaxed">
          {project.desc}
        </p>

        {/* Solution Preview Container */}
        <div className="rounded-xl overflow-hidden aspect-[16/9] bg-[#F4EBE1] border border-[#E2D7C7] mb-6 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8C7B6E]">
            <span className="font-bold text-[#4A0E17]">Solution Capabilities</span>
            <span className="font-mono bg-[#FFFDF9] px-2 py-0.5 rounded">Status: Ready to Customize</span>
          </div>

          <div className="bg-[#FFFDF9] p-4 rounded-xl border border-[#E2D7C7] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2C1D11]">Solution Architecture</span>
              <span className="text-xs font-serif font-bold text-[#800020]">Enterprise Grade</span>
            </div>
            <div className="h-3 w-full bg-[#800020]/15 rounded-full overflow-hidden">
              <div className="h-full bg-[#800020] w-3/4 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="mb-6 p-4 rounded-xl bg-[#F4EBE1] border border-[#E2D7C7]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6E] block mb-3">
            What's Included
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Fully Customizable',
              'Scalable Architecture',
              'Modern UI/UX',
              'Deployment Support',
              'Source Code Ownership',
              'Tailored to Your Business',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#2C1D11]">
                <span className="text-[#800020] font-bold">✓</span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6E] block mb-2">
            Technology Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item, idx) => (
              <span key={idx} className="text-xs font-bold px-3 py-1 rounded-lg bg-[#F5EFEB] text-[#2C1D11] border border-[#E2D7C7]">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#800020]/15">
          <div>
            <span className="text-[10px] text-[#8C7B6E] block font-bold uppercase">Fully Customizable</span>
            <span className="font-serif font-bold text-lg text-[#800020]">Tailored to Your Business</span>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="btn-secondary text-xs py-2.5 px-4">
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry({ title: `Request a Quote — ${project.title}` });
              }}
              className="btn-primary text-xs py-2.5 px-5"
            >
              Request a Quote
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
