"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, env } from "@/lib/env";
import { loginSchema, registerSchema } from "./schemas";

export type AuthState = { error?: string; success?: string } | undefined;

const NOT_CONFIGURED =
  "Autenticação ainda não configurada. Defina as variáveis do Supabase em .env.local.";

export async function signInWithPassword(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Dados inválidos" };
  }

  const supabase = await createClient();
  if (!supabase) return { error: NOT_CONFIGURED };

  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: "E-mail ou senha incorretos." };

  const next = (formData.get("next") as string) || "/";
  redirect(next);
}

export async function signUp(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    accountType: formData.get("accountType"),
  });
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Dados inválidos" };
  }

  const supabase = await createClient();
  if (!supabase) return { error: NOT_CONFIGURED };

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${env.appUrl}/auth/callback`,
      data: {
        full_name: parsed.data.fullName,
        app_role: parsed.data.accountType,
      },
    },
  });
  if (error) return { error: "Não foi possível criar a conta. Tente novamente." };

  return {
    success:
      "Conta criada! Verifique seu e-mail para confirmar o cadastro.",
  };
}

export async function signInWithGoogle(next: string) {
  const supabase = await createClient();
  if (!supabase) return { error: NOT_CONFIGURED };

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${env.appUrl}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });
  if (error || !data.url) return { error: "Falha ao conectar com o Google." };
  redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}

export { isSupabaseConfigured };
