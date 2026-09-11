'use client';
import { useState } from 'react';
import Link from 'next/link';
import FloatingContactButton from '@/components/FloatingContactButton';
import MarketingShell from '@/components/MarketingShell';

const FAQ_DATA = [
  {
    category: "1. General Questions",
    items: [
      {
        q: "What is BuiltInByte?",
        a: "BuiltInByte is a Software-as-a-Service (SaaS) platform providing reliable, scalable, and intuitive digital tools and applications designed for developers, creators, and businesses."
      },
      {
        q: "Do I need to download or install any software?",
        a: "No. BuiltInByte is fully cloud-based. You can access all features directly through your web browser without downloading or installing additional software."
      },
      {
        q: "Who can use BuiltInByte?",
        a: "Anyone who is at least 18 years old (or has permission from a parent or legal guardian) can create an account and start using our services."
      }
    ]
  },
  {
    category: "2. Account & Security",
    items: [
      {
        q: "How do I create an account?",
        a: "You can sign up directly on our website by clicking the Sign Up or Get Started button and providing a valid email address and password."
      },
      {
        q: "What should I do if I forget my password?",
        a: "Click on the Forgot Password? link on the login page. We will send a password reset link to the email address associated with your account."
      },
      {
        q: "How is my data secured?",
        a: "We take security seriously. We implement industry-standard encryption protocols and administrative controls to keep your account details, usage data, and content safe from unauthorized access."
      }
    ]
  },
  {
    category: "3. Plans, Pricing & Billing",
    items: [
      {
        q: "Is BuiltInByte free to use?",
        a: "We offer both free options/trials and paid subscription plans, depending on the tools and resources you need. Check our Pricing page for full details on plan tiers."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept major credit/debit cards and supported digital payment gateways available during checkout."
      },
      {
        q: "Can I upgrade, downgrade, or cancel my subscription?",
        a: "Yes. You can manage or cancel your subscription at any time directly through your account settings. Changes will apply to your next billing cycle."
      },
      {
        q: "What is your refund policy?",
        a: "Refund requests are handled in accordance with our Terms of Service and applicable consumer protection laws. If you encounter a billing issue, please contact support."
      }
    ]
  },
  {
    category: "4. Privacy & Usage",
    items: [
      {
        q: "Who owns the content or data I upload?",
        a: "You retain full ownership of all content and data you upload to BuiltInByte. We only process and display your content to deliver and improve our services to you."
      },
      {
        q: "Will my information be shared with third parties?",
        a: "No. We do not sell your personal data. We only process information as strictly necessary to operate our services, as outlined in our Privacy Policy."
      }
    ]
  },
  {
    category: "5. Support & Troubleshooting",
    items: [
      {
        q: "What if I encounter a bug or technical issue?",
        a: "If you run into any issues, please check our status updates or reach out to our team at support@builtinbyte.in with a detailed description of the problem."
      },
      {
        q: "How quickly does support respond?",
        a: "Our support team strives to respond to all inquiries within 24–48 business hours."
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState({});

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
              Everything you need to know about BuiltInByte.
            </p>
          </div>
          <div className="shrink-0 border border-slate-200 dark:border-white/10 bg-white dark:bg-bg-surface-dark p-3 shadow-card-sm self-start sm:self-center">
            <img src="/logo.jpg" alt="BuildInByte Logo" className="h-14 sm:h-20 w-auto" />
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8">
          {FAQ_DATA.map((cat, catIdx) => {
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
              <a href="mailto:support@builtinbyte.in" className="text-[#111110] underline font-semibold">
                support@builtinbyte.in
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
