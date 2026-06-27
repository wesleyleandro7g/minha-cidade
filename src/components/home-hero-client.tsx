"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Building2, Calendar, Newspaper, Sparkles, Tag } from "lucide-react";

const highlights = [
  {
    icon: Building2,
    title: "Empresas locais",
    description: "Encontre serviços, comércios e profissionais da região.",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-200",
  },
  {
    icon: Tag,
    title: "Promoções e cupons",
    description: "Descontos exclusivos publicados pelos negócios da cidade.",
    color: "from-rose-500/20 to-orange-500/20",
    iconColor: "text-rose-200",
  },
  {
    icon: Calendar,
    title: "Eventos e agenda",
    description: "Shows, feiras e experiências que movimentam a cidade.",
    color: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-200",
  },
  {
    icon: Newspaper,
    title: "Notícias locais",
    description: "Fique por dentro do que acontece no seu município.",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-200",
  },
];

export function HomeHeroClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="container relative z-10 flex flex-col items-center py-24 text-center text-white sm:py-32"
    >
      {/* Sparkles Badge */}
      <motion.span
        variants={itemVariants}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur-md shadow-soft"
      >
        <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
        O guia digital da sua cidade
      </motion.span>

      {/* Main Title */}
      <motion.h1
        variants={itemVariants}
        className="max-w-4xl text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
      >
        Tudo o que sua cidade tem,{" "}
        <span className="bg-gradient-to-r from-amber-200 via-white to-orange-100 bg-clip-text text-transparent">
          em um só lugar
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed font-medium"
      >
        Empresas, restaurantes, eventos, promoções e notícias locais.
        Escolha sua cidade abaixo e comece a explorar.
      </motion.p>

      {/* Highlights Grid */}
      <motion.div
        variants={itemVariants}
        className="mt-14 grid w-full max-w-4xl gap-4 sm:grid-cols-2"
      >
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group relative flex items-start gap-4 rounded-2xl border border-white/10 bg-white/8 p-5 text-left backdrop-blur-md transition-all duration-300 hover:bg-white/12 hover:border-white/20 shadow-soft overflow-hidden"
            >
              {/* Background accent light */}
              <div className={`absolute -right-12 -bottom-12 h-24 w-24 rounded-full bg-gradient-to-br ${item.color} blur-2xl group-hover:scale-150 transition-transform duration-500`} />

              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white shadow-soft transition-transform group-hover:scale-105 duration-350`}>
                <Icon className={`h-5.5 w-5.5 ${item.iconColor}`} />
              </span>
              <div className="relative z-10">
                <p className="font-display font-bold text-base tracking-wide">{item.title}</p>
                <p className="mt-1 text-sm text-white/70 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
