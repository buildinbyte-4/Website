'use client';
import { PROJECTS } from '@/lib/data';

export default function Hero({ onOpenDemo, onOpenInquiry }) {
  const featured = PROJECTS[0];

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#FFFDF9] to-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & Dual CTAs */}
          <div className="lg:col-span-7 space-y-6">

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#4A0E17]">
              Tailored Software & Digital Solutions, <br />
              <span className="italic text-[#800020]">Built by Students.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[#5C4B3E] max-w-2xl font-normal leading-relaxed">
              Production-ready software, custom web applications, and digital tools built by our student team.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#projects" className="btn-primary text-base px-7 py-3.5 shadow-md">
                <span>View Available Projects</span>
                <span>→</span>
              </a>

              <button
                onClick={() => onOpenInquiry({ title: 'Book Custom Build' })}
                className="btn-secondary text-base px-7 py-3.5"
              >
                <span>Book Custom Build</span>
              </button>
            </div>

            {/* Guarantee Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#800020]/15 text-xs text-[#5C4B3E] font-medium">
              <div className="flex items-center gap-2">
                <span className="text-[#800020] font-bold">✓</span>
                <span>100% Owned Source Code</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#800020] font-bold">✓</span>
                <span>Direct Partner Contact</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <span className="text-[#800020] font-bold">✓</span>
                <span>5-Day Fast Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Featured Card Preview */}
          <div className="lg:col-span-5">
            <div className="editorial-card p-6 bg-[#FFFDF9] border border-[#800020]/20 shadow-xl relative group">
              
              <div className="flex items-center justify-between mb-4">
                <span className="badge-available">Featured Solution</span>
                <span className="font-serif font-bold text-3xl text-[#800020]">
                  {featured.price}
                </span>
              </div>

              {/* Graphical Preview Box */}
              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-[#F4EBE1] border border-[#E2D7C7] mb-4 p-4 flex flex-col justify-between relative">
                <div className="flex items-center justify-between text-xs text-[#8C7B6E]">
                  <span className="font-mono bg-[#FFFDF9] px-2 py-0.5 rounded border border-[#E2D7C7]">v2.4.0</span>
                  <span className="font-bold text-[#800020]">{featured.category}</span>
                </div>
                
                {/* Mock UI Element */}
                <div className="bg-[#FFFDF9] p-3 rounded-lg border border-[#E2D7C7] shadow-sm space-y-2">
                  <div className="h-2 w-3/4 bg-[#800020]/20 rounded"></div>
                  <div className="h-2 w-1/2 bg-[#5C4B3E]/20 rounded"></div>
                  <div className="flex gap-2 pt-1">
                    <div className="h-4 w-12 bg-[#800020]/30 rounded"></div>
                    <div className="h-4 w-16 bg-[#F4EBE1] rounded"></div>
                  </div>
                </div>
              </div>

              <h3 className="font-serif font-bold text-2xl text-[#4A0E17] mb-1">
                {featured.title}
              </h3>

              <p className="text-xs text-[#5C4B3E] mb-4 leading-relaxed">
                {featured.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {featured.stack.map((item, i) => (
                  <span key={i} className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-[#F5EFEB] text-[#2C1D11] border border-[#E2D7C7]">
                    {item}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onOpenDemo(featured)}
                  className="btn-secondary text-xs py-2.5 justify-center"
                >
                  Live Demo
                </button>
                <button
                  onClick={() => onOpenInquiry({ title: `Purchase ${featured.title}` })}
                  className="btn-primary text-xs py-2.5 justify-center"
                >
                  Enquire / Buy
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
