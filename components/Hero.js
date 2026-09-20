'use client';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { useHero } from '@/hooks/useHero';

const TICKER_WORDS = ['SYSTEMS', 'PRODUCTS', 'APIS', 'PLATFORMS'];

export default function Hero({ onOpenInquiry }) {
  const { hero } = useHero();

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-transparent py-16 dark:border-white/10 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main positioning */}
          <div className="lg:col-span-7 space-y-6">

            {/* Headline */}
            <h1
              aria-label={hero?.title || 'We build systems, products, APIs, and platforms that scale.'}
              className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl"
            >
              {hero?.title ? (
                <span className="animate-drop-1 block">{hero.title}</span>
              ) : <>
              <span aria-hidden="true" className="animate-drop-1 block">We build</span>
              <span aria-hidden="true" className="animate-drop-2 block">
                <span className="hero-word-rotator mt-1 py-1 text-brand-600 dark:text-brand-400">
                  {TICKER_WORDS.map((word, index) => (
                    <span
                      key={word}
                      className="hero-ticker-word"
                      style={{ '--word-index': index }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </span>
              <span aria-hidden="true" className="animate-drop-3 mt-1 block">that scale.</span>
              </>}
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-zinc-300 sm:text-xl">
              {hero?.subtitle || 'We design, build, and launch production-ready digital products for ambitious businesses—from modern websites to complex software platforms.'}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <button
                onClick={() => onOpenInquiry({ title: 'Book a Technical Scoping Call' })}
                className="btn-primary animate-cta-1"
              >
                {hero?.primary_button || 'Book a scoping call'}
              </button>

              <a href={hero?.secondary_button_link || '#case-studies'} className="btn-secondary animate-cta-2">
                {hero?.secondary_button || 'View our work'}
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
            <div className="project-scoping-card relative overflow-hidden p-7 sm:p-9">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">Have a project in mind?</p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Start a conversation.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-zinc-300">Tell us what you are trying to improve, build, or launch. You do not need a complete specification—we will help shape the right first step.</p>

              <ul className="mt-7 space-y-3 border-t border-slate-200 pt-6 text-sm text-slate-700 dark:border-white/10 dark:text-zinc-300">
                {['Share your requirements', 'Choose an estimated budget', 'Receive a practical next step'].map((item) => (
                  <li key={item} className="flex items-center gap-3"><Check size={16} aria-hidden="true" />{item}</li>
                ))}
              </ul>

              <Link href="/contact#project-brief" className="btn-primary mt-8 w-full py-3">
                Start a conversation <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <p className="mt-4 text-center text-xs text-slate-500 dark:text-zinc-400">We usually respond within 24–48 business hours.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
