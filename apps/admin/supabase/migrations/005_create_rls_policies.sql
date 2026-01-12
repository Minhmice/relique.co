-- Additional RLS policies (most are created in table migrations)
-- This file contains any additional policies needed

-- Marketplace items: Allow authenticated users to view their own draft items
create policy "Users can view own draft items"
  on public.marketplace_items for select
  using (
    auth.uid() = created_by 
    and status in ('draft', 'pending')
  );

-- Consigned items: No public access (admin-only via service role)
-- This is intentionally left empty as all access is via service role

-- Audit logs: No public access (admin-only via service role)
-- This is intentionally left empty as all access is via service role

