'use client';

import { useState } from 'react';
import { Cpu, CircuitBoard, Wifi, Server, Bot, Layers } from 'lucide-react';

const CAPABILITIES = [
  {
    icon: Cpu,
    title: 'Embedded Systems & Firmware',
    desc: 'Low-latency firmware development for ESP32, STM32, AVR, and RTOS environments. Hardware-level memory optimization, peripherals, and real-time control.',
    tags: ['ESP32', 'STM32', 'FreeRTOS', 'C/C++'],
    color: 'cyan'
  },
  {
    icon: CircuitBoard,
    title: 'Custom PCB Design & Prototyping',
    desc: 'Multi-layer schematic design, component selection, high-speed routing, prototype fabrication, signal integrity, and hardware validation.',
    tags: ['Schematics', 'Multi-Layer', 'Validation', 'KiCad'],
    color: 'violet'
  },
  {
    icon: Wifi,
    title: 'Industrial IoT & Edge Computing',
    desc: 'Smart sensor networks, MQTT telemetry pipelines, remote device monitoring platforms, and industrial edge computing infrastructure.',
    tags: ['MQTT', 'Sensors', 'Industrial IoT', 'Edge'],
    color: 'cyan'
  },
  {
    icon: Server,
    title: 'Cloud & Enterprise Architecture',
    desc: 'Scalable cloud infrastructure on AWS, GCP, and Azure. Microservices, Docker containerization, CI/CD pipelines, and high-concurrency Node/Python APIs.',
    tags: ['AWS', 'Docker', 'PostgreSQL', 'FastAPI'],
    color: 'violet'
  },
  {
    icon: Bot,
    title: 'AI & Business Automation',
    desc: 'Intelligent automation pipelines, document AI extraction, predictive telemetry, LLM integration, and custom machine learning workflow assistants.',
    tags: ['AI/LLM', 'Python', 'Automation', 'Analytics'],
    color: 'cyan'
  },
  {
    icon: Layers,
    title: 'Web Platforms & SaaS Systems',
    desc: 'High-performance web applications, customer portals, and enterprise dashboards built with React, Next.js, and modern API architectures.',
    tags: ['Next.js', 'React', 'Tailwind', 'PWA'],
    color: 'violet'
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Scoping',
    desc: 'Deep-dive technical assessment of hardware constraints, software architecture requirements, and system specifications.'
  },
  {
    step: '02',
    title: 'Architecture & Circuit Design',
    desc: 'Drafting multi-layer PCB schematics, component selection, database modeling, and API contract specification.'
  },
  {
    step: '03',
    title: 'Prototyping & Firmware/Software Dev',
    desc: 'Parallel hardware assembly, C/C++ firmware flashing, web application development, and cloud backend integration.'
  },
  {
    step: '04',
    title: 'Hardware/Software Validation & QA',
    desc: 'Rigorous thermal, signal integrity, load testing, security auditing, and continuous integration verification.'
  },
  {
    step: '05',
    title: 'Production & Deployment',
    desc: 'Over-the-Air (OTA) firmware updates, cloud deployment, monitoring telemetry, and long-term engineering support.'
  }
];

export default function CustomServices({ onOpenInquiry }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="capabilities" className="py-24 bg-[#0b1326] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="ambient-glow-cyan top-1/3 -left-48 blur-3xl opacity-40"></div>
      <div className="ambient-glow-violet bottom-10 -right-48 blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#c4abff] font-mono text-xs tracking-wider uppercase">
            <span>Core Engineering Expertise</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#dae2fd] tracking-tight">
            Hardware Engineering Meets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4cd7f6] via-[#06b6d4] to-[#c4abff]">
              Cloud & Software Intelligence.
            </span>
          </h2>
          <p className="text-[#869397] text-base sm:text-lg">
            We bridge electronics, embedded firmware, scalable web platforms, and intelligent automation into one seamless system.
          </p>
        </div>

        {/* 6 Capabilities Cards */}
        <div id="services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            const isCyan = cap.color === 'cyan';
            return (
              <div
                key={idx}
                className="glass-card p-8 rounded-2xl border border-white/10 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl ${isCyan ? 'bg-[#06b6d4]/10 text-[#4cd7f6] border border-[#06b6d4]/30' : 'bg-[#8b5cf6]/10 text-[#c4abff] border border-[#8b5cf6]/30'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-[#869397]">0{idx + 1}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#dae2fd] mb-3 group-hover:text-[#4cd7f6] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[#bcc9cd] leading-relaxed mb-6 font-normal">
                    {cap.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
                  {cap.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={isCyan ? 'tech-badge' : 'tech-badge-violet'}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Process Timeline */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
            <div>
              <span className="font-mono text-xs text-[#06b6d4] tracking-widest uppercase block mb-1">
                // SYSTEM_LIFECYCLE
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#dae2fd]">
                The Engineering Process
              </h3>
            </div>
            <button
              onClick={() => onOpenInquiry({ title: 'Discuss Engineering Process' })}
              className="btn-ghost-cyan text-xs font-mono px-5 py-2.5 rounded-xl uppercase self-start lg:self-auto"
            >
              Start Project Journey →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {PROCESS_STEPS.map((ps, pIdx) => {
              const isActive = activeStep === pIdx;
              return (
                <div
                  key={pIdx}
                  onClick={() => setActiveStep(pIdx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#171f33] border-[#06b6d4] shadow-lg shadow-cyan-500/10'
                      : 'bg-[#131b2e]/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="font-mono text-xs font-bold text-[#06b6d4] mb-2 flex items-center justify-between">
                    <span>STEP {ps.step}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-ping"></span>}
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#dae2fd] mb-2">
                    {ps.title}
                  </h4>
                  <p className="text-xs text-[#869397] leading-relaxed">
                    {ps.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
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
