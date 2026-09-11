'use client';
import Link from 'next/link';
import MarketingShell from '@/components/MarketingShell';

export default function ContactPage() {
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
              Support & Legal Inquiries
            </span>
            <h1 className="font-display font-semibold text-3xl sm:text-5xl text-foreground  tracking-tight mb-2">
              Contact Us
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 ">
              We are here to assist you.
            </p>
          </div>
          <div className="shrink-0 border border-slate-200 dark:border-white/10 bg-white dark:bg-bg-surface-dark p-3 shadow-card-sm self-start sm:self-center">
            <img src="/logo.jpg" alt="BuildInByte Logo" className="h-14 sm:h-20 w-auto" />
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white dark:bg-bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-card space-y-8 text-sm leading-relaxed text-foreground font-medium">
          
          <section className="border-b border-[#E2E8F0] pb-6">
            <p className="font-medium text-base sm:text-lg">
              If you have questions, concerns, feedback, or legal inquiries regarding our Terms of Service or Privacy Policy, please get in touch with us using any of the methods below.
            </p>
          </section>

          <section className="bg-accent-soft rounded-xl p-6 border border-slate-200 dark:border-white/10 shadow-card-sm space-y-4">
            <h2 className="font-display font-semibold text-2xl text-foreground ">
              Reach Out to Us
            </h2>

            <div className="space-y-3 font-medium text-base">
              <div>
                <span className="block font-semibold text-xs  text-foreground/70">Email</span>
                <a href="mailto:support@builtinbyte.in" className="text-[#111110] underline font-semibold">
                  support@builtinbyte.in
                </a>
              </div>
            </div>
          </section>

          <section className="bg-success/20 rounded-xl p-6 border border-slate-200 dark:border-white/10 shadow-card-sm">
            <h3 className="font-display font-semibold text-lg text-foreground  mb-1">
              Response Time
            </h3>
            <p className="font-medium text-sm text-foreground">
              We aim to respond to all inquiries within 24–48 business hours.
            </p>
          </section>

          <section className="bg-violet/20 rounded-xl p-6 border border-slate-200 dark:border-white/10 shadow-card-sm">
            <h3 className="font-display font-semibold text-lg text-foreground  mb-1">
              Note on Privacy
            </h3>
            <p className="font-medium text-sm text-foreground">
              Any personal information submitted through our contact channels is handled strictly in accordance with our <Link href="/privacy" className="text-[#111110] underline font-semibold">Privacy Policy</Link>. We do not share your details with unauthorized third parties.
            </p>
          </section>

        </div>
      </div>
    </main></MarketingShell>
  );
}
