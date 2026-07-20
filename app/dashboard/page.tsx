import { Users, CreditCard, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Cabeçalho da Página */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">Visão Geral</h1>
        <p className="text-sm text-text-secondary mt-1">
          Bem-vindo ao seu painel de controle. Aqui está o resumo do seu projeto.
        </p>
      </div>

      {/* Grid de Estatísticas - Alto Contraste e Glassmorphism */}
      <div className="grid gap-5 md:grid-cols-3">
        
        {/* Card 1 - Destaque em Azul */}
        <div className="rounded-2xl border border-obsidian-border/50 bg-obsidian-surface/30 p-6 backdrop-blur-xl transition-all hover:bg-obsidian-surface/50">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-secondary">Usuários Ativos</p>
            <div className="rounded-full bg-accent-blue/10 p-2.5 text-accent-blue">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-text-primary">1,248</h2>
            <span className="flex items-center text-xs font-medium text-green-400">
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
              +12.5%
            </span>
          </div>
        </div>

        {/* Card 2 - Destaque em Verde Suave */}
        <div className="rounded-2xl border border-obsidian-border/50 bg-obsidian-surface/30 p-6 backdrop-blur-xl transition-all hover:bg-obsidian-surface/50">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-secondary">Receita Mensal</p>
            <div className="rounded-full bg-emerald-500/10 p-2.5 text-emerald-400">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-text-primary">$8,234</h2>
            <span className="flex items-center text-xs font-medium text-green-400">
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
              +8.1%
            </span>
          </div>
        </div>

        {/* Card 3 - Destaque em Dourado */}
        <div className="rounded-2xl border border-obsidian-border/50 bg-obsidian-surface/30 p-6 backdrop-blur-xl transition-all hover:bg-obsidian-surface/50">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-secondary">Taxa de Conversão</p>
            <div className="rounded-full bg-amber-500/10 p-2.5 text-amber-400">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-text-primary">3.2%</h2>
            <span className="flex items-center text-xs font-medium text-red-400">
              <ArrowDownRight className="h-3 w-3 mr-0.5" />
              -1.4%
            </span>
          </div>
        </div>
      </div>

      {/* Área de Conteúdo Recente (Placeholder para Gráficos ou Tabelas) */}
      <div className="rounded-2xl border border-obsidian-border/50 bg-obsidian-surface/20 p-6 backdrop-blur-md">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Atividade Recente</h3>
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-obsidian-border/50 bg-obsidian-bg/50">
          <p className="text-sm text-text-secondary">O gráfico de desempenho será renderizado aqui.</p>
        </div>
      </div>

    </div>
  );
}