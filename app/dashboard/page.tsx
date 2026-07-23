import { createClient } from "@/app/lib/supabase/server";
import { Sparkles, Crown, FileText, ArrowRight, Activity, Clock } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Busca o status da assinatura
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status")
   .eq("id", user?.id)
    .single();

  const isPro = subscription?.status === "active";

  // 2. Conta o total de gerações do usuário
  const { count: totalGenerations } = await supabase
    .from("projects")
    .select("*", { count: 'exact', head: true })
    .eq("user_id", user?.id);

  // 3. Busca os 3 projetos mais recentes para a lista de atividade
  const { data: recentProjects } = await supabase
    .from("projects")
    .select("id, title, type, created_at")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(3);

  // Formatador de data
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
    }).format(new Date(dateString));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-accent-blue/90">
          Overview
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Welcome back. Here is a summary of your content generation activity.
        </p>
      </div>

      {/* Grid de Métricas (Glassmorphism) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Generations */}
        <div className="bg-obsidian/50 border border-neutral-800 p-6 rounded-xl backdrop-blur-xl flex flex-col hover:border-neutral-700 transition-colors">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-neutral-400">Total Generations</span>
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            <h2 className="text-3xl font-bold text-white">{totalGenerations || 0}</h2>
            <span className="text-xs font-medium text-neutral-500">contents created</span>
          </div>
        </div>

        {/* Card 2: Current Plan */}
        <div className="bg-obsidian/50 border border-neutral-800 p-6 rounded-xl backdrop-blur-xl flex flex-col hover:border-neutral-700 transition-colors">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-neutral-400">Current Plan</span>
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <Crown className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            <h2 className="text-3xl font-bold text-white">{isPro ? "Pro" : "Free"}</h2>
            <span className="text-xs font-medium text-neutral-500">
              {isPro ? "Active subscription" : "Basic features only"}
            </span>
          </div>
        </div>

        {/* Card 3: Quick Action */}
        <div className="bg-linear-to-br from-obsidian/50 to-neutral-900/50 border border-neutral-800 p-6 rounded-xl backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full pointer-events-none transition-all group-hover:bg-blue-500/20" />
          
          <div>
            <span className="text-sm font-medium text-neutral-400">Need new content?</span>
            <p className="text-xs text-neutral-500 mt-2">Access the AI generator and start creating immediately.</p>
          </div>
          
          <Link 
            href="/dashboard/generator"
            className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_15px_rgba(37,99,235,0.2)]"
          >
            <Sparkles className="w-4 h-4" />
            Launch Generator
          </Link>
        </div>

      </div>

      {/* Seção de Atividade Recente */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-neutral-400" />
            Recent Activity
          </h3>
          <Link 
            href="/dashboard/projects" 
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            View all history <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="rounded-xl border border-neutral-800 bg-obsidian/50 backdrop-blur-xl overflow-hidden">
          {recentProjects && recentProjects.length > 0 ? (
            <div className="divide-y divide-neutral-800/50">
              {recentProjects.map((project) => (
                <div key={project.id} className="p-4 hover:bg-neutral-800/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                      <FileText className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white truncate max-w-[250px] sm:max-w-md">
                        {project.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-blue-400 font-medium bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                          {project.type}
                        </span>
                        <span className="flex items-center text-xs text-neutral-500 gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(project.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    href="/dashboard/projects"
                    className="text-xs font-medium text-neutral-400 hover:text-white bg-neutral-800/50 hover:bg-neutral-700 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap text-center"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <FileText className="w-10 h-10 text-neutral-600 mb-3" />
              <p className="text-sm text-neutral-400">No content generated yet.</p>
              <Link 
                href="/dashboard/generator"
                className="text-sm text-blue-400 hover:text-blue-300 mt-2 font-medium"
              >
                Create your first content
              </Link>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}