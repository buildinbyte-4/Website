'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function InquiryModal({ config, onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!config) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const company = form.company.value.trim();
    const scope = form.scope.value.trim();

    const message = company ? `Company: ${company}\n\n${scope}` : scope;

    try {
      if (supabase) {
        const { error: insertError } = await supabase.from('inquiries').insert({
          name,
          email,
          project_type: config.title || 'General Inquiry',
          message,
        });
        if (insertError) {
          console.warn('Supabase insert warning:', insertError.message);
        }
      }

      // Submit via FormSubmit AJAX endpoint in background
      await fetch("https://formsubmit.co/ajax/support@buildinbyte.in", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          company,
          scope,
          _subject: config.title || 'New Client Inquiry',
        })
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError('Something went wrong submitting your inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="glass-panel rounded-xl p-8 md:p-12 relative overflow-hidden border-0 shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#ffffff] p-6 md:p-8 rounded-none relative w-full max-w-lg z-50">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 border-2 border-white/20 bg-surface/50 dark:bg-surface/50 text-on-surface-variant dark:text-on-surface-variant font-bold flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-pointer select-none"
        >
          ✕
        </button>

        <div className="relative z-10">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase bg-primary/10 px-2 py-1 rounded border border-primary/20 mb-4 inline-block">
            Direct Consultation Channel
          </span>

          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
            {config.title || 'Initiate Client Inquiry'}
          </h2>

          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Connect directly with our delivery team. We respond within 24 hours with a tailored path forward.
          </p>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <p className="font-bold text-on-surface mb-1">Inquiry received!</p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">We'll get back to you within 24 hours.</p>
              <button type="button" onClick={onClose} className="w-full bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded hover:bg-primary-fixed transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <p className="font-body-md text-body-md text-error mb-4">{error}</p>
              )}

              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Full Name *</label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="e.g. Alex Sterling"
                  className="w-full bg-[#020617] border-0 border-b border-white/10 text-on-surface font-body-md px-4 py-3 focus:ring-0 transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Work Email *</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="alex@company.com"
                  className="w-full bg-[#020617] border-0 border-b border-white/10 text-on-surface font-body-md px-4 py-3 focus:ring-0 transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Company / Organization</label>
                <input
                  type="text"
                  name="company"
                  placeholder="e.g. Vanguard Labs"
                  className="w-full bg-[#020617] border-0 border-b border-white/10 text-on-surface font-body-md px-4 py-3 focus:ring-0 transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Project Scope & Requirements</label>
                <textarea
                  rows={4}
                  name="scope"
                  placeholder="Detail your technology requirements, timeframe, or desired features..."
                  className="w-full bg-[#020617] border-0 border-b border-white/10 text-on-surface font-body-md px-4 py-3 focus:ring-0 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="glass-panel border border-primary text-primary font-label-caps text-label-caps px-8 py-4 rounded hover:bg-primary/10 transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded hover:bg-primary-fixed transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}