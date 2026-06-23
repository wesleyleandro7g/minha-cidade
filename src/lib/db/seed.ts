/**
 * Seeds a Supabase/Postgres database with the demo data used by the public
 * area. Run with: `npm run db:seed` (requires DATABASE_URL).
 *
 * The fixtures use stable string ids (e.g. "t-salinas"); here we insert rows,
 * let Postgres generate UUIDs, and remap foreign keys via slug/fixture-id maps.
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "./schema";
import {
  tenants as fxTenants,
  categories as fxCategories,
  neighborhoods as fxNeighborhoods,
  businesses as fxBusinesses,
  products as fxProducts,
  promotions as fxPromotions,
  events as fxEvents,
  news as fxNews,
  reviews as fxReviews,
} from "@/lib/data/fixtures";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is required to seed the database.");
  process.exit(1);
}

const client = postgres(DATABASE_URL, { prepare: false, max: 1 });
const db = drizzle(client, { schema });

async function main() {
  console.log("Seeding database...");

  // Plans
  await db
    .insert(schema.plans)
    .values([
      { tier: "free", name: "Gratuito", priceMonthly: "0", features: ["Perfil básico"] },
      {
        tier: "premium",
        name: "Premium",
        priceMonthly: "49.90",
        features: ["Mais fotos", "Promoções", "Destaque nas buscas"],
      },
      {
        tier: "gold",
        name: "Ouro",
        priceMonthly: "99.90",
        features: ["Banner na home", "Dashboard avançado", "Prioridade em resultados"],
      },
    ])
    .onConflictDoNothing();

  // Categories
  const categoryMap = new Map<string, string>();
  for (const c of fxCategories) {
    const [row] = await db
      .insert(schema.categories)
      .values({ slug: c.slug, name: c.name, icon: c.icon })
      .onConflictDoNothing()
      .returning();
    if (row) categoryMap.set(c.id, row.id);
  }

  // Tenants
  const tenantMap = new Map<string, string>();
  for (const t of fxTenants) {
    const [row] = await db
      .insert(schema.tenants)
      .values({
        slug: t.slug,
        name: t.name,
        state: t.state,
        bannerUrl: t.bannerUrl,
        logoUrl: t.logoUrl,
        theme: t.theme ?? undefined,
        status: t.status,
        lat: t.lat,
        lng: t.lng,
      })
      .onConflictDoNothing()
      .returning();
    if (row) tenantMap.set(t.id, row.id);
  }

  // Neighborhoods
  const neighborhoodMap = new Map<string, string>();
  for (const n of fxNeighborhoods) {
    const tenantId = tenantMap.get(n.tenantId);
    if (!tenantId) continue;
    const [row] = await db
      .insert(schema.neighborhoods)
      .values({ tenantId, name: n.name, slug: n.slug })
      .onConflictDoNothing()
      .returning();
    if (row) neighborhoodMap.set(n.id, row.id);
  }

  // Businesses + hours
  const businessMap = new Map<string, string>();
  for (const b of fxBusinesses) {
    const tenantId = tenantMap.get(b.tenantId);
    if (!tenantId) continue;
    const [row] = await db
      .insert(schema.businesses)
      .values({
        tenantId,
        slug: b.slug,
        name: b.name,
        type: b.type,
        categoryId: categoryMap.get(b.categoryId),
        neighborhoodId: b.neighborhoodId
          ? neighborhoodMap.get(b.neighborhoodId)
          : null,
        description: b.description,
        shortDescription: b.shortDescription,
        logoUrl: b.logoUrl,
        coverUrl: b.coverUrl,
        whatsapp: b.whatsapp,
        phone: b.phone,
        instagram: b.instagram,
        website: b.website,
        address: b.address,
        lat: b.lat,
        lng: b.lng,
        status: b.status,
        isFeatured: b.isFeatured,
        planTier: b.planTier,
        priceLevel: b.priceLevel,
        ratingAvg: String(b.ratingAvg),
        ratingCount: b.ratingCount,
        tags: b.tags,
        gallery: b.gallery,
      })
      .onConflictDoNothing()
      .returning();
    if (!row) continue;
    businessMap.set(b.id, row.id);

    await db.insert(schema.businessHours).values(
      b.hours.map((h) => ({
        tenantId,
        businessId: row.id,
        weekday: h.weekday,
        opensAt: h.opensAt,
        closesAt: h.closesAt,
        closed: h.closed,
      })),
    );
  }

  // Products
  for (const p of fxProducts) {
    const businessId = businessMap.get(p.businessId);
    const fixtureBusiness = fxBusinesses.find((b) => b.id === p.businessId);
    const tenantId = fixtureBusiness
      ? tenantMap.get(fixtureBusiness.tenantId)
      : undefined;
    if (!businessId || !tenantId) continue;
    await db.insert(schema.products).values({
      tenantId,
      businessId,
      name: p.name,
      description: p.description,
      price: String(p.price),
      imageUrl: p.imageUrl,
    });
  }

  // Promotions
  for (const p of fxPromotions) {
    const tenantId = tenantMap.get(p.tenantId);
    const businessId = businessMap.get(p.businessId);
    if (!tenantId || !businessId) continue;
    await db.insert(schema.promotions).values({
      tenantId,
      businessId,
      title: p.title,
      description: p.description,
      bannerUrl: p.bannerUrl,
      discountLabel: p.discountLabel,
      startsAt: new Date(p.startsAt),
      endsAt: new Date(p.endsAt),
      rules: p.rules,
      couponCode: p.couponCode,
    });
  }

  // Events
  for (const e of fxEvents) {
    const tenantId = tenantMap.get(e.tenantId);
    if (!tenantId) continue;
    await db.insert(schema.events).values({
      tenantId,
      businessId: e.businessId ? businessMap.get(e.businessId) : null,
      slug: e.slug,
      name: e.name,
      description: e.description,
      bannerUrl: e.bannerUrl,
      startsAt: new Date(e.startsAt),
      endsAt: e.endsAt ? new Date(e.endsAt) : null,
      venue: e.venue,
      address: e.address,
      lat: e.lat,
      lng: e.lng,
      isFree: e.isFree,
      ticketFrom: e.ticketFrom != null ? String(e.ticketFrom) : null,
    });
  }

  // News
  for (const n of fxNews) {
    const tenantId = tenantMap.get(n.tenantId);
    if (!tenantId) continue;
    await db.insert(schema.news).values({
      tenantId,
      slug: n.slug,
      title: n.title,
      excerpt: n.excerpt,
      coverUrl: n.coverUrl,
      author: n.author,
      publishedAt: new Date(n.publishedAt),
    });
  }

  // Reviews
  for (const r of fxReviews) {
    const businessId = businessMap.get(r.businessId);
    const fixtureBusiness = fxBusinesses.find((b) => b.id === r.businessId);
    const tenantId = fixtureBusiness
      ? tenantMap.get(fixtureBusiness.tenantId)
      : undefined;
    if (!businessId || !tenantId) continue;
    await db.insert(schema.reviews).values({
      tenantId,
      businessId,
      rating: r.rating,
      comment: r.comment,
    });
  }

  console.log("Seed complete.");
  await client.end();
}

main().catch(async (error) => {
  console.error(error);
  await client.end();
  process.exit(1);
});
