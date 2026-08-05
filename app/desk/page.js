'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import FloatingContactButton from '@/components/FloatingContactButton';
import InquiryModal from '@/components/InquiryModal';

export default function DeskPage() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('MY PROJECTS');
  const [inquiryConfig, setInquiryConfig] = useState(null);

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

  const handleInquiryRequest = (config) => {
    setInquiryConfig(config);
  };

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

  const email = session.user?.email || '';
  const fullName = session.user?.user_metadata?.full_name || session.user?.user_metadata?.name || 'Developer';
  const role = email.includes('admin') ? 'Administrator' : 'Client Workspace';

  const menuItems = [
    'MY PROJECTS',
    'MY ORDERS',
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

        {/* 2-Column Grid Layout */}
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
            {activeTab === 'MY PROJECTS' && (
              <div className="space-y-6">
                <div className="border-b-4 border-black pb-4">
                  <h2 className="font-display font-black text-2xl text-brutal-black uppercase bg-brutal-yellow/30 px-3 py-1 border-l-4 border-brutal-black inline-block">
                    My Projects
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="editorial-card p-6 bg-brutal-yellow/10 border-2 border-black shadow-brutal-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-black text-lg uppercase text-brutal-black">BuildInByte Custom SaaS</h3>
                        <span className="text-[10px] font-black uppercase bg-brutal-green text-brutal-black px-2 py-0.5 border border-black rounded mt-1 inline-block">
                          Active
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-zinc-500">ID: BIB-4982</span>
                    </div>
                    <p className="text-xs text-zinc-700 font-bold uppercase mb-4">Main corporate codebase and API services deployment.</p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-bold">
                      <div className="bg-white border-2 border-black p-3 text-center">
                        <span className="block text-[10px] text-zinc-400">STATUS</span>
                        <span className="text-brutal-green font-black">99.9% UPTIME</span>
                      </div>
                      <div className="bg-white border-2 border-black p-3 text-center">
                        <span className="block text-[10px] text-zinc-400">LATENCY</span>
                        <span className="text-brutal-blue font-black">12MS avg</span>
                      </div>
                    </div>
                  </div>

                  <div className="editorial-card p-6 bg-brutal-pink/10 border-2 border-black shadow-brutal-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-black text-lg uppercase text-brutal-black">API Documentation</h3>
                        <span className="text-[10px] font-black uppercase bg-brutal-yellow text-brutal-black px-2 py-0.5 border border-black rounded mt-1 inline-block">
                          In Scoping
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-zinc-500">ID: BIB-7712</span>
                    </div>
                    <p className="text-xs text-zinc-700 font-bold uppercase mb-4">Internal developer guides and integration protocols.</p>
                    <Link href="/" className="btn-secondary py-2 justify-center text-xs text-center w-full block bg-white border-2 border-black">
                      Browse Templates Catalog
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'MY ORDERS' && (
              <div className="space-y-6">
                <div className="border-b-4 border-black pb-4">
                  <h2 className="font-display font-black text-2xl text-brutal-black uppercase bg-brutal-pink/20 px-3 py-1 border-l-4 border-brutal-black inline-block">
                    My Orders
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="editorial-card p-6 bg-white border-2 border-black">
                    <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3 mb-3">
                      <div>
                        <h3 className="font-black text-sm uppercase text-brutal-black">Invoice #BIB-2026-001</h3>
                        <span className="text-xs text-zinc-500 font-bold">Aug 5, 2026</span>
                      </div>
                      <span className="font-black text-sm text-brutal-green bg-green-50 border border-green-200 px-2 py-0.5">PAID</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase text-zinc-700">
                      <span>Custom API Integration Plan</span>
                      <span className="text-brutal-black">$499.00</span>
                    </div>
                  </div>

                  <div className="editorial-card p-6 bg-white border-2 border-black">
                    <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3 mb-3">
                      <div>
                        <h3 className="font-black text-sm uppercase text-brutal-black">Inquiry #BIB-REQ-889</h3>
                        <span className="text-xs text-zinc-500 font-bold">Aug 5, 2026</span>
                      </div>
                      <span className="font-black text-sm text-brutal-blue bg-blue-50 border border-blue-200 px-2 py-0.5">PENDING REVIEW</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase text-zinc-700">
                      <span>Technical Scoping Consultation</span>
                      <span className="text-brutal-black">Quote Requested</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'MY HISTORY' && (
              <div className="space-y-6">
                <div className="border-b-4 border-black pb-4">
                  <h2 className="font-display font-black text-2xl text-brutal-black uppercase bg-brutal-green/30 px-3 py-1 border-l-4 border-brutal-black inline-block">
                    My History
                  </h2>
                </div>
                <div className="relative border-l-4 border-brutal-black ml-4 pl-6 space-y-8 py-2">
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 w-3.5 h-3.5 bg-brutal-green border-2 border-black rounded-full"></span>
                    <div className="text-xs font-black text-zinc-400 uppercase">Aug 5, 2026 at 20:30</div>
                    <div className="font-bold text-sm text-brutal-black uppercase mt-1">Authorized Profile Verification</div>
                    <p className="text-xs text-zinc-500 font-bold uppercase">Updated contact phone number and preset avatar preferences.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 w-3.5 h-3.5 bg-brutal-blue border-2 border-black rounded-full"></span>
                    <div className="text-xs font-black text-zinc-400 uppercase">Aug 5, 2026 at 19:40</div>
                    <div className="font-bold text-sm text-brutal-black uppercase mt-1">Google OAuth Session Initiated</div>
                    <p className="text-xs text-zinc-500 font-bold uppercase">Logged in from browser callback callback.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 w-3.5 h-3.5 bg-brutal-yellow border-2 border-black rounded-full"></span>
                    <div className="text-xs font-black text-zinc-400 uppercase">Aug 5, 2026 at 15:30</div>
                    <div className="font-bold text-sm text-brutal-black uppercase mt-1">Account Created</div>
                    <p className="text-xs text-zinc-500 font-bold uppercase">Workspace registration confirmed.</p>
                  </div>
                </div>
              </div>
            )}

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
