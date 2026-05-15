"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  BookOpen,
  Layers,
  Sparkles,
  Play,
  ArrowRight,
  Home,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/hooks/use-auth";

interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string | null;
  color: string;
  order: number;
  courseCount: number;
}

interface CourseInfo {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  icon: string | null;
  moduleCount: number;
  topicCount: number;
  progress: number;
  enrolled: boolean;
  level: string;
  duration: string | null;
  status: string;
  categoryId: string | null;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
    slug: string;
  } | null;
  teacher: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
}

const levelLabels: Record<string, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

const levelColors: Record<string, string> = {
  principiante: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  intermedio: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  avanzado: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const slug = params.slug as string;

  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [courses, setCourses] = useState<CourseInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, courseRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/courses"),
        ]);

        if (catRes.ok) {
          const categories: CategoryInfo[] = await catRes.json();
          const found = categories.find((c) => c.slug === slug);
          setCategory(found || null);
        }

        if (courseRes.ok) {
          const allCourses: CourseInfo[] = await courseRes.json();
          const filtered = allCourses.filter((c) => c.category?.slug === slug);
          setCourses(filtered);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
      setIsLoading(false);
    }
    loadData();
  }, [slug]);

  const accentColor = category?.color || "#10b981";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-[0.05]"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="absolute top-1/3 -left-20 w-60 h-60 rounded-full blur-3xl opacity-[0.03]"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.03]"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
              Academy Tech
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 text-sm mb-6"
        >
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1 text-gray-400 dark:text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Academy Tech
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
          <span className="text-gray-900 dark:text-white font-medium">
            {category?.name || "Categoría"}
          </span>
        </motion.nav>

        {/* Category Header */}
        {isLoading ? (
          <div className="glass-card rounded-2xl p-8 mb-8 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-white/5" />
              <div className="space-y-2">
                <div className="h-6 w-48 rounded bg-gray-200 dark:bg-white/5" />
                <div className="h-4 w-64 rounded bg-gray-200 dark:bg-white/5" />
              </div>
            </div>
          </div>
        ) : category ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, transparent 60%)`,
              }}
            />
            <div className="relative flex items-start gap-4 sm:items-center">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-xl text-3xl shrink-0 border"
                style={{
                  backgroundColor: `${accentColor}15`,
                  borderColor: `${accentColor}30`,
                }}
              >
                {category.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {category.name}
                </h1>
                {category.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {category.description}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs">
                  <span
                    className="px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                    }}
                  >
                    {courses.length} curso{courses.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card rounded-2xl p-8 mb-8 text-center"
          >
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Categoría no encontrada
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              La categoría que buscas no existe o ha sido eliminada.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5"
            >
              <Home className="w-4 h-4" />
              Volver al Inicio
            </Button>
          </motion.div>
        )}

        {/* Course Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen
              className="w-4 h-4"
              style={{ color: accentColor }}
            />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Cursos en esta Categoría
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-8 text-center"
            >
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4"
                style={{
                  backgroundColor: `${accentColor}10`,
                }}
              >
                <BookOpen className="w-8 h-8" style={{ color: accentColor }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Próximamente más cursos en esta categoría
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Estamos trabajando en nuevo contenido para {category?.name || "esta categoría"}. ¡Vuelve pronto!
              </p>
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="gap-1.5"
              >
                <Home className="w-4 h-4" />
                Explorar otros cursos
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => router.push(`/curso/${course.slug}`)}
                  className="glass-card glass-card-hover rounded-2xl p-6 cursor-pointer transition-all duration-300 group relative"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl shrink-0 border"
                      style={{
                        backgroundColor: `${accentColor}10`,
                        borderColor: `${accentColor}20`,
                      }}
                    >
                      {course.icon || "📚"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
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

                      <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-3 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {course.moduleCount} módulo{course.moduleCount !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {course.topicCount} tema{course.topicCount !== 1 ? "s" : ""}
                        </span>
                        {course.level && (
                          <Badge
                            className={`text-[9px] px-1.5 ${levelColors[course.level] || levelColors.principiante}`}
                          >
                            {levelLabels[course.level] || course.level}
                          </Badge>
                        )}
                        {course.duration && (
                          <span className="text-gray-400 dark:text-gray-500">
                            {course.duration}
                          </span>
                        )}
                      </div>

                      {/* Progress or Start button */}
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

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Academy Tech
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-md mx-auto">
              Plataforma de aprendizaje en tecnología. Nuevos cursos añadidos regularmente.
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
