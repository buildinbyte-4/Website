'use client';
import Link from 'next/link';

export default function ContactPage() {
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
            Support & Legal Inquiries
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-brutal-black uppercase tracking-tight mb-2">
            Contact Us
          </h1>
          <p className="text-sm font-bold text-[#64748B] uppercase">
            We are here to assist you.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white border-4 border-brutal-black p-6 sm:p-10 shadow-brutal space-y-8 text-sm leading-relaxed text-brutal-black font-medium">
          
          <section className="border-b-2 border-[#E2E8F0] pb-6">
            <p className="font-bold text-base sm:text-lg">
              If you have questions, concerns, feedback, or legal inquiries regarding our Terms of Service or Privacy Policy, please get in touch with us using any of the methods below.
            </p>
          </section>

          <section className="bg-brutal-yellow p-6 border-4 border-brutal-black shadow-brutal-sm space-y-4">
            <h2 className="font-display font-black text-2xl text-brutal-black uppercase">
              Reach Out to Us
            </h2>

            <div className="space-y-3 font-bold text-base">
              <div>
                <span className="block font-black text-xs uppercase text-brutal-black/70">Website</span>
                <a href="https://builtinbyte.in" className="text-[#0066FF] underline font-black" target="_blank" rel="noreferrer">
                  https://builtinbyte.in
                </a>
              </div>

              <div>
                <span className="block font-black text-xs uppercase text-brutal-black/70">Email</span>
                <a href="mailto:support@builtinbyte.in" className="text-[#0066FF] underline font-black">
                  support@builtinbyte.in
                </a>
              </div>
            </div>
          </section>

          <section className="bg-brutal-green/20 p-6 border-4 border-brutal-black shadow-brutal-sm">
            <h3 className="font-display font-black text-lg text-brutal-black uppercase mb-1">
              Response Time
            </h3>
            <p className="font-bold text-sm text-brutal-black">
              We aim to respond to all inquiries within 24–48 business hours.
            </p>
          </section>

          <section className="bg-brutal-pink/20 p-6 border-4 border-brutal-black shadow-brutal-sm">
            <h3 className="font-display font-black text-lg text-brutal-black uppercase mb-1">
              Note on Privacy
            </h3>
            <p className="font-bold text-sm text-brutal-black">
              Any personal information submitted through our contact channels is handled strictly in accordance with our <Link href="/privacy" className="text-[#0066FF] underline font-black">Privacy Policy</Link>. We do not share your details with unauthorized third parties.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
