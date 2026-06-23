"use client";

import * as React from "react";
import { trackEvent } from "@/features/analytics/actions";

/** Fires a single `view` analytics event when a business profile mounts. */
export function ViewTracker({
  tenantId,
  businessId,
}: {
  tenantId: string;
  businessId: string;
}) {
  React.useEffect(() => {
    void trackEvent({ tenantId, businessId, type: "view" });
  }, [tenantId, businessId]);

  return null;
}
