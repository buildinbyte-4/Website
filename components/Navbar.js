'use client';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Navbar({ session, onOpenLogin, onOpenProfile, onOpenInquiry }) {
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
          <img 
            src="/logo.jpg" 
            alt="BuildInByte Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform" 
          />
          <div>
            <span className="font-serif font-bold text-2xl tracking-tight text-[#4A0E17]">
              BuildInByte
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#2C1D11]">
          <a href="#projects" className="hover:text-[#800020] transition-colors">
            Our Solutions
          </a>
          <a href="#services" className="hover:text-[#800020] transition-colors">
            Services
          </a>
          <a href="#work" className="hover:text-[#800020] transition-colors">
            Our Work
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {session && (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EFEB] hover:bg-[#E2D7C7] transition-all border border-[#E2D7C7] text-[#2C1D11] text-xs font-semibold cursor-pointer"
            >
              {session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture ? (
                <img
                  src={session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture}
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover border border-[#800020]/30"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#800020] text-[#FDFBF7] flex items-center justify-center font-bold text-[10px]">
                  {(session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <span className="hidden sm:inline">
                {session.user.user_metadata?.full_name?.split(' ')[0] || session.user.user_metadata?.name?.split(' ')[0] || 'Profile'}
              </span>
            </button>
          )}

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
          <button
            onClick={() => onOpenInquiry({ title: 'Book a Consultation' })}
            className="btn-primary text-xs py-2.5 px-4 shadow-sm"
          >
            <span>Book a Consultation</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </header>
  );
}
