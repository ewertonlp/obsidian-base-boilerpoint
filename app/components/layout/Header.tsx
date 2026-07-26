"use client";

import { useState } from "react";
import Link from "next/link";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="glass-panel sticky top-0 z-50 w-full border-b border-obsidian-border/50 border-x-0 border-t-0">
      <div className="flex h-16 items-center justify-between px-6 md:px-12">
        {/* Logo (Sempre visível) */}
          <Link href="#">
        <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-accent-blue" />
            <span className="text-lg font-bold tracking-wide text-text-primary">
              Obsidian Base
            </span>
        </div>
          </Link>

        {/* Navegação Desktop (Escondida no Mobile) */}
        <nav className="hidden md:flex justify-center items-center gap-6 text-sm tracking-wider font-medium">
          <Link
            href="#features"
            className="text-text-secondary hover:text-text-primary transition-all"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-text-secondary hover:text-text-primary transition-all"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-text-secondary hover:text-text-primary transition-all"
          >
            FAQ
          </Link>
        </nav>

        {/* Ações Desktop (Escondidas no Mobile) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Login
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">
              Get the Code
            </Button>
          </Link>
        </div>

        {/* Controles Mobile (Escondidos no Desktop) */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/register">
            <Button variant="primary" size="sm" className="h-8 px-3 text-xs">
              Get the Code
            </Button>
          </Link>

          <button
            onClick={toggleMenu}
            className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full glass-panel border-b border-obsidian-border/50 bg-obsidian/90 backdrop-blur-3xl shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col px-6 py-6 gap-6">
            <nav className="flex flex-col gap-5 text-base font-medium">
              <Link
                href="#features"
                onClick={toggleMenu}
                className="text-text-secondary hover:text-text-primary transition-all"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                onClick={toggleMenu}
                className="text-text-secondary hover:text-text-primary transition-all"
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                onClick={toggleMenu}
                className="text-text-secondary hover:text-text-primary transition-all"
              >
                FAQ
              </Link>
            </nav>

            <div className="h-px w-full bg-obsidian-border/50" />

            <Link
              href="/login"
              onClick={toggleMenu}
              className="text-base font-medium text-accent-blue hover:text-text-primary transition-colors"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
