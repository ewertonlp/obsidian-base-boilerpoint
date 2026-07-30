import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // A verificação final e impenetrável
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    // Se não for admin, chuta ele de volta pro dashboard normal
    redirect("/dashboard"); 
  }

  return <>{children}</>;
}