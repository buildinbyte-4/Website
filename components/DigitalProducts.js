import { FlaskConical, ShieldCheck } from 'lucide-react';
import RazorpayCheckout from '@/components/payments/RazorpayCheckout';
import { PRODUCT_CATALOG, TEST_PRODUCT_SKU } from '@/lib/payments/pricing.mjs';

const testProduct = PRODUCT_CATALOG[TEST_PRODUCT_SKU];

export default function DigitalProducts() {
  return (
    <section id="digital-products" aria-labelledby="digital-products-heading" className="scroll-mt-24 border-b border-slate-200 bg-white py-16 dark:border-white/10 dark:bg-transparent sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">BuildInByte Store</p>
          <h2 id="digital-products-heading" className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-950 dark:text-foreground sm:text-5xl">
            The BuildInByte digital shelf.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-zinc-300">
            Original digital products designed, built, and released by our team. This catalog is reserved for BuildInByte products—not client commissions.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-zinc-400">Our commercial releases are still being prepared. This clearly marked ₹1 test item is available only to verify the secure payment experience.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03] lg:col-span-6">
          <div className="border-b border-slate-200 p-6 dark:border-white/10 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-bg-surface-dark dark:text-zinc-200">
                <FlaskConical aria-hidden="true" size={21} />
              </div>
              <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">Test product · ₹1</span>
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground">{testProduct.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-zinc-400">{testProduct.description}</p>
            <p className="mt-4 flex items-start gap-2 text-sm text-slate-600 dark:text-zinc-300"><ShieldCheck aria-hidden="true" size={17} className="mt-0.5 shrink-0" />Success appears only after BuildInByte verifies the payment with Razorpay.</p>
          </div>
          <div className="bg-white p-6 dark:bg-bg-surface-dark sm:p-8">
            <RazorpayCheckout sku={TEST_PRODUCT_SKU} productName={testProduct.name} displayPrice={testProduct.offer.displayPrice} />
          </div>
        </div>
      </div>
    </section>
  );
}
