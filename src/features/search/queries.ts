import "server-only";
import { getBusinesses } from "@/features/businesses/queries";
import type { Business, SearchFilters } from "@/types";

function isOpenNow(business: Business, now = new Date()): boolean {
  const today = business.hours.find((h) => h.weekday === now.getDay());
  if (!today || today.closed || !today.opensAt || !today.closesAt) return false;
  const [oh, om] = today.opensAt.split(":").map(Number);
  const [ch, cm] = today.closesAt.split(":").map(Number);
  const minutes = now.getHours() * 60 + now.getMinutes();
  const open = oh * 60 + om;
  let close = ch * 60 + cm;
  if (close <= open) close += 24 * 60; // crosses midnight
  return minutes >= open && minutes <= close;
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export async function searchBusinesses(
  tenantId: string,
  filters: SearchFilters,
): Promise<Business[]> {
  let results = await getBusinesses(tenantId);

  if (filters.query) {
    const q = normalize(filters.query);
    results = results.filter((b) => {
      const haystack = normalize(
        [b.name, b.shortDescription, b.description, ...b.tags].join(" "),
      );
      return haystack.includes(q);
    });
  }

  if (filters.categorySlug) {
    results = results.filter((b) => b.category?.slug === filters.categorySlug);
  }

  if (filters.neighborhoodSlug) {
    results = results.filter(
      (b) => b.neighborhood?.slug === filters.neighborhoodSlug,
    );
  }

  if (filters.priceLevel) {
    results = results.filter((b) => b.priceLevel <= filters.priceLevel!);
  }

  if (filters.minRating) {
    results = results.filter((b) => b.ratingAvg >= filters.minRating!);
  }

  if (filters.openNow) {
    results = results.filter((b) => isOpenNow(b));
  }

  switch (filters.sort) {
    case "rating":
      results = [...results].sort((a, b) => b.ratingAvg - a.ratingAvg);
      break;
    case "distance":
      // Without a user location we keep insertion order; the client can
      // re-sort by geolocation when available.
      break;
    default:
      results = [...results].sort(
        (a, b) =>
          Number(b.isFeatured) - Number(a.isFeatured) ||
          b.ratingAvg - a.ratingAvg,
      );
  }

  return results;
}

export { isOpenNow };
