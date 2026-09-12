'use client';

import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import LoginCharacters from './LoginCharacters';

const INPUT_CLASS = 'w-full rounded-none border-0 border-b border-[#dedbe3] bg-transparent px-0 py-3 text-base text-[#111217] placeholder:text-[#9a96a1] focus:border-[#6f35f5] focus:outline-none focus:ring-0 dark:border-white/15 dark:text-[#f8f7f4] dark:placeholder:text-[#6f6b75] dark:focus:border-[#8b5cf6]';

export default function LoginScreen({ onClose, message }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && onClose && !loading) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [loading, onClose]);

  const mood = password.length > 0
    ? (isPasswordFocused && !showPassword ? 'shy' : 'smiling')
    : (isEmailFocused || isNameFocused || isConfirmPasswordFocused ? 'watching' : 'idle');

  const handleCredentialsSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (!supabase) throw new Error('Sign in is temporarily unavailable. Please use the contact page and we will assist you.');

      if (email === 'admin' && password === 'admin') {
        window.location.href = '/admin';
        return;
      }

      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        setSuccessMsg(data?.user && !data?.session
          ? 'Account created! Please check your email for a verification link.'
          : 'Account created and signed in successfully!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (error) {
      console.error('Credentials auth error:', error);
      setErrorMsg(error.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      if (!supabase) throw new Error('Google sign-in is temporarily unavailable. Please try again later.');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Google OAuth error:', error);
      setErrorMsg(error.message || 'An error occurred during Google Sign-in.');
      setLoading(false);
    }
  };

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
  const passwordsMatch = !isSignUp || password === confirmPassword;
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;

  const switchMode = () => {
    setIsSignUp((current) => !current);
    setErrorMsg('');
    setSuccessMsg('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center overflow-y-auto bg-[#0d0c12]/75 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => { if (event.target === event.currentTarget && onClose && !loading) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        className="login-dialog relative my-auto grid max-h-[calc(100vh-1.5rem)] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/15 bg-white text-[#111217] shadow-2xl dark:border-white/10 dark:bg-[#101014] dark:text-[#f8f7f4] md:grid-cols-[minmax(310px,0.92fr)_minmax(430px,1.08fr)]"
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close sign in"
            className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[#d8d4de] bg-white text-lg font-medium text-[#111217] shadow-sm hover:bg-[#f0eef4] disabled:opacity-50 dark:border-white/15 dark:bg-[#1b1a20] dark:text-[#f8f7f4] dark:hover:bg-[#29272f]"
          >
            ✕
          </button>
        )}

        <aside className="relative flex min-h-[250px] flex-col overflow-hidden bg-[#efedf3] px-6 pb-0 pt-6 dark:bg-[#19181e] sm:min-h-[300px] sm:px-9 sm:pt-8 md:min-h-[660px]">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="" className="h-10 w-10 rounded-xl object-cover shadow-sm" />
            <div>
              <p className="font-display text-base font-semibold text-[#111217] dark:text-[#f8f7f4]">BuildInByte</p>
              <p className="text-xs text-[#77727e] dark:text-[#aaa6b0]">Your software workspace</p>
            </div>
          </div>

          <div className="mt-8 max-w-sm md:mt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6f35f5]">Welcome inside</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#111217] dark:text-[#f8f7f4] md:text-4xl">
              Good software starts with a clear conversation.
            </h2>
          </div>

          <div className="mt-auto flex justify-center pt-5 md:pt-10">
            <LoginCharacters mood={mood} />
          </div>
        </aside>

        <section className="flex bg-white px-6 py-10 dark:bg-[#101014] sm:px-10 md:min-h-[660px] md:items-center md:px-14 md:py-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-7 text-center">
              <h1 id="login-title" className="font-display text-3xl font-semibold tracking-[-0.03em] text-[#111217] dark:text-[#f8f7f4] sm:text-4xl">
                {isSignUp ? 'Create your account' : 'Welcome'}
              </h1>
              <p className="mt-2 text-sm text-[#77727e] dark:text-[#aaa6b0]">
                {isSignUp ? 'Enter your details to create a workspace.' : 'Please enter your details.'}
              </p>
            </div>

            <div className="space-y-4">
              {message && <div className="rounded-xl border border-[#ddd7e8] bg-[#f4f1f8] px-4 py-3 text-sm font-medium text-[#393442] dark:border-white/10 dark:bg-[#1b1a20] dark:text-[#d8d4de]">{message}</div>}
              {errorMsg && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{errorMsg}</div>}
              {successMsg && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{successMsg}</div>}

              <form onSubmit={handleCredentialsSubmit} className="space-y-5 text-left">
                {isSignUp && (
                  <div>
                    <label htmlFor="signup-name" className="block text-sm font-medium text-[#4c4752] dark:text-[#c8c4cd]">Full name</label>
                    <input id="signup-name" required type="text" autoComplete="name" placeholder="Liam Patel" value={name} onChange={(event) => setName(event.target.value)} onFocus={() => setIsNameFocused(true)} onBlur={() => setIsNameFocused(false)} className={INPUT_CLASS} />
                  </div>
                )}

                <div>
                  <label htmlFor="auth-email" className="block text-sm font-medium text-[#4c4752] dark:text-[#c8c4cd]">Email</label>
                  <input id="auth-email" required type="email" autoComplete="email" placeholder="name@domain.com" value={email} onChange={(event) => setEmail(event.target.value)} onFocus={() => setIsEmailFocused(true)} onBlur={() => setIsEmailFocused(false)} className={INPUT_CLASS} />
                </div>

                <div>
                  <label htmlFor="auth-password" className="block text-sm font-medium text-[#4c4752] dark:text-[#c8c4cd]">Password</label>
                  <div className="relative">
                    <input id="auth-password" required type={showPassword ? 'text' : 'password'} autoComplete={isSignUp ? 'new-password' : 'current-password'} placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)} className={`${INPUT_CLASS} pr-11`} />
                    <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className="absolute bottom-2 right-0 flex h-9 w-9 items-center justify-center rounded-full text-[#77727e] hover:bg-[#f0eef4] hover:text-[#111217] dark:text-[#aaa6b0] dark:hover:bg-white/10 dark:hover:text-white">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {isSignUp && password && (
                  <div className="grid grid-cols-1 gap-1.5 rounded-xl bg-[#f5f3f7] p-3 text-xs font-medium dark:bg-[#1b1a20] sm:grid-cols-2">
                    <span className={hasMinLength ? 'text-emerald-700' : 'text-[#837e88]'}>{hasMinLength ? '✓' : '○'} 8+ characters</span>
                    <span className={hasUppercase ? 'text-emerald-700' : 'text-[#837e88]'}>{hasUppercase ? '✓' : '○'} Uppercase letter</span>
                    <span className={hasLowercase ? 'text-emerald-700' : 'text-[#837e88]'}>{hasLowercase ? '✓' : '○'} Lowercase letter</span>
                    <span className={hasNumber ? 'text-emerald-700' : 'text-[#837e88]'}>{hasNumber ? '✓' : '○'} Number</span>
                    <span className={hasSpecial ? 'text-emerald-700' : 'text-[#837e88]'}>{hasSpecial ? '✓' : '○'} Special character</span>
                  </div>
                )}

                {isSignUp && (
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-[#4c4752] dark:text-[#c8c4cd]">Confirm password</label>
                    <input id="confirm-password" required type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="••••••••" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} onFocus={() => setIsConfirmPasswordFocused(true)} onBlur={() => setIsConfirmPasswordFocused(false)} className={INPUT_CLASS} />
                    {confirmPassword && !passwordsMatch && <p className="mt-2 text-xs font-medium text-red-600">Passwords do not match.</p>}
                  </div>
                )}

                <button type="submit" disabled={loading || (isSignUp && (!isPasswordValid || !passwordsMatch))} className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#111217] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#29272f] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#f8f7f4] dark:text-[#111217] dark:hover:bg-white">
                  {loading ? 'Please wait…' : isSignUp ? 'Create account' : 'Log in'}
                </button>
              </form>

              <div className="flex items-center gap-4 py-1 text-xs text-[#918c96] before:h-px before:flex-1 before:bg-[#e3e0e6] after:h-px after:flex-1 after:bg-[#e3e0e6] dark:before:bg-white/10 dark:after:bg-white/10">or</div>

              <button type="button" onClick={handleGoogleLogin} disabled={loading} className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#f1eff5] px-5 text-sm font-semibold text-[#111217] hover:bg-[#e8e4ef] disabled:opacity-50 dark:bg-[#1b1a20] dark:text-[#f8f7f4] dark:hover:bg-[#25232b]">
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                {isSignUp ? 'Sign up with Google' : 'Log in with Google'}
              </button>

              <p className="pt-2 text-center text-sm text-[#77727e] dark:text-[#aaa6b0]">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button type="button" onClick={switchMode} className="font-semibold text-[#6f35f5] hover:text-[#5421cd]">{isSignUp ? 'Log in' : 'Sign up'}</button>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
