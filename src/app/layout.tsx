import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { dmSans, syne } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(env.appUrl),
  title: {
    default: "Minha Cidade - O guia digital da sua cidade",
    template: "%s | Minha Cidade",
  },
  description:
    "Descubra empresas, restaurantes, eventos, promoções e tudo o que acontece na sua cidade. O marketplace e guia local definitivo.",
  applicationName: "Minha Cidade",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Minha Cidade",
  },
  keywords: ["guia local", "cidade", "empresas", "eventos", "promoções"],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF6B00" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1322" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(dmSans.variable, syne.variable, "font-sans")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
