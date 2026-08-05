'use client';
import { useFAQ } from '@/hooks/useFAQ';

const serviceCards = [
  {
    icon: '🌐',
    title: 'Web Application Development',
    desc: 'End-to-end web applications built with modern frameworks — from customer-facing portals to complex multi-tenant SaaS platforms, delivered with clean architecture.',
  },
  {
    icon: '🏢',
    title: 'Enterprise Software',
    desc: 'Scalable enterprise systems including ERP modules, internal management platforms, and workflow automation tools tailored to your operational structure.',
  },
  {
    icon: '🤖',
    title: 'AI & Intelligent Automation',
    desc: 'AI-powered features, document processing pipelines, chatbots, recommendation engines, and LLM integrations that give your business a competitive edge.',
  },
  {
    icon: '🎛️',
    title: 'Embedded Systems & ECE Solutions',
    desc: 'Custom hardware integration, firmware development, and embedded C/C++ architectures for IoT, robotics, and smart hardware projects.',
  },
  {
    icon: '📊',
    title: 'Dashboards & Analytics',
    desc: 'Custom analytics dashboards, reporting tools, and data visualization platforms that transform your raw business data into actionable insights.',
  },
  {
    icon: '🔗',
    title: 'API Development & Integrations',
    desc: 'High-performance REST and GraphQL APIs, third-party integrations, payment gateways, and microservice architectures engineered for reliability and scale.',
  },
];

