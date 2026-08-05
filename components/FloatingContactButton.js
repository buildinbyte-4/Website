'use client';
import Link from 'next/link';

export default function FloatingContactButton({ onClick }) {
  const buttonClasses = "fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3 bg-white border-4 border-black dark:border-white text-black dark:text-white font-black uppercase text-sm shadow-brutal hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:-translate-y-1 transition-all cursor-pointer rounded-full";

  if (onClick) {
    return (
      <button
        onClick={() => onClick({ title: 'Contact Us — General Inquiry' })}
        className={buttonClasses}
        aria-label="Contact Us"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <span className="font-black text-sm tracking-tight">Contact Us</span>
      </button>
    );
  }

  return (
    <Link
      href="/contact"
      className={buttonClasses}
      aria-label="Contact Us"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
      <span className="font-black text-sm tracking-tight">Contact Us</span>
    </Link>
  );
}
