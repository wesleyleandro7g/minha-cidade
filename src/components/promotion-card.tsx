"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/favorite-button";
import type { Promotion } from "@/types";

export function PromotionCard({
  promotion,
  citySlug,
}: {
  promotion: Promotion;
  citySlug: string;
}) {
  const href = promotion.business
    ? `/${citySlug}/empresas/${promotion.business.slug}`
    : `/${citySlug}/promocoes`;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group h-full"
    >
      <Link
        href={href}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={promotion.bannerUrl ?? "/images/placeholder.svg"}
            alt={promotion.title}
            fill
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
          {promotion.discountLabel && (
            <Badge className="absolute left-3 top-3 gradient-brand border-0 text-sm">
              {promotion.discountLabel}
            </Badge>
          )}
          <div className="absolute right-3 top-3">
            <FavoriteButton
              item={{
                id: promotion.id,
                type: "promotion",
                title: promotion.title,
                image: promotion.bannerUrl,
                href,
                subtitle: promotion.business?.name,
              }}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            {promotion.business && (
              <p className="text-xs font-medium opacity-90">
                {promotion.business.name}
              </p>
            )}
            <h3 className="font-display text-base font-bold leading-tight line-clamp-2">
              {promotion.title}
            </h3>
          </div>
        </div>
        {promotion.couponCode && (
          <div className="flex items-center gap-2 px-4 py-3 text-sm">
            <Ticket className="h-4 w-4 text-primary" />
            <span className="font-mono font-semibold tracking-wide text-primary">
              {promotion.couponCode}
            </span>
          </div>
        )}
      </Link>
    </motion.article>
  );
}
