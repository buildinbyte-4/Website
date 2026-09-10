'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

const groups = [
  { title: 'Solutions', links: [['Custom web apps', '/#services'], ['Enterprise systems', '/#services'], ['AI and automation', '/#services'], ['API architecture', '/#services']] },
  { title: 'Company', links: [['About', '/about'], ['FAQ', '/faq'], ['Contact', '/contact']] },
  { title: 'Legal', links: [['Privacy policy', '/privacy'], ['Terms of service', '/terms']] },
];

export default function Footer() {
  const { settings } = useSettings();
  const companyName = settings?.company_name || 'BuildInByte';
  const description = settings?.address || 'Production-grade software engineering for ambitious companies.';

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white dark:border-white/10 dark:bg-canvas">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-14 flex flex-col justify-between gap-6 rounded-2xl border border-brand-200 bg-brand-50 p-7 sm:flex-row sm:items-center dark:border-brand-400/20 dark:bg-brand-950/30">
          <div>
            <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">Have a project in mind?</p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl dark:text-white">Let’s build something useful.</h2>
          </div>
          <Link href="/contact" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-brand-400">
            Start a conversation <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <img src="/logo.jpg" alt="" className="h-10 w-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-white/10" />
              <span className="font-display text-xl font-semibold tracking-tight text-slate-950 dark:text-white">{companyName}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-zinc-400">{description}</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950/30 dark:text-emerald-300">
              <span className="pulse-dot" /> Available for new projects
            </div>
          </div>

          {groups.map(group => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map(([label, href]) => (
                  <li key={label}><Link href={href} className="text-sm text-slate-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          <p>Web applications · APIs · AI systems · Embedded engineering</p>
        </div>
      </div>
    </footer>
  );
}
