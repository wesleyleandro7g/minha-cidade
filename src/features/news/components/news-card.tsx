import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { NewsArticle } from "@/types";

export function NewsCard({
  article,
  citySlug,
}: {
  article: NewsArticle;
  citySlug: string;
}) {
  return (
    <Link
      href={`/${citySlug}/noticias/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={article.coverUrl ?? "/images/placeholder.svg"}
          alt={article.title}
          fill
          loading="eager"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <time className="text-xs font-medium text-primary">
          {format(new Date(article.publishedAt), "dd 'de' MMMM 'de' yyyy", {
            locale: ptBR,
          })}
        </time>
        <h3 className="font-display text-base font-bold leading-tight line-clamp-2">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
