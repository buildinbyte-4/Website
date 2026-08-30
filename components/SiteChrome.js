'use client';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingContactButton from './FloatingContactButton';

export default function SiteChrome({ children, showContact = true }) {
  return (
    <div className="min-h-screen bg-canvas text-ink font-sans flex flex-col">
      <Navbar />
      <div className="flex-1 pt-28 pb-20">{children}</div>
      <Footer />
      {showContact && <FloatingContactButton />}
    </div>
  );
}
