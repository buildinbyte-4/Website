'use client';
import { useState } from 'react';

export default function Hero({ onOpenInquiry }) {
  const [selectedType, setSelectedType] = useState('Embedded & Hardware');
  const [timeline, setTimeline] = useState('4-8 weeks');

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-canvas overflow-hidden">
      {/* Background Matrix Binary Accent Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url('/images/3ce439a152a704da5f7e52c6902689ab.jpg')" }}
      />

      <div className="page-wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-8">
            <p className="label-meta">Hardware · Software · Cloud</p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-semibold text-ink tracking-tight leading-[1.08]">
              Engineering businesses through technology.
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
              BuildInByte delivers complete end-to-end engineering solutions—from custom firmware, ESP32/STM32 microcontrollers, and multi-layer PCB design to cloud architecture, web applications, and AI-powered automation.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenInquiry({ title: 'Request Technical Scoping' })}
                className="btn-primary"
              >
                Request a scoping call
              </button>
              <a href="#capabilities" className="btn-ghost">
                Explore capabilities
              </a>
            </div>

            {/* Live Developer Workstation Feature Showcase */}
            <div className="pt-4">
              <div className="border border-line bg-surface p-2 rounded-sm shadow-sm overflow-hidden group">
                <div className="relative h-44 sm:h-52 w-full overflow-hidden">
                  <img 
                    src="/images/6a03bbb4b6245ba3e5ca718c.webp" 
                    alt="BuildInByte Engineering Studio & Workstation" 
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-transparent to-transparent flex items-end p-4">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-mono font-medium text-ink bg-surface/90 px-2.5 py-1 border border-line">
                        ⚡ Active Dev Studio & Telemetry Dashboard
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                        ● System Online
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {['ESP32 & STM32', 'Custom PCB layout', 'Next.js & React', 'Industrial IoT', 'AWS & Cloud', 'AI automation'].map((tag) => (
                <span key={tag} className="atelier-chip">{tag}</span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-surface border border-line p-6 sm:p-8 shadow-sm">
              <div className="flex items-baseline justify-between pb-5 border-b border-line mb-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    Project scoping
                  </h3>
                  <p className="text-sm text-muted mt-1">Tell us the shape of the work.</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <label className="label-meta block">01 — Technical scope</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Embedded & Hardware',
                    'Custom PCB Design',
                    'Enterprise Web/SaaS',
                    'IoT & AI Cloud'
                  ].map((type) => {
                    const isSelected = selectedType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`p-3 text-xs text-left transition-colors duration-atelier border ${
                          isSelected
                            ? 'border-accent text-accent bg-canvas'
                            : 'border-line text-muted hover:border-ink'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <label className="label-meta block">02 — Target timeline</label>
                <div className="grid grid-cols-3 gap-2">
                  {['2-4 Weeks', '4-8 Weeks', '8-12+ Weeks'].map((time) => {
                    const isSelected = timeline === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setTimeline(time)}
                        className={`p-2.5 text-xs text-center transition-colors duration-atelier border ${
                          isSelected
                            ? 'border-accent text-accent bg-canvas'
                            : 'border-line text-muted hover:border-ink'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 border border-line bg-canvas space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-faint">Scope</span>
                  <span className="text-ink font-medium">{selectedType}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-faint">Timeline</span>
                  <span className="text-ink font-medium">{timeline}</span>
                </div>
                <button
                  onClick={() =>
                    onOpenInquiry({
                      title: `Scope Request: ${selectedType}`,
                      message: `I'm interested in an estimated project for ${selectedType} targeting a timeline of ${timeline}.`
                    })
                  }
                  className="w-full mt-2 btn-primary py-2.5 text-xs"
                >
                  Submit scope inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
