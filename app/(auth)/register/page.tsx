"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, AlertCircle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { createClient } from "@/app/lib/supabase/client";
import { SocialAuthButtons } from "@/app/components/auth/SocialAuthButtons";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  // Estados do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados de feedback visual
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Chama a função de registro do Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (signUpError) throw signUpError;

      // 2. Se deu certo, redireciona o usuário para o dashboard
      // (O nosso middleware.ts vai liberar a passagem automaticamente)
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao criar a conta.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="auth-card w-full max-w-md rounded-2xl p-8 backdrop-blur-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Create an account
          </h1>
          <p className="text-sm text-text-secondary mt-2">
            Start building with Obsidian Base today
          </p>
        </div>

        {/* Mensagem de Erro (se houver) */}
        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            icon={<User className="h-4 w-4" />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            icon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <label className="text-sm font-medium text-text-primary mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="flex h-10 w-full rounded-xl bg-obsidian-surface/50 pl-10 pr-3 py-2 text-sm text-text-primary border border-obsidian-border/50 transition-all placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
              />
            </div>
          </div>

          {/* O componente Button agora recebe o isLoading para girar o ícone e travar múltiplos cliques */}
          <Button
            variant="primary"
            className="w-full mt-2"
            size="lg"
            type="submit"
            isLoading={isLoading}
          >
            {isLoading ? "Creating..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-8 mb-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-obsidian-border/50 after:mt-0.5 after:flex-1 after:border-t after:border-obsidian-border/50">
          <p className="mx-4 mb-0 text-center text-xs font-semibold text-text-secondary uppercase">
            Or register with
          </p>
        </div>

       <SocialAuthButtons />

        <p className="mt-8 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-text-primary hover:text-accent-blue transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
