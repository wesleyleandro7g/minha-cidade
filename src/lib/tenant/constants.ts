/** First-path segments that are NOT city tenants. */
export const RESERVED_SEGMENTS = new Set([
  "",
  "api",
  "_next",
  "auth",
  "login",
  "cadastro",
  "logout",
  "admin",
  "painel",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "manifest.webmanifest",
  "sw.js",
  "icons",
  "images",
  "fonts",
]);

export const TENANT_HEADER = "x-tenant-slug";
export const PATHNAME_HEADER = "x-pathname";

export function isReservedSegment(segment: string) {
  return RESERVED_SEGMENTS.has(segment) || segment.includes(".");
}
