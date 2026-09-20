import Link from 'next/link';
import { ArrowUpRight, CalendarDays, CircleDollarSign, Clock3, FileText, FolderKanban, Headphones, LayoutDashboard, MessageSquareText } from 'lucide-react';
import StarField from '@/components/StarField';
import ClientSignOutButton from '@/components/client/ClientSignOutButton';

const STATUS_LABELS = { planning: 'Planning', in_progress: 'In progress', review: 'In review', on_hold: 'On hold', completed: 'Completed' };

function formatDate(value, fallback = 'To be confirmed') {
  if (!value) return fallback;
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}

function formatMoney(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value || 0));
}

function Stat({ label, value, detail }) {
  return <div className="border border-border-subtle bg-bg-surface-dark p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">{label}</p><p className="mt-5 font-display text-3xl font-semibold tracking-tight text-foreground">{value}</p><p className="mt-2 text-xs text-text-secondary">{detail}</p></div>;
}

function ProjectCard({ project }) {
  const latestUpdate = project.client_project_updates?.[0];
  return (
    <article className="border border-border-subtle bg-bg-surface-dark p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div><p className="font-mono text-xs uppercase tracking-[0.14em] text-text-secondary">{project.project_code}</p><h3 className="mt-2 font-display text-xl font-semibold text-foreground">{project.name}</h3>{project.summary && <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">{project.summary}</p>}</div>
        <span className="w-fit border border-border-subtle bg-accent-soft px-2.5 py-1 text-xs font-semibold text-foreground">{STATUS_LABELS[project.status] || project.status}</span>
      </div>
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs font-medium"><span className="text-text-secondary">Project progress</span><span className="text-foreground">{project.progress}%</span></div>
        <div className="h-1.5 overflow-hidden bg-accent-soft" role="progressbar" aria-label={`${project.name} progress`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={project.progress}><div className="h-full bg-primary" style={{ width: `${project.progress}%` }} /></div>
      </div>
      <dl className="mt-6 grid gap-4 border-t border-border-subtle pt-5 sm:grid-cols-2">
        <div><dt className="flex items-center gap-2 text-xs text-text-secondary"><Clock3 size={14} />Next milestone</dt><dd className="mt-1 text-sm font-medium text-foreground">{project.next_milestone || 'Milestone plan in progress'}</dd></div>
        <div><dt className="flex items-center gap-2 text-xs text-text-secondary"><CalendarDays size={14} />Target launch</dt><dd className="mt-1 text-sm font-medium text-foreground">{formatDate(project.target_launch)}</dd></div>
      </dl>
      {latestUpdate && <div className="mt-5 border-l-2 border-primary bg-canvas/60 px-4 py-3"><p className="text-xs text-text-secondary">Latest update · {formatDate(latestUpdate.created_at)}</p><p className="mt-1 text-sm font-semibold text-foreground">{latestUpdate.title}</p>{latestUpdate.summary && <p className="mt-1 text-sm text-text-secondary">{latestUpdate.summary}</p>}</div>}
    </article>
  );
}

