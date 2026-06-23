import "server-only";
import { news } from "@/lib/data/fixtures";
import type { NewsArticle } from "@/types";

export async function getLatestNews(
  tenantId: string,
  limit?: number,
): Promise<NewsArticle[]> {
  const list = news
    .filter((n) => n.tenantId === tenantId)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export async function getNewsBySlug(tenantId: string, slug: string) {
  return news.find((n) => n.tenantId === tenantId && n.slug === slug) ?? null;
}