export default function CustomServices({ onOpenInquiry }) {
  const { faq, loading, error } = useFAQ();
  return (
    <section id="services" className="py-20 bg-brutal-bg border-b-4 border-brutal-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Why Choose BuildInByte */}
        <div id="work" className="mb-20">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-brutal-black bg-brutal-pink px-4 py-2 border-2 border-brutal-black inline-block mb-4 shadow-brutal-sm">
              WHY CHOOSE BUILDINBYTE
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-brutal-black uppercase leading-none">
              ENTERPRISE-GRADE SOFTWARE.<br/>BUILT FOR YOUR BUSINESS.
            </h2>
            <p className="text-lg text-brutal-black font-bold uppercase mt-6 leading-relaxed">
              We partner with ambitious teams to deliver custom software solutions that are scalable, maintainable, and built around your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="editorial-card p-8 bg-white">
              <div className="w-16 h-16 border-4 border-brutal-black bg-white flex items-center justify-center font-bold text-3xl mb-6 shadow-brutal-sm">
                🏗️
              </div>
              <h3 className="font-display font-black text-3xl text-brutal-black mb-2 uppercase leading-none">
                CUSTOM BUILT
              </h3>
              <p className="text-sm text-brutal-black font-bold uppercase leading-snug">
                Every solution is engineered from scratch. No generic templates, no compromise.
              </p>
            </div>

            <div className="editorial-card p-8 bg-white">
              <div className="w-16 h-16 border-4 border-brutal-black bg-white flex items-center justify-center font-bold text-3xl mb-6 shadow-brutal-sm">
                🚀
              </div>
              <h3 className="font-display font-black text-3xl text-brutal-black mb-2 uppercase leading-none">
                MODERN TECH
              </h3>
              <p className="text-sm text-brutal-black font-bold uppercase leading-snug">
                We build with Next.js, FastAPI, PostgreSQL, and AI integrations. Future-ready.
              </p>
            </div>

            <div className="editorial-card p-8 bg-white">
              <div className="w-16 h-16 border-4 border-brutal-black bg-white flex items-center justify-center font-bold text-3xl mb-6 shadow-brutal-sm text-brutal-black">
                🔌
              </div>
              <h3 className="font-display font-black text-3xl text-black mb-2 uppercase leading-none" style={{ fontWeight: 800, textTransform: 'uppercase' }}>
                PCB & HARDWARE DESIGN
              </h3>
              <p className="text-sm text-[#18181B] font-bold uppercase leading-snug">
                END-TO-END PCB LAYOUT, SCHEMATIC DESIGN, PROTOTYPING, AND SIGNAL INTEGRITY OPTIMIZATION TAILORED FOR HIGH-PERFORMANCE ELECTRONICS.
              </p>
            </div>
          </div>
        </div>

        {/* Development Process */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-display text-4xl font-black text-brutal-black uppercase leading-none mb-2">
              OUR PROCESS
            </h3>
            <p className="text-sm font-bold uppercase text-brutal-black">
              A structured workflow from first conversation to deployment.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { step: '01', label: 'DISCOVER' },
              { step: '02', label: 'PLAN' },
              { step: '03', label: 'DESIGN' },
              { step: '04', label: 'BUILD' },
              { step: '05', label: 'TEST' },
              { step: '06', label: 'DEPLOY' },
              { step: '07', label: 'MAINTAIN' },
            ].map((phase, idx) => (
              <div key={idx} className="bg-white border-2 border-[#000000] text-center flex flex-col items-center gap-0 group hover:bg-[#0066FF] transition-all hover:-translate-y-1 shadow-brutal-sm cursor-pointer">
                <span className="w-full text-xl font-bold text-[#0066FF] group-hover:text-[#FFFFFF] py-2">{phase.step}</span>
                <span className="w-full font-[800] tracking-[0.05em] text-sm text-[#000000] group-hover:text-[#FFFFFF] uppercase pb-4 px-2">{phase.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Service Offerings Grid */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-display text-5xl font-black text-brutal-black uppercase leading-none mb-2 bg-brutal-yellow inline-block px-4 py-2 border-4 border-brutal-black shadow-brutal-sm">
              SERVICE OFFERINGS
            </h3>
            <p className="text-sm text-brutal-black font-bold uppercase mt-6">
              Comprehensive software development services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map((service, idx) => {
              const bColors = ['bg-brutal-yellow', 'bg-brutal-green', 'bg-brutal-pink', 'bg-brutal-blue'];
              const bg = bColors[idx % bColors.length];

              return (
                <div
                  key={idx}
                  className={`editorial-card p-0 flex flex-col justify-between ${bg}`}
                >
                  <div className="p-8">
                    <span className="text-5xl mb-6 block border-4 border-brutal-black bg-white inline-block shadow-brutal-sm p-2">
                      {service.icon}
                    </span>
                    <h4 className="font-display font-black text-3xl mb-4 uppercase leading-none text-brutal-black">
                      {service.title}
                    </h4>
                    <p className="text-sm font-bold uppercase leading-snug text-[#18181B]">
                      {service.desc}
                    </p>
                  </div>

                  <div className="p-4 bg-white border-t-4 border-brutal-black">
                    <button
                      onClick={() => onOpenInquiry({ title: `Request a Quote — ${service.title}` })}
                      className="btn-primary text-xs py-4 w-full justify-center text-lg"
                    >
                      GET A QUOTE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-24 border-4 border-brutal-black bg-white p-8 shadow-brutal">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="font-display text-3xl font-black uppercase text-brutal-black">FAQ</h3>
            <span className="text-xs font-black uppercase tracking-widest text-brutal-black bg-brutal-yellow px-3 py-1 border-2 border-brutal-black">LIVE CONTENT</span>
          </div>
          {error ? (
            <p className="text-sm font-bold uppercase text-brutal-black">{error}</p>
          ) : loading ? (
            <p className="text-sm font-bold uppercase text-brutal-black">Loading frequently asked questions...</p>
          ) : (
            <div className="space-y-4">
              {faq.map((item) => (
                <div key={item.id} className="border-2 border-brutal-black p-4 bg-brutal-bg">
                  <h4 className="text-lg font-black uppercase text-brutal-black">{item.question}</h4>
                  <p className="mt-2 text-sm font-bold uppercase leading-relaxed text-brutal-black">{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
