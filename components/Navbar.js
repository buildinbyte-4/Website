'use client';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Navbar({ session, onOpenLogin, onOpenInquiry }) {
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#800020]/15 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#800020] text-[#FDFBF7] flex items-center justify-center font-serif text-xl font-bold shadow-md group-hover:bg-[#600018] transition-all">
            B
          </div>
          <div>
            <span className="font-serif font-bold text-2xl tracking-tight text-[#4A0E17]">
              BuildInByte
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#2C1D11]">
          <a href="#projects" className="hover:text-[#800020] transition-colors">
            Available Projects
          </a>
          <a href="#services" className="hover:text-[#800020] transition-colors">
            Custom Services
          </a>
          <a href="#work" className="hover:text-[#800020] transition-colors">
            Our Work
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {session ? (
            <button
              onClick={handleSignOut}
              className="text-xs font-bold text-[#800020] px-3 py-2.5 rounded-lg bg-[#800020]/10 hover:bg-[#800020]/20 transition-all cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="text-xs font-bold text-[#800020] px-3 py-2.5 rounded-lg bg-[#800020]/10 hover:bg-[#800020]/20 transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}
          <a href="#projects" className="btn-primary text-xs py-2.5 px-4 shadow-sm">
            <span>Browse Store</span>
            <span>→</span>
          </a>
        </div>

      </div>
    </header>
  );
}
