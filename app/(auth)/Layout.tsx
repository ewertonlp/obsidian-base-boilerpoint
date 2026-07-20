import { CodeSquare } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian p-4 text-text-primary">
      {/* Background Decorativo (Brilho Sutil) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo/Header acima do formulário */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <CodeSquare className="h-10 w-10 text-accent-blue mb-4" />
          <h1 className="text-2xl font-bold tracking-tight">Obsidian Base</h1>
          <p className="text-text-secondary mt-2 text-sm">Faça login para acessar o painel</p>
        </div>
        
        {/* Aqui entra o conteúdo específico (Login ou Register) */}
        {children}
      </div>
    </div>
  );
}