'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const NAV_LINKS = [
  { href: '/#capabilities', label: 'Capabilities' },
  { href: '/#process', label: 'Process' },
  { href: '/#products', label: 'Work' },
  { href: '/templates', label: 'Templates' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar({ session, onOpenLogin, onOpenProfile, onOpenInquiry }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    if (!supabase) return;

    try {
      await supabase.auth.signOut();
      setShowLogoutConfirm(false);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-atelier ease-atelier ${
        isScrolled
          ? 'py-3 bg-canvas/90 backdrop-blur-md border-b border-line shadow-[var(--shadow-header)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="page-wrap flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-ink flex items-center justify-center font-display font-semibold text-sm text-ink">
            B
          </div>
          <span className="font-display font-semibold text-lg tracking-tight text-ink group-hover:text-accent transition-colors duration-atelier">
            BuildInByte
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          {session && (
            <Link href="/desk" className="nav-link">
              My Desk
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="hidden sm:inline-flex btn-ghost text-xs px-3 py-2"
              >
                Log out
              </button>
              {(() => {
                const avatarUrl = session?.user?.user_metadata?.avatar_url || session?.user?.user_metadata?.picture || session?.user?.user_metadata?.avatarUrl || '';
                const email = session?.user?.email || '';
                const fullName = session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name || '';
                const initial = (fullName || email || 'U').charAt(0).toUpperCase();

                return (
                  <button
                    onClick={onOpenProfile}
                    className="w-9 h-9 rounded-sm border border-line overflow-hidden flex items-center justify-center text-xs font-display font-semibold text-ink bg-surface hover:border-accent transition-colors duration-atelier"
                  >
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
                    ) : (
                      initial
                    )}
                  </button>
                );
              })()}
            </div>
          ) : onOpenLogin ? (
            <button
              onClick={onOpenLogin}
              className="btn-ghost text-xs px-4 py-2"
            >
              Log in
            </button>
          ) : (
            <Link href="/contact" className="btn-ghost text-xs px-4 py-2">
              Get in touch
            </Link>
          )}

          <button
            onClick={() => onOpenInquiry?.({ title: 'Book a Technical Consultation' })}
            className="btn-primary text-xs px-4 py-2 hidden sm:inline-flex"
          >
            Start a project
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 border border-line text-ink bg-surface"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-canvas px-6 py-6 mt-3 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-ink hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          {session && (
            <Link
              href="/desk"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-ink hover:text-accent"
            >
              My Desk
            </Link>
          )}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry?.({ title: 'Book a Technical Consultation' });
            }}
            className="btn-primary w-full text-xs py-2.5 sm:hidden"
          >
            Start a project
          </button>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40">
          <div className="bg-surface p-6 max-w-sm w-full space-y-4 border border-line">
            <h3 className="text-lg font-display font-semibold text-ink">Confirm log out</h3>
            <p className="text-sm text-muted">Are you sure you want to sign out of BuildInByte?</p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="btn-ghost text-xs px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-xs font-medium border border-danger text-danger hover:bg-danger hover:text-on-accent transition-colors duration-atelier"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
