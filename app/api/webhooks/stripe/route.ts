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
  console.log("🟢 [WEBHOOK] Route was called by Stripe!");

  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("🟢 [WEBHOOK] Signature validated. Event:", event.type); 
  } catch (err: any) {
    console.error("🔴 [WEBHOOK] Signature error:", err.message); 
    return new NextResponse(`Erro: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    console.log("🟢 [WEBHOOK] Metadata received. User ID:", userId); 

    if (userId) {
      const { data, error } = await supabaseAdmin
        .from("subscriptions")
        .update({
          status: "active",
          stripe_subscription_id: session.subscription as string,
          stripe_customer_id: session.customer as string,
        })
       .eq("id", userId)
        .select(); 

      if (error) {
        console.error("🔴 [WEBHOOK] Supabase Error:", error.message);
      } else {
        console.log("🟢 [WEBHOOK] Supabase updated successfully:", data);
      }
    } else {
      console.log("🟡 [WEBHOOK] Ignored: No userId found in the metadata.");
    }
  }

  return new NextResponse(null, { status: 200 });
}