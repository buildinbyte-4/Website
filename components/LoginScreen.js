'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginScreen({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Handle standard login
  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isSignUp) {
        // Sign Up Flow
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (error) throw error;

        // If auto-confirm is disabled, tell user to check email
        if (data?.user && !data?.session) {
          setSuccessMsg('Account created! Please check your email for a verification link.');
        } else {
          setSuccessMsg('Account created and signed in successfully!');
        }
      } else {
        // Sign In Flow
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err) {
      console.error('Credentials auth error:', err);
      setErrorMsg(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error('Google OAuth error:', err);
      setErrorMsg(err.message || 'An error occurred during Google Sign-in.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[#1A0E09]/75 backdrop-blur-sm z-50 overflow-y-auto p-4 md:p-6">
      <div className="max-w-md w-full bg-[#FFFDF9] border border-[#800020]/20 p-8 rounded-2xl shadow-2xl text-center space-y-6 my-auto relative">
        
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5EFEB] text-[#2C1D11] font-bold flex items-center justify-center hover:bg-[#800020] hover:text-white transition-all cursor-pointer"
          >
            ✕
          </button>
        )}
        
        {/* Brand Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#800020] text-[#FDFBF7] flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            B
          </div>
          <div>
            <h1 className="font-serif font-bold text-3xl text-[#4A0E17]">
              BuildInByte
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#800020] font-bold mt-1">
              Student Project Store & Solutions
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#F5EFEB] p-1 rounded-xl border border-[#E2D7C7]">
          <button
            onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              !isSignUp 
                ? 'bg-[#FFFDF9] text-[#4A0E17] shadow-sm' 
                : 'text-[#8C7B6E] hover:text-[#2C1D11]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              isSignUp 
                ? 'bg-[#FFFDF9] text-[#4A0E17] shadow-sm' 
                : 'text-[#8C7B6E] hover:text-[#2C1D11]'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-[#800020]/10 border border-[#800020]/30 rounded-xl text-xs font-semibold text-[#800020] text-left">
            ⚠️ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-800 text-left">
            ✓ {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleCredentialsSubmit} className="space-y-4 text-left text-xs">
          {isSignUp && (
            <div>
              <label className="block font-bold text-[#2C1D11] mb-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Liam Patel"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EBE1] border border-[#E2D7C7] text-xs text-[#2C1D11] focus:outline-none focus:border-[#800020]"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-[#2C1D11] mb-1">Email Address</label>
            <input
              required
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EBE1] border border-[#E2D7C7] text-xs text-[#2C1D11] focus:outline-none focus:border-[#800020]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2C1D11] mb-1">Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EBE1] border border-[#E2D7C7] text-xs text-[#2C1D11] focus:outline-none focus:border-[#800020]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 justify-center shadow-md font-bold text-xs"
          >
            {loading ? 'Please wait...' : isSignUp ? 'Register & Sign In' : 'Sign In with Email'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#800020]/15"></div>
          </div>
          <span className="relative px-3 bg-[#FFFDF9] text-[10px] uppercase font-bold text-[#8C7B6E]">
            Or Continue With
          </span>
        </div>

        {/* Google OAuth Button */}
        <div>
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full btn-secondary py-3 justify-center text-xs shadow-sm flex items-center gap-3 bg-[#FFFDF9] hover:bg-[#F5EFEB] border border-[#800020]/20 text-[#2C1D11] font-bold"
          >
            {/* SVG Google Logo */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Sign In with Google</span>
          </button>
        </div>

        {/* Footnotes */}
        <div className="pt-4 border-t border-[#800020]/10 text-[9px] text-[#8C7B6E] flex justify-between items-center">
          <span>Google OAuth & Database Encryption</span>
          <span>BuildInByte © 2026</span>
        </div>

      </div>
    </div>
  );
}
