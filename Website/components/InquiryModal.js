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
      <div className="bg-white dark:bg-black text-black dark:text-white border-3 border-black dark:border-white shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#ffffff] p-6 md:p-8 rounded-none relative w-full max-w-lg z-50">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-bold flex items-center justify-center hover:bg-red-650 hover:text-white cursor-pointer select-none transition-none"
        >
          ✕
        </button>

        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-black bg-brutal-yellow px-2.5 py-1 border-2 border-black inline-block mb-4 shadow-brutal-sm">
            Direct Consultation Channel
          </span>
          
          <h2 className="font-display font-black text-2xl text-black dark:text-white mb-2 tracking-tight">
            {config.title || 'Initiate Client Inquiry'}
          </h2>

          <p className="text-xs text-black dark:text-zinc-400 font-bold uppercase leading-tight mb-6">
            Connect directly with our delivery team. We respond within 24 hours with a tailored path forward.
          </p>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <p className="font-bold text-[#000000] dark:text-white mb-1">Inquiry received!</p>
              <p className="text-xs text-[#18181B] dark:text-zinc-400 mb-6">We'll get back to you within 24 hours.</p>
              <button type="button" onClick={onClose} className="btn-primary-invert text-xs py-2.5 px-5">
                Close
              </button>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold uppercase">
            {error && (
              <p className="text-red-650 font-bold text-xs">{error}</p>
            )}

            <div>
              <label className="block text-black dark:text-white mb-1">Full Name *</label>
              <input
                required
                type="text"
                name="name"
                placeholder="e.g. Alex Sterling"
                className="w-full px-3.5 py-2.5 rounded-none bg-white dark:bg-zinc-900 border-2 border-black dark:border-white text-xs text-black dark:text-white focus:outline-none shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff] focus:bg-brutal-yellow focus:text-black focus:border-black transition-none duration-0"
              />
            </div>

            <div>
              <label className="block text-black dark:text-white mb-1">Work Email *</label>
              <input
                required
                type="email"
                name="email"
                placeholder="alex@company.com"
                className="w-full px-3.5 py-2.5 rounded-none bg-white dark:bg-zinc-900 border-2 border-black dark:border-white text-xs text-black dark:text-white focus:outline-none shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff] focus:bg-brutal-yellow focus:text-black focus:border-black transition-none duration-0"
              />
            </div>

            <div>
              <label className="block text-black dark:text-white mb-1">Company / Organization</label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Vanguard Labs"
                className="w-full px-3.5 py-2.5 rounded-none bg-white dark:bg-zinc-900 border-2 border-black dark:border-white text-xs text-black dark:text-white focus:outline-none shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff] focus:bg-brutal-yellow focus:text-black focus:border-black transition-none duration-0"
              />
            </div>

            <div>
              <label className="block text-black dark:text-white mb-1">Project Scope & Requirements</label>
              <textarea
                rows={3}
                name="scope"
                placeholder="Detail your technology requirements, timeframe, or desired features..."
                className="w-full px-3.5 py-2.5 rounded-none bg-white dark:bg-zinc-900 border-2 border-black dark:border-white text-xs text-black dark:text-white focus:outline-none shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff] focus:bg-brutal-yellow focus:text-black focus:border-black transition-none duration-0"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary-invert text-xs py-2.5 px-4 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary-invert text-xs py-2.5 px-5 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <span>{submitting ? 'Submitting...' : 'Submit Inquiry'}</span>
              </button>
            </div>
          </form>
          )}
        </div>

      </div>
    </div>
  );
}
