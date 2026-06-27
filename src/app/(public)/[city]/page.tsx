import Link from "next/link";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { getCategories } from "@/features/tenants/queries";
import {
  getFeaturedBusinesses,
  getPopularRestaurants,
} from "@/features/businesses/queries";
import { getActivePromotions } from "@/features/promotions/queries";
import { getUpcomingEvents } from "@/features/events/queries";
import { getLatestNews } from "@/features/news/queries";
import { CategoryGrid } from "@/components/category-grid";
import { BusinessCard } from "@/components/business-card";
import { PromotionCard } from "@/components/promotion-card";
import { EventCard } from "@/components/event-card";
import { CouponCard } from "@/features/promotions/components/coupon-card";
import { NewsCard } from "@/features/news/components/news-card";
import { CityHomeHero } from "@/features/home/components/city-home-hero";
import { LivePulseBar } from "@/features/home/components/live-pulse-bar";
import { HomeSection } from "@/features/home/components/home-section";
import {
  ScrollRow,
  ScrollRowItem,
} from "@/features/home/components/scroll-row";
import {
  Compass,
  Ticket,
  Calendar,
  Utensils,
  Newspaper,
  Tag,
  Megaphone,
} from "lucide-react";

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
      <CityHomeHero tenant={tenant} />

      <LivePulseBar
        citySlug={tenant.slug}
        stats={{
          businesses: featured.length + restaurants.length,
          promotions: promotions.length,
          events: events.length,
          news: news.length,
        }}
      />

      {/* Categories */}
      <section className="container mt-10 sm:mt-12 relative z-20">
        <div className="rounded-[2rem] border border-border/60 bg-card/90 p-5 shadow-[0_20px_50px_-20px_rgba(16,24,40,0.18)] backdrop-blur-xl sm:p-7 dark:border-border/40 dark:bg-card/80">
          <p className="mb-4 text-center text-sm font-semibold text-muted-foreground sm:text-left">
            Navegue por categoria
          </p>
          <CategoryGrid categories={categories} citySlug={tenant.slug} />
        </div>
      </section>

      {(promotions.length > 0 || coupons.length > 0) && (
        <HomeSection
          eyebrow="Economize na cidade"
          icon={Tag}
          title="Promoções em destaque"
          subtitle="Ofertas exclusivas e descontos imperdíveis na sua região"
          href={`/${tenant.slug}/promocoes`}
          variant="accent"
        >
          {promotions.length > 0 && (
            <ScrollRow>
              {promotions.slice(0, 3).map((promotion) => (
                <ScrollRowItem key={promotion.id}>
                  <PromotionCard
                    promotion={promotion}
                    citySlug={tenant.slug}
                  />
                </ScrollRowItem>
              ))}
            </ScrollRow>
          )}

          {coupons.length > 0 && (
            <div
              className={
                promotions.length > 0
                  ? "mt-10 border-t border-primary/10 pt-10"
                  : undefined
              }
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10">
                  <Ticket className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                  Cupons ativos
                </span>
              </div>
              <ScrollRow className="mt-4 lg:grid-cols-3">
                {coupons.map((promotion) => (
                  <ScrollRowItem key={promotion.id}>
                    <CouponCard promotion={promotion} />
                  </ScrollRowItem>
                ))}
              </ScrollRow>
            </div>
          )}
        </HomeSection>
      )}

      {featured.length > 0 && (
        <HomeSection
          eyebrow="Guia de compras"
          icon={Compass}
          title="Empresas em destaque"
          subtitle="Os negócios locais mais bem avaliados e recomendados"
          href={`/${tenant.slug}/busca`}
        >
          <ScrollRow>
            {featured.map((business) => (
              <ScrollRowItem key={business.id}>
                <BusinessCard business={business} citySlug={tenant.slug} />
              </ScrollRowItem>
            ))}
          </ScrollRow>
        </HomeSection>
      )}

      {events.length > 0 && (
        <HomeSection
          eyebrow="Agenda cultural"
          icon={Calendar}
          title="Eventos próximos"
          subtitle="Fique por dentro do que vai movimentar a cidade"
          href={`/${tenant.slug}/eventos`}
          variant="muted"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event.id} event={event} citySlug={tenant.slug} />
            ))}
          </div>
        </HomeSection>
      )}

      {restaurants.length > 0 && (
        <HomeSection
          eyebrow="Gastronomia local"
          icon={Utensils}
          title="Restaurantes populares"
          subtitle={`Onde comer bem em ${tenant.name}`}
          href={`/${tenant.slug}/categorias/restaurantes`}
          variant="warm"
        >
          <ScrollRow>
            {restaurants.map((business) => (
              <ScrollRowItem key={business.id}>
                <BusinessCard business={business} citySlug={tenant.slug} />
              </ScrollRowItem>
            ))}
          </ScrollRow>
        </HomeSection>
      )}

      {news.length > 0 && (
        <HomeSection
          eyebrow="Informativo local"
          icon={Newspaper}
          title="Notícias locais"
          subtitle="Os acontecimentos mais importantes da região"
          href={`/${tenant.slug}/noticias`}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                citySlug={tenant.slug}
              />
            ))}
          </div>
        </HomeSection>
      )}

      <section className="container mt-16 sm:mt-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 text-center shadow-card sm:p-14">
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/8 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
            aria-hidden
          />
          <div className="grain-overlay pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary shadow-soft ring-1 ring-primary/15">
              <Megaphone className="h-6 w-6" />
            </span>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Divulgue sua empresa em {tenant.name}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Faça parte do guia oficial da cidade. Cadastre seu comércio,
              divulgue eventos, publique cupons e alcance milhares de clientes
              locais.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cadastro"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95"
              >
                Cadastrar meu negócio
              </Link>
              <Link
                href={`/${tenant.slug}/busca`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-7 text-sm font-semibold transition-all hover:bg-muted hover:scale-[1.02] active:scale-95"
              >
                Explorar guia
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16" />
    </>
  );
}
