"use server";

import { db, schema } from "@/lib/db";
import type { AnalyticsEventType } from "@/types";

/**
 * Records an analytics event for a business (view, whatsapp_click, etc.).
 * No-op when the database isn't configured so the public area still works on
 * seed data.
 */
export async function trackEvent(input: {
  tenantId: string;
  businessId: string;
  type: AnalyticsEventType;
  metadata?: Record<string, unknown>;
}) {
  if (!db) return { ok: false as const, skipped: true as const };

  try {
    await db.insert(schema.analyticsEvents).values({
      tenantId: input.tenantId,
      businessId: input.businessId,
      type: input.type,
      metadata: input.metadata,
    });
    return { ok: true as const };
  } catch (error) {
    console.error("trackEvent failed", error);
    return { ok: false as const };
  }
}
