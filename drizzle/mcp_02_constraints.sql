ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "banners" ADD CONSTRAINT "banners_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "banners" ADD CONSTRAINT "banners_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "business_hours" ADD CONSTRAINT "business_hours_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "business_hours" ADD CONSTRAINT "business_hours_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "businesses" ADD CONSTRAINT "businesses_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "businesses" ADD CONSTRAINT "businesses_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;

ALTER TABLE "businesses" ADD CONSTRAINT "businesses_neighborhood_id_neighborhoods_id_fk" FOREIGN KEY ("neighborhood_id") REFERENCES "public"."neighborhoods"("id") ON DELETE no action ON UPDATE no action;

ALTER TABLE "coupon_redemptions" ADD CONSTRAINT "coupon_redemptions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "coupon_redemptions" ADD CONSTRAINT "coupon_redemptions_coupon_id_coupons_id_fk" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "coupon_redemptions" ADD CONSTRAINT "coupon_redemptions_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "coupons" ADD CONSTRAINT "coupons_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "coupons" ADD CONSTRAINT "coupons_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "coupons" ADD CONSTRAINT "coupons_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "event_tickets" ADD CONSTRAINT "event_tickets_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "event_tickets" ADD CONSTRAINT "event_tickets_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "events" ADD CONSTRAINT "events_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "events" ADD CONSTRAINT "events_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;

ALTER TABLE "favorites" ADD CONSTRAINT "favorites_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "favorites" ADD CONSTRAINT "favorites_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "invoices" ADD CONSTRAINT "invoices_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "invoices" ADD CONSTRAINT "invoices_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE set null ON UPDATE no action;

ALTER TABLE "invoices" ADD CONSTRAINT "invoices_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "memberships" ADD CONSTRAINT "memberships_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "memberships" ADD CONSTRAINT "memberships_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "memberships" ADD CONSTRAINT "memberships_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "neighborhoods" ADD CONSTRAINT "neighborhoods_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "news" ADD CONSTRAINT "news_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "products" ADD CONSTRAINT "products_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "products" ADD CONSTRAINT "products_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "profiles" ADD CONSTRAINT "profiles_default_tenant_id_tenants_id_fk" FOREIGN KEY ("default_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;

ALTER TABLE "promotions" ADD CONSTRAINT "promotions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "promotions" ADD CONSTRAINT "promotions_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "reviews" ADD CONSTRAINT "reviews_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "reviews" ADD CONSTRAINT "reviews_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;

ALTER TABLE "services" ADD CONSTRAINT "services_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "services" ADD CONSTRAINT "services_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE no action ON UPDATE no action;

CREATE INDEX "analytics_business_idx" ON "analytics_events" USING btree ("business_id");

CREATE INDEX "analytics_type_idx" ON "analytics_events" USING btree ("type");

CREATE INDEX "analytics_created_idx" ON "analytics_events" USING btree ("created_at");

CREATE INDEX "banners_tenant_position_idx" ON "banners" USING btree ("tenant_id","position");

CREATE INDEX "business_hours_business_idx" ON "business_hours" USING btree ("business_id");

CREATE UNIQUE INDEX "businesses_tenant_slug_idx" ON "businesses" USING btree ("tenant_id","slug");

CREATE INDEX "businesses_tenant_idx" ON "businesses" USING btree ("tenant_id");

CREATE INDEX "businesses_category_idx" ON "businesses" USING btree ("category_id");

CREATE INDEX "businesses_status_idx" ON "businesses" USING btree ("status");

CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");

CREATE UNIQUE INDEX "coupon_redemptions_unique_idx" ON "coupon_redemptions" USING btree ("coupon_id","profile_id");

CREATE UNIQUE INDEX "coupons_tenant_code_idx" ON "coupons" USING btree ("tenant_id","code");

CREATE INDEX "event_tickets_event_idx" ON "event_tickets" USING btree ("event_id");

CREATE UNIQUE INDEX "events_tenant_slug_idx" ON "events" USING btree ("tenant_id","slug");

CREATE INDEX "events_tenant_idx" ON "events" USING btree ("tenant_id");

CREATE INDEX "events_starts_at_idx" ON "events" USING btree ("starts_at");

CREATE UNIQUE INDEX "favorites_unique_idx" ON "favorites" USING btree ("profile_id","entity_type","entity_id");

CREATE INDEX "favorites_profile_idx" ON "favorites" USING btree ("profile_id");

CREATE INDEX "invoices_business_idx" ON "invoices" USING btree ("business_id");

CREATE INDEX "media_owner_idx" ON "media" USING btree ("owner_type","owner_id");

CREATE UNIQUE INDEX "memberships_profile_business_idx" ON "memberships" USING btree ("profile_id","business_id");

CREATE INDEX "memberships_business_idx" ON "memberships" USING btree ("business_id");

CREATE UNIQUE INDEX "neighborhoods_tenant_slug_idx" ON "neighborhoods" USING btree ("tenant_id","slug");

CREATE INDEX "neighborhoods_tenant_idx" ON "neighborhoods" USING btree ("tenant_id");

CREATE UNIQUE INDEX "news_tenant_slug_idx" ON "news" USING btree ("tenant_id","slug");

CREATE INDEX "news_tenant_idx" ON "news" USING btree ("tenant_id");

CREATE INDEX "products_business_idx" ON "products" USING btree ("business_id");

CREATE INDEX "promotions_tenant_idx" ON "promotions" USING btree ("tenant_id");

CREATE INDEX "promotions_business_idx" ON "promotions" USING btree ("business_id");

CREATE UNIQUE INDEX "reviews_business_profile_idx" ON "reviews" USING btree ("business_id","profile_id");

CREATE INDEX "reviews_business_idx" ON "reviews" USING btree ("business_id");

CREATE INDEX "services_business_idx" ON "services" USING btree ("business_id");

CREATE INDEX "subscriptions_business_idx" ON "subscriptions" USING btree ("business_id");

CREATE UNIQUE INDEX "tenants_slug_idx" ON "tenants" USING btree ("slug");