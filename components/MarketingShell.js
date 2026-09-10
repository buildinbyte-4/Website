'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MarketingShell({ children }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-foreground">
      <Navbar
        session={null}
        onOpenLogin={() => router.push('/?login=1')}
      />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
