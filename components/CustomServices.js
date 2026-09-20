'use client';

import { ArrowRight, BarChart3, Bot, Building2, Check, Cpu, Globe, Webhook } from 'lucide-react';

const strengths = [
  { icon: Check, title: 'Built for your workflow', text: 'Every solution starts with your process, customers, and operational constraints.' },
  { icon: Cpu, title: 'Modern, maintainable stack', text: 'Clear architecture and current technologies keep your product ready for the next stage.' },
  { icon: Building2, title: 'One accountable team', text: 'Product design, software, APIs, firmware, and launch support stay coordinated.' },
];

const process = ['Discover', 'Plan', 'Design', 'Build', 'Test', 'Deploy', 'Maintain'];

const services = [
  { icon: Globe, title: 'Web application development', desc: 'Customer portals, internal tools, and multi-tenant products built around clear user journeys.' },
  { icon: Building2, title: 'Enterprise software', desc: 'ERP modules, management platforms, and workflow automation tailored to your operations.' },
  { icon: Bot, title: 'AI and automation', desc: 'Document workflows, assistants, recommendations, and practical LLM integrations.' },
  { icon: Cpu, title: 'Embedded systems', desc: 'Firmware, hardware integration, IoT systems, and dependable device software.' },
  { icon: BarChart3, title: 'Dashboards and analytics', desc: 'Reporting and decision tools that turn operational data into useful signals.' },
  { icon: Webhook, title: 'APIs and integrations', desc: 'Reliable APIs, payment connections, third-party services, and system integrations.' },
];

export default function CustomServices({ onOpenInquiry }) {
  return (
    <section id="services" className="border-b border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-6">
        <div id="work" className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">Why BuildInByte</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-foreground">Engineering that fits the business.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-zinc-300">We help ambitious teams turn complex requirements into software that is useful, maintainable, and ready to grow.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {strengths.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-400/20 dark:bg-brand-950/40 dark:text-brand-300"><Icon size={19} /></div>
              <h3 className="mt-5 font-display text-lg font-semibold text-slate-950 dark:text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-400">{text}</p>
            </article>
          ))}
        </div>

        <div className="my-20 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.03] sm:p-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div><p className="text-sm font-semibold text-brand-600 dark:text-brand-400">Our process</p><h3 className="mt-1 font-display text-2xl font-semibold text-slate-950 dark:text-foreground">A clear path from idea to launch</h3></div>
            <p className="text-sm text-slate-500 dark:text-zinc-400">You always know what happens next.</p>
          </div>
          <ol className="mt-8 grid gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {process.map((label, index) => (
              <li key={label} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-brand-50 dark:bg-brand-50">
                <span className="text-xs font-semibold text-brand-600">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-2 text-sm font-medium text-slate-800 dark:text-[#111214]">{label}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-sm font-semibold text-brand-600 dark:text-brand-400">Services</p><h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-foreground">What we can build together</h3></div>
          <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-zinc-400">Choose a starting point. We’ll shape the final scope around your users, timeline, and business goals.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md dark:border-white/10 dark:bg-bg-surface-dark dark:hover:border-brand-400/30">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-brand-50 group-hover:text-brand-600 dark:bg-white/5 dark:text-zinc-100 dark:group-hover:bg-brand-950/40 dark:group-hover:text-brand-300"><Icon size={21} /></div>
              <h4 className="mt-5 font-display text-xl font-semibold text-slate-950 dark:text-foreground">{title}</h4>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-zinc-400">{desc}</p>
              <button type="button" onClick={() => onOpenInquiry({ title: `Request a quote — ${title}` })} className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">Request a quote <ArrowRight size={16} /></button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
