"use server";

import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const supabase = await createClient();
  
  // Destrói a sessão e os cookies nativamente no servidor
  await supabase.auth.signOut();
  
  // O redirect do Next.js quebra o cache e força a navegação limpa
  redirect("/login");
}