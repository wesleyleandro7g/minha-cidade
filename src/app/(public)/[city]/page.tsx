import Image from "next/image";
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
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { CategoryGrid } from "@/components/category-grid";
import { BusinessCard } from "@/components/business-card";
import { PromotionCard } from "@/components/promotion-card";
import { EventCard } from "@/components/event-card";
import { CouponCard } from "@/features/promotions/components/coupon-card";
import { NewsCard } from "@/features/news/components/news-card";
import { cn } from "@/lib/utils";
import {
  Sparkles,
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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-muted">
          {tenant.bannerUrl && (
            <Image
              src={tenant.bannerUrl}
              alt={tenant.name}
              fill
              priority
              sizes="100vw"
              className="object-cover brightness-[0.4] saturate-[1.15]"
            />
          )}
          {/* Layered gradients — tighter bottom fade in light mode so hero text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/45 dark:via-black/25 dark:to-background" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background via-background/60 to-transparent sm:h-12 dark:h-36 dark:from-background dark:via-transparent" />
        </div>
        <div className="container relative z-10 flex flex-col items-center py-20 text-center text-white sm:py-28">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md border border-white/10 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            Guia oficial de sua cidade
          </div>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl text-white">
            Descubra o melhor de{" "}
            <span className="bg-gradient-to-r from-orange-400 via-primary-muted to-amber-300 bg-clip-text text-transparent">
              {tenant.name}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-balance text-base sm:text-lg text-white/90 font-medium">
            Explore comércios locais, gastronomia, eventos, cupons de desconto e as novidades mais recentes.
          </p>
          <div className="mt-8 w-full max-w-2xl bg-black/15 p-2 rounded-[2rem] backdrop-blur-sm border border-white/10 shadow-2xl">
            <SearchBar citySlug={tenant.slug} size="lg" />
          </div>

          {/* Quick links under search */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-2 text-xs sm:text-sm">
            <span className="text-white/60 font-medium mr-1">Populares:</span>
            <Link
              href={`/${tenant.slug}/busca?q=restaurante`}
              className="flex items-center gap-1 rounded-full bg-white/10 px-3.5 py-1.5 font-medium border border-white/10 transition-all hover:bg-white/20 hover:-translate-y-0.5 active:scale-95"
            >
              <span>🍔</span> Restaurantes
            </Link>
            <Link
              href={`/${tenant.slug}/promocoes`}
              className="flex items-center gap-1 rounded-full bg-white/10 px-3.5 py-1.5 font-medium border border-white/10 transition-all hover:bg-white/20 hover:-translate-y-0.5 active:scale-95"
            >
              <span>🏷️</span> Ofertas
            </Link>
            <Link
              href={`/${tenant.slug}/eventos`}
              className="flex items-center gap-1 rounded-full bg-white/10 px-3.5 py-1.5 font-medium border border-white/10 transition-all hover:bg-white/20 hover:-translate-y-0.5 active:scale-95"
            >
              <span>🎭</span> Eventos
            </Link>
            <Link
              href={`/${tenant.slug}/busca?q=hotel`}
              className="flex items-center gap-1 rounded-full bg-white/10 px-3.5 py-1.5 font-medium border border-white/10 transition-all hover:bg-white/20 hover:-translate-y-0.5 active:scale-95"
            >
              <span>🏨</span> Hotéis
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container -mt-12 relative z-20">
        <div className="rounded-[2.2rem] border border-border/60 bg-card/85 p-5 shadow-xl backdrop-blur-xl sm:p-8 dark:border-border/50 dark:bg-card/75 transition-all duration-300">
          <CategoryGrid categories={categories} citySlug={tenant.slug} />
        </div>
      </section>

      {/* Promotions & Coupons Section (Special Combined Area) */}
      {(promotions.length > 0 || coupons.length > 0) && (
        <section className="container mt-16 rounded-[2.5rem] border border-primary/10 bg-gradient-to-br from-primary-soft/40 via-transparent to-primary-soft/10 p-6 sm:p-10 dark:from-primary/5 dark:border-primary/5">
          {promotions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Tag className="h-4 w-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Economize na Cidade
                </span>
              </div>
              <SectionHeading
                title="Promoções em destaque"
                subtitle="Ofertas exclusivas e descontos imperdíveis na sua região"
                href={`/${tenant.slug}/promocoes`}
              />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {promotions.slice(0, 3).map((promotion) => (
                  <PromotionCard
                    key={promotion.id}
                    promotion={promotion}
                    citySlug={tenant.slug}
                  />
                ))}
              </div>
            </div>
          )}

          {coupons.length > 0 && (
            <div className={cn(promotions.length > 0 ? "mt-12 pt-10 border-t border-primary/10" : "")}>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Ticket className="h-4 w-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Cupons Ativos
                </span>
              </div>
              <SectionHeading
                title="Cupons de desconto"
                subtitle="Use os códigos promocionais e economize na hora"
                href={`/${tenant.slug}/promocoes`}
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {coupons.map((promotion) => (
                  <CouponCard key={promotion.id} promotion={promotion} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Featured Businesses Section */}
      {featured.length > 0 && (
        <section className="container mt-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Compass className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Guia de Compras e Serviços
            </span>
          </div>
          <SectionHeading
            title="Empresas em destaque"
            subtitle="Os negócios locais mais bem avaliados e recomendados"
            href={`/${tenant.slug}/busca`}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Upcoming Events Section */}
      {events.length > 0 && (
        <section className="container mt-16 rounded-[2.5rem] border border-border bg-muted/20 p-6 sm:p-10 dark:bg-muted/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Agenda Cultural e Lazer
            </span>
          </div>
          <SectionHeading
            title="Eventos próximos"
            subtitle="Fique por dentro do que vai movimentar a cidade"
            href={`/${tenant.slug}/eventos`}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event.id} event={event} citySlug={tenant.slug} />
            ))}
          </div>
        </section>
      )}

      {/* Popular Restaurants Section */}
      {restaurants.length > 0 && (
        <section className="container mt-16 rounded-[2.5rem] border border-orange-500/10 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent p-6 sm:p-10 dark:from-amber-500/5 dark:border-amber-500/5">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Utensils className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Gastronomia Local
            </span>
          </div>
          <SectionHeading
            title="Restaurantes populares"
            subtitle={`Onde comer bem e aproveitar momentos saborosos em ${tenant.name}`}
            href={`/${tenant.slug}/categorias/restaurantes`}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* News Section */}
      {news.length > 0 && (
        <section className="container mt-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Newspaper className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Informativo Local
            </span>
          </div>
          <SectionHeading
            title="Notícias locais"
            subtitle="Mantenha-se atualizado com os acontecimentos mais importantes da região"
            href={`/${tenant.slug}/noticias`}
          />
          <div className="grid gap-6 sm:grid-cols-3">
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

      {/* Merchant CTA Section */}
      <section className="container mt-20">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 text-center shadow-card sm:p-14 transition-all duration-300 hover:shadow-xl">
          {/* Decorative glowing gradient elements */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary shadow-sm dark:bg-primary/10">
              <Megaphone className="h-6 w-6 animate-bounce" style={{ animationDuration: '3s' }} />
            </span>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Divulgue sua empresa em {tenant.name}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Faça parte do guia oficial da cidade. Cadastre seu comércio ou serviço, divulgue eventos, publique cupons de desconto e alcance milhares de clientes locais.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/cadastro"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 shadow-md shadow-primary/20"
              >
                Cadastrar meu Negócio
              </Link>
              <Link
                href={`/${tenant.slug}/busca`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-6 text-sm font-semibold transition-all hover:bg-muted hover:scale-[1.02] active:scale-95"
              >
                Explorar Guia
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16" />
    </>
  );
}

