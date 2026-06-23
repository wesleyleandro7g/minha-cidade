import { cn } from "@/lib/utils";

export function PriceLevel({
  level,
  className,
}: {
  level: number;
  className?: string;
}) {
  return (
    <span className={cn("text-sm font-medium", className)} aria-label={`Faixa de preço ${level} de 4`}>
      <span className="text-foreground">{"$".repeat(level)}</span>
      <span className="text-muted-foreground/40">{"$".repeat(4 - level)}</span>
    </span>
  );
}
