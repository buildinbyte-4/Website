create table public.payment_orders (
  id uuid primary key default gen_random_uuid(), provider text not null default 'razorpay' check (provider = 'razorpay'),
  idempotency_key uuid not null unique, razorpay_order_id text unique, razorpay_payment_id text unique,
  product_sku text not null, expected_amount integer not null check (expected_amount >= 100),
  currency text not null check (currency ~ '^[A-Z]{3}$'), country_code text check (country_code is null or country_code ~ '^[A-Z]{2}$'),
  customer_email text not null, customer_name text not null, user_id uuid references auth.users(id) on delete set null,
  status text not null default 'creating' check (status in ('creating', 'pending', 'paid', 'failed', 'refunded')),
  fulfillment_status text not null default 'locked' check (fulfillment_status in ('locked', 'ready', 'delivered')),
  download_object_path text, paid_at timestamptz, refunded_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index payment_orders_user_created_idx on public.payment_orders (user_id, created_at desc);
create index payment_orders_customer_email_idx on public.payment_orders (lower(customer_email), created_at desc);

create table public.payment_webhook_events (
  event_id text primary key, event_type text not null, received_at timestamptz not null default now(),
  processed_at timestamptz, processing_error text
);

alter table public.payment_orders enable row level security;
alter table public.payment_webhook_events enable row level security;
revoke all on public.payment_orders from public, anon, authenticated;
revoke all on public.payment_webhook_events from public, anon, authenticated;
grant select on public.payment_orders to authenticated;
grant all on public.payment_orders to service_role;
grant all on public.payment_webhook_events to service_role;
create policy "Users can read their own payment orders" on public.payment_orders for select to authenticated
using (user_id = (select auth.uid()));

drop trigger if exists set_payment_orders_updated_at on public.payment_orders;
create trigger set_payment_orders_updated_at before update on public.payment_orders
for each row execute function private.set_updated_at();

comment on table public.payment_orders is 'Server-owned Razorpay orders. Writes require the server secret; customers may only read rows linked to their auth user.';
comment on column public.payment_orders.download_object_path is 'Private Storage object path. Never a public URL.';
comment on table public.payment_webhook_events is 'Razorpay event IDs used to reject duplicate webhook deliveries.';
