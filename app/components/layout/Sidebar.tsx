"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Settings,
  Sparkles,
  ShieldAlert,
} from "lucide-react"
import ObsidianLogo from "../ui/ObsidianLogo"

export function Sidebar({ isAdmin }: { isAdmin?: boolean }) {
  const pathname = usePathname()
  const getLinkStyle = (href: string) => {
    const isActive = pathname === href

    return `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-accent-blue/15 text-accent-blue"
        : "text-text-secondary hover:bg-obsidian-surface/50 hover:text-text-primary"
    }`;
  }

  return (
    <aside className="glass-panel sticky top-0 flex h-screen md:w-64 flex-col border-r border-y-0 border-l-0">
      <ObsidianLogo />

      <nav className="flex-1 space-y-1 px-4 pt-10">
        <Link href="/dashboard" className={getLinkStyle("/dashboard")}>
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Dashboard
        </Link>

        <Link
          href="/dashboard/generator"
          className={getLinkStyle("/dashboard/generator")}
        >
          <Sparkles className="mr-3 h-5 w-5" />
          AI Generator
        </Link>

        <Link
          href="/dashboard/projects"
          className={getLinkStyle("/dashboard/projects")}
        >
          <Users className="mr-3 h-5 w-5" />
          Projects
        </Link>

        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-obsidian-border/50">
            <Link
              href="/dashboard/admin"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                pathname.startsWith("/admin")
                  ? "bg-accent-amber/50 text-accent-amber"
                  : "text-accent-amber/80 hover:bg-accent-amber/10 hover:text-accent-amber"
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              Admin Panel
            </Link>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-obsidian-border/50">
        <Link
          href="/dashboard/settings"
          className={getLinkStyle("/dashboard/settings")}
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
