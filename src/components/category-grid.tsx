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
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-10">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/${citySlug}/categorias/${category.slug}`}
          className="group flex flex-col items-center gap-2 rounded-2xl p-2 text-center transition-colors hover:bg-muted"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform group-hover:-translate-y-0.5 group-hover:shadow-soft">
            <CategoryIcon name={category.icon} className="h-6 w-6" />
          </span>
          <span className="text-xs font-medium leading-tight">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
