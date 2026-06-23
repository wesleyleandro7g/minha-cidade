import "server-only";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTenantBySlug } from "@/features/tenants/queries";
import { TENANT_HEADER } from "./constants";
import type { Tenant } from "@/types";

/**
 * Reads the tenant slug injected by the middleware and resolves the tenant.
 * Falls back to the explicit slug argument when provided (e.g. from a route
 * param) so it works in both layouts and pages.
 */
export async function getTenant(slug?: string): Promise<Tenant | null> {
  let citySlug = slug;
  if (!citySlug) {
    const headerList = await headers();
    citySlug = headerList.get(TENANT_HEADER) ?? undefined;
  }
  if (!citySlug) return null;
  return getTenantBySlug(citySlug);
}

/** Resolve the tenant or render the 404 page. */
export async function requireTenant(slug?: string): Promise<Tenant> {
  const tenant = await getTenant(slug);
  if (!tenant) notFound();
  return tenant;
}
