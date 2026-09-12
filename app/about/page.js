'use client';
import Link from 'next/link';
import FloatingContactButton from '@/components/FloatingContactButton';
import MarketingShell from '@/components/MarketingShell';

export default function AboutPage() {
  return (
    <MarketingShell><main className="min-h-screen bg-canvas text-foreground font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation / Back to home */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-semibold  shadow-card-sm hover:bg-accent-soft transition-all"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Card Header */}
        <div className="bg-white dark:bg-bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-card mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold  tracking-widest text-foreground bg-accent-soft px-3 py-1 border border-slate-200 dark:border-white/10 inline-block mb-4 shadow-card-sm">
              Company Overview
            </span>
            <h1 className="font-display font-semibold text-3xl sm:text-5xl text-foreground  tracking-tight mb-2">
              About Us
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 ">
              Where technology meets simplicity.
            </p>
          </div>
          <div className="shrink-0 border border-slate-200 dark:border-white/10 bg-white dark:bg-bg-surface-dark p-3 shadow-card-sm self-start sm:self-center">
            <img src="/brand-logo.png" alt="BuildInByte Logo" className="h-14 sm:h-20 w-auto" />
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white dark:bg-bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-card space-y-8 text-sm leading-relaxed text-foreground font-medium">
          
          <section className="border-b border-[#E2E8F0] pb-6 space-y-3">
            <h2 className="font-display font-semibold text-xl text-foreground  bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              Welcome to BuiltInByte
            </h2>
            <p className="font-medium text-base">
              At BuiltInByte, we build reliable, intuitive, and scalable Software-as-a-Service (SaaS) solutions designed to empower modern digital experiences. Whether you are streamlining workflows, building web applications, or optimizing performance, our platform is engineered to deliver speed, stability, and seamless functionality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-semibold text-xl text-foreground  bg-violet/20 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              Our Mission
            </h2>
            <p className="font-medium text-sm">
              Our mission is to simplify technology for developers, businesses, and creators. We believe software should work effortlessly behind the scenes so you can focus on growing your core projects and delivering value to your audience.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-semibold text-xl text-foreground  bg-success/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              Why BuiltInByte?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-accent-soft/40 rounded-xl p-4 border border-slate-200 dark:border-white/10 shadow-card-sm">
                <h3 className="font-semibold text-sm  text-foreground mb-1">Performance-First Architecture</h3>
                <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium">Built from the ground up to ensure low latency and high availability.</p>
              </div>

              <div className="bg-violet/40 rounded-xl p-4 border border-slate-200 dark:border-white/10 shadow-card-sm">
                <h3 className="font-semibold text-sm  text-foreground mb-1">Developer &amp; User Friendly</h3>
                <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium">Designed with clean interfaces and smooth user journeys in mind.</p>
              </div>

              <div className="bg-success/40 rounded-xl p-4 border border-slate-200 dark:border-white/10 shadow-card-sm">
                <h3 className="font-semibold text-sm  text-foreground mb-1">Security &amp; Privacy</h3>
                <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium">We treat your data with the highest level of care, adhering to modern privacy and compliance standards.</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-brand-50 p-4 shadow-card-sm dark:border-white/10 dark:bg-brand-950/30">
                <h3 className="font-semibold text-sm  text-foreground mb-1">Continuous Innovation</h3>
                <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium">We are constantly updating and expanding our tools to adapt to modern web and software needs.</p>
              </div>
            </div>
          </section>

          <section className="space-y-2 border-t border-[#E2E8F0] pt-6">
            <h2 className="font-display font-semibold text-xl text-foreground  bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              Who We Serve
            </h2>
            <p className="font-medium text-sm">
              BuiltInByte serves developers, startups, modern enterprises, and tech enthusiasts looking for smart, dependable cloud-based tools that just work.
            </p>
          </section>

          <section className="bg-accent-soft rounded-xl p-6 border border-slate-200 dark:border-white/10 shadow-card-sm space-y-3">
            <h2 className="font-display font-semibold text-2xl text-foreground ">
              Connect With Us
            </h2>
            <p className="font-medium text-sm">
              We are always looking for ways to improve and better serve our community. Have ideas, questions, or feedback?
            </p>
            <div className="space-y-1 font-semibold text-sm">
              <p>Email: <a href="mailto:support@builtinbyte.in" className="text-[#111110] underline">support@builtinbyte.in</a></p>
            </div>
          </section>

        </div>
      </div>
      <FloatingContactButton />
    </main></MarketingShell>
  );
}
