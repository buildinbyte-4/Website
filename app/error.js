'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled UI exception captured:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full bg-white border border-zinc-200 p-8 rounded-2xl shadow-sm space-y-6">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
          ⚠️
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-zinc-900">Something went wrong</h1>
          <p className="text-sm text-zinc-500">
            An unexpected application error occurred. For security reasons, internal debug logs have been masked.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-4 py-2 bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
