'use client';
import { useState, useEffect } from 'react';
import { PROJECTS } from '@/lib/data';

export default function Hero({ onOpenDemo, onOpenInquiry }) {
  const [selectedType, setSelectedType] = useState('Web App');
  const [timeline, setTimeline] = useState('3-6 weeks');
  const featured = PROJECTS[0];

  const tickerWords = ['SYSTEMS', 'PRODUCTS', 'APIS', 'PLATFORMS'];
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerWords.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-brutal-bg border-b-4 border-brutal-black">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Huge Brutalist Text */}
          <div className="lg:col-span-7 space-y-6">

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[0.9] text-brutal-black uppercase tracking-tighter">
              WE BUILD <br />
              <span className="bg-brutal-yellow px-4 py-1 inline-block -rotate-1 border-4 border-brutal-black shadow-brutal mt-4 min-w-[220px] sm:min-w-[320px] text-center transition-none duration-0">
                {tickerWords[tickerIndex]}
              </span><br/>
              THAT SCALE.
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-brutal-black font-bold uppercase leading-snug border-l-8 border-brutal-pink pl-4 py-2 mt-8">
              We architect, build, and deploy raw, production-grade custom web applications and APIs for ambitious companies. No fluff.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <button
                onClick={() => onOpenInquiry({ title: 'Book a Technical Scoping Call' })}
                className="btn-primary"
              >
                BOOK SCOPING CALL
              </button>

              <a href="#projects" className="btn-secondary">
                VIEW OUR WORK
              </a>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-8 text-sm text-brutal-black font-black uppercase">
              <span className="bg-brutal-green px-3 py-1 border-2 border-brutal-black shadow-brutal-sm animate-badge-1">React & Next.js</span>
              <span className="bg-brutal-pink px-3 py-1 border-2 border-brutal-black shadow-brutal-sm text-white animate-badge-2">Node APIs</span>
              <span className="bg-brutal-yellow px-3 py-1 border-2 border-brutal-black shadow-brutal-sm animate-badge-3">PostgreSQL</span>
              <span className="bg-brutal-blue px-3 py-1 border-2 border-brutal-black shadow-brutal-sm text-white animate-badge-4">AWS / GCP</span>
              <span className="bg-brutal-green px-3 py-1 border-2 border-brutal-black shadow-brutal-sm animate-badge-5">EMBEDDED C/C++</span>
              <span className="bg-brutal-pink px-3 py-1 border-2 border-brutal-black shadow-brutal-sm text-white animate-badge-6">PCB DESIGN & HARDWARE</span>
              <span className="bg-brutal-yellow px-3 py-1 border-2 border-brutal-black shadow-brutal-sm animate-badge-7">PYTHON & FASTAPI</span>
            </div>

          </div>

          {/* Right Column: Start Your Project Widget */}
          <div className="lg:col-span-5 animate-project-card">
            <div className="project-scoping-card p-6 bg-white dark:bg-black border-4 border-brutal-black relative group overflow-hidden">
              
              {/* Header Section */}
              <div className="animate-project-header flex flex-col gap-2 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-2xl text-brutal-black uppercase tracking-tighter">
                    Start Your Project
                  </h3>
                  <span className="font-black text-[10px] tracking-wider text-white bg-brutal-black px-2 py-1 border-2 border-brutal-black uppercase">
                    Interactive Scoping
                  </span>
                </div>
                <p className="text-xs text-brutal-black font-bold uppercase">
                  Select your solution type and timeline to launch your custom project.
                </p>
              </div>

              {/* Step 1: Solution Type Pills */}
              <div className="mb-6 animate-project-step-1">
                <span className="font-black text-[10px] uppercase block mb-3 text-brutal-black/75">
                  Step 1: Select Solution Type
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Web App', 'Custom API', 'IoT/Hardware', 'Dashboard'].map((type) => {
                    const isSelected = selectedType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-1.5 text-xs font-black uppercase border-2 border-brutal-black cursor-pointer shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all ${
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
