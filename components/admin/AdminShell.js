'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inbox, LayoutDashboard, LogOut, Menu, MessageSquareWarning, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const NAV_ITEMS = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Support', href: '/admin/support', icon: MessageSquareWarning },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (!supabase || signingOut) return;
    setSigningOut(true);
    await supabase.auth.signOut();
    window.location.replace('/');
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col md:flex-row font-sans selection:bg-brand-100 selection:text-brand-900">
      <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-200 bg-white sticky top-0 z-50">
        <div className="font-semibold text-lg tracking-tight text-zinc-900">BuildInByte Admin</div>
        <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? 'Close admin navigation' : 'Open admin navigation'} aria-expanded={mobileMenuOpen} className="p-2 rounded-md text-zinc-500 hover:bg-zinc-100 transition-colors">
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-zinc-200 flex-col fixed md:sticky top-[61px] md:top-0 h-[calc(100vh-61px)] md:h-screen z-40`}>
        <div className="p-6 hidden md:block border-b border-zinc-100">
          <Link href="/admin" className="block focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-md">
            <h1 className="font-semibold text-xl tracking-tight text-zinc-900">BuildInByte</h1>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Admin Dashboard</p>
          </Link>
        </div>

        <nav aria-label="Admin navigation" className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} aria-current={isActive ? 'page' : undefined} className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 ${isActive ? 'bg-brand-50 text-brand-700' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'}`}>
                <Icon size={18} className={isActive ? 'text-brand-600' : 'text-zinc-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-100 mt-auto space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-600 font-medium text-sm hover:bg-zinc-100 hover:text-zinc-900">Back to website</Link>
          <button type="button" onClick={handleSignOut} disabled={signingOut} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-zinc-600 font-medium text-sm hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-50">
            <LogOut size={18} className="text-zinc-400" />
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </aside>

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 lg:p-10 overflow-x-hidden min-h-screen">{children}</main>
    </div>
  );
}
