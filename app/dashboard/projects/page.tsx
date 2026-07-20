import { Plus, Edit2, Trash2 } from "lucide-react";

export default function ProjectsPage() {
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
        <button className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          New Generation
        </button>
      </div>

      {/* Table (Glassmorphism) */}
      <div className="rounded-xl border border-obsidian-border/50 bg-obsidian-surface/30 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-left text-sm text-text-secondary">
          <thead className="bg-obsidian-elevated/50 text-xs uppercase font-medium text-text-secondary border-b border-obsidian-border/50">
            <tr>
              <th className="px-6 py-4">Title / Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-obsidian-border/50">
            
            {/* Example Row 1 */}
            <tr className="hover:bg-obsidian-elevated/30 transition-colors">
              <td className="px-6 py-4">
                <div className="font-medium text-text-primary">Showcase: Honda Civic 2024</div>
                <div className="text-xs mt-0.5">Instagram Caption</div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                  Completed
                </span>
              </td>
              <td className="px-6 py-4">2 hours ago</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3">
                  <button className="hover:text-accent-blue transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button className="hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </td>
            </tr>

            {/* Example Row 2 */}
            <tr className="hover:bg-obsidian-elevated/30 transition-colors">
              <td className="px-6 py-4">
                <div className="font-medium text-text-primary">Downtown Duplex Apartment</div>
                <div className="text-xs mt-0.5">SEO Property Description</div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-obsidian-elevated text-text-secondary border border-obsidian-border">
                  Draft
                </span>
              </td>
              <td className="px-6 py-4">Yesterday</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3">
                  <button className="hover:text-accent-blue transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button className="hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      
    </div>
  );
}