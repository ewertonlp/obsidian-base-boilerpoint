"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Lista centralizada dos capítulos da sua documentação
const navItems = [
  { name: "Getting Started", href: "/docs" },
  { name: "Authentication", href: "/docs/auth" },
  { name: "Database & Supabase", href: "/docs/database" },
  { name: "Payments & Stripe", href: "/docs/stripe" },
  { name: "UI & Components", href: "/docs/components" },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 shrink-0 md:border-r md:border-obsidian-border/50 md:pr-6 md:sticky md:top-24 md:self-start md:h-[calc(100vh-8rem)] overflow-y-auto mb-8 md:mb-0">
      
    
      <div className="hidden md:block mb-4 px-3">
        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Documentation
        </h3>
      </div>

      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-accent-blue/10 text-accent-blue" 
                  : "text-text-secondary hover:bg-obsidian-surface/50 hover:text-text-primary"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}