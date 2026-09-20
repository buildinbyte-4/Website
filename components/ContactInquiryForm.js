'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const initialForm = { name: '', email: '', company: '', service: '', engagement: '', budget: '', timeline: '', scope: '', website: '' };
const fieldClass = 'mt-2 min-h-12 w-full border border-border-subtle bg-canvas px-3.5 py-3 text-sm text-foreground placeholder:text-text-secondary focus:bg-bg-surface-dark';

export default function ContactInquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const requestKey = useRef(null);

  const update = (field, value) => {
    requestKey.current = null;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');
    try {
      requestKey.current ||= crypto.randomUUID();
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestKey.current },
        body: JSON.stringify({
          name: form.name, email: form.email, company: form.company,
          projectType: form.service || 'General project inquiry',
          engagement: form.engagement, budget: form.budget, timeline: form.timeline,
          scope: form.scope, website: form.website,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We could not send your brief.');
      requestKey.current = null;
      setStatus('success');
      setForm(initialForm);
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'We could not send your brief. Please try again or email us directly.');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="flex min-h-[28rem] flex-col justify-center border border-border-subtle bg-bg-surface-dark p-8 sm:p-12">
        <CheckCircle2 size={32} aria-hidden="true" />
        <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">Brief received.</h3>
        <p className="mt-4 max-w-md leading-7 text-text-secondary">We’ll review the details and reply within 24–48 business hours with questions or a practical next step.</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-secondary mt-8 w-fit">Send another brief</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border-subtle bg-bg-surface-dark p-5 sm:p-8" aria-describedby="form-privacy">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">Name <span aria-hidden="true">*</span>
          <input className={fieldClass} name="name" autoComplete="name" required minLength={2} maxLength={120} value={form.name} onChange={(e) => update('name', e.target.value)} />
        </label>
        <label className="text-sm font-medium">Work email <span aria-hidden="true">*</span>
          <input className={fieldClass} name="email" type="email" autoComplete="email" required maxLength={320} value={form.email} onChange={(e) => update('email', e.target.value)} />
        </label>
        <label className="text-sm font-medium sm:col-span-2">Company or organization
          <input className={fieldClass} name="company" autoComplete="organization" maxLength={160} value={form.company} onChange={(e) => update('company', e.target.value)} />
        </label>
        <label className="text-sm font-medium">What do you need? <span aria-hidden="true">*</span>
          <select className={fieldClass} name="service" required value={form.service} onChange={(e) => update('service', e.target.value)}>
            <option value="">Select a service</option>
            <option>Custom software or platform</option><option>Website or web application</option>
            <option>API or systems integration</option><option>AI and workflow automation</option>
            <option>IoT or connected hardware</option><option>Existing product improvement</option>
          </select>
        </label>
        <label className="text-sm font-medium">Preferred engagement
          <select className={fieldClass} name="engagement" value={form.engagement} onChange={(e) => update('engagement', e.target.value)}>
            <option value="">Not sure yet</option><option>Discovery sprint</option><option>Fixed-scope build</option>
            <option>Dedicated delivery</option><option>Care and growth</option>
          </select>
        </label>
        <label className="text-sm font-medium">Estimated budget range
          <select id="budget" className={fieldClass} name="budget" required aria-describedby="budget-note" value={form.budget} onChange={(e) => update('budget', e.target.value)}>
            <option value="">Select a range</option><option>₹10,000–₹25,000</option><option>₹25,000–₹50,000</option>
            <option>₹50,000–₹1 lakh</option><option>₹1–₹3 lakh</option><option>₹3–₹8 lakh</option><option>₹8 lakh+</option>
          </select>
          <span id="budget-note" className="mt-2 block text-xs font-normal leading-5 text-text-secondary">This is an initial estimate, not the final budget. Final pricing is agreed after you and the BuildInByte team discuss the requirements.</span>
        </label>
        <label className="text-sm font-medium">Target start
          <select className={fieldClass} name="timeline" value={form.timeline} onChange={(e) => update('timeline', e.target.value)}>
            <option value="">Flexible</option><option>As soon as possible</option><option>Within 1 month</option>
            <option>Within 1–3 months</option><option>More than 3 months away</option>
          </select>
        </label>
        <label className="text-sm font-medium sm:col-span-2">What are you trying to achieve? <span aria-hidden="true">*</span>
          <textarea className={`${fieldClass} min-h-36 resize-y`} name="scope" required minLength={20} maxLength={5000} placeholder="The problem, who it affects, what exists today, and what a successful result would look like." value={form.scope} onChange={(e) => update('scope', e.target.value)} />
        </label>
        <label className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">Website
          <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update('website', e.target.value)} />
        </label>
      </div>
      {status === 'error' && <p role="alert" className="mt-5 border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">{message}</p>}
      <div className="mt-7 flex flex-col gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-privacy" className="max-w-md text-xs leading-5 text-text-secondary">By submitting, you agree that BuildInByte may use these details to respond to your inquiry. See our <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>.</p>
        <button type="submit" disabled={status === 'submitting'} className="btn-primary shrink-0 disabled:cursor-wait disabled:opacity-60">{status === 'submitting' ? 'Sending…' : <>Send brief <ArrowRight size={16} /></>}</button>
      </div>
    </form>
  );
}
