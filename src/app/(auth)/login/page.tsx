import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false },
};

type Props = { searchParams: Promise<{ next?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { next } = await searchParams;

  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="font-display text-2xl font-bold">Bem-vindo de volta</h1>
        <p className="text-sm text-muted-foreground">
          Entre para acessar seus favoritos e cupons.
        </p>
      </div>
      <LoginForm next={next ?? "/"} />
    </div>
  );
}
