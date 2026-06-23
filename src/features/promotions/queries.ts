import "server-only";
import { promotions, businesses } from "@/lib/data/fixtures";
import type { Promotion } from "@/types";

function hydrate(promo: Promotion): Promotion {
  const business = businesses.find((b) => b.id === promo.businessId);
  return {
    ...promo,
    business: business
      ? {
          id: business.id,
          name: business.name,
          slug: business.slug,
          logoUrl: business.logoUrl,
        }
      : undefined,
  };
}

export async function getActivePromotions(
  tenantId: string,
  limit?: number,
): Promise<Promotion[]> {
  const now = Date.now();
  const list = promotions
    .filter(
      (p) =>
        p.tenantId === tenantId &&
        new Date(p.startsAt).getTime() <= now &&
        new Date(p.endsAt).getTime() >= now,
    )
    .map(hydrate);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}
