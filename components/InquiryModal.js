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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-panel p-6 md:p-8 rounded-2xl relative w-full max-w-lg border border-white/10 shadow-2xl animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#171f33] text-[#bcc9cd] hover:text-[#dae2fd] border border-white/10 flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#4cd7f6] font-mono text-xs tracking-wider uppercase mb-3">
              <span>Direct Consultation Channel</span>
            </div>
            
            <h2 className="font-display font-bold text-2xl text-[#dae2fd] mb-2">
              {config.title || 'Initiate Client Inquiry'}
            </h2>

            <p className="text-xs text-[#869397] font-mono mb-6">
              Connect directly with our engineering lead team. We respond within 24 hours with a tailored solution outline.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#dae2fd] mb-1.5">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="Alex Sterling"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[#dae2fd] mb-1.5">Work Email *</label>
                <input
                  required
                  type="email"
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[#dae2fd] mb-1.5">Company / Organization</label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[#dae2fd] mb-1.5">Project Scope / Requirements *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your hardware specs, firmware goals, software requirements, or target timeline..."
                  value={formData.scope}
                  onChange={e => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-xs"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-cyan py-3 rounded-xl text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {loading ? 'Submitting Technical Inquiry...' : 'Submit Inquiry →'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#06b6d4]/20 border border-[#06b6d4] text-[#4cd7f6] flex items-center justify-center mx-auto text-xl">
              ✓
            </div>
            <h3 className="font-display font-bold text-2xl text-[#dae2fd]">Inquiry Received</h3>
            <p className="text-xs font-mono text-[#869397] max-w-sm mx-auto">
              Thank you for reaching out to BuildInByte. Our engineering delivery leads are reviewing your project scope and will follow up shortly.
            </p>
            <button
              onClick={onClose}
              className="btn-cyan px-6 py-2.5 rounded-xl text-xs font-mono uppercase mt-4"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
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
