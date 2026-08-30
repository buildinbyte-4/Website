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
    <div className="fixed inset-0 bg-ink/40 z-50 flex items-center justify-center p-4">
      <div className="bg-surface p-6 md:p-8 relative w-full max-w-lg border border-line">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 border border-line text-muted hover:text-ink hover:border-accent flex items-center justify-center transition-colors duration-atelier"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <p className="label-meta mb-3">Consultation</p>
            <h2 className="font-display font-semibold text-2xl text-ink mb-2">
              {config.title || 'Start a project inquiry'}
            </h2>
            <p className="text-sm text-muted mb-6">
              Connect with our engineering team. We typically respond within 24 hours with a tailored outline.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Full name *</label>
                <input
                  required
                  type="text"
                  placeholder="Alex Sterling"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Work email *</label>
                <input
                  required
                  type="email"
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Company / organization</label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Project scope / requirements *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe hardware specs, firmware goals, software requirements, or timeline…"
                  value={formData.scope}
                  onChange={e => setFormData({ ...formData, scope: e.target.value })}
                  className="form-input resize-none"
                />
              </div>
              {errorMsg && (
                <div className="p-3 border border-danger text-danger text-xs">
                  {errorMsg}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-xs disabled:opacity-50"
              >
                {loading ? 'Submitting…' : 'Submit inquiry'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <p className="label-meta">Received</p>
            <h3 className="font-display font-semibold text-2xl text-ink">Inquiry received</h3>
            <p className="text-sm text-muted max-w-sm mx-auto">
              Thank you for reaching out to BuildInByte. Our delivery leads are reviewing your project scope and will follow up shortly.
            </p>
            <button
              onClick={onClose}
              className="btn-primary px-6 py-2.5 text-xs mt-4"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
