import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  // Deleta o projeto garantindo que pertence ao usuário logado
  const { error } = await supabase
    .from("projects")
    .delete()
    .match({ id: params.id, user_id: user.id });

  if (error) {
    return new NextResponse("Erro ao deletar", { status: 500 });
  }

  return new NextResponse("Deletado com sucesso", { status: 200 });
}