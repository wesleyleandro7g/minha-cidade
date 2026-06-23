import type { Metadata } from "next";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { getCategories, getNeighborhoods } from "@/features/tenants/queries";
import { searchBusinesses } from "@/features/search/queries";
import { SearchView } from "@/features/search/components/search-view";
import type { SearchFilters } from "@/types";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Encontre empresas, serviços, restaurantes e eventos na sua cidade.",
};

type Props = {
  params: Promise<{ city: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function SearchPage({ params, searchParams }: Props) {
  const { city } = await params;
  const sp = await searchParams;
  const tenant = await requireTenant(city);

  const filters: SearchFilters = {
    query: sp.q,
    categorySlug: sp.categoria,
    neighborhoodSlug: sp.bairro,
    priceLevel: sp.preco ? Number(sp.preco) : undefined,
    minRating: sp.nota ? Number(sp.nota) : undefined,
    openNow: sp.aberto === "1",
    sort: (sp.sort as SearchFilters["sort"]) ?? "relevance",
  };

  const [results, categories, neighborhoods] = await Promise.all([
    searchBusinesses(tenant.id, filters),
    getCategories(),
    getNeighborhoods(tenant.id),
  ]);

  return (
    <SearchView
      citySlug={tenant.slug}
      center={{ lat: tenant.lat ?? -16.17, lng: tenant.lng ?? -42.29 }}
      results={results}
      categories={categories}
      neighborhoods={neighborhoods}
      filters={{
        query: filters.query,
        categorySlug: filters.categorySlug,
        neighborhoodSlug: filters.neighborhoodSlug,
        priceLevel: filters.priceLevel,
        minRating: filters.minRating,
        openNow: filters.openNow,
        sort: filters.sort,
      }}
    />
  );
}
