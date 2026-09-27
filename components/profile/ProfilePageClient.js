'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BadgeCheck, BriefcaseBusiness, CalendarDays, Edit3, ExternalLink, KeyRound, LoaderCircle, Mail, MapPin, Phone, Save, ShieldCheck, UserRound, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';

const emptyProfile = {
  full_name: '',
  avatar_url: '',
  phone_number: '',
  occupation: '',
  location: '',
};

function Field({ id, label, value, onChange, type = 'text', placeholder, autoComplete, maxLength = 120 }) {
  return (
    <label htmlFor={id} className="grid gap-2 text-sm font-medium text-slate-800 dark:text-zinc-200">
      {label}
      <input
        id={id}
        type={type}
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        className="min-h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-white/10 dark:bg-black/30 dark:text-white dark:focus:border-white/30 dark:focus:ring-white/10"
      />
    </label>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 gap-3 border-b border-slate-100 py-4 last:border-0 dark:border-white/8">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-zinc-300"><Icon size={16} /></span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">{label}</dt>
        <dd className="mt-1 break-words text-sm font-medium text-slate-800 dark:text-zinc-200">{value || 'Not added yet'}</dd>
      </div>
    </div>
  );
}

function initials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'U';
  return `${parts[0][0]}${parts.length > 1 ? parts.at(-1)[0] : ''}`.toUpperCase();
}

