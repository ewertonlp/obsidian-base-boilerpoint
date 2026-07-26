import { createClient } from "@/app/lib/supabase/server";
import { Sparkles, Crown, FileText, ArrowRight, Activity, Clock } from "lucide-react";
import Link from "next/link";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";

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
        <p className="text-sm text-text-secondary mt-1">
          Welcome back. Here is a summary of your content generation activity.
        </p>
      </div>

      {/* Grid de Métricas usando os Componentes de UI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Generations */}
        <Card glowColor="blue" className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-text-secondary">Total Generations</span>
            <div className="p-2 bg-accent-blue/10 rounded-lg border border-accent-blue/20">
              <Sparkles className="w-4 h-4 text-accent-blue" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            <h2 className="text-3xl font-bold text-text-primary">{totalGenerations || 0}</h2>
            <span className="text-xs font-medium text-text-secondary">contents created</span>
          </div>
        </Card>

        {/* Card 2: Current Plan */}
        <Card glowColor="green" className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-text-secondary">Current Plan</span>
            <div className="p-2 bg-accent-green/10 rounded-lg border border-accent-green/20">
              <Crown className="w-4 h-4 text-accent-green" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            <h2 className="text-3xl font-bold text-text-primary">{isPro ? "Pro" : "Free"}</h2>
            <span className="text-xs font-medium text-text-secondary">
              {isPro ? "Active subscription" : "Basic features only"}
            </span>
          </div>
        </Card>

        {/* Card 3: Quick Action (Elevated para destaque) */}
        <Card elevated glowColor="violet" className="p-6 flex flex-col justify-between relative overflow-hidden group h-full">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-violet/20 blur-2xl rounded-full pointer-events-none transition-all group-hover:bg-accent-violet/30" />
          
          <div className="relative z-10">
            <span className="text-sm font-medium text-text-secondary">Need new content?</span>
            <p className="text-xs text-text-secondary/70 mt-2">Access the AI generator and start creating immediately.</p>
          </div>
          
          <Link href="/dashboard/generator" className="w-full mt-4 relative z-10">
            <Button variant="primary" className="w-full bg-accent-violet hover:bg-accent-violet/80 text-obsidian-bg shadow-accent-violet/20 border-none md:cursor-pointer">
              <Sparkles className="w-4 h-4 mr-2" /> Launch Generator
            </Button>
          </Link>
        </Card>

      </div>

      {/* Seção de Atividade Recente encapsulada no Card */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Activity className="w-5 h-5 text-text-secondary" />
            Recent Activity
          </h3>
          <Link 
            href="/dashboard/projects" 
            className="text-sm text-accent-blue hover:text-blue-400 flex items-center gap-1 transition-colors"
          >
            View all history <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <Card className="overflow-hidden p-0 border-obsidian-border/50">
          {recentProjects && recentProjects.length > 0 ? (
            <div className="divide-y divide-obsidian-border/50">
              {recentProjects.map((project) => (
                <div key={project.id} className="p-4 hover:bg-obsidian-elevated/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-obsidian-surface/50 rounded-lg border border-obsidian-border/50">
                      <FileText className="w-4 h-4 text-text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-text-primary truncate max-w-[250px] sm:max-w-md">
                        {project.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-accent-blue font-medium bg-accent-blue/10 px-2 py-0.5 rounded-full border border-accent-blue/20">
                          {project.type}
                        </span>
                        <span className="flex items-center text-xs text-text-secondary gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(project.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    href="/dashboard/projects"
                    className="text-xs font-medium text-text-secondary hover:text-text-primary bg-obsidian-surface/50 hover:bg-obsidian-elevated px-3 py-1.5 rounded-md transition-colors whitespace-nowrap text-center border border-obsidian-border/30"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <FileText className="w-10 h-10 text-text-secondary/30 mb-3" />
              <p className="text-sm text-text-secondary">No content generated yet.</p>
              <Link 
                href="/dashboard/generator"
                className="text-sm text-accent-blue hover:text-blue-400 mt-2 font-medium"
              >
                Create your first content
              </Link>
            </div>
          )}
        </Card>
      </div>
      
    </div>
  );
}