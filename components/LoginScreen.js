'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import LoginCharacters from './LoginCharacters';

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

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setErrorMsg('Authentication is unavailable while Supabase is not configured.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isSignUp) {
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

        if (data?.user && !data?.session) {
          setSuccessMsg('Account created! Please check your email for a verification link.');
        } else {
          setSuccessMsg('Account created and signed in successfully!');
        }
      } else {
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

  const handleGoogleLogin = async () => {
    if (!supabase) {
      setErrorMsg('Authentication is unavailable while Supabase is not configured.');
      return;
    }

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

  const inputClass = "form-input text-sm";

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-ink/40 z-50 overflow-y-auto p-4 md:p-6">
      <div className="max-w-2xl w-full bg-surface border border-line p-8 text-center space-y-6 my-auto relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 border border-line text-ink flex items-center justify-center hover:border-accent hover:text-accent transition-colors duration-atelier cursor-pointer"
          >
            ✕
          </button>
        )}

        <div className="flex flex-col items-center gap-3">
          <img
            src="/logo.jpg"
            alt="BuildInByte Logo"
            className="w-14 h-14 object-cover border border-line"
          />
          <div>
            <h1 className="font-display font-semibold text-2xl text-ink">
              BuildInByte
            </h1>
            <p className="label-meta mt-1">
              Custom software development
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-center md:items-start text-left mt-4">
          <div className="flex md:flex-col justify-center items-center gap-4 py-4 md:py-8 w-full select-none">
            <LoginCharacters mood={mood} />
          </div>

          <div className="space-y-6">
            <div className="flex bg-canvas p-1 border border-line">
              <button
                type="button"
                onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-2 text-xs font-medium transition-colors duration-atelier cursor-pointer ${
                  !isSignUp
                    ? 'bg-surface text-ink border border-line'
                    : 'text-muted hover:text-ink'
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-2 text-xs font-medium transition-colors duration-atelier cursor-pointer ${
                  isSignUp
                    ? 'bg-surface text-ink border border-line'
                    : 'text-muted hover:text-ink'
                }`}
              >
                Create account
              </button>
            </div>

            {message && (
              <div className="p-3 bg-canvas border border-line text-xs text-ink text-left">
                {message}
              </div>
            )}

            {errorMsg && (
              <div className="p-3 border border-danger text-xs font-medium text-danger text-left">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-3 border border-line text-xs font-medium text-ink text-left">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleCredentialsSubmit} className="space-y-4 text-left text-sm">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Full name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Liam Patel"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onFocus={() => setIsNameFocused(true)}
                    onBlur={() => setIsNameFocused(false)}
                    className={inputClass}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-muted mb-1">Email address</label>
                <input
                  required
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1">Password</label>
                <div className="relative flex items-center">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    className={`${inputClass} pr-16`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-[10px] tracking-wider text-muted hover:text-accent select-none cursor-pointer"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {isSignUp && password && (
                <div className="p-3 bg-canvas border border-line text-[11px] space-y-1 text-muted">
                  <div className="label-meta mb-1">Password requirements</div>
                  <div className={hasMinLength ? "text-ink" : "text-danger"}>{hasMinLength ? '✓' : '–'} Minimum 8 characters</div>
                  <div className={hasUppercase ? "text-ink" : "text-danger"}>{hasUppercase ? '✓' : '–'} At least one uppercase letter</div>
                  <div className={hasLowercase ? "text-ink" : "text-danger"}>{hasLowercase ? '✓' : '–'} At least one lowercase letter</div>
                  <div className={hasNumber ? "text-ink" : "text-danger"}>{hasNumber ? '✓' : '–'} At least one number</div>
                  <div className={hasSpecial ? "text-ink" : "text-danger"}>{hasSpecial ? '✓' : '–'} At least one special character</div>
                </div>
              )}

              {isSignUp && (
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Confirm password</label>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    onBlur={() => setIsConfirmPasswordFocused(false)}
                    className={inputClass}
                  />
                </div>
              )}

              {isSignUp && confirmPassword && !passwordsMatch && (
                <div className="text-danger text-xs">
                  Passwords do not match.
                </div>
              )}

              <button
                type="submit"
                disabled={loading || (isSignUp && (!isPasswordValid || !passwordsMatch))}
                className="w-full btn-primary py-3 justify-center text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait…' : isSignUp ? 'Create account with email' : 'Sign in with email'}
              </button>
            </form>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-line"></div>
              </div>
              <span className="relative px-3 bg-surface text-[10px] uppercase tracking-widest text-faint">
                Or continue with
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full btn-ghost py-3 justify-center text-xs flex items-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
