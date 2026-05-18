"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  User,
  Mail,
  BookOpen,
  Flame,
  Target,
  Edit3,
  LogOut,
  Check,
  X,
  Shield,
  Clock,
  GraduationCap,
  Plus,
  ChevronRight,
  Layers,
  Trophy,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { getCategoryTheme } from "@/lib/category-themes";

// ── Types ──────────────────────────────────────────────────────

interface CourseItem {
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
  enrolledAt: string | null;
  completedTopics: number;
  lastStudyDate: string | null;
  level: string;
  duration: string | null;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
    slug: string;
  } | null;
}

interface DashboardStats {
  coursesEnrolled: number;
  topicsCompleted: number;
  avgQuizScore: number;
  quizzesTaken: number;
}

interface StreakData {
  current: number;
  longest: number;
  lastDate: string | null;
}

// ── Helper ─────────────────────────────────────────────────────

const LEVEL_LABELS: Record<string, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

const LEVEL_COLORS: Record<string, string> = {
  principiante: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  intermedio: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  avanzado: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
};

function formatDate(dateString?: string | null) {
  if (!dateString) return null;
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} sem`;
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
}

// ── Main Content ───────────────────────────────────────────────

function PerfilContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  const backUrl = courseSlug ? `/curso/${courseSlug}` : "/";

  const { user, isAuthenticated, isLoading, isGuest, logout } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);

  // Data state
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [achievementsCount, setAchievementsCount] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);

  // Sync editName when user data becomes available
  const userName = user?.name || "";
  if (!isEditingName && userName && editName !== userName) {
    setEditName(userName);
  }

  // Fetch dashboard data
  useEffect(() => {
    if (!isLoading || !isAuthenticated) return;

    let cancelled = false;

    async function load() {
      try {
        const [coursesRes, statsRes, streakRes, achievementsRes] =
          await Promise.allSettled([
            fetch("/api/courses"),
            fetch("/api/dashboard-stats"),
            fetch("/api/streak"),
            fetch("/api/achievements"),
          ]);

        if (cancelled) return;

        if (coursesRes.status === "fulfilled" && coursesRes.value.ok) {
          const coursesData = await coursesRes.value.json();
          if (!cancelled) setCourses(Array.isArray(coursesData) ? coursesData : []);
        }

        if (statsRes.status === "fulfilled" && statsRes.value.ok) {
          const statsData = await statsRes.value.json();
          if (!cancelled) setStats(statsData);
        }

        if (streakRes.status === "fulfilled" && streakRes.value.ok) {
          const streakData = await streakRes.value.json();
          if (!cancelled) setStreak(streakData);
        }

        if (achievementsRes.status === "fulfilled" && achievementsRes.value.ok) {
          const achievementsData = await achievementsRes.value.json();
          if (!cancelled)
            setAchievementsCount(
              typeof achievementsData === "object" && achievementsData !== null
                ? Object.keys(achievementsData).length
                : 0
            );
        }
      } catch {
        // Silently fail
      } finally {
        if (!cancelled) setDataLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSaveName = async () => {
    if (!editName.trim()) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });
      if (res.ok) {
        setIsEditingName(false);
        window.location.reload();
      }
    } catch {
      // Silently fail
    } finally {
      setIsSaving(false);
    }
  };

  const [refreshKey, setRefreshKey] = useState(0);

  // Re-fetch when refreshKey changes (after enrollment)
  useEffect(() => {
    if (refreshKey === 0) return; // skip initial mount
    if (!isAuthenticated) return;

    let cancelled = false;

    async function reload() {
      try {
        const [coursesRes, statsRes] = await Promise.allSettled([
          fetch("/api/courses"),
          fetch("/api/dashboard-stats"),
        ]);

        if (cancelled) return;

        if (coursesRes.status === "fulfilled" && coursesRes.value.ok) {
          const coursesData = await coursesRes.value.json();
          if (!cancelled) setCourses(Array.isArray(coursesData) ? coursesData : []);
        }

        if (statsRes.status === "fulfilled" && statsRes.value.ok) {
          const statsData = await statsRes.value.json();
          if (!cancelled) setStats(statsData);
        }
      } catch {
        // Silently fail
      }
    }

    reload();
    return () => { cancelled = true; };
  }, [refreshKey, isAuthenticated]);

  const handleEnroll = async (courseId: string) => {
    setEnrollingCourseId(courseId);
    try {
      const res = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      if (res.ok) {
        // Trigger data refresh
        setRefreshKey((k) => k + 1);
      }
    } catch {
      // Silently fail
    } finally {
      setEnrollingCourseId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const getInitial = () => {
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "?";
  };

  const enrolledCourses = courses.filter((c) => c.enrolled);
  const availableCourses = courses.filter((c) => !c.enrolled);

  // ── Animation variants ──
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

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
          <ThemeToggle />
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
              <User className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Mi{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tu progreso y cursos en Academy Tech
              </p>
            </div>
          </div>
        </motion.header>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="shrink-0">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "Avatar"}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-emerald-500 dark:text-emerald-400">
                    {getInitial()}
                  </span>
                </div>
              )}
            </div>

            {/* User info */}
            <div className="flex-1 min-w-0">
              {/* Name with edit */}
              <div className="flex items-center gap-2 mb-1">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 text-lg font-bold bg-white dark:bg-white/5 border border-emerald-500/30 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveName();
                        if (e.key === "Escape") setIsEditingName(false);
                      }}
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      disabled={isSaving}
                      className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="p-1 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                      {user.name || "Sin nombre"}
                    </h2>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Editar nombre"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {user.email || "Sin email"}
                </p>
              </div>

              {/* Role badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  className={`text-[10px] px-2 py-0.5 ${
                    user.role === "teacher"
                      ? "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20"
                      : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  }`}
                >
                  <Shield className="w-3 h-3 mr-1" />
                  {user.role === "teacher" ? "Profesor" : "Estudiante"}
                </Badge>
                {isGuest && (
                  <Badge className="text-[10px] px-2 py-0.5 bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20">
                    Invitado
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="inline-flex p-2 rounded-lg bg-emerald-500/10 mb-2">
              <BookOpen className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {dataLoading ? (
                <span className="inline-block w-6 h-7 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
              ) : (
                stats?.coursesEnrolled ?? 0
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Cursos Inscritos
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="inline-flex p-2 rounded-lg bg-sky-500/10 mb-2">
              <Layers className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {dataLoading ? (
                <span className="inline-block w-6 h-7 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
              ) : (
                stats?.topicsCompleted ?? 0
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Temas Completados
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="inline-flex p-2 rounded-lg bg-amber-500/10 mb-2">
              <Target className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {dataLoading ? (
                <span className="inline-block w-6 h-7 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
              ) : (
                `${stats?.avgQuizScore ?? 0}%`
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Puntuación Media
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="inline-flex p-2 rounded-lg bg-orange-500/10 mb-2">
              <Flame className="w-4 h-4 text-orange-500 dark:text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {dataLoading ? (
                <span className="inline-block w-6 h-7 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
              ) : (
                streak?.current ?? 0
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Racha Actual
            </div>
          </div>
        </motion.div>

        {/* Enrolled Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Mis Cursos
            </h2>
            {enrolledCourses.length > 0 && (
              <Badge className="text-[10px] px-2 py-0.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                {enrolledCourses.length}
              </Badge>
            )}
          </div>

          {dataLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-5 animate-pulse"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-white/10 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="w-3/4 h-5 bg-gray-200 dark:bg-white/10 rounded" />
                      <div className="w-1/2 h-3 bg-gray-200 dark:bg-white/10 rounded" />
                      <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : enrolledCourses.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center">
              <BookOpen className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">
                Aún no estás inscrito en ningún curso
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Explora los cursos disponibles e inscríbete para comenzar a aprender
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3 max-h-[600px] overflow-y-auto pr-1
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/10
                [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {enrolledCourses.map((course) => {
                const catSlug = course.category?.slug || "arquitectura";
                const theme = getCategoryTheme(catSlug);

                return (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    onClick={() => router.push(`/curso/${course.slug}`)}
                    className="glass-card rounded-2xl p-5 cursor-pointer
                      hover:bg-white/60 dark:hover:bg-white/[0.04]
                      transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Course icon */}
                      <div
                        className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-xl border ${theme.tailwind.iconBg} ${theme.tailwind.iconBgDark}`}
                      >
                        <span className="text-xl">
                          {course.icon || "📚"}
                        </span>
                      </div>

                      {/* Course info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {course.title}
                          </h3>
                          <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 shrink-0 mt-0.5 transition-colors" />
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                          {course.category && (
                            <Badge
                              className={`text-[9px] px-1.5 py-0 ${theme.tailwind.badge} ${theme.tailwind.badgeDark}`}
                            >
                              {course.category.name}
                            </Badge>
                          )}
                          <Badge
                            className={`text-[9px] px-1.5 py-0 ${LEVEL_COLORS[course.level] || LEVEL_COLORS.principiante}`}
                          >
                            {LEVEL_LABELS[course.level] || course.level}
                          </Badge>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500">
                            {course.moduleCount} módulos · {course.topicCount} temas
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden mb-1.5">
                          <motion.div
                            className={`h-full rounded-full ${theme.tailwind.progress}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                            {course.completedTopics} de {course.topicCount} temas · {course.progress}%
                          </span>
                          {course.lastStudyDate && (
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(course.lastStudyDate)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>

        {/* Available Courses Section */}
        {availableCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Explorar Cursos
              </h2>
              <Badge className="text-[10px] px-2 py-0.5 bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20">
                {availableCourses.length}
              </Badge>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {availableCourses.map((course) => {
                const catSlug = course.category?.slug || "arquitectura";
                const theme = getCategoryTheme(catSlug);

                return (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    className="glass-card rounded-2xl p-5 flex flex-col"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border ${theme.tailwind.iconBg} ${theme.tailwind.iconBgDark}`}
                      >
                        <span className="text-lg">
                          {course.icon || "📚"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {course.category && (
                            <Badge
                              className={`text-[9px] px-1.5 py-0 ${theme.tailwind.badge} ${theme.tailwind.badgeDark}`}
                            >
                              {course.category.name}
                            </Badge>
                          )}
                          <Badge
                            className={`text-[9px] px-1.5 py-0 ${LEVEL_COLORS[course.level] || LEVEL_COLORS.principiante}`}
                          >
                            {LEVEL_LABELS[course.level] || course.level}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {course.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                        {course.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        {course.moduleCount} módulos · {course.topicCount} temas
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleEnroll(course.id)}
                        disabled={enrollingCourseId === course.id}
                        className={`h-7 text-xs px-3 text-white ${theme.tailwind.button}`}
                      >
                        {enrollingCourseId === course.id ? (
                          <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Plus className="w-3 h-3 mr-1" />
                            Inscribirse
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}

        {/* Achievements & Streak Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Resumen de Actividad
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {achievementsCount}
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">
                Logros Desbloqueados
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {streak?.longest ?? 0}
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">
                Mejor Racha
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {stats?.quizzesTaken ?? 0}
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">
                Evaluaciones Hechas
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-amber-500 dark:text-amber-400">
                {stats?.avgQuizScore ?? 0}%
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">
                Puntuación Media
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setIsEditingName(true)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Editar Perfil
            </Button>
            <Button
              onClick={logout}
              variant="outline"
              className="flex-1 border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/5 gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Dashboard — Academy Tech —{" "}
              <span className="text-emerald-500/70 dark:text-emerald-400/70">
                Tu progreso se guarda en la base de datos
              </span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

function PerfilFallback() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
    </div>
  );
}

export default function PerfilPage() {
  return (
    <Suspense fallback={<PerfilFallback />}>
      <PerfilContent />
    </Suspense>
  );
}
