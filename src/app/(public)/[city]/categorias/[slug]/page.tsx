import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { getCategoryBySlug } from "@/features/tenants/queries";
import { searchBusinesses } from "@/features/search/queries";
import { SectionHeading } from "@/components/section-heading";
import { BusinessCard } from "@/components/business-card";
import { CategoryIcon } from "@/components/category-icon";

export const revalidate = 600;

type Params = { params: Promise<{ city: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city, slug } = await params;
  const tenant = await requireTenant(city);
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `${category.name} em ${tenant.name}: encontre as melhores opções.`,
  };
}

export default async function CategoryPage({ params }: Params) {
  const { city, slug } = await params;
  const tenant = await requireTenant(city);
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const businesses = await searchBusinesses(tenant.id, {
    categorySlug: slug,
    sort: "rating",
  });

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <CategoryIcon name={category.icon} className="h-6 w-6" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold">{category.name}</h1>
          <p className="text-sm text-muted-foreground">
            {businesses.length} estabelecimentos em {tenant.name}
          </p>
        </div>
      </div>

      {businesses.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          Nenhum estabelecimento nesta categoria ainda.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              citySlug={tenant.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
