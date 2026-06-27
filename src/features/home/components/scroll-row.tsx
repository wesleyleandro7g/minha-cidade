import { cn } from "@/lib/utils";

export function ScrollRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "-mx-1 flex gap-4 overflow-x-auto pb-2 px-1 scrollbar-none snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:px-0 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ScrollRowItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-w-[min(88vw,320px)] shrink-0 snap-start sm:min-w-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
