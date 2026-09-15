'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, Mail, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const STATUS_LABELS = { new: 'New', contacted: 'Contacted', closed: 'Closed' };

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadInquiries() {
      const { data, error: loadError } = await supabase
        .from('inquiries')
        .select('id, name, email, project_type, message, status, created_at')
        .order('created_at', { ascending: false });

      if (!active) return;
      if (loadError) {
        setError('Unable to load inquiries.');
      } else {
        setInquiries(data || []);
        setError('');
      }
      setLoading(false);
    }

    loadInquiries();
    const channel = supabase
      .channel('admin-inquiries-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, loadInquiries)
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return inquiries;
    return inquiries.filter((item) => [item.name, item.email, item.project_type, item.message].some((value) => String(value || '').toLowerCase().includes(needle)));
  }, [inquiries, query]);

  async function updateStatus(id, status) {
    setSavingId(id);
    const { error: updateError } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (updateError) {
      setError('The inquiry status could not be updated.');
    } else {
      setInquiries((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    }
    setSavingId(null);
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Inquiries</h1>
          <p className="mt-1 text-sm text-zinc-500">Qualified project requests submitted through the website.</p>
        </div>
        <label className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-brand-500">
          <Search size={16} className="text-zinc-400" />
          <span className="sr-only">Search inquiries</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search inquiries" className="w-full bg-transparent py-2 text-sm outline-none sm:w-64" />
        </label>
      </div>

      {error && <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div aria-busy="true" aria-label="Loading inquiries" className="space-y-3">
          {[0, 1, 2].map((item) => <div key={item} className="h-32 animate-pulse rounded-xl border border-zinc-200 bg-white" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-500">No inquiries match this view.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <article key={item.id} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-zinc-900">{item.name}</h2>
                    <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700">{STATUS_LABELS[item.status] || item.status}</span>
                  </div>
                  <a href={`mailto:${item.email}`} className="mt-2 inline-flex items-center gap-2 text-sm text-brand-700 hover:underline"><Mail size={15} />{item.email}</a>
                  <p className="mt-3 text-sm font-medium text-zinc-800">{item.project_type || 'General inquiry'}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-600">{item.message || 'No additional details provided.'}</p>
                  <p className="mt-3 inline-flex items-center gap-2 text-xs text-zinc-400"><Clock3 size={14} />{new Date(item.created_at).toLocaleString()}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button type="button" disabled={savingId === item.id || item.status === 'contacted'} onClick={() => updateStatus(item.id, 'contacted')} className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50">Mark contacted</button>
                  <button type="button" disabled={savingId === item.id || item.status === 'closed'} onClick={() => updateStatus(item.id, 'closed')} className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"><CheckCircle2 size={15} />Close</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
