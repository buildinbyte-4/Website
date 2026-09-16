alter table public.products
  add column if not exists offering_type text;

update public.products
set offering_type = case
  when coalesce(demo_url, '') ~* '/templates/'
    or coalesce(name, '') ~* '(template|aurelia|buildinbyte.*hotel|luxury hotel|real estate|elecstore|kanchi market|scsvmv|hostel management)'
    then 'website_template'
  else 'custom_system'
end
where offering_type is null
   or offering_type not in ('custom_system', 'website_template');

alter table public.products
  alter column offering_type set default 'custom_system',
  alter column offering_type set not null;

alter table public.products
  add constraint products_offering_type_check
  check (offering_type in ('custom_system', 'website_template'));

comment on column public.products.offering_type is
  'Controls whether a catalog item is shown as a custom system or website template.';
