import "server-only";
import { events } from "@/lib/data/fixtures";
import type { CityEvent } from "@/types";

export async function getUpcomingEvents(
  tenantId: string,
  limit?: number,
): Promise<CityEvent[]> {
  const now = Date.now();
  const list = events
    .filter(
      (e) => e.tenantId === tenantId && new Date(e.startsAt).getTime() >= now - 86_400_000,
    )
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export async function getEventBySlug(
  tenantId: string,
  slug: string,
): Promise<CityEvent | null> {
  return (
    events.find((e) => e.tenantId === tenantId && e.slug === slug) ?? null
  );
}
