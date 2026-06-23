import Link from "next/link";
import { MapPin } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand text-white">
          <MapPin className="h-6 w-6" />
        </span>
        <span className="font-display text-xl font-extrabold">
          Minha Cidade
        </span>
      </Link>
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        {children}
      </div>
    </div>
  );
}
