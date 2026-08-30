'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import LoginCharacters from './LoginCharacters';

export default function LoginScreen({ onClose, message }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Reactive character and password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);

  // Derive character mood
  const getMood = () => {
    if (password.length > 0) {
      if (isPasswordFocused && !showPassword) {
        return 'shy';
      }
      return 'smiling';
    }
    if (isEmailFocused || isNameFocused) {
      return 'watching';
    }
    return 'idle';
  };
  const mood = getMood();

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

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black/60 z-50 overflow-y-auto p-4 md:p-6">
      <div className="glass-panel rounded-xl p-8 md:p-12 relative overflow-hidden border-0 max-w-md w-full">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 border-2 border-white/20 bg-surface/50 dark:bg-surface/50 text-on-surface-variant dark:text-on-surface-variant font-bold flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-pointer select-none"
          >
            ✕
          </button>
        )}

        <div className="relative z-10">
          {/* Brand Logo */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <img
              src="/logo.jpg"
              alt="BuildInByte Logo"
              className="w-12 h-12 rounded-sm"
            />
            <div>
              <h1 className="font-display-lg text-headline-md font-bold text-primary">
                BuildInByte
              </h1>
              <p className="font-label-caps text-label-caps text-primary uppercase bg-primary/10 px-2 py-1 rounded border border-primary/20">
                Custom Software Development & Solutions
              </p>
            </div>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-center md:items-start">
            {/* Left Column: Characters */}
            <div className="flex md:flex-col justify-center items-center gap-4 py-4 md:py-8 w-full select-none">
              <LoginCharacters mood={mood} />
            </div>

            {/* Right Column: Form content */}
            <div className="space-y-6">
              {/* Tab Selector */}
              <div className="flex bg-surface-container-high p-1 border border-outline/20">
                <button
                  onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`flex-1 py-2 text-xs font-black uppercase transition-all ${
                    !isSignUp
                      ? 'bg-primary text-on-primary font-bold'
                      : 'text-on-surface-variant hover:bg-primary/10'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`flex-1 py-2 text-xs font-black uppercase transition-all ${
                    isSignUp
                      ? 'bg-primary text-on-primary font-bold'
                      : 'text-on-surface-variant hover:bg-primary/10'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {message && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mb-4">
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase bg-primary/20 px-2 py-1 rounded border border-primary/20 mb-2 inline-block">
                    {message.split('\n')[0]}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {message.split('\n').slice(1).join(' ')}
                  </p>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-lg mb-4">
                  <p className="font-label-caps text-label-caps text-on-error uppercase bg-error/20 px-2 py-1 rounded border border-error/20 mb-2 inline-block">
                    Error
                  </p>
                  <p className="font-body-md text-body-md text-on-error">
                    {errorMsg}
                  </p>
                </div>
              )}

              {successMsg && (
                <div className="p-4 bg-primary-fixed/10 border border-primary-fixed/20 rounded-lg mb-4">
                  <p className="font-label-caps text-label-caps text-on-primary-fixed uppercase bg-primary-fixed/20 px-2 py-1 rounded border border-primary-fixed/20 mb-2 inline-block">
                    Success
                  </p>
                  <p className="font-body-md text-body-md text-on-primary-fixed">
                    {successMsg}
                  </p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleCredentialsSubmit} className="space-y-6">
                {isSignUp && (
                  <div className="space-y-4">
                    <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Full Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="e.g. Liam Patel"
                      className="w-full bg-[#020617] border-0 border-b border-white/10 text-on-surface font-body-md px-4 py-3 focus:ring-0 transition-colors"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onFocus={() => setIsNameFocused(true)}
                      onBlur={() => setIsNameFocused(false)}
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="name@domain.com"
                    className="w-full bg-[#020617] border-0 border-b border-white/10 text-on-surface font-body-md px-4 py-3 focus:ring-0 transition-colors"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                  />
                </div>

                <div className="space-y-4">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Password</label>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      className="w-full bg-[#020617] border-0 border-b border-white/10 text-on-surface font-body-md px-4 py-3 focus:ring-0 transition-colors pr-12"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded font-label-caps text-label-caps text-on-surface-variant bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded hover:bg-primary-fixed transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="animate-pulse inline-block h-4 w-4 bg-on-primary rounded"></span>
                        <span className="ml-2">Processing...</span>
                      </>
                    ) : isSignUp ? 'Register & Sign In' : 'Sign In with Email'}
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline/20"></div>
                  </div>
                  <span className="relative px-4 font-label-caps text-label-caps text-on-surface-variant uppercase bg-surface-container-high px-2 py-1">
                    Or Continue With
                  </span>
                </div>

                {/* Google OAuth Button */}
                <div>
                  <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full glass-panel border border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-3 py-3"
                  >
                    {/* SVG Google Logo */}
                    <svg className="w-4 h-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="currentColor"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
                    </svg>
                    <span className="ml-3">Sign In with Google</span>
                  </button>
                </div>

                {/* Footnotes */}
                <div className="mt-6 border-t border-outline/20 pt-4 flex justify-between items-center text-xs font-label-caps text-label-caps text-on-surface-variant">
                  <span>Google OAuth & Database Encryption</span>
                  <span>BuildInByte © 2026</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}