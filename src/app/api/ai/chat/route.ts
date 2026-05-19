import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ─── Types ─────────────────────────────────────────────────

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  provider: string;
  apiKey: string;
  model: string;
}

// ─── Validation ────────────────────────────────────────────

const MAX_MESSAGES = 30;
const MAX_TOKENS = 2000;
const VALID_PROVIDERS = ["openai", "anthropic", "google"];
const VALID_MODELS: Record<string, string[]> = {
  openai: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
  anthropic: ["claude-sonnet-4-20250514", "claude-3-haiku-20240307"],
  google: ["gemini-2.0-flash", "gemini-1.5-pro"],
};

function validateRequest(body: ChatRequest): string | null {
  if (!body.provider || !VALID_PROVIDERS.includes(body.provider)) {
    return "Proveedor no válido";
  }
  if (!body.apiKey || body.apiKey.trim().length === 0) {
    return "API key requerida";
  }
  if (!body.model || !VALID_MODELS[body.provider]?.includes(body.model)) {
    return "Modelo no válido para el proveedor seleccionado";
  }
  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return "Se requieren mensajes";
  }
  if (body.messages.length > MAX_MESSAGES) {
    return `Máximo ${MAX_MESSAGES} mensajes permitidos`;
  }
  return null;
}

// ─── OpenAI streaming ──────────────────────────────────────

async function streamOpenAI(
  messages: ChatMessage[],
  model: string,
  apiKey: string
): Promise<ReadableStream> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      max_tokens: MAX_TOKENS,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
  }

  if (!response.body) {
    throw new Error("No response body from OpenAI");
  }

  // Transform OpenAI SSE to our format
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;

          const data = trimmed.slice(6);
          if (data === "[DONE]") {
            controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
            continue;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              controller.enqueue(
                new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`)
              );
            }
          } catch {
            // Skip malformed JSON
          }
        }
      } catch (err) {
        controller.error(err);
      }
    },
    cancel() {
      reader.cancel();
    },
  });
}

// ─── Anthropic streaming ───────────────────────────────────

async function streamAnthropic(
  messages: ChatMessage[],
  model: string,
  apiKey: string
): Promise<ReadableStream> {
  // Filter out system messages from the messages array
  const systemMessage = messages.find((m) => m.role === "system")?.content || "";
  const filteredMessages = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role, content: m.content }));

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model,
      max_tokens: MAX_TOKENS,
      system: systemMessage,
      messages: filteredMessages,
      stream: true,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Anthropic API error: ${response.status} - ${errorData}`);
  }

  if (!response.body) {
    throw new Error("No response body from Anthropic");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;

          const data = trimmed.slice(6);
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === "content_block_delta" && parsed.delta?.text) {
              controller.enqueue(
                new TextEncoder().encode(
                  `data: ${JSON.stringify({ content: parsed.delta.text })}\n\n`
                )
              );
            } else if (parsed.type === "message_stop") {
              controller.enqueue(
                new TextEncoder().encode("data: [DONE]\n\n")
              );
            }
          } catch {
            // Skip malformed JSON
          }
        }
      } catch (err) {
        controller.error(err);
      }
    },
    cancel() {
      reader.cancel();
    },
  });
}

// ─── Google Gemini streaming ───────────────────────────────

async function streamGemini(
  messages: ChatMessage[],
  model: string,
  apiKey: string
): Promise<ReadableStream> {
  // Transform messages to Gemini format
  const systemInstruction = messages.find((m) => m.role === "system")?.content;
  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      maxOutputTokens: MAX_TOKENS,
    },
  };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
  }

  if (!response.body) {
    throw new Error("No response body from Gemini");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;

          const data = trimmed.slice(6);
          try {
            const parsed = JSON.parse(data);
            const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              controller.enqueue(
                new TextEncoder().encode(
                  `data: ${JSON.stringify({ content: text })}\n\n`
                )
              );
            }
          } catch {
            // Skip malformed JSON
          }
        }
      } catch (err) {
        controller.error(err);
      }
    },
    cancel() {
      reader.cancel();
    },
  });
}

// ─── Route Handler ─────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body: ChatRequest = await request.json();

    // Validate
    const error = validateRequest(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const { messages, provider, apiKey, model } = body;

    // Route to correct provider
    let stream: ReadableStream;

    switch (provider) {
      case "openai":
        stream = await streamOpenAI(messages, model, apiKey);
        break;
      case "anthropic":
        stream = await streamAnthropic(messages, model, apiKey);
        break;
      case "google":
        stream = await streamGemini(messages, model, apiKey);
        break;
      default:
        return NextResponse.json(
          { error: "Proveedor no soportado" },
          { status: 400 }
        );
    }

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err: unknown) {
    console.error("AI Chat API error:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Error interno del servidor";

    // Check for common API errors
    if (errorMessage.includes("401") || errorMessage.includes("Unauthorized")) {
      return NextResponse.json(
        { error: "API key inválida" },
        { status: 401 }
      );
    }
    if (errorMessage.includes("429") || errorMessage.includes("rate_limit")) {
      return NextResponse.json(
        { error: "Límite de uso excedido. Intenta de nuevo más tarde." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Error al comunicarse con el proveedor de IA" },
      { status: 500 }
    );
  }
}
