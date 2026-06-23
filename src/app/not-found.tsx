import Link from "next/link";
import { MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <MapPinOff className="h-8 w-8" />
      </span>
      <h1 className="font-display text-3xl font-bold">Página não encontrada</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        A cidade ou página que você procura não existe ou foi movida.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Voltar ao início</Link>
      </Button>
    </main>
  );
}
