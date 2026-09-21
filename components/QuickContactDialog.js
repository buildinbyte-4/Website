'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, MailCheck, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const DRAFT_KEY = 'buildinbyte_quick_contact_draft';
const GMAIL_PATTERN = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail\.com$/i;

async function submitVerifiedMessage(draft) {
  const response = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': draft.requestId },
    body: JSON.stringify({
      name: 'Quick contact', email: draft.email, company: '',
      projectType: 'Quick contact message', scope: draft.message,
    }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Your message could not be sent.');
}

export default function QuickContactDialog({ onClose }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const finishingRef = useRef(false);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && status !== 'sending') onClose();
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [onClose, status]);

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;

    const finishPendingDraft = async (user) => {
      const rawDraft = sessionStorage.getItem(DRAFT_KEY);
      if (!rawDraft || !user?.email || finishingRef.current) return;
      try {
        const draft = JSON.parse(rawDraft);
        const fresh = Date.now() - draft.createdAt < 60 * 60 * 1000;
        if (!fresh) {
          sessionStorage.removeItem(DRAFT_KEY);
          return;
        }
        if (user.email.toLowerCase() !== draft.email.toLowerCase()) return;
        finishingRef.current = true;
        setEmail(draft.email);
        setMessage(draft.message);
        setStatus('sending');
        await submitVerifiedMessage(draft);
        sessionStorage.removeItem(DRAFT_KEY);
        const url = new URL(window.location.href);
        if (url.searchParams.has('quick_contact')) {
          url.searchParams.delete('quick_contact');
          window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
        }
        if (active) setStatus('success');
      } catch (submitError) {
        if (active) { setError(submitError.message); setStatus('error'); }
      } finally {
        finishingRef.current = false;
      }
    };

    supabase.auth.getUser().then(({ data }) => finishPendingDraft(data?.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setTimeout(() => finishPendingDraft(session.user), 0);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const normalizedEmail = email.trim().toLowerCase();
    if (!GMAIL_PATTERN.test(normalizedEmail)) {
      setError('Please enter a valid @gmail.com address.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Please describe your question or problem in at least 10 characters.');
      return;
    }
    if (!supabase) {
      setError('Email verification is temporarily unavailable. Please use the full contact page.');
      return;
    }

    setStatus('sending');
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const draft = { email: normalizedEmail, message: message.trim(), createdAt: Date.now(), requestId: crypto.randomUUID() };
      if (user?.email?.toLowerCase() === normalizedEmail) {
        await submitVerifiedMessage(draft);
        setStatus('success');
        return;
      }
      if (user?.email && user.email.toLowerCase() !== normalizedEmail) {
        throw new Error(`You are signed in as ${user.email}. Use that verified email or log out first.`);
      }

      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: { shouldCreateUser: true, emailRedirectTo: `${window.location.origin}/?quick_contact=verified` },
      });
      if (otpError) throw otpError;
      setStatus('check-email');
    } catch (submitError) {
      setError(submitError.message || 'We could not verify that Gmail address.');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-end bg-black/45 p-3 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && status !== 'sending' && onClose()}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="quick-contact-title" className="relative max-h-[calc(100vh-1.5rem)] w-full max-w-md overflow-y-auto border border-border-subtle bg-bg-surface-dark p-6 text-foreground shadow-2xl sm:p-8">
        <button ref={closeRef} type="button" onClick={onClose} disabled={status === 'sending'} aria-label="Close quick contact form" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-canvas hover:bg-accent-soft disabled:opacity-50"><X size={17} /></button>

        {status === 'success' ? (
          <div className="py-8" role="status">
            <CheckCircle2 size={30} aria-hidden="true" />
            <h2 id="quick-contact-title" className="mt-5 font-display text-2xl font-semibold">Message sent.</h2>
            <p className="mt-3 text-sm leading-6 text-text-secondary">Your Gmail address was verified and your message reached the BuildInByte team. We’ll respond within 24–48 business hours.</p>
            <button type="button" onClick={onClose} className="btn-primary mt-7">Done</button>
          </div>
        ) : status === 'check-email' ? (
          <div className="py-8" role="status">
            <MailCheck size={30} aria-hidden="true" />
            <h2 id="quick-contact-title" className="mt-5 font-display text-2xl font-semibold">Check your Gmail.</h2>
            <p className="mt-3 text-sm leading-6 text-text-secondary">We sent a one-time verification link to <strong className="text-foreground">{email}</strong>. Open it to verify your address and send the saved message.</p>
            <button type="button" onClick={() => { sessionStorage.removeItem(DRAFT_KEY); setStatus('idle'); }} className="btn-secondary mt-7">Use another Gmail</button>
          </div>
        ) : (
          <>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">Quick message</p>
            <h2 id="quick-contact-title" className="mt-3 pr-10 font-display text-2xl font-semibold">What can we help with?</h2>
            <p className="mt-2 text-sm leading-6 text-text-secondary">Leave a short message. We verify your Gmail before it reaches our team.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <label className="block text-sm font-medium">Gmail address
                <input type="email" inputMode="email" autoComplete="email" required placeholder="you@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-12 w-full border border-border-subtle bg-canvas px-3.5 py-3 text-sm" />
              </label>
              <label className="block text-sm font-medium">Your message
                <textarea required minLength={10} maxLength={2000} rows={5} placeholder="Tell us about your problem, idea, or question…" value={message} onChange={(event) => setMessage(event.target.value)} className="mt-2 w-full resize-y border border-border-subtle bg-canvas px-3.5 py-3 text-sm" />
              </label>
              {error && <p role="alert" className="border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">{error}</p>}
              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:cursor-wait disabled:opacity-60">{status === 'sending' ? 'Please wait…' : <>Verify Gmail and send <ArrowRight size={16} /></>}</button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
