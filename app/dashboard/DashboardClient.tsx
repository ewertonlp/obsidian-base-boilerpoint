"use client";

import { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { Sidebar } from "../components/layout/Sidebar";
import { LogoutButton } from "@/app/components/ui/LogoutButton";

export function DashboardClient({
  children,
  displayName,
  isAdmin
}: {
  children: React.ReactNode;
  displayName: string;
  isAdmin: boolean;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-obsidian-bg text-text-primary selection:bg-accent-blue/30">
      
      {/* 
        SIDEBAR (Responsiva)
        Desktop: Fixa à esquerda
        Mobile: Deslizante com transição suave
      */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-obsidian-surface border-r border-obsidian-border/50
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Botão de Fechar Exclusivo do Mobile */}
        <div className="flex items-center justify-end p-4 md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-text-secondary hover:text-text-primary"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Conteúdo do seu Sidebar original */}
       <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <Sidebar isAdmin={isAdmin} />
        </div>
      </aside>

      {/* OVERLAY ESCURO (Apenas Mobile - Fecha ao clicar fora) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ÁREA PRINCIPAL */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* TOPBAR */}
        <header className="flex h-16 items-center justify-between border-b border-obsidian-border/50 bg-obsidian-surface/30 px-4 md:px-6 backdrop-blur-xl z-10">
          
          <div className="flex items-center">
            {/* Botão Menu Hambúrguer (Apenas Mobile) */}
            <button 
              className="mr-4 md:hidden text-text-secondary hover:text-text-primary"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Perfil e Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-obsidian-border/50 bg-obsidian-surface/50 px-3 py-1.5 shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-blue/20 border border-accent-blue/50">
                <User className="h-3.5 w-3.5 text-accent-blue" />
              </div>
              <span className="text-sm font-medium hidden sm:inline-block">
                {displayName}
              </span>
              <div className="ml-2 border-l border-obsidian-border/50 pl-3">
                <LogoutButton />
              </div>
            </div>
          </div>
        </header>

        {/* CONTEÚDO DINÂMICO (Filhos) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>

      </div>
    </div>
  );
}