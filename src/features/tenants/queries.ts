import "server-only";
import { tenants, categories, neighborhoods } from "@/lib/data/fixtures";
import type { Tenant } from "@/types";

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  return tenants.find((t) => t.slug === slug && t.status === "published") ?? null;
}

export async function getAllTenants(): Promise<Tenant[]> {
  return tenants.filter((t) => t.status === "published");
}

export async function getCategories() {
  return categories;
}

export async function getNeighborhoods(tenantId: string) {
  return neighborhoods.filter((n) => n.tenantId === tenantId);
}

export async function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug) ?? null;
}
