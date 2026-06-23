import { Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, cn } from "@/lib/utils";
import type { Review } from "@/types";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        Ainda não há avaliações. Seja o primeiro a avaliar!
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li
          key={review.id}
          className="rounded-2xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            <Avatar>
              {review.authorAvatar && (
                <AvatarImage src={review.authorAvatar} alt={review.authorName} />
              )}
              <AvatarFallback>{getInitials(review.authorName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{review.authorName}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </p>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < review.rating
                      ? "fill-secondary text-secondary"
                      : "fill-muted text-muted",
                  )}
                />
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-foreground/90">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
