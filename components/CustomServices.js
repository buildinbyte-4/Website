'use client';
import { SERVICES } from '@/lib/data';

export default function CustomServices({ onOpenInquiry }) {
  return (
    <section id="services" className="py-20 bg-[#F5EFEB] border-t border-[#800020]/15">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Collective Advantage Callout */}
        <div id="work" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#800020] bg-[#800020]/10 px-3 py-1 rounded-full border border-[#800020]/20 inline-block mb-3">
              The 3-Person Collective Model
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#4A0E17]">
              Built by Students. Zero Agency Layers.
            </h2>
            <p className="text-base text-[#5C4B3E] mt-3 leading-relaxed">
              Skip traditional agency bloat. Work directly with the students building your product from scope discovery to release.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="editorial-card p-8 bg-[#FFFDF9] border border-[#800020]/15">
              <div className="w-12 h-12 rounded-2xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold text-xl mb-6">
                ⚡
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#4A0E17] mb-2">
                Fast Turnarounds
              </h3>
              <p className="text-xs text-[#5C4B3E] leading-relaxed">
                Production-grade software shipped in 1-4 weeks with high test coverage and CI/CD pipelines configured from day one.
              </p>
            </div>

            <div className="editorial-card p-8 bg-[#FFFDF9] border border-[#800020]/15">
              <div className="w-12 h-12 rounded-2xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold text-xl mb-6">
                💬
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#4A0E17] mb-2">
                Direct Contact
              </h3>
              <p className="text-xs text-[#5C4B3E] leading-relaxed">
                No middle managers or account executives. You pair directly with the creators who write the code and design the interface.
              </p>
            </div>

            <div className="editorial-card p-8 bg-[#FFFDF9] border border-[#800020]/15">
              <div className="w-12 h-12 rounded-2xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold text-xl mb-6">
                🔐
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#4A0E17] mb-2">
                Full Codebase Ownership
              </h3>
              <p className="text-xs text-[#5C4B3E] leading-relaxed">
                100% intellectual property transfer. You receive clean, modular, fully typed repositories with zero vendor lock-in.
              </p>
            </div>
          </div>
        </div>

        {/* Custom Service Offerings Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-serif text-3xl font-normal text-[#4A0E17]">
              Custom Engineering Capabilities
            </h3>
            <p className="text-xs text-[#5C4B3E] mt-1">
              Bespoke client solutions scoped and delivered by our 3-person core team.
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
                    onClick={() => onOpenInquiry({ title: `Scope ${service.title}` })}
                    className="btn-primary text-xs py-3 w-full justify-center"
                  >
                    <span>Scope Custom Build</span>
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
