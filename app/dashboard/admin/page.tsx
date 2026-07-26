import { createClient } from "@/app/lib/supabase/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import { Users, CreditCard, Activity, Summary, Calendar } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MetricsChart } from "@/app/components/ui/MetricsChart";
import { Card } from "@/app/components/ui/Card";

// O Next.js passa os searchParams automaticamente para a página
export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { range?: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/dashboard");

  // Define o filtro atual baseado na URL (padrão é 7d)
  const range = searchParams?.range || "7d";

  // ==========================================
  // BUSCANDO OS DADOS GLOBAIS (ALL-TIME)
  // ==========================================
  const { count: totalUsers } = await supabaseAdmin.from("profiles").select("*", { count: "exact", head: true });
  const { count: proUsers } = await supabaseAdmin.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "active");
  const { count: totalGenerations } = await supabaseAdmin.from("projects").select("*", { count: "exact", head: true });

  const usersCount = totalUsers || 0;
  const proCount = proUsers || 0;
  const PLAN_PRICE = 9;
  const monthlyRevenue = proCount * PLAN_PRICE;
  const conversionRate = usersCount > 0 ? ((proCount / usersCount) * 100).toFixed(1) : "0.0";

  // ==========================================
  // LÓGICA DO GRÁFICO DINÂMICO
  // ==========================================
  const today = new Date();
  const startDate = new Date(today);

  // Ajusta a data de início com base no filtro
  if (range === "30d") {
    startDate.setDate(today.getDate() - 29);
  } else if (range === "1y") {
    startDate.setFullYear(today.getFullYear() - 1);
    startDate.setDate(1); // Força para o dia 1 do mês para agrupar certinho
  } else {
    startDate.setDate(today.getDate() - 6); // Padrão: 7 dias
  }
  
  startDate.setHours(0, 0, 0, 0);
  const dateStrQuery = startDate.toISOString();

  // Busca os dados otimizados a partir da nova data de início
  const [recentProfiles, recentSubs, recentProjects] = await Promise.all([
    supabaseAdmin.from("profiles").select("created_at").gte("created_at", dateStrQuery),
    supabaseAdmin.from("subscriptions").select("created_at").gte("created_at", dateStrQuery).eq("status", "active"),
    supabaseAdmin.from("projects").select("created_at").gte("created_at", dateStrQuery)
  ]);

  // Função auxiliar para estruturar os dados dependendo do período (Dias vs Meses)
  const isYear = range === "1y";
  const dataPointsCount = isYear ? 12 : (range === "30d" ? 30 : 7);

  const chartTimeline = Array.from({ length: dataPointsCount }).map((_, i) => {
    let pointName = "";
    let usersInPeriod = 0;
    let proInPeriod = 0;
    let gensInPeriod = 0;

    if (isYear) {
      // AGRUPAMENTO POR MÊS (1 Ano)
      const d = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
      const monthPrefix = d.toISOString().slice(0, 7); // Ex: "2025-10"
      pointName = d.toLocaleDateString("en-US", { month: "short" });

      usersInPeriod = recentProfiles.data?.filter(p => p.created_at.startsWith(monthPrefix)).length || 0;
      proInPeriod = recentSubs.data?.filter(s => s.created_at.startsWith(monthPrefix)).length || 0;
      gensInPeriod = recentProjects.data?.filter(p => p.created_at.startsWith(monthPrefix)).length || 0;
    } else {
      // AGRUPAMENTO POR DIA (7 ou 30 dias)
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const dayStr = d.toISOString().split("T")[0]; // Ex: "2026-07-24"
      
      // Se for 30 dias, mostra o dia do mês (ex: "15"). Se for 7 dias, mostra a semana (ex: "Mon")
      pointName = range === "30d" 
        ? d.getDate().toString() 
        : d.toLocaleDateString("en-US", { weekday: "short" });

      usersInPeriod = recentProfiles.data?.filter(p => p.created_at.startsWith(dayStr)).length || 0;
      proInPeriod = recentSubs.data?.filter(s => s.created_at.startsWith(dayStr)).length || 0;
      gensInPeriod = recentProjects.data?.filter(p => p.created_at.startsWith(dayStr)).length || 0;
    }

    return {
      name: pointName,
      users: usersInPeriod,
      revenue: proInPeriod * PLAN_PRICE,
      generations: gensInPeriod,
    };
  });
  
  // LOG DE DIAGNÓSTICO (Olhe no seu terminal do VS Code)
  console.log("=== DADOS DOS GRÁFICOS ===", JSON.stringify(chartTimeline, null, 2));

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

      {/* CONTROLES DE FILTRO */}
        <div className="flex items-center bg-obsidian-surface/50 border border-obsidian-border/50 rounded-lg p-1">
          <Link 
            href="/dashboard/admin?range=7d" 
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${range === "7d" ? "bg-accent-blue/20 text-accent-blue" : "text-text-secondary hover:text-text-primary"}`}
          >
            7 Days
          </Link>
          <Link 
            href="/dashboard/admin?range=30d" 
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${range === "30d" ? "bg-accent-blue/20 text-accent-blue" : "text-text-secondary hover:text-text-primary"}`}
          >
            30 Days
          </Link>
          <Link 
            href="/dashboard/admin?range=1y" 
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${range === "1y" ? "bg-accent-blue/20 text-accent-blue" : "text-text-secondary hover:text-text-primary"}`}
          >
            1 Year
          </Link>
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
            <h2 className="text-3xl font-bold text-text-primary">
              {totalGenerations}
            </h2>
          </div>
        </div>
      </div>

      {/* Seção de Atividade Recente (Gráfico Real) */}
      <div className="space-y-4 pt-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-blue/5 blur-[80px] rounded-full pointer-events-none" />
        
       
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-primary">
              Desempenho de Gerações da IA
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              Content generation volume over the last 7 days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Gráfico 1: Receita (Verde/Dourado) */}
          <Card className="p-5 flex flex-col h-full">
            <h4 className="text-sm font-medium text-text-secondary mb-4">New Revenue</h4>
            <div className="w-full flex-1">
              <MetricsChart 
                data={chartTimeline} 
                dataKey="revenue" 
                height={200} 
                color="green" 
                valuePrefix="$" 
              />
            </div>
          </Card>

          {/* Gráfico 2: Novos Usuários (Azul) */}
          <Card className="p-5 flex flex-col h-full">
            <h4 className="text-sm font-medium text-text-secondary mb-4">New Users</h4>
            <div className="w-full flex-1">
              <MetricsChart 
                data={chartTimeline} 
                dataKey="users" 
                height={200} 
                color="blue" 
              />
            </div>
          </Card>

          {/* Gráfico 3: Gerações da IA (Roxo/Azul) */}
          <Card className="p-5 flex flex-col h-full">
            <h4 className="text-sm font-medium text-text-secondary mb-4">AI Generations</h4>
            <div className="w-full flex-1">
              <MetricsChart 
                data={chartTimeline} 
                dataKey="generations" 
                height={200} 
                color="purple" 
              />
            </div>
          </Card>

        </div>
          
       
   
     
      </div>
    </div>
  );
}