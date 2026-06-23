import type { Metadata } from "next";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { getAllTenants, getCategories } from "@/features/tenants/queries";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BottomNav } from "@/components/layout/bottom-nav";

type Params = { params: Promise<{ city: string }> };

export async function generateStaticParams() {
  const tenants = await getAllTenants();
  return tenants.map((t) => ({ city: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city } = await params;
  const tenant = await requireTenant(city);
  return {
    title: {
      default: `Minha Cidade ${tenant.name}`,
      template: `%s | Minha Cidade ${tenant.name}`,
    },
    description: `O guia digital de ${tenant.name}/${tenant.state}: empresas, eventos, promoções, restaurantes e notícias locais.`,
    alternates: { canonical: `/${tenant.slug}` },
    openGraph: {
      title: `Minha Cidade ${tenant.name}`,
      description: `Descubra o melhor de ${tenant.name}/${tenant.state}.`,
      images: tenant.bannerUrl ? [tenant.bannerUrl] : undefined,
      type: "website",
    },
  };
}

export default async function CityLayout({
  children,
  params,
}: Params & { children: React.ReactNode }) {
  const { city } = await params;
  const tenant = await requireTenant(city);
  const categories = await getCategories();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader tenant={tenant} categories={categories} />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <SiteFooter tenant={tenant} categories={categories} />
      <BottomNav citySlug={tenant.slug} />
    </div>
  );
}
