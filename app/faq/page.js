'use client';
import { useState } from 'react';
import Link from 'next/link';
import FloatingContactButton from '@/components/FloatingContactButton';
import MarketingShell from '@/components/MarketingShell';
import { useFAQ } from '@/hooks/useFAQ';

const FAQ_DATA = [
  {
    category: "1. Working with BuildInByte",
    items: [
      {
        q: "What does BuildInByte build?",
        a: "We design and deliver custom software, web applications, websites, APIs, automation, AI-enabled workflows, and connected hardware solutions."
      },
      {
        q: "Who do you usually work with?",
        a: "We work with startups, growing businesses, and operational teams that need a reliable technical partner for a defined build or an evolving product roadmap."
      },
      {
        q: "Can you work with an early-stage idea?",
        a: "Yes. A discovery sprint can turn an early idea into prioritized requirements, a technical direction, and a delivery roadmap before development begins."
      }
    ]
  },
  {
    category: "2. Scope and delivery",
    items: [
      {
        q: "How does a project begin?",
        a: "Start by sending a project brief. We review the business outcome, users, constraints, timing, and budget before recommending discovery or a delivery approach."
      },
      {
        q: "How will I follow progress?",
        a: "Active clients receive access to the BuildInByte user portal for milestones, project updates, billing information, and support. Regular reviews keep decisions and progress visible."
      },
      {
        q: "Can you improve an existing product?",
        a: "Yes. We can assess an existing codebase or workflow, identify the highest-value improvements, and deliver them through a focused project or ongoing engagement."
      }
    ]
  },
  {
    category: "3. Engagements and commercial terms",
    items: [
      {
        q: "How can we engage BuildInByte?",
        a: "We offer discovery sprints, fixed-scope builds, dedicated monthly delivery, and post-launch care. We recommend the model that best fits the amount of uncertainty and the pace of work."
      },
      {
        q: "How much does a project cost?",
        a: "Cost depends on scope, complexity, timeline, and engagement model. Share an indicative budget in the project brief and we will discuss what can be delivered responsibly within it."
      },
      {
        q: "Do you provide a proposal before work starts?",
        a: "Yes. Once the scope is understood, we document the intended outcome, responsibilities, milestones, commercial terms, and assumptions before delivery begins."
      }
    ]
  },
  {
    category: "4. After launch",
    items: [
      {
        q: "Do you support products after launch?",
        a: "Yes. Care and growth engagements can cover maintenance, monitoring, security updates, performance improvements, and planned product iterations."
      },
      {
        q: "How quickly will you respond?",
        a: "We aim to respond to qualified project and support inquiries within 24–48 business hours."
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState({});
  const { faq } = useFAQ();
  const displayedFaq = faq.length > 0
    ? [{ category: 'General Questions', items: faq.map((item) => ({ q: item.question, a: item.answer })) }]
    : FAQ_DATA;

  const toggleItem = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenIndex(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
              Help Center
            </span>
            <h1 className="font-display font-semibold text-3xl sm:text-5xl text-foreground  tracking-tight mb-2">
              Frequently Asked Questions
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 ">
              What to expect when working with BuildInByte.
            </p>
          </div>
          <div className="shrink-0 border border-slate-200 dark:border-white/10 bg-white dark:bg-bg-surface-dark p-3 shadow-card-sm self-start sm:self-center">
            <img src="/brand-logo.png" alt="BuildInByte Logo" className="h-14 sm:h-20 w-auto" />
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8">
          {displayedFaq.map((cat, catIdx) => {
            const catColors = ['bg-accent-soft', 'bg-violet', 'bg-success', 'bg-primary', 'bg-accent-soft'];
            const catBg = catColors[catIdx % catColors.length];

            return (
              <div key={catIdx} className="bg-white dark:bg-bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-card space-y-4">
                <h2 className={`font-display font-semibold text-xl text-foreground  px-3 py-1.5 border border-slate-200 dark:border-white/10 inline-block ${catBg} shadow-card-sm mb-2`}>
                  {cat.category}
                </h2>

                <div className="space-y-3">
                  {cat.items.map((item, itemIdx) => {
                    const key = `${catIdx}-${itemIdx}`;
                    const isOpen = Boolean(openIndex[key]);

                    return (
                      <div
                        key={itemIdx}
                        className="border border-slate-200 dark:border-white/10 bg-canvas overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(catIdx, itemIdx)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${key}`}
                          className="w-full text-left p-4 bg-white dark:bg-bg-surface-dark flex items-center justify-between font-semibold text-sm  text-foreground hover:bg-accent-soft/30 transition-colors"
                        >
                          <span>{item.q}</span>
                          <span className="font-mono font-semibold text-lg ml-4">
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>

                        {isOpen && (
                          <div id={`faq-panel-${key}`} className="p-4 bg-canvas border-t border-slate-200 dark:border-white/10 text-xs sm:text-sm font-medium text-foreground leading-relaxed">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Contact Prompt */}
          <div className="bg-accent-soft rounded-xl p-6 border border-slate-200 dark:border-white/10 shadow-card text-center space-y-2">
            <h3 className="font-display font-semibold text-xl  text-foreground">
              Still have questions?
            </h3>
            <p className="text-xs sm:text-sm font-medium text-foreground">
              Reach out to our support team directly at{' '}
              <a href="mailto:support@buildinbyte.in" className="text-[#111110] underline font-semibold">
                support@buildinbyte.in
              </a>
            </p>
          </div>
        </div>

      </div>

      {/* Floating Contact Widget */}
      <FloatingContactButton />
    </main></MarketingShell>
  );
}
