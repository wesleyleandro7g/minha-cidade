import Link from "next/link";
import { CategoryIcon } from "@/components/category-icon";
import type { Category } from "@/types";

export function CategoryGrid({
  categories,
  citySlug,
}: {
  categories: Category[];
  citySlug: string;
}) {
  return (
  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:pb-0 md:grid-cols-10">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          href={`/${citySlug}/categorias/${category.slug}`}
          className="group flex min-w-[4.75rem] shrink-0 snap-start flex-col items-center gap-2 rounded-2xl p-2 text-center transition-all duration-300 hover:bg-muted/80 sm:min-w-0"
          style={{ animationDelay: `${index * 40}ms` }}
        >
          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary shadow-soft ring-1 ring-primary/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-float group-hover:ring-primary/25 sm:h-[3.75rem] sm:w-[3.75rem]">
            <span
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/15 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden
            />
            <CategoryIcon name={category.icon} className="h-6 w-6 relative z-10" />
          </span>
          <span className="text-[11px] font-semibold leading-tight text-foreground/90 sm:text-xs">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
