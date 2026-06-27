"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { ExplorePills } from "@/features/home/components/explore-pills";
import type { Tenant } from "@/types";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function CityHomeHero({ tenant }: { tenant: Tenant }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-soft">
      <div className="absolute inset-0 bg-muted">
        {tenant.bannerUrl ? (
          <Image
            src={tenant.bannerUrl}
            alt={tenant.name}
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105 brightness-[0.3] saturate-[1.15]"
          />
        ) : (
          <div className="absolute inset-0 gradient-brand-radial" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,hsl(25_100%_50%/0.22),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      {/* Decorative orbs */}
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-secondary/15 blur-3xl"
        style={{ animationDelay: "1.5s" }}
        aria-hidden
      />

      <div className="container relative z-10 flex flex-col items-center py-16 text-center text-white sm:py-24 lg:py-28">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary-muted" />
          Guia oficial · {tenant.state}
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-4xl text-balance font-display text-[2.35rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Descubra o melhor de{" "}
          <span className="relative inline-block">
            <span
              className="absolute -inset-x-2 -inset-y-1 rounded-2xl bg-primary/25 blur-xl"
              aria-hidden
            />
            <span className="relative bg-gradient-to-r from-orange-300 via-primary-muted to-amber-200 bg-clip-text text-transparent">
              {tenant.name}
            </span>
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-5 max-w-xl text-balance text-base sm:text-lg text-white/85 font-medium leading-relaxed"
        >
          Comércio local, gastronomia, eventos, cupons e as novidades que movem
          a cidade — tudo em um só lugar.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 w-full max-w-2xl"
        >
          <div className="rounded-[2rem] border border-white/15 bg-black/25 p-2 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md">
            <SearchBar citySlug={tenant.slug} size="lg" />
          </div>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-7"
        >
          <ExplorePills citySlug={tenant.slug} />
        </motion.div>
      </div>
    </section>
  );
}
