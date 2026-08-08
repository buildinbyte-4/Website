'use client';
import { useState, useEffect, useRef } from 'react';
import { SERVICES } from '@/lib/data';
import { Globe, Building2, Bot, Cpu, BarChart3, Webhook } from 'lucide-react';

const ICON_MAP = {
  '🌐': Globe,
  '🏢': Building2,
  '🤖': Bot,
  '🎛️': Cpu,
  '📊': BarChart3,
  '🔗': Webhook,
};

export default function CustomServices({ onOpenInquiry }) {
  const processRef = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      if (!processRef.current) return;
      const rect = processRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      const totalDist = rect.height + viewHeight;
      const scrolledDist = viewHeight - rect.top;
      
      let progress = scrolledDist / totalDist;
      progress = Math.max(0, Math.min(progress, 1));
      
      if (rect.top < viewHeight && rect.bottom > 0) {
        const step = Math.floor(progress * 7);
        setActiveStep(Math.max(0, Math.min(step, 6)));
      } else {
        setActiveStep(-1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className="editorial-card p-8 bg-brutal-yellow">
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

            <div className="editorial-card p-8 bg-brutal-green">
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

            <div className="editorial-card p-8 bg-brutal-pink text-black">
              <div className="w-16 h-16 border-4 border-brutal-black bg-white flex items-center justify-center font-bold text-3xl mb-6 shadow-brutal-sm text-brutal-black">
                🔌
              </div>
              <h3 className="font-display font-black text-3xl text-black mb-2 uppercase leading-none">
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

          <div ref={processRef} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { step: '01', label: 'DISCOVER' },
              { step: '02', label: 'PLAN' },
              { step: '03', label: 'DESIGN' },
              { step: '04', label: 'BUILD' },
              { step: '05', label: 'TEST' },
              { step: '06', label: 'DEPLOY' },
              { step: '07', label: 'MAINTAIN' },
            ].map((phase, idx) => (
              <div 
                key={idx} 
                className={`border-2 border-[#000000] text-center flex flex-col items-center gap-0 group cursor-pointer transition-none ${
                  idx === activeStep 
                    ? 'bg-[#0066FF] text-white -translate-y-1 shadow-brutal-sm' 
                    : 'bg-white text-[#000000] hover:bg-[#0066FF] hover:text-white hover:-translate-y-1 shadow-brutal-sm'
                }`}
              >
                <span className={`w-full text-xl font-bold py-2 transition-none ${idx === activeStep ? 'text-white' : 'text-[#0066FF] group-hover:text-white'}`}>{phase.step}</span>
                <span className={`w-full font-[800] tracking-[0.05em] text-sm uppercase pb-4 px-2 transition-none ${idx === activeStep ? 'text-white' : 'text-[#000000] group-hover:text-white'}`}>{phase.label}</span>
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
            {SERVICES.map((service, idx) => {
              const bColors = ['bg-brutal-yellow', 'bg-brutal-green', 'bg-brutal-pink', 'bg-brutal-blue'];
              const bg = bColors[idx % bColors.length];
              
              return (
                <div
                  key={idx}
                  className={`editorial-card p-0 flex flex-col justify-between ${bg}`}
                >
                  <div className="p-8">
                    <span className="w-16 h-16 mb-6 flex items-center justify-center border-4 border-brutal-black bg-white shadow-brutal-sm transition-none duration-0 group-hover:rotate-90 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                      {(() => {
                        const IconComponent = ICON_MAP[service.icon] || Globe;
                        return <IconComponent size={36} strokeWidth={2.5} />;
                      })()}
                    </span>
                    <h4 className="font-display font-black text-3xl mb-4 uppercase leading-none text-brutal-black">
                      {service.title}
                    </h4>
                    <p className="text-sm font-bold uppercase leading-snug text-[#18181B]">
                      {service.desc}
                    </p>
                  </div>

                  <div className="p-4 bg-white border-t-4 border-brutal-black dark:bg-black">
                    <button
                      onClick={() => onOpenInquiry({ title: `Request a Quote — ${service.title}` })}
                      className="btn-primary text-xs py-4 w-full justify-center text-lg shadow-press cursor-pointer"
                    >
                      GET A QUOTE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
