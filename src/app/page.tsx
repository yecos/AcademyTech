"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  LogIn,
  Sparkles,
  ArrowRight,
  Lock,
  Layers,
  Clock,
  CheckCircle2,
  Play,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/hooks/use-auth";

interface CourseInfo {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  icon: string | null;
  moduleCount: number;
  topicCount: number;
  progress: number;
  enrolled: boolean;
}

interface UpcomingCourse {
  icon: string;
  title: string;
  description: string;
}

const upcomingCourses: UpcomingCourse[] = [
  {
    icon: "🏗️",
    title: "Lumion",
    description: "Aprende visualización arquitectónica con Lumion",
  },
  {
    icon: "🎨",
    title: "V-Ray",
    description: "Domina el renderizado fotorrealista con V-Ray",
  },
  {
    icon: "🏠",
    title: "Enscape",
    description: "Visualización en tiempo real para diseño arquitectónico",
  },
  {
    icon: "🎮",
    title: "Unreal Engine",
    description: "Creación de experiencias interactivas arquitectónicas",
  },
];

export default function CatalogPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();
  const [courses, setCourses] = useState<CourseInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      } catch (error) {
        console.error("Failed to load courses:", error);
      }
      setIsLoading(false);
    }
    loadCourses();
  }, []);

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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
              Render Academy
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Plataforma de Aprendizaje
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Academia de{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
              Renderizado 3D
            </span>
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-6">
            Aprende las herramientas líderes del mercado con cursos interactivos,
            evaluaciones y seguimiento de progreso personalizado.
          </p>

          {/* Auth banner for non-logged users */}
          {!authLoading && !isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <LogIn className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-sm text-emerald-700 dark:text-emerald-300">
                Inicia sesión para guardar tu progreso
              </span>
              <button
                onClick={login}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
              >
                <LogIn className="w-3 h-3" />
                Iniciar Sesión
              </button>
            </motion.div>
          )}
        </motion.section>

        {/* Available Courses */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Cursos Disponibles
            </h2>
          </div>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-6 animate-pulse"
                >
                  <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-white/5 mb-4" />
                  <div className="h-5 w-32 rounded bg-gray-200 dark:bg-white/5 mb-2" />
                  <div className="h-4 w-48 rounded bg-gray-200 dark:bg-white/5 mb-4" />
                  <div className="h-2 w-full rounded bg-gray-200 dark:bg-white/5" />
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No hay cursos disponibles aún
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Estamos preparando contenido nuevo. ¡Vuelve pronto!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => router.push(`/curso/${course.slug}`)}
                  className="glass-card glass-card-hover rounded-2xl p-6 cursor-pointer transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-2xl shrink-0">
                      {course.icon || "📚"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                        {course.enrolled && course.progress > 0 && (
                          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] px-1.5 shrink-0">
                            {course.progress}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {course.moduleCount} módulo{course.moduleCount !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {course.topicCount} tema{course.topicCount !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* Progress bar if enrolled */}
                      {course.enrolled && course.progress > 0 ? (
                        <div className="space-y-1.5">
                          <div className="relative">
                            <Progress
                              value={course.progress}
                              className="h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden"
                            />
                            <motion.div
                              className="absolute top-0 left-0 h-2 rounded-full progress-emerald"
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 + 0.3 }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-gray-400 dark:text-gray-500">
                              {course.progress === 100
                                ? "¡Curso completado!"
                                : "Progreso del curso"}
                            </span>
                            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                              {course.progress}%
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 h-8 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/curso/${course.slug}`);
                            }}
                          >
                            <Play className="w-3 h-3" />
                            Comenzar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Upcoming Courses */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Próximamente
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {upcomingCourses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                className="glass-card rounded-2xl p-6 opacity-50 relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 text-2xl shrink-0">
                    {course.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-400 dark:text-gray-500">
                        {course.title}
                      </h3>
                      <Badge className="bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-white/8 text-[9px] px-1.5 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        Próximamente
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {course.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Render Academy
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-md mx-auto">
              Plataforma de aprendizaje para herramientas de renderizado 3D y visualización arquitectónica.
              Nuevos cursos añadidos regularmente.
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
