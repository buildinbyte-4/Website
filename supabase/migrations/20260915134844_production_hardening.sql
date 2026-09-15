-- BuildInByte production hardening
-- Aligns Data API grants, RLS, indexes, content defaults, and audit-friendly timestamps.

alter table public.inquiries
  add column if not exists user_id uuid references auth.users(id) on delete set null;

update public.inquiries i
set user_id = p.id
from public.profiles p
where i.user_id is null and lower(i.email) = lower(p.email);

alter table public.inquiries
  add constraint inquiries_name_length_check
    check (char_length(trim(name)) between 2 and 120) not valid,
  add constraint inquiries_email_length_check
    check (char_length(email) <= 320) not valid,
  add constraint inquiries_message_length_check
    check (message is null or char_length(message) <= 5000) not valid;

create index if not exists inquiries_user_id_idx on public.inquiries (user_id);
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists products_store_listing_idx
  on public.products (created_at desc)
  where status = 'active' and coalesce(is_active, true) and show_on_store;
create index if not exists faq_display_order_idx on public.faq (display_order, id);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists support_tickets_created_at_idx on public.support_tickets (created_at desc);
create index if not exists support_tickets_status_idx on public.support_tickets (status, created_at desc);

create unique index if not exists company_stats_singleton_idx on public.company_stats ((true));
create unique index if not exists hero_section_singleton_idx on public.hero_section ((true));
create unique index if not exists site_settings_singleton_idx on public.site_settings ((true));

create or replace function private.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function private.set_updated_at() from public, anon, authenticated;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles
for each row execute function private.set_updated_at();
drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at before update on public.products
for each row execute function private.set_updated_at();
drop trigger if exists set_company_stats_updated_at on public.company_stats;
create trigger set_company_stats_updated_at before update on public.company_stats
for each row execute function private.set_updated_at();
drop trigger if exists set_hero_section_updated_at on public.hero_section;
create trigger set_hero_section_updated_at before update on public.hero_section
for each row execute function private.set_updated_at();
drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at before update on public.site_settings
for each row execute function private.set_updated_at();
drop trigger if exists set_support_tickets_updated_at on public.support_tickets;
create trigger set_support_tickets_updated_at before update on public.support_tickets
for each row execute function private.set_updated_at();

-- Explicit Data API grants. RLS decides which rows each authenticated user can reach.
revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;

grant select on public.products, public.company_stats, public.faq, public.hero_section, public.site_settings to anon;
grant select, insert, update, delete on public.products, public.company_stats, public.faq, public.hero_section, public.site_settings to authenticated;
grant select, insert, update, delete on public.inquiries, public.orders, public.order_items, public.support_tickets, public.support_messages to authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.login_events to authenticated;
grant select on public.admin_financial_kpis, public.admin_financial_trend, public.admin_payment_methods to authenticated;
grant usage, select on sequence public.support_tickets_ticket_number_seq to authenticated;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;

alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public revoke all on sequences from anon, authenticated;

-- Replace overlapping permissive policies with one policy per role/action.
drop policy if exists admin_manage_products on public.products;
drop policy if exists public_read_products on public.products;
create policy products_anon_read on public.products for select to anon
using (status = 'active' and coalesce(is_active, true) and show_on_store);
create policy products_authenticated_read on public.products for select to authenticated
using ((status = 'active' and coalesce(is_active, true) and show_on_store) or (select private.is_admin()));
create policy products_admin_insert on public.products for insert to authenticated
with check ((select private.is_admin()));
create policy products_admin_update on public.products for update to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));
create policy products_admin_delete on public.products for delete to authenticated
using ((select private.is_admin()));

drop policy if exists admin_manage_company_stats on public.company_stats;
drop policy if exists public_read_company_stats on public.company_stats;
create policy company_stats_anon_read on public.company_stats for select to anon using (true);
create policy company_stats_authenticated_read on public.company_stats for select to authenticated using (true);
create policy company_stats_admin_insert on public.company_stats for insert to authenticated with check ((select private.is_admin()));
create policy company_stats_admin_update on public.company_stats for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy company_stats_admin_delete on public.company_stats for delete to authenticated using ((select private.is_admin()));

drop policy if exists admin_manage_faq on public.faq;
drop policy if exists public_read_faq on public.faq;
create policy faq_anon_read on public.faq for select to anon using (true);
create policy faq_authenticated_read on public.faq for select to authenticated using (true);
create policy faq_admin_insert on public.faq for insert to authenticated with check ((select private.is_admin()));
create policy faq_admin_update on public.faq for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy faq_admin_delete on public.faq for delete to authenticated using ((select private.is_admin()));

drop policy if exists admin_manage_hero on public.hero_section;
drop policy if exists public_read_hero on public.hero_section;
create policy hero_anon_read on public.hero_section for select to anon using (true);
create policy hero_authenticated_read on public.hero_section for select to authenticated using (true);
create policy hero_admin_insert on public.hero_section for insert to authenticated with check ((select private.is_admin()));
create policy hero_admin_update on public.hero_section for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy hero_admin_delete on public.hero_section for delete to authenticated using ((select private.is_admin()));

