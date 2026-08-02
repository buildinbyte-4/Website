'use client';
import { METRICS } from '@/lib/data';

export default function MetricsBanner() {
  return (
    <section className="py-12 bg-brutal-bg border-b-4 border-brutal-black">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="editorial-card p-6 bg-white flex flex-col justify-between"
            >
              <div>
                <span className="font-display text-[10px] font-black uppercase tracking-widest text-white bg-brutal-black px-2 py-1 mb-4 inline-block shadow-brutal-sm">
                  {metric.label}
                </span>
                <span className="font-display font-black text-5xl sm:text-6xl text-brutal-black block mb-2 mt-2 leading-none">
                  {metric.value}
                </span>
              </div>
              <span className="text-xs text-brutal-black font-bold uppercase mt-4 block border-t-4 border-brutal-black pt-4">
                {metric.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
