"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBar({
  citySlug,
  size = "default",
  placeholder = "Busque por empresas, serviços, eventos...",
  defaultValue = "",
  className,
}: {
  citySlug: string;
  size?: "default" | "lg";
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}) {
  const router = useRouter();
  const [value, setValue] = React.useState(defaultValue);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.push(`/${citySlug}/busca${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={cn(
        "flex w-full items-center gap-2 rounded-full border border-border bg-background shadow-soft transition-shadow focus-within:shadow-float",
        size === "lg" ? "h-14 pl-5 pr-2" : "h-12 pl-4 pr-2",
        className,
      )}
    >
      <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar"
        className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className={cn(
          "shrink-0 rounded-full bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-95",
          size === "lg" ? "h-10 px-6 text-sm" : "h-9 px-5 text-sm",
        )}
      >
        Buscar
      </button>
    </form>
  );
}
