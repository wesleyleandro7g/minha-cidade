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
import { ScrollReveal } from "@/components/scroll-reveal";
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
      <ScrollReveal>
        <section className="container mt-10 sm:mt-12 relative z-20">
          <div className="rounded-[2.5rem] border border-border bg-card/85 p-6 shadow-soft backdrop-blur-xl sm:p-8 dark:border-border/40">
            <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground sm:text-left">
              Navegue por categoria
            </p>
            <CategoryGrid categories={categories} citySlug={tenant.slug} />
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Promotions & Coupons */}
      {(promotions.length > 0 || coupons.length > 0) && (
        <ScrollReveal>
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
        </ScrollReveal>
      )}

      {/* Featured Businesses */}
      {featured.length > 0 && (
        <ScrollReveal>
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
        </ScrollReveal>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <ScrollReveal>
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
        </ScrollReveal>
      )}

      {/* Restaurants */}
      {restaurants.length > 0 && (
        <ScrollReveal>
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
        </ScrollReveal>
      )}

      {/* News */}
      {news.length > 0 && (
        <ScrollReveal>
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
        </ScrollReveal>
      )}

      {/* Partner CTA Card */}
      <ScrollReveal>
        <section className="container mt-16 sm:mt-24">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-950 p-8 text-center shadow-card sm:p-16">
            {/* Subtle grid and glows */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
            <div className="grain-overlay pointer-events-none absolute inset-0 opacity-20" />

            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
              <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-primary border border-white/10 ring-4 ring-primary/5">
                <Megaphone className="h-6 w-6 animate-bounce" style={{ animationDuration: "3s" }} />
              </span>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Divulgue sua empresa em {tenant.name}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                Faça parte do guia oficial de {tenant.name}. Cadastre seu comércio,
                divulgue eventos, publique cupons de desconto e alcance milhares de clientes locais de forma prática.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
                <Link
                  href="/cadastro"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-float transition-all hover:bg-primary/95 active:scale-95"
                >
                  Cadastrar meu negócio
                </Link>
                <Link
                  href={`/${tenant.slug}/busca`}
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full border border-slate-700 bg-transparent text-white px-8 text-sm font-semibold hover:bg-slate-900 transition-all active:scale-95"
                >
                  Explorar guia
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div className="h-16" />
    </>
  );
}
