import {
  pgTable,
  pgEnum,
  uuid,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  doublePrecision,
  numeric,
  jsonb,
  smallint,
  uniqueIndex,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------
export const appRoleEnum = pgEnum("app_role", [
  "consumer",
  "business",
  "admin",
]);
export const membershipRoleEnum = pgEnum("membership_role", [
  "owner",
  "manager",
  "staff",
]);
export const businessTypeEnum = pgEnum("business_type", [
  "empresa",
  "restaurante",
  "servico",
  "hotel",
  "loja",
  "autonomo",
]);
export const entityStatusEnum = pgEnum("entity_status", [
  "draft",
  "pending",
  "published",
  "blocked",
]);
export const planTierEnum = pgEnum("plan_tier", ["free", "premium", "gold"]);
export const analyticsTypeEnum = pgEnum("analytics_type", [
  "view",
  "whatsapp_click",
  "phone_click",
  "website_click",
  "favorite",
]);
export const favoriteEntityEnum = pgEnum("favorite_entity", [
  "business",
  "event",
  "promotion",
  "product",
]);
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "past_due",
  "canceled",
  "trialing",
]);
export const invoiceStatusEnum = pgEnum("invoice_status", [
  "pending",
  "paid",
  "overdue",
  "refunded",
  "canceled",
]);

// Reusable audit columns. Every tenant-scoped table carries these.
const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdBy: uuid("created_by"),
};

// ---------------------------------------------------------------------------
// Tenants (cities) - global
// ---------------------------------------------------------------------------
export const tenants = pgTable(
  "tenants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 80 }).notNull(),
    name: text("name").notNull(),
    state: varchar("state", { length: 2 }).notNull(),
    logoUrl: text("logo_url"),
    bannerUrl: text("banner_url"),
    theme: jsonb("theme").$type<Record<string, string>>(),
    status: entityStatusEnum("status").notNull().default("published"),
    lat: doublePrecision("lat"),
    lng: doublePrecision("lng"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [uniqueIndex("tenants_slug_idx").on(t.slug)],
);

// ---------------------------------------------------------------------------
// Profiles (1:1 with auth.users) - global
// ---------------------------------------------------------------------------
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // matches auth.users.id
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  phone: varchar("phone", { length: 20 }),
  defaultTenantId: uuid("default_tenant_id").references(() => tenants.id, {
    onDelete: "set null",
  }),
  appRole: appRoleEnum("app_role").notNull().default("consumer"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ---------------------------------------------------------------------------
// Categories - global catalog
// ---------------------------------------------------------------------------
export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 80 }).notNull(),
    name: text("name").notNull(),
    icon: varchar("icon", { length: 60 }).notNull().default("store"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [uniqueIndex("categories_slug_idx").on(t.slug)],
);

// ---------------------------------------------------------------------------
// Plans - global
// ---------------------------------------------------------------------------
export const plans = pgTable("plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  tier: planTierEnum("tier").notNull(),
  name: text("name").notNull(),
  priceMonthly: numeric("price_monthly", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  features: jsonb("features").$type<string[]>().notNull().default([]),
});

// ---------------------------------------------------------------------------
// Neighborhoods (bairros) - tenant scoped
// ---------------------------------------------------------------------------
export const neighborhoods = pgTable(
  "neighborhoods",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: varchar("slug", { length: 80 }).notNull(),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("neighborhoods_tenant_slug_idx").on(t.tenantId, t.slug),
    index("neighborhoods_tenant_idx").on(t.tenantId),
  ],
);

// ---------------------------------------------------------------------------
// Businesses - tenant scoped
// ---------------------------------------------------------------------------
export const businesses = pgTable(
  "businesses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 120 }).notNull(),
    name: text("name").notNull(),
    type: businessTypeEnum("type").notNull().default("empresa"),
    categoryId: uuid("category_id").references(() => categories.id),
    neighborhoodId: uuid("neighborhood_id").references(() => neighborhoods.id),
    description: text("description").notNull().default(""),
    shortDescription: text("short_description").notNull().default(""),
    logoUrl: text("logo_url"),
    coverUrl: text("cover_url"),
    whatsapp: varchar("whatsapp", { length: 20 }),
    phone: varchar("phone", { length: 20 }),
    instagram: text("instagram"),
    website: text("website"),
    address: text("address").notNull().default(""),
    lat: doublePrecision("lat"),
    lng: doublePrecision("lng"),
    status: entityStatusEnum("status").notNull().default("draft"),
    isFeatured: boolean("is_featured").notNull().default(false),
    planTier: planTierEnum("plan_tier").notNull().default("free"),
    priceLevel: smallint("price_level").notNull().default(2),
    ratingAvg: numeric("rating_avg", { precision: 3, scale: 2 })
      .notNull()
      .default("0"),
    ratingCount: integer("rating_count").notNull().default(0),
    tags: jsonb("tags").$type<string[]>().notNull().default([]),
    gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("businesses_tenant_slug_idx").on(t.tenantId, t.slug),
    index("businesses_tenant_idx").on(t.tenantId),
    index("businesses_category_idx").on(t.categoryId),
    index("businesses_status_idx").on(t.status),
  ],
);

