"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  Bookmark,
  GraduationCap,
  RotateCcw,
  Sparkles,
  Layers,
  Keyboard,
  AlertTriangle,
} from "lucide-react";
import { modules, Module } from "@/lib/curriculum";
import { useStudyStore } from "@/lib/store";
import { ProgressOverview } from "@/components/progress-overview";
import { ModuleCard } from "@/components/module-card";
import { QuizDialog } from "@/components/quiz-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function StudyApp() {
  const [quizModule, setQuizModule] = useState<Module | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const resetAll = useStudyStore((s) => s.resetAll);
  const overallProgress = useStudyStore((s) => s.getOverallProgress());

  const handleEvaluar = (module: Module) => {
    setQuizModule(module);
    setQuizOpen(true);
  };

  const handleReset = () => {
    resetAll();
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-600/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-8 sm:px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">
                Plan de Estudio Interactivo
              </span>
            </div>
            <Link
              href="/glosario"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/3 border border-white/8 hover:bg-white/6 hover:border-emerald-500/20 transition-all duration-200"
            >
              <BookOpen className="w-3 h-3 text-gray-400" />
              <span className="text-[11px] font-medium text-gray-400 hover:text-gray-300">
                Glosario
              </span>
            </Link>
            <Link
              href="/atajos"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/3 border border-white/8 hover:bg-white/6 hover:border-emerald-500/20 transition-all duration-200"
            >
              <Keyboard className="w-3 h-3 text-gray-400" />
              <span className="text-[11px] font-medium text-gray-400 hover:text-gray-300">
                Atajos
              </span>
            </Link>
            <Link
              href="/marcadores"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/3 border border-white/8 hover:bg-white/6 hover:border-emerald-500/20 transition-all duration-200"
            >
              <Bookmark className="w-3 h-3 text-gray-400" />
              <span className="text-[11px] font-medium text-gray-400 hover:text-gray-300">
                Marcadores
              </span>
            </Link>
            <Link
              href="/soluciones"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/3 border border-white/8 hover:bg-white/6 hover:border-emerald-500/20 transition-all duration-200"
            >
              <AlertTriangle className="w-3 h-3 text-gray-400" />
              <span className="text-[11px] font-medium text-gray-400 hover:text-gray-300">
                Soluciones
              </span>
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
            Academia{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              D5 Render
            </span>
          </h1>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Sigue tu progreso a través del curso completo de D5 Render.
            Completa los temas y evalúa tus conocimientos con las evaluaciones
            de cada módulo.
          </p>
        </motion.header>

        {/* Progress Overview */}
        <ProgressOverview />

        {/* Modules */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                Módulos del Curso
              </h2>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-red-400 text-xs"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reiniciar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-900 border-white/10">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">
                    ¿Reiniciar todo el progreso?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    Esta acción eliminará todo tu progreso, incluyendo temas
                    completados y resultados de evaluaciones. Esta acción no se
                    puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white/5 text-gray-300 border-white/10 hover:bg-white/10">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleReset}
                    className="bg-red-600 hover:bg-red-500 text-white"
                  >
                    Reiniciar Todo
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Accordion type="multiple" className="space-y-0">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                onEvaluar={handleEvaluar}
              />
            ))}
          </Accordion>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-5">
            {overallProgress === 100 ? (
              <div className="space-y-2">
                <GraduationCap className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">
                  ¡Felicidades! 🎉
                </h3>
                <p className="text-sm text-gray-400">
                  Has completado todos los temas del curso de D5 Render.
                  ¡Ahora eres un experto!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <BookOpen className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-sm font-semibold text-white">
                  Continúa aprendiendo
                </h3>
                <p className="text-xs text-gray-400">
                  Completa los temas y evaluaciones de cada módulo para avanzar
                  en tu formación en D5 Render.
                </p>
              </div>
            )}
          </div>
        </motion.footer>

        {/* Quiz Dialog */}
        {quizModule && (
          <QuizDialog
            module={quizModule}
            open={quizOpen}
            onOpenChange={setQuizOpen}
          />
        )}
      </div>
    </div>
  );
}
