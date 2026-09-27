'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, CircleAlert, LoaderCircle } from 'lucide-react';

const WAITING_STATUSES = new Set(['CREATED', 'PROCESSING', 'PENDING']);

export default function PaymentResult() {
  const [state, setState] = useState({ phase: 'loading', status: '', message: 'Confirming your payment…', purchase: null });

  useEffect(() => {
    let active = true;
    let timer;
    let attempts = 0;
    const stored = sessionStorage.getItem('payflow.purchase');
    let purchase;
    try { purchase = stored ? JSON.parse(stored) : null; } catch { purchase = null; }
    if (!purchase?.paymentId) {
      setState({ phase: 'missing', status: '', message: 'This browser does not have a purchase to confirm.', purchase: null });
      return undefined;
    }

    const confirm = async () => {
      attempts += 1;
      try {
        const response = await fetch(`/api/payments/status?paymentId=${encodeURIComponent(purchase.paymentId)}`, { cache: 'no-store' });
        const payload = await response.json();
        if (!response.ok || !payload.success) throw new Error(payload.error || 'Unable to confirm payment.');
        if (!active) return;
        const paymentStatus = String(payload.data.status || '').toUpperCase();
        if (paymentStatus === 'SUCCESS') {
          setState({ phase: 'success', status: paymentStatus, message: `Payment confirmed. Purchase instructions will be sent to ${purchase.email}.`, purchase });
          sessionStorage.removeItem('payflow.purchase');
          return;
        }
        if (WAITING_STATUSES.has(paymentStatus) && attempts < 8) {
          setState({ phase: 'loading', status: paymentStatus, message: 'Your payment is still being confirmed…', purchase });
          timer = window.setTimeout(confirm, 2500);
          return;
        }
        const failed = paymentStatus === 'FAILED' || paymentStatus === 'CANCELLED';
        setState({
          phase: failed ? 'failed' : 'pending',
          status: paymentStatus,
          message: failed ? 'The payment was not completed. You can return and try again.' : 'Confirmation is taking longer than expected. Keep your payment reference and check again shortly.',
          purchase,
        });
      } catch (error) {
        if (active) setState({ phase: 'pending', status: '', message: error.message || 'Unable to confirm payment right now.', purchase });
      }
    };

    void confirm();
    return () => { active = false; window.clearTimeout(timer); };
  }, []);

  const success = state.phase === 'success';
  const loading = state.phase === 'loading';
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-6 py-16 text-foreground">
      <section aria-labelledby="payment-result-title" aria-live="polite" className="w-full max-w-xl border border-border-subtle bg-bg-surface-dark p-7 shadow-card sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center border border-border-subtle bg-accent-soft">
          {loading ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : success ? <CheckCircle2 aria-hidden="true" /> : <CircleAlert aria-hidden="true" />}
        </div>
        <p className="mt-7 font-mono text-xs uppercase tracking-[0.16em] text-text-secondary">Payment status{state.status ? ` / ${state.status}` : ''}</p>
        <h1 id="payment-result-title" className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{success ? 'Your payment is confirmed.' : loading ? 'Confirming your purchase.' : 'Payment needs attention.'}</h1>
        <p className="mt-4 text-sm leading-7 text-text-secondary">{state.message}</p>
        {state.purchase?.paymentId && <p className="mt-5 break-all border-t border-border-subtle pt-5 font-mono text-xs text-text-secondary">Reference: {state.purchase.paymentId}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/#digital-products" className="btn-primary">Back to product</Link>
          {state.phase === 'pending' && <button type="button" onClick={() => window.location.reload()} className="btn-secondary">Check again</button>}
        </div>
      </section>
    </main>
  );
}
