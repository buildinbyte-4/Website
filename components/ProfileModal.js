'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProfileModal({ user, onClose }) {
  // Retrieve user metadata
  const metadata = user?.user_metadata || {};
  const email = user?.email || '';
  
  // Modes
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Dark Mode Toggle inside Profile
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDarkMode(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'US';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  // Form Fields
  const [fullName, setFullName] = useState(metadata.full_name || metadata.name || 'BuildInByte User');
  const [avatarUrl, setAvatarUrl] = useState(user?.photoURL || metadata.avatar_url || metadata.picture || '');
  const [imgFailed, setImgFailed] = useState(false);
  const [phone, setPhone] = useState(metadata.phone_number || '');
  const [occupation, setOccupation] = useState(metadata.occupation || '');
  const [location, setLocation] = useState(metadata.location || '');

  useEffect(() => {
    if (!user?.id || !supabase) return undefined;
    let active = true;

    supabase
      .from('profiles')
      .select('full_name, avatar_url, phone_number, occupation, location')
      .eq('id', user.id)
      .single()
      .then(({ data, error }) => {
        if (!active) return;
        if (error || !data) {
          setErrorMsg('Your saved profile could not be loaded. Showing account defaults.');
          return;
        }
        setFullName(data.full_name || metadata.full_name || metadata.name || 'BuildInByte User');
        setAvatarUrl(data.avatar_url || '');
        setPhone(data.phone_number || '');
        setOccupation(data.occupation || '');
        setLocation(data.location || '');
        setImgFailed(false);
      });

    return () => { active = false; };
  }, [metadata.full_name, metadata.name, user?.id]);

  // Pre-made Avatar Presets
  const AVATAR_PRESETS = [
    { name: 'Liam', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Liam' },
    { name: 'Anya', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Anya' },
    { name: 'Felix', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Felix' },
    { name: 'Sara', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sara' },
    { name: 'Kai', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kai' }
  ];

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          avatar_url: avatarUrl,
          phone_number: phone,
          occupation,
          location,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select('full_name, avatar_url, phone_number, occupation, location')
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error('Profile update did not affect a record.');

      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => {
        setIsEditing(false);
        setSuccessMsg('');
      }, 1000);
    } catch (err) {
      console.error('Error updating profile metadata:', err);
      setErrorMsg(err.message || 'Failed to update profile details.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const provider = user.app_metadata?.provider || user.identities?.[0]?.provider || 'email';
  const joinedDate = user.created_at ? new Date(user.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'N/A';

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center overflow-y-auto bg-black/65 p-4 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" aria-labelledby="profile-dialog-title" className="relative my-auto w-full max-w-md space-y-6 border border-border-subtle bg-bg-surface-dark p-8 text-center text-foreground shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          aria-label="Close profile"
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center border border-border-subtle bg-bg-surface-dark font-semibold text-foreground transition-all hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          ✕
        </button>

        <h3 id="profile-dialog-title" className="font-display text-2xl font-semibold text-foreground">
          {isEditing ? 'Edit Profile' : 'Your Profile'}
        </h3>

        {errorMsg && (
          <div className="p-3 bg-accent-blue/10 border border-accent-blue rounded-xl text-xs font-semibold text-accent-blue text-left">
            ⚠️ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-left text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            ✓ {successMsg}
          </div>
        )}

        {/* View Mode */}
        {!isEditing ? (
          <div className="space-y-6">
            {/* Avatar Display */}
            <div className="flex flex-col items-center gap-3">
              {avatarUrl && !imgFailed ? (
                <img
                  src={avatarUrl}
                  alt={fullName}
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-20 h-20 rounded-full object-cover border border-slate-200 dark:border-white/10 shadow-card-sm"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white dark:bg-bg-surface-dark border border-slate-200 dark:border-white/10 text-slate-900 dark:text-foreground flex items-center justify-center font-display text-2xl font-semibold shadow-card-sm shrink-0">
                  {getInitials(fullName)}
                </div>
              )}

              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  {fullName}
                </h4>
                <span className="mt-1 inline-block rounded-full border border-border-subtle px-2.5 py-1 text-xs font-semibold tracking-wider text-foreground">
                  Signed in via {provider === 'google' ? 'Google' : 'Credentials'}
                </span>
              </div>
            </div>

            {/* Profile Grid Fields */}
            <div className="space-y-3.5 border border-border-subtle bg-canvas/60 p-5 text-left text-xs">
              <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-2.5">
                <span className="text-xs font-semibold tracking-wider text-foreground">Email Address</span>
                <span className="break-all text-right font-semibold text-foreground">{email}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-2.5">
                <span className="text-xs font-semibold tracking-wider text-foreground">Phone Number</span>
                <span 
                  onClick={() => setIsEditing(true)}
                  className={`text-right font-semibold transition-all ${phone ? 'text-foreground' : 'cursor-pointer italic text-text-secondary hover:text-foreground hover:underline'}`}
                >
                  {phone || 'Not provided [Add details]'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-2.5">
                <span className="text-xs font-semibold tracking-wider text-foreground">Occupation</span>
                <span 
                  onClick={() => setIsEditing(true)}
                  className={`text-right font-semibold transition-all ${occupation ? 'text-foreground' : 'cursor-pointer italic text-text-secondary hover:text-foreground hover:underline'}`}
                >
                  {occupation || 'Not provided [Add details]'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-2.5">
                <span className="text-xs font-semibold tracking-wider text-foreground">Location</span>
                <span 
                  onClick={() => setIsEditing(true)}
                  className={`text-right font-semibold transition-all ${location ? 'text-foreground' : 'cursor-pointer italic text-text-secondary hover:text-foreground hover:underline'}`}
                >
                  {location || 'Not provided [Add details]'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-2.5">
                <span className="text-xs font-semibold tracking-wider text-foreground">Theme Mode</span>
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="flex cursor-pointer items-center gap-1.5 border border-border-subtle bg-bg-surface-dark px-3 py-1 text-xs font-semibold tracking-wider text-foreground shadow-card-sm transition-all hover:bg-accent-soft"
                >
                  <span>{darkMode ? '☀️ LIGHT MODE' : '🌙 DARK MODE'}</span>
                </button>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold tracking-wider text-foreground">Member Since</span>
                <span className="text-right font-semibold text-foreground">{joinedDate}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 btn-secondary text-xs py-3 justify-center font-semibold"
              >
                Edit Profile
              </button>
              <button
                onClick={onClose}
                className="flex-1 btn-primary text-xs py-3 justify-center font-semibold"
              >
                Close Profile
              </button>
            </div>
          </div>
        ) : (
          /* Edit Mode Form */
          <form onSubmit={handleSave} className="space-y-4 text-left text-xs">
            
            {/* Name Input */}
            <div>
              <label className="mb-1 block font-semibold text-foreground">Full Name</label>
              <input
                required
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full border border-border-subtle bg-canvas px-3.5 py-2.5 text-xs text-foreground placeholder:text-text-secondary focus:border-foreground focus:outline-none"
              />
            </div>

            {/* Avatar URL Input */}
            <div>
              <label className="mb-1 block font-semibold text-foreground">Profile Picture URL</label>
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                className="w-full border border-border-subtle bg-canvas px-3.5 py-2.5 text-xs text-foreground placeholder:text-text-secondary focus:border-foreground focus:outline-none"
              />

              {/* Preset Avatar Selector */}
              <div className="mt-2.5">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-text-secondary">
                  Or pick a dynamic robot avatar:
                </span>
                <div className="flex gap-3 justify-start">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatarUrl(preset.url)}
                      className={`w-9 h-9 border transition-all overflow-hidden ${
                        avatarUrl === preset.url ? 'scale-110 border-foreground shadow-sm' : 'border-border-subtle hover:border-foreground'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="h-full w-full bg-bg-surface-dark object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="mb-1 block font-semibold text-foreground">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full border border-border-subtle bg-canvas px-3.5 py-2.5 text-xs text-foreground placeholder:text-text-secondary focus:border-foreground focus:outline-none"
              />
            </div>

            {/* Occupation Input */}
            <div>
              <label className="mb-1 block font-semibold text-foreground">Occupation</label>
              <input
                type="text"
                placeholder="e.g. Tech Lead / UI Architect"
                value={occupation}
                onChange={e => setOccupation(e.target.value)}
                className="w-full border border-border-subtle bg-canvas px-3.5 py-2.5 text-xs text-foreground placeholder:text-text-secondary focus:border-foreground focus:outline-none"
              />
            </div>

            {/* Location Input */}
            <div>
              <label className="mb-1 block font-semibold text-foreground">Location (City, Country)</label>
              <input
                type="text"
                placeholder="e.g. Mumbai, India"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full border border-border-subtle bg-canvas px-3.5 py-2.5 text-xs text-foreground placeholder:text-text-secondary focus:border-foreground focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => { setIsEditing(false); setErrorMsg(''); }}
                className="flex-1 btn-secondary text-xs py-3 justify-center font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary text-xs py-3 justify-center font-semibold flex items-center gap-2"
              >
                {loading && <span className="w-3.5 h-3.5 border border-t-transparent border-[#F7F7F8] rounded-full animate-spin"></span>}
                <span>Save Changes</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
