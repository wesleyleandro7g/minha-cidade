"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Calendar,
  MapPin,
  MapPinOff,
  Search,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import type { Tenant } from "@/types";

interface TenantWithStats extends Tenant {
  businessCount: number;
  promoCount: number;
  eventCount: number;
}

interface CitySelectorClientProps {
  tenants: TenantWithStats[];
}

export function CitySelectorClient({ tenants }: CitySelectorClientProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredTenants = tenants.filter((tenant) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      tenant.name.toLowerCase().includes(query) ||
      tenant.state.toLowerCase().includes(query)
    );
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="w-full">
      {/* Search Bar Section */}
      <div className="mx-auto mb-12 max-w-2xl">
        <div className="relative group">
          {/* Neon Glow border effect */}
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-orange-500 opacity-20 blur transition duration-300 group-hover:opacity-35" />
          <div className="relative flex items-center rounded-full border border-border bg-card/85 p-1.5 shadow-soft backdrop-blur-md transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
            <span className="pl-4 text-muted-foreground">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Digite o nome da sua cidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-3 py-2 text-base outline-none placeholder:text-muted-foreground/75"
              id="city-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mr-2 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Limpar busca"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Sugestões:</span>
          {tenants.slice(0, 3).map((tenant) => (
            <button
              key={tenant.id}
              onClick={() => setSearchQuery(tenant.name)}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium hover:border-primary hover:text-primary transition-all duration-200"
            >
              {tenant.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Header */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-border/60 pb-5">
        <div>
          <div className="mb-2 flex items-center gap-2 text-primary">
            <MapPin className="h-4 w-4" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]">
              Rede de Cidades
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl text-foreground">
            Escolha sua cidade
          </h2>
          <p className="text-sm text-muted-foreground">
            Selecione o município correspondente para acessar o guia local.
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted px-3 py-1.5 rounded-full mt-2 sm:mt-0 self-start sm:self-auto">
          {filteredTenants.length === tenants.length
            ? `${tenants.length} cidades disponíveis`
            : `${filteredTenants.length} de ${tenants.length} encontradas`}
        </p>
      </div>

      {/* Cities Grid with AnimatePresence */}
      <AnimatePresence mode="popLayout">
        {filteredTenants.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredTenants.map((tenant) => (
              <motion.div
                key={tenant.id}
                variants={itemVariants}
                layout
                className="group relative"
              >
                {/* Glow ring on hover */}
                <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-r from-primary to-amber-500 opacity-0 blur-md transition duration-500 group-hover:opacity-15" />
                <Link
                  href={`/${tenant.slug}`}
                  className="relative flex flex-col h-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {tenant.bannerUrl ? (
                      <Image
                        src={tenant.bannerUrl}
                        alt={tenant.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary via-orange-500 to-amber-600" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                    
                    {/* State badge */}
                    <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {tenant.state}
                    </span>

                    {/* Quick Info Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h3 className="font-display text-2xl font-bold tracking-tight">
                        {tenant.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body with stats summary */}
                  <div className="flex-1 p-5 flex flex-col justify-between gap-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/50 pb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5 text-primary/70" />
                        <span>{tenant.businessCount} Empresas</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5 text-orange-500/70" />
                        <span>{tenant.promoCount} Ofertas</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-amber-500/70" />
                        <span>{tenant.eventCount} Eventos</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1">
                        Explorar guia
                        <Sparkles className="h-3 w-3 animate-pulse" />
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                        <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-[2rem] border border-dashed border-border bg-card/50"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <MapPinOff className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold">Nenhuma cidade encontrada</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Infelizmente ainda não estamos operando em <strong className="text-foreground">"{searchQuery}"</strong>. 
              Gostaria de sugerir este município para a plataforma?
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setSearchQuery("")}
                className="rounded-full border border-border bg-background px-5 py-2 text-xs font-semibold hover:bg-muted transition-all"
              >
                Limpar busca
              </button>
              <Link
                href="/cadastro"
                className="rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/95 px-5 py-2 text-xs font-semibold transition-all inline-flex items-center gap-1.5"
              >
                Cadastrar nova cidade
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
