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
          <a href="#projects" className="hover:bg-brutal-yellow px-2 py-1 transition-colors border-2 border-transparent hover:border-brutal-black">
            Our Solutions
          </a>
          <Link href="/templates" className="hover:bg-brutal-yellow px-2 py-1 transition-colors border-2 border-transparent hover:border-brutal-black">
            Templates
          </Link>
          <a href="#services" className="hover:bg-brutal-pink px-2 py-1 transition-colors border-2 border-transparent hover:border-brutal-black">
            Services
          </a>
          <a href="#work" className="hover:bg-brutal-green px-2 py-1 transition-colors border-2 border-transparent hover:border-brutal-black">
            Our Work
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {session && (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-brutal-yellow border-2 border-brutal-black text-brutal-black text-xs sm:text-sm font-black uppercase cursor-pointer hover:bg-brutal-pink hover:text-brutal-black transition-colors"
            >
              <span>PROFILE</span>
            </button>
          )}

          {session ? (
            <button
              onClick={handleSignOut}
              className="text-xs sm:text-sm font-black uppercase text-brutal-black px-2.5 sm:px-4 py-1.5 sm:py-2 border-2 border-brutal-black hover:bg-brutal-black hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Log Out
            </button>
          ) : (
             <button
              onClick={onOpenLogin}
              className="text-xs sm:text-sm font-black uppercase text-brutal-black px-2.5 sm:px-4 py-1.5 sm:py-2 border-2 border-brutal-black hover:bg-brutal-black hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Log In
            </button>
          )}
          <button
            onClick={() => onOpenInquiry({ title: 'Book a Consultation' })}
            className="btn-primary text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 whitespace-nowrap"
          >
            <span>Talk to Us</span>
          </button>
        </div>

      </div>
    </header>
  );
}

