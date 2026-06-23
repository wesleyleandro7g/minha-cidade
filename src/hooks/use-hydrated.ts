"use client";

import { useSyncExternalStore } from "react";

/** True after the client has hydrated — avoids SSR/client mismatches. */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** Current date on the client; null during SSR. */
export function useClientNow() {
  return useSyncExternalStore(
    () => () => {},
    () => new Date(),
    () => null,
  );
}
