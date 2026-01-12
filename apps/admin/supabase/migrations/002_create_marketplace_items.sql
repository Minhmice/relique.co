-- Create marketplace_items table
create table public.marketplace_items (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  description text not null,
  full_description text,
  price_usd numeric(12,2) not null,
  currency text default 'USD',
  image text not null,
  images jsonb,
  category text not null,
  status text not null check (status in ('draft', 'pending', 'published', 'suspended', 'unpublished', 'archived')) default 'draft',
  authenticated boolean default false,
  certificate text,
  authenticated_date timestamp with time zone,
  coa_issuer text,
  signed_by text,
  condition text,
  provenance text,
  seller_name text,
  seller_rating numeric(3,2),
  seller_verified boolean,
  is_featured boolean default false,
  featured_order integer,
  commission_rate numeric(5,2),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  created_by uuid references public.profiles(id) on delete set null
);

-- Enable RLS
alter table public.marketplace_items enable row level security;

-- Create policies
create policy "Public can view published items"
  on public.marketplace_items for select
  using (status = 'published');

-- Admin policies will be handled via service role in API routes
-- RLS is enabled but service role bypasses it

-- Create indexes
create index marketplace_items_slug_idx on public.marketplace_items(slug);
create index marketplace_items_status_idx on public.marketplace_items(status);
create index marketplace_items_category_idx on public.marketplace_items(category);
create index marketplace_items_is_featured_idx on public.marketplace_items(is_featured);
create index marketplace_items_created_at_idx on public.marketplace_items(created_at desc);
create index marketplace_items_created_by_idx on public.marketplace_items(created_by);

-- Create trigger for updated_at
create trigger set_marketplace_items_updated_at
  before update on public.marketplace_items
  for each row
  execute function public.handle_updated_at();

