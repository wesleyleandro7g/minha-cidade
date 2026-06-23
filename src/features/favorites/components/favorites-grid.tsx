"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useFavorites, type FavoriteItem } from "@/stores/favorites";
import { useHydrated } from "@/hooks/use-hydrated";
import type { FavoriteEntity } from "@/types";

const TABS: { value: FavoriteEntity | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "business", label: "Empresas" },
  { value: "event", label: "Eventos" },
  { value: "promotion", label: "Promoções" },
  { value: "product", label: "Produtos" },
];

export function FavoritesGrid() {
  const items = useFavorites((s) => s.items);
  const remove = useFavorites((s) => s.remove);
  const mounted = useHydrated();

  if (!mounted) return null;

  const all = Object.values(items);

  if (all.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-dashed border-border py-16 text-center">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <Heart className="h-8 w-8" />
        </span>
        <h2 className="font-display text-lg font-bold">
          Você ainda não salvou nada
        </h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Toque no coração em empresas, eventos e promoções para guardá-los aqui.
        </p>
      </div>
    );
  }

  const render = (list: FavoriteItem[]) =>
    list.length === 0 ? (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Nada salvo nesta categoria.
      </p>
    ) : (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card"
          >
            <Link href={item.href} className="flex">
              <div className="relative h-24 w-28 shrink-0 overflow-hidden">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center p-3">
                <p className="font-display font-bold leading-tight line-clamp-2">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="text-xs text-muted-foreground">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Remover"
              className="absolute right-2 top-2 bg-background/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
              onClick={() => remove(item.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    );

  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4 flex w-full justify-start overflow-x-auto scrollbar-none">
        {TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {render(
            tab.value === "all"
              ? all
              : all.filter((i) => i.type === tab.value),
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
