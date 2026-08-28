'use client';
import { useState, useEffect } from 'react';

export default function Hero({ onOpenDemo, onOpenInquiry }) {
  const [selectedType, setSelectedType] = useState('Embedded & Hardware');
  const [timeline, setTimeline] = useState('4-8 weeks');

  const tickerWords = [
    'EMBEDDED SYSTEMS',
    'CUSTOM HARDWARE',
    'ENTERPRISE SAAS',
    'INDUSTRIAL IOT',
    'AI AUTOMATION'
  ];
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerWords.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0b1326]">
      {/* Ambient Radial Glowing Spheres */}
      <div className="ambient-glow-cyan -top-24 -left-24 blur-3xl opacity-60"></div>
      <div className="ambient-glow-violet top-1/2 -right-32 blur-3xl opacity-50"></div>
      
      {/* 3D Matrix Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Glowing Headline & Engineering Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Monospaced Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#4cd7f6] font-mono text-xs tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-ping"></span>
              <span>HARDWARE + SOFTWARE + CLOUD INTEGRATION</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#dae2fd] tracking-tight leading-[1.05]">
              Engineering Businesses <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4cd7f6] via-[#06b6d4] to-[#c4abff]">
                Through Technology.
              </span>
            </h1>

            {/* Dynamic Monospaced Ticker */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-mono text-[#869397] uppercase tracking-widest">Architecting:</span>
              <span className="font-mono text-sm sm:text-base font-bold text-[#4cd7f6] bg-[#171f33] px-3 py-1 rounded border border-[#06b6d4]/30 shadow-inner">
                [ {tickerWords[tickerIndex]} ]
              </span>
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-xl text-[#bcc9cd] leading-relaxed max-w-2xl pt-2 font-normal">
              BuildInByte delivers complete end-to-end engineering solutions—from custom firmware, ESP32/STM32 microcontrollers, and multi-layer PCB design to cloud architecture, web applications, and AI-powered automation.
            </p>

            {/* Dual Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onOpenInquiry({ title: 'Request Technical Scoping' })}
                className="btn-cyan px-7 py-3.5 rounded-xl flex items-center gap-2.5 text-sm tracking-wide font-semibold shadow-xl shadow-cyan-500/20"
              >
                <span>Request Scoping Call</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <a
                href="#capabilities"
                className="btn-ghost-cyan px-6 py-3.5 rounded-xl text-sm font-mono tracking-wide"
              >
                Explore Capabilities ↓
              </a>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-6">
              <span className="tech-badge">ESP32 & STM32</span>
              <span className="tech-badge">Custom PCB Layout</span>
              <span className="tech-badge">Next.js & React</span>
              <span className="tech-badge-violet">Industrial IoT</span>
              <span className="tech-badge-violet">AWS & Cloud</span>
              <span className="tech-badge">AI Automation</span>
            </div>

          </div>

          {/* Right Column: Interactive Solution Scoping Box */}
          <div className="lg:col-span-5">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 relative shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#dae2fd]">
                    Interactive Scoping
                  </h3>
                  <p className="text-xs text-[#869397] font-mono mt-0.5">Custom Engineering Calculator</p>
                </div>
                <span className="tech-badge-violet">BUILDINBYTE LABS</span>
              </div>

              {/* Step 1: Solution Type */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-mono uppercase text-[#bcc9cd] block">
                  01. Select Technical Scope
                </label>
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
                        className={`p-3 rounded-lg text-xs text-left font-mono transition-all ${
                          isSelected
                            ? 'bg-[#06b6d4]/20 border border-[#06b6d4] text-[#4cd7f6] shadow-lg shadow-cyan-500/10'
                            : 'bg-[#131b2e] border border-white/5 text-[#bcc9cd] hover:border-white/20'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Estimated Timeline */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-mono uppercase text-[#bcc9cd] block">
                  02. Target Deployment Timeline
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['2-4 Weeks', '4-8 Weeks', '8-12+ Weeks'].map((time) => {
                    const isSelected = timeline === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setTimeline(time)}
                        className={`p-2.5 rounded-lg text-xs font-mono text-center transition-all ${
                          isSelected
                            ? 'bg-[#8b5cf6]/20 border border-[#8b5cf6] text-[#c4abff]'
                            : 'bg-[#131b2e] border border-white/5 text-[#bcc9cd] hover:border-white/20'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary & Trigger */}
              <div className="p-4 rounded-xl bg-[#060e20] border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#869397]">Scope:</span>
                  <span className="text-[#4cd7f6] font-bold">{selectedType}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#869397]">Target Time:</span>
                  <span className="text-[#c4abff] font-bold">{timeline}</span>
                </div>
                
                <button
                  onClick={() =>
                    onOpenInquiry({
                      title: `Scope Request: ${selectedType}`,
                      message: `I'm interested in an estimated project for ${selectedType} targeting a timeline of ${timeline}.`
                    })
                  }
                  className="w-full mt-2 btn-cyan py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Submit Scope Inquiry</span>
                  <span>→</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
                        onClick={() => setSelectedType(type)}
                        className={`w-full h-full flex items-center justify-center px-3 py-1.5 text-xs font-black uppercase border-2 border-brutal-black cursor-pointer shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all ${
                          isSelected ? 'bg-brutal-black text-white' : 'bg-brutal-yellow text-brutal-black'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Timeline Dropdown */}
              <div className="mb-6 animate-project-step-2">
                <span className="font-black text-[10px] uppercase block mb-3 text-brutal-black/75">
                  Step 2: Estimated Timeline
                </span>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full p-2.5 bg-white border-4 border-brutal-black text-xs font-black uppercase text-brutal-black focus:outline-none focus:bg-brutal-yellow shadow-brutal-sm cursor-pointer"
                >
                  <option value="1-2 weeks">1-2 Weeks (Rapid Prototype)</option>
                  <option value="3-6 weeks">3-6 Weeks (Standard Deployment)</option>
                  <option value="6+ weeks">6+ Weeks (Enterprise / Custom Scale)</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="animate-project-button">
                <button
                  type="button"
                  onClick={() => onOpenInquiry({ title: `Scoping: ${selectedType} (${timeline})` })}
                  className="w-full btn-primary py-3 justify-center text-xs font-black tracking-wider shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  LAUNCH PROJECT SCOPING
                </button>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
