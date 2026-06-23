"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PwaRegister } from "@/components/pwa-register";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <PwaRegister />
      {children}
    </NextThemesProvider>
  );
}
