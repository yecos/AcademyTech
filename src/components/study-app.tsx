"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
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
  Download,
  MessageSquare,
} from "lucide-react";
import { Module } from "@/lib/curriculum";
import { useCurriculum } from "@/hooks/use-curriculum";
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
import { CourseReviews } from "@/components/course-reviews";
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
  "diseno-arquitectonico-bim": "Diseño Arquitectónico BIM",
  "desarrollo-web-completo": "Desarrollo Web Completo",
  "fundamentos-ciberseguridad": "Ciberseguridad y Ethical Hacking",
  "introduccion-inteligencia-artificial": "Inteligencia Artificial",
};

// Map slugs to descriptions
const courseDescriptions: Record<string, string> = {
  "d5-render": "Sigue tu progreso a través del curso completo de D5 Render. Completa los temas y evalúa tus conocimientos con las evaluaciones de cada módulo.",
  "diseno-arquitectonico-bim": "Domina la metodología BIM desde los fundamentos hasta la práctica profesional con Revit.",
  "desarrollo-web-completo": "Aprende a crear sitios web profesionales con HTML5, CSS3 y JavaScript ES6+.",
  "fundamentos-ciberseguridad": "Aprende cómo proteger sistemas y realizar auditorías de seguridad éticas.",
  "introduccion-inteligencia-artificial": "Desde machine learning hasta deep learning y modelos generativos.",
};

export function StudyApp() {
  const [quizModule, setQuizModule] = useState<Module | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(null);
  const course = useCourse();
  const courseSlug = useCourseSlug();
  const { modules, isLoading: curriculumLoading, courseTitle, courseDescription: curriculumDescription } = useCurriculum();
  const resetAll = course.resetAll;
  const overallProgress = course.getOverallProgress();
  const currentStreak = course.streak.current;
  const unlockedCount = course.getUnlockedCount();

  // Get category theme - must be called before any early return (hooks rules)
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;

  // Initialize achievement checker (runs streak check + achievement checks + toasts)
  useAchievementChecker();

  // Fetch courseId from slug (needed for reviews component)
  const courseIdRef = useRef(false);
  useEffect(() => {
    if (courseIdRef.current || courseId) return;
    courseIdRef.current = true;

    async function fetchCourseId() {
      try {
        const courseRes = await fetch(`/api/course?slug=${courseSlug}`);
        if (!courseRes.ok) return;
        const courseData = await courseRes.json();
        if (courseData.id) {
          setCourseId(courseData.id);
        }
      } catch {
        // Silently fail
      }
    }
    fetchCourseId();
  }, [courseSlug, courseId]);

  // Auto-enrollment logic
  const { status: authStatus } = useSession();
  const autoEnrollRef = useRef(false);

  useEffect(() => {
    // Wait until auth status is resolved and user is authenticated
    if (authStatus !== "authenticated" || autoEnrollRef.current) return;

    async function autoEnroll() {
      try {
        // Step 1: Get courseId from slug
        const courseRes = await fetch(`/api/course?slug=${courseSlug}`);
        if (!courseRes.ok) return;
        const courseData = await courseRes.json();
        if (!courseData.id) return;

        // Store courseId for reviews component
        setCourseId(courseData.id);

        // Step 2: Check if already enrolled
        const enrollRes = await fetch(`/api/enrollment?courseId=${courseData.id}`);
        if (!enrollRes.ok) return;
        const enrollData = await enrollRes.json();

        // Step 3: If not enrolled, auto-enroll
        if (!enrollData.enrolled) {
          await fetch("/api/enrollment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId: courseData.id }),
          });
        }
      } catch (error) {
        // Silently fail - enrollment is not critical for viewing the course
        console.error("Auto-enrollment failed:", error);
      }
    }

    autoEnrollRef.current = true;
    autoEnroll();
  }, [authStatus, courseSlug]);

  const courseName = courseTitle || courseNames[courseSlug] || courseSlug;
  const courseDescription = curriculumDescription || courseDescriptions[courseSlug] || "Sigue tu progreso y completa los temas del curso.";

  // Get error from curriculum
  const { error: curriculumError } = useCurriculum();

  // Show loading state while curriculum is being fetched
  if (curriculumLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto" style={{ borderColor: theme.primaryColor, borderTopColor: 'transparent' }} />
          <p className="text-sm text-gray-500 dark:text-gray-400">Cargando curso...</p>
        </div>
      </div>
    );
  }

  // Show error state if curriculum failed to load
  if (curriculumError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
        <div className="text-center space-y-4 max-w-md px-4">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Error al cargar el curso
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {curriculumError}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className={`${tw.button} text-white gap-2`}
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  // Show empty state if no modules loaded
  if (modules.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
        <div className="text-center space-y-4 max-w-md px-4">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Curso sin contenido
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Este curso aún no tiene módulos disponibles. Vuelve más tarde.
          </p>
          <Link href="/">
            <Button className={`${tw.button} text-white gap-2`}>
              <ArrowLeft className="w-4 h-4" />
              Volver a cursos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
              <button
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/course?slug=${courseSlug}`);
                    if (res.ok) {
                      const data = await res.json();
                      if (data.id) {
                        window.open(`/api/export/course/${data.id}`, '_blank');
                      }
                    }
                  } catch {
                    // ignore
                  }
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100 dark:bg-white/3 border border-gray-200 dark:border-white/8 hover:bg-gray-200 dark:hover:bg-white/6 hover:border-emerald-500/20 transition-all duration-200"
              >
                <Download className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                  PDF
                </span>
              </button>
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

        {/* Course Reviews */}
        {courseId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className={`w-4 h-4 ${tw.text} ${tw.textDark}`} />
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Reseñas del Curso
              </h2>
            </div>
            <CourseReviews courseId={courseId} />
          </motion.div>
        )}

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
