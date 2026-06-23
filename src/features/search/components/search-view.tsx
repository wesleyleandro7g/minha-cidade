"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Map as MapIcon, List, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BusinessCard } from "@/components/business-card";
import { MapView, type MapMarker } from "@/components/maps/map-view";
import { cn } from "@/lib/utils";
import type { Business, Category, GeoPoint, Neighborhood } from "@/types";

interface SearchViewProps {
  citySlug: string;
  center: GeoPoint;
  results: Business[];
  categories: Category[];
  neighborhoods: Neighborhood[];
  filters: {
    query?: string;
    categorySlug?: string;
    neighborhoodSlug?: string;
    priceLevel?: number;
    minRating?: number;
    openNow?: boolean;
    sort?: string;
  };
}

const SORTS = [
  { value: "relevance", label: "Relevância" },
  { value: "rating", label: "Melhor avaliados" },
  { value: "distance", label: "Mais próximos" },
];

export function SearchView({
  citySlug,
  center,
  results,
  categories,
  neighborhoods,
  filters,
}: SearchViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = React.useState<"list" | "map">("list");

  const setParam = React.useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
      router.push(`/${citySlug}/busca?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, citySlug],
  );

  const toggleParam = (key: string, value: string) =>
    setParam(key, filtersValue(filters, key) === value ? null : value);

  const markers: MapMarker[] = results
    .filter((b) => b.lat && b.lng)
    .map((b) => ({ id: b.id, lat: b.lat, lng: b.lng, label: b.name }));

  return (
    <div className="container py-6">
      {/* Toolbar */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-xl font-bold sm:text-2xl">
          {filters.query ? `Resultados para "${filters.query}"` : "Explorar"}
        </h1>
        <Badge variant="muted">{results.length} resultados</Badge>

        <div className="ml-auto flex items-center gap-2">
          <select
            value={filters.sort ?? "relevance"}
            onChange={(e) => setParam("sort", e.target.value)}
            aria-label="Ordenar"
            className="h-10 rounded-xl border border-border bg-background px-3 text-sm font-medium outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setView(view === "list" ? "map" : "list")}
          >
            {view === "list" ? (
              <>
                <MapIcon className="h-4 w-4" /> Mapa
              </>
            ) : (
              <>
                <List className="h-4 w-4" /> Lista
              </>
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <FilterControls
                filters={filters}
                neighborhoods={neighborhoods}
                setParam={setParam}
                toggleParam={toggleParam}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Category chips */}
      <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none">
        <button
          onClick={() => setParam("categoria", null)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            !filters.categorySlug
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background hover:bg-muted",
          )}
        >
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => toggleParam("categoria", c.slug)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filters.categorySlug === c.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:bg-muted",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Results */}
        <div className={cn(view === "map" && "hidden lg:block")}>
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="font-display text-lg font-bold">
                Nenhum resultado encontrado
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tente ajustar os filtros ou buscar por outro termo.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {results.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  citySlug={citySlug}
                />
              ))}
            </div>
          )}
        </div>

        {/* Map */}
        <div className={cn(view === "list" && "hidden lg:block")}>
          <div className="lg:sticky lg:top-24">
            <MapView
              center={center}
              markers={markers}
              className="h-[300px] w-full lg:h-[calc(100vh-8rem)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function filtersValue(filters: SearchViewProps["filters"], key: string) {
  if (key === "categoria") return filters.categorySlug;
  if (key === "bairro") return filters.neighborhoodSlug;
  return undefined;
}

function FilterControls({
  filters,
  neighborhoods,
  setParam,
  toggleParam,
}: {
  filters: SearchViewProps["filters"];
  neighborhoods: Neighborhood[];
  setParam: (key: string, value: string | null) => void;
  toggleParam: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-6 p-5">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Bairro</h3>
        <select
          value={filters.neighborhoodSlug ?? ""}
          onChange={(e) => setParam("bairro", e.target.value || null)}
          className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none"
        >
          <option value="">Todos os bairros</option>
          {neighborhoods.map((n) => (
            <option key={n.id} value={n.slug}>
              {n.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold">Faixa de preço</h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((level) => (
            <button
              key={level}
              onClick={() => toggleParam("preco", String(level))}
              className={cn(
                "h-10 flex-1 rounded-xl border text-sm font-semibold transition-colors",
                filters.priceLevel === level
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-muted",
              )}
            >
              {"$".repeat(level)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold">Avaliação mínima</h3>
        <div className="flex gap-2">
          {[3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => toggleParam("nota", String(rating))}
              className={cn(
                "inline-flex h-10 flex-1 items-center justify-center gap-1 rounded-xl border text-sm font-semibold transition-colors",
                filters.minRating === rating
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-muted",
              )}
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              {rating}+
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          setParam("aberto", filters.openNow ? null : "1")
        }
        className={cn(
          "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
          filters.openNow
            ? "border-primary bg-primary-soft text-primary"
            : "border-border hover:bg-muted",
        )}
      >
        <span className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Aberto agora
        </span>
        <span
          className={cn(
            "h-5 w-9 rounded-full p-0.5 transition-colors",
            filters.openNow ? "bg-primary" : "bg-muted-foreground/30",
          )}
        >
          <span
            className={cn(
              "block h-4 w-4 rounded-full bg-white transition-transform",
              filters.openNow && "translate-x-4",
            )}
          />
        </span>
      </button>
    </div>
  );
}
