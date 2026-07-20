"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, AlertCircle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { createClient } from "@/app/lib/supabase/client";

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

        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" className="w-full" type="button">
            <svg
              className="w-4 h-4 mr-2"
              viewBox="0 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="currentColor"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>github [#142]</title> <desc>Created with Sketch.</desc>{" "}
                <defs> </defs>{" "}
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="currentColor"
                  fillRule="evenodd"
                >
                  {" "}
                  <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-140.000000, -7559.000000)"
                    fill="currentColor"
                  >
                    {" "}
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      {" "}
                      <path
                        d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                        id="github-[#142]"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
            GitHub
          </Button>
          <Button variant="secondary" className="w-full" type="button">
            <svg
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
            Google
          </Button>
        </div>

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
