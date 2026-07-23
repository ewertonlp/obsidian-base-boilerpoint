import { createClient } from "@/app/lib/supabase/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import {
  Users,
  CreditCard,
  Activity,
  Summary,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/dashboard");

  // ==========================================
  // BUSCANDO OS DADOS REAIS DO SAAS
  // ==========================================

  // Conta todos os perfis do banco
  const { count: totalUsers } = await supabaseAdmin
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // Conta todas as assinaturas ativas
  const { count: proUsers } = await supabaseAdmin
    .from("subscriptions")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  // Conta o total de conteúdos gerados na plataforma
  const { count: totalGenerations } = await supabaseAdmin
    .from("projects")
    .select("*", { count: "exact", head: true });

  const usersCount = totalUsers || 0;
  const proCount = proUsers || 0;

  // 3. Cálculo da Receita (Exemplo: Plano custa $9)
  // Em um cenário avançado, você buscaria isso da API do Stripe, mas
  // calcular com base no banco local é instantâneo e ótimo para o boilerplate.
  const PLAN_PRICE = 9;
  const monthlyRevenue = proCount * PLAN_PRICE;

  // 4. Cálculo da Taxa de Conversão
  const conversionRate =
    usersCount > 0 ? ((proCount / usersCount) * 100).toFixed(1) : "0.0";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-accent-blue/90">
          Admin Dashboard
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Here is your Admin control panel.
        </p>
      </div>
      {/* Grid de Métricas Globais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-obsidian-surface/30 border border-obsidian-border/50 p-6 rounded-xl backdrop-blur-xl flex flex-col hover:border-obsidian-border transition-colors">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-text-secondary">
              Total Users
            </span>
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Users className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            <h2 className="text-3xl font-bold text-text-primary">
              {usersCount.toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="bg-obsidian-surface/30 border border-obsidian-border/50 p-6 rounded-xl backdrop-blur-xl flex flex-col hover:border-obsidian-border transition-colors">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-text-secondary">
              Monthly Revenue (MRR)
            </span>
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <CreditCard className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            <h2 className="text-3xl font-bold text-text-primary">
              ${monthlyRevenue.toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="bg-obsidian-surface/30 border border-obsidian-border/50 p-6 rounded-xl backdrop-blur-xl flex flex-col hover:border-obsidian-border transition-colors">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-text-secondary">
              Conversion Rate
            </span>
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            {/* INJETANDO O DADO REAL */}
            <h2 className="text-3xl font-bold text-text-primary">
              {conversionRate}%
            </h2>
          </div>
        </div>

        <div className="bg-obsidian-surface/30 border border-obsidian-border/50 p-6 rounded-xl backdrop-blur-xl flex flex-col hover:border-obsidian-border transition-colors">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-text-secondary">
              Total Generations
            </span>
            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Summary className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            {/* INJETANDO O DADO REAL */}
            <h2 className="text-3xl font-bold text-text-primary">
              {totalGenerations}
            </h2>
          </div>
        </div>
      </div>

      {/* Seção de Atividade Recente (Gráfico) */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Desempenho de Gerações da IA (Últimos 7 dias)
        </h3>

        {/* Placeholder do Gráfico em Glassmorphism */}
        <div className="h-[400px] w-full rounded-xl border border-obsidian-border/50 bg-obsidian-surface/30 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden group">
          {/* Efeitos Visuais de Fundo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-blue/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Linhas de Grade Simuladas (Estética) */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
          <div className="absolute inset-x-0 top-1/4 border-t border-obsidian-border/20 w-full" />
          <div className="absolute inset-x-0 top-2/4 border-t border-obsidian-border/20 w-full" />
          <div className="absolute inset-x-0 top-3/4 border-t border-obsidian-border/20 w-full" />

          <BarChart3 className="w-10 h-10 text-text-secondary/30 mb-4 z-10" />
          <p className="text-sm text-text-secondary z-10">
            A biblioteca Recharts renderizará o gráfico de crescimento aqui.
          </p>
        </div>
      </div>
    </div>
  );
}
