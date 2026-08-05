'use client';
import { PROJECTS } from '@/lib/data';

export default function Hero({ onOpenDemo, onOpenInquiry }) {
  const featured = PROJECTS[0];

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-brutal-bg border-b-4 border-brutal-black">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Huge Brutalist Text */}
          <div className="lg:col-span-7 space-y-6">

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[0.9] text-brutal-black uppercase tracking-tighter">
              <span className="animate-drop-1 block">WE BUILD</span>
              <div className="animate-drop-2">
                <span className="bg-brutal-yellow px-2 inline-block -rotate-1 border-4 border-brutal-black shadow-brutal mt-4">SYSTEMS</span>
              </div>
              <span className="animate-drop-3 block mt-4">THAT SCALE.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-brutal-black font-bold uppercase leading-snug border-l-8 border-brutal-pink pl-4 py-2 mt-8 animate-slide-in-left">
              We architect, build, and deploy raw, production-grade custom web applications and APIs for ambitious companies. No fluff.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <button
                onClick={() => onOpenInquiry({ title: 'Book a Technical Scoping Call' })}
                className="btn-primary animate-cta-1"
              >
                BOOK SCOPING CALL
              </button>

              <a href="#projects" className="btn-secondary animate-cta-2">
                VIEW OUR WORK
              </a>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap items-center gap-2.5 pt-6 text-xs sm:text-sm text-brutal-black font-black uppercase">
              <span className="bg-white px-3 py-1.5 border-2 border-brutal-black shadow-brutal-sm inline-flex items-center animate-badge-1">React & Next.js</span>
              <span className="bg-white px-3 py-1.5 border-2 border-brutal-black shadow-brutal-sm inline-flex items-center animate-badge-2">Node APIs</span>
              <span className="bg-white px-3 py-1.5 border-2 border-brutal-black shadow-brutal-sm inline-flex items-center animate-badge-3">PostgreSQL</span>
              <span className="bg-white px-3 py-1.5 border-2 border-brutal-black shadow-brutal-sm inline-flex items-center animate-badge-4">AWS / GCP</span>
              <span className="bg-white px-3 py-1.5 border-2 border-brutal-black shadow-brutal-sm inline-flex items-center animate-badge-5">EMBEDDED C/C++</span>
              <span className="bg-white px-3 py-1.5 border-2 border-brutal-black shadow-brutal-sm inline-flex items-center animate-badge-6">PCB DESIGN & HARDWARE</span>
              <span className="bg-white px-3 py-1.5 border-2 border-brutal-black shadow-brutal-sm inline-flex items-center animate-badge-7">PYTHON & FASTAPI</span>
            </div>

          </div>

          {/* Right Column: Brutal Status Box */}
          <div className="lg:col-span-5">
            <div className="editorial-card p-6 bg-brutal-pink relative group overflow-hidden">
              
              <div className="flex items-center justify-between mb-4 border-b-4 border-brutal-black pb-4">
                <div className="font-black text-2xl uppercase">System Status</div>
                <div className="flex gap-2">
                  <span className="font-black text-sm text-brutal-black bg-brutal-green px-2 py-1 border-2 border-brutal-black shadow-brutal-sm">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Aggressive Data Box */}
              <div className="font-mono text-sm font-bold bg-[#070F26] p-4 border-4 border-brutal-black overflow-hidden shadow-brutal" style={{ lineHeight: 1.6 }}>
                <div className="text-[#22C55E] animate-telemetry-1">&gt; Status: Operational (99.9% Uptime)</div>
                <div className="text-[#22C55E] animate-telemetry-2">&gt; Architecture: Microservices & Embedded Systems</div>
                <div className="text-[#22C55E] animate-telemetry-3">&gt; Latency: &lt; 12ms</div>
                <div className="text-[#22C55E] animate-telemetry-4">&gt; Stack: C/C++, Python, React, Next.js, PostgreSQL</div>
                <div className="animate-telemetry-5 mt-4">
                  <span className="animate-pulse text-[#22C55E]">_</span>
                </div>
              </div>

              <div className="mt-8 bg-white p-4 border-4 border-brutal-black shadow-brutal-sm">
                <h3 className="font-display font-black text-2xl text-brutal-black mb-1 uppercase">
                  Architecture 
                </h3>
                <p className="text-sm text-brutal-black font-bold mb-4 uppercase">
                  Deploying resilient backend services and high-performance frontend interfaces.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onOpenInquiry({ title: 'Request Architecture Review' })}
                    className="btn-secondary py-2 justify-center text-xs"
                  >
                    DOCS
                  </button>
                  <button
                    onClick={() => onOpenInquiry({ title: 'System Demo' })}
                    className="btn-primary py-2 justify-center text-xs"
                  >
                    DEMO
                  </button>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
