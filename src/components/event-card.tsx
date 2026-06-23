"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/favorite-button";
import { formatCurrency } from "@/lib/utils";
import type { CityEvent } from "@/types";

export function EventCard({
  event,
  citySlug,
}: {
  event: CityEvent;
  citySlug: string;
}) {
  const href = `/${citySlug}/eventos/${event.slug}`;
  const date = new Date(event.startsAt);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group h-full"
    >
      <Link
        href={href}
        className="flex h-full overflow-hidden rounded-2xl border border-border bg-card shadow-card"
      >
        <div className="relative w-28 shrink-0 overflow-hidden bg-muted sm:w-36">
          <Image
            src={event.bannerUrl ?? "/images/placeholder.svg"}
            alt={event.name}
            fill
            loading="eager"
            sizes="160px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2 flex flex-col items-center rounded-lg bg-background/95 px-2 py-1 text-center shadow-sm backdrop-blur">
            <span className="text-base font-bold leading-none text-primary">
              {format(date, "dd")}
            </span>
            <span className="text-[10px] font-semibold uppercase text-muted-foreground">
              {format(date, "MMM", { locale: ptBR })}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-bold leading-tight line-clamp-2">
              {event.name}
            </h3>
            <FavoriteButton
              variant="inline"
              className="h-8 w-8 shrink-0"
              item={{
                id: event.id,
                type: "event",
                title: event.name,
                image: event.bannerUrl,
                href,
                subtitle: event.venue,
              }}
            />
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{format(date, "EEEE, HH'h'mm", { locale: ptBR })}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
          <div className="mt-auto pt-2">
            {event.isFree ? (
              <Badge variant="success">Gratuito</Badge>
            ) : (
              <Badge variant="soft">
                A partir de {formatCurrency(event.ticketFrom ?? 0)}
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
