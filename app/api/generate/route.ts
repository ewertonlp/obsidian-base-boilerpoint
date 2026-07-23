import { createDeepSeek} from "@ai-sdk/deepseek";
import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import { createClient } from "@/app/lib/supabase/server";

// Permite que a requisição dure até 30 segundos
export const maxDuration = 30;

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req: Request) {
  // 1. Verificação de Segurança
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
    // 402 é o código HTTP oficial para "Payment Required" (Pagamento Necessário)
    return new Response("Payment Required", { status: 402 }); 
  }

  // 2. Coleta os dados enviados pela interface
  const { prompt, tone } = await req.json();

  // 3. Define o comportamento da IA
  const systemMessage = `You are an elite copywriter and content strategist. 
  Generate high-quality, engaging content based on the user's prompt. 
  The tone of the content should be: ${tone}.
  Provide only the generated content, without any introductory or concluding conversational filler.`;

  // 4. Chama a OpenAI e faz o stream da resposta
  const result = await streamText({
    model: deepseek("deepseek-chat"), // Modelo rápido, inteligente e barato
    system: systemMessage,
    prompt: prompt,
  


  async onFinish({ text }) {
      // Cria um título curto baseado no que o usuário digitou (pegando os primeiros 40 caracteres)
      const shortTitle = prompt.length > 40 ? prompt.substring(0, 40) + "..." : prompt;

      const { error } = await supabase
        .from("projects")
        .insert({
          user_id: user.id,
          title: shortTitle,
          type: tone, // Salva o tom de voz usado como o "tipo"
          content: text, // O texto final completo gerado pela IA
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
