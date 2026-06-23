"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, CalendarDays, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav({ citySlug }: { citySlug: string }) {
  const pathname = usePathname();
  const base = `/${citySlug}`;

  const items = [
    { href: base, label: "Início", icon: Home, exact: true },
    { href: `${base}/busca`, label: "Buscar", icon: Search },
    { href: `${base}/eventos`, label: "Eventos", icon: CalendarDays },
    { href: `${base}/favoritos`, label: "Salvos", icon: Heart },
    { href: `${base}/perfil`, label: "Perfil", icon: User },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden">
      <div className="flex items-stretch justify-around">
        {items.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon
                className={cn("h-5 w-5", active && "fill-primary/15")}
                strokeWidth={active ? 2.4 : 2}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
