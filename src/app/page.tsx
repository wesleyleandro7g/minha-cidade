import Link from "next/link";
import {
  Building2,
  Calendar,
  MapPin,
  Sparkles,
  Tag,
  ShieldCheck,
  TrendingUp,
  Award,
  ArrowRight,
  Compass,
} from "lucide-react";
import { getAllTenants } from "@/features/tenants/queries";
import { businesses, promotions, events } from "@/lib/data/fixtures";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CitySelectorClient } from "@/components/city-selector-client";
import { HomeHeroClient } from "@/components/home-hero-client";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Minha Cidade | O Guia Digital Definitivo da Sua Região",
  description:
    "Descubra o melhor da sua cidade em um só lugar. Encontre empresas locais, cupons de desconto, eventos exclusivos, restaurantes e notícias locais.",
};

export default async function HomePage() {
  const rawTenants = await getAllTenants();

  // Aggregate stats for each city to render on selector cards
  const tenantsWithStats = rawTenants.map((tenant) => {
    const tenantBusinesses = businesses.filter((b) => b.tenantId === tenant.id);
    const tenantPromotions = promotions.filter((p) => p.tenantId === tenant.id);
    const tenantEvents = events.filter((e) => e.tenantId === tenant.id);

    return {
      ...tenant,
      businessCount: tenantBusinesses.length,
      promoCount: tenantPromotions.length,
      eventCount: tenantEvents.length,
    };
  });

  // Calculate global stats for portal proof points
  const totalCities = rawTenants.length;
  const totalBusinesses = businesses.length;
  const totalPromotions = promotions.length;
  const totalEvents = events.length;

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Absolute Transparent Header */}
      <header className="absolute top-0 left-0 right-0 z-50 w-full">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white shadow-soft">
              <MapPin className="h-5.5 w-5.5 text-primary" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-white">
              Minha Cidade
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all backdrop-blur-md"
              id="header-announce-btn"
            >
              <Link href="/cadastro">Anunciar Empresa</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-slate-950 pb-20 pt-28 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-soft"
        id="portal-hero-section"
      >
        {/* Background grids and glowing blobs */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-orange-950/60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Animated ambient blur blobs */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-[350px] w-[350px] rounded-full bg-primary/20 blur-[100px] animate-pulse duration-[8000ms]" />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-[300px] w-[300px] rounded-full bg-orange-600/15 blur-[90px] animate-pulse duration-[6000ms]" />

        {/* Dynamic Animated Content */}
        <HomeHeroClient />
      </section>

      {/* Interactive Selection Section */}
      <section className="container relative z-20 -mt-10 pb-16" id="city-selector-section">
        <div className="rounded-[2.5rem] border border-border/80 bg-card/75 p-6 shadow-soft backdrop-blur-xl sm:p-10 md:p-12">
          <CitySelectorClient tenants={tenantsWithStats} />
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="container pb-16" id="portal-stats-section">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card p-6 text-center shadow-card hover:border-primary/30 transition-all duration-300">
            <div className="absolute -right-4 -bottom-4 opacity-5 text-primary">
              <MapPin className="h-24 w-24" />
            </div>
            <p className="font-display text-3xl font-extrabold text-primary md:text-4xl">
              {totalCities}
            </p>
            <p className="mt-1 text-sm font-bold text-foreground">Cidades</p>
            <p className="mt-0.5 text-xs text-muted-foreground font-medium">Em expansão regional</p>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card p-6 text-center shadow-card hover:border-primary/30 transition-all duration-300">
            <div className="absolute -right-4 -bottom-4 opacity-5 text-primary">
              <Building2 className="h-24 w-24" />
            </div>
            <p className="font-display text-3xl font-extrabold text-primary md:text-4xl">
              {totalBusinesses}
            </p>
            <p className="mt-1 text-sm font-bold text-foreground">Empresas</p>
            <p className="mt-0.5 text-xs text-muted-foreground font-medium">Comércios e serviços</p>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card p-6 text-center shadow-card hover:border-primary/30 transition-all duration-300">
            <div className="absolute -right-4 -bottom-4 opacity-5 text-primary">
              <Tag className="h-24 w-24" />
            </div>
            <p className="font-display text-3xl font-extrabold text-primary md:text-4xl">
              {totalPromotions}
            </p>
            <p className="mt-1 text-sm font-bold text-foreground">Ofertas</p>
            <p className="mt-0.5 text-xs text-muted-foreground font-medium">Descontos exclusivos</p>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card p-6 text-center shadow-card hover:border-primary/30 transition-all duration-300">
            <div className="absolute -right-4 -bottom-4 opacity-5 text-primary">
              <Calendar className="h-24 w-24" />
            </div>
            <p className="font-display text-3xl font-extrabold text-primary md:text-4xl">
              {totalEvents}
            </p>
            <p className="mt-1 text-sm font-bold text-foreground">Eventos</p>
            <p className="mt-0.5 text-xs text-muted-foreground font-medium">Agendas locais ativas</p>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="border-t border-border/50 bg-muted/40 py-20" id="portal-benefits-section">
        <div className="container">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
              <Compass className="h-3.5 w-3.5" />
              Para Lojistas & Negócios
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Por que anunciar no Minha Cidade?
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Descubra como colocar sua empresa em destaque, atrair clientes locais 
              e fortalecer a economia da sua região com ferramentas completas.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Benefit 1 */}
            <div className="group relative rounded-[2rem] border border-border bg-card p-8 shadow-card transition-all duration-300 hover:shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                <TrendingUp className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                Visibilidade Segmentada
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-medium">
                Seja encontrado por moradores da sua cidade no momento exato em que eles buscam 
                por seus serviços ou produtos. Alcance qualificado e imediato.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="group relative rounded-[2rem] border border-border bg-card p-8 shadow-card transition-all duration-300 hover:shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform">
                <Award className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                Destaque e Credibilidade
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-medium">
                Aumente a reputação da sua marca recebendo avaliações reais de clientes da região 
                e garanta a confiança necessária para fechar novos negócios.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="group relative rounded-[2rem] border border-border bg-card p-8 shadow-card transition-all duration-300 hover:shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                Promoções em Tempo Real
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-medium">
                Crie cupons de desconto, publique ofertas relâmpago e cadastre eventos do seu 
                estabelecimento com autonomia total pelo painel de controle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Improved Partner CTA Section */}
      <section className="container py-20" id="portal-cta-section">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-950 p-8 text-center shadow-card sm:p-16">
          {/* Subtle grid and glows */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
          
          <div className="relative z-10">
            <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-primary border border-white/10 ring-4 ring-primary/5">
              <Building2 className="h-7 w-7" />
            </span>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight max-w-2xl mx-auto leading-tight">
              Coloque sua empresa no mapa da sua cidade
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300 leading-relaxed font-medium">
              Crie seu cadastro em poucos cliques, divulgue suas ofertas locais,
              publique seus eventos e receba mensagens diretas de clientes no WhatsApp.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-float font-bold"
                id="cta-announce-btn"
              >
                <Link href="/cadastro" className="flex items-center gap-2">
                  Anunciar minha empresa
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 border-slate-700 bg-transparent text-white hover:bg-slate-900 transition-all"
                id="cta-plans-btn"
              >
                <Link href="/cadastro">Conhecer Planos</Link>
              </Button>
            </div>
            
            <p className="mt-6 text-xs text-slate-400 font-medium">
              Não requer cartão de crédito • Comece gratuitamente
            </p>
          </div>
        </div>
      </section>

      {/* Global Portal Footer */}
      <footer className="border-t border-border bg-card/60 backdrop-blur-md" id="portal-footer">
        <div className="container py-16">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="font-display text-lg font-extrabold">
                  Minha Cidade
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed font-medium">
                O ecossistema e guia local definitivo. Conectamos residentes aos melhores 
                comércios, cupons, eventos e informações locais das principais cidades de Minas Gerais.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Cidades Ativas
              </h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground font-medium">
                {rawTenants.map((t) => (
                  <li key={t.id}>
                    <Link href={`/${t.slug}`} className="hover:text-primary transition-colors flex items-center gap-1">
                      {t.name}
                      <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-bold">
                        {t.state}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Parcerias
              </h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground font-medium">
                <li>
                  <Link href="/cadastro" className="hover:text-primary transition-colors">
                    Divulgar Negócio
                  </Link>
                </li>
                <li>
                  <Link href="/cadastro" className="hover:text-primary transition-colors">
                    Planos Comerciais
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-primary transition-colors">
                    Painel do Lojista
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 border-t border-border/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-medium">
            <p>&copy; {new Date().getFullYear()} Minha Cidade. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
