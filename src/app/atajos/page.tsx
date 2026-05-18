"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Keyboard,
  Command,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";

interface Shortcut {
  keys: string[];
  description: string;
}

interface ShortcutCategory {
  title: string;
  icon: string;
  shortcuts: Shortcut[];
}

const shortcutCategories: ShortcutCategory[] = [
  {
    title: "Navegación",
    icon: "🧭",
    shortcuts: [
      { keys: ["W", "A", "S", "D"], description: "Navegación en primera persona" },
      { keys: ["Q", "E"], description: "Subir/Bajar en modo primera persona" },
      { keys: ["Rueda del ratón"], description: "Zoom" },
      { keys: ["Botón central", "Arrastrar"], description: "Orbitar" },
      { keys: ["Shift", "Botón central"], description: "Pan" },
      { keys: ["F"], description: "Enfocar objeto seleccionado" },
      { keys: ["Home"], description: "Vista inicial de la escena" },
    ],
  },
  {
    title: "Transformación",
    icon: "🔄",
    shortcuts: [
      { keys: ["W"], description: "Herramienta mover" },
      { keys: ["E"], description: "Herramienta rotar" },
      { keys: ["R"], description: "Herramienta escalar" },
      { keys: ["Ctrl", "Z"], description: "Deshacer" },
      { keys: ["Ctrl", "Y"], description: "Rehacer" },
      { keys: ["Ctrl", "D"], description: "Duplicar objeto" },
      { keys: ["Delete"], description: "Eliminar objeto" },
      { keys: ["Ctrl", "A"], description: "Seleccionar todo" },
      { keys: ["Ctrl", "Shift", "A"], description: "Deseleccionar todo" },
    ],
  },
  {
    title: "Archivo",
    icon: "📁",
    shortcuts: [
      { keys: ["Ctrl", "S"], description: "Guardar escena" },
      { keys: ["Ctrl", "O"], description: "Abrir escena" },
      { keys: ["Ctrl", "N"], description: "Nueva escena" },
      { keys: ["Ctrl", "Shift", "S"], description: "Guardar como" },
    ],
  },
  {
    title: "Vista",
    icon: "👁️",
    shortcuts: [
      { keys: ["1"], description: "Vista perspectiva" },
      { keys: ["2"], description: "Vista superior" },
      { keys: ["3"], description: "Vista frontal" },
      { keys: ["4"], description: "Vista lateral" },
      { keys: ["G"], description: "Mostrar/ocultar grid" },
      { keys: ["Ctrl", "H"], description: "Ocultar objeto seleccionado" },
    ],
  },
  {
    title: "Render",
    icon: "🎬",
    shortcuts: [
      { keys: ["Ctrl", "R"], description: "Iniciar render" },
      { keys: ["PrintScreen"], description: "Captura de pantalla" },
    ],
  },
];

function KeyCap({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-gray-200 dark:bg-white/8 border border-gray-300 dark:border-white/15 border-b-2 border-b-gray-400 dark:border-b-white/20 text-[11px] font-mono font-medium text-gray-700 dark:text-gray-200 shadow-sm select-none">
      {children}
    </kbd>
  );
}

function KeyCombo({ keys }: { keys: string[] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {keys.map((key, i) => (
        <span key={i} className="flex items-center gap-1">
          <KeyCap>{key}</KeyCap>
          {i < keys.length - 1 && (
            <span className="text-gray-400 dark:text-gray-500 text-xs">+</span>
          )}
        </span>
      ))}
    </div>
  );
}

function AtajosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  const backUrl = courseSlug ? `/curso/${courseSlug}` : "/";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-600/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(backUrl)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
          <div className="flex items-center gap-2">
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/20">
              <Keyboard className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Atajos de{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  Teclado
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Referencia rápida de los atajos de D5 Render
              </p>
            </div>
          </div>
        </motion.header>

        {/* Shortcut categories */}
        <div className="space-y-8">
          {shortcutCategories.map((category, catIndex) => (
            <motion.section
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: catIndex * 0.08 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{category.icon}</span>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  {category.title}
                </h2>
                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] px-1.5">
                  {category.shortcuts.length}
                </Badge>
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
              </div>

              {/* Shortcuts grid */}
              <div className="grid gap-2 sm:grid-cols-2">
                {category.shortcuts.map((shortcut, sIndex) => (
                  <motion.div
                    key={shortcut.description}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: catIndex * 0.08 + sIndex * 0.03,
                    }}
                    className="glass-card glass-card-hover rounded-lg px-4 py-3 flex items-center justify-between gap-3 transition-all duration-200"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-300 min-w-0">
                      {shortcut.description}
                    </span>
                    <KeyCombo keys={shortcut.keys} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Tip section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-10 glass-card rounded-xl p-5 border-emerald-500/10"
        >
          <div className="flex items-start gap-3">
            <Command className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Consejo
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Los atajos de teclado pueden variar según la versión de D5 Render y tu
                configuración regional. Algunos atajos solo están disponibles cuando la
                ventana del viewport está activa. Personaliza tus atajos en{" "}
                <span className="text-emerald-600 dark:text-emerald-400/80">
                  Configuración → Atajos de teclado
                </span>{" "}
                para adaptarlos a tu flujo de trabajo.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Atajos — Academy Tech —{" "}
              <span className="text-emerald-500/70 dark:text-emerald-400/70">
                {shortcutCategories.reduce(
                  (acc, cat) => acc + cat.shortcuts.length,
                  0
                )}{" "}
                atajos listados
              </span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

function AtajosFallback() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse flex items-center gap-2 text-gray-400">
            <Keyboard className="w-5 h-5" />
            <span className="text-sm">Cargando atajos...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AtajosPage() {
  return (
    <Suspense fallback={<AtajosFallback />}>
      <AtajosContent />
    </Suspense>
  );
}
