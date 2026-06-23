"use client";

import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { isMapboxConfigured, env } from "@/lib/env";
import { cn } from "@/lib/utils";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label?: string;
  active?: boolean;
}

interface MapViewProps {
  center: { lat: number; lng: number };
  markers?: MapMarker[];
  zoom?: number;
  className?: string;
  onMarkerClick?: (id: string) => void;
}

/**
 * Mapbox GL map. When NEXT_PUBLIC_MAPBOX_TOKEN is absent we render a tasteful
 * static fallback so the UI still works during local development.
 */
export function MapView({
  center,
  markers = [],
  zoom = 13,
  className,
  onMarkerClick,
}: MapViewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<unknown>(null);

  React.useEffect(() => {
    if (!isMapboxConfigured || !containerRef.current) return;
    let cancelled = false;

    (async () => {
      const mapboxgl = (await import("mapbox-gl")).default;
      if (cancelled || !containerRef.current) return;

      mapboxgl.accessToken = env.mapboxToken;
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [center.lng, center.lat],
        zoom,
        attributionControl: false,
      });
      mapRef.current = map;

      markers.forEach((marker) => {
        const el = document.createElement("button");
        el.className =
          "flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#FF6B00] text-white shadow-md";
        el.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>';
        el.onclick = () => onMarkerClick?.(marker.id);
        new mapboxgl.Marker({ element: el })
          .setLngLat([marker.lng, marker.lat])
          .addTo(map);
      });
    })();

    return () => {
      cancelled = true;
      const map = mapRef.current as { remove?: () => void } | null;
      map?.remove?.();
    };
  }, [center.lat, center.lng, zoom, markers, onMarkerClick]);

  if (!isMapboxConfigured) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted",
          className,
        )}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative flex flex-col items-center gap-2 text-center text-muted-foreground">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-float">
            <MapPin className="h-6 w-6" />
          </span>
          <p className="max-w-[16rem] text-xs">
            Configure <code className="font-mono">NEXT_PUBLIC_MAPBOX_TOKEN</code>{" "}
            para exibir o mapa interativo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden rounded-2xl border border-border", className)}
    />
  );
}
