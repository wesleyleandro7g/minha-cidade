import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Minha Cidade - Guia digital local",
    short_name: "Minha Cidade",
    description:
      "Descubra empresas, eventos, promoções e tudo o que acontece na sua cidade.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#FF6B00",
    orientation: "portrait",
    categories: ["lifestyle", "shopping", "travel", "food"],
    icons: [
      { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
