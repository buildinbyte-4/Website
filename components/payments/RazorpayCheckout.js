'use client';

import { useReducer, useRef } from 'react';
import { checkoutReducer, initialCheckoutState } from '@/lib/payments/checkout-state.mjs';
import { detectBrowserCountry } from '@/lib/payments/pricing.mjs';

let checkoutScriptPromise;

function loadRazorpayCheckout() {
  if (window.Razorpay) return Promise.resolve();
  if (checkoutScriptPromise) return checkoutScriptPromise;
  checkoutScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error('SCRIPT_LOAD_FAILED'));
    document.head.appendChild(script);
  }).catch((error) => {
    checkoutScriptPromise = undefined;
    throw error;
  });
  return checkoutScriptPromise;
}

async function readResponse(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'The payment service is unavailable.');
  return payload.data;
}

export default function RazorpayCheckout({ sku, productName, displayPrice }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialCheckoutState);
  const active = useRef(false);

  async function startCheckout(event) {
    event.preventDefault();
    if (active.current) return;
    active.current = true;
    dispatch({ type: 'loading' });
    const form = new FormData(event.currentTarget);

    try {
      await loadRazorpayCheckout();
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'idempotency-key': crypto.randomUUID() },
        body: JSON.stringify({ sku, name: form.get('name'), email: form.get('email'), countryCode: detectBrowserCountry() }),
      });
      const order = await readResponse(response);
      const checkout = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: 'BuildInByte',
        description: productName,
        prefill: order.customer,
        ...(order.preferredMethod ? { method: order.preferredMethod } : {}),
        modal: {
          ondismiss() {
            if (!active.current) return;
            active.current = false;
            dispatch({ type: 'cancelled' });
          },
        },
        async handler(payment) {
          dispatch({ type: 'verifying' });
          try {
            const verification = await readResponse(await fetch('/api/payments/verify', {
              method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payment),
            }));
            if (verification.status !== 'paid') throw new Error(verification.message || 'Payment is awaiting confirmation.');
            dispatch({ type: 'success' });
          } catch (error) {
            dispatch({ type: 'failed', message: error.message || 'Payment verification failed.' });
          } finally { active.current = false; }
        },
      });
      checkout.on('payment.failed', (failure) => {
        active.current = false;
        dispatch({ type: 'failed', message: failure?.error?.description || 'Payment failed. Please try again.' });
      });
      dispatch({ type: 'opened' });
      checkout.open();
    } catch (error) {
      active.current = false;
      dispatch({ type: 'failed', message: error.message === 'SCRIPT_LOAD_FAILED' ? 'Secure checkout could not load. Check your connection and try again.' : error.message });
    }
  }

  const busy = ['loading', 'open', 'verifying'].includes(state.status);
  return (
    <form onSubmit={startCheckout} className="mt-6 grid gap-4" aria-busy={busy}>
      <label className="grid gap-2 text-sm">Name<input required name="name" autoComplete="name" className="rounded-lg border border-slate-300 bg-transparent px-3 py-2" /></label>
      <label className="grid gap-2 text-sm">Delivery email<input required type="email" name="email" autoComplete="email" className="rounded-lg border border-slate-300 bg-transparent px-3 py-2" /></label>
      <button type="submit" disabled={busy} className="rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-black">
        {busy ? 'Please wait…' : `Buy securely${displayPrice ? ` — ${displayPrice}` : ''}`}
      </button>
      <p role="status" aria-live="polite" className="min-h-6 text-sm text-slate-600 dark:text-zinc-300">{state.message}</p>
    </form>
  );
}
