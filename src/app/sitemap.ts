import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getAllTenants } from "@/features/tenants/queries";
import { getBusinessSlugs } from "@/features/businesses/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.appUrl;
  const tenants = await getAllTenants();

  const entries: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
  ];

  for (const tenant of tenants) {
    const root = `${base}/${tenant.slug}`;
    entries.push(
      { url: root, changeFrequency: "daily", priority: 0.9 },
      { url: `${root}/busca`, changeFrequency: "daily", priority: 0.7 },
      { url: `${root}/promocoes`, changeFrequency: "daily", priority: 0.7 },
      { url: `${root}/eventos`, changeFrequency: "daily", priority: 0.7 },
      { url: `${root}/noticias`, changeFrequency: "daily", priority: 0.6 },
    );

    const slugs = await getBusinessSlugs(tenant.id);
    for (const slug of slugs) {
      entries.push({
        url: `${root}/empresas/${slug}`,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
