'use client';

import { useState } from 'react';
import { Cpu, CircuitBoard, Wifi, Server, Bot, Layers } from 'lucide-react';

const CAPABILITIES = [
  {
    icon: Cpu,
    title: 'Embedded Systems & Firmware',
    desc: 'Low-latency firmware development for ESP32, STM32, AVR, and RTOS environments. Hardware-level memory optimization, peripherals, and real-time control.',
    tags: ['ESP32', 'STM32', 'FreeRTOS', 'C/C++'],
    image: '/images/images (4).jpg',
  },
  {
    icon: CircuitBoard,
    title: 'Custom PCB Design & Prototyping',
    desc: 'Multi-layer schematic design, component selection, high-speed routing, prototype fabrication, signal integrity, and hardware validation.',
    tags: ['Schematics', 'Multi-Layer', 'Validation', 'KiCad'],
    image: '/images/images (4).jpg',
  },
  {
    icon: Wifi,
    title: 'Industrial IoT & Edge Computing',
    desc: 'Smart sensor networks, MQTT telemetry pipelines, remote device monitoring platforms, and industrial edge computing infrastructure.',
    tags: ['MQTT', 'Sensors', 'Industrial IoT', 'Edge'],
    image: '/images/ktc-content-blog-servers-and-data-centers-how-iot-is-changing-the-world-hero.webp',
  },
  {
    icon: Server,
    title: 'Cloud & Enterprise Architecture',
    desc: 'Scalable cloud infrastructure on AWS, GCP, and Azure. Microservices, Docker containerization, CI/CD pipelines, and high-concurrency Node/Python APIs.',
    tags: ['AWS', 'Docker', 'PostgreSQL', 'FastAPI'],
    image: '/images/images (2).jpg',
  },
  {
    icon: Bot,
    title: 'AI & Business Automation',
    desc: 'Intelligent automation pipelines, document AI extraction, predictive telemetry, LLM integration, and custom machine learning workflow assistants.',
    tags: ['AI/LLM', 'Python', 'Automation', 'Analytics'],
    image: '/images/images (3).jpg',
  },
  {
    icon: Layers,
    title: 'Web Platforms & SaaS Systems',
    desc: 'High-performance web applications, customer portals, and enterprise dashboards built with React, Next.js, and modern API architectures.',
    tags: ['Next.js', 'React', 'Tailwind', 'PWA'],
    image: '/images/technology-code-coding-computer.jpg',
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Scoping',
    desc: 'Deep-dive technical assessment of hardware constraints, software architecture requirements, and system specifications.',
    image: '/images/images (1).jpg'
  },
  {
    step: '02',
    title: 'Architecture & Circuit Design',
    desc: 'Drafting multi-layer PCB schematics, component selection, database modeling, and API contract specification.',
    image: '/images/images (4).jpg'
  },
  {
    step: '03',
    title: 'Prototyping & Firmware/Software Dev',
    desc: 'Parallel hardware assembly, C/C++ firmware flashing, web application development, and cloud backend integration.',
    image: '/images/ktc-content-blog-servers-and-data-centers-how-iot-is-changing-the-world-hero.webp'
  },
  {
    step: '04',
    title: 'Hardware/Software Validation & QA',
    desc: 'Rigorous thermal, signal integrity, load testing, security auditing, and continuous integration verification.',
    image: '/images/images (3).jpg'
  },
  {
    step: '05',
    title: 'Production & Deployment',
    desc: 'Over-the-air firmware updates, cloud deployment, monitoring telemetry, and long-term engineering support.'
  }
];

export default function CustomServices({ onOpenInquiry }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="capabilities" className="py-24 bg-canvas">
      <div className="page-wrap">
        <div className="max-w-3xl mb-16 space-y-4">
          <p className="label-meta">Core expertise</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink tracking-tight">
            Hardware engineering meets cloud and software intelligence.
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            We bridge electronics, embedded firmware, scalable web platforms, and intelligent automation into one seamless system.
          </p>
        </div>

        <div id="services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line mb-24 border border-line">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="bg-canvas p-8 flex flex-col justify-between group hover:bg-surface transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <Icon className="w-5 h-5 text-ink" strokeWidth={1.5} />
                    <span className="label-meta">0{idx + 1}</span>
                  </div>
                  <h3 className="font-display font-semibold text-xl text-ink mb-3 group-hover:text-accent transition-colors duration-200">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {cap.desc}
                  </p>
                  {cap.image && (
                    <div className="mb-6 h-32 w-full overflow-hidden border border-line">
                      <img 
                        src={cap.image} 
                        alt={cap.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                </div>
                <div className="pt-4 border-t border-line flex flex-wrap items-center gap-2">
                  {cap.tags.map((tag) => (
                    <span key={tag} className="atelier-chip">{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div id="process" className="border-t border-line pt-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10">
            <div>
              <p className="label-meta mb-3">How we work</p>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-ink">
                The engineering process
              </h3>
            </div>
            <button
              onClick={() => onOpenInquiry({ title: 'Discuss Engineering Process' })}
              className="btn-ghost text-xs self-start lg:self-auto"
            >
              Start a project journey
            </button>
          </div>

          <ol className="border-l border-line space-y-0">
            {PROCESS_STEPS.map((ps, pIdx) => {
              const isActive = activeStep === pIdx;
              return (
                <li key={pIdx}>
                  <button
                    type="button"
                    onClick={() => setActiveStep(pIdx)}
                    className={`w-full text-left pl-8 pr-4 py-6 -ml-px border-l transition-colors duration-atelier ${
                      isActive ? 'border-accent' : 'border-transparent hover:border-line'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 flex-1">
                        <span className={`label-meta ${isActive ? 'text-accent' : ''}`}>{ps.step}</span>
                        <div>
                          <h4 className="font-display font-semibold text-base text-ink mb-1">
                            {ps.title}
                          </h4>
                          <p className="text-sm text-muted leading-relaxed max-w-2xl">
                            {ps.desc}
                          </p>
                        </div>
                      </div>
                      {ps.image && isActive && (
                        <div className="w-full sm:w-48 h-28 shrink-0 overflow-hidden border border-line mt-2 sm:mt-0">
                          <img 
                            src={ps.image} 
                            alt={ps.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
