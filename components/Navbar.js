'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Navbar({ session, onOpenLogin, onOpenProfile, onOpenDesk, onOpenInquiry }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

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

        {/* Logo and Dark Mode Toggle on Top Left */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <img src="/logo.jpg" alt="BuildInByte Logo" className="h-7 sm:h-9 md:h-10 w-auto" />
            <div>
              <span className="font-display font-black text-lg sm:text-2xl md:text-3xl tracking-tighter text-brutal-black uppercase whitespace-nowrap">
                BuildInByte
              </span>
            </div>
          </Link>

          <button
            onClick={toggleDarkMode}
            className="w-8 h-8 md:w-9 md:h-9 border-2 border-brutal-black bg-white text-brutal-black font-bold flex items-center justify-center rounded-none shadow-brutal-sm hover:bg-brutal-yellow transition-all cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

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
            className="text-xs sm:text-sm font-black uppercase text-white px-2.5 sm:px-4 py-1.5 sm:py-2 border-2 border-black dark:border-white bg-[#0066FF] hover:bg-[#0055EE] cursor-pointer whitespace-nowrap transition-all shadow-brutal-sm"
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
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black dark:border-white flex items-center justify-center bg-white text-black dark:bg-black dark:text-white hover:scale-105 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all shrink-0 cursor-pointer overflow-hidden"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-display font-black text-sm sm:text-base text-black dark:text-white">
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

