'use client';
import Link from 'next/link';

export default function AboutPage() {
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
            Company Overview
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-brutal-black uppercase tracking-tight mb-2">
            About Us
          </h1>
          <p className="text-sm font-bold text-[#64748B] uppercase">
            Where technology meets simplicity.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white border-4 border-brutal-black p-6 sm:p-10 shadow-brutal space-y-8 text-sm leading-relaxed text-brutal-black font-medium">
          
          <section className="border-b-2 border-[#E2E8F0] pb-6 space-y-3">
            <h2 className="font-display font-black text-xl text-brutal-black uppercase bg-brutal-yellow/30 px-3 py-1 border-l-4 border-brutal-black inline-block">
              Welcome to BuiltInByte
            </h2>
            <p className="font-bold text-base">
              At BuiltInByte, we build reliable, intuitive, and scalable Software-as-a-Service (SaaS) solutions designed to empower modern digital experiences. Whether you are streamlining workflows, building web applications, or optimizing performance, our platform is engineered to deliver speed, stability, and seamless functionality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-black text-xl text-brutal-black uppercase bg-brutal-pink/20 px-3 py-1 border-l-4 border-brutal-black inline-block">
              Our Mission
            </h2>
            <p className="font-bold text-sm">
              Our mission is to simplify technology for developers, businesses, and creators. We believe software should work effortlessly behind the scenes so you can focus on growing your core projects and delivering value to your audience.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-black text-xl text-brutal-black uppercase bg-brutal-green/30 px-3 py-1 border-l-4 border-brutal-black inline-block">
              Why BuiltInByte?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-brutal-yellow/10 p-4 border-2 border-brutal-black shadow-brutal-sm">
                <h3 className="font-black text-sm uppercase text-brutal-black mb-1">Performance-First Architecture</h3>
                <p className="text-xs text-brutal-black/90 font-bold">Built from the ground up to ensure low latency and high availability.</p>
              </div>

              <div className="bg-brutal-pink/10 p-4 border-2 border-brutal-black shadow-brutal-sm">
                <h3 className="font-black text-sm uppercase text-brutal-black mb-1">Developer &amp; User Friendly</h3>
                <p className="text-xs text-brutal-black/90 font-bold">Designed with clean interfaces and smooth user journeys in mind.</p>
              </div>

              <div className="bg-brutal-green/10 p-4 border-2 border-brutal-black shadow-brutal-sm">
                <h3 className="font-black text-sm uppercase text-brutal-black mb-1">Security &amp; Privacy</h3>
                <p className="text-xs text-brutal-black/90 font-bold">We treat your data with the highest level of care, adhering to modern privacy and compliance standards.</p>
              </div>

              <div className="bg-brutal-blue/10 p-4 border-2 border-brutal-black shadow-brutal-sm">
                <h3 className="font-black text-sm uppercase text-brutal-black mb-1">Continuous Innovation</h3>
                <p className="text-xs text-brutal-black/90 font-bold">We are constantly updating and expanding our tools to adapt to modern web and software needs.</p>
              </div>
            </div>
          </section>

          <section className="space-y-2 border-t-2 border-[#E2E8F0] pt-6">
            <h2 className="font-display font-black text-xl text-brutal-black uppercase bg-brutal-yellow/30 px-3 py-1 border-l-4 border-brutal-black inline-block">
              Who We Serve
            </h2>
            <p className="font-bold text-sm">
              BuiltInByte serves developers, startups, modern enterprises, and tech enthusiasts looking for smart, dependable cloud-based tools that just work.
            </p>
          </section>

          <section className="bg-brutal-yellow p-6 border-4 border-brutal-black shadow-brutal-sm space-y-3">
            <h2 className="font-display font-black text-2xl text-brutal-black uppercase">
              Connect With Us
            </h2>
            <p className="font-bold text-sm">
              We are always looking for ways to improve and better serve our community. Have ideas, questions, or feedback?
            </p>
            <div className="space-y-1 font-black text-sm">
              <p>Website: <a href="https://builtinbyte.in" className="text-[#0066FF] underline" target="_blank" rel="noreferrer">https://builtinbyte.in</a></p>
              <p>Email: <a href="mailto:support@builtinbyte.in" className="text-[#0066FF] underline">support@builtinbyte.in</a></p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
