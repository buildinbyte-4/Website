'use client';
import { useState } from 'react';
import Link from 'next/link';
import FloatingContactButton from '@/components/FloatingContactButton';

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
        a: "No. BuiltInByte is fully cloud-based. You can access all features directly through your web browser at https://builtinbyte.in without downloading or installing additional software."
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
    <main className="min-h-screen bg-brutal-bg text-brutal-black font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation / Back to home */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-brutal-black text-xs font-black uppercase shadow-brutal-sm hover:bg-brutal-yellow transition-all"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Card Header */}
        <div className="bg-white border-4 border-brutal-black p-6 sm:p-10 shadow-brutal mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-brutal-black bg-brutal-yellow px-3 py-1 border-2 border-brutal-black inline-block mb-4 shadow-brutal-sm">
            Help Center
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-brutal-black uppercase tracking-tight mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-sm font-bold text-[#64748B] uppercase">
            Everything you need to know about BuiltInByte.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8">
          {FAQ_DATA.map((cat, catIdx) => {
            const catColors = ['bg-brutal-yellow', 'bg-brutal-pink', 'bg-brutal-green', 'bg-brutal-blue', 'bg-brutal-yellow'];
            const catBg = catColors[catIdx % catColors.length];

            return (
              <div key={catIdx} className="bg-white border-4 border-brutal-black p-6 sm:p-8 shadow-brutal space-y-4">
                <h2 className={`font-display font-black text-xl text-brutal-black uppercase px-3 py-1.5 border-2 border-brutal-black inline-block ${catBg} shadow-brutal-sm mb-2`}>
                  {cat.category}
                </h2>

                <div className="space-y-3">
                  {cat.items.map((item, itemIdx) => {
                    const key = `${catIdx}-${itemIdx}`;
                    const isOpen = Boolean(openIndex[key]);

                    return (
                      <div
                        key={itemIdx}
                        className="border-2 border-brutal-black bg-brutal-bg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(catIdx, itemIdx)}
                          className="w-full text-left p-4 bg-white flex items-center justify-between font-black text-sm uppercase text-brutal-black hover:bg-brutal-yellow/30 transition-colors"
                        >
                          <span>{item.q}</span>
                          <span className="font-mono font-black text-lg ml-4">
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="p-4 bg-brutal-bg border-t-2 border-brutal-black text-xs sm:text-sm font-bold text-brutal-black leading-relaxed">
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
          <div className="bg-brutal-yellow p-6 border-4 border-brutal-black shadow-brutal text-center space-y-2">
            <h3 className="font-display font-black text-xl uppercase text-brutal-black">
              Still have questions?
            </h3>
            <p className="text-xs sm:text-sm font-bold text-brutal-black">
              Reach out to our support team directly at{' '}
              <a href="mailto:support@builtinbyte.in" className="text-[#0066FF] underline font-black">
                support@builtinbyte.in
              </a>
            </p>
          </div>
        </div>

      </div>

      {/* Floating Contact Widget */}
      <FloatingContactButton />
    </main>
  );
}
