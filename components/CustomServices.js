'use client';
import { SERVICES } from '@/lib/data';

export default function CustomServices({ onOpenInquiry }) {
  return (
    <section id="services" className="py-20 bg-[#F5EFEB] border-t border-[#800020]/15">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Why Choose BuildInByte */}
        <div id="work" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#800020] bg-[#800020]/10 px-3 py-1 rounded-full border border-[#800020]/20 inline-block mb-3">
              Why Choose BuildInByte
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#4A0E17]">
              Enterprise-Grade Software. Built for Your Business.
            </h2>
            <p className="text-base text-[#5C4B3E] mt-3 leading-relaxed">
              We partner with startups, SMEs, and growing businesses to deliver custom software solutions that are scalable, maintainable, and built around your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="editorial-card p-8 bg-[#FFFDF9] border border-[#800020]/15">
              <div className="w-12 h-12 rounded-2xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold text-xl mb-6">
                🏗️
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#4A0E17] mb-2">
                Custom-Built Solutions
              </h3>
              <p className="text-xs text-[#5C4B3E] leading-relaxed">
                Every solution is engineered from scratch to match your exact business requirements — no generic templates, no compromise on quality.
              </p>
            </div>

            <div className="editorial-card p-8 bg-[#FFFDF9] border border-[#800020]/15">
              <div className="w-12 h-12 rounded-2xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold text-xl mb-6">
                🚀
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#4A0E17] mb-2">
                Modern Technologies
              </h3>
              <p className="text-xs text-[#5C4B3E] leading-relaxed">
                We build with the latest proven technologies — Next.js, React, FastAPI, PostgreSQL, and AI integrations — ensuring your software is future-ready.
              </p>
            </div>

            <div className="editorial-card p-8 bg-[#FFFDF9] border border-[#800020]/15">
              <div className="w-12 h-12 rounded-2xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold text-xl mb-6">
                🔒
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#4A0E17] mb-2">
                Scalable Architecture
              </h3>
              <p className="text-xs text-[#5C4B3E] leading-relaxed">
                Built to grow with your business. Clean, modular codebases with zero vendor lock-in, complete source code ownership, and full IP transfer.
              </p>
            </div>
          </div>

          {/* Additional advantages row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="editorial-card p-8 bg-[#FFFDF9] border border-[#800020]/15">
              <div className="w-12 h-12 rounded-2xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold text-xl mb-6">
                🎨
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#4A0E17] mb-2">
                Responsive UI/UX
              </h3>
              <p className="text-xs text-[#5C4B3E] leading-relaxed">
                Beautiful, intuitive interfaces designed for all screen sizes. We prioritize user experience as a core business driver, not an afterthought.
              </p>
            </div>

            <div className="editorial-card p-8 bg-[#FFFDF9] border border-[#800020]/15">
              <div className="w-12 h-12 rounded-2xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold text-xl mb-6">
                🔁
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#4A0E17] mb-2">
                End-to-End Delivery
              </h3>
              <p className="text-xs text-[#5C4B3E] leading-relaxed">
                From discovery and design to development, testing, deployment, and ongoing maintenance — we own the full delivery lifecycle.
              </p>
            </div>

            <div className="editorial-card p-8 bg-[#FFFDF9] border border-[#800020]/15">
              <div className="w-12 h-12 rounded-2xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold text-xl mb-6">
                💬
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#4A0E17] mb-2">
                Fast Communication
              </h3>
              <p className="text-xs text-[#5C4B3E] leading-relaxed">
                Direct access to our engineering team throughout the project. No middlemen, no delays — just transparent, responsive collaboration.
              </p>
            </div>
          </div>
        </div>

        {/* Development Process */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-serif text-3xl font-normal text-[#4A0E17]">
              Our Development Process
            </h3>
            <p className="text-xs text-[#5C4B3E] mt-1">
              A structured, transparent workflow from first conversation to production deployment.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { step: '01', label: 'Discovery' },
              { step: '02', label: 'Planning' },
              { step: '03', label: 'UI/UX Design' },
              { step: '04', label: 'Development' },
              { step: '05', label: 'Testing' },
              { step: '06', label: 'Deployment' },
              { step: '07', label: 'Maintenance' },
            ].map((phase, idx) => (
              <div key={idx} className="editorial-card p-4 bg-[#FFFDF9] border border-[#800020]/15 text-center flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#800020]">{phase.step}</span>
                <span className="font-serif font-bold text-sm text-[#4A0E17] leading-tight">{phase.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Service Offerings Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-serif text-3xl font-normal text-[#4A0E17]">
              Our Service Offerings
            </h3>
            <p className="text-xs text-[#5C4B3E] mt-1">
              Comprehensive software development services tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <div
                key={idx}
                className="editorial-card p-8 bg-[#FFFDF9] border border-[#800020]/15 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl mb-4 block">{service.icon}</span>
                  <h4 className="font-serif font-bold text-2xl text-[#4A0E17] mb-2">
                    {service.title}
                  </h4>
                  <p className="text-xs text-[#5C4B3E] leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#800020]/12">
                  <button
                    onClick={() => onOpenInquiry({ title: `Request a Quote — ${service.title}` })}
                    className="btn-primary text-xs py-3 w-full justify-center"
                  >
                    <span>Get a Free Quote</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
