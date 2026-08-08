'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Navbar({ session, onOpenLogin, onOpenProfile, onOpenInquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-black px-3 sm:px-6 py-3 w-full border-black dark:border-white transition-none ${isScrolled ? 'border-b-[3px] border-solid' : 'border-b border-solid'}`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full gap-2 sm:gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img src="/logo.jpg" alt="BuildInByte Logo" className="h-10 w-auto" />
          <div>
            <span className="font-display font-black text-3xl tracking-tighter text-brutal-black uppercase">
              BuildInByte
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-black text-brutal-black uppercase font-display">
          <a href="#projects" className="px-1 pb-1 border-b-4 border-transparent hover:border-brutal-black transition-none duration-0">
            Our Solutions
          </a>
          <Link href="/templates" className="px-1 pb-1 border-b-4 border-transparent hover:border-brutal-black transition-none duration-0">
            Templates
          </Link>
          <a href="#services" className="px-1 pb-1 border-b-4 border-transparent hover:border-brutal-black transition-none duration-0">
            Services
          </a>
          <a href="#work" className="px-1 pb-1 border-b-4 border-transparent hover:border-brutal-black transition-none duration-0">
            Our Work
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          {session && (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-3 py-1.5 bg-brutal-yellow border-2 border-brutal-black text-brutal-black text-sm font-black uppercase cursor-pointer hover:bg-brutal-pink hover:text-white transition-colors"
            >
              <span>PROFILE</span>
            </button>
          )}

          {session ? (
            <button
              onClick={handleSignOut}
              className="text-sm font-black uppercase text-brutal-black px-4 py-2 border-2 border-brutal-black hover:bg-brutal-black hover:text-white transition-colors cursor-pointer"
            >
              Log Out
            </button>
          ) : (
             <button
              onClick={onOpenLogin}
              className="text-sm font-black uppercase text-brutal-black px-4 py-2 border-2 border-brutal-black hover:bg-brutal-black hover:text-white transition-colors cursor-pointer"
            >
              Log In
            </button>
          )}
          <button
            onClick={() => onOpenInquiry({ title: 'Book a Consultation' })}
            className="btn-primary"
          >
            <span>Talk to Us</span>
          </button>
        </div>

      </div>
    </header>
  );
}
