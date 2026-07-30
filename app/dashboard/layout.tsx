

import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { LogoutButton } from "@/app/components/ui/LogoutButton";
import { User } from "lucide-react";
import { Sidebar } from "../components/layout/Sidebar";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Busca os dados do perfil gerados automaticamente pelo Trigger
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

    const displayName = profile?.full_name || user.user_metadata?.full_name || "Desenvolvedor";
    const isAdmin = profile?.role === "admin";

    return (
    <DashboardClient displayName={displayName} isAdmin={isAdmin}>
      {children}
    </DashboardClient>
  );

}
