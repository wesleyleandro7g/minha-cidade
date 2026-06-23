"use client";

import { useEffect } from "react";

/** Registers the service worker for offline caching (PWA). */
export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      // A stale SW caches /_next chunks and breaks Turbopack HMR in dev.
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Non-fatal — app works without SW.
    });
  }, []);

  return null;
}
