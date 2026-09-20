-- Allow prospective clients to submit a project brief without creating an account.
-- Public roles receive insert-only access; inquiry contents remain admin-readable.

grant insert on table public.inquiries to anon;

drop policy if exists inquiries_anon_insert on public.inquiries;
create policy inquiries_anon_insert
on public.inquiries
for insert
to anon
with check (user_id is null and status = 'new');

create or replace function private.enforce_inquiry_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  recent_count integer;
  rate_limit_key text;
begin
  if new.user_id is not null and new.user_id is distinct from (select auth.uid()) then
    raise exception using errcode = '42501', message = 'inquiry_owner_mismatch';
  end if;

  rate_limit_key := coalesce(new.user_id::text, lower(trim(new.email)));
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(rate_limit_key, 0));

  if exists (
    select 1 from public.inquiries
    where id = new.id
      and coalesce(user_id::text, lower(trim(email))) = rate_limit_key
  ) then
    return new;
  end if;

  select count(*) into recent_count
  from public.inquiries
  where coalesce(user_id::text, lower(trim(email))) = rate_limit_key
    and created_at >= pg_catalog.statement_timestamp() - interval '1 hour';

  if recent_count >= 5 then
    raise exception using errcode = 'P0001', message = 'inquiry_rate_limit_exceeded';
  end if;

  return new;
end;
$$;

revoke all on function private.enforce_inquiry_rate_limit() from public, anon, authenticated;
