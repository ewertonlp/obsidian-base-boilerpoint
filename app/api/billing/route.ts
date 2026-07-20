import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    // Busca o ID do cliente do Stripe no nosso banco
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!subscription?.stripe_customer_id) {
      return new NextResponse("Cliente não encontrado", { status: 400 });
    }

    // Gera a URL mágica e segura do portal do Stripe
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/settings`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erro ao gerar portal:", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
}