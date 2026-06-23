export type AppRole = "consumer" | "business" | "admin";
export type MembershipRole = "owner" | "manager" | "staff";

export type BusinessType =
  | "empresa"
  | "restaurante"
  | "servico"
  | "hotel"
  | "loja"
  | "autonomo";

export type EntityStatus = "draft" | "pending" | "published" | "blocked";

export type PlanTier = "free" | "premium" | "gold";

export type AnalyticsEventType =
  | "view"
  | "whatsapp_click"
  | "phone_click"
  | "website_click"
  | "favorite";

export type FavoriteEntity = "business" | "event" | "promotion" | "product";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  state: string;
  logoUrl: string | null;
  bannerUrl: string | null;
  theme: Record<string, string> | null;
  status: EntityStatus;
  lat: number | null;
  lng: number | null;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
}

export interface Neighborhood {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
}

export interface BusinessHour {
  weekday: number; // 0 = Sunday
  opensAt: string | null; // "08:00"
  closesAt: string | null; // "18:00"
  closed: boolean;
}

export interface Business {
  id: string;
  tenantId: string;
  slug: string;
  name: string;
  type: BusinessType;
  categoryId: string;
  category?: Category;
  neighborhoodId: string | null;
  neighborhood?: Neighborhood;
  description: string;
  shortDescription: string;
  logoUrl: string | null;
  coverUrl: string | null;
  whatsapp: string | null;
  phone: string | null;
  instagram: string | null;
  website: string | null;
  address: string;
  lat: number;
  lng: number;
  status: EntityStatus;
  isFeatured: boolean;
  planTier: PlanTier;
  ratingAvg: number;
  ratingCount: number;
  priceLevel: 1 | 2 | 3 | 4;
  hours: BusinessHour[];
  gallery: string[];
  tags: string[];
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
}

export interface Promotion {
  id: string;
  tenantId: string;
  businessId: string;
  business?: Pick<Business, "id" | "name" | "slug" | "logoUrl">;
  title: string;
  description: string;
  bannerUrl: string | null;
  discountLabel: string;
  startsAt: string;
  endsAt: string;
  rules: string | null;
  couponCode: string | null;
}

export interface CityEvent {
  id: string;
  tenantId: string;
  businessId: string | null;
  name: string;
  slug: string;
  description: string;
  bannerUrl: string | null;
  startsAt: string;
  endsAt: string | null;
  venue: string;
  address: string;
  lat: number | null;
  lng: number | null;
  ticketFrom: number | null;
  isFree: boolean;
}

export interface Review {
  id: string;
  businessId: string;
  authorName: string;
  authorAvatar: string | null;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  tenantId: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string | null;
  coverUrl: string | null;
  publishedAt: string;
  author: string;
}

export interface SearchFilters {
  query?: string;
  categorySlug?: string;
  neighborhoodSlug?: string;
  priceLevel?: number;
  minRating?: number;
  openNow?: boolean;
  sort?: "relevance" | "rating" | "distance";
}