export default function ClientPortal({ user, account, projects, orders }) {
  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Client';
  const paidTotal = orders.filter(order => order.status === 'paid').reduce((sum, order) => sum + Number(order.amount_usd || 0), 0);
  const nextLaunch = projects.map(project => project.target_launch).filter(Boolean).sort()[0];
  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas text-foreground">
      <StarField />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1500px] lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-border-subtle bg-canvas/90 px-5 py-5 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between lg:block">
            <Link href="/" className="flex items-center gap-3" aria-label="BuildInByte home"><img src="/brand-logo.png" alt="" className="h-9 w-9 object-cover" /><div><p className="font-display text-sm font-semibold">BuildInByte</p><p className="text-[11px] uppercase tracking-[0.18em] text-text-secondary">User portal</p></div></Link>
            <Link href="/" className="text-xs font-semibold text-text-secondary hover:text-foreground lg:hidden">View site</Link>
          </div>
          <nav aria-label="User portal" className="mt-6 flex gap-1 overflow-x-auto lg:mt-12 lg:grid">
            <a href="#overview" className="flex shrink-0 items-center gap-3 rounded-lg bg-accent-soft px-3 py-2.5 text-sm font-semibold text-foreground"><LayoutDashboard size={17} />Overview</a>
            <a href="#projects" className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-accent-soft hover:text-foreground"><FolderKanban size={17} />Projects</a>
            <a href="#billing" className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-accent-soft hover:text-foreground"><FileText size={17} />Billing</a>
            <a href="#support" className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-accent-soft hover:text-foreground"><Headphones size={17} />Support</a>
          </nav>
          <div className="mt-8 hidden border-t border-border-subtle pt-4 lg:block"><Link href="/" className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-accent-soft hover:text-foreground"><ArrowUpRight size={17} />Back to website</Link><ClientSignOutButton /></div>
        </aside>

        <main className="px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
          <section id="overview" aria-labelledby="portal-title">
            <div className="flex flex-col gap-6 border-b border-border-subtle pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">{account.company_name || 'User workspace'}</p><h1 id="portal-title" className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">Welcome back, {displayName}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">Track delivery, review the latest project updates, and keep commercial details in one private workspace.</p></div>
              <Link href="/contact" className="btn-secondary shrink-0"><MessageSquareText size={16} />Message the team</Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Stat label="Active projects" value={projects.filter(project => project.status !== 'completed').length} detail={`${projects.length} total in this workspace`} />
              <Stat label="Overall progress" value={`${projects.length ? Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length) : 0}%`} detail="Across all current projects" />
              <Stat label="Paid to date" value={formatMoney(paidTotal)} detail={`${orders.length} invoice${orders.length === 1 ? '' : 's'} on record`} />
              <Stat label="Next target" value={nextLaunch ? formatDate(nextLaunch) : 'Planning'} detail="Nearest scheduled launch" />
            </div>
          </section>

          <section id="projects" aria-labelledby="projects-title" className="mt-14 scroll-mt-8">
            <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">Delivery</p><h2 id="projects-title" className="mt-1 font-display text-2xl font-semibold">Your projects</h2></div><span className="text-xs text-text-secondary">Updated as work progresses</span></div>
            <div className="space-y-4">{projects.length ? projects.map(project => <ProjectCard key={project.id} project={project} />) : <div className="border border-dashed border-border-subtle bg-bg-surface-dark p-8 text-center"><FolderKanban className="mx-auto text-text-secondary" size={28} /><h3 className="mt-4 font-display text-lg font-semibold">Your project workspace is being prepared</h3><p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">Once kickoff is complete, milestones, progress, and team updates will appear here.</p></div>}</div>
          </section>

          <div className="mt-14 grid gap-6 xl:grid-cols-2">
            <section id="billing" aria-labelledby="billing-title" className="scroll-mt-8 border border-border-subtle bg-bg-surface-dark p-6">
              <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">Commercials</p><h2 id="billing-title" className="mt-1 font-display text-xl font-semibold">Billing</h2></div><CircleDollarSign className="text-text-secondary" /></div>
              {orders.length ? <div className="mt-6 divide-y divide-border-subtle">{orders.slice(0, 4).map(order => <div key={order.id} className="flex items-center justify-between gap-4 py-3 text-sm"><div><p className="font-medium">Invoice {order.id.slice(0, 8).toUpperCase()}</p><p className="text-xs text-text-secondary">{formatDate(order.created_at)} · {order.status}</p></div><p className="font-semibold">{formatMoney(order.amount_usd)}</p></div>)}</div> : <p className="mt-6 text-sm text-text-secondary">No invoices have been issued yet.</p>}
            </section>
            <section id="support" aria-labelledby="support-title" className="scroll-mt-8 border border-border-subtle bg-bg-surface-dark p-6">
              <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">Direct line</p><h2 id="support-title" className="mt-1 font-display text-xl font-semibold">Need something?</h2></div><Headphones className="text-text-secondary" /></div>
              <p className="mt-6 text-sm leading-6 text-text-secondary">Share a question, request a project update, or schedule a review. Your message will reach the BuildInByte team with your account context.</p><Link href="/contact" className="btn-primary mt-6">Contact project team <ArrowUpRight size={16} /></Link>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
