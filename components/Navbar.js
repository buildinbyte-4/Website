'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Navbar({ session, onOpenLogin, onOpenProfile, onOpenDesk, onOpenInquiry }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
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
    <header className={`sticky top-0 z-50 bg-white dark:bg-black px-3 sm:px-6 py-3 w-full border-black dark:border-white transition-none ${isScrolled ? 'border-b-[3px]' : 'border-b'}`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full gap-2 sm:gap-4">

        {/* Logo on Top Left */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <img src="/logo.jpg" alt="BuildInByte Logo" className="h-7 sm:h-9 md:h-10 w-auto" />
            <div>
              <span className="font-display font-black text-lg sm:text-2xl md:text-3xl tracking-tighter text-brutal-black uppercase whitespace-nowrap">
                BuildInByte
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-base lg:text-lg font-black text-brutal-black uppercase font-display">
          <a href="#enterprise-solutions" className="px-1 pb-1 border-b-4 border-transparent hover:border-brutal-black transition-none duration-0">
            Our Solutions
          </a>
          <a href="#case-studies" className="px-1 pb-1 border-b-4 border-transparent hover:border-brutal-black transition-none duration-0">
            Templates
          </a>
          <a href="#services-offered" className="px-1 pb-1 border-b-4 border-transparent hover:border-brutal-black transition-none duration-0">
            Services
          </a>
          {session && (
            <Link
              href="/desk"
              className="px-1 pb-1 border-b-4 border-transparent hover:border-brutal-black transition-none duration-0 font-black uppercase text-base lg:text-lg font-display cursor-pointer bg-transparent"
            >
              My Desk
            </Link>
          )}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {session ? (
            <button
              onClick={() => setShowLogoutConfirm(true)}
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

      {showLogoutConfirm && (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50 p-4">
          <div className="max-w-md w-full bg-white dark:bg-black border-2 border-black dark:border-white p-8 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#FFFFFF] text-center space-y-6">
            <h2 className="font-display font-black text-2xl text-black dark:text-white uppercase">
              CONFIRM LOGOUT
            </h2>
            <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase leading-snug">
              Are you sure you want to log out of your session?
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="btn-secondary py-3 justify-center text-xs border-2 border-black dark:border-white cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={async () => {
                  setShowLogoutConfirm(false);
                  await handleSignOut();
                  window.location.href = '/';
                }}
                className="btn-primary py-3 justify-center text-xs text-white font-bold border-2 border-black dark:border-white shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#FFFFFF] cursor-pointer"
                style={{ backgroundColor: '#DC2626' }}
              >
                YES, LOG OUT
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

