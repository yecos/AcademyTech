"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  X,
  Send,
  Copy,
  Check,
  Settings,
  BookOpen,
  FileText,
  HelpCircle,
  Wand2,
  ChevronDown,
  Maximize2,
  Minimize2,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ─────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface AIConfig {
  provider: string;
  apiKey: string;
  model: string;
}

interface AIAssistantProps {
  onInsert?: (content: string) => void;
  context?: string;
}

// ─── localStorage helpers ──────────────────────────────────

const STORAGE_KEY = "academytech_ai_config";

function loadConfig(): AIConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ─── System Prompt ─────────────────────────────────────────

const SYSTEM_PROMPT = `Eres un asistente experto en creación de cursos para Academy Tech, una plataforma de aprendizaje tecnológico. Tu rol es ayudar a los profesores a:

1. Crear descripciones de cursos atractivas y profesionales
2. Desarrollar contenido educativo para temas específicos
3. Generar preguntas de evaluación/quiz de calidad
4. Mejorar y enriquecer el contenido existente
5. Estructurar currículums de manera pedagógica

Siempre responde en español. Usa formato Markdown cuando sea apropiado para estructurar el contenido. Sé conciso pero completo. Adapta el tono al contexto educativo tecnológico.`;

// ─── Pre-built prompts ─────────────────────────────────────

const QUICK_PROMPTS = [
  {
    label: "Generar descripción del curso",
    icon: BookOpen,
    prompt:
      "Genera una descripción atractiva y profesional para un curso con las siguientes características. La descripción debe ser concisa (2-3 párrafos), destacar los beneficios del aprendizaje y usar un tono motivador:",
  },
  {
    label: "Crear contenido del tema",
    icon: FileText,
    prompt:
      "Crea contenido educativo detallado para el siguiente tema. Incluye: introducción, conceptos clave, explicaciones claras con ejemplos, y un resumen. Usa formato Markdown con títulos y listas:",
  },
  {
    label: "Generar preguntas de quiz",
    icon: HelpCircle,
    prompt:
      "Genera 5 preguntas de evaluación de opción múltiple para el siguiente tema. Cada pregunta debe tener 4 opciones, indicar la respuesta correcta y una breve explicación. Formato Markdown:",
  },
  {
    label: "Mejorar mi contenido",
    icon: Wand2,
    prompt:
      "Mejora y enriquece el siguiente contenido educativo. Hazlo más claro, estructurado y atractivo. Agrega ejemplos prácticos si es posible. Mantén el formato Markdown:",
  },
];

// ─── Main Component ────────────────────────────────────────

