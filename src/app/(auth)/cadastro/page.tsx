import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Criar conta",
  robots: { index: false },
};

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="font-display text-2xl font-bold">Crie sua conta</h1>
        <p className="text-sm text-muted-foreground">
          Leva menos de um minuto.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
