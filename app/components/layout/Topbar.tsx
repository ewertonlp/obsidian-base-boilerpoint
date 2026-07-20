import { Search, Bell, User } from "lucide-react";
import { LogoutButton } from "../ui/LogoutButton";

export function Topbar() {
  return (
    <header className="glass-panel sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-obsidian-border/50 border-x-0 border-t-0 px-6">
      
      {/* Campo de Busca */}
      <div className="flex w-full max-w-md items-center rounded-full bg-obsidian-surface/50 px-4 py-2 border border-obsidian-border/50 focus-within:border-accent-blue focus-within:ring-1 focus-within:ring-accent-blue transition-all">
        <Search className="h-4 w-4 text-text-secondary" />
        <input
          type="text"
          placeholder="Buscar projetos, usuários..."
          className="ml-3 w-full bg-transparent text-sm text-text-primary placeholder:text-text-secondary focus:outline-none"
        />
      </div>

      {/* Ações e Perfil do Usuário */}
      <div className="flex items-center space-x-4">
        
        {/* Notificações */}
        <button className="relative text-text-secondary hover:text-text-primary transition-colors">
          <Bell className="h-5 w-5" />
          {/* Ponto dourado indicando nova notificação */}
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent-gold"></span>
        </button>
        
        {/* Divisor Visual */}
        <div className="h-6 w-px bg-obsidian-border/50"></div>
        
        {/* Menu de Perfil (Futuramente conectado ao Supabase Auth) */}
        <button className="flex items-center space-x-2 rounded-full bg-obsidian-surface p-1 pr-4 border border-obsidian-border/50 hover:bg-obsidian-elevated transition-colors">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-text-primary">Perfil</span>
        </button>

        <div className="border-l border-obsidian-border/50 pl-3">
            <LogoutButton />
          </div>

      </div>
    </header>
  );
}