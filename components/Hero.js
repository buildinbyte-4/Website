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
    <section className="relative overflow-hidden border-b border-slate-200 bg-transparent py-16 dark:border-white/10 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main positioning */}
          <div className="lg:col-span-7 space-y-6">

            {/* Headline */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 dark:border-brand-400/20 dark:bg-brand-950/40 dark:text-brand-300">
              <span className="h-2 w-2 rounded-full bg-brand-500" /> Software, designed around your business
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
              <span className="animate-drop-1 block">We build</span>
              <div className="animate-drop-2">
                <span className="mt-1 inline-block min-w-[220px] py-1 text-brand-600 transition-colors sm:min-w-[320px] dark:text-brand-400">
                  {tickerWords[tickerIndex]}
                </span>
              </div>
              <span className="animate-drop-3 block mt-1">that scale.</span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-zinc-300 sm:text-xl">
              We design, build, and launch production-ready digital products for ambitious businesses—from modern websites to complex software platforms.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <button
                onClick={() => onOpenInquiry({ title: 'Book a Technical Scoping Call' })}
                className="btn-primary animate-cta-1"
              >
                Book a scoping call
              </button>

              <a href="#case-studies" className="btn-secondary animate-cta-2">
                View our work
              </a>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap items-center gap-2.5 pt-6 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 font-semibold">
              <span className="bg-white dark:bg-white/5 px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-full inline-flex items-center animate-badge-1">React & Next.js</span>
              <span className="bg-white dark:bg-white/5 px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-full inline-flex items-center animate-badge-2">Node APIs</span>
              <span className="bg-white dark:bg-white/5 px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-full inline-flex items-center animate-badge-3">PostgreSQL</span>
              <span className="bg-white dark:bg-white/5 px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-full inline-flex items-center animate-badge-4">AWS / GCP</span>
              <span className="bg-white dark:bg-white/5 px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-full inline-flex items-center animate-badge-5">Embedded C/C++</span>
              <span className="bg-white dark:bg-white/5 px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-full inline-flex items-center animate-badge-6">PCB & Hardware</span>
              <span className="bg-white dark:bg-white/5 px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-full inline-flex items-center animate-badge-7">Python & FastAPI</span>
            </div>

          </div>

          <div className="lg:col-span-5 animate-project-card">
            <div className="project-scoping-card relative overflow-hidden p-6 sm:p-7">
              
              {/* Header Section */}
              <div className="animate-project-header flex flex-col gap-2 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                    Start Your Project
                  </h3>
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
                    Quick estimate
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-zinc-400">
                  Select your solution type and timeline to launch your custom project.
                </p>
              </div>

              {/* Step 1: Solution Type Pills */}
              <div className="mb-6 animate-project-step-1">
                <span className="mb-3 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                  Step 1: Select Solution Type
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {['Web App', 'Custom API', 'IoT/Hardware', 'Dashboard'].map((type) => {
                    const isSelected = selectedType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        aria-pressed={isSelected}
                        className={`flex min-h-10 w-full items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium ${
                          isSelected ? 'border-brand-600 bg-primary text-primary-foreground shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-canvas dark:text-zinc-100 dark:hover:bg-slate-800'
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
                <span className="mb-3 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                  Step 2: Estimated Timeline
                </span>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full border border-slate-200 bg-white p-2.5 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-canvas dark:text-zinc-100"
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
                  className="btn-primary w-full py-3"
                >
                  Continue with this scope
                </button>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
