'use client';

export default function ProfileModal({ user, onClose }) {
  if (!user) return null;

  // Retrieve user metadata
  const metadata = user.user_metadata || {};
  const email = user.email || '';
  const fullName = metadata.full_name || metadata.name || 'BuildInByte User';
  const avatarUrl = metadata.avatar_url || metadata.picture || null;
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
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5EFEB] text-[#2C1D11] font-bold flex items-center justify-center hover:bg-[#800020] hover:text-white transition-all cursor-pointer"
        >
          ✕
        </button>

        <h3 className="font-serif font-bold text-2xl text-[#4A0E17]">
          Your Profile
        </h3>

        {/* Avatar Display */}
        <div className="flex flex-col items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={fullName}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#800020] shadow-md"
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

        {/* User Details Grid */}
        <div className="bg-[#F5EFEB] border border-[#E2D7C7] rounded-xl p-5 text-left text-xs space-y-3.5">
          <div className="flex justify-between items-center border-b border-[#E2D7C7]/50 pb-2.5">
            <span className="font-bold text-[#8C7B6E] uppercase tracking-wider text-[10px]">Email Address</span>
            <span className="font-semibold text-[#2C1D11]">{email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-[#8C7B6E] uppercase tracking-wider text-[10px]">Member Since</span>
            <span className="font-semibold text-[#2C1D11]">{joinedDate}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full btn-primary py-3 justify-center shadow-md font-bold text-xs"
        >
          Return to Storefront
        </button>

      </div>
    </div>
  );
}
