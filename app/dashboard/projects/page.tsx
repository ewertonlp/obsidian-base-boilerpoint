import { createClient } from "@/app/lib/supabase/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import ProjectsList from "./ProjectsList";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Busca os dados no servidor (rápido e seguro)
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Generation History
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Access and manage all content created by the artificial intelligence.
          </p>
        </div>
        <Link 
          href="/dashboard/generator"
          className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Generation
        </Link>
      </div>

      {/* Renderiza o componente interativo passando os dados */}
      <ProjectsList initialProjects={projects || []} />
      
    </div>
  );
}