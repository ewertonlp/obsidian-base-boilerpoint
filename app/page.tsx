import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Zap,
  Shield,
  CreditCard,
  Check,
  Newspaper,
} from "lucide-react";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { NewsletterForm } from "./components/ui/NewsletterForm";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-obsidian text-text-primary flex flex-col">
      {/* Navbar da Landing Page */}
      <Header />

      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative w-full max-w-5xl px-6 pt-32 pb-24 text-center flex flex-col items-center">
          {/* Brilho de fundo para dar profundidade */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-blue/50 text-accent-blue text-sm font-medium mb-8 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            <Zap className="h-4 w-4" />
            <span>Ship your startup in days, not weeks.</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-text-secondary py-8 relative z-20">
            The solid foundation <br /> for your next big idea.
          </h1>

          <p className="text-lg text-text-secondary max-w-2xl mb-10 relative z-10">
            Stop wasting hours configuring authentication, databases, and
            payment gateways. Obsidian Base gives you a production-ready Next.js
            boilerplate with a premium dark-mode UI.
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
        <section
          id="features"
          className="w-full max-w-6xl px-6 py-24 border-t border-obsidian-border/50"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">
              Everything you need to launch
            </h2>
            <p className="text-text-secondary mt-3">
              Built with the modern stack developers love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card glowColor="green" className="p-8 flex flex-col h-full">
              <div className="h-12 w-12 rounded-xl bg-accent-green/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-accent-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Supabase Auth</h3>
              <p className="text-text-secondary text-sm">
                Secure login, registration, and password recovery out of the
                box. Includes social providers and magic links.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card glowColor="blue" className="p-8 flex flex-col h-full">
              <div className="h-12 w-12 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-6">
                <CreditCard className="h-6 w-6 text-accent-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Stripe Integration</h3>
              <p className="text-text-secondary text-sm">
                Webhooks configured for subscriptions. Easily manage pricing
                tiers, upgrades, and cancellations.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card glowColor="amber" className="p-8 flex flex-col h-full">
              <div className="h-12 w-12 rounded-xl bg-accent-amber/10 flex items-center justify-center mb-6">
                <Code2 className="h-6 w-6 text-accent-amber" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Components</h3>
              <p className="text-text-secondary text-sm">
                A beautiful design system built with Tailwind CSS.
                Glassmorphism, dark mode, and fully responsive layouts.
              </p>
            </Card>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full max-w-5xl px-6 py-24 mb-16 border-t border-obsidian-border/50"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary">
              Simple, transparent pricing
            </h2>
            <p className="text-text-secondary mt-3">
              Pay once, own the code forever. Build unlimited projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Starter */}
            <div className="glass-panel p-8 rounded-3xl border border-obsidian-border flex flex-col">
              <h3 className="text-xl font-semibold mb-2 text-text-primary">
                Starter
              </h3>
              <p className="text-text-secondary text-sm mb-6">
                Perfect for building your first application.
              </p>

              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-text-primary">
                  $99
                </span>
                <span className="text-text-secondary text-sm">/one-time</span>
              </div>

              <Button variant="secondary" className="w-full mb-8">
                Get Starter
              </Button>

              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-green" />
                  <span className="text-sm text-text-primary">
                    Next.js App Router structure
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-green" />
                  <span className="text-sm text-text-primary">
                    Supabase Authentication
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-green" />
                  <span className="text-sm text-text-primary">
                    Glassmorphism UI Components
                  </span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="h-5 w-5 block" />
                  <span className="text-sm text-text-secondary line-through">
                    Stripe Subscriptions Webhooks
                  </span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="h-5 w-5 block" />
                  <span className="text-sm text-text-secondary line-through">
                    Premium Dashboard Layout
                  </span>
                </div>
              </div>
            </div>

            {/* Plano Pro (Destaque) */}
            <div className="glass-panel p-8 rounded-3xl border border-accent-blue/50 relative flex flex-col bg-obsidian-elevated/40 shadow-[0_0_30px_rgba(37,99,235,0.1)] hover:shadow-[0_0_40px_rgba(37,99,235,0.2)] transition-all">
              {/* Badge "Most Popular" flutuante */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-blue text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-accent-blue/20">
                Most Popular
              </div>

              <h3 className="text-xl font-semibold mb-2 text-text-primary">
                Pro Builder
              </h3>
              <p className="text-text-secondary text-sm mb-6">
                Everything you need to launch a full SaaS.
              </p>

              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-text-primary">
                  $149
                </span>
                <span className="text-text-secondary text-sm">/one-time</span>
              </div>

              <Button
                variant="primary"
                className="w-full mb-8 shadow-lg shadow-accent-blue/20"
              >
                Get Pro Builder
              </Button>

              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-blue" />
                  <span className="text-sm text-text-primary font-medium">
                    All Starter features
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-blue" />
                  <span className="text-sm text-text-primary">
                    Stripe Subscriptions Webhooks
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-blue" />
                  <span className="text-sm text-text-primary">
                    Premium Dashboard Layout
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-blue" />
                  <span className="text-sm text-text-primary">
                    Database Schema & RLS ready
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-blue" />
                  <span className="text-sm text-text-primary">
                    Lifetime updates & Access
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Capture / Waitlist Section */}
        <section className="w-full max-w-4xl px-6 py-24 mb-12 border-t border-obsidian-border/50">
        
          
          <div className="glass-panel-elevated rounded-3xl p-10 md:p-16 border border-accent-blue/20 text-center relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-accent-blue/10 blur-[80px] rounded-full pointer-events-none" />

            <Newspaper className="h-10 w-10 text-accent-blue mb-6 relative z-10" />
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 relative z-10">
              Not ready to buy yet?
            </h2>
            <p className="text-text-secondary mb-8 max-w-lg relative z-10">
              Join our newsletter to get free Next.js tips, UI components, and a
              10% discount when you are ready to launch.
            </p>

              <div className="w-full mb-3">
            <NewsletterForm />
          </div>
          
          <p className="text-xs text-text-secondary/70">
            No spam. Unsubscribe at any time.
          </p>

            
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="w-full max-w-3xl px-6 py-24 border-t border-obsidian-border/50"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-text-secondary mt-3">
              Everything you need to know about Obsidian Base.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="group glass-panel rounded-xl border border-obsidian-border/50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between p-6 text-text-primary font-medium">
                Is it built with TypeScript?
                <span className="relative ml-1.5 h-5 w-5 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12H4"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-text-secondary text-sm leading-relaxed">
                Yes! The entire codebase is written in strict TypeScript. We
                believe type safety is essential for scaling production
                applications.
              </div>
            </details>

            {/* FAQ Item 2 */}
            <details className="group glass-panel rounded-xl border border-obsidian-border/50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between p-6 text-text-primary font-medium">
                Can I use this for client projects?
                <span className="relative ml-1.5 h-5 w-5 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12H4"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-text-secondary text-sm leading-relaxed">
                Absolutely. Once you purchase a license, you can build unlimited
                projects for yourself or your clients. You just cannot resell
                the boilerplate itself.
              </div>
            </details>

            {/* FAQ Item 3 */}
            <details className="group glass-panel rounded-xl border border-obsidian-border/50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between p-6 text-text-primary font-medium">
                Do I get free updates?
                <span className="relative ml-1.5 h-5 w-5 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12H4"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-text-secondary text-sm leading-relaxed">
                Yes, you get lifetime access to the GitHub repository and all
                future updates, including new components and integrations.
              </div>
            </details>
          </div>
        </section>
      </main>

      {/* Footer Simples */}
      <Footer />
    </div>
  );
}
