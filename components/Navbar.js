'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Navbar({ session, onOpenLogin, onOpenProfile, onOpenDesk, onOpenInquiry }) {
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
    try {
      await supabase.auth.signOut();
      setShowLogoutConfirm(false);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#0b1326]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo & Status Dot */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#06b6d4] to-[#8b5cf6] p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b1326] rounded-[7px] flex items-center justify-center font-mono font-bold text-lg text-[#4cd7f6]">
                B
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-[#dae2fd] group-hover:text-[#4cd7f6] transition-colors">
                BuildInByte
              </span>
              <span className="font-mono text-[10px] text-[#06b6d4] tracking-widest uppercase -mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse"></span>
                Engineering
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#bcc9cd]">
          <a
            href="#capabilities"
            className="hover:text-[#4cd7f6] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#06b6d4] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Capabilities
          </a>
          <a
            href="#products"
            className="hover:text-[#4cd7f6] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#06b6d4] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Products & Templates
          </a>
          <a
            href="#services"
            className="hover:text-[#4cd7f6] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#06b6d4] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Services
          </a>
          {session && (
            <Link
              href="/desk"
              className="text-[#c4abff] hover:text-white font-mono text-xs tracking-wider uppercase px-2.5 py-1 rounded bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 hover:border-[#8b5cf6] transition-all"
            >
              My Desk →
            </Link>
          )}
        </nav>

        {/* Action CTAs & Auth */}
        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="hidden sm:block btn-ghost-cyan text-xs font-mono px-3 py-2 rounded-lg uppercase tracking-wider"
              >
                Log Out
              </button>
              
              {/* User Avatar */}
              {(() => {
                const avatarUrl = session?.user?.user_metadata?.avatar_url || session?.user?.user_metadata?.picture || session?.user?.user_metadata?.avatarUrl || '';
                const email = session?.user?.email || '';
                const fullName = session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name || '';
                const initial = (fullName || email || 'U').charAt(0).toUpperCase();

                return (
                  <button
                    onClick={onOpenProfile}
                    className="w-9 h-9 rounded-full border border-[#06b6d4]/50 p-[2px] bg-[#171f33] hover:border-[#06b6d4] transition-all overflow-hidden flex items-center justify-center text-xs font-mono font-bold text-[#4cd7f6]"
                  >
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      initial
                    )}
                  </button>
                );
              })()}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="btn-ghost-cyan text-xs font-mono px-4 py-2 rounded-lg uppercase tracking-wider"
            >
              Log In
            </button>
          )}

          <button
            onClick={() => onOpenInquiry({ title: 'Book a Technical Consultation' })}
            className="btn-cyan text-xs px-4 py-2 rounded-lg flex items-center gap-2 tracking-wide font-semibold shadow-lg shadow-cyan-500/20"
          >
            <span>Book Consultation</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#171f33] text-[#dae2fd] border border-white/10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-6 py-6 mt-2 space-y-4 animate-in slide-in-from-top">
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#dae2fd] hover:text-[#4cd7f6]"
          >
            Capabilities
          </a>
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#dae2fd] hover:text-[#4cd7f6]"
          >
            Products & Templates
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#dae2fd] hover:text-[#4cd7f6]"
          >
            Services
          </a>
          {session && (
            <Link
              href="/desk"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-mono uppercase text-[#c4abff]"
            >
              My Desk →
            </Link>
          )}
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel p-6 rounded-2xl max-w-sm w-full space-y-4 border border-white/10 shadow-2xl">
            <h3 className="text-lg font-display font-bold text-[#dae2fd]">Confirm Log Out</h3>
            <p className="text-sm text-[#bcc9cd]">Are you sure you want to sign out of BuildInByte?</p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-xs font-mono rounded-lg border border-white/10 text-[#dae2fd] hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-xs font-mono rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
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

