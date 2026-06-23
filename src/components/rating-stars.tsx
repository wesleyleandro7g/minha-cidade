import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  count,
  size = "sm",
  showValue = true,
}: {
  rating: number;
  count?: number;
  size?: "sm" | "md";
  showValue?: boolean;
}) {
  const iconSize = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <span className="inline-flex items-center gap-1">
      <Star
        className={cn(iconSize, "fill-secondary text-secondary")}
        aria-hidden
      />
      {showValue && (
        <span className="font-semibold text-foreground">
          {rating.toFixed(1)}
        </span>
      )}
      {typeof count === "number" && (
        <span className="text-muted-foreground">({count})</span>
      )}
    </span>
  );
}
