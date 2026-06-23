"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, History, Ticket, User as UserIcon } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useFavorites } from "@/stores/favorites";
import { useHydrated } from "@/hooks/use-hydrated";

export function ProfileView({
  citySlug,
  user,
}: {
  citySlug: string;
  user: { name: string; email: string } | null;
}) {
  const favoritesCount = useFavorites((s) => Object.keys(s.items).length);
  const mounted = useHydrated();

  const stats = [
    {
      label: "Favoritos",
      value: mounted ? favoritesCount : 0,
      icon: Heart,
      href: `/${citySlug}/favoritos`,
    },
    { label: "Cupons", value: 0, icon: Ticket, href: `/${citySlug}/promocoes` },
    { label: "Atividades", value: 0, icon: History, href: `/${citySlug}` },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <Tabs defaultValue="dados">
        <TabsList>
          <TabsTrigger value="dados">Dados pessoais</TabsTrigger>
          <TabsTrigger value="atividades">Atividades</TabsTrigger>
          <TabsTrigger value="cupons">Cupons</TabsTrigger>
        </TabsList>

        <TabsContent value="dados">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <Field label="Nome" value={user?.name ?? "—"} />
            <Field label="E-mail" value={user?.email ?? "—"} />
            <Field label="Telefone" value="—" />
          </div>
        </TabsContent>

        <TabsContent value="atividades">
          <EmptyState
            icon={<History className="h-7 w-7" />}
            title="Sem atividades ainda"
            description="Suas visitas e interações aparecerão aqui."
          />
        </TabsContent>

        <TabsContent value="cupons">
          <EmptyState
            icon={<Ticket className="h-7 w-7" />}
            title="Nenhum cupom resgatado"
            description="Resgate cupons nas promoções da cidade."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border py-14 text-center">
      <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        {icon}
      </span>
      <h3 className="font-display font-bold">{title}</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export { UserIcon };
