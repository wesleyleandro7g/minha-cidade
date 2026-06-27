import Link from "next/link";
import { Building2, Calendar, Newspaper, Tag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StatItem = {
  label: string;
  count: number;
  href: string;
  icon: LucideIcon;
};

export function LivePulseBar({
  citySlug,
  stats,
}: {
  citySlug: string;
  stats: {
    businesses: number;
    promotions: number;
    events: number;
    news: number;
  };
}) {
  const items: StatItem[] = [
    {
      label: "empresas",
      count: stats.businesses,
      href: `/${citySlug}/busca`,
      icon: Building2,
    },
    {
      label: "ofertas",
      count: stats.promotions,
      href: `/${citySlug}/promocoes`,
      icon: Tag,
    },
    {
      label: "eventos",
      count: stats.events,
      href: `/${citySlug}/eventos`,
      icon: Calendar,
    },
    {
      label: "notícias",
      count: stats.news,
      href: `/${citySlug}/noticias`,
      icon: Newspaper,
    },
  ].filter((item) => item.count > 0);

  if (items.length === 0) return null;

  return (
    <div className="container relative z-20 -mt-6 sm:-mt-8">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-center gap-2 rounded-2xl border border-border/70 bg-card/90 px-4 py-2.5 shadow-soft backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:shadow-card hover:-translate-y-0.5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm">
                <span className="font-display font-bold text-foreground">
                  {item.count}
                </span>
                <span className="text-muted-foreground"> {item.label}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