// ---------------------------------------------------------------------------
// Memberships (profile <-> business)
// ---------------------------------------------------------------------------
export const memberships = pgTable(
  "memberships",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    role: membershipRoleEnum("role").notNull().default("owner"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("memberships_profile_business_idx").on(
      t.profileId,
      t.businessId,
    ),
    index("memberships_business_idx").on(t.businessId),
  ],
);

// ---------------------------------------------------------------------------
// Business hours
// ---------------------------------------------------------------------------
export const businessHours = pgTable(
  "business_hours",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    weekday: smallint("weekday").notNull(), // 0 = Sunday
    opensAt: varchar("opens_at", { length: 5 }),
    closesAt: varchar("closes_at", { length: 5 }),
    closed: boolean("closed").notNull().default(false),
  },
  (t) => [index("business_hours_business_idx").on(t.businessId)],
);

// ---------------------------------------------------------------------------
// Media (polymorphic)
// ---------------------------------------------------------------------------
export const media = pgTable(
  "media",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    ownerType: varchar("owner_type", { length: 40 }).notNull(),
    ownerId: uuid("owner_id").notNull(),
    url: text("url").notNull(),
    kind: varchar("kind", { length: 10 }).notNull().default("image"),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (t) => [index("media_owner_idx").on(t.ownerType, t.ownerId)],
);

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------
export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    price: numeric("price", { precision: 10, scale: 2 }).notNull().default("0"),
    imageUrl: text("image_url"),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps,
  },
  (t) => [index("products_business_idx").on(t.businessId)],
);

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------
export const services = pgTable(
  "services",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    priceFrom: numeric("price_from", { precision: 10, scale: 2 }),
    ...timestamps,
  },
  (t) => [index("services_business_idx").on(t.businessId)],
);

// ---------------------------------------------------------------------------
// Promotions
// ---------------------------------------------------------------------------
export const promotions = pgTable(
  "promotions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    bannerUrl: text("banner_url"),
    discountLabel: varchar("discount_label", { length: 40 }),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
    rules: text("rules"),
    couponCode: varchar("coupon_code", { length: 40 }),
    status: entityStatusEnum("status").notNull().default("published"),
    ...timestamps,
  },
  (t) => [
    index("promotions_tenant_idx").on(t.tenantId),
    index("promotions_business_idx").on(t.businessId),
  ],
);

// ---------------------------------------------------------------------------
// Coupons + redemptions
// ---------------------------------------------------------------------------
export const coupons = pgTable(
  "coupons",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    promotionId: uuid("promotion_id").references(() => promotions.id, {
      onDelete: "cascade",
    }),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    code: varchar("code", { length: 40 }).notNull(),
    maxRedemptions: integer("max_redemptions"),
    redeemedCount: integer("redeemed_count").notNull().default(0),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    ...timestamps,
  },
  (t) => [uniqueIndex("coupons_tenant_code_idx").on(t.tenantId, t.code)],
);

export const couponRedemptions = pgTable(
  "coupon_redemptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    couponId: uuid("coupon_id")
      .notNull()
      .references(() => coupons.id, { onDelete: "cascade" }),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    redeemedAt: timestamp("redeemed_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("coupon_redemptions_unique_idx").on(t.couponId, t.profileId),
  ],
);

// ---------------------------------------------------------------------------
// Events + tickets
// ---------------------------------------------------------------------------
export const events = pgTable(
  "events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    businessId: uuid("business_id").references(() => businesses.id, {
      onDelete: "set null",
    }),
    slug: varchar("slug", { length: 120 }).notNull(),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    bannerUrl: text("banner_url"),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }),
    venue: text("venue").notNull().default(""),
    address: text("address").notNull().default(""),
    lat: doublePrecision("lat"),
    lng: doublePrecision("lng"),
    isFree: boolean("is_free").notNull().default(true),
    ticketFrom: numeric("ticket_from", { precision: 10, scale: 2 }),
    status: entityStatusEnum("status").notNull().default("published"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("events_tenant_slug_idx").on(t.tenantId, t.slug),
    index("events_tenant_idx").on(t.tenantId),
    index("events_starts_at_idx").on(t.startsAt),
  ],
);

