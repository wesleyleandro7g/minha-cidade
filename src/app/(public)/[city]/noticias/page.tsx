import type { Metadata } from "next";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { getLatestNews } from "@/features/news/queries";
import { SectionHeading } from "@/components/section-heading";
import { NewsCard } from "@/features/news/components/news-card";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Notícias locais",
  description: "Fique por dentro das notícias e novidades da sua cidade.",
};

type Params = { params: Promise<{ city: string }> };

export default async function NewsPage({ params }: Params) {
  const { city } = await params;
  const tenant = await requireTenant(city);
  const news = await getLatestNews(tenant.id);

  return (
    <div className="container py-8">
      <SectionHeading
        title="Notícias locais"
        subtitle={`O que está acontecendo em ${tenant.name}`}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((article) => (
          <NewsCard key={article.id} article={article} citySlug={tenant.slug} />
        ))}
      </div>
    </div>
  );
}
