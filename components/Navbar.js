'use client';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Navbar({ session, onOpenLogin, onOpenProfile, onOpenDesk, onOpenInquiry }) {
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black px-3 sm:px-6 py-3 w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full gap-2 sm:gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <img src="/logo.jpg" alt="BuildInByte Logo" className="h-7 sm:h-9 md:h-10 w-auto" />
          <div>
            <span className="font-display font-black text-lg sm:text-2xl md:text-3xl tracking-tighter text-brutal-black uppercase whitespace-nowrap">
              BuildInByte
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-base lg:text-lg font-black text-brutal-black uppercase font-display">
          <a href="#enterprise-solutions" className="hover:bg-brutal-yellow px-2 py-1 transition-colors border-2 border-transparent hover:border-brutal-black">
            Our Solutions
          </a>
          <a href="#case-studies" className="hover:bg-brutal-yellow px-2 py-1 transition-colors border-2 border-transparent hover:border-brutal-black">
            Templates
          </a>
          <a href="#services-offered" className="hover:bg-brutal-pink px-2 py-1 transition-colors border-2 border-transparent hover:border-brutal-black">
            Services
          </a>
          {session && (
            <Link
              href="/desk"
              className="hover:bg-brutal-green px-2 py-1 transition-colors border-2 border-transparent hover:border-brutal-black font-black uppercase text-base lg:text-lg font-display cursor-pointer bg-transparent"
            >
              My Desk
            </Link>
          )}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {session ? (
            <button
              onClick={handleSignOut}
              className="text-xs sm:text-sm font-black uppercase text-brutal-black px-2.5 sm:px-4 py-1.5 sm:py-2 border-2 border-brutal-black cursor-pointer whitespace-nowrap"
            >
              Log Out
            </button>
          ) : (
             <button
              onClick={onOpenLogin}
              className="text-xs sm:text-sm font-black uppercase text-brutal-black px-2.5 sm:px-4 py-1.5 sm:py-2 border-2 border-brutal-black cursor-pointer whitespace-nowrap"
            >
              Log In
            </button>
          )}
          <button
            onClick={() => onOpenInquiry({ title: 'Book a Consultation' })}
            className="text-xs sm:text-sm font-black uppercase text-white px-2.5 sm:px-4 py-1.5 sm:py-2 border-2 border-black cursor-pointer whitespace-nowrap"
            style={{ backgroundColor: 'var(--brutal-blue)' }}
          >
            Talk to Us
          </button>

          {session && (() => {
            const avatarUrl = session?.user?.user_metadata?.avatar_url || session?.user?.user_metadata?.picture || session?.user?.user_metadata?.avatarUrl || '';
            const email = session?.user?.email || '';
            const fullName = session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name || '';
            const initial = (fullName || email || 'U').charAt(0).toUpperCase();

            return (
              <button
                onClick={onOpenProfile}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black flex items-center justify-center bg-brutal-yellow hover:scale-105 hover:bg-brutal-pink transition-all shrink-0 cursor-pointer overflow-hidden"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-display font-black text-sm sm:text-base text-brutal-black">
                    {initial}
                  </span>
                )}
              </button>
            );
          })()}
        </div>

      </div>
    </header>
  );
}

