import type { Metadata } from "next";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { getCurrentUser } from "@/lib/supabase/server";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { ProfileView } from "@/features/account/components/profile-view";

export const metadata: Metadata = {
  title: "Minha conta",
  robots: { index: false },
};

type Params = { params: Promise<{ city: string }> };

export default async function ProfilePage({ params }: Params) {
  const { city } = await params;
  const tenant = await requireTenant(city);
  const user = await getCurrentUser();

  const profile = user
    ? {
        name:
          (user.user_metadata?.full_name as string) ??
          user.email?.split("@")[0] ??
          "Usuário",
        email: user.email ?? "",
      }
    : null;

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-6 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg">
            {profile ? getInitials(profile.name) : "?"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-display text-2xl font-bold">
            {profile?.name ?? "Bem-vindo!"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {profile?.email ?? "Entre para salvar favoritos e resgatar cupons."}
          </p>
        </div>
      </div>

      {!profile && (
        <div className="mb-6 flex flex-col items-start gap-3 rounded-2xl border border-border bg-primary-soft p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display font-bold text-foreground">
              Crie sua conta gratuita
            </p>
            <p className="text-sm text-muted-foreground">
              Salve seus lugares favoritos e receba ofertas exclusivas.
            </p>
          </div>
          <Button asChild>
            <Link href={`/login?next=/${tenant.slug}/perfil`}>
              <LogIn className="h-4 w-4" />
              Entrar ou cadastrar
            </Link>
          </Button>
        </div>
      )}

      <ProfileView citySlug={tenant.slug} user={profile} />
    </div>
  );
}
