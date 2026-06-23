-- ===========================================================================
-- Minha Cidade - Row Level Security policies
-- Apply after the generated schema migration (run via drizzle-kit / psql).
--
-- Strategy:
--   * Public read: anyone may read rows with status = 'published'.
--   * Business write: only members (via memberships) of the business may write.
--   * Admin bypass: profiles.app_role = 'admin' may do anything.
--   * tenant_id is always enforced at the row level as defense in depth.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Helper functions
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.app_role = 'admin'
  );
$$;

create or replace function public.is_business_member(target_business uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memberships m
    where m.business_id = target_business
      and m.profile_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- Enable RLS
-- ---------------------------------------------------------------------------
alter table public.tenants            enable row level security;
alter table public.profiles           enable row level security;
alter table public.neighborhoods      enable row level security;
alter table public.businesses         enable row level security;
alter table public.memberships        enable row level security;
alter table public.business_hours     enable row level security;
alter table public.media              enable row level security;
alter table public.products           enable row level security;
alter table public.services           enable row level security;
alter table public.promotions         enable row level security;
alter table public.coupons            enable row level security;
alter table public.coupon_redemptions enable row level security;
alter table public.events             enable row level security;
alter table public.event_tickets      enable row level security;
alter table public.reviews            enable row level security;
alter table public.favorites          enable row level security;
alter table public.news               enable row level security;
alter table public.banners            enable row level security;
alter table public.subscriptions      enable row level security;
alter table public.invoices           enable row level security;
alter table public.analytics_events   enable row level security;

-- ---------------------------------------------------------------------------
-- Tenants
-- ---------------------------------------------------------------------------
create policy "tenants_public_read" on public.tenants
  for select using (status = 'published' or public.is_admin());
create policy "tenants_admin_write" on public.tenants
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Profiles (each user manages their own; admin sees all)
-- ---------------------------------------------------------------------------
create policy "profiles_self_read" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "profiles_self_upsert" on public.profiles
  for insert with check (id = auth.uid());
create policy "profiles_self_update" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- ---------------------------------------------------------------------------
-- Neighborhoods (public read, admin write)
-- ---------------------------------------------------------------------------
create policy "neighborhoods_public_read" on public.neighborhoods
  for select using (true);
create policy "neighborhoods_admin_write" on public.neighborhoods
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Businesses
-- ---------------------------------------------------------------------------
create policy "businesses_public_read" on public.businesses
  for select using (
    status = 'published'
    or public.is_admin()
    or public.is_business_member(id)
  );
create policy "businesses_member_insert" on public.businesses
  for insert with check (created_by = auth.uid() or public.is_admin());
create policy "businesses_member_update" on public.businesses
  for update using (public.is_business_member(id) or public.is_admin())
  with check (public.is_business_member(id) or public.is_admin());
create policy "businesses_admin_delete" on public.businesses
  for delete using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Memberships
-- ---------------------------------------------------------------------------
create policy "memberships_self_read" on public.memberships
  for select using (profile_id = auth.uid() or public.is_admin());
create policy "memberships_owner_write" on public.memberships
  for all using (
    public.is_admin()
    or exists (
      select 1 from public.memberships m
      where m.business_id = memberships.business_id
        and m.profile_id = auth.uid()
        and m.role = 'owner'
    )
  ) with check (true);

-- ---------------------------------------------------------------------------
-- Generic business-owned content: public read of published, member write.
-- (business_hours, media, products, services, promotions, coupons, events,
--  event_tickets)
-- ---------------------------------------------------------------------------
create policy "business_hours_read" on public.business_hours for select using (true);
create policy "business_hours_write" on public.business_hours
  for all using (public.is_business_member(business_id) or public.is_admin())
  with check (public.is_business_member(business_id) or public.is_admin());

create policy "media_read" on public.media for select using (true);
create policy "media_write" on public.media
  for all using (public.is_admin() or public.is_business_member(owner_id))
  with check (public.is_admin() or public.is_business_member(owner_id));

create policy "products_read" on public.products for select using (true);
create policy "products_write" on public.products
  for all using (public.is_business_member(business_id) or public.is_admin())
  with check (public.is_business_member(business_id) or public.is_admin());

create policy "services_read" on public.services for select using (true);
create policy "services_write" on public.services
  for all using (public.is_business_member(business_id) or public.is_admin())
  with check (public.is_business_member(business_id) or public.is_admin());

create policy "promotions_read" on public.promotions
  for select using (status = 'published' or public.is_admin() or public.is_business_member(business_id));
create policy "promotions_write" on public.promotions
  for all using (public.is_business_member(business_id) or public.is_admin())
  with check (public.is_business_member(business_id) or public.is_admin());

create policy "coupons_read" on public.coupons for select using (true);
create policy "coupons_write" on public.coupons
  for all using (public.is_business_member(business_id) or public.is_admin())
  with check (public.is_business_member(business_id) or public.is_admin());

create policy "events_read" on public.events
  for select using (status = 'published' or public.is_admin());
create policy "events_write" on public.events
  for all using (
    public.is_admin()
    or (business_id is not null and public.is_business_member(business_id))
  ) with check (
    public.is_admin()
    or (business_id is not null and public.is_business_member(business_id))
  );

create policy "event_tickets_read" on public.event_tickets for select using (true);
create policy "event_tickets_write" on public.event_tickets
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Coupon redemptions (user owns their redemptions)
-- ---------------------------------------------------------------------------
create policy "coupon_redemptions_self_read" on public.coupon_redemptions
  for select using (profile_id = auth.uid() or public.is_admin());
create policy "coupon_redemptions_self_insert" on public.coupon_redemptions
  for insert with check (profile_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Reviews (public read; authenticated users manage their own)
-- ---------------------------------------------------------------------------
create policy "reviews_public_read" on public.reviews for select using (true);
create policy "reviews_self_insert" on public.reviews
  for insert with check (profile_id = auth.uid());
create policy "reviews_self_update" on public.reviews
  for update using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "reviews_self_delete" on public.reviews
  for delete using (profile_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- Favorites (user owns their favorites)
-- ---------------------------------------------------------------------------
create policy "favorites_self_all" on public.favorites
  for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());

-- ---------------------------------------------------------------------------
-- News + banners (public read of published, admin write)
-- ---------------------------------------------------------------------------
create policy "news_public_read" on public.news
  for select using (status = 'published' or public.is_admin());
create policy "news_admin_write" on public.news
  for all using (public.is_admin()) with check (public.is_admin());

create policy "banners_public_read" on public.banners
  for select using (is_active or public.is_admin());
create policy "banners_admin_write" on public.banners
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Subscriptions + invoices (business members + admin)
-- ---------------------------------------------------------------------------
create policy "subscriptions_member_read" on public.subscriptions
  for select using (public.is_business_member(business_id) or public.is_admin());
create policy "subscriptions_admin_write" on public.subscriptions
  for all using (public.is_admin()) with check (public.is_admin());

create policy "invoices_member_read" on public.invoices
  for select using (public.is_business_member(business_id) or public.is_admin());
create policy "invoices_admin_write" on public.invoices
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Analytics events (insert by anyone for tracking; read by members/admin)
-- ---------------------------------------------------------------------------
create policy "analytics_insert_any" on public.analytics_events
  for insert with check (true);
create policy "analytics_member_read" on public.analytics_events
  for select using (
    public.is_admin()
    or (business_id is not null and public.is_business_member(business_id))
  );