export function AIAssistant({ onInsert, context }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isStreaming) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isStreaming]);

  // Send message
  const handleSend = useCallback(
    async (customPrompt?: string) => {
      const config = loadConfig();
      if (!config?.apiKey) {
        toast.error("Configura tu API key primero", {
          description: "Ve a Configuración IA para configurar tu clave",
          action: {
            label: "Configurar",
            onClick: () => window.open("/profesor/ai-config", "_blank"),
          },
        });
        return;
      }

      const userMessage = customPrompt || input.trim();
      if (!userMessage) return;

      // Build context-aware message
      const contextMessage = context
        ? `${userMessage}\n\n---\nContexto del curso actual:\n${context}`
        : userMessage;

      const newMessages: ChatMessage[] = [
        ...messages,
        { role: "user", content: contextMessage },
      ];

      setMessages(newMessages);
      setInput("");
      setIsStreaming(true);
      setStreamingContent("");

      // Abort previous request
      if (abortRef.current) {
        abortRef.current.abort();
      }
      abortRef.current = new AbortController();

      try {
        const apiMessages = [
          { role: "system" as const, content: SYSTEM_PROMPT },
          ...newMessages,
        ];

        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: apiMessages,
            provider: config.provider,
            apiKey: config.apiKey,
            model: config.model,
          }),
          signal: abortRef.current.signal,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Error en la comunicación con IA");
        }

        if (!response.body) {
          throw new Error("No se recibió respuesta del servidor");
        }

        // Read SSE stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullContent += parsed.content;
                setStreamingContent(fullContent);
              }
            } catch {
              // Skip
            }
          }
        }

        // Add assistant message
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: fullContent },
        ]);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";
        toast.error(errorMessage);
        // Remove the last user message on error
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsStreaming(false);
        setStreamingContent("");
        abortRef.current = null;
      }
    },
    [messages, input, context]
  );

  // Copy to clipboard
  const handleCopy = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Insert into editor
  const handleInsert = (content: string) => {
    if (onInsert) {
      onInsert(content);
      toast.success("Contenido insertado en el editor");
    }
  };

  // Clear conversation
  const handleClear = () => {
    setMessages([]);
    setStreamingContent("");
  };

  const config = loadConfig();
  const isConfigured = !!config?.apiKey;

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-emerald-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
          >
            <Sparkles className="w-6 h-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-2xl animate-ping bg-violet-500/30" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed z-50 flex flex-col bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-black/30 ${
              isExpanded
                ? "inset-4 sm:inset-8 rounded-2xl"
                : "bottom-4 right-4 w-[400px] max-h-[600px] sm:max-h-[650px] rounded-2xl"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50 dark:border-white/5 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/10 to-emerald-500/10">
                  <Sparkles className="w-4 h-4 text-violet-500 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Asistente IA
                  </h3>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    {isConfigured
                      ? `${config.provider === "openai" ? "🤖" : config.provider === "anthropic" ? "🧠" : "💎"} ${config.model}`
                      : "Sin configurar"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/5 transition-colors"
                  title="Limpiar conversación"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Not configured message */}
            {!isConfigured && (
              <div className="p-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 mx-auto mb-4">
                  <Settings className="w-8 h-8 text-amber-500 dark:text-amber-400" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Configura tu API Key
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 max-w-[280px] mx-auto">
                  Para usar el asistente de IA, necesitas configurar tu propia
                  API key. Es gratis y se almacena solo en tu navegador.
                </p>
                <Button
                  onClick={() =>
                    window.open("/profesor/ai-config", "_blank")
                  }
                  className="bg-gradient-to-r from-violet-500 to-emerald-500 text-white gap-1.5 text-xs"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Ir a Configuración
                </Button>
              </div>
            )}

            {/* Chat messages */}
            {isConfigured && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {/* Quick prompts (show only when no messages) */}
                {messages.length === 0 && !isStreaming && (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                      ¿Qué quieres crear hoy?
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {QUICK_PROMPTS.map((qp, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(qp.prompt)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-violet-500/10 hover:border-violet-500/20 hover:text-violet-600 dark:hover:text-violet-400 transition-all"
                        >
                          <qp.icon className="w-3.5 h-3.5" />
                          {qp.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map((msg, idx) => (
                  <div key={idx} className="group">
                    <div
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-violet-500 to-emerald-500 text-white rounded-br-md"
                            : "bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 rounded-bl-md"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                            {msg.content}
                          </div>
                        ) : (
                          <span className="whitespace-pre-wrap">
                            {msg.content}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons for assistant messages */}
                    {msg.role === "assistant" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-1 mt-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <button
                          onClick={() => handleCopy(msg.content, idx)}
                          className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copiado
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copiar
                            </>
                          )}
                        </button>
                        {onInsert && (
                          <button
                            onClick={() => handleInsert(msg.content)}
                            className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/5 transition-colors"
                          >
                            <ChevronDown className="w-3 h-3" />
                            Insertar
                          </button>
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Streaming message */}
                {isStreaming && streamingContent && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-bl-md px-4 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                      <div className="whitespace-pre-wrap">
                        {streamingContent}
                        <span className="inline-block w-1.5 h-4 bg-violet-500 animate-pulse ml-0.5 -mb-0.5" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading indicator */}
                {isStreaming && !streamingContent && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-md px-4 py-3 bg-gray-100 dark:bg-white/5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce [animation-delay:0ms]" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:150ms]" />
                        <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input area */}
            {isConfigured && (
              <div className="border-t border-gray-200/50 dark:border-white/5 p-3 shrink-0">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <Textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Escribe tu mensaje..."
                      disabled={isStreaming}
                      className="min-h-[40px] max-h-[120px] resize-none text-sm pr-2 py-2.5"
                      rows={1}
                    />
                  </div>
                  <Button
                    onClick={() => handleSend()}
                    disabled={isStreaming || !input.trim()}
                    className="bg-gradient-to-r from-violet-500 to-emerald-500 text-white shrink-0 h-10 w-10 p-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 text-center">
                  La IA puede cometer errores. Revisa el contenido generado.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
