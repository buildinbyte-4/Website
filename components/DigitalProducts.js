import { Box, PackageOpen, ShieldCheck, Sparkles } from 'lucide-react';

const shelfDetails = [
  { icon: Sparkles, label: 'Original BuildInByte releases' },
  { icon: ShieldCheck, label: 'Clear pricing and license details' },
  { icon: Box, label: 'Downloads published when ready' },
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
            Each listing will include its price, license, contents, and download details when it goes live.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03] lg:col-span-7">
          <div className="grid min-h-80 sm:grid-cols-[0.78fr_1.22fr]">
            <div aria-hidden="true" className="relative flex min-h-52 items-center justify-center overflow-hidden border-b border-slate-200 bg-slate-950 text-white dark:border-white/10 sm:min-h-80 sm:border-b-0 sm:border-r">
              <span className="absolute left-5 top-4 font-mono text-xs tracking-[0.2em] text-white/50">SHELF / 01</span>
              <PackageOpen size={64} strokeWidth={1.25} className="text-white/90" />
              <span className="absolute -bottom-8 -right-3 font-display text-[8rem] font-semibold leading-none text-white/[0.05]">B</span>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8">
              <span className="w-fit rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 dark:border-white/15 dark:bg-bg-surface-dark dark:text-zinc-300">
                Catalog opening soon
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground sm:text-3xl">
                Our first releases are in the works.
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                Product listings will appear here as they are ready to purchase. We will add real previews and details—no placeholder products.
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
        </div>
      </div>
    </section>
  );
}
