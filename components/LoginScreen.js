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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  // Reactive character and password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  // Derive character mood
  const getMood = () => {
    if (password.length > 0) {
      if (isPasswordFocused && !showPassword) {
        return 'shy';
      }
      return 'smiling';
    }
    if (isEmailFocused || isNameFocused || isConfirmPasswordFocused) {
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

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
  const passwordsMatch = !isSignUp || (password === confirmPassword);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50 overflow-y-auto p-4 md:p-6">
      <div className="max-w-2xl w-full bg-white border-2 border-black p-8 shadow-[6px_6px_0px_#000000] text-center space-y-6 my-auto relative">
        
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white border-2 border-black text-black font-bold flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer"
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
            <h1 className="font-display font-bold text-3xl text-black">
              BuildInByte
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#0066FF] font-bold mt-1">
              Custom Software Development & Solutions
            </p>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-center md:items-start text-left mt-6">
          {/* Left Column: Characters */}
          <div className="flex md:flex-col justify-center items-center gap-4 py-4 md:py-8 w-full select-none">
            <LoginCharacters mood={mood} />
          </div>

          {/* Right Column: Form content */}
          <div className="space-y-6">
            {/* Tab Selector */}
            <div className="flex bg-white p-1 border-2 border-black">
              <button
                type="button"
                onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-2 text-xs font-bold transition-all cursor-pointer ${
                  !isSignUp 
                    ? 'bg-black text-white shadow-sm' 
                    : 'text-black hover:bg-zinc-100'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-2 text-xs font-bold transition-all cursor-pointer ${
                  isSignUp 
                    ? 'bg-black text-white shadow-sm' 
                    : 'text-black hover:bg-zinc-100'
                }`}
              >
                Create Account
              </button>
            </div>

            {message && (
              <div className="p-3 bg-brutal-yellow border-2 border-black text-xs font-black text-black text-left uppercase shadow-brutal-sm">
                {message}
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-semibold text-red-600 text-left">
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
                  <label className="block font-bold text-black mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Liam Patel"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onFocus={() => setIsNameFocused(true)}
                    onBlur={() => setIsNameFocused(false)}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-xs text-black placeholder:text-zinc-500 focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-black mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-xs text-black placeholder:text-zinc-500 focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div>
                <label className="block font-bold text-black mb-1">Password</label>
                <div className="relative flex items-center">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-xs text-black placeholder:text-zinc-500 focus:outline-none focus:border-[#0066FF] pr-16"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-[9px] font-black tracking-wider text-black bg-white border-2 border-black hover:bg-black hover:text-white select-none transition-none cursor-pointer"
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              {/* Password Validation Checklist */}
              {isSignUp && password && (
                <div className="p-3 bg-zinc-100 border border-zinc-200 text-[10px] space-y-1 font-bold text-black">
                  <div className="uppercase tracking-wider text-[9px] text-[#0066FF] mb-1">Password Requirements:</div>
                  <div className={hasMinLength ? "text-emerald-600" : "text-red-500"}>
                    {hasMinLength ? '✓' : '✗'} Minimum 8 characters
                  </div>
                  <div className={hasUppercase ? "text-emerald-600" : "text-red-500"}>
                    {hasUppercase ? '✓' : '✗'} At least one uppercase letter (A-Z)
                  </div>
                  <div className={hasLowercase ? "text-emerald-600" : "text-red-500"}>
                    {hasLowercase ? '✓' : '✗'} At least one lowercase letter (a-z)
                  </div>
                  <div className={hasNumber ? "text-emerald-600" : "text-red-500"}>
                    {hasNumber ? '✓' : '✗'} At least one number (0-9)
                  </div>
                  <div className={hasSpecial ? "text-emerald-600" : "text-red-500"}>
                    {hasSpecial ? '✓' : '✗'} At least one special character
                  </div>
                </div>
              )}

              {isSignUp && (
                <div>
                  <label className="block font-bold text-black mb-1">Confirm Password</label>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    onBlur={() => setIsConfirmPasswordFocused(false)}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-xs text-black placeholder:text-zinc-500 focus:outline-none focus:border-[#0066FF]"
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
                className="w-full btn-primary py-3 justify-center shadow-md font-bold text-xs border-2 border-black cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : isSignUp ? 'CREATE ACCOUNT WITH EMAIL' : 'SIGN IN WITH EMAIL'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-black"></div>
              </div>
              <span className="relative px-3 bg-white text-[10px] uppercase font-bold text-black">
                Or Continue With
              </span>
            </div>

            {/* Google OAuth Button */}
            <div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full btn-secondary py-3 justify-center text-xs shadow-sm flex items-center gap-3 bg-white border-2 border-black text-black font-bold hover:bg-black hover:text-white cursor-pointer"
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
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
