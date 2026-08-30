'use client';
import Link from 'next/link';

export default function FloatingContactButton({ onClick }) {
  const buttonClasses = "floating-contact-btn fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors duration-atelier cursor-pointer";

  if (onClick) {
    return (
      <button
        onClick={() => onClick({ title: 'Contact Us — General Inquiry' })}
        className={buttonClasses}
        aria-label="Contact Us"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <span>Contact</span>
      </button>
    );
  }

  return (
    <Link
      href="/contact"
      className={buttonClasses}
      aria-label="Contact Us"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
      <span>Contact</span>
    </Link>
  );
}
