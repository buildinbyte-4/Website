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
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#ffffff', borderBottom: '4px solid #000000', padding: '1rem 1.5rem', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '80rem', margin: '0 auto', width: '100%' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="group">
          <img src="/logo.jpg" alt="BuildInByte Logo" className="h-10 w-auto" />
          <div>
            <span className="font-display font-black text-3xl tracking-tighter text-brutal-black uppercase">
              BuildInByte
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-black text-brutal-black uppercase font-display">
          <a href="#projects" className="hover:bg-brutal-yellow px-2 py-1 transition-colors border-2 border-transparent hover:border-brutal-black">
            Our Solutions
          </a>
          <Link href="/templates" className="bg-brutal-yellow border-2 border-brutal-black px-3 py-1 shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            Templates
          </Link>
          <a href="#services" className="hover:bg-brutal-pink px-2 py-1 transition-colors border-2 border-transparent hover:border-brutal-black hover:text-white">
            Services
          </a>
          <a href="#work" className="hover:bg-brutal-green px-2 py-1 transition-colors border-2 border-transparent hover:border-brutal-black">
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
