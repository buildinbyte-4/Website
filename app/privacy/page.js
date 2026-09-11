'use client';
import Link from 'next/link';
import FloatingContactButton from '@/components/FloatingContactButton';
import MarketingShell from '@/components/MarketingShell';

export default function PrivacyPage() {
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
            <span className="text-xs font-semibold  tracking-widest text-foreground bg-violet px-3 py-1 border border-slate-200 dark:border-white/10 inline-block mb-4 shadow-card-sm text-white">
              Legal & Compliance
            </span>
            <h1 className="font-display font-semibold text-3xl sm:text-5xl text-foreground  tracking-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 ">
              Effective Date: August 2, 2026
            </p>
          </div>
          <div className="shrink-0 border border-slate-200 dark:border-white/10 bg-white dark:bg-bg-surface-dark p-3 shadow-card-sm self-start sm:self-center">
            <img src="/logo.jpg" alt="BuildInByte Logo" className="h-14 sm:h-20 w-auto" />
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white dark:bg-bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-card space-y-8 text-sm leading-relaxed text-foreground font-medium">
          
          <section className="border-b border-[#E2E8F0] pb-6">
            <p className="font-medium text-base">
              At <span className="font-semibold">BuiltInByte</span> (&quot;BuiltInByte&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), protecting your privacy is a top priority. This Privacy Policy outlines how we handle, process, and secure user data when you interact with our platform and Software-as-a-Service (SaaS) products.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-violet/20 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              1. Data Processing and Use
            </h2>
            <p>
              When you submit or upload data to BuiltInByte, you retain full ownership of your content. By using our service, you grant BuiltInByte a limited, non-exclusive license to store, process, and display that content solely for the purpose of providing, maintaining, and improving our SaaS platform and user experience.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-violet/20 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              2. Account Information
            </h2>
            <p>
              To deliver our services, we collect and manage user account details provided during registration (such as contact information and credentials). Users are responsible for maintaining the accuracy of their account details and safeguarding their account credentials.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-violet/20 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              3. Payment Data
            </h2>
            <p>
              For services that require paid subscriptions, transactions and payment processing details are handled securely in accordance with applicable billing standards and security regulations.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-violet/20 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              4. Platform Security
            </h2>
            <p>
              We implement standard security measures to safeguard your information against unauthorized access, alteration, or disclosure. However, no internet transmission or electronic storage method is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-violet/20 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              5. Third-Party Links &amp; Compliance
            </h2>
            <p>
              Our platform governed under Indian laws will handle user data responsibly and in compliance with applicable local privacy laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-violet/20 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              6. Updates to This Policy
            </h2>
            <p>
              We reserve the right to update or modify this Privacy Policy as our platform evolves. Any updates will be posted on this page, and your continued use of our website or services constitutes agreement to the updated Privacy Policy.
            </p>
          </section>

          <section className="bg-violet p-6 border border-slate-200 dark:border-white/10 shadow-card-sm text-black">
            <h2 className="font-display font-semibold text-xl text-black  mb-3">
              7. Contact Us
            </h2>
            <p className="mb-2 font-medium">
              If you have questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please reach out to us:
            </p>
            <div className="space-y-1 font-semibold text-sm">
              <p>BuiltInByte</p>
              <p>Email: <a href="mailto:support@builtinbyte.in" className="text-[#111110] underline">support@builtinbyte.in</a></p>
            </div>
          </section>

        </div>
      </div>
      <FloatingContactButton />
    </main></MarketingShell>
  );
}
