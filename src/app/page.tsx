import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Search, Sparkles } from "lucide-react";
import { getAllTenants } from "@/features/tenants/queries";
import { Button } from "@/components/ui/button";

export const revalidate = 3600;

export default async function HomePage() {
  const tenants = await getAllTenants();

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-95" />
        <div className="container relative z-10 flex flex-col items-center py-24 text-center text-white">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Sparkles className="h-4 w-4" />
            O guia digital da sua cidade
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            Tudo o que sua cidade tem, em um só lugar
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            Empresas, restaurantes, eventos, promoções, turismo e notícias
            locais. Escolha sua cidade e comece a explorar.
          </p>
        </div>
      </section>

      <section className="container -mt-16 relative z-20 pb-20">
        <div className="mb-6 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-bold">Escolha sua cidade</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tenants.map((tenant) => (
            <Link
              key={tenant.id}
              href={`/${tenant.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-card"
            >
              {tenant.bannerUrl && (
                <Image
                  src={tenant.bannerUrl}
                  alt={tenant.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                <div>
                  <h3 className="font-display text-2xl font-bold">
                    {tenant.name}
                  </h3>
                  <p className="text-sm text-white/80">{tenant.state}</p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-card p-8 text-center shadow-card sm:p-12">
          <Search className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="font-display text-2xl font-bold">
            Tem uma empresa? Coloque sua cidade no mapa.
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Cadastre seu negócio, crie promoções, divulgue eventos e alcance
            milhares de clientes na sua região.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/cadastro">Anunciar minha empresa</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
