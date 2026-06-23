import Image from "next/image";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { getCategories } from "@/features/tenants/queries";
import {
  getFeaturedBusinesses,
  getPopularRestaurants,
} from "@/features/businesses/queries";
import { getActivePromotions } from "@/features/promotions/queries";
import { getUpcomingEvents } from "@/features/events/queries";
import { getLatestNews } from "@/features/news/queries";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { CategoryGrid } from "@/components/category-grid";
import { BusinessCard } from "@/components/business-card";
import { PromotionCard } from "@/components/promotion-card";
import { EventCard } from "@/components/event-card";
import { CouponCard } from "@/features/promotions/components/coupon-card";
import { NewsCard } from "@/features/news/components/news-card";

export const revalidate = 600;

type Params = { params: Promise<{ city: string }> };

export default async function CityHomePage({ params }: Params) {
  const { city } = await params;
  const tenant = await requireTenant(city);

  const [categories, featured, restaurants, promotions, events, news] =
    await Promise.all([
      getCategories(),
      getFeaturedBusinesses(tenant.id, 6),
      getPopularRestaurants(tenant.id, 6),
      getActivePromotions(tenant.id, 6),
      getUpcomingEvents(tenant.id, 4),
      getLatestNews(tenant.id, 3),
    ]);

  const coupons = promotions.filter((p) => p.couponCode);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-muted">
          {tenant.bannerUrl && (
            <Image
              src={tenant.bannerUrl}
              alt={tenant.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/45 to-background" />
        </div>
        <div className="container relative z-10 flex flex-col items-center py-16 text-center text-white sm:py-24">
          <h1 className="max-w-2xl text-balance font-display text-3xl font-extrabold leading-tight sm:text-5xl">
            Descubra o melhor de {tenant.name}
          </h1>
          <p className="mt-3 max-w-lg text-white/90">
            Empresas, restaurantes, eventos e promoções perto de você.
          </p>
          <div className="mt-7 w-full max-w-2xl">
            <SearchBar citySlug={tenant.slug} size="lg" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container -mt-6 relative z-20">
        <div className="rounded-3xl border border-border bg-card p-4 shadow-card sm:p-6">
          <CategoryGrid categories={categories} citySlug={tenant.slug} />
        </div>
      </section>

      {/* Promotions */}
      {promotions.length > 0 && (
        <section className="container mt-12">
          <SectionHeading
            title="Promoções em destaque"
            subtitle="Ofertas imperdíveis na sua cidade"
            href={`/${tenant.slug}/promocoes`}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {promotions.slice(0, 3).map((promotion) => (
              <PromotionCard
                key={promotion.id}
                promotion={promotion}
                citySlug={tenant.slug}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured businesses */}
      {featured.length > 0 && (
        <section className="container mt-12">
          <SectionHeading
            title="Empresas em destaque"
            subtitle="Os negócios mais bem avaliados"
            href={`/${tenant.slug}/busca`}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                citySlug={tenant.slug}
              />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming events */}
      {events.length > 0 && (
        <section className="container mt-12">
          <SectionHeading
            title="Eventos próximos"
            subtitle="O que vai rolar na cidade"
            href={`/${tenant.slug}/eventos`}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event.id} event={event} citySlug={tenant.slug} />
            ))}
          </div>
        </section>
      )}

      {/* Popular restaurants */}
      {restaurants.length > 0 && (
        <section className="container mt-12">
          <SectionHeading
            title="Restaurantes populares"
            subtitle={`Onde comer bem em ${tenant.name}`}
            href={`/${tenant.slug}/categorias/restaurantes`}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                citySlug={tenant.slug}
              />
            ))}
          </div>
        </section>
      )}

      {/* Coupons */}
      {coupons.length > 0 && (
        <section className="container mt-12">
          <SectionHeading
            title="Cupons de desconto"
            subtitle="Use e economize"
            href={`/${tenant.slug}/promocoes`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coupons.map((promotion) => (
              <CouponCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        </section>
      )}

      {/* News */}
      {news.length > 0 && (
        <section className="container mt-12">
          <SectionHeading
            title="Notícias locais"
            subtitle="Fique por dentro da cidade"
            href={`/${tenant.slug}/noticias`}
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {news.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                citySlug={tenant.slug}
              />
            ))}
          </div>
        </section>
      )}

      <div className="h-12" />
    </>
  );
}
