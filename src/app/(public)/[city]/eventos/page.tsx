import type { Metadata } from "next";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { getUpcomingEvents } from "@/features/events/queries";
import { SectionHeading } from "@/components/section-heading";
import { EventCard } from "@/components/event-card";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Eventos",
  description: "Agenda de eventos, shows e festivais da sua cidade.",
};

type Params = { params: Promise<{ city: string }> };

export default async function EventsPage({ params }: Params) {
  const { city } = await params;
  const tenant = await requireTenant(city);
  const events = await getUpcomingEvents(tenant.id);

  return (
    <div className="container py-8">
      <SectionHeading
        title="Agenda de eventos"
        subtitle={`O que vai acontecer em ${tenant.name}`}
      />
      {events.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          Nenhum evento agendado no momento.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} citySlug={tenant.slug} />
          ))}
        </div>
      )}
    </div>
  );
}
