import Link from "next/link";
import { MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12 transition-colors duration-300">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-70" />
      
      {/* Floating Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/8 dark:bg-primary/12 blur-[100px] animate-pulse duration-[8000ms]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-[250px] w-[250px] rounded-full bg-orange-500/6 dark:bg-orange-500/10 blur-[90px] animate-pulse duration-[6000ms]" />

      {/* Floating Theme Toggle */}
      <div className="absolute right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        {/* Animated Brand Logo */}
        <Link href="/" className="mb-8 flex items-center gap-2.5 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-soft group-hover:scale-105 transition-transform duration-300">
            <MapPin className="h-5.5 w-5.5" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight hover:text-primary transition-colors">
            Minha Cidade
          </span>
        </Link>

        {/* Frosted Glass Card Container */}
        <div className="w-full rounded-[2.5rem] border border-border bg-card/85 p-8 shadow-card backdrop-blur-xl animate-fade-up">
          {children}
        </div>
      </div>
    </div>
  );
}
