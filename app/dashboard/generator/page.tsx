// src/app/dashboard/generator/page.tsx
export const dynamic = "force-dynamic";

import { createClient } from "@/app/lib/supabase/server";
import { Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import GeneratorClient from "./GeneratorClient";

export default async function GeneratorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Verifica o status da assinatura do usuário no banco
 const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("id", user?.id);

  console.log("=== DIAGNÓSTICO PROFUNDO ===");
  console.log("1. Buscando o ID exato:", user?.id);
  console.log("2. Dados que voltaram:", JSON.stringify(subscription));
  console.log("3. Erro real (se houver):", JSON.stringify(error));

  const isPro = subscription?.[0]?.status === "active";

  // Se o usuário for PRO, renderiza a interface do gerador
  if (isPro) {
    return <GeneratorClient />;
  }

  // Se o usuário for FREE, renderiza a tela de bloqueio com Glassmorphism
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in-95 duration-700">
      <div className="bg-obsidian-surface/30 border border-obsidian-border/50 p-8 rounded-2xl backdrop-blur-xl text-center space-y-6 relative overflow-hidden">
        
        {/* Efeito visual de fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-accent-blue/20 blur-[50px] rounded-full pointer-events-none" />

        <div className="mx-auto w-16 h-16 bg-obsidian-elevated flex items-center justify-center rounded-full border border-obsidian-border/50 mb-6">
          <Lock className="w-8 h-8 text-accent-blue" />
        </div>
        
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Unlock the AI Generator
        </h1>
        
        <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
          You are currently on the Free plan. Upgrade to Pro to get unlimited access to our elite artificial intelligence and start generating high-quality content.
        </p>
        
        <div className="pt-4">
          <Link 
            href="/dashboard/settings"
            className="inline-flex items-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            <Sparkles className="w-4 h-4" />
            Upgrade to Pro
          </Link>
        </div>
      </div>
    </div>
  );
}