import { createClient } from "@supabase/supabase-js";

// Este cliente usa a SERVICE_ROLE_KEY, ou seja, ele ignora o RLS.
// NUNCA use isso no lado do cliente (use client), APENAS em rotas de API ou Server Components seguros.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);