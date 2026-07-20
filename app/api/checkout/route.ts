import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia", 
});

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  // Busca ou cria o Customer ID do Stripe no seu banco
  let { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  // Cria a sessão de checkout
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: user.email,
    line_items: [
      {
        price: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?canceled=true`,
    metadata: {
      userId: user.id, // Isso é vital para o Webhook saber quem pagou
    },
  });

  return NextResponse.json({ url: session.url });
}