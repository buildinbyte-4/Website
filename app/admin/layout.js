'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, MessageSquareWarning, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleExitAdmin = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Admin logout failed:', err);
    }
    window.location.href = '/';
  };

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Support', href: '/admin/support', icon: MessageSquareWarning },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col md:flex-row font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-200 bg-white sticky top-0 z-50">
        <div className="font-semibold text-lg tracking-tight text-zinc-900">BuildInByte Admin</div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md text-zinc-500 hover:bg-zinc-100 transition-colors"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar (Desktop) & Mobile Dropdown */}
      <aside className={`
        ${mobileMenuOpen ? 'block' : 'hidden'} 
        md:flex w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-zinc-200 flex-col fixed md:sticky top-[61px] md:top-0 h-[calc(100vh-61px)] md:h-screen z-40
      `}>
        <div className="p-6 hidden md:block border-b border-zinc-100">
          <Link href="/admin" className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
            <h1 className="font-semibold text-xl tracking-tight text-zinc-900">BuildInByte</h1>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Admin Dashboard</p>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                  }
                `}
              >
                <Icon size={18} className={isActive ? 'text-blue-600' : 'text-zinc-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-100 mt-auto">
          <button
            onClick={handleExitAdmin}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-zinc-600 font-medium text-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <LogOut size={18} className="text-zinc-400" />
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 lg:p-10 overflow-x-hidden min-h-screen">
        {children}
      </main>
    </div>
  );
}
