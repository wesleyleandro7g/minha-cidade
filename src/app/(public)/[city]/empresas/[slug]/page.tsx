import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Star, BadgeCheck } from "lucide-react";
import { requireTenant } from "@/lib/tenant/get-tenant";
import {
  getBusinessBySlug,
  getBusinessRelations,
  getBusinessSlugs,
} from "@/features/businesses/queries";
import { getAllTenants } from "@/features/tenants/queries";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RatingStars } from "@/components/rating-stars";
import { PriceLevel } from "@/components/price-level";
import { FavoriteButton } from "@/components/favorite-button";
import { MapView } from "@/components/maps/map-view";
import { BusinessHours } from "@/features/businesses/components/business-hours";
import { BusinessGallery } from "@/features/businesses/components/business-gallery";
import { ContactActions } from "@/features/businesses/components/contact-actions";
import { ViewTracker } from "@/features/businesses/components/view-tracker";
import { ReviewList } from "@/features/reviews/components/review-list";
import { PromotionCard } from "@/components/promotion-card";

export const revalidate = 600;

type Params = { params: Promise<{ city: string; slug: string }> };

export async function generateStaticParams() {
  const tenants = await getAllTenants();
  const params: { city: string; slug: string }[] = [];
  for (const tenant of tenants) {
    const slugs = await getBusinessSlugs(tenant.id);
    slugs.forEach((slug) => params.push({ city: tenant.slug, slug }));
  }
  return params;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city, slug } = await params;
  const tenant = await requireTenant(city);
  const business = await getBusinessBySlug(tenant.id, slug);
  if (!business) return {};

  return {
    title: business.name,
    description: business.shortDescription || business.description.slice(0, 155),
    alternates: { canonical: `/${tenant.slug}/empresas/${business.slug}` },
    openGraph: {
      title: `${business.name} - ${tenant.name}`,
      description: business.shortDescription,
      images: business.coverUrl ? [business.coverUrl] : undefined,
      type: "website",
    },
  };
}

export default async function BusinessProfilePage({ params }: Params) {
  const { city, slug } = await params;
  const tenant = await requireTenant(city);
  const business = await getBusinessBySlug(tenant.id, slug);
  if (!business) notFound();

  const { products, promotions, events, reviews } = await getBusinessRelations(
    business.id,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    image: business.coverUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: tenant.name,
      addressRegion: tenant.state,
      addressCountry: "BR",
    },
    telephone: business.phone,
    aggregateRating: business.ratingCount
      ? {
          "@type": "AggregateRating",
          ratingValue: business.ratingAvg,
          reviewCount: business.ratingCount,
        }
      : undefined,
  };

  const href = `/${tenant.slug}/empresas/${business.slug}`;

  return (
    <article className="container py-6">
      <ViewTracker tenantId={tenant.id} businessId={business.id} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Main */}
        <div className="space-y-6">
          <BusinessGallery
            images={business.gallery.length ? business.gallery : business.coverUrl ? [business.coverUrl] : []}
            alt={business.name}
          />

          <header className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {business.logoUrl && (
                  <Image
                    src={business.logoUrl}
                    alt={`${business.name} logo`}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-xl border border-border object-cover"
                  />
                )}
                <div>
                  <h1 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                    {business.name}
                  </h1>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span>{business.category?.name}</span>
                    <span>&middot;</span>
                    <PriceLevel level={business.priceLevel} />
                    {business.neighborhood && (
                      <>
                        <span>&middot;</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {business.neighborhood.name}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <FavoriteButton
                variant="inline"
                item={{
                  id: business.id,
                  type: "business",
                  title: business.name,
                  image: business.coverUrl,
                  href,
                  subtitle: business.category?.name,
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">
                <Star className="h-4 w-4 fill-current" />
                {business.ratingAvg.toFixed(1)}
                <span className="font-normal text-muted-foreground">
                  ({business.ratingCount} avaliações)
                </span>
              </span>
              {business.planTier !== "free" && (
                <Badge variant="soft">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verificado
                </Badge>
              )}
              {business.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          <Tabs defaultValue="sobre">
            <TabsList className="flex w-full justify-start overflow-x-auto scrollbar-none">
              <TabsTrigger value="sobre">Sobre</TabsTrigger>
              {products.length > 0 && (
                <TabsTrigger value="produtos">Produtos</TabsTrigger>
              )}
              {promotions.length > 0 && (
                <TabsTrigger value="promocoes">Promoções</TabsTrigger>
              )}
              <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
            </TabsList>

            <TabsContent value="sobre" className="space-y-4">
              <p className="whitespace-pre-line leading-relaxed text-foreground/90">
                {business.description}
              </p>
              <BusinessHours hours={business.hours} />
            </TabsContent>

            {products.length > 0 && (
              <TabsContent value="produtos">
                <div className="grid gap-4 sm:grid-cols-2">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-3 rounded-2xl border border-border bg-card p-3"
                    >
                      {product.imageUrl && (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={88}
                          height={88}
                          className="h-20 w-20 rounded-xl object-cover"
                        />
                      )}
                      <div className="flex flex-col">
                        <h4 className="font-semibold leading-tight">
                          {product.name}
                        </h4>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {product.description}
                        </p>
                        <span className="mt-auto font-display font-bold text-primary">
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

            {promotions.length > 0 && (
              <TabsContent value="promocoes">
                <div className="grid gap-4 sm:grid-cols-2">
                  {promotions.map((promotion) => (
                    <PromotionCard
                      key={promotion.id}
                      promotion={promotion}
                      citySlug={tenant.slug}
                    />
                  ))}
                </div>
              </TabsContent>
            )}

            <TabsContent value="avaliacoes">
              <ReviewList reviews={reviews} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
            <ContactActions business={business} />
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{business.address}</span>
            </div>
          </div>

          <MapView
            center={{ lat: business.lat, lng: business.lng }}
            markers={[
              {
                id: business.id,
                lat: business.lat,
                lng: business.lng,
                label: business.name,
                active: true,
              },
            ]}
            className="h-56 w-full"
          />

          {events.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 font-display font-bold">Próximos eventos</h3>
              <ul className="space-y-2 text-sm">
                {events.map((event) => (
                  <li key={event.id} className="flex items-center justify-between">
                    <span className="line-clamp-1">{event.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