export default function ProfilePageClient() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(emptyProfile);
  const [draft, setDraft] = useState(emptyProfile);
  const [portalEnabled, setPortalEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      if (!supabase) {
        window.location.replace('/?login=1&next=/profile');
        return;
      }

      const [{ data: sessionData }, { data: userData }] = await Promise.all([
        supabase.auth.getSession(),
        supabase.auth.getUser(),
      ]);
      const currentSession = sessionData.session;
      const user = userData.user;

      if (!currentSession || !user) {
        window.location.replace('/?login=1&next=/profile');
        return;
      }

      const [{ data: savedProfile, error: profileError }, { data: account }] = await Promise.all([
        supabase
          .from('profiles')
          .select('full_name, avatar_url, phone_number, occupation, location')
          .eq('id', user.id)
          .maybeSingle(),
        supabase
          .from('client_accounts')
          .select('portal_enabled')
          .eq('user_id', user.id)
          .maybeSingle(),
      ]);

      if (!active) return;
      const metadata = user.user_metadata || {};
      const resolvedProfile = {
        full_name: savedProfile?.full_name || metadata.full_name || metadata.name || 'BuildInByte user',
        avatar_url: savedProfile?.avatar_url || metadata.avatar_url || metadata.picture || '',
        phone_number: savedProfile?.phone_number || '',
        occupation: savedProfile?.occupation || '',
        location: savedProfile?.location || '',
      };

      setSession(currentSession);
      setProfile(resolvedProfile);
      setDraft(resolvedProfile);
      setPortalEnabled(Boolean(account?.portal_enabled));
      setLoading(false);
      if (profileError) setMessage({ type: 'error', text: 'Some saved profile details could not be loaded.' });
    };

    void loadProfile();
    const { data: { subscription } } = supabase?.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/');
    }) || { data: { subscription: null } };

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, [router]);

  const user = session?.user;
  const provider = user?.app_metadata?.provider === 'google' ? 'Google' : 'Email';
  const joined = user?.created_at
    ? new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(user.created_at))
    : '';
  const navSession = useMemo(() => session ? ({
    ...session,
    user: {
      ...session.user,
      user_metadata: { ...session.user.user_metadata, full_name: profile.full_name, avatar_url: profile.avatar_url },
    },
  }) : null, [profile.avatar_url, profile.full_name, session]);

  const updateDraft = (field, value) => setDraft(current => ({ ...current, [field]: value }));

  const cancelEditing = () => {
    setDraft(profile);
    setEditing(false);
    setImageFailed(false);
    setMessage({ type: '', text: '' });
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    if (!supabase || !user) return;
    if (!draft.full_name.trim()) {
      setMessage({ type: 'error', text: 'Please enter your name.' });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });
    const updates = {
      full_name: draft.full_name.trim(),
      avatar_url: draft.avatar_url.trim(),
      phone_number: draft.phone_number.trim(),
      occupation: draft.occupation.trim(),
      location: draft.location.trim(),
    };
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select('full_name, avatar_url, phone_number, occupation, location')
      .single();

    setSaving(false);
    if (error || !data) {
      setMessage({ type: 'error', text: error?.message || 'Your changes could not be saved.' });
      return;
    }

    setProfile(data);
    setDraft(data);
    setEditing(false);
    setImageFailed(false);
    setMessage({ type: 'success', text: 'Your profile has been updated.' });
  };

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center bg-canvas text-foreground"><div role="status" className="text-center"><LoaderCircle className="mx-auto animate-spin" size={30} /><p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">Loading your profile</p></div></main>;
  }

  return (
    <div className="min-h-screen bg-canvas text-foreground">
      <Navbar session={navSession} onOpenLogin={() => router.push('/?login=1&next=/profile')} />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Link href="/" className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-950 dark:text-zinc-400 dark:hover:text-white"><ArrowLeft size={16} />Back to home</Link>

        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#111111] dark:shadow-none">
          <div className="relative border-b border-slate-200 px-5 py-7 sm:px-8 sm:py-9 dark:border-white/10">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-slate-950 dark:bg-[#f7f5ef]" />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-2xl font-semibold text-slate-700 dark:border-white/10 dark:bg-zinc-800 dark:text-white sm:h-24 sm:w-24">
                  {profile.avatar_url && !imageFailed ? <img src={profile.avatar_url} alt={`${profile.full_name}'s profile`} referrerPolicy="no-referrer" onError={() => setImageFailed(true)} className="h-full w-full object-cover" /> : initials(profile.full_name)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-zinc-500">Your account</p>
                  <h1 className="mt-1 truncate font-display text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">{profile.full_name}</h1>
                  <p className="mt-1 truncate text-sm text-slate-500 dark:text-zinc-400">{user?.email}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"><BadgeCheck size={14} />Verified account</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-white/5 dark:text-zinc-300"><KeyRound size={14} />{provider}</span>
                  </div>
                </div>
              </div>
              {!editing && <button type="button" onClick={() => { setEditing(true); setMessage({ type: '', text: '' }); }} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"><Edit3 size={16} />Edit profile</button>}
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="px-5 py-7 sm:px-8 sm:py-9 lg:border-r lg:border-slate-200 lg:dark:border-white/10">
              {message.text && <div role="status" className={`mb-6 rounded-xl border px-4 py-3 text-sm ${message.type === 'error' ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300' : 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300'}`}>{message.text}</div>}

              {editing ? (
                <form onSubmit={saveProfile}>
                  <div className="flex items-center justify-between gap-4">
                    <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-zinc-500">Personal details</p><h2 className="mt-1 font-display text-xl font-semibold">Edit your profile</h2></div>
                    <button type="button" onClick={cancelEditing} aria-label="Cancel editing" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/5"><X size={17} /></button>
                  </div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field id="full-name" label="Full name" value={draft.full_name} onChange={value => updateDraft('full_name', value)} autoComplete="name" />
                    <Field id="phone" label="Phone number" type="tel" value={draft.phone_number} onChange={value => updateDraft('phone_number', value)} placeholder="Add your phone number" autoComplete="tel" maxLength={32} />
                    <Field id="occupation" label="Occupation" value={draft.occupation} onChange={value => updateDraft('occupation', value)} placeholder="What do you do?" autoComplete="organization-title" />
                    <Field id="location" label="Location" value={draft.location} onChange={value => updateDraft('location', value)} placeholder="City, country" autoComplete="address-level2" />
                    <div className="sm:col-span-2"><Field id="avatar-url" label="Profile photo URL" type="url" value={draft.avatar_url} onChange={value => { updateDraft('avatar_url', value); setImageFailed(false); }} placeholder="https://example.com/photo.jpg" autoComplete="url" maxLength={500} /><p className="mt-2 text-xs text-slate-500 dark:text-zinc-500">Use a direct link to a photo. Leave this blank to show your initials.</p></div>
                  </div>
                  <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button type="button" onClick={cancelEditing} className="min-h-11 rounded-xl border border-slate-200 px-4 text-sm font-semibold hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5">Cancel</button>
                    <button type="submit" disabled={saving} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200">{saving ? <LoaderCircle className="animate-spin" size={16} /> : <Save size={16} />}{saving ? 'Saving…' : 'Save changes'}</button>
                  </div>
                </form>
              ) : (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-zinc-500">Personal details</p>
                  <h2 className="mt-1 font-display text-xl font-semibold">About you</h2>
                  <dl className="mt-4 grid sm:grid-cols-2 sm:gap-x-8">
                    <Detail icon={Mail} label="Email address" value={user?.email} />
                    <Detail icon={Phone} label="Phone number" value={profile.phone_number} />
                    <Detail icon={BriefcaseBusiness} label="Occupation" value={profile.occupation} />
                    <Detail icon={MapPin} label="Location" value={profile.location} />
                    <Detail icon={CalendarDays} label="Member since" value={joined} />
                    <Detail icon={UserRound} label="Sign-in method" value={provider} />
                  </dl>
                </div>
              )}
            </div>

            <aside className="border-t border-slate-200 bg-slate-50/70 px-5 py-7 sm:px-8 sm:py-9 lg:border-t-0 dark:border-white/10 dark:bg-white/[0.02]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-black"><ShieldCheck size={21} /></div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-zinc-500">User portal</p>
              <h2 className="mt-1 font-display text-xl font-semibold">{portalEnabled ? 'Your workspace is active' : 'Access is not enabled yet'}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-zinc-400">{portalEnabled ? 'View project progress, recent updates, and your BuildInByte orders.' : 'Portal access is enabled once our team begins an active engagement with you.'}</p>
              {portalEnabled ? (
                <Link href="/users" className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Open user portal <ExternalLink size={15} /></Link>
              ) : (
                <Link href="/contact" className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-semibold hover:bg-white dark:border-white/15 dark:hover:bg-white/5">Talk to our team</Link>
              )}
              <div className="mt-8 border-t border-slate-200 pt-6 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">Account security</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-400">Your email is managed through {provider}. Sign out from the avatar menu in the navigation bar.</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
