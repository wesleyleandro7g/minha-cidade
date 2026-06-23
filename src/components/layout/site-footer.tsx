import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Category, Tenant } from "@/types";

export function SiteFooter({
  tenant,
  categories,
}: {
  tenant: Tenant;
  categories: Category[];
}) {
  const base = `/${tenant.slug}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-white">
              <MapPin className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">
              Minha Cidade
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            O guia digital de {tenant.name}/{tenant.state}. Descubra empresas,
            eventos, promoções e tudo o que a cidade tem a oferecer.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Explorar</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href={`${base}/busca`} className="hover:text-primary">Empresas</Link></li>
            <li><Link href={`${base}/promocoes`} className="hover:text-primary">Promoções</Link></li>
            <li><Link href={`${base}/eventos`} className="hover:text-primary">Eventos</Link></li>
            <li><Link href={`${base}/noticias`} className="hover:text-primary">Notícias</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Categorias</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link href={`${base}/categorias/${c.slug}`} className="hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Para empresas</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href={`${base}/painel`} className="hover:text-primary">Anuncie sua empresa</Link></li>
            <li><Link href={`${base}/painel/planos`} className="hover:text-primary">Planos</Link></li>
            <li><Link href="/login" className="hover:text-primary">Entrar</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6">
        <p className="container text-center text-xs text-muted-foreground">
          &copy; {year} Minha Cidade. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
