import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  console.log("🟢 [WEBHOOK] Rota foi chamada pelo Stripe!"); // Radar 1

  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("🟢 [WEBHOOK] Assinatura validada. Evento:", event.type); // Radar 2
  } catch (err: any) {
    console.error("🔴 [WEBHOOK] Erro de Assinatura:", err.message); // Radar de erro
    return new NextResponse(`Erro: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    console.log("🟢 [WEBHOOK] Metadata recebido. User ID:", userId); // Radar 3

    if (userId) {
      const { data, error } = await supabaseAdmin
        .from("subscriptions")
        .update({
          status: "active",
          stripe_subscription_id: session.subscription as string,
          stripe_customer_id: session.customer as string,
        })
        .eq("id", userId)
        .select(); // Adicionamos select() para o Supabase nos devolver o que alterou

      if (error) {
        console.error("🔴 [WEBHOOK] Erro no Supabase:", error.message);
      } else {
        console.log("🟢 [WEBHOOK] Supabase atualizado com sucesso:", data);
      }
    } else {
      console.log("🟡 [WEBHOOK] Ignorado: Nenhum userId encontrado no metadata.");
    }
  }

  return new NextResponse(null, { status: 200 });
}