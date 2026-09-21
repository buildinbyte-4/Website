'use client';

import { useCallback, useEffect, useState } from 'react';
import { MessageCircleMore } from 'lucide-react';
import QuickContactDialog from '@/components/QuickContactDialog';

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);
  const closeDialog = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (sessionStorage.getItem('buildinbyte_quick_contact_draft')) {
      setOpen(true);
    }
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="floating-contact-btn fixed bottom-5 right-5 z-40 flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-950/20 hover:bg-brand-400 sm:bottom-6 sm:right-6"
        aria-label="Open quick contact form"
        aria-haspopup="dialog"
      >
        <MessageCircleMore size={19} aria-hidden="true" />
        <span>Contact us</span>
      </button>
      {open && <QuickContactDialog onClose={closeDialog} />}
    </>
  );
}
