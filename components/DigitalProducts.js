import { Check, Code2, Database, ShieldCheck, Webhook } from 'lucide-react';
import PayflowPurchaseForm from '@/components/payments/PayflowPurchaseForm';
import RegionalPrice from '@/components/payments/RegionalPrice';
import { PAYFLOW_PRODUCT } from '@/lib/payflow/product';

const shelfDetails = [
  { icon: ShieldCheck, label: 'Hosted payment flow—no raw card data' },
  { icon: Database, label: 'PostgreSQL storage and migrations' },
  { icon: Webhook, label: 'Signed webhooks, retries, and audit records' },
  { icon: Code2, label: 'React checkout and Express API source' },
];

export default function DigitalProducts() {
  return (
    <section id="digital-products" aria-labelledby="digital-products-heading" className="scroll-mt-24 border-b border-slate-200 bg-white py-16 dark:border-white/10 dark:bg-transparent sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">BuildInByte Store</p>
          <h2 id="digital-products-heading" className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-950 dark:text-foreground sm:text-5xl">
            The BuildInByte digital shelf.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-zinc-300">
            Original digital products designed, built, and released by our team. This catalog is reserved for BuildInByte products—not client commissions.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-zinc-400">
            Our first product is live: a developer-focused payment foundation you host, configure, and extend in your own infrastructure.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03] lg:col-span-7">
          <div className="grid min-h-80 sm:grid-cols-[0.78fr_1.22fr]">
            <div aria-hidden="true" className="relative flex min-h-52 items-center justify-center overflow-hidden border-b border-slate-200 bg-slate-950 text-white dark:border-white/10 sm:min-h-80 sm:border-b-0 sm:border-r">
              <span className="absolute left-5 top-4 font-mono text-xs tracking-[0.2em] text-white/50">SHELF / 01</span>
              <Code2 size={64} strokeWidth={1.25} className="text-white/90" />
              <span className="absolute -bottom-8 -right-3 font-display text-[8rem] font-semibold leading-none text-white/[0.05]">B</span>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8">
              <span className="w-fit rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 dark:border-white/15 dark:bg-bg-surface-dark dark:text-zinc-300">
                Available now · Source code
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground sm:text-3xl">
                {PAYFLOW_PRODUCT.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                {PAYFLOW_PRODUCT.description}
              </p>
              <ul className="mt-6 space-y-3 border-t border-slate-200 pt-5 dark:border-white/10">
                {shelfDetails.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-300">
                    <Icon size={16} aria-hidden="true" className="shrink-0 text-brand-600 dark:text-brand-400" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-bg-surface-dark sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-zinc-400">Single-product licence</p>
                <RegionalPrice />
              </div>
              <ul className="grid gap-2 text-sm text-slate-600 dark:text-zinc-300 sm:grid-cols-2">
                {['Full source ZIP', 'Setup documentation', 'Razorpay adapter', 'Automated tests'].map((item) => <li key={item} className="flex items-center gap-2"><Check size={15} aria-hidden="true" /> {item}</li>)}
              </ul>
            </div>
            <PayflowPurchaseForm />
          </div>
        </div>
      </div>
    </section>
  );
}
