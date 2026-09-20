import Link from 'next/link';
import { ArrowRight, Check, Mail } from 'lucide-react';
import MarketingShell from '@/components/MarketingShell';
import ContactInquiryForm from '@/components/ContactInquiryForm';

export const metadata = {
  title: 'Start a project — BuildInByte',
  description: 'Tell BuildInByte about your software, platform, automation, API, or website project.',
};

const engagements = [
  {
    number: '01', title: 'Discovery sprint',
    bestFor: 'A promising idea that needs definition before development.',
    includes: ['Requirements and priorities', 'Technical direction', 'Delivery roadmap'],
    cadence: 'Short, focused phase',
  },
  {
    number: '02', title: 'Fixed-scope build',
    bestFor: 'A clearly defined product, website, platform, or integration.',
    includes: ['Milestone-based delivery', 'Design and engineering', 'Launch preparation'],
    cadence: 'Project-based',
  },
  {
    number: '03', title: 'Dedicated delivery',
    bestFor: 'An evolving roadmap that needs consistent product capacity.',
    includes: ['Prioritized delivery cycles', 'Ongoing technical leadership', 'Regular progress reviews'],
    cadence: 'Monthly engagement',
  },
  {
    number: '04', title: 'Care and growth',
    bestFor: 'A live product that needs dependable support and iteration.',
    includes: ['Maintenance and monitoring', 'Performance and security work', 'Planned improvements'],
    cadence: 'After launch',
  },
];

export default function ContactPage() {
  return (
    <MarketingShell>
      <main className="bg-canvas px-4 py-12 text-foreground sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="btn-secondary mb-10 text-sm">← Back to home</Link>

          <section className="grid gap-10 border-b border-border-subtle pb-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">Start a project</p>
              <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Tell us what needs to work better.</h1>
            </div>
            <div className="space-y-5">
              <p className="text-base leading-7 text-text-secondary">Share the outcome, the constraint, and where things stand today. We’ll recommend a practical first step—whether that is discovery, a focused build, or ongoing delivery.</p>
              <a href="#project-brief" className="btn-primary w-fit">Send a project brief <ArrowRight size={16} /></a>
            </div>
          </section>

          <section aria-labelledby="engagement-heading" className="py-14 sm:py-20">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">Ways to work together</p>
              <h2 id="engagement-heading" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">An engagement shaped around the work.</h2>
              <p className="mt-4 text-text-secondary">We confirm scope, timing, and commercial terms after an initial conversation. Any budget shown in the project brief is an initial estimate—not a final quote. The final budget is agreed only after the client and BuildInByte team have discussed the requirements.</p>
            </div>

            <div className="grid border-l border-t border-border-subtle sm:grid-cols-2 lg:grid-cols-4">
              {engagements.map((engagement) => (
                <article key={engagement.title} className="flex min-h-full flex-col border-b border-r border-border-subtle bg-bg-surface-dark p-6">
                  <span className="font-mono text-xs text-text-secondary">{engagement.number}</span>
                  <h3 className="mt-8 font-display text-xl font-semibold">{engagement.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">{engagement.bestFor}</p>
                  <ul className="mt-6 space-y-3 text-sm" aria-label={`${engagement.title} includes`}>
                    {engagement.includes.map((item) => <li key={item} className="flex gap-2"><Check aria-hidden="true" className="mt-0.5 shrink-0" size={15} />{item}</li>)}
                  </ul>
                  <p className="mt-auto border-t border-border-subtle pt-6 font-mono text-xs uppercase tracking-wider text-text-secondary">{engagement.cadence}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="project-brief" aria-labelledby="brief-heading" className="grid gap-8 border-t border-border-subtle py-14 sm:py-20 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">Project brief</p>
              <h2 id="brief-heading" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Give us the useful context.</h2>
              <p className="mt-4 max-w-md leading-7 text-text-secondary">You do not need a polished specification. A clear problem, rough timeline, and estimated budget range are enough to begin. Final scope and pricing are confirmed together after discussion.</p>
              <div className="mt-8 border-t border-border-subtle pt-6">
                <p className="text-sm font-semibold">Prefer email?</p>
                <a href="mailto:support@buildinbyte.in" className="mt-2 inline-flex items-center gap-2 text-sm text-text-secondary underline decoration-border-subtle underline-offset-4 hover:text-foreground"><Mail size={15} /> support@buildinbyte.in</a>
              </div>
            </div>
            <ContactInquiryForm />
          </section>
        </div>
      </main>
    </MarketingShell>
  );
}