export const eventTickets = pgTable(
  "event_tickets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    price: numeric("price", { precision: 10, scale: 2 })
      .notNull()
      .default("0"),
    quantity: integer("quantity"),
    ...timestamps,
  },
  (t) => [index("event_tickets_event_idx").on(t.eventId)],
);

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------
export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    profileId: uuid("profile_id").references(() => profiles.id, {
      onDelete: "set null",
    }),
    rating: smallint("rating").notNull(),
    comment: text("comment").notNull().default(""),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("reviews_business_profile_idx").on(t.businessId, t.profileId),
    index("reviews_business_idx").on(t.businessId),
  ],
);

// ---------------------------------------------------------------------------
// Favorites (polymorphic)
// ---------------------------------------------------------------------------
export const favorites = pgTable(
  "favorites",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    entityType: favoriteEntityEnum("entity_type").notNull(),
    entityId: uuid("entity_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("favorites_unique_idx").on(
      t.profileId,
      t.entityType,
      t.entityId,
    ),
    index("favorites_profile_idx").on(t.profileId),
  ],
);

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------
export const news = pgTable(
  "news",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 160 }).notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    content: text("content").notNull().default(""),
    coverUrl: text("cover_url"),
    author: text("author").notNull().default(""),
    publishedAt: timestamp("published_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    status: entityStatusEnum("status").notNull().default("published"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("news_tenant_slug_idx").on(t.tenantId, t.slug),
    index("news_tenant_idx").on(t.tenantId),
  ],
);

// ---------------------------------------------------------------------------
// Banners / ads
// ---------------------------------------------------------------------------
export const banners = pgTable(
  "banners",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    businessId: uuid("business_id").references(() => businesses.id, {
      onDelete: "cascade",
    }),
    title: text("title").notNull(),
    imageUrl: text("image_url").notNull(),
    linkUrl: text("link_url"),
    position: varchar("position", { length: 40 }).notNull().default("home_top"),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps,
  },
  (t) => [index("banners_tenant_position_idx").on(t.tenantId, t.position)],
);

// ---------------------------------------------------------------------------
// Subscriptions + invoices (Asaas)
// ---------------------------------------------------------------------------
export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    planId: uuid("plan_id")
      .notNull()
      .references(() => plans.id),
    status: subscriptionStatusEnum("status").notNull().default("trialing"),
    asaasSubscriptionId: text("asaas_subscription_id"),
    currentPeriodStart: timestamp("current_period_start", {
      withTimezone: true,
    }),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    ...timestamps,
  },
  (t) => [index("subscriptions_business_idx").on(t.businessId)],
);

export const invoices = pgTable(
  "invoices",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    subscriptionId: uuid("subscription_id").references(() => subscriptions.id, {
      onDelete: "set null",
    }),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    asaasPaymentId: text("asaas_payment_id"),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    status: invoiceStatusEnum("status").notNull().default("pending"),
    method: varchar("method", { length: 20 }),
    dueDate: timestamp("due_date", { withTimezone: true }),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    ...timestamps,
  },
  (t) => [index("invoices_business_idx").on(t.businessId)],
);

// ---------------------------------------------------------------------------
// Analytics events (append-only)
// ---------------------------------------------------------------------------
export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    businessId: uuid("business_id").references(() => businesses.id, {
      onDelete: "cascade",
    }),
    type: analyticsTypeEnum("type").notNull(),
    profileId: uuid("profile_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("analytics_business_idx").on(t.businessId),
    index("analytics_type_idx").on(t.type),
    index("analytics_created_idx").on(t.createdAt),
  ],
);

export const schema = {
  tenants,
  profiles,
  categories,
  plans,
  neighborhoods,
  businesses,
  memberships,
  businessHours,
  media,
  products,
  services,
  promotions,
  coupons,
  couponRedemptions,
  events,
  eventTickets,
  reviews,
  favorites,
  news,
  banners,
  subscriptions,
  invoices,
  analyticsEvents,
};

// Helper marker so future migrations remember to add reserved modules.
export const RESERVED_FUTURE_MODULES = sql`-- jobs, real_estate, local_products`;
