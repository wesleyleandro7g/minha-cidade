"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites, type FavoriteItem } from "@/stores/favorites";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  item,
  className,
  variant = "floating",
}: {
  item: FavoriteItem;
  className?: string;
  variant?: "floating" | "inline";
}) {
  const isFavorite = useFavorites((s) => Boolean(s.items[item.id]));
  const toggle = useFavorites((s) => s.toggle);
  const mounted = useHydrated();

  const active = mounted && isFavorite;

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.8 }}
      aria-pressed={active}
      aria-label={active ? "Remover dos favoritos" : "Salvar nos favoritos"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-colors",
        variant === "floating"
          ? "h-9 w-9 bg-background/90 text-foreground shadow-sm backdrop-blur hover:bg-background"
          : "h-10 w-10 border border-border bg-background hover:bg-muted",
        className,
      )}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          active ? "fill-primary text-primary" : "text-foreground",
        )}
      />
    </motion.button>
  );
}
