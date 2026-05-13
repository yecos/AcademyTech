"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  Edit3,
  LogOut,
  Check,
  X,
  Shield,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { useCourse } from "@/hooks/use-course-context";

export default function PerfilPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, isGuest, logout } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);

  // Sync editName when user data becomes available
  const userName = user?.name || "";
  if (!isEditingName && userName && editName !== userName) {
    setEditName(userName);
  }

  // Study stats from course data hook
  const course = useCourse();
  const overallProgress = course.getOverallProgress();
  const currentStreak = course.streak.current;
  const longestStreak = course.streak.longest;
  const completedTopics = course.getTotalCompletedTopics();
  const avgScore = course.getAverageQuizScore();
  const quizzesTaken = Object.keys(course.quizResults).length;

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
        // Force session refresh
        window.location.reload();
      }
    } catch {
      // Silently fail
    } finally {
      setIsSaving(false);
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

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "No disponible";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-600/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
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
                  Perfil
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gestiona tu cuenta y revisa tu progreso
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
              {completedTopics}
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
              {quizzesTaken}
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
              {avgScore}%
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
              {currentStreak}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Racha Actual
            </div>
          </div>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Progreso General
              </h3>
            </div>
            <span className="text-sm font-bold text-emerald-500 dark:text-emerald-400">
              {overallProgress}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span>Mejor racha: {longestStreak} días</span>
            <span>•</span>
            <span>{completedTopics} temas de 60 completados</span>
          </div>
        </motion.div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            Información de la Cuenta
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span className="text-sm text-gray-500 dark:text-gray-400">ID de usuario</span>
              <span className="text-xs font-mono text-gray-700 dark:text-gray-300 max-w-[200px] truncate">
                {user.id}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span className="text-sm text-gray-500 dark:text-gray-400">Rol</span>
              <Badge
                className={`text-[10px] ${
                  user.role === "teacher"
                    ? "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20"
                    : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                }`}
              >
                {user.role === "teacher" ? "Profesor" : "Estudiante"}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span className="text-sm text-gray-500 dark:text-gray-400">Tipo de cuenta</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {isGuest ? "Invitado" : "Google"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
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
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Perfil de la Academia D5 Render —{" "}
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
