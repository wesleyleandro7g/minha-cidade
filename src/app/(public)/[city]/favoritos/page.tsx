import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { FavoritesGrid } from "@/features/favorites/components/favorites-grid";

export const metadata: Metadata = {
  title: "Meus favoritos",
  robots: { index: false },
};

export default function FavoritesPage() {
  return (
    <div className="container py-8">
      <SectionHeading
        title="Meus favoritos"
        subtitle="Tudo o que você salvou para ver depois"
      />
      <FavoritesGrid />
    </div>
  );
}
