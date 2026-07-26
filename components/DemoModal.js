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
          <span className="text-xs font-bold text-[#800020]">{project.status}</span>
        </div>

        <h2 className="font-serif font-bold text-2xl text-[#4A0E17] mb-2">
          {project.title} — Live Interactive Preview
        </h2>

        <p className="text-xs text-[#5C4B3E] mb-6 leading-relaxed">
          {project.desc}
        </p>

        {/* Demo Graphic Container */}
        <div className="rounded-xl overflow-hidden aspect-[16/9] bg-[#F4EBE1] border border-[#E2D7C7] mb-6 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8C7B6E]">
            <span className="font-bold text-[#4A0E17]">Demo Instance #401</span>
            <span className="font-mono bg-[#FFFDF9] px-2 py-0.5 rounded">Status: Live Engine</span>
          </div>

          <div className="bg-[#FFFDF9] p-4 rounded-xl border border-[#E2D7C7] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2C1D11]">System Throughput</span>
              <span className="text-xs font-serif font-bold text-[#800020]">99.98% Uptime</span>
            </div>
            <div className="h-3 w-full bg-[#800020]/15 rounded-full overflow-hidden">
              <div className="h-full bg-[#800020] w-3/4 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6E] block mb-2">
            Included Technical Architecture
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
            <span className="text-[10px] text-[#8C7B6E] block font-bold uppercase">Instant Code Ownership</span>
            <span className="font-serif font-bold text-3xl text-[#800020]">{project.price}</span>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="btn-secondary text-xs py-2.5 px-4">
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry({ title: `Purchase ${project.title}` });
              }}
              className="btn-primary text-xs py-2.5 px-5"
            >
              Enquire / Purchase Code
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
