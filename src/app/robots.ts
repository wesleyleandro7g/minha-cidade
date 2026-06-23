import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/painel", "/admin", "/auth"],
    },
    sitemap: `${env.appUrl}/sitemap.xml`,
  };
}
