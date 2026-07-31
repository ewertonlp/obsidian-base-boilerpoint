import { createDeepSeek} from "@ai-sdk/deepseek";
import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import { createClient } from "@/app/lib/supabase/server";

export const maxDuration = 30;

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("id", user.id)
    .single();

  if (subscription?.status !== "active") {
    // 402 is the official HTTP code for 'Payment Required'
    return new Response("Payment Required", { status: 402 }); 
  }

  const { prompt, tone, audience, output } = await req.json();

  const systemMessage = `You are an elite copywriter and content strategist. 
  Generate high-quality, engaging content based on the user's prompt. 

  Follow these strict rules:
  - Tone of voice: ${tone}
  - Target audience: ${audience}
  - Output format: ${output}

  Provide only the generated content, without any introductory or concluding conversational filler.`;

  const result = await streamText({
    model: deepseek("deepseek-chat"),
    system: systemMessage,
    prompt: prompt,
  


  async onFinish({ text }) {
      // Create a short title based on what the user typed (taking the first 40 characters)
      const shortTitle = prompt.length > 40 ? prompt.substring(0, 40) + "..." : prompt;

      const { error } = await supabase
        .from("projects")
        .insert({
          user_id: user.id,
          title: shortTitle,
          type: JSON.stringify({ tone, audience, output }),
          content: text,
          status: "Completed",
        });

      if (error) {
        console.error("Erro ao salvar no Supabase:", error);
      }
    },
  });

return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });

}
