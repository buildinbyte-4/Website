'use client';

export default function DeskModal({ user, onClose, onOpenInquiry }) {
  if (!user) return null;

  const email = user.email || '';
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || 'Developer';
  const role = user.email?.includes('admin') ? 'Administrator' : 'Client Workspace';

  const handleActionClick = (actionName) => {
    alert(`${actionName} settings are locked to local development environments.`);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50 overflow-y-auto p-4">
      <div className="max-w-xl w-full bg-[#FFFFFF] border-2 border-[#000000] p-8 shadow-[6px_6px_0px_#000000] space-y-6 my-auto relative text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-[#FFFFFF] border-2 border-[#000000] text-[#000000] font-bold flex items-center justify-center hover:bg-[#000000] hover:text-white transition-all cursor-pointer"
        >
          ✕
        </button>

        {/* Header */}
        <div className="border-b-4 border-black pb-4">
          <span className="text-[10px] font-black uppercase tracking-widest bg-brutal-blue text-white px-2.5 py-1 border-2 border-black inline-block mb-2 shadow-brutal-sm">
            Developer Workspace
          </span>
          <h3 className="font-display font-black text-3xl text-brutal-black uppercase leading-none">
            MY DESK
          </h3>
        </div>

        {/* User Overview Section */}
        <div className="space-y-4">
          <h4 className="font-display font-black text-xl text-brutal-black uppercase">
            User Overview
          </h4>
          <div className="bg-[#F8FAFC] border-2 border-black p-5 text-xs space-y-3.5">
            <div className="flex justify-between items-center border-b border-[#E4E4E7] pb-2.5">
              <span className="font-bold text-brutal-black uppercase tracking-wider text-[10px]">Active Session</span>
              <span className="font-semibold text-zinc-900">{fullName} ({email})</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#E4E4E7] pb-2.5">
              <span className="font-bold text-brutal-black uppercase tracking-wider text-[10px]">Permission Role</span>
              <span className="font-semibold text-zinc-900">{role}</span>
            </div>
            <div className="flex justify-between items-center pb-1">
              <span className="font-bold text-brutal-black uppercase tracking-wider text-[10px]">Active Project Request</span>
              <span className="font-semibold text-[#0066FF] uppercase">1 Inquiry Pending Review</span>
            </div>
          </div>
        </div>

        {/* Quick Action Links Section */}
        <div className="space-y-4">
          <h4 className="font-display font-black text-xl text-brutal-black uppercase">
            Quick Actions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleActionClick('Account Settings')}
              className="editorial-card p-4 bg-brutal-yellow text-left text-xs hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="text-2xl mb-1 block">⚙️</span>
              <h5 className="font-display font-black text-sm text-brutal-black uppercase leading-none mb-1">Account Settings</h5>
              <p className="text-[10px] font-bold text-zinc-700 uppercase">Manage authorization parameters.</p>
            </button>

            <button
              onClick={() => handleActionClick('Consultations Log')}
              className="editorial-card p-4 bg-brutal-pink text-left text-xs hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="text-2xl mb-1 block">📅</span>
              <h5 className="font-display font-black text-sm text-brutal-black uppercase leading-none mb-1">Consultations</h5>
              <p className="text-[10px] font-bold text-zinc-700 uppercase">View logs of past video scoping calls.</p>
            </button>

            <button
              onClick={() => handleActionClick('Developer Documentation')}
              className="editorial-card p-4 bg-brutal-green text-left text-xs hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="text-2xl mb-1 block">📄</span>
              <h5 className="font-display font-black text-sm text-brutal-black uppercase leading-none mb-1">Documentation</h5>
              <p className="text-[10px] font-bold text-zinc-700 uppercase">Read API blueprints and hardware guides.</p>
            </button>

            <button
              onClick={() => onOpenInquiry({ title: 'Raise a Support Ticket' })}
              className="editorial-card p-4 bg-white text-left text-xs hover:-translate-y-0.5 cursor-pointer border-2 border-black"
            >
              <span className="text-2xl mb-1 block">🎫</span>
              <h5 className="font-display font-black text-sm text-brutal-black uppercase leading-none mb-1">Support Tickets</h5>
              <p className="text-[10px] font-bold text-zinc-700 uppercase">File feedback or request software support.</p>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={onClose}
            className="flex-1 btn-primary text-xs py-3 justify-center font-bold cursor-pointer"
          >
            Close Workspace
          </button>
        </div>

      </div>
    </div>
  );
}
