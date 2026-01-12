
# 🚀 Relique CRM Production Setup

This guide covers the professional setup required to move from local development to a secure, high-performance production environment.

## 1. Supabase Backend Infrastructure

### Core Tables & Security
Ensure your database follows strict Row Level Security (RLS) policies. Run this optimized SQL in your Supabase Editor:

```sql
-- Create an audit_logs table for persistent tracking
create table public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  actor_id uuid references auth.users,
  action text not null,
  entity_type text,
  entity_id text,
  metadata jsonb,
  created_at timestamp with time zone default now()
);

-- Enable RLS on audit_logs
alter table audit_logs enable row level security;
create policy "Admins can view logs" on audit_logs for select using (auth.jwt() ->> 'role' = 'admin');

-- Optimized Marketplace Schema
create table public.marketplace_items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  athlete text,
  category text,
  price_usd numeric(12,2),
  status text check (status in ('draft', 'published', 'archived')) default 'draft',
  is_featured boolean default false,
  featured_order integer,
  cover_image_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

## 2. CI/CD & Deployment (Vercel)

### Environment Variable Checklist
Set these in your Vercel Project Settings:
- `NEXT_PUBLIC_SUPABASE_URL`: Your project endpoint.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Client-side safe key.
- `SUPABASE_SERVICE_ROLE_KEY`: **(Keep Secret)** Only for secure server-side operations.
- `RELIQUE_ADMIN_OTP_SECRET`: If implementing dynamic 2FA.

### Deployment Workflow
1. Push to `main` for production.
2. Push to any other branch for a dynamic preview environment.
3. Vercel automatically handles the build using the provided `importmap`.

## 3. Post-Deployment Checklist
- [ ] Verify SSL certificates are active.
- [ ] Test the 2FA flow with the static `123456` code (or production secret).
- [ ] Confirm `Audit Logs` are populating after making changes to items.
- [ ] Check `Carousel Manager` reordering on mobile vs desktop.

---

## 🔐 Credentials Reminder
- **Email**: `admin@relique.co`
- **Password**: `admin123`
- **Static OTP**: `123456` (Must be replaced with dynamic TOTP for production scaling)
