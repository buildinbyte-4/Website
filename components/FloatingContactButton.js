'use client';
import Link from 'next/link';

export default function FloatingContactButton({ onClick }) {
  const buttonClasses = "floating-contact-btn fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3 font-black uppercase text-sm transition-all cursor-pointer rounded-full bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#FFFFFF] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#000000] dark:hover:shadow-[1px_1px_0px_#FFFFFF]";

  if (onClick) {
    return (
      <button
        onClick={() => onClick({ title: 'Contact Us — General Inquiry' })}
        className={buttonClasses}
        aria-label="Contact Us"
      >
        <svg className="w-5 h-5 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <span className="font-black text-sm tracking-tight text-black dark:text-white font-sans">Contact Us</span>
      </button>
    );
  }

  return (
    <Link
      href="/contact"
      className={buttonClasses}
      aria-label="Contact Us"
    >
      <svg className="w-5 h-5 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
      <span className="font-black text-sm tracking-tight text-black dark:text-white font-sans">Contact Us</span>
    </Link>
  );
}
