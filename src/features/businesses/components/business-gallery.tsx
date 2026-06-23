"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function BusinessGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = React.useState(0);
  if (images.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
        <Image
          src={images[active]}
          alt={`${alt} - foto ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-colors",
                i === active ? "border-primary" : "border-transparent opacity-70",
              )}
            >
              <Image
                src={src}
                alt={`${alt} miniatura ${i + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
