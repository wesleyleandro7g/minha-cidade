import "server-only";
import {
  businesses,
  categories,
  neighborhoods,
  products,
  promotions,
  events,
  reviews,
} from "@/lib/data/fixtures";
import type { Business } from "@/types";

function hydrate(business: Business): Business {
  return {
    ...business,
    category: categories.find((c) => c.id === business.categoryId),
    neighborhood:
      neighborhoods.find((n) => n.id === business.neighborhoodId) ?? undefined,
  };
}

export async function getBusinesses(tenantId: string): Promise<Business[]> {
  return businesses
    .filter((b) => b.tenantId === tenantId && b.status === "published")
    .map(hydrate);
}

export async function getFeaturedBusinesses(
  tenantId: string,
  limit = 6,
): Promise<Business[]> {
  return (await getBusinesses(tenantId))
    .filter((b) => b.isFeatured)
    .sort((a, b) => planWeight(b) - planWeight(a) || b.ratingAvg - a.ratingAvg)
    .slice(0, limit);
}

export async function getPopularRestaurants(
  tenantId: string,
  limit = 6,
): Promise<Business[]> {
  return (await getBusinesses(tenantId))
    .filter((b) => b.type === "restaurante")
    .sort((a, b) => b.ratingCount - a.ratingCount)
    .slice(0, limit);
}

export async function getBusinessBySlug(
  tenantId: string,
  slug: string,
): Promise<Business | null> {
  const business = businesses.find(
    (b) => b.tenantId === tenantId && b.slug === slug,
  );
  return business ? hydrate(business) : null;
}

export async function getBusinessRelations(businessId: string) {
  return {
    products: products.filter((p) => p.businessId === businessId),
    promotions: promotions.filter((p) => p.businessId === businessId),
    events: events.filter((e) => e.businessId === businessId),
    reviews: reviews
      .filter((r) => r.businessId === businessId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
  };
}

export async function getBusinessSlugs(tenantId: string): Promise<string[]> {
  return businesses
    .filter((b) => b.tenantId === tenantId && b.status === "published")
    .map((b) => b.slug);
}

function planWeight(b: Business) {
  return b.planTier === "gold" ? 3 : b.planTier === "premium" ? 2 : 1;
}
