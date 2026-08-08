'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function InquiryModal({ config, onClose }) {
  if (!config) return null;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', scope: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      // 1. Log to Supabase Database
      if (supabase) {
        const { error } = await supabase.from('inquiries').insert([
          {
            name: formData.name,
            email: formData.email,
            project_type: config.title || 'General Custom Scope',
            message: formData.company ? `Company: ${formData.company}. Scope: ${formData.scope}` : formData.scope,
            status: 'new'
          }
        ]);
        if (error) {
          console.warn('Supabase insert warning:', error.message);
        }
      }

      // 2. Submit to FormSubmit via AJAX in background to trigger email
      const formBody = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        scope: formData.scope,
        _subject: config.title || 'New Client Inquiry',
      };

      await fetch("https://formsubmit.co/ajax/support@buildinbyte.in", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formBody)
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setErrorMsg('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
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

        {!submitted ? (
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

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold uppercase">
              <div>
                <label className="block text-black dark:text-white mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Alex Sterling"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-none bg-white dark:bg-zinc-900 border-2 border-black dark:border-white text-xs text-black dark:text-white focus:outline-none shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff] focus:bg-brutal-yellow focus:text-black focus:border-black transition-none duration-0"
                />
              </div>

              <div>
                <label className="block text-black dark:text-white mb-1">Work Email *</label>
                <input
                  required
                  type="email"
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-none bg-white dark:bg-zinc-900 border-2 border-black dark:border-white text-xs text-black dark:text-white focus:outline-none shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff] focus:bg-brutal-yellow focus:text-black focus:border-black transition-none duration-0"
                />
              </div>

              <div>
                <label className="block text-black dark:text-white mb-1">Company / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Vanguard Labs"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-none bg-white dark:bg-zinc-900 border-2 border-black dark:border-white text-xs text-black dark:text-white focus:outline-none shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff] focus:bg-brutal-yellow focus:text-black focus:border-black transition-none duration-0"
                />
              </div>

              <div>
                <label className="block text-black dark:text-white mb-1">Project Scope & Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Detail your technology requirements, timeframe, or desired features..."
                  value={formData.scope}
                  onChange={e => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-none bg-white dark:bg-zinc-900 border-2 border-black dark:border-white text-xs text-black dark:text-white focus:outline-none shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff] focus:bg-brutal-yellow focus:text-black focus:border-black transition-none duration-0"
                ></textarea>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-100 border-2 border-red-650 text-red-650 text-xs font-black">
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
                  {loading && <span className="w-3.5 h-3.5 border-2 border-t-transparent border-[#FDFBF7] rounded-full animate-spin"></span>}
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 border-4 border-black dark:border-white text-black dark:text-white bg-brutal-yellow mx-auto flex items-center justify-center font-bold text-2xl shadow-brutal-sm">
              ✓
            </div>
            <h3 className="font-display font-black text-2xl text-black dark:text-white">
              Inquiry Received
            </h3>
            <p className="text-xs text-black dark:text-zinc-400 font-bold uppercase max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-black text-black dark:text-white">{formData.name}</span>. Our team has received your request and will follow up at <span className="font-black text-blue-600 dark:text-blue-400">{formData.email}</span> within 24 hours.
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
