'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const navigation = [
  ['Solutions', '/#case-studies'],
  ['Templates', '/templates'],
  ['Services', '/#services'],
  ['About', '/about'],
];

export default function Navbar({ session, onOpenLogin, onOpenProfile, onOpenInquiry }) {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const themeTransitioning = useRef(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (themeTransitioning.current) return;
    const nextDark = !document.documentElement.classList.contains('dark');
    const applyTheme = () => {
      document.documentElement.classList.toggle('dark', nextDark);
      document.documentElement.style.colorScheme = nextDark ? 'dark' : 'light';
      setIsDark(nextDark);
      try { localStorage.setItem('theme', nextDark ? 'dark' : 'light'); } catch {}
    };
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme();
      return;
    }

    themeTransitioning.current = true;
    document.documentElement.classList.add('theme-transitioning');
    const transition = document.startViewTransition(applyTheme);
    transition.finished.finally(() => {
      document.documentElement.classList.remove('theme-transitioning');
      themeTransitioning.current = false;
    });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    if (supabase) await supabase.auth.signOut();
    window.location.href = '/';
  };

  const avatarUrl = session?.user?.user_metadata?.avatar_url || session?.user?.user_metadata?.picture || '';
  const identity = session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name || session?.user?.email || 'User';

  return (
    <header className={`sticky top-0 z-50 border-b border-slate-200/80 dark:border-white/10 transition-colors ${isScrolled ? 'bg-white/95 dark:bg-canvas/95 shadow-sm backdrop-blur-xl' : 'bg-white/85 dark:bg-canvas/85 backdrop-blur-md'}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none">
          <img src="/brand-logo.png" alt="" className="h-9 w-9 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-white/10" />
          <span className="font-display text-base sm:text-xl font-semibold tracking-tight text-slate-950 dark:text-foreground">BuildInByte</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navigation.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white">
              {label}
            </Link>
          ))}
          {session && <Link href="/desk" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white">My Desk</Link>}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleTheme} aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-surface-dark text-foreground hover:bg-accent-soft">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button type="button" onClick={session ? () => setShowLogoutConfirm(true) : onOpenLogin} className="hidden min-h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 sm:inline-flex sm:items-center dark:border-white/10 dark:bg-bg-surface-dark dark:text-zinc-100 dark:hover:bg-slate-800">
            {session ? 'Log out' : 'Log in'}
          </button>
          {onOpenInquiry ? (
            <button type="button" onClick={() => onOpenInquiry({ title: 'Book a consultation' })} className="inline-flex min-h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-brand-400">Talk to us</button>
          ) : (
            <Link href="/contact" className="inline-flex min-h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-brand-400">Talk to us</Link>
          )}
          {session && (
            <button type="button" onClick={onOpenProfile} aria-label="Open profile" className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700 hover:ring-2 hover:ring-brand-200 dark:border-white/10 dark:bg-zinc-800 dark:text-foreground">
              {avatarUrl ? <img src={avatarUrl} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" /> : identity.charAt(0).toUpperCase()}
            </button>
          )}
          <button type="button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(open => !open)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden dark:border-white/10 dark:bg-bg-surface-dark dark:text-foreground">
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav aria-label="Mobile navigation" className="mx-4 mb-4 grid gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-lg md:hidden dark:border-white/10 dark:bg-bg-surface-dark">
          {[...navigation, ['FAQ', '/faq'], ['Contact', '/contact']].map(([label, href]) => (
            <Link key={href} href={href} onClick={(event) => { event.preventDefault(); setMobileOpen(false); router.push(href); }} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-zinc-100 dark:hover:bg-white/5">{label}</Link>
          ))}
          <button type="button" onClick={() => { setMobileOpen(false); session ? setShowLogoutConfirm(true) : onOpenLogin?.(); }} className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 sm:hidden dark:text-zinc-100 dark:hover:bg-white/5">{session ? 'Log out' : 'Log in'}</button>
        </nav>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm" onMouseDown={event => event.target === event.currentTarget && setShowLogoutConfirm(false)}>
          <div role="alertdialog" aria-modal="true" aria-labelledby="logout-title" className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-bg-surface-dark">
            <h2 id="logout-title" className="font-display text-xl font-semibold text-slate-950 dark:text-foreground">Log out?</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-300">You’ll need to sign in again to access your workspace.</p>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setShowLogoutConfirm(false)} className="btn-secondary">Cancel</button>
              <button type="button" onClick={handleSignOut} className="inline-flex min-h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700">Log out</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
