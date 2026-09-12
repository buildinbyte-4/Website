'use client';
import Link from 'next/link';
import FloatingContactButton from '@/components/FloatingContactButton';
import MarketingShell from '@/components/MarketingShell';

export default function TermsPage() {
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
              Legal & Compliance
            </span>
            <h1 className="font-display font-semibold text-3xl sm:text-5xl text-foreground  tracking-tight mb-2">
              Terms of Service
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 ">
              Effective Date: August 2, 2026
            </p>
          </div>
          <div className="shrink-0 border border-slate-200 dark:border-white/10 bg-white dark:bg-bg-surface-dark p-3 shadow-card-sm self-start sm:self-center">
            <img src="/brand-logo.png" alt="BuildInByte Logo" className="h-14 sm:h-20 w-auto" />
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white dark:bg-bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-card space-y-8 text-sm leading-relaxed text-foreground font-medium">
          
          <section className="border-b border-[#E2E8F0] pb-6">
            <p className="font-medium text-base">
              Welcome to <span className="font-semibold">BuiltInByte</span> (&quot;BuiltInByte&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using our Software-as-a-Service (SaaS) platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              1. Eligibility
            </h2>
            <p>
              You must be at least 18 years old or have permission from a parent or legal guardian to use our services.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              2. User Accounts
            </h2>
            <p className="mb-3">To access certain features, you may be required to create an account. You agree to:</p>
            <ul className="list-disc pl-6 space-y-1 font-medium">
              <li>Provide accurate and complete information.</li>
              <li>Keep your login credentials confidential.</li>
              <li>Notify us immediately of any unauthorized use of your account.</li>
              <li>Be responsible for all activities performed under your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              3. Acceptable Use
            </h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1 font-medium">
              <li>Use the service for any unlawful purpose.</li>
              <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts.</li>
              <li>Upload or distribute malicious software, viruses, or harmful code.</li>
              <li>Interfere with the operation or security of the platform.</li>
              <li>Copy, reverse engineer, modify, or redistribute any part of the service without written permission.</li>
              <li>Use automated tools to scrape or misuse our platform unless expressly authorized.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              4. Subscription and Payments
            </h2>
            <p>
              Some features may require a paid subscription. By purchasing a subscription, you agree to pay all applicable fees. Prices may change from time to time, and any changes will apply to future billing periods unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              5. Refunds
            </h2>
            <p>
              Refunds, if applicable, are subject to our cancellation and refund policies or applicable consumer protection laws.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              6. Intellectual Property
            </h2>
            <p>
              All software, source code, trademarks, logos, graphics, documentation, and other content available through BuiltInByte remain the property of BuiltInByte or its licensors. You are granted a limited, non-exclusive, non-transferable, and revocable license to use our services in accordance with these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              7. User Content &amp; Ownership
            </h2>
            <p>
              You retain ownership of any content you upload or submit. You are responsible for ensuring that your content does not violate any law or infringe the rights of others.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              8. Service Availability
            </h2>
            <p>
              We strive to provide reliable service but do not guarantee uninterrupted or error-free operation. We may modify, suspend, or discontinue any part of the service at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              9. Account Suspension or Termination
            </h2>
            <p className="mb-3">We reserve the right to suspend or terminate accounts that:</p>
            <ul className="list-disc pl-6 space-y-1 font-medium">
              <li>Violate these Terms.</li>
              <li>Engage in fraudulent or illegal activities.</li>
              <li>Abuse or disrupt the platform or other users.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              10. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, BuiltInByte shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform. Our total liability for any claim shall not exceed the amount you paid for the service during the preceding 12 months.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              11. Disclaimer
            </h2>
            <p>
              The service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              12. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in India.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3 bg-accent-soft/30 px-3 py-1 border-l-4 border-slate-200 dark:border-white/10 inline-block">
              13. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. Continued use of the service after changes become effective constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="bg-accent-soft rounded-xl p-6 border border-slate-200 dark:border-white/10 shadow-card-sm">
            <h2 className="font-display font-semibold text-xl text-foreground  mb-3">
              14. Contact Us
            </h2>
            <p className="mb-2 font-medium">
              If you have any questions regarding these Terms of Service, please contact us:
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
