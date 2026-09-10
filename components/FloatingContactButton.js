'use client';
import Link from 'next/link';

export default function FloatingContactButton({ onClick }) {
  const buttonClasses = "floating-contact-btn fixed bottom-5 right-5 z-40 flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-950/20 hover:bg-brand-400 sm:bottom-6 sm:right-6";

  if (onClick) {
    return (
      <button
        onClick={() => onClick({ title: 'Contact Us — General Inquiry' })}
        className={buttonClasses}
        aria-label="Contact Us"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <span>Contact us</span>
      </button>
    );
  }

  return (
    <Link
      href="/contact"
      className={buttonClasses}
      aria-label="Contact Us"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
      <span>Contact us</span>
    </Link>
  );
}
