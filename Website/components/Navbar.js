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
    <header className={`sticky top-0 z-50 bg-surface/50 dark:bg-surface/50 backdrop-blur-xl border-b border-white/10 transition-none ${isScrolled ? 'border-b-[3px] border-solid' : 'border-b border-solid'}`}>
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img alt="BuildInByte Logo" class="w-10 h-10 rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMjLBoDO1r2vvTHvU_16-88X4EBjb5U8CIyUNsRziKNuYbEeeNfKFGcjnVnZeuESuB_tNlEEeBIiEWLyPF2I5TjvF4cyXKXqV1q6TC2NzAP1hFx4gPpjt8Ou-UBjOnFLeDTUiHV8Nvy4mniPaFSSZqDRQTbsqCDRXeJcHee2v_YQiXmC8uJNPjpejAcdLwaRvIM9fkkwa9GXCeauFNbGcSg5R3zJX89Qdb7pWJxdhXOT1NlLwmwgGVh5ae5MkAJ9TlUfhMH5UYyzM"/>
          <span class="font-display-lg text-headline-md font-bold text-primary tracking-tight">BuildInByte</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors py-2" href="#solutions">Solutions</a>
          <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors py-2" href="#showcase">Showcase</a>
          <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors py-2" href="#process">Process</a>
          <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors py-2" href="#contact">Contact</a>
        </div>

        {/* Trailing Action */}
        <div className="hidden md:flex">
          {session && (
            <button
              onClick={onOpenProfile}
              className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 rounded hover:bg-primary-fixed transition-all duration-300 uppercase tracking-widest flex items-center gap-2"
            >
              PROFILE <span class="material-symbols-outlined">person</span>
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
            className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 rounded hover:bg-primary-fixed transition-all duration-300 uppercase tracking-widest flex items-center gap-2"
          >
            Let's Build <span class="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>arrow_forward</span>
          </button>
        </div>

        {/* Mobile Menu Toggle (Decorative for this scope) */}
        <button className="md:hidden text-primary">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}