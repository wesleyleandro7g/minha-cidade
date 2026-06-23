import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { getEventBySlug } from "@/features/events/queries";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/favorite-button";
import { MapView } from "@/components/maps/map-view";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 600;

type Params = { params: Promise<{ city: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city, slug } = await params;
  const tenant = await requireTenant(city);
  const event = await getEventBySlug(tenant.id, slug);
  if (!event) return {};
  return {
    title: event.name,
    description: event.description.slice(0, 155),
    openGraph: {
      title: event.name,
      images: event.bannerUrl ? [event.bannerUrl] : undefined,
    },
  };
}

export default async function EventDetailPage({ params }: Params) {
  const { city, slug } = await params;
  const tenant = await requireTenant(city);
  const event = await getEventBySlug(tenant.id, slug);
  if (!event) notFound();

  const date = new Date(event.startsAt);
  const href = `/${tenant.slug}/eventos/${event.slug}`;

  return (
    <article className="container py-6">
      <div className="relative aspect-[21/9] overflow-hidden rounded-3xl">
        {event.bannerUrl && (
          <Image
            src={event.bannerUrl}
            alt={event.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          {event.isFree ? (
            <Badge variant="success">Gratuito</Badge>
          ) : (
            <Badge className="gradient-brand border-0">
              A partir de {formatCurrency(event.ticketFrom ?? 0)}
            </Badge>
          )}
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            {event.name}
          </h1>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-bold">Sobre o evento</h2>
            <FavoriteButton
              variant="inline"
              className="ml-auto h-9 w-9"
              item={{
                id: event.id,
                type: "event",
                title: event.name,
                image: event.bannerUrl,
                href,
                subtitle: event.venue,
              }}
            />
          </div>
          <p className="whitespace-pre-line leading-relaxed text-foreground/90">
            {event.description}
          </p>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">
                  {format(date, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(date, "HH'h'mm", { locale: ptBR })}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">{event.venue}</p>
                <p className="text-sm text-muted-foreground">{event.address}</p>
              </div>
            </div>
            {!event.isFree && (
              <div className="flex items-start gap-3">
                <Ticket className="mt-0.5 h-5 w-5 text-primary" />
                <p className="text-sm">
                  Ingressos a partir de{" "}
                  <span className="font-semibold">
                    {formatCurrency(event.ticketFrom ?? 0)}
                  </span>
                </p>
              </div>
            )}
          </div>

          {event.lat && event.lng && (
            <MapView
              center={{ lat: event.lat, lng: event.lng }}
              markers={[
                { id: event.id, lat: event.lat, lng: event.lng, active: true },
              ]}
              className="h-56 w-full"
            />
          )}
        </aside>
      </div>
    </article>
  );
}
