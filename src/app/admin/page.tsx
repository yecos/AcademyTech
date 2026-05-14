"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Users,
  Activity,
  TrendingUp,
  Award,
  Search,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  Shield,
  BookOpen,
  Target,
  Flame,
  BarChart3,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/hooks/use-auth";

// Types
interface Stats {
  totalStudents: number;
  activeStudents: number;
  completionRate: number;
  avgQuizScore: number;
  totalTopics: number;
  moduleStats: ModuleStat[];
  scoreDistribution: {
    excellent: number;
    good: number;
    average: number;
    below: number;
  };
}

interface ModuleStat {
  id: string;
  number: number;
  title: string;
  topicCount: number;
  completionRate: number;
  quizTakes: number;
  avgQuizScore: number;
}

interface StudentRow {
  id: string;
  name: string;
  email: string;
  image: string | null;
  enrolledAt: string;
  progressPct: number;
  completedTopics: number;
  totalTopics: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  avgScore: number;
  lastActivity: string | null;
  streak: number;
}

type SortField =
  | "name"
  | "email"
  | "enrolledAt"
  | "progressPct"
  | "quizzesCompleted"
  | "avgScore"
  | "lastActivity";

export default function AdminDashboard() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAuth();

  const [stats, setStats] = useState<Stats | null>(null);
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("enrolledAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState<
    "overview" | "students" | "courses"
  >("overview");

  // Fetch stats
  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
      setIsLoadingStats(false);
    }
    if (isAdmin) loadStats();
  }, [isAdmin]);

  // Fetch students
  useEffect(() => {
    async function loadStudents() {
      try {
        const res = await fetch(
          `/api/admin/students?search=${encodeURIComponent(search)}&sort=${sortField}&order=${sortOrder}`
        );
        if (res.ok) {
          const data = await res.json();
          setStudents(data.students);
        }
      } catch (error) {
        console.error("Failed to load students:", error);
      }
      setIsLoadingStudents(false);
    }
    if (isAdmin) loadStudents();
  }, [isAdmin, search, sortField, sortOrder]);

  // Sort handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatRelativeDate = (dateString: string | null) => {
    if (!dateString) return "Nunca";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} sem`;
    return formatDate(dateString);
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Unauthorized
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Acceso no autorizado
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            No tienes permisos para acceder al panel de administración.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            Volver al inicio
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Inicio
            </Button>
          </div>
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
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/20">
              <Shield className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Panel de{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  Administración
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gestiona y monitorea el progreso de tus estudiantes
              </p>
            </div>
          </div>
        </motion.header>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-1 mb-6 p-1 glass-card rounded-xl"
        >
          {[
            { id: "overview", label: "Resumen", icon: BarChart3 },
            { id: "students", label: "Estudiantes", icon: Users },
            { id: "courses", label: "Cursos", icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id as "overview" | "students" | "courses")
              }
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <Users className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Total Estudiantes
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {isLoadingStats ? (
                      <div className="h-9 w-16 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
                    ) : (
                      stats?.totalStudents ?? 0
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20">
                      <Activity className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Activos (7d)
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {isLoadingStats ? (
                      <div className="h-9 w-16 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
                    ) : (
                      stats?.activeStudents ?? 0
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <TrendingUp className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Completado
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {isLoadingStats ? (
                      <div className="h-9 w-16 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
                    ) : (
                      `${stats?.completionRate ?? 0}%`
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20">
                      <Award className="w-5 h-5 text-violet-500 dark:text-violet-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Prom. Eval.
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {isLoadingStats ? (
                      <div className="h-9 w-16 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
                    ) : (
                      `${stats?.avgQuizScore ?? 0}%`
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Score Distribution + Module Drop-off */}
              <div className="grid gap-6 lg:grid-cols-2 mb-8">
                {/* Score Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Distribución de Puntuaciones
                    </h3>
                  </div>
                  {isLoadingStats ? (
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-8 rounded bg-gray-200 dark:bg-white/5 animate-pulse"
                        />
                      ))}
                    </div>
                  ) : stats ? (
                    <div className="space-y-3">
                      {[
                        {
                          label: "Excelente (90-100%)",
                          count: stats.scoreDistribution.excellent,
                          color: "bg-emerald-500",
                          textColor: "text-emerald-500 dark:text-emerald-400",
                        },
                        {
                          label: "Bueno (70-89%)",
                          count: stats.scoreDistribution.good,
                          color: "bg-sky-500",
                          textColor: "text-sky-500 dark:text-sky-400",
                        },
                        {
                          label: "Regular (50-69%)",
                          count: stats.scoreDistribution.average,
                          color: "bg-amber-500",
                          textColor: "text-amber-500 dark:text-amber-400",
                        },
                        {
                          label: "Bajo (&lt;50%)",
                          count: stats.scoreDistribution.below,
                          color: "bg-red-500",
                          textColor: "text-red-500 dark:text-red-400",
                        },
                      ].map((item) => {
                        const total =
                          stats.scoreDistribution.excellent +
                          stats.scoreDistribution.good +
                          stats.scoreDistribution.average +
                          stats.scoreDistribution.below;
                        const pct = total > 0 ? (item.count / total) * 100 : 0;
                        return (
                          <div key={item.label}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {item.label}
                              </span>
                              <span
                                className={`text-xs font-bold ${item.textColor}`}
                              >
                                {item.count} ({Math.round(pct)}%)
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full ${item.color} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{
                                  duration: 0.8,
                                  ease: "easeOut",
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </motion.div>

                {/* Drop-off Points */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Puntos de Abandono
                    </h3>
                  </div>
                  {isLoadingStats ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-10 rounded bg-gray-200 dark:bg-white/5 animate-pulse"
                        />
                      ))}
                    </div>
                  ) : stats ? (
                    <div className="space-y-2">
                      {[...stats.moduleStats]
                        .sort((a, b) => a.completionRate - b.completionRate)
                        .slice(0, 5)
                        .map((mod) => (
                          <div
                            key={mod.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-500 dark:text-gray-400 shrink-0">
                              M{mod.number}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                                  {mod.title}
                                </span>
                                <span className="text-xs font-bold text-amber-500 dark:text-amber-400 ml-2 shrink-0">
                                  {mod.completionRate}%
                                </span>
                              </div>
                              <div className="h-1.5 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{
                                    background:
                                      mod.completionRate < 20
                                        ? "#ef4444"
                                        : mod.completionRate < 40
                                          ? "#f59e0b"
                                          : "#10b981",
                                  }}
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${mod.completionRate}%`,
                                  }}
                                  transition={{
                                    duration: 0.8,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      {stats.moduleStats.length === 0 && (
                        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
                          No hay datos de módulos disponibles
                        </p>
                      )}
                    </div>
                  ) : null}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all"
                  />
                </div>
              </motion.div>

              {/* Students Table */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 z-10">
                      <tr className="bg-gray-100/80 dark:bg-white/5 backdrop-blur-sm border-b border-gray-200 dark:border-white/5">
                        <th className="text-left px-4 py-3">
                          <button
                            onClick={() => handleSort("name")}
                            className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            Nombre
                            {renderSortIcon("name")}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 hidden md:table-cell">
                          <button
                            onClick={() => handleSort("email")}
                            className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            Email
                            {renderSortIcon("email")}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 hidden sm:table-cell">
                          <button
                            onClick={() => handleSort("enrolledAt")}
                            className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            Inscripción
                            {renderSortIcon("enrolledAt")}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3">
                          <button
                            onClick={() => handleSort("progressPct")}
                            className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            Progreso
                            {renderSortIcon("progressPct")}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 hidden lg:table-cell">
                          <button
                            onClick={() => handleSort("quizzesCompleted")}
                            className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            Evaluaciones
                            {renderSortIcon("quizzesCompleted")}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 hidden lg:table-cell">
                          <button
                            onClick={() => handleSort("avgScore")}
                            className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            Promedio
                            {renderSortIcon("avgScore")}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 hidden sm:table-cell">
                          <button
                            onClick={() => handleSort("lastActivity")}
                            className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            Última Actividad
                            {renderSortIcon("lastActivity")}
                          </button>
                        </th>
                        <th className="px-4 py-3 w-10" />
                      </tr>
                    </thead>
                    <tbody>
                      {isLoadingStudents ? (
                        Array.from({ length: 5 }).map((_, i) => (
                          <tr key={i} className="border-b border-gray-100 dark:border-white/5">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/5 animate-pulse" />
                                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
                              </div>
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell">
                              <div className="h-4 w-32 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
                            </td>
                            <td className="px-4 py-3 hidden sm:table-cell">
                              <div className="h-4 w-20 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
                            </td>
                            <td className="px-4 py-3">
                              <div className="h-4 w-16 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
                            </td>
                          </tr>
                        ))
                      ) : students.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-12 text-center">
                            <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              No se encontraron estudiantes
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {search
                                ? "Intenta con otro término de búsqueda"
                                : "Aún no hay estudiantes inscritos"}
                            </p>
                          </td>
                        </tr>
                      ) : (
                        students.map((student, index) => (
                          <motion.tr
                            key={student.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/3 cursor-pointer transition-colors"
                            onClick={() =>
                              router.push(
                                `/admin/estudiante/${student.id}`
                              )
                            }
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                                  <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400">
                                    {student.name?.charAt(0)?.toUpperCase() ||
                                      "?"}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {student.name}
                                  </span>
                                  <span className="block text-xs text-gray-400 dark:text-gray-500 md:hidden">
                                    {student.email}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {student.email}
                              </span>
                            </td>
                            <td className="px-4 py-3 hidden sm:table-cell">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(student.enrolledAt)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2 min-w-[100px]">
                                <div className="flex-1 h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full progress-emerald"
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${student.progressPct}%`,
                                    }}
                                    transition={{
                                      duration: 0.6,
                                      ease: "easeOut",
                                    }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                                  {student.progressPct}%
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 hidden lg:table-cell">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {student.quizzesCompleted}/
                                {student.totalQuizzes}
                              </span>
                            </td>
                            <td className="px-4 py-3 hidden lg:table-cell">
                              <span
                                className={`text-xs font-bold ${
                                  student.avgScore >= 80
                                    ? "text-emerald-500 dark:text-emerald-400"
                                    : student.avgScore >= 50
                                      ? "text-amber-500 dark:text-amber-400"
                                      : "text-red-500 dark:text-red-400"
                                }`}
                              >
                                {student.avgScore}%
                              </span>
                            </td>
                            <td className="px-4 py-3 hidden sm:table-cell">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatRelativeDate(student.lastActivity)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Module completion rates */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl p-6 mb-6"
              >
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Tasa de Completado por Módulo
                  </h3>
                </div>
                {isLoadingStats ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-12 rounded bg-gray-200 dark:bg-white/5 animate-pulse"
                      />
                    ))}
                  </div>
                ) : stats ? (
                  <div className="space-y-4">
                    {stats.moduleStats.map((mod, index) => (
                      <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                        }}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-500 dark:text-emerald-400 shrink-0">
                            M{mod.number}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {mod.title}
                              </span>
                              <div className="flex items-center gap-3 ml-2 shrink-0">
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                  {mod.quizTakes} eval.
                                </span>
                                {mod.avgQuizScore > 0 && (
                                  <span
                                    className={`text-xs font-bold ${
                                      mod.avgQuizScore >= 80
                                        ? "text-emerald-500"
                                        : mod.avgQuizScore >= 50
                                          ? "text-amber-500"
                                          : "text-red-500"
                                    }`}
                                  >
                                    {mod.avgQuizScore}% avg
                                  </span>
                                )}
                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                  {mod.completionRate}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-11 h-3 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full progress-emerald"
                            initial={{ width: 0 }}
                            animate={{ width: `${mod.completionRate}%` }}
                            transition={{
                              duration: 0.8,
                              ease: "easeOut",
                              delay: index * 0.05,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Render Academy
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Panel de Administración — Datos en tiempo real
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
