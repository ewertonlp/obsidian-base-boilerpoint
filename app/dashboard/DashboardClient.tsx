"use client";

import { useState } from "react";
import { User, Menu, X, Bell } from "lucide-react";
import { Sidebar } from "../components/layout/Sidebar";
import { LogoutButton } from "@/app/components/ui/LogoutButton";
import Link from "next/link";

export function DashboardClient({
  children,
  displayName,
  isAdmin,
}: {
  children: React.ReactNode;
  displayName: string;
  isAdmin: boolean;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-obsidian-bg text-text-primary selection:bg-accent-blue/30">
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-obsidian-surface border-r border-obsidian-border/50
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-end p-4 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-text-secondary hover:text-text-primary"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-none]">
          <Sidebar isAdmin={isAdmin} />
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* TOPBAR */}
        <header className="flex h-16 items-center justify-between border-b border-obsidian-border/50 bg-obsidian-surface/30 px-4 md:px-6 backdrop-blur-xl z-10">
          <div className="flex items-center">
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
              <button className="relative text-text-secondary hover:text-text-primary transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-0.55 -top-0.5 h-2 w-2 rounded-full bg-accent-amber"></span>
              </button>

              <Link
                href="/dashboard/profile"
                className="flex items-center justify-center gap-2"
              >
                <User className="h-6 w-6 p-1 text-accent-blue rounded-full bg-accent-blue/20 border border-accent-blue/50" />
                <span className="text-sm font-light text-text-secondary">{displayName}</span>
              </Link>

              <div className="ml-2 border-l border-obsidian-border/50 pl-3">
                <LogoutButton />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
