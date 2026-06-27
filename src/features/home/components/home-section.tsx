import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import type { LucideIcon } from "lucide-react";

type HomeSectionProps = {
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  variant?: "default" | "accent" | "muted" | "warm";
  className?: string;
  children: React.ReactNode;
};

const variantStyles = {
  default: "",
  accent:
    "rounded-[2rem] border border-primary/12 bg-gradient-to-br from-primary-soft/50 via-card to-card p-6 sm:p-10 dark:from-primary/8 dark:border-primary/10",
  muted:
    "rounded-[2rem] border border-border bg-muted/30 p-6 sm:p-10 dark:bg-muted/15",
  warm:
    "rounded-[2rem] border border-amber-500/12 bg-gradient-to-br from-amber-500/8 via-transparent to-orange-500/5 p-6 sm:p-10 dark:from-amber-500/6",
};

export function HomeSection({
  eyebrow,
  icon: Icon,
  title,
  subtitle,
  href,
  linkLabel,
  variant = "default",
  className,
  children,
}: HomeSectionProps) {
  const isBoxed = variant !== "default";

  return (
    <section
      className={cn(
        "container mt-14 sm:mt-16",
        isBoxed && variantStyles[variant],
        className,
      )}
    >
      <div className="mb-1 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10">
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </span>
      </div>
      <SectionHeading
        title={title}
        subtitle={subtitle}
        href={href}
        linkLabel={linkLabel}
      />
      {children}
    </section>
  );
}
