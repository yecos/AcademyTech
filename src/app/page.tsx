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
  Layers,
  Clock,
  Users,
  Play,
  GraduationCap,
  Shield,
  Brain,
  Building2,
  Code2,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getCategoryTheme, getCategoryThemeByColor, CategoryTheme } from "@/lib/category-themes";
import { CategoryCardBackground } from "@/components/CategoryBackground";

// Map icon names to components for category cards
function CategoryIconComponent({ iconName, className }: { iconName: string; className?: string }) {
  switch (iconName) {
    case "Building2":
      return <Building2 className={className} />;
    case "Code2":
      return <Code2 className={className} />;
    case "Shield":
      return <Shield className={className} />;
    case "Brain":
      return <Brain className={className} />;
    default:
      return <GraduationCap className={className} />;
  }
}

interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
  description: string | null;
  color: string | null;
  courseCount: number;
}

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
  level: string | null;
  duration: string | null;
  categoryId: string | null;
  category: {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
    slug: string;
  } | null;
  teacherId: string | null;
  teacher: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

const LEVEL_BADGE_STYLES: Record<string, string> = {
  beginner: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  intermediate: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  advanced: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
};

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
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
          const catData = await catRes.json();
          setCategories(catData);
        }
        if (courseRes.ok) {
          const courseData = await courseRes.json();
          setCourses(courseData);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Compute stats
  const totalCourses = courses.length;
  const totalTopics = courses.reduce((sum, c) => sum + c.topicCount, 0);
  const activeStudents = courses.filter((c) => c.enrolled).length || totalCourses * 15;

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Tu Plataforma de Aprendizaje Tecnológico
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Academy{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Tech
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Aprende{" "}
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Arquitectura</span>,{" "}
            <span className="text-blue-600 dark:text-blue-400 font-medium">Programación</span>,{" "}
            <span className="text-red-600 dark:text-red-400 font-medium">Ciberseguridad</span> e{" "}
            <span className="text-violet-600 dark:text-violet-400 font-medium">Inteligencia Artificial</span>{" "}
            con cursos interactivos, evaluaciones y seguimiento de progreso.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2 h-12 px-8 text-base font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
              onClick={() => {
                const el = document.getElementById("courses-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <BookOpen className="w-5 h-5" />
              Explorar Cursos
            </Button>
          </motion.div>

          {/* Auth banner for non-logged users */}
          {!authLoading && !isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <LogIn className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-sm text-emerald-700 dark:text-emerald-300">
                Inicia sesión para guardar tu progreso
              </span>
              <button
                onClick={login}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
              >
                <LogIn className="w-3 h-3" />
                Iniciar Sesión
              </button>
            </motion.div>
          )}
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl glass-card">
              <BookOpen className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">{totalCourses}+</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Cursos</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl glass-card">
              <Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">{activeStudents}+</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Estudiantes</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl glass-card">
              <Layers className="w-4 h-4 text-violet-500 dark:text-violet-400" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">{totalTopics}+</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Temas</span>
            </div>
          </div>
        </motion.section>

        {/* Categories Section - Enhanced with category themes */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Categorías
            </h2>
          </div>

          {isLoading ? (
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                  <div className="h-10 w-10 rounded-xl bg-gray-200 dark:bg-white/5 mb-4" />
                  <div className="h-5 w-24 rounded bg-gray-200 dark:bg-white/5 mb-2" />
                  <div className="h-3 w-32 rounded bg-gray-200 dark:bg-white/5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              {categories.map((cat, index) => {
                const theme = getCategoryTheme(cat.slug);
                const tw = theme.tailwind;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    onClick={() => router.push(`/categoria/${cat.slug}`)}
                    className={`glass-card glass-card-hover rounded-2xl p-6 cursor-pointer transition-all duration-300 group relative overflow-hidden`}
                  >
                    {/* Category-themed background with pattern on hover */}
                    <CategoryCardBackground theme={theme} />

                    {/* Gradient top accent bar */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tw.gradient}`}
                    />

                    <div className="relative z-10">
                      <div
                        className={`w-12 h-12 rounded-xl ${tw.iconBg} ${tw.iconBgDark} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <CategoryIconComponent
                          iconName={theme.icon}
                          className={`w-6 h-6 ${tw.text} ${tw.textDark}`}
                        />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                        {cat.description || "Explora los cursos de esta categoría"}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <Badge
                          className={`${tw.badge} ${tw.badgeDark} text-[10px] px-2 border`}
                        >
                          {cat.courseCount} curso{cat.courseCount !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                    </div>

                    {/* Hover arrow */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <ArrowRight className={`w-4 h-4 ${tw.text} ${tw.textDark}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* Featured/Available Courses Section */}
        <motion.section
          id="courses-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-14"
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
                <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
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
              {courses.map((course, index) => {
                const catTheme = course.category?.slug
                  ? getCategoryTheme(course.category.slug)
                  : getCategoryThemeByColor(course.category?.color || "#10b981");
                const tw = catTheme.tailwind;
                const levelKey = course.level || "beginner";
                const levelLabel = LEVEL_LABELS[levelKey] || "Principiante";
                const levelBadge = LEVEL_BADGE_STYLES[levelKey] || LEVEL_BADGE_STYLES.beginner;

                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    onClick={() => router.push(`/curso/${course.slug}`)}
                    className="glass-card glass-card-hover rounded-2xl p-6 cursor-pointer transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Category-themed background with pattern on hover */}
                    <CategoryCardBackground theme={catTheme} />

                    {/* Category color accent bar */}
                    {course.category && (
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tw.gradient}`}
                      />
                    )}

                    <div className="relative z-10 flex items-start gap-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl ${tw.iconBg} ${tw.iconBgDark} border text-2xl shrink-0`}
                      >
                        {course.icon || "📚"}
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* Category badge */}
                        {course.category && (
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              className={`${tw.badge} ${tw.badgeDark} text-[10px] px-2 border`}
                            >
                              {course.category.name}
                            </Badge>
                            <Badge
                              className={`${levelBadge} text-[10px] px-2 border`}
                            >
                              {levelLabel}
                            </Badge>
                          </div>
                        )}

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {course.title}
                        </h3>

                        {/* Teacher name */}
                        {course.teacher?.name && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1.5 flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" />
                            {course.teacher.name}
                          </p>
                        )}

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
                          {course.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {course.duration}
                            </span>
                          )}
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
                                className={`absolute top-0 left-0 h-2 rounded-full progress-category`}
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{
                                  duration: 1,
                                  ease: "easeOut",
                                  delay: index * 0.1 + 0.3,
                                }}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-gray-400 dark:text-gray-500">
                                {course.progress === 100
                                  ? "¡Curso completado!"
                                  : "Progreso del curso"}
                              </span>
                              <span className={`text-[11px] font-medium ${tw.text} ${tw.textDark}`}>
                                {course.progress}%
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <Button
                              size="sm"
                              className={`${tw.button} text-white gap-1.5 h-8 text-xs`}
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
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <ArrowRight className={`w-4 h-4 ${tw.text} ${tw.textDark}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>

    </div>
  );
}
