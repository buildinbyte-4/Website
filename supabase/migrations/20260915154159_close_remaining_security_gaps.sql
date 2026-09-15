-- Applied to production: prevent authenticated users from escalating their own profile role.
revoke update on public.profiles from authenticated;
grant update (full_name, avatar_url, phone_number, occupation, location) on public.profiles to authenticated;

create or replace function private.prevent_profile_privilege_changes()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.id is distinct from old.id
    or new.email is distinct from old.email
    or new.role is distinct from old.role
    or new.created_at is distinct from old.created_at then
    raise exception using
      errcode = '42501',
      message = 'profile_privileged_fields_are_immutable';
  end if;
  return new;
end;
$$;

revoke all on function private.prevent_profile_privilege_changes() from public, anon, authenticated;

drop trigger if exists prevent_profile_privilege_changes on public.profiles;
create trigger prevent_profile_privilege_changes
before update on public.profiles
for each row execute function private.prevent_profile_privilege_changes();

-- Apply a shared, transaction-safe limit of five new inquiries per user/hour.
create or replace function private.enforce_inquiry_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  recent_count integer;
begin
  if new.user_id is null or new.user_id is distinct from (select auth.uid()) then
    raise exception using errcode = '42501', message = 'inquiry_owner_mismatch';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.user_id::text, 0));

  if exists (
    select 1 from public.inquiries
    where id = new.id and user_id = new.user_id
  ) then
    return new;
  end if;

  select count(*) into recent_count
  from public.inquiries
  where user_id = new.user_id
    and created_at >= pg_catalog.statement_timestamp() - interval '1 hour';

  if recent_count >= 5 then
    raise exception using errcode = 'P0001', message = 'inquiry_rate_limit_exceeded';
  end if;

  return new;
end;
$$;

revoke all on function private.enforce_inquiry_rate_limit() from public, anon, authenticated;

drop trigger if exists enforce_inquiry_rate_limit on public.inquiries;
create trigger enforce_inquiry_rate_limit
before insert on public.inquiries
for each row execute function private.enforce_inquiry_rate_limit();
