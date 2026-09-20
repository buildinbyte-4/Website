import Link from 'next/link';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import StarField from '@/components/StarField';

export default function ClientAccessPending({ email }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-4 py-12 text-foreground">
      <StarField />
      <section className="relative z-10 w-full max-w-xl border border-border-subtle bg-bg-surface-dark p-8 shadow-card sm:p-12">
        <div className="flex h-11 w-11 items-center justify-center border border-border-subtle bg-accent-soft"><LockKeyhole size={20} /></div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">Private user workspace</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Your portal is not active yet.</h1>
        <p className="mt-4 text-sm leading-6 text-text-secondary">You’re signed in as <span className="font-medium text-foreground">{email}</span>. Portal access is enabled once your BuildInByte engagement moves into onboarding or active delivery.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-secondary"><ArrowLeft size={16} />Back to website</Link>
          <Link href="/contact" className="btn-primary">Contact the team</Link>
        </div>
      </section>
    </main>
  );
}
