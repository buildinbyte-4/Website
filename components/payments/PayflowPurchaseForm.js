'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, LoaderCircle, LockKeyhole } from 'lucide-react';
import { detectBrowserCountry, getPayflowOffer } from '@/lib/payflow/product';

function createBrowserUuid() {
  if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID();
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export default function PayflowPurchaseForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const [region, setRegion] = useState({ countryCode: 'US', offer: getPayflowOffer('US') });
  const idempotencyKey = useRef(null);

  useEffect(() => {
    const countryCode = detectBrowserCountry();
    setRegion({ countryCode, offer: getPayflowOffer(countryCode) });
    setReady(true);
  }, []);

  const startCheckout = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('submitting');
    const formData = new FormData(event.currentTarget);
    const purchase = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      acceptedTerms: formData.get('acceptedTerms') === 'on',
      countryCode: region.countryCode,
    };
    try {
      idempotencyKey.current ||= createBrowserUuid();
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey.current },
        body: JSON.stringify(purchase),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.error || 'Unable to start checkout.');
      sessionStorage.setItem('payflow.purchase', JSON.stringify({
        paymentId: payload.data.paymentId,
        email: purchase.email,
        productName: payload.data.product.name,
      }));
      window.location.assign(payload.data.checkoutUrl);
    } catch (reason) {
      setStatus('error');
      setError(reason.message || 'Unable to start checkout. Please try again.');
    }
  };

  return (
    <form onSubmit={startCheckout} className="mt-7 border-t border-slate-200 pt-6 dark:border-white/10">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700 dark:text-zinc-200">
          Name
          <input name="name" autoComplete="name" required minLength={2} maxLength={120} disabled={!ready} className="mt-2 min-h-11 w-full border border-slate-300 bg-white px-3.5 text-slate-950 disabled:cursor-wait disabled:opacity-60 dark:border-white/15 dark:bg-black/30 dark:text-white" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-zinc-200">
          Delivery email
          <input name="email" type="email" inputMode="email" autoComplete="email" required maxLength={320} disabled={!ready} className="mt-2 min-h-11 w-full border border-slate-300 bg-white px-3.5 text-slate-950 disabled:cursor-wait disabled:opacity-60 dark:border-white/15 dark:bg-black/30 dark:text-white" />
        </label>
      </div>
      <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-zinc-300">
        <input name="acceptedTerms" type="checkbox" required disabled={!ready} className="mt-1 h-4 w-4 shrink-0 accent-slate-950 disabled:cursor-wait disabled:opacity-60" />
        <span>I agree to the <Link href="/terms" className="font-semibold underline underline-offset-4">terms</Link> and the source-code licence included with the product.</span>
      </label>
      {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</p>}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={!ready || status === 'submitting'} className="btn-primary min-h-12 px-5 disabled:cursor-wait disabled:opacity-60">
          {status === 'submitting' ? <><LoaderCircle size={17} className="animate-spin" /> Opening secure checkout</> : <>Buy source code — {region.offer.displayPrice} <ArrowRight size={17} /></>}
        </button>
        <span className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400"><LockKeyhole size={14} /> Payment details stay with the payment provider.</span>
      </div>
      <p aria-live="polite" className="mt-3 text-xs text-slate-500 dark:text-zinc-400">
        {region.offer.market} checkout · {region.offer.currency}{region.countryCode === 'IN' ? ' · UPI available' : ''}
      </p>
      <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500 dark:text-zinc-400"><CheckCircle2 size={14} className="mt-0.5 shrink-0" /> One production application, buyer-hosted, with Razorpay and mock-provider adapters included.</p>
    </form>
  );
}
