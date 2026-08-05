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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  // Handle standard login
  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // Admin Bypass
      if (email === 'admin' && password === 'admin') {
        window.location.href = '/admin';
        return;
      }

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

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
  const passwordsMatch = !isSignUp || (password === confirmPassword);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50 overflow-y-auto p-4 md:p-6">
      <div className="max-w-md w-full bg-white dark:bg-black border-2 border-black dark:border-white p-8 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#FFFFFF] text-center space-y-6 my-auto relative">
        
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white font-bold flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
          >
            ✕
          </button>
        )}
        
        {/* Brand Logo */}
        <div className="flex flex-col items-center gap-3">
          <img 
            src="/logo.jpg" 
            alt="BuildInByte Logo" 
            className="w-16 h-16 rounded-2xl object-cover shadow-md" 
          />
          <div>
            <h1 className="font-display font-bold text-3xl text-black dark:text-white">
              BuildInByte
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#0066FF] font-bold mt-1">
              Custom Software Development & Solutions
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-white dark:bg-black p-1 border-2 border-black dark:border-white">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold transition-all cursor-pointer ${
              !isSignUp 
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm' 
                : 'text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold transition-all cursor-pointer ${
              isSignUp 
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm' 
                : 'text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 text-left">
            ⚠️ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-800 dark:text-emerald-400 text-left">
            ✓ {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleCredentialsSubmit} className="space-y-4 text-left text-xs">
          {isSignUp && (
            <div>
              <label className="block font-bold text-black dark:text-white mb-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Liam Patel"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-black border-2 border-black dark:border-white text-xs text-black dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-black dark:text-white mb-1">Email Address</label>
            <input
              required
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-black border-2 border-black dark:border-white text-xs text-black dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div>
            <label className="block font-bold text-black dark:text-white mb-1">Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-black border-2 border-black dark:border-white text-xs text-black dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          {/* Password Validation Checklist */}
          {isSignUp && password && (
            <div className="p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] space-y-1 font-bold text-black dark:text-white">
              <div className="uppercase tracking-wider text-[9px] text-[#0066FF] mb-1">Password Requirements:</div>
              <div className={hasMinLength ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}>
                {hasMinLength ? '✓' : '✗'} Minimum 8 characters
              </div>
              <div className={hasUppercase ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}>
                {hasUppercase ? '✓' : '✗'} At least one uppercase letter (A-Z)
              </div>
              <div className={hasLowercase ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}>
                {hasLowercase ? '✓' : '✗'} At least one lowercase letter (a-z)
              </div>
              <div className={hasNumber ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}>
                {hasNumber ? '✓' : '✗'} At least one number (0-9)
              </div>
              <div className={hasSpecial ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}>
                {hasSpecial ? '✓' : '✗'} At least one special character
              </div>
            </div>
          )}

          {isSignUp && (
            <div>
              <label className="block font-bold text-black dark:text-white mb-1">Confirm Password</label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-black border-2 border-black dark:border-white text-xs text-black dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          )}

          {isSignUp && confirmPassword && !passwordsMatch && (
            <div className="text-red-500 font-bold text-[10px] uppercase">
              ⚠️ Passwords do not match.
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (isSignUp && (!isPasswordValid || !passwordsMatch))}
            className="w-full btn-primary py-3 justify-center shadow-md font-bold text-xs border-2 border-black dark:border-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : isSignUp ? 'CREATE ACCOUNT WITH EMAIL' : 'SIGN IN WITH EMAIL'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-black dark:border-white"></div>
          </div>
          <span className="relative px-3 bg-white dark:bg-black text-[10px] uppercase font-bold text-black dark:text-white">
            Or Continue With
          </span>
        </div>

        {/* Google OAuth Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full btn-secondary py-3 justify-center text-xs shadow-sm flex items-center gap-3 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer"
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
        <div className="pt-4 border-t-2 border-[#000000] text-[9px] text-[#000000] font-bold flex justify-between items-center">
          <span>Google OAuth & Database Encryption</span>
          <span>BuildInByte © 2026</span>
        </div>

      </div>
    </div>
  );
}
