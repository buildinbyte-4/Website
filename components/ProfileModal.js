'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProfileModal({ user, onClose }) {
  if (!user) return null;

  // Retrieve user metadata
  const metadata = user.user_metadata || {};
  const email = user.email || '';
  
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
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL || metadata.avatar_url || metadata.picture || '');
  const [imgFailed, setImgFailed] = useState(false);
  const [phone, setPhone] = useState(metadata.phone_number || '');
  const [occupation, setOccupation] = useState(metadata.occupation || '');
  const [location, setLocation] = useState(metadata.location || '');

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
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          avatar_url: avatarUrl,
          phone_number: phone,
          occupation: occupation,
          location: location,
        }
      });

      if (error) throw error;

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

  const provider = user.app_metadata?.provider || user.identities?.[0]?.provider || 'email';
  const joinedDate = user.created_at ? new Date(user.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'N/A';

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50 overflow-y-auto p-4">
      <div className="max-w-md w-full bg-white border border-slate-200 p-8 shadow-xl space-y-6 my-auto relative text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 w-8 h-8 bg-white border border-slate-200 text-slate-900 font-semibold flex items-center justify-center hover:bg-slate-100 hover:text-slate-950 transition-all cursor-pointer"
        >
          ✕
        </button>

        <h3 className="font-display font-semibold text-2xl text-slate-900">
          {isEditing ? 'Edit Profile' : 'Your Profile'}
        </h3>

        {errorMsg && (
          <div className="p-3 bg-accent-blue/10 border border-accent-blue rounded-xl text-xs font-semibold text-accent-blue text-left">
            ⚠️ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-800 text-left">
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
                <div className="w-20 h-20 rounded-full bg-white dark:bg-bg-surface-dark border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white flex items-center justify-center font-display text-2xl font-semibold shadow-card-sm shrink-0">
                  {getInitials(fullName)}
                </div>
              )}

              <div>
                <h4 className="font-semibold text-lg text-slate-900">
                  {fullName}
                </h4>
                <span className="text-xs font-semibold  tracking-wider border border-[#b84c00] px-2.5 py-1 rounded-full text-[#b84c00] inline-block mt-1">
                  Signed in via {provider === 'google' ? 'Google' : 'Credentials'}
                </span>
              </div>
            </div>

            {/* Profile Grid Fields */}
            <div className="bg-slate-50 border border-slate-200 p-5 text-left text-xs space-y-3.5">
              <div className="flex justify-between items-center border-b border-[#E4E4E7] pb-2.5">
                <span className="font-semibold text-slate-900  tracking-wider text-xs">Email Address</span>
                <span className="font-semibold text-[#18181B]">{email}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#E4E4E7] pb-2.5">
                <span className="font-semibold text-slate-900  tracking-wider text-xs">Phone Number</span>
                <span 
                  onClick={() => setIsEditing(true)}
                  className={`font-semibold transition-all ${phone ? 'text-[#18181B]' : 'text-zinc-500 italic hover:text-[#b84c00] hover:underline cursor-pointer'}`}
                >
                  {phone || 'Not provided [Add details]'}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[#E4E4E7] pb-2.5">
                <span className="font-semibold text-slate-900  tracking-wider text-xs">Occupation</span>
                <span 
                  onClick={() => setIsEditing(true)}
                  className={`font-semibold transition-all ${occupation ? 'text-[#18181B]' : 'text-zinc-500 italic hover:text-[#b84c00] hover:underline cursor-pointer'}`}
                >
                  {occupation || 'Not provided [Add details]'}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[#E4E4E7] pb-2.5">
                <span className="font-semibold text-slate-900  tracking-wider text-xs">Location</span>
                <span 
                  onClick={() => setIsEditing(true)}
                  className={`font-semibold transition-all ${location ? 'text-[#18181B]' : 'text-zinc-500 italic hover:text-[#b84c00] hover:underline cursor-pointer'}`}
                >
                  {location || 'Not provided [Add details]'}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[#E4E4E7] pb-2.5">
                <span className="font-semibold text-slate-900  tracking-wider text-xs">Theme Mode</span>
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="px-3 py-1 border border-slate-200 bg-white text-slate-900 font-semibold  tracking-wider text-xs flex items-center gap-1.5 hover:bg-zinc-100 transition-all cursor-pointer shadow-card-sm  "
                >
                  <span>{darkMode ? '☀️ LIGHT MODE' : '🌙 DARK MODE'}</span>
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-900  tracking-wider text-xs">Member Since</span>
                <span className="font-semibold text-[#18181B]">{joinedDate}</span>
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
              <label className="block font-semibold text-slate-900 mb-1">Full Name</label>
              <input
                required
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-[#71717A] focus:outline-none focus:border-[#b84c00]"
              />
            </div>

            {/* Avatar URL Input */}
            <div>
              <label className="block font-semibold text-slate-900 mb-1">Profile Picture URL</label>
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-[#71717A] focus:outline-none focus:border-[#b84c00]"
              />

              {/* Preset Avatar Selector */}
              <div className="mt-2.5">
                <span className="block text-xs font-semibold text-zinc-500  tracking-wide mb-1.5">
                  Or pick a dynamic robot avatar:
                </span>
                <div className="flex gap-3 justify-start">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatarUrl(preset.url)}
                      className={`w-9 h-9 border transition-all overflow-hidden ${
                        avatarUrl === preset.url ? 'border-[#b84c00] scale-110 shadow-sm' : 'border-slate-200 hover:border-[#b84c00]'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover bg-white" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block font-semibold text-slate-900 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-[#71717A] focus:outline-none focus:border-[#b84c00]"
              />
            </div>

            {/* Occupation Input */}
            <div>
              <label className="block font-semibold text-slate-900 mb-1">Occupation</label>
              <input
                type="text"
                placeholder="e.g. Tech Lead / UI Architect"
                value={occupation}
                onChange={e => setOccupation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-[#71717A] focus:outline-none focus:border-[#b84c00]"
              />
            </div>

            {/* Location Input */}
            <div>
              <label className="block font-semibold text-slate-900 mb-1">Location (City, Country)</label>
              <input
                type="text"
                placeholder="e.g. Mumbai, India"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-[#71717A] focus:outline-none focus:border-[#b84c00]"
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
