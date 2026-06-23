"use client";

import * as React from "react";
import Link from "next/link";
import { useActionState } from "react";
import { Loader2, Store, User } from "lucide-react";
import { signUp, type AuthState } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    signUp,
    undefined,
  );
  const [accountType, setAccountType] = React.useState<"consumer" | "business">(
    "consumer",
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="accountType" value={accountType} />

      <div className="grid grid-cols-2 gap-3">
        <TypeOption
          active={accountType === "consumer"}
          onClick={() => setAccountType("consumer")}
          icon={<User className="h-5 w-5" />}
          label="Sou morador"
          description="Explorar a cidade"
        />
        <TypeOption
          active={accountType === "business"}
          onClick={() => setAccountType("business")}
          icon={<Store className="h-5 w-5" />}
          label="Tenho empresa"
          description="Anunciar negócio"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="fullName">Nome completo</Label>
        <Input id="fullName" name="fullName" placeholder="Seu nome" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="voce@email.com"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Mínimo 6 caracteres"
          required
        />
      </div>

      {state?.error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
          {state.success}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        Criar conta
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Já tem conta?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}

function TypeOption({
  active,
  onClick,
  icon,
  label,
  description,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-1 rounded-xl border-2 p-3 text-left transition-colors",
        active
          ? "border-primary bg-primary-soft"
          : "border-border hover:bg-muted",
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg",
          active ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        {icon}
      </span>
      <span className="text-sm font-semibold">{label}</span>
      <span className="text-xs text-muted-foreground">{description}</span>
    </button>
  );
}
