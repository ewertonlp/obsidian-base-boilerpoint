import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function GET(request: Request) {
  // Pega a URL que o Google/GitHub enviou de volta
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    // Troca o código pela sessão segura do usuário
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    } else {
      console.error("Erro no callback do OAuth:", error);
    }
  }

  // Se der erro ou não tiver código, devolve para o login com aviso
  return NextResponse.redirect(`${origin}/login?error=Falha na autenticação social`);
}