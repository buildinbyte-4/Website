'use client';
import { useState } from 'react';
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

  // Form Fields
  const [fullName, setFullName] = useState(metadata.full_name || metadata.name || 'BuildInByte User');
  const [avatarUrl, setAvatarUrl] = useState(metadata.avatar_url || metadata.picture || '');
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
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[#1A0E09]/75 backdrop-blur-sm z-50 overflow-y-auto p-4">
      <div className="max-w-md w-full bg-[#FFFDF9] border border-[#800020]/20 p-8 rounded-2xl shadow-2xl space-y-6 my-auto relative text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5EFEB] text-[#2C1D11] font-bold flex items-center justify-center hover:bg-[#800020] hover:text-white transition-all cursor-pointer"
        >
          ✕
        </button>

        <h3 className="font-serif font-bold text-2xl text-[#4A0E17]">
          {isEditing ? 'Edit Profile' : 'Your Profile'}
        </h3>

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

        {/* View Mode */}
        {!isEditing ? (
          <div className="space-y-6">
            {/* Avatar Display */}
            <div className="flex flex-col items-center gap-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullName}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#800020] shadow-md bg-[#F5EFEB]"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#800020] text-[#FDFBF7] flex items-center justify-center font-serif text-3xl font-bold shadow-md">
                  {fullName.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <h4 className="font-bold text-lg text-[#2C1D11]">
                  {fullName}
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#800020]/10 border border-[#800020]/20 px-2.5 py-1 rounded-full text-[#800020] inline-block mt-1">
                  Signed in via {provider === 'google' ? 'Google OAuth' : 'Credentials'}
                </span>
              </div>
            </div>

            {/* Profile Grid Fields */}
            <div className="bg-[#F5EFEB] border border-[#E2D7C7] rounded-xl p-5 text-left text-xs space-y-3.5">
              <div className="flex justify-between items-center border-b border-[#E2D7C7]/50 pb-2.5">
                <span className="font-bold text-[#8C7B6E] uppercase tracking-wider text-[10px]">Email Address</span>
                <span className="font-semibold text-[#2C1D11]">{email}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#E2D7C7]/50 pb-2.5">
                <span className="font-bold text-[#8C7B6E] uppercase tracking-wider text-[10px]">Phone Number</span>
                <span className={`font-semibold ${phone ? 'text-[#2C1D11]' : 'text-[#8C7B6E]/70 italic'}`}>
                  {phone || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[#E2D7C7]/50 pb-2.5">
                <span className="font-bold text-[#8C7B6E] uppercase tracking-wider text-[10px]">Occupation</span>
                <span className={`font-semibold ${occupation ? 'text-[#2C1D11]' : 'text-[#8C7B6E]/70 italic'}`}>
                  {occupation || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[#E2D7C7]/50 pb-2.5">
                <span className="font-bold text-[#8C7B6E] uppercase tracking-wider text-[10px]">Location</span>
                <span className={`font-semibold ${location ? 'text-[#2C1D11]' : 'text-[#8C7B6E]/70 italic'}`}>
                  {location || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#8C7B6E] uppercase tracking-wider text-[10px]">Member Since</span>
                <span className="font-semibold text-[#2C1D11]">{joinedDate}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 btn-secondary text-xs py-3 justify-center font-bold"
              >
                Edit Profile
              </button>
              <button
                onClick={onClose}
                className="flex-1 btn-primary text-xs py-3 justify-center font-bold"
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
              <label className="block font-bold text-[#2C1D11] mb-1">Full Name</label>
              <input
                required
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EBE1] border border-[#E2D7C7] text-xs text-[#2C1D11] focus:outline-none focus:border-[#800020]"
              />
            </div>

            {/* Avatar URL Input */}
            <div>
              <label className="block font-bold text-[#2C1D11] mb-1">Profile Picture URL</label>
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EBE1] border border-[#E2D7C7] text-xs text-[#2C1D11] focus:outline-none focus:border-[#800020]"
              />

              {/* Preset Avatar Selector */}
              <div className="mt-2.5">
                <span className="block text-[10px] font-bold text-[#8C7B6E] uppercase tracking-wide mb-1.5">
                  Or pick a dynamic robot avatar:
                </span>
                <div className="flex gap-3 justify-start">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatarUrl(preset.url)}
                      className={`w-9 h-9 rounded-xl border-2 transition-all overflow-hidden ${
                        avatarUrl === preset.url ? 'border-[#800020] scale-110 shadow-sm' : 'border-transparent hover:border-[#800020]/40'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover bg-[#F5EFEB]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block font-bold text-[#2C1D11] mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EBE1] border border-[#E2D7C7] text-xs text-[#2C1D11] focus:outline-none focus:border-[#800020]"
              />
            </div>

            {/* Occupation Input */}
            <div>
              <label className="block font-bold text-[#2C1D11] mb-1">Occupation</label>
              <input
                type="text"
                placeholder="e.g. Tech Lead / UI Architect"
                value={occupation}
                onChange={e => setOccupation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EBE1] border border-[#E2D7C7] text-xs text-[#2C1D11] focus:outline-none focus:border-[#800020]"
              />
            </div>

            {/* Location Input */}
            <div>
              <label className="block font-bold text-[#2C1D11] mb-1">Location (City, Country)</label>
              <input
                type="text"
                placeholder="e.g. Mumbai, India"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EBE1] border border-[#E2D7C7] text-xs text-[#2C1D11] focus:outline-none focus:border-[#800020]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => { setIsEditing(false); setErrorMsg(''); }}
                className="flex-1 btn-secondary text-xs py-3 justify-center font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary text-xs py-3 justify-center font-bold flex items-center gap-2"
              >
                {loading && <span className="w-3.5 h-3.5 border-2 border-t-transparent border-[#FDFBF7] rounded-full animate-spin"></span>}
                <span>Save Changes</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
