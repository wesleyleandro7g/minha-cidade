"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, MapPin, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "@/components/search-bar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { Category, Tenant } from "@/types";

export function SiteHeader({
  tenant,
  categories,
}: {
  tenant: Tenant;
  categories: Category[];
}) {
  const pathname = usePathname();
  const base = `/${tenant.slug}`;
  const showSearch = pathname !== base && pathname !== `${base}/`;

  const navLinks = [
    { href: `${base}/busca`, label: "Explorar" },
    { href: `${base}/promocoes`, label: "Promoções" },
    { href: `${base}/eventos`, label: "Eventos" },
    { href: `${base}/noticias`, label: "Notícias" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center gap-4">
        <Link href={base} className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-white">
            <MapPin className="h-5 w-5" />
          </span>
          <span className="hidden font-display text-lg font-extrabold sm:block">
            Minha Cidade
            <span className="ml-1 font-medium text-muted-foreground">
              {tenant.name}
            </span>
          </span>
        </Link>

        {showSearch && (
          <div className="hidden max-w-md flex-1 md:block">
            <SearchBar citySlug={tenant.slug} />
          </div>
        )}

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                pathname === link.href && "bg-muted text-foreground",
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="icon" aria-label="Favoritos">
            <Link href={`${base}/favoritos`}>
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="soft" size="sm" className="hidden sm:inline-flex">
            <Link href={`${base}/perfil`}>
              <User className="h-4 w-4" />
              Entrar
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>{tenant.name}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-2 h-px bg-border" />
                <p className="px-4 py-1 text-xs font-semibold uppercase text-muted-foreground">
                  Categorias
                </p>
                {categories.slice(0, 6).map((c) => (
                  <Link
                    key={c.id}
                    href={`${base}/categorias/${c.slug}`}
                    className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
