'use client';

export default function InquiryModal({ config, onClose }) {
  if (!config) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border-2 border-[#000000] rounded-lg max-w-lg w-full p-6 shadow-[6px_6px_0px_#000000] relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#FFFFFF] border-2 border-[#000000] text-[#000000] font-bold flex items-center justify-center hover:bg-[#000000] hover:text-white transition-all"
        >
          ✕
        </button>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#000000] bg-[#FFFFFF] px-2.5 py-1 rounded border-2 border-[#000000] shadow-[2px_2px_0px_#000000] inline-block mb-2">
            Direct Consultation Channel
          </span>
          
          <h2 className="font-display font-bold text-2xl text-[#000000] mb-1">
            {config.title || 'Initiate Client Inquiry'}
          </h2>

          <p className="text-xs text-[#18181B] mb-6">
            Connect directly with our delivery team. We respond within 24 hours with a tailored path forward.
          </p>

          <form
            action="https://formsubmit.co/support@buildinbyte.in"
            method="POST"
            className="space-y-4 text-xs"
          >
            <input type="hidden" name="_subject" value={config.title || 'New Client Inquiry'} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div>
              <label className="block font-bold text-[#000000] mb-1">Full Name *</label>
              <input
                required
                type="text"
                name="name"
                placeholder="e.g. Alex Sterling"
                className="w-full px-3.5 py-2.5 rounded bg-[#FFFFFF] border-2 border-[#000000] text-xs text-[#000000] focus:outline-none focus:border-[#000000] shadow-[2px_2px_0px_#000000]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#000000] mb-1">Work Email *</label>
              <input
                required
                type="email"
                name="email"
                placeholder="alex@company.com"
                className="w-full px-3.5 py-2.5 rounded bg-[#FFFFFF] border-2 border-[#000000] text-xs text-[#000000] focus:outline-none focus:border-[#000000] shadow-[2px_2px_0px_#000000]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#000000] mb-1">Company / Organization</label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Vanguard Labs"
                className="w-full px-3.5 py-2.5 rounded bg-[#FFFFFF] border-2 border-[#000000] text-xs text-[#000000] focus:outline-none focus:border-[#000000] shadow-[2px_2px_0px_#000000]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#000000] mb-1">Project Scope & Requirements</label>
              <textarea
                rows={3}
                name="scope"
                placeholder="Detail your technology requirements, timeframe, or desired features..."
                className="w-full px-3.5 py-2.5 rounded bg-[#FFFFFF] border-2 border-[#000000] text-xs text-[#000000] focus:outline-none focus:border-[#000000] shadow-[2px_2px_0px_#000000]"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary text-xs py-2.5 px-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2"
              >
                <span>Submit Inquiry</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}


