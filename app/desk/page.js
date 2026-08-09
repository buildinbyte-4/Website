'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import FloatingContactButton from '@/components/FloatingContactButton';
import InquiryModal from '@/components/InquiryModal';

// ── Static project data (no projects table exists yet) ──────────────
const STATIC_PROJECTS = [
  {
    id: 'BIB-4982',
    name: 'BuildInByte Custom SaaS',
    desc: 'Main corporate codebase and API services deployment.',
    status: 'active',  // active | in_scoping | completed
  },
  {
    id: 'BIB-7712',
    name: 'API Documentation',
    desc: 'Internal developer guides and integration protocols.',
    status: 'in_scoping',
  },
];

// ── Status badge styling helper ─────────────────────────────────────
function getProjectBadge(status) {
  switch (status) {
    case 'active':
      return { label: 'ACTIVE', cls: 'bg-[#0066FF] text-white border-2 border-black' };
    case 'in_scoping':
      return { label: 'IN SCOPING', cls: 'bg-white text-black border-2 border-black' };
    case 'completed':
      return { label: 'COMPLETED', cls: 'bg-black text-white border-2 border-black' };
    default:
      return { label: status.toUpperCase(), cls: 'bg-white text-black border-2 border-black' };
  }
}

function getOrderStatusBadge(status) {
  switch (status) {
    case 'paid':
      return { label: 'PAID', cls: 'bg-black text-white border-2 border-black' };
    case 'pending':
      return { label: 'PENDING', cls: 'bg-white text-[#0066FF] border-2 border-[#0066FF]' };
    case 'failed':
      return { label: 'FAILED', cls: 'bg-white text-red-600 border-2 border-red-600' };
    case 'refunded':
      return { label: 'REFUNDED', cls: 'bg-white text-red-600 border-2 border-red-600' };
    default:
      return { label: (status || '—').toUpperCase(), cls: 'bg-white text-black border-2 border-black' };
  }
}

