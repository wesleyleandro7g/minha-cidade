"use client";

import * as React from "react";
import { Check, Copy, Ticket } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { Promotion } from "@/types";

export function CouponCard({ promotion }: { promotion: Promotion }) {
  const [copied, setCopied] = React.useState(false);

  function copy() {
    if (!promotion.couponCode) return;
    navigator.clipboard?.writeText(promotion.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-primary/40 bg-primary-soft p-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Ticket className="h-6 w-6" />
      </span>
      <div className="min-w-0 flex-1">
        {promotion.business && (
          <p className="truncate text-xs font-medium text-muted-foreground">
            {promotion.business.name}
          </p>
        )}
        <p className="truncate font-display font-bold leading-tight">
          {promotion.title}
        </p>
        <p className="text-xs text-muted-foreground">
          Válido até {format(new Date(promotion.endsAt), "dd 'de' MMM", { locale: ptBR })}
        </p>
      </div>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "flex shrink-0 items-center gap-1.5 rounded-lg border border-primary/30 bg-background px-3 py-2 font-mono text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {promotion.couponCode}
      </button>
    </div>
  );
}
