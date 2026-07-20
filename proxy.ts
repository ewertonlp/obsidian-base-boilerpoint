import { type NextRequest } from 'next/server'
// Nota: Ajuste o caminho do import do seu updateSession caso esteja diferente no seu projeto
import { updateSession } from './app/lib/supabase/middleware' 

// 👇 O NOME DA FUNÇÃO AGORA DEVE SER PROXY
export async function proxy(request: NextRequest) {
  console.log("🛡️ PROXY INTERCEPTOU:", request.nextUrl.pathname);
  
  return await updateSession(request)
}

// A configuração do matcher continua exatamente igual
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}