"use client"; // Necessário para usar o hook usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CreditCard, Settings, CodeSquare, Sparkles } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname(); // Pega a rota (URL) atual

  // Função auxiliar para definir o estilo baseado na rota ativa
  const getLinkStyle = (href: string) => {
    const isActive = pathname === href;
    
    return `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-accent-blue/15 text-accent-blue" // ESTADO ATIVO: Fundo colorido sutil e texto em destaque
        : "text-text-secondary hover:bg-obsidian-surface/50 hover:text-text-primary" // ESTADO INATIVO
    }`;
  };

  return (
    <aside className="glass-panel flex h-screen w-64 flex-col border-r border-y-0 border-l-0">
      
      {/* Logo Area */}
      <div className="flex h-16 items-center px-6 border-b border-obsidian-border/50">
        <CodeSquare className="mr-3 h-6 w-6 text-accent-blue" />
        <span className="text-lg font-bold text-text-primary tracking-wide">
          Obsidian Base
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 p-4">
        <Link href="/dashboard" className={getLinkStyle("/dashboard")}>
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Dashboard
        </Link>
        
        <Link href="/dashboard/generator" className={getLinkStyle("/dashboard/generator")}>
          <Sparkles className="mr-3 h-5 w-5" />
          AI Generator
        </Link>
        
        <Link href="/dashboard/projects" className={getLinkStyle("/dashboard/projects")}>
          <Users className="mr-3 h-5 w-5" />
          Projects
        </Link>
        
      
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-obsidian-border/50">
        <Link href="/dashboard/settings" className={getLinkStyle("/dashboard/settings")}>
          <Settings className="mr-3 h-5 w-5" />
          Configurações
        </Link>
      </div>
      
    </aside>
  );
}