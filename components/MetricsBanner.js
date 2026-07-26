import { METRICS } from '@/lib/data';

export default function MetricsBanner() {
  return (
    <section className="py-12 bg-[#F5EFEB] border-y border-[#800020]/15">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {METRICS.map((item, idx) => (
            <div
              key={idx}
              className="editorial-card p-6 bg-[#FFFDF9] border border-[#800020]/15 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020] bg-[#800020]/10 px-2 py-0.5 rounded">
                  Verified Stat
                </span>
              </div>

              <div>
                <span className="font-serif font-bold text-3xl sm:text-4xl text-[#4A0E17] block mb-1">
                  {item.value}
                </span>
                <span className="text-xs font-bold text-[#2C1D11] block">
                  {item.label}
                </span>
                <span className="text-[11px] text-[#8C7B6E]">
                  {item.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