// ── Date formatter ──────────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function fmtMonthYear(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function DeskPage() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('MY PROJECTS');
  const [inquiryConfig, setInquiryConfig] = useState(null);

  // Real data from Supabase
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // ── Auth ───────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
      if (!session) {
        window.location.href = '/';
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        window.location.href = '/';
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Fetch orders for logged-in user ───────────────────────────────
  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchOrders = async () => {
      setOrdersLoading(true);
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .eq('buyer_email', session.user.email)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [session?.user?.email]);

  const handleInquiryRequest = (config) => {
    setInquiryConfig(config);
  };

  // ── Loading state ─────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brutal-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-brutal-black bg-brutal-yellow animate-spin"></div>
          <span className="text-xl font-bold text-brutal-black uppercase tracking-widest font-display">
            LOADING
          </span>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // ── Derived values ────────────────────────────────────────────────
  const email = session.user?.email || '';
  const fullName = session.user?.user_metadata?.full_name || session.user?.user_metadata?.name || 'Developer';
  const role = email.includes('admin') ? 'Administrator' : 'Client Workspace';
  const memberSince = fmtMonthYear(session.user?.created_at);

  // Summary stats (derived from real orders)
  const paidOrders = orders.filter(o => o.status === 'paid');
  const totalSpent = paidOrders.reduce((sum, o) => sum + (Number(o.amount_usd) || 0), 0);
  const invoiceCount = orders.length;

  // Activity feed (derived from real orders + account creation)
  const activityEvents = [
    // Account creation event
    {
      type: 'account',
      label: 'Account created',
      detail: `Workspace registration confirmed for ${email}`,
      date: session.user?.created_at,
      color: 'bg-brutal-green',
    },
    // Order events
    ...orders.map(o => ({
      type: 'order',
      label: `Invoice ORD-${o.id.slice(0, 8).toUpperCase()} created — $${Number(o.amount_usd || 0).toLocaleString()}`,
      detail: `Payment status: ${(o.status || 'unknown').toUpperCase()}`,
      date: o.created_at,
      color: 'bg-brutal-blue',
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const menuItems = [
    'MY PROJECTS',
    'BILLING & ORDERS',
    'MY HISTORY',
    'ACCOUNT SETTINGS',
    'SUPPORT & CONSULTATIONS'
  ];

  return (
    <main className="min-h-screen bg-brutal-bg text-brutal-black font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation / Back to home */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-brutal-black text-xs font-black uppercase shadow-brutal-sm hover:bg-brutal-yellow transition-all"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Card Header */}
        <div className="bg-white border-4 border-brutal-black p-6 sm:p-10 shadow-brutal mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-white bg-brutal-blue px-3 py-1 border-2 border-brutal-black inline-block mb-4 shadow-brutal-sm">
              DEVELOPER WORKSPACE
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-brutal-black uppercase tracking-tight mb-2">
              MY DESK
            </h1>
            <p className="text-sm font-bold text-[#64748B] uppercase">
              MANAGE YOUR PROJECTS, ORDERS, AND ACCOUNT HISTORY.
            </p>
          </div>
          <div className="shrink-0 border-4 border-brutal-black bg-white p-3 shadow-brutal-sm self-start sm:self-center">
            <img src="/logo.jpg" alt="BuildInByte Logo" className="h-14 sm:h-20 w-auto" />
          </div>
        </div>

        {/* ── TOP SUMMARY STRIP ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Total Spent */}
          <div className="editorial-card p-6 bg-white flex flex-col justify-between">
            <span className="font-display text-[10px] font-black uppercase tracking-widest text-white bg-brutal-black px-2 py-1 mb-4 inline-block shadow-brutal-sm self-start">
              Total Spent
            </span>
            <span className="font-display font-black text-4xl sm:text-5xl text-brutal-black block leading-none">
              ${totalSpent.toLocaleString()}
            </span>
            <div className="h-1 bg-brutal-black mt-4" />
            <span className="text-xs text-brutal-black font-bold uppercase mt-4 block pt-2">
              Lifetime paid invoices
            </span>
          </div>

          {/* Invoices */}
          <div className="editorial-card p-6 bg-white flex flex-col justify-between">
            <span className="font-display text-[10px] font-black uppercase tracking-widest text-white bg-brutal-black px-2 py-1 mb-4 inline-block shadow-brutal-sm self-start">
              Invoices
            </span>
            <span className="font-display font-black text-4xl sm:text-5xl text-brutal-black block leading-none">
              {invoiceCount}
            </span>
            <div className="h-1 bg-brutal-black mt-4" />
            <span className="text-xs text-brutal-black font-bold uppercase mt-4 block pt-2">
              Total orders on file
            </span>
          </div>

          {/* Member Since */}
          <div className="editorial-card p-6 bg-white flex flex-col justify-between">
            <span className="font-display text-[10px] font-black uppercase tracking-widest text-white bg-brutal-black px-2 py-1 mb-4 inline-block shadow-brutal-sm self-start">
              Member Since
            </span>
            <span className="font-display font-black text-4xl sm:text-5xl text-brutal-black block leading-none">
              {memberSince}
            </span>
            <div className="h-1 bg-brutal-black mt-4" />
            <span className="text-xs text-brutal-black font-bold uppercase mt-4 block pt-2">
              Account creation date
            </span>
          </div>
        </div>

        {/* ── 2-COLUMN GRID LAYOUT ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sidebar Navigation Menu */}
          <div className="lg:col-span-4 bg-white border-4 border-brutal-black shadow-brutal p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = activeTab === item;
              return (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`w-full text-left px-4 py-3 font-black text-sm uppercase tracking-wide border-2 border-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0066FF] text-white shadow-brutal-sm translate-x-[-2px] translate-y-[-2px]'
                      : 'bg-white text-brutal-black hover:bg-zinc-100'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Tab Content Area */}
          <div className="lg:col-span-8 bg-white border-4 border-brutal-black p-6 sm:p-8 shadow-brutal min-h-[400px]">

            {/* ═══════════════ MY PROJECTS ═══════════════ */}
            {activeTab === 'MY PROJECTS' && (
              <div className="space-y-6">
                <div className="border-b-4 border-black pb-4">
                  <h2 className="font-display font-black text-2xl text-brutal-black uppercase bg-brutal-yellow/30 px-3 py-1 border-l-4 border-brutal-black inline-block">
                    My Projects
                  </h2>
                </div>
                <div className="space-y-4">
                  {STATIC_PROJECTS.map((project) => {
                    const badge = getProjectBadge(project.status);
                    return (
                      <div key={project.id} className="editorial-card p-6 bg-white border-2 border-black shadow-brutal-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-black text-lg uppercase text-brutal-black">{project.name}</h3>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 mt-1 inline-block ${badge.cls}`}>
                              {badge.label}
                            </span>
                          </div>
                          <span className="font-mono text-xs font-bold text-zinc-500">ID: {project.id}</span>
                        </div>
                        <p className="text-xs text-zinc-700 font-bold uppercase mb-5">{project.desc}</p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleInquiryRequest({ title: `Project Update: ${project.name}` })}
                            className="flex-1 text-center px-4 py-2.5 bg-[#0066FF] text-white text-xs font-black uppercase border-2 border-black shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform cursor-pointer"
                          >
                            Request Update
                          </button>
                          <button
                            onClick={() => handleInquiryRequest({ title: `Support: ${project.name}` })}
                            className="flex-1 text-center px-4 py-2.5 bg-white text-black text-xs font-black uppercase border-2 border-black shadow-brutal-sm hover:bg-brutal-yellow transition-colors cursor-pointer"
                          >
                            Message Team
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ═══════════════ BILLING & ORDERS ═══════════════ */}
            {activeTab === 'BILLING & ORDERS' && (
              <div className="space-y-6">
                <div className="border-b-4 border-black pb-4">
                  <h2 className="font-display font-black text-2xl text-brutal-black uppercase bg-brutal-pink/20 px-3 py-1 border-l-4 border-brutal-black inline-block">
                    Billing & Orders
                  </h2>
                </div>

                {ordersLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="w-10 h-10 border-4 border-brutal-black bg-brutal-yellow animate-spin"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="border-2 border-black p-8 text-center bg-zinc-50">
                    <div className="text-3xl mb-3">📄</div>
                    <h3 className="font-black text-sm uppercase text-brutal-black mb-1">No Orders Yet</h3>
                    <p className="text-xs text-zinc-500 font-bold uppercase">
                      Your invoices and payment history will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const badge = getOrderStatusBadge(order.status);
                      const items = order.order_items || [];
                      return (
                        <div key={order.id} className="editorial-card p-6 bg-white border-2 border-black">
                          <div className="flex justify-between items-center border-b-2 border-zinc-200 pb-3 mb-3">
                            <div>
                              <h3 className="font-black text-sm uppercase text-brutal-black">
                                ORD-{order.id.slice(0, 8).toUpperCase()}
                              </h3>
                              <span className="text-xs text-zinc-500 font-bold">{fmtDate(order.created_at)}</span>
                            </div>
                            <span className={`font-black text-[10px] uppercase px-2.5 py-1 ${badge.cls}`}>
                              {badge.label}
                            </span>
                          </div>

                          {/* Line items */}
                          {items.length > 0 && (
                            <div className="space-y-1 mb-3">
                              {items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-xs font-bold uppercase text-zinc-700">
                                  <span>{item.name}</span>
                                  <span className="text-brutal-black">${Number(item.price_usd || 0).toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-2 border-t border-zinc-200">
                            <span className="text-xs font-bold text-zinc-500 uppercase">Total</span>
                            <span className="font-black text-lg text-brutal-black">
                              ${Number(order.amount_usd || 0).toLocaleString()}
                            </span>
                          </div>

                          {order.stripe_payment_id && order.stripe_payment_id !== '—' && (
                            <div className="mt-3 pt-2 border-t border-zinc-200">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">
                                TXN: {order.stripe_payment_id}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ═══════════════ MY HISTORY ═══════════════ */}
            {activeTab === 'MY HISTORY' && (
              <div className="space-y-6">
                <div className="border-b-4 border-black pb-4">
                  <h2 className="font-display font-black text-2xl text-brutal-black uppercase bg-brutal-green/30 px-3 py-1 border-l-4 border-brutal-black inline-block">
                    My History
                  </h2>
                </div>

                {activityEvents.length === 0 ? (
                  <div className="border-2 border-black p-8 text-center bg-zinc-50">
                    <div className="text-3xl mb-3">📋</div>
                    <h3 className="font-black text-sm uppercase text-brutal-black mb-1">No Activity Yet</h3>
                    <p className="text-xs text-zinc-500 font-bold uppercase">
                      Your account events will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="relative border-l-4 border-brutal-black ml-4 pl-6 space-y-8 py-2">
                    {activityEvents.map((event, idx) => (
                      <div key={idx} className="relative">
                        <span className={`absolute -left-[30px] top-0.5 w-3.5 h-3.5 ${event.color} border-2 border-black`}></span>
                        <div className="text-xs font-black text-zinc-400 uppercase">
                          {fmtDate(event.date)}
                        </div>
                        <div className="font-bold text-sm text-brutal-black uppercase mt-1">
                          {event.label}
                        </div>
                        <p className="text-xs text-zinc-500 font-bold uppercase">{event.detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ═══════════════ ACCOUNT SETTINGS ═══════════════ */}
            {activeTab === 'ACCOUNT SETTINGS' && (
              <div className="space-y-6">
                <div className="border-b-4 border-black pb-4">
                  <h2 className="font-display font-black text-2xl text-brutal-black uppercase bg-brutal-yellow/30 px-3 py-1 border-l-4 border-brutal-black inline-block">
                    Account Settings
                  </h2>
                </div>
                <div className="bg-[#F8FAFC] border-2 border-black p-5 text-xs space-y-3.5">
                  <div className="flex justify-between items-center border-b border-[#E4E4E7] pb-2.5">
                    <span className="font-bold text-brutal-black uppercase tracking-wider text-[10px]">Active Session</span>
                    <span className="font-semibold text-zinc-900">{fullName} ({email})</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#E4E4E7] pb-2.5">
                    <span className="font-bold text-brutal-black uppercase tracking-wider text-[10px]">Permission Role</span>
                    <span className="font-semibold text-zinc-900">{role}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-brutal-black uppercase tracking-wider text-[10px]">Security Lock</span>
                    <span className="font-semibold text-zinc-500 italic">Settings locked to local dev environments.</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Account setting updates are restricted for security in pre-production.')}
                  className="btn-secondary w-full py-3 justify-center text-xs cursor-pointer"
                >
                  Manage Multi-Factor Auth
                </button>
              </div>
            )}

            {/* ═══════════════ SUPPORT & CONSULTATIONS ═══════════════ */}
            {activeTab === 'SUPPORT & CONSULTATIONS' && (
              <div className="space-y-6">
                <div className="border-b-4 border-black pb-4">
                  <h2 className="font-display font-black text-2xl text-brutal-black uppercase bg-brutal-pink/20 px-3 py-1 border-l-4 border-brutal-black inline-block">
                    Support &amp; Consultations
                  </h2>
                </div>
                <p className="text-xs text-zinc-700 font-bold uppercase mb-4">
                  Need custom assistance, server access logs, or live architecture review? Reach out directly.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleInquiryRequest({ title: 'Raise a Support Ticket' })}
                    className="editorial-card p-6 bg-brutal-yellow text-left hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span className="text-3xl mb-2 block">🎫</span>
                    <h3 className="font-display font-black text-lg text-brutal-black mb-1 uppercase">Support Ticket</h3>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase">Raise bugs or database issues.</p>
                  </button>

                  <button
                    onClick={() => handleInquiryRequest({ title: 'Book a Technical Scoping Call' })}
                    className="editorial-card p-6 bg-brutal-green text-left hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span className="text-3xl mb-2 block">💬</span>
                    <h3 className="font-display font-black text-lg text-brutal-black mb-1 uppercase">Scoping Call</h3>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase">Schedule a video consultation.</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
      <FloatingContactButton onClick={() => handleInquiryRequest({ title: 'Book a Consultation' })} />

      {inquiryConfig && (
        <InquiryModal
          config={inquiryConfig}
          onClose={() => setInquiryConfig(null)}
        />
      )}
    </main>
  );
}
