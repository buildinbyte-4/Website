import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found — BuildInByte',
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-canvas px-6 py-16 text-foreground">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-[0_30px_80px_-45px_rgba(37,99,235,0.55)]">
        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-700">404</span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight">This page isn’t here.</h1>
        <p className="mt-4 max-w-lg text-base sm:text-lg leading-relaxed text-slate-600">
          The address may have changed, or the page may no longer exist. You can return home or explore our work.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">Return home</Link>
          <Link href="/templates" className="btn-secondary">Browse templates</Link>
        </div>
      </div>
    </main>
  );
}
