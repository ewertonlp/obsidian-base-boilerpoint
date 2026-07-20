import Link from "next/link";
import { ArrowRight, Code2, Zap, Shield, CreditCard, Check } from "lucide-react";
import { Button } from "./components/ui/Button";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-obsidian text-text-primary flex flex-col">
      
      {/* Navbar da Landing Page */}
      <header className="glass-panel sticky top-0 z-50 flex h-16 items-center justify-between px-6 md:px-12 border-b border-obsidian-border/50 border-x-0 border-t-0">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-accent-blue" />
          <span className="text-lg font-bold tracking-wide">Obsidian Base</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            Login
          </Link>
          {/* Botão de Compra/Registro */}
          <Link href="/register">
            <Button variant="primary" size="sm">
              Get the Code
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="relative w-full max-w-5xl px-6 pt-32 pb-24 text-center flex flex-col items-center">
          {/* Brilho de fundo para dar profundidade */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-accent-blue/20 text-accent-blue text-sm font-medium mb-8">
            <Zap className="h-4 w-4" />
            <span>Ship your startup in days, not weeks.</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-text-secondary mb-6 relative z-10">
            The solid foundation <br /> for your next big idea.
          </h1>
          
          <p className="text-lg text-text-secondary max-w-2xl mb-10 relative z-10">
            Stop wasting hours configuring authentication, databases, and payment gateways. 
            Obsidian Base gives you a production-ready Next.js boilerplate with a premium dark-mode UI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <Button variant="primary" size="lg" className="text-base px-8">
              Buy Now - $99
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg" className="text-base px-8">
                View Live Demo
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-6xl px-6 py-24 border-t border-obsidian-border/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Everything you need to launch</h2>
            <p className="text-text-secondary mt-3">Built with the modern stack developers love.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass-panel p-8 rounded-2xl border border-obsidian-border">
              <div className="h-12 w-12 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-accent-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Supabase Auth</h3>
              <p className="text-text-secondary text-sm">
                Secure login, registration, and password recovery out of the box. Includes social providers and magic links.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel p-8 rounded-2xl border border-obsidian-border">
              <div className="h-12 w-12 rounded-xl bg-accent-gold/10 flex items-center justify-center mb-6">
                <CreditCard className="h-6 w-6 text-accent-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Stripe Integration</h3>
              <p className="text-text-secondary text-sm">
                Webhooks configured for subscriptions. Easily manage pricing tiers, upgrades, and cancellations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel p-8 rounded-2xl border border-obsidian-border">
              <div className="h-12 w-12 rounded-xl bg-accent-green/10 flex items-center justify-center mb-6">
                <Code2 className="h-6 w-6 text-accent-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Components</h3>
              <p className="text-text-secondary text-sm">
                A beautiful design system built with Tailwind CSS. Glassmorphism, dark mode, and fully responsive layouts.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full max-w-5xl px-6 py-24 mb-16 border-t border-obsidian-border/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary">Simple, transparent pricing</h2>
            <p className="text-text-secondary mt-3">Pay once, own the code forever. Build unlimited projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Plano Starter */}
            <div className="glass-panel p-8 rounded-3xl border border-obsidian-border flex flex-col">
              <h3 className="text-xl font-semibold mb-2 text-text-primary">Starter</h3>
              <p className="text-text-secondary text-sm mb-6">Perfect for building your first application.</p>
              
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-text-primary">$99</span>
                <span className="text-text-secondary text-sm">/one-time</span>
              </div>
              
              <Button variant="secondary" className="w-full mb-8">
                Get Starter
              </Button>
              
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-green" />
                  <span className="text-sm text-text-primary">Next.js App Router structure</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-green" />
                  <span className="text-sm text-text-primary">Supabase Authentication</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-green" />
                  <span className="text-sm text-text-primary">Glassmorphism UI Components</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="h-5 w-5 block" />
                  <span className="text-sm text-text-secondary line-through">Stripe Subscriptions Webhooks</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="h-5 w-5 block" />
                  <span className="text-sm text-text-secondary line-through">Premium Dashboard Layout</span>
                </div>
              </div>
            </div>

            {/* Plano Pro (Destaque) */}
            <div className="glass-panel-elevated p-8 rounded-3xl border border-accent-blue/30 relative flex flex-col bg-obsidian-elevated/30">
              
              {/* Badge "Most Popular" flutuante */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-blue text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-accent-blue/20">
                Most Popular
              </div>

              <h3 className="text-xl font-semibold mb-2 text-text-primary">Pro Builder</h3>
              <p className="text-text-secondary text-sm mb-6">Everything you need to launch a full SaaS.</p>
              
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-text-primary">$149</span>
                <span className="text-text-secondary text-sm">/one-time</span>
              </div>
              
              <Button variant="primary" className="w-full mb-8 shadow-lg shadow-accent-blue/20">
                Get Pro Builder
              </Button>
              
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-blue" />
                  <span className="text-sm text-text-primary font-medium">All Starter features</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-blue" />
                  <span className="text-sm text-text-primary">Stripe Subscriptions Webhooks</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-blue" />
                  <span className="text-sm text-text-primary">Premium Dashboard Layout</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-blue" />
                  <span className="text-sm text-text-primary">Database Schema & RLS ready</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-blue" />
                  <span className="text-sm text-text-primary">Lifetime updates & Access</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer Simples */}
      <footer className="border-t border-obsidian-border/50 py-8 text-center text-sm text-text-secondary">
        <p>© {new Date().getFullYear()} Obsidian Base. All rights reserved.</p>
      </footer>
    </div>
  );
}