import Link from "next/link";
import {
  Calendar,
  Hotel,
  Tag,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const pills: {
  label: string;
  href: string;
  icon: LucideIcon;
  accent: string;
}[] = [
  {
    label: "Restaurantes",
    href: "busca?q=restaurante",
    icon: UtensilsCrossed,
    accent: "group-hover:bg-amber-500/20 group-hover:text-amber-300",
  },
  {
    label: "Ofertas",
    href: "promocoes",
    icon: Tag,
    accent: "group-hover:bg-emerald-500/20 group-hover:text-emerald-300",
  },
  {
    label: "Eventos",
    href: "eventos",
    icon: Calendar,
    accent: "group-hover:bg-violet-500/20 group-hover:text-violet-300",
  },
  {
    label: "Hotéis",
    href: "busca?q=hotel",
    icon: Hotel,
    accent: "group-hover:bg-sky-500/20 group-hover:text-sky-300",
  },
];

export function ExplorePills({ citySlug }: { citySlug: string }) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      <span className="text-white/50 font-medium text-xs sm:text-sm mr-0.5">
        Populares
      </span>
      {pills.map((pill) => {
        const Icon = pill.icon;
        return (
          <Link
            key={pill.href}
            href={`/${citySlug}/${pill.href}`}
            className={cn(
              "group flex items-center gap-1.5 rounded-full bg-white/8 px-3.5 py-1.5 text-xs sm:text-sm font-semibold border border-white/12 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5 hover:border-white/25 active:scale-95",
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/90 transition-colors",
                pill.accent,
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            {pill.label}
          </Link>
        );
      })}
    </div>
  );
}
