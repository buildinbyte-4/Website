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
      if (!supabase) {
        throw new Error('Supabase client is unavailable.');
      }

      const { error } = await supabase.from('inquiries').insert([
        {
          name: formData.name,
          email: formData.email,
          project_type: config.title || 'General Custom Scope',
          message: formData.company ? `Company: ${formData.company}. Scope: ${formData.scope}` : formData.scope,
          status: 'new'
        }
      ]);
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error('Error inserting inquiry:', err);
      setErrorMsg(err.message || 'Failed to submit inquiry to database. Check RLS or authentication status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-bg-primary-dark backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-primary-dark border border-accent-blue rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-bg-primary-dark text-text-primary font-bold flex items-center justify-center hover:bg-accent-blue hover:text-white transition-all"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent-blue bg-accent-blue/10 px-2.5 py-1 rounded-full border border-accent-blue inline-block mb-2">
              Direct Consultation Channel
            </span>
            
            <h2 className="font-display font-bold text-2xl text-text-primary mb-1">
              {config.title || 'Initiate Client Inquiry'}
            </h2>

            <p className="text-xs text-text-secondary mb-6">
              Connect directly with our delivery team. We respond within 24 hours with a tailored path forward.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-text-primary mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Alex Sterling"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-bg-primary-dark border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-text-primary mb-1">Work Email *</label>
                <input
                  required
                  type="email"
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-bg-primary-dark border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-text-primary mb-1">Company / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Vanguard Labs"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-bg-primary-dark border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-text-primary mb-1">Project Scope & Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Detail your technology requirements, timeframe, or desired features..."
                  value={formData.scope}
                  onChange={e => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-bg-primary-dark border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-blue"
                ></textarea>
              </div>

              {errorMsg && (
                <div className="p-3 bg-accent-blue/10 border border-accent-blue rounded-xl text-xs font-semibold text-accent-blue">
                  {errorMsg}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="btn-secondary text-xs py-2.5 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2"
                >
                  {loading && <span className="w-3.5 h-3.5 border-2 border-t-transparent border-[#FDFBF7] rounded-full animate-spin"></span>}
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-accent-blue/10 text-accent-blue mx-auto flex items-center justify-center font-bold text-2xl">
              ✓
            </div>
            <h3 className="font-display font-bold text-2xl text-text-primary">
              Inquiry Received
            </h3>
            <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-text-primary">{formData.name}</span>. Our team has received your request and will follow up at <span className="font-bold text-accent-blue">{formData.email}</span> within 24 hours.
            </p>
            <button onClick={onClose} className="btn-primary text-xs py-2 px-6">
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
