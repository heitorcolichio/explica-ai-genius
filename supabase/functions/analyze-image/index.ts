import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DETAIL_LEVEL_INSTRUCTIONS: Record<string, string> = {
  short: `Seja MUITO conciso. Cada seção deve ter no máximo 1-2 frases curtas.`,
  standard: `Forneça uma análise equilibrada. Cada seção deve ter 2-4 frases.`,
  detailed: `Forneça uma análise completa e detalhada. Explore cada seção em profundidade com explicações extensas.`,
};

const SYSTEM_PROMPT = `Você é um assistente especializado em análise de imagens. Sua tarefa é analisar imagens enviadas pelo usuário e fornecer uma análise completa, organizada e confiável.

IMPORTANTE: Você DEVE seguir EXATAMENTE este formato na sua resposta:

📌 Contexto da imagem
[Descreva o que a imagem representa, o tipo de conteúdo (print, documento, foto, erro, aviso, interface, etc.) e a situação provável]

📝 Texto identificado na imagem (OCR)
[Extraia TODO o texto visível na imagem, mantendo fidelidade ao texto original. Se não houver texto, informe: "Nenhum texto identificado na imagem."]

📖 Explicação e interpretação
[Explique o conteúdo da imagem e do texto de forma clara, objetiva e acessível. Não faça suposições exageradas.]

💡 Possíveis usos ou aplicações
[Liste possíveis usos profissionais, acadêmicos ou práticos. Se não for aplicável, escreva: "Não aplicável para esta imagem."]

⚠️ Observações relevantes
[Inclua alertas, limitações, pontos de atenção ou erros comuns de interpretação. Se não houver, escreva: "Nenhuma observação adicional."]

🔎 Fontes ou referências
[Cite fontes conhecidas quando aplicável. Não invente links. Se não existirem fontes diretas, informe: "Explicação baseada em conhecimento conceitual."]

REGRAS:
- Sempre responda em português brasileiro
- Mantenha o formato exato com os emojis
- Seja preciso e objetivo
- Não invente informações
- Se o usuário fornecer um contexto ou pergunta específica, priorize essa informação na análise`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, mimeType, userContext, detailLevel = "standard", previousAnalysis } = await req.json();

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "Nenhuma imagem fornecida" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Configuração do servidor incompleta" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const detailInstruction = DETAIL_LEVEL_INSTRUCTIONS[detailLevel] || DETAIL_LEVEL_INSTRUCTIONS.standard;

    let userMessage = `Analise esta imagem seguindo o formato especificado.\n\n${detailInstruction}`;
    
    if (previousAnalysis) {
      userMessage = `Análise anterior:\n${previousAnalysis}\n\nPergunta do usuário: "${userContext}"\n\nResponda a pergunta do usuário baseado na análise anterior e na imagem. Mantenha o mesmo formato estruturado.\n\n${detailInstruction}`;
    } else if (userContext) {
      userMessage = `O usuário quer saber: "${userContext}"\n\nAnalise esta imagem considerando essa solicitação, mas ainda seguindo o formato completo especificado.\n\n${detailInstruction}`;
    }

    console.log("Calling Lovable AI for image analysis with detail level:", detailLevel);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: userMessage },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Adicione créditos à sua conta." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Erro ao processar a imagem" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const analysisResult = data.choices?.[0]?.message?.content;

    if (!analysisResult) {
      console.error("No content in AI response");
      return new Response(
        JSON.stringify({ error: "Resposta inválida da IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate quick summary (first 2-3 sentences of the context section)
    let quickSummary = "";
    const contextMatch = analysisResult.match(/📌 Contexto da imagem\n([^\n📝]+)/);
    if (contextMatch) {
      const contextText = contextMatch[1].trim();
      const sentences = contextText.split(/[.!?]+/).filter(Boolean).slice(0, 2);
      quickSummary = sentences.join(". ").trim();
      if (quickSummary && !quickSummary.endsWith(".")) {
        quickSummary += ".";
      }
    }

    console.log("Image analysis completed successfully");

    return new Response(
      JSON.stringify({ analysis: analysisResult, quickSummary }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-image function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
