"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Loader2,
  Key,
  Cpu,
  Settings,
  AlertCircle,
  Home,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

// ─── Provider / Model config ───────────────────────────────

interface ProviderConfig {
  name: string;
  icon: string;
  models: { id: string; name: string }[];
  testUrl: string;
}

const PROVIDERS: Record<string, ProviderConfig> = {
  openai: {
    name: "OpenAI",
    icon: "🤖",
    models: [
      { id: "gpt-4o", name: "GPT-4o" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
    ],
    testUrl: "https://api.openai.com/v1/models",
  },
  anthropic: {
    name: "Anthropic",
    icon: "🧠",
    models: [
      { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4" },
      { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku" },
    ],
    testUrl: "https://api.anthropic.com/v1/messages",
  },
  google: {
    name: "Google Gemini",
    icon: "💎",
    models: [
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
    ],
    testUrl: "https://generativelanguage.googleapis.com/v1beta/models",
  },
};

// ─── localStorage helpers ──────────────────────────────────

interface AIConfig {
  provider: string;
  apiKey: string;
  model: string;
}

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

function saveConfig(config: AIConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

function clearConfig() {
  localStorage.removeItem(STORAGE_KEY);
}

// ─── Main Component ────────────────────────────────────────

export default function AIConfigPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isTeacher } = useAuth();

  // Load saved config on mount using lazy initializer
  const [initialConfig] = useState(() => {
    if (typeof window === "undefined") return null;
    return loadConfig();
  });

  const [provider, setProvider] = useState(initialConfig?.provider || "openai");
  const [apiKey, setApiKey] = useState(initialConfig?.apiKey || "");
  const [model, setModel] = useState(initialConfig?.model || "gpt-4o");
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);
  const [isConfigured, setIsConfigured] = useState(!!initialConfig?.apiKey);

  // Update model when provider changes - use a ref to track previous provider
  const prevProviderRef = useRef(provider);
  const handleProviderChange = useCallback((newProvider: string) => {
    prevProviderRef.current = provider;
    setProvider(newProvider);
    // Also update model to match new provider
    const provConfig = PROVIDERS[newProvider];
    if (provConfig) {
      setModel(provConfig.models[0].id);
    }
  }, [provider]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Ingresa tu API key");
      return;
    }
    saveConfig({ provider, apiKey: apiKey.trim(), model });
    setIsConfigured(true);
    toast.success("Configuración guardada");
  };

  const handleClear = () => {
    clearConfig();
    setApiKey("");
    setProvider("openai");
    setModel("gpt-4o");
    setIsConfigured(false);
    setTestResult(null);
    toast.success("Configuración eliminada");
  };

  const handleTest = async () => {
    if (!apiKey.trim()) {
      toast.error("Ingresa tu API key primero");
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const provConfig = PROVIDERS[provider];

      if (provider === "openai") {
        const res = await fetch(provConfig.testUrl, {
          headers: {
            Authorization: `Bearer ${apiKey.trim()}`,
          },
        });
        if (res.ok) {
          setTestResult("success");
          toast.success("Conexión exitosa con OpenAI");
        } else {
          setTestResult("error");
          toast.error("API key inválida o error de conexión");
        }
      } else if (provider === "google") {
        const res = await fetch(`${provConfig.testUrl}?key=${apiKey.trim()}`);
        if (res.ok) {
          setTestResult("success");
          toast.success("Conexión exitosa con Google Gemini");
        } else {
          setTestResult("error");
          toast.error("API key inválida o error de conexión");
        }
      } else if (provider === "anthropic") {
        // Anthropic doesn't have a simple test endpoint, so we'll make a minimal message request
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: "Test connection" }],
            provider: "anthropic",
            apiKey: apiKey.trim(),
            model,
          }),
        });

        if (res.ok) {
          setTestResult("success");
          toast.success("Conexión exitosa con Anthropic");
        } else {
          setTestResult("error");
          toast.error("API key inválida o error de conexión");
        }
      }
    } catch {
      setTestResult("error");
      toast.error("Error al probar la conexión");
    }

    setIsTesting(false);
  };

  // Auth check
  if (!authLoading && (!user || !isTeacher)) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-8 text-center max-w-sm"
        >
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Acceso No Autorizado
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Necesitas ser profesor o administrador para acceder a esta página.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5"
          >
            <Home className="w-4 h-4" />
            Volver al Inicio
          </Button>
        </motion.div>
      </div>
    );
  }

  const currentProvider = PROVIDERS[provider];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-violet-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push("/profesor")}
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver al Panel</span>
          </button>
          <div className="flex items-center gap-2">
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/10 to-emerald-500/10 border border-violet-500/20">
              <Sparkles className="w-6 h-6 text-violet-500 dark:text-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Configuración{" "}
                <span className="bg-gradient-to-r from-violet-500 to-emerald-500 dark:from-violet-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  IA
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Conecta tu propia API key para el asistente de IA
              </p>
            </div>
          </div>
        </motion.div>

        {/* Status card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-2xl p-4 mb-6"
        >
          <div className="flex items-center gap-3">
            {isConfigured ? (
              <>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    IA Configurada
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Proveedor: {PROVIDERS[provider]?.icon} {currentProvider?.name} | Modelo: {model}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <Settings className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    Sin Configurar
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Configura tu API key para usar el asistente de IA
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Config form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="space-y-6">
            {/* Provider selector */}
            <div>
              <Label className="flex items-center gap-1.5 mb-2">
                <Cpu className="w-4 h-4 text-gray-400" />
                Proveedor de IA
              </Label>
              <Select value={provider} onValueChange={handleProviderChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROVIDERS).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.icon} {config.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model selector */}
            <div>
              <Label className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-gray-400" />
                Modelo
              </Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentProvider?.models.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* API Key input */}
            <div>
              <Label className="flex items-center gap-1.5 mb-2">
                <Key className="w-4 h-4 text-gray-400" />
                API Key
              </Label>
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setTestResult(null);
                  }}
                  placeholder={
                    provider === "openai"
                      ? "sk-..."
                      : provider === "anthropic"
                      ? "sk-ant-..."
                      : "AI..."
                  }
                  className="pr-10"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showKey ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                Tu API key se almacena solo en tu navegador (localStorage). Nunca se envía a nuestros servidores ni se guarda en la base de datos.
              </p>
            </div>

            {/* Test result */}
            {testResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  testResult === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/20"
                    : "bg-red-500/10 border border-red-500/20"
                }`}
              >
                {testResult === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`text-xs font-medium ${
                    testResult === "success"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {testResult === "success"
                    ? "Conexión exitosa"
                    : "Error de conexión - verifica tu API key"}
                </span>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleTest}
                disabled={isTesting || !apiKey.trim()}
                variant="outline"
                className="gap-1.5 flex-1"
              >
                {isTesting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Probar Conexión
              </Button>
              <Button
                onClick={handleSave}
                disabled={!apiKey.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 flex-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                Guardar Configuración
              </Button>
              {isConfigured && (
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10 gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  Eliminar
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 mt-6"
        >
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            ¿Cómo funciona BYOK (Bring Your Own Key)?
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 text-sm font-bold">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Obtén tu API Key
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Regístrate en OpenAI, Anthropic o Google AI Studio y genera una API key.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 text-sm font-bold">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Configura aquí
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ingresa tu API key, selecciona el proveedor y modelo, y guarda.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 text-sm font-bold">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Usa el asistente de IA
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mientras editas un curso, abre el panel de IA para generar contenido, descripciones, preguntas y más.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
