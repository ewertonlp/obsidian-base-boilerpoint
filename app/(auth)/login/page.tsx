"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { createClient } from "@/app/lib/supabase/client";
import { SocialAuthButtons } from "@/app/components/auth/SocialAuthButtons";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  // Estados do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados de feedback visual
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Chama a função de login do Supabase
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Tradução de erros comuns para uma melhor experiência do usuário
        if (signInError.message === "Invalid login credentials") {
          throw new Error("E-mail ou senha incorretos.");
        }
        throw signInError;
      }

      // 2. Se deu certo, o usuário recebe o cookie de sessão e vai para o dashboard
      router.push("/dashboard");
      router.refresh(); 
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao fazer login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="auth-card w-full max-w-md rounded-2xl p-8 backdrop-blur-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Obsidian Base
          </h1>
          <p className="text-sm text-text-secondary mt-2">
            Log in to access the dashboard
          </p>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            id="email"
            label="E-mail"
            type="email"
            placeholder="you@example.com"
            icon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <label className="text-sm font-medium text-text-primary ">
              Password
            </label>
            <div className="relative mt-2">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex h-10 w-full rounded-xl bg-obsidian-surface/50 pl-10 pr-3 py-2 text-sm text-text-primary border border-obsidian-border/50 transition-all placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
              />
            </div>
            <div className="flex items-center justify-end mt-1.5">
              <Link
                href="/forgot-password"
                className="text-xs text-accent-blue hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full mt-2"
            size="lg"
            type="submit"
            isLoading={isLoading}
          >
            {isLoading ? "Loging..." : "Log in"}
          </Button>
        </form>

        <div className="mt-8 mb-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-obsidian-border/50 after:mt-0.5 after:flex-1 after:border-t after:border-obsidian-border/50">
          <p className="mx-4 mb-0 text-center text-xs tracking-wide text-text-secondary uppercase">
            Or continue with
          </p>
        </div>

        <SocialAuthButtons />

        <p className="mt-8 text-center text-sm text-text-secondary">
          Don´t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-text-primary hover:text-accent-blue transition-colors"
          >
           Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
