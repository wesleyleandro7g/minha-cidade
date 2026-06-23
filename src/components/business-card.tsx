"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/rating-stars";
import { PriceLevel } from "@/components/price-level";
import { FavoriteButton } from "@/components/favorite-button";
import { CategoryIcon } from "@/components/category-icon";
import type { Business } from "@/types";

export function BusinessCard({
  business,
  citySlug,
}: {
  business: Business;
  citySlug: string;
}) {
  const href = `/${citySlug}/empresas/${business.slug}`;
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group h-full"
    >
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={business.coverUrl ?? "/images/placeholder.svg"}
            alt={business.name}
            fill
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute right-3 top-3">
            <FavoriteButton
              item={{
                id: business.id,
                type: "business",
                title: business.name,
                image: business.coverUrl,
                href,
                subtitle: business.category?.name,
              }}
            />
          </div>
          {business.planTier === "gold" && (
            <Badge className="absolute left-3 top-3 gradient-brand border-0">
              Destaque
            </Badge>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
            {business.category && (
              <CategoryIcon name={business.category.icon} className="h-3.5 w-3.5" />
            )}
            <span>{business.category?.name}</span>
          </div>
          <h3 className="font-display text-base font-bold leading-tight line-clamp-1">
            {business.name}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {business.shortDescription}
          </p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <RatingStars rating={business.ratingAvg} count={business.ratingCount} />
            <PriceLevel level={business.priceLevel} />
          </div>
          {business.neighborhood && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{business.neighborhood.name}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
