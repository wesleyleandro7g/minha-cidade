import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { getNewsBySlug } from "@/features/news/queries";

export const revalidate = 600;

type Params = { params: Promise<{ city: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city, slug } = await params;
  const tenant = await requireTenant(city);
  const article = await getNewsBySlug(tenant.id, slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverUrl ? [article.coverUrl] : undefined,
      type: "article",
    },
  };
}

export default async function NewsDetailPage({ params }: Params) {
  const { city, slug } = await params;
  const tenant = await requireTenant(city);
  const article = await getNewsBySlug(tenant.id, slug);
  if (!article) notFound();

  return (
    <article className="container max-w-3xl py-8">
      <time className="text-sm font-semibold text-primary">
        {format(new Date(article.publishedAt), "dd 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        })}
      </time>
      <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Por {article.author}</p>

      {article.coverUrl && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={article.coverUrl}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className="prose mt-6 max-w-none">
        <p className="text-lg leading-relaxed text-foreground/90">
          {article.excerpt}
        </p>
        {article.content && (
          <p className="mt-4 whitespace-pre-line leading-relaxed text-foreground/90">
            {article.content}
          </p>
        )}
      </div>
    </article>
  );
}
