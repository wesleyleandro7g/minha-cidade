import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Calendar,
  MapPin,
  Newspaper,
  Sparkles,
  Tag,
} from "lucide-react";
import { getAllTenants } from "@/features/tenants/queries";
import { Button } from "@/components/ui/button";

export const revalidate = 3600;

const highlights = [
  {
    icon: Building2,
    title: "Empresas locais",
    description: "Encontre serviços, comércios e profissionais da região.",
  },
  {
    icon: Tag,
    title: "Promoções e cupons",
    description: "Descontos exclusivos publicados pelos negócios da cidade.",
  },
  {
    icon: Calendar,
    title: "Eventos e agenda",
    description: "Shows, feiras e experiências que movimentam a cidade.",
  },
  {
    icon: Newspaper,
    title: "Notícias locais",
    description: "Fique por dentro do que acontece no seu município.",
  },
];

export default async function HomePage() {
  const tenants = await getAllTenants();

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden hero-cut grain-overlay">
        <div className="absolute inset-0 gradient-brand-radial" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,hsl(27_100%_62%/0.35),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        <div
          className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-float"
          aria-hidden
        />

        <div className="container relative z-10 flex flex-col items-center py-20 text-center text-white sm:py-28 lg:py-32">
          <span className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-200" />
            O guia digital da sua cidade
          </span>
          <h1 className="animate-fade-up-delay-1 max-w-4xl text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Tudo o que sua cidade tem,{" "}
            <span className="bg-gradient-to-r from-amber-200 via-white to-orange-100 bg-clip-text text-transparent">
              em um só lugar
            </span>
          </h1>
          <p className="animate-fade-up-delay-2 mt-5 max-w-xl text-lg text-white/88 leading-relaxed">
            Empresas, restaurantes, eventos, promoções e notícias locais.
            Escolha sua cidade e comece a explorar.
          </p>

          <div className="animate-fade-up-delay-3 mt-10 grid w-full max-w-3xl gap-3 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl border border-white/12 bg-white/8 p-4 text-left backdrop-blur-sm transition-colors hover:bg-white/12"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display font-bold">{item.title}</p>
                    <p className="mt-0.5 text-sm text-white/75">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container relative z-20 pb-20 pt-10 sm:pt-12">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary">
              <MapPin className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.16em]">
                Comece aqui
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Escolha sua cidade
            </h2>
            <p className="mt-1 text-muted-foreground">
              Selecione o município e acesse o guia completo.
            </p>
          </div>
          <p className="text-sm font-semibold text-muted-foreground">
            {tenants.length} cidades disponíveis
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tenants.map((tenant, index) => (
            <Link
              key={tenant.id}
              href={`/${tenant.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(16,24,40,0.22)]"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {tenant.bannerUrl ? (
                <Image
                  src={tenant.bannerUrl}
                  alt={tenant.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 gradient-brand-radial" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
              <div className="grain-overlay absolute inset-0 opacity-50" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    {tenant.state}
                  </p>
                  <h3 className="font-display text-2xl font-bold">
                    {tenant.name}
                  </h3>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:translate-x-1 group-hover:bg-primary group-hover:border-primary">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-border bg-card p-8 text-center shadow-card sm:p-12">
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
            aria-hidden
          />
          <div className="relative z-10">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary ring-1 ring-primary/15">
              <Building2 className="h-6 w-6" />
            </span>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Tem uma empresa? Coloque sua cidade no mapa.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground leading-relaxed">
              Cadastre seu negócio, crie promoções, divulgue eventos e alcance
              milhares de clientes na sua região.
            </p>
            <Button asChild size="lg" className="mt-7 rounded-full px-8 shadow-md shadow-primary/20">
              <Link href="/cadastro">Anunciar minha empresa</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
