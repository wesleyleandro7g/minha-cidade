"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FavoriteEntity } from "@/types";

export interface FavoriteItem {
  id: string;
  type: FavoriteEntity;
  title: string;
  image?: string | null;
  href: string;
  subtitle?: string;
}

interface FavoritesState {
  items: Record<string, FavoriteItem>;
  toggle: (item: FavoriteItem) => void;
  remove: (id: string) => void;
  isFavorite: (id: string) => boolean;
  list: (type?: FavoriteEntity) => FavoriteItem[];
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: {},
      toggle: (item) =>
        set((state) => {
          const next = { ...state.items };
          if (next[item.id]) {
            delete next[item.id];
          } else {
            next[item.id] = item;
          }
          return { items: next };
        }),
      remove: (id) =>
        set((state) => {
          const next = { ...state.items };
          delete next[id];
          return { items: next };
        }),
      isFavorite: (id) => Boolean(get().items[id]),
      list: (type) => {
        const all = Object.values(get().items);
        return type ? all.filter((i) => i.type === type) : all;
      },
    }),
    { name: "minha-cidade-favorites" },
  ),
);
