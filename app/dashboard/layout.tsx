import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { LogoutButton } from "@/app/components/ui/LogoutButton";
import { LayoutDashboard, Settings, Code, User, Sparkles } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "../components/layout/Sidebar";

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

  return (
    <div className="flex min-h-screen bg-obsidian-bg text-text-primary selection:bg-accent-blue/30">
      {/* Sidebar - Glassmorphism e Alto Contraste */}
      <aside className="hidden w-64 flex-col  md:flex">
        <Sidebar />
      </aside>

      {/* Área Principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar - Superfície Translúcida */}
        <header className="flex h-16 items-center justify-between border-b border-obsidian-border/50 bg-obsidian-surface/30 px-6 backdrop-blur-xl">
          <div className="flex items-center">
            {/* Espaço para um botão de menu mobile no futuro */}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-obsidian-border/50 bg-obsidian-surface/50 px-3 py-1.5 shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-blue/20">
                <User className="h-3.5 w-3.5 text-accent-blue" />
              </div>
              <span className="text-sm font-medium">
                {displayName}
              </span>
              <div className="ml-2 border-l border-obsidian-border/50 pl-3">
                <LogoutButton />
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo Dinâmico (As páginas entram aqui) */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
