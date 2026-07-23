"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, FileText, X, Copy, Check, AlertTriangle, Loader2 } from "lucide-react";

type Project = {
  id: string;
  title: string;
  type: string;
  content: string;
  status: string;
  created_at: string;
};

export default function ProjectsList({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  
  // Estados de carregamento e modais
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
    }).format(new Date(dateString));
  };

  // Função que realmente faz a exclusão após confirmar
  const confirmDelete = async () => {
    if (!projectToDelete) return;
    
    setDeletingId(projectToDelete);
    try {
      const res = await fetch(`/api/projects/${projectToDelete}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh(); 
      } else {
        alert("Erro ao deletar o projeto.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
      setProjectToDelete(null); // Fecha o modal após deletar
    }
  };

  const copyToClipboard = () => {
    if (!selectedProject?.content) return;
    navigator.clipboard.writeText(selectedProject.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="rounded-xl border border-obsidian-border/50 bg-obsidian-surface/30 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-left text-sm text-text-secondary">
          <thead className="bg-obsidian-elevated/50 text-xs uppercase font-medium text-text-secondary border-b border-obsidian-border/50">
            <tr>
              <th className="px-6 py-4">Title / Tone</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-obsidian-border/50">
            {initialProjects && initialProjects.length > 0 ? (
              initialProjects.map((project) => (
                <tr key={project.id} className="hover:bg-obsidian-elevated/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-primary truncate max-w-[200px] sm:max-w-xs" title={project.title}>
                      {project.title}
                    </div>
                    <div className="text-xs mt-0.5 text-text-secondary/70">{project.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                      {project.status || "Completed"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(project.created_at)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="p-2 hover:bg-obsidian-elevated rounded-md hover:text-accent-blue transition-all" 
                        title="View Content"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setProjectToDelete(project.id)}
                        className="p-2 hover:bg-red-500/10 rounded-md hover:text-red-400 transition-all" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <FileText className="w-8 h-8 text-text-secondary/50" />
                    <p className="text-text-secondary">No content generated yet.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Exclusão Customizado */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setProjectToDelete(null)}
          />
          <div className="relative w-full max-w-sm bg-obsidian-surface border border-obsidian-border/50 rounded-2xl shadow-2xl p-6 text-center space-y-6">
            
            <div className="mx-auto w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-full border border-red-500/20 mb-2">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Delete Content</h3>
              <p className="text-sm text-text-secondary mt-2">
                Are you sure you want to delete this content? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setProjectToDelete(null)}
                disabled={deletingId !== null}
                className="flex-1 px-4 py-2.5 bg-obsidian-elevated hover:bg-obsidian-elevated/80 border border-obsidian-border/50 text-text-primary rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingId !== null}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deletingId ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : "Delete"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Modal de Visualização (Text Output) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />
          <div className="relative w-full max-w-2xl bg-obsidian-surface border border-obsidian-border/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-obsidian-border/50 bg-obsidian-elevated/30">
              <h3 className="font-semibold text-text-primary truncate pr-4">
                {selectedProject.title}
              </h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors bg-obsidian-elevated px-3 py-1.5 rounded-md border border-obsidian-border/50"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 text-text-secondary hover:text-white hover:bg-obsidian-elevated rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="prose prose-invert max-w-none text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                {selectedProject.content}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}