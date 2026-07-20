import { MoreVertical, Edit2, Trash2, ExternalLink } from "lucide-react";

// 1. Definição de tipos para os dados (Simulando o Supabase)
type Project = {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'draft' | 'archived';
  updated_at: string;
};

// 2. Dados de exemplo (Mock Data)
const projects: Project[] = [
  { id: '1', name: 'Plataforma SaaS Alpha', url: 'alpha.dev', status: 'active', updated_at: '2 horas atrás' },
  { id: '2', name: 'E-commerce Template', url: 'shop.template', status: 'draft', updated_at: '5 horas atrás' },
  { id: '3', name: 'Landing Page Cliente X', url: 'clientex.com', status: 'active', updated_at: 'Ontem' },
  { id: '4', name: 'Antigo Blog Pessoal', url: 'old.blog', status: 'archived', updated_at: '1 semana atrás' },
];

// 3. Componente auxiliar para o Badge de Status
const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const styles = {
    active: "bg-accent-green/10 text-accent-green border-accent-green/20",
    draft: "bg-text-secondary/10 text-text-secondary border-text-secondary/20",
    archived: "bg-obsidian-elevated text-text-secondary border-obsidian-border",
  };

  const labels = { active: "Ativo", draft: "Rascunho", archived: "Arquivado" };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export function ProjectTable() {
  return (
    <div className="glass-panel overflow-hidden rounded-2xl border border-obsidian-border">
      <table className="w-full text-sm text-left">
        
        {/* Cabeçalho da Tabela */}
        <thead className="border-b border-obsidian-border bg-obsidian-surface/50 text-xs uppercase text-text-secondary tracking-wider">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium">Nome do Projeto</th>
            <th scope="col" className="px-6 py-4 font-medium">Status</th>
            <th scope="col" className="px-6 py-4 font-medium">Última Atualização</th>
            <th scope="col" className="px-6 py-4 font-medium text-right">Ações</th>
          </tr>
        </thead>

        {/* Corpo da Tabela */}
        <tbody className="divide-y divide-obsidian-border/50">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-obsidian-elevated/50 transition-colors group">
              
              {/* Coluna Nome e URL */}
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-text-primary group-hover:text-accent-blue transition-colors">
                    {project.name}
                  </span>
                  <a href={`https://${project.url}`} target="_blank" className="text-xs text-text-secondary flex items-center hover:text-text-primary mt-0.5">
                    {project.url} <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </td>
              
              {/* Coluna Status */}
              <td className="px-6 py-4">
                <StatusBadge status={project.status} />
              </td>
              
              {/* Coluna Atualização */}
              <td className="px-6 py-4 text-text-secondary">
                {project.updated_at}
              </td>
              
              {/* Coluna Ações */}
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-1.5 rounded-lg text-text-secondary hover:bg-obsidian-elevated hover:text-text-primary transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg text-text-secondary hover:bg-accent-gold/10 hover:text-accent-gold transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Rodapé Simples (Paginação futura) */}
      <div className="border-t border-obsidian-border bg-obsidian-surface/30 px-6 py-3 text-xs text-text-secondary flex justify-between items-center">
        Showing {projects.length} projects
        <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-obsidian-border hover:bg-obsidian-elevated">Anterior</button>
            <button className="px-3 py-1 rounded border border-obsidian-border hover:bg-obsidian-elevated">Próximo</button>
        </div>
      </div>
    </div>
  );
}