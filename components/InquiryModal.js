'use client';
import { useEffect, useState } from 'react';

export default function InquiryModal({ config, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', scope: '' });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !loading) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [loading, onClose]);

  if (!config) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType: config.title || 'General Custom Scope',
          scope: formData.scope,
          company: formData.company,
          name: formData.name,
          email: formData.email,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'The inquiry could not be submitted.');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setErrorMsg('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onMouseDown={(event) => { if (event.target === event.currentTarget && !loading) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="inquiry-title" className="bg-white dark:bg-bg-surface-dark text-slate-900 dark:text-foreground border border-slate-200 dark:border-white/10 shadow-2xl p-6 md:p-8 rounded-2xl relative w-full max-w-lg z-50">
        
        <button
          onClick={onClose}
          aria-label="Close inquiry form"
          className="absolute top-4 right-4 w-9 h-9 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-bg-surface-dark text-slate-900 dark:text-foreground font-semibold flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <span className="text-xs font-semibold  tracking-wider text-black bg-accent-soft px-2.5 py-1 border border-slate-200 inline-block mb-4 shadow-card-sm">
              Direct Consultation Channel
            </span>
            
            <h2 id="inquiry-title" className="font-display font-semibold text-2xl text-slate-900 dark:text-foreground mb-2 tracking-tight">
              {config.title || 'Initiate Client Inquiry'}
            </h2>

            <p className="text-xs text-black dark:text-zinc-400 font-semibold  leading-tight mb-6">
              Connect directly with our delivery team. We respond within 24 hours with a tailored path forward.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold ">
              <div>
                <label htmlFor="inquiry-name" className="block text-slate-900 dark:text-foreground mb-1">Full Name *</label>
                <input
                  id="inquiry-name"
                  required
                  type="text"
                  placeholder="e.g. Alex Sterling"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-foreground focus:outline-none shadow-sm dark:shadow-sm focus:bg-accent-soft focus:text-black focus:border-slate-200 transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="inquiry-email" className="block text-slate-900 dark:text-foreground mb-1">Work Email *</label>
                <input
                  id="inquiry-email"
                  required
                  type="email"
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-foreground focus:outline-none shadow-sm dark:shadow-sm focus:bg-accent-soft focus:text-black focus:border-slate-200 transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="inquiry-company" className="block text-slate-900 dark:text-foreground mb-1">Company / Organization</label>
                <input
                  id="inquiry-company"
                  type="text"
                  placeholder="e.g. Vanguard Labs"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-foreground focus:outline-none shadow-sm dark:shadow-sm focus:bg-accent-soft focus:text-black focus:border-slate-200 transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="inquiry-scope" className="block text-slate-900 dark:text-foreground mb-1">Project Scope & Requirements</label>
                <textarea
                  id="inquiry-scope"
                  rows={3}
                  required
                  minLength={10}
                  maxLength={5000}
                  placeholder="Detail your technology requirements, timeframe, or desired features..."
                  value={formData.scope}
                  onChange={e => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-foreground focus:outline-none shadow-sm dark:shadow-sm focus:bg-accent-soft focus:text-black focus:border-slate-200 transition-colors duration-200"
                ></textarea>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-100 border border-red-650 text-red-650 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="btn-secondary-invert text-xs py-2.5 px-4 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary-invert text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer"
                >
                  {loading && <span className="w-3.5 h-3.5 border border-t-transparent border-[#F7F7F8] rounded-full animate-spin"></span>}
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-foreground bg-accent-soft mx-auto flex items-center justify-center font-semibold text-2xl shadow-card-sm">
              ✓
            </div>
            <h3 className="font-display font-semibold text-2xl text-slate-900 dark:text-foreground">
              Inquiry Received
            </h3>
            <p className="text-xs text-black dark:text-zinc-400 font-semibold  max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900 dark:text-foreground">{formData.name}</span>. Our team has received your request and will follow up at <span className="font-semibold text-brand-600 dark:text-brand-400">{formData.email}</span> within 24 hours.
            </p>
            <button onClick={onClose} className="btn-primary-invert text-xs py-2 px-6 cursor-pointer">
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
