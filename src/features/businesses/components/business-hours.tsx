"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClientNow } from "@/hooks/use-hydrated";
import type { BusinessHour } from "@/types";

const WEEKDAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

function isOpen(hours: BusinessHour[], now: Date) {
  const today = hours.find((h) => h.weekday === now.getDay());
  if (!today || today.closed || !today.opensAt || !today.closesAt) return false;
  const [oh, om] = today.opensAt.split(":").map(Number);
  const [ch, cm] = today.closesAt.split(":").map(Number);
  const minutes = now.getHours() * 60 + now.getMinutes();
  const open = oh * 60 + om;
  let close = ch * 60 + cm;
  if (close <= open) close += 1440;
  return minutes >= open && minutes <= close;
}

export function BusinessHours({ hours }: { hours: BusinessHour[] }) {
  const now = useClientNow();

  const open = now ? isOpen(hours, now) : false;
  const todayIdx = now?.getDay();

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display font-bold">
          <Clock className="h-4 w-4 text-primary" />
          Horário de funcionamento
        </h3>
        {now && (
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              open
                ? "bg-success/15 text-success"
                : "bg-destructive/10 text-destructive",
            )}
          >
            {open ? "Aberto agora" : "Fechado"}
          </span>
        )}
      </div>
      <ul className="space-y-1.5 text-sm">
        {hours
          .slice()
          .sort((a, b) => a.weekday - b.weekday)
          .map((h) => (
            <li
              key={h.weekday}
              className={cn(
                "flex items-center justify-between rounded-lg px-2 py-1",
                h.weekday === todayIdx && "bg-muted font-semibold",
              )}
            >
              <span>{WEEKDAYS[h.weekday]}</span>
              <span className="text-muted-foreground">
                {h.closed || !h.opensAt
                  ? "Fechado"
                  : `${h.opensAt} - ${h.closesAt}`}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
