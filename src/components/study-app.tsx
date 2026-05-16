"use client";

import { useState, useMemo } from "react";
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
  Search,
  Award,
  GitCompare,
  Trophy,
  Flame,
  ArrowLeft,
} from "lucide-react";
import { modules, Module } from "@/lib/curriculum";
import { useCourse, useCourseSlug } from "@/hooks/use-course-context";
import { ProgressOverview } from "@/components/progress-overview";
import { ModuleCard } from "@/components/module-card";
import { QuizDialog } from "@/components/quiz-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAchievementChecker } from "@/hooks/use-achievement-checker";
import { UserMenu } from "@/components/user-menu";
import { AuthBanner } from "@/components/auth-banner";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";
import { CategoryBackground } from "@/components/CategoryBackground";
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

// Map slugs to display names
const courseNames: Record<string, string> = {
  "d5-render": "D5 Render",
};

// Map slugs to descriptions
const courseDescriptions: Record<string, string> = {
  "d5-render": "Sigue tu progreso a través del curso completo de D5 Render. Completa los temas y evalúa tus conocimientos con las evaluaciones de cada módulo.",
};

export function StudyApp() {
  const [quizModule, setQuizModule] = useState<Module | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const course = useCourse();
  const courseSlug = useCourseSlug();
  const resetAll = course.resetAll;
  const overallProgress = course.getOverallProgress();
  const currentStreak = course.streak.current;
  const unlockedCount = course.getUnlockedCount();

  const courseName = courseNames[courseSlug] || courseSlug;
  const courseDescription = courseDescriptions[courseSlug] || "Sigue tu progreso y completa los temas del curso.";

  // Get category theme
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;

  // Initialize achievement checker (runs streak check + achievement checks + toasts)
  useAchievementChecker();

  const handleEvaluar = (module: Module) => {
    setQuizModule(module);
    setQuizOpen(true);
  };

  const handleReset = () => {
    resetAll();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Auth banner for non-logged users */}
      <AuthBanner />

      {/* Category-themed background */}
      <CategoryBackground />

      <div className="relative max-w-3xl mx-auto px-4 py-8 sm:px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          {/* Theme toggle + User menu - top right */}
          <div className="flex justify-between items-center mb-2">
            <Link
              href="/"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100 dark:bg-white/3 border border-gray-200 dark:border-white/8 hover:bg-gray-200 dark:hover:bg-white/6 ${tw.hoverBorder} ${tw.hoverBorderDark} transition-all duration-200`}
            >
              <ArrowLeft className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400">
                Cursos
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <UserMenu />
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${tw.bg} ${tw.bgDark} border ${tw.border} ${tw.borderDark}`}>
              <Sparkles className={`w-3.5 h-3.5 ${tw.text} ${tw.textDark}`} />
              <span className={`text-xs font-medium ${tw.text} ${tw.textDark}`}>
                Plan de Estudio Interactivo
              </span>
            </div>
            <Link
              href="/glosario"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100 dark:bg-white/3 border border-gray-200 dark:border-white/8 hover:bg-gray-200 dark:hover:bg-white/6 hover:border-emerald-500/20 transition-all duration-200"
            >
              <BookOpen className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                Glosario
              </span>
            </Link>
            <Link
              href="/atajos"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100 dark:bg-white/3 border border-gray-200 dark:border-white/8 hover:bg-gray-200 dark:hover:bg-white/6 hover:border-emerald-500/20 transition-all duration-200"
            >
              <Keyboard className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                Atajos
              </span>
            </Link>
            <Link
              href="/marcadores"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100 dark:bg-white/3 border border-gray-200 dark:border-white/8 hover:bg-gray-200 dark:hover:bg-white/6 hover:border-emerald-500/20 transition-all duration-200"
            >
              <Bookmark className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                Marcadores
              </span>
            </Link>
            <Link
              href="/soluciones"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100 dark:bg-white/3 border border-gray-200 dark:border-white/8 hover:bg-gray-200 dark:hover:bg-white/6 hover:border-emerald-500/20 transition-all duration-200"
            >
              <AlertTriangle className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                Soluciones
              </span>
            </Link>
            <Link
              href="/buscar"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ${tw.bg} ${tw.bgDark} border ${tw.border} ${tw.borderDark} hover:opacity-90 transition-all duration-200`}
            >
              <Search className={`w-3 h-3 ${tw.text} ${tw.textDark}`} />
              <span className={`text-[11px] font-medium ${tw.text} ${tw.textDark}`}>
                Buscar
              </span>
            </Link>
            <Link
              href="/comparar"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100 dark:bg-white/3 border border-gray-200 dark:border-white/8 hover:bg-gray-200 dark:hover:bg-white/6 hover:border-emerald-500/20 transition-all duration-200"
            >
              <GitCompare className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                Comparar
              </span>
            </Link>
            <Link
              href="/certificado"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-all duration-200 ${
                overallProgress === 100
                  ? `${tw.bg} ${tw.bgDark} ${tw.border} ${tw.borderDark}`
                  : "bg-gray-100 dark:bg-white/3 border-gray-200 dark:border-white/8 hover:bg-gray-200 dark:hover:bg-white/6 opacity-50"
              }`}
            >
              <Award className={`w-3 h-3 ${overallProgress === 100 ? `${tw.text} ${tw.textDark}` : "text-gray-400"}`} />
              <span className={`text-[11px] font-medium ${overallProgress === 100 ? `${tw.text} ${tw.textDark}` : "text-gray-400"}`}>
                Certificado
              </span>
            </Link>
            <Link
              href="/logros"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15 hover:border-amber-500/30 transition-all duration-200"
            >
              <Trophy className="w-3 h-3 text-amber-500 dark:text-amber-400" />
              <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                Logros
              </span>
              {unlockedCount > 0 && (
                <span className="text-[9px] bg-amber-500/20 text-amber-600 dark:text-amber-300 rounded-full px-1.5 py-0">
                  {unlockedCount}
                </span>
              )}
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight flex items-center justify-center gap-3">
            Academia{" "}
            <span className={`bg-gradient-to-r ${tw.gradient} bg-clip-text text-transparent`}>
              {courseName}
            </span>
            {currentStreak > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-sm">
                <Flame className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span className="text-amber-600 dark:text-amber-400 font-bold">{currentStreak}</span>
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {courseDescription}
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
              <Layers className={`w-4 h-4 ${tw.text} ${tw.textDark}`} />
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Módulos del Curso
              </h2>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 dark:text-gray-500 hover:text-red-400 text-xs"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reiniciar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gray-900 dark:text-white">
                    ¿Reiniciar todo el progreso?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
                    Esta acción eliminará todo tu progreso, incluyendo temas
                    completados y resultados de evaluaciones. Esta acción no se
                    puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-100 dark:bg-white/05 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10">
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
              <div className="space-y-3">
                <GraduationCap className={`w-8 h-8 ${tw.text} ${tw.textDark} mx-auto`} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  ¡Felicidades! 🎉
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Has completado todos los temas del curso de {courseName}.
                  ¡Ahora eres un experto!
                </p>
                <Link href="/certificado">
                  <Button className={`${tw.button} text-white gap-2 mt-2`}>
                    <Award className="w-4 h-4" />
                    Obtener Certificado
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <BookOpen className={`w-8 h-8 ${tw.text} ${tw.textDark} mx-auto`} />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Continúa aprendiendo
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Completa los temas y evaluaciones de cada módulo para avanzar
                  en tu formación en {courseName}.
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