drop policy if exists admin_manage_site_settings on public.site_settings;
drop policy if exists public_read_site_settings on public.site_settings;
create policy site_settings_anon_read on public.site_settings for select to anon using (true);
create policy site_settings_authenticated_read on public.site_settings for select to authenticated using (true);
create policy site_settings_admin_insert on public.site_settings for insert to authenticated with check ((select private.is_admin()));
create policy site_settings_admin_update on public.site_settings for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy site_settings_admin_delete on public.site_settings for delete to authenticated using ((select private.is_admin()));

drop policy if exists admin_manage_inquiries on public.inquiries;
drop policy if exists anon_create_inquiry on public.inquiries;
drop policy if exists authenticated_create_inquiry on public.inquiries;
create policy inquiries_authenticated_insert on public.inquiries for insert to authenticated
with check ((select auth.uid()) is not null and user_id = (select auth.uid()) and status = 'new');
create policy inquiries_admin_read on public.inquiries for select to authenticated using ((select private.is_admin()));
create policy inquiries_admin_update on public.inquiries for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy inquiries_admin_delete on public.inquiries for delete to authenticated using ((select private.is_admin()));

drop policy if exists admin_read_profiles on public.profiles;
drop policy if exists user_read_profile on public.profiles;
drop policy if exists user_update_profile on public.profiles;
create policy profiles_authenticated_read on public.profiles for select to authenticated
using (id = (select auth.uid()) or (select private.is_admin()));
create policy profiles_user_update on public.profiles for update to authenticated
using (id = (select auth.uid())) with check (id = (select auth.uid()));

drop policy if exists admin_manage_orders on public.orders;
drop policy if exists user_read_orders on public.orders;
create policy orders_authenticated_read on public.orders for select to authenticated
using (buyer_id = (select auth.uid()) or (select private.is_admin()));
create policy orders_admin_insert on public.orders for insert to authenticated with check ((select private.is_admin()));
create policy orders_admin_update on public.orders for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy orders_admin_delete on public.orders for delete to authenticated using ((select private.is_admin()));

drop policy if exists admin_manage_order_items on public.order_items;
drop policy if exists user_read_order_items on public.order_items;
create policy order_items_authenticated_read on public.order_items for select to authenticated
using ((select private.is_admin()) or exists (
  select 1 from public.orders o where o.id = order_items.order_id and o.buyer_id = (select auth.uid())
));
create policy order_items_admin_insert on public.order_items for insert to authenticated with check ((select private.is_admin()));
create policy order_items_admin_update on public.order_items for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy order_items_admin_delete on public.order_items for delete to authenticated using ((select private.is_admin()));

-- Admin-only tables retain one policy per action.
drop policy if exists admin_manage_support_tickets on public.support_tickets;
create policy support_tickets_admin_read on public.support_tickets for select to authenticated using ((select private.is_admin()));
create policy support_tickets_admin_insert on public.support_tickets for insert to authenticated with check ((select private.is_admin()));
create policy support_tickets_admin_update on public.support_tickets for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy support_tickets_admin_delete on public.support_tickets for delete to authenticated using ((select private.is_admin()));

drop policy if exists admin_manage_support_messages on public.support_messages;
create policy support_messages_admin_read on public.support_messages for select to authenticated using ((select private.is_admin()));
create policy support_messages_admin_insert on public.support_messages for insert to authenticated with check ((select private.is_admin()));
create policy support_messages_admin_update on public.support_messages for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy support_messages_admin_delete on public.support_messages for delete to authenticated using ((select private.is_admin()));

-- Seed the existing fallback content so the CMS is live immediately.
insert into public.hero_section (title, subtitle, primary_button, primary_button_link, secondary_button, secondary_button_link)
select
  'We build systems, products, APIs, and platforms that scale.',
  'We design, build, and launch production-ready digital products for ambitious businesses—from modern websites to complex software platforms.',
  'Book a scoping call', '#contact', 'View our work', '#projects'
where not exists (select 1 from public.hero_section);

insert into public.site_settings (company_name, email, linkedin, github)
select 'BuildInByte', 'support@buildinbyte.in', 'https://linkedin.com/company/buildinbyte', 'https://github.com/buildinbyte-4'
where not exists (select 1 from public.site_settings);

insert into public.faq (question, answer, display_order)
select seed.question, seed.answer, seed.display_order
from (values
  ('What does BuildInByte build?', 'We design and deliver websites, custom applications, enterprise systems, APIs, dashboards, AI automation, and connected hardware solutions.', 10),
  ('How does a project begin?', 'Every engagement starts with a technical scoping conversation covering the business outcome, users, constraints, timeline, and launch plan.', 20),
  ('Can you customize an existing template?', 'Yes. We can adapt the templates in our catalog to your brand, content, workflows, integrations, and hosting requirements.', 30),
  ('Do you support products after launch?', 'Yes. We offer maintenance, monitoring, security updates, performance work, and iterative product development after launch.', 40),
  ('How quickly will you respond?', 'We aim to respond to qualified project and support inquiries within 24–48 business hours.', 50)
) as seed(question, answer, display_order)
where not exists (select 1 from public.faq);
