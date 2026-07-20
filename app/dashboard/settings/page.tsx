import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import { SettingsProfileForm } from "@/app/components/ui/SettingsProfileForm";
import { Settings, Sparkles } from "lucide-react";
import { SettingsSecurityForm } from "@/app/components/ui/SettingsSecurityForm";
import { SettingsDangerZone } from "@/app/components/ui/SettingsDangerZone";
import { UpgradeButton } from "@/app/components/ui/UpgradeButton";
import { ManageSubscriptionButton } from "@/app/components/ui/ManageSubscriptionButton";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Busca o perfil atual para preencher o formulário
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

    const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("id", user.id)
    .single();

    const isPro = subscription?.status === "active";

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Settings className="h-6 w-6 text-accent-blue" />
          Account Settings
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage your personal information and system preferences.{" "}
        </p>
      </div>

      {/* Formulário Renderizado no Cliente */}
      <SettingsProfileForm
        initialName={profile?.full_name || ""}
        email={user.email || ""}
      />

      <div
        className={`rounded-2xl border p-6 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
          isPro
            ? "border-accent-blue/30 bg-accent-blue/5"
            : "border-obsidian-border/50 bg-obsidian-surface/30"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-1 flex items-center gap-2">
            Current Plan
            {isPro && <Sparkles className="h-4 w-4 text-accent-blue" />}
          </h2>
          <p className="text-sm text-text-secondary">
            {isPro
              ? "You are a Pro user. Unlimited full access."
              : "You are on the Free plan. Upgrade to unlock everything."}
          </p>
        </div>
        <div className="shrink-0">
          {isPro ? <ManageSubscriptionButton /> : <UpgradeButton />}
        </div>
      </div>

      {/* Bloco 2: Segurança (Senha) */}
      <SettingsSecurityForm />

      {/* Bloco 3: Danger Zone */}
      <SettingsDangerZone />
    </div>
  );
}
