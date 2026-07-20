"use server";

import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function updateProfileAction(formData: FormData) {
  const supabase = await createClient();
  
  // 1. Garante que quem está chamando a ação está realmente logado
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Não autorizado");
  }

  // 2. Extrai os dados do formulário
  const fullName = formData.get("full_name") as string;

  // 3. Atualiza a tabela profiles
  const { error } = await supabase
    .from("profiles")
    .update({ 
      full_name: fullName,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    console.error("Erro ao atualizar perfil:", error);
    return { error: "Falha ao atualizar o perfil." };
  }

  // 4. Invalida o cache para que a Topbar mostre o novo nome na mesma hora
  revalidatePath("/", "layout");
  
  return { success: true };
}


export async function updatePasswordAction(formData: FormData) {
  const supabase = await createClient();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;

  if (password !== confirmPassword) {
    return { error: "As senhas não coincidem." };
  }

  // O Supabase atualiza a senha do usuário logado automaticamente
  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    console.error("Erro ao atualizar senha:", error);
    return { error: error.message };
  }

  return { success: true };
}

export async function deleteAccountAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Não autorizado");

  // Para deletar um usuário no Supabase, precisamos da chave de admin (Service Role)
  // Certifique-se de adicionar SUPABASE_SERVICE_ROLE_KEY no seu .env.local
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Deleta o usuário da autenticação (isso fará o trigger apagar o perfil em cascata)
  await supabaseAdmin.auth.admin.deleteUser(user.id);
  
  // Apaga os cookies de sessão e redireciona
  await supabase.auth.signOut();
  redirect("/login");
}