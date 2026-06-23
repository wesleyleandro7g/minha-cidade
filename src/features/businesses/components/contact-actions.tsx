"use client";

import { Phone, Globe, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/features/analytics/actions";
import type { AnalyticsEventType, Business } from "@/types";

export function ContactActions({ business }: { business: Business }) {
  function track(type: AnalyticsEventType) {
    void trackEvent({
      tenantId: business.tenantId,
      businessId: business.id,
      type,
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {business.whatsapp && (
        <Button
          asChild
          className="flex-1 bg-[#25D366] text-white hover:bg-[#1ebe5b]"
          onClick={() => track("whatsapp_click")}
        >
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </Button>
      )}
      {business.phone && (
        <Button
          asChild
          variant="outline"
          size="icon"
          aria-label="Ligar"
          onClick={() => track("phone_click")}
        >
          <a href={`tel:${business.phone}`}>
            <Phone className="h-4 w-4" />
          </a>
        </Button>
      )}
      {business.instagram && (
        <Button asChild variant="outline" size="icon" aria-label="Instagram">
          <a
            href={`https://instagram.com/${business.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </Button>
      )}
      {business.website && (
        <Button
          asChild
          variant="outline"
          size="icon"
          aria-label="Site"
          onClick={() => track("website_click")}
        >
          <a href={business.website} target="_blank" rel="noopener noreferrer">
            <Globe className="h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
  );
}
