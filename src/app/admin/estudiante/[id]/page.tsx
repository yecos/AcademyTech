"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  BookOpen,
  Award,
  Flame,
  Target,
  Shield,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Bookmark,
  FileText,
  Sparkles,
  Clock,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/hooks/use-auth";
import { getAchievementById } from "@/lib/achievements";

// Types
interface ModuleProgress {
  id: string;
  number: number;
  title: string;
  topicCount: number;
  completedTopics: number;
  progressPct: number;
  topics: TopicProgress[];
  quiz: {
    score: number;
    totalQuestions: number;
    pct: number;
    answers: Record<string, string>;
    completedAt: string;
  } | null;
}

interface TopicProgress {
  id: string;
  name: string;
  number: number;
  difficulty: string;
  estimatedTime: string;
  completed: boolean;
  completedAt: string | null;
  hasNote: boolean;
  noteContent: string | null;
  noteUpdatedAt: string | null;
  isBookmarked: boolean;
}

interface StudentDetail {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  enrolledAt: string;
  progressPct: number;
  completedTopics: number;
  totalTopics: number;
  avgScore: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  lastActivity: string | null;
  streak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  moduleProgress: ModuleProgress[];
  achievements: { id: string; unlockedAt: string }[];
  enrollments: {
    courseId: string;
    courseTitle: string;
    enrolledAt: string;
  }[];
}

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;
  const { isAdmin, isLoading: authLoading } = useAuth();

  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );
  const [showNotes, setShowNotes] = useState<string | null>(null);

  useEffect(() => {
    async function loadStudent() {
      try {
        const res = await fetch(`/api/admin/students/${studentId}`);
        if (res.ok) {
          const data = await res.json();
          setStudent(data);
        } else if (res.status === 404) {
          setStudent(null);
        }
      } catch (error) {
        console.error("Failed to load student:", error);
      }
      setIsLoading(false);
    }
    if (isAdmin && studentId) loadStudent();
  }, [isAdmin, studentId]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatShortDate = (dateString: string | null) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "basico":
        return "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "intermedio":
        return "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "avanzado":
        return "text-red-500 dark:text-red-400 bg-red-500/10 border-red-500/20";
      default:
        return "text-gray-500 bg-gray-100 border-gray-200";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "basico":
        return "Básico";
      case "intermedio":
        return "Intermedio";
      case "avanzado":
        return "Avanzado";
      default:
        return difficulty;
    }
  };

  // Loading state
  if (authLoading || isLoading) {
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
            No tienes permisos para ver esta información.
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

  // Student not found
  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <User className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Estudiante no encontrado
          </h1>
          <Button
            onClick={() => router.push("/admin")}
            className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            Volver al panel
          </Button>
        </div>
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

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/admin")}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Panel de Admin
          </Button>
          <div className="flex items-center gap-2">
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>

        {/* Student Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="shrink-0">
                {student.image ? (
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/20"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-500 dark:text-emerald-400">
                      {student.name?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {student.name}
                </h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                    <Mail className="w-3.5 h-3.5" />
                    {student.email}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge className="text-[10px] px-2 py-0.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                    Estudiante
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                    <Calendar className="w-3 h-3" />
                    Inscrito: {formatDate(student.enrolledAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="inline-flex p-2 rounded-lg bg-emerald-500/10 mb-2">
              <BookOpen className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {student.completedTopics}/{student.totalTopics}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Temas Completados
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="inline-flex p-2 rounded-lg bg-sky-500/10 mb-2">
              <Target className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {student.quizzesCompleted}/{student.totalQuizzes}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Evaluaciones
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="inline-flex p-2 rounded-lg bg-amber-500/10 mb-2">
              <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {student.avgScore}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Promedio
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="inline-flex p-2 rounded-lg bg-orange-500/10 mb-2">
              <Flame className="w-4 h-4 text-orange-500 dark:text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {student.streak} 🔥
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Racha ({student.longestStreak} máx)
            </div>
          </div>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Progreso General
              </h3>
            </div>
            <span className="text-sm font-bold text-emerald-500 dark:text-emerald-400">
              {student.progressPct}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${student.progressPct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span>
              Última actividad:{" "}
              {student.lastActivity
                ? formatShortDate(student.lastActivity)
                : "Nunca"}
            </span>
            <span>•</span>
            <span>
              {student.completedTopics} de {student.totalTopics} temas
            </span>
          </div>
        </motion.div>

        {/* Module Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Progreso por Módulo
            </h3>
          </div>

          <div className="space-y-2">
            {student.moduleProgress.map((mod) => (
              <div key={mod.id}>
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left"
                >
                  <div className="shrink-0">
                    {expandedModules.has(mod.id) ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-500 dark:text-emerald-400 shrink-0">
                    M{mod.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {mod.title}
                      </span>
                      <div className="flex items-center gap-2 ml-2 shrink-0">
                        {mod.quiz && (
                          <Badge
                            className={`text-[9px] px-1.5 py-0 ${
                              mod.quiz.pct >= 80
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                : mod.quiz.pct >= 50
                                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20"
                                  : "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20"
                            }`}
                          >
                            {mod.quiz.pct}%
                          </Badge>
                        )}
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {mod.completedTopics}/{mod.topicCount}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full progress-emerald"
                        initial={{ width: 0 }}
                        animate={{ width: `${mod.progressPct}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </button>

                {/* Expanded Topics */}
                <AnimatePresence>
                  {expandedModules.has(mod.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-15 overflow-hidden"
                    >
                      <div className="pl-15 pr-2 py-1 space-y-1">
                        {mod.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
                          >
                            {/* Status icon */}
                            {topic.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0" />
                            )}
                            {/* Topic name */}
                            <span
                              className={`text-xs flex-1 min-w-0 truncate ${
                                topic.completed
                                  ? "text-gray-700 dark:text-gray-300"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                            >
                              {topic.number}. {topic.name}
                            </span>
                            {/* Badges */}
                            <div className="flex items-center gap-1 shrink-0">
                              <Badge
                                className={`text-[8px] px-1 py-0 ${getDifficultyColor(topic.difficulty)}`}
                              >
                                {getDifficultyLabel(topic.difficulty)}
                              </Badge>
                              {topic.isBookmarked && (
                                <Bookmark className="w-3 h-3 text-amber-500" />
                              )}
                              {topic.hasNote && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowNotes(
                                      showNotes === topic.id
                                        ? null
                                        : topic.id
                                    );
                                  }}
                                  className="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-white/5"
                                >
                                  <FileText className="w-3 h-3 text-sky-500" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Quiz Result */}
                        {mod.quiz && (
                          <div className="mt-2 p-3 rounded-lg bg-sky-500/5 border border-sky-500/10">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-3.5 h-3.5 text-sky-500" />
                              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                Evaluación del Módulo
                              </span>
                              <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
                                {formatShortDate(mod.quiz.completedAt)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    mod.quiz.pct >= 80
                                      ? "bg-emerald-500"
                                      : mod.quiz.pct >= 50
                                        ? "bg-amber-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{
                                    width: `${mod.quiz.pct}%`,
                                  }}
                                />
                              </div>
                              <span
                                className={`text-xs font-bold ${
                                  mod.quiz.pct >= 80
                                    ? "text-emerald-500"
                                    : mod.quiz.pct >= 50
                                      ? "text-amber-500"
                                      : "text-red-500"
                                }`}
                              >
                                {mod.quiz.score}/{mod.quiz.totalQuestions}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Note Preview */}
                      <AnimatePresence>
                        {showNotes &&
                          mod.topics.find(
                            (t) => t.id === showNotes && t.hasNote
                          ) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="px-17 pb-2"
                            >
                              <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                                <div className="flex items-center gap-2 mb-1">
                                  <FileText className="w-3 h-3 text-amber-500" />
                                  <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-400">
                                    Nota del estudiante
                                  </span>
                                </div>
                                <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                  {mod.topics.find(
                                    (t) => t.id === showNotes
                                  )?.noteContent || "Sin contenido"}
                                </p>
                              </div>
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Logros Desbloqueados
            </h3>
            <Badge className="text-[9px] px-1.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
              {student.achievements.length}
            </Badge>
          </div>
          {student.achievements.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
              Aún no ha desbloqueado ningún logro
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {student.achievements.map((achievement) => {
                const info = getAchievementById(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-white/5"
                  >
                    <span className="text-lg shrink-0">
                      {info?.icon || "🏆"}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                        {info?.title || achievement.id}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">
                        {formatShortDate(achievement.unlockedAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Bookmarked Topics */}
        {student.moduleProgress.some((mod) =>
          mod.topics.some((t) => t.isBookmarked)
        ) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass-card rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Bookmark className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Temas Marcados
              </h3>
            </div>
            <div className="space-y-1">
              {student.moduleProgress.map((mod) =>
                mod.topics
                  .filter((t) => t.isBookmarked)
                  .map((topic) => (
                    <div
                      key={topic.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/5 border border-amber-500/10"
                    >
                      <Bookmark className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        M{mod.number} — {topic.name}
                      </span>
                      {topic.completed && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto" />
                      )}
                    </div>
                  ))
              )}
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Academy Tech
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Detalle del Estudiante — Panel de Administración
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
