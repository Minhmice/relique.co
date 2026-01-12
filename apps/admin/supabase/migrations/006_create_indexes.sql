-- Additional indexes for performance optimization
-- Most indexes are created in table migrations, this file is for additional ones

-- Full-text search index on marketplace items (if needed in future)
-- create index marketplace_items_title_description_idx on public.marketplace_items using gin(to_tsvector('english', title || ' ' || coalesce(description, '')));

-- Composite indexes for common queries
create index marketplace_items_status_featured_idx on public.marketplace_items(status, is_featured) where is_featured = true;
create index consigned_items_status_created_idx on public.consigned_items(status, created_at desc);

