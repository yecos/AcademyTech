"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Trophy,
  Flame,
  Lock,
  CheckCircle2,
  Calendar,
  Award,
  Zap,
} from "lucide-react";
import { useStudyStore } from "@/lib/store";
import { achievements, achievementCategories, getAchievementById } from "@/lib/achievements";
import { useAchievementChecker } from "@/hooks/use-achievement-checker";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";

export default function LogrosPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  useAchievementChecker();

  const unlockedAchievements = useStudyStore((s) => s.unlockedAchievements);
  const currentStreak = useStudyStore((s) => s.currentStreak);
  const longestStreak = useStudyStore((s) => s.longestStreak);
  const getTotalAchievements = useStudyStore((s) => s.getTotalAchievements);
  const getUnlockedCount = useStudyStore((s) => s.getUnlockedCount);

  const totalAchievements = getTotalAchievements();
  const unlockedCount = getUnlockedCount();
  const progressPercent = totalAchievements > 0 ? Math.round((unlockedCount / totalAchievements) * 100) : 0;

  const filteredAchievements =
    activeCategory === "todos"
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

  const categoryLabels: Record<string, string> = {
    progreso: "Progreso",
    evaluacion: "Evaluación",
    streak: "Racha",
    especial: "Especial",
  };

  const categoryColors: Record<string, string> = {
    progreso: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    evaluacion: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/20",
    streak: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
    especial: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20",
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
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

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
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
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/20">
              <Trophy className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Mis{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  Logros
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Desbloquea logros mientras avanzas en tu aprendizaje
              </p>
            </div>
          </div>
        </motion.header>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-2xl p-6 mb-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/15">
                <Award className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Progreso de Logros
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {unlockedCount} de {totalAchievements} logros desbloqueados
                </p>
              </div>
            </div>
            <div className="text-3xl font-bold text-emerald-500 dark:text-emerald-400">
              {progressPercent}%
            </div>
          </div>
          <div className="relative">
            <Progress
              value={progressPercent}
              className="h-3 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden"
            />
            <motion.div
              className="absolute top-0 left-0 h-3 rounded-full progress-emerald"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card rounded-xl p-4 text-center"
          >
            <div className="inline-flex p-2 rounded-lg bg-amber-500/10 mb-2">
              <Flame className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentStreak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Racha Actual</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="glass-card rounded-xl p-4 text-center"
          >
            <div className="inline-flex p-2 rounded-lg bg-emerald-500/10 mb-2">
              <Zap className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{longestStreak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Mejor Racha</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-card rounded-xl p-4 text-center"
          >
            <div className="inline-flex p-2 rounded-lg bg-violet-500/10 mb-2">
              <Trophy className="w-4 h-4 text-violet-500 dark:text-violet-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{unlockedCount}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Logros</div>
          </motion.div>
        </div>

        {/* Streak section */}
        {currentStreak > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="glass-card rounded-xl p-5 mb-8 flex items-center gap-4 border border-amber-500/20"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/15 shrink-0">
              <Flame className="w-7 h-7 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                🔥 ¡Racha de {currentStreak} día{currentStreak !== 1 ? "s" : ""}!
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sigue estudiando cada día para mantener tu racha activa. ¡Tu mejor racha fue de {longestStreak} días!
              </p>
            </div>
          </motion.div>
        )}

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {achievementCategories.map((cat) => {
            const count =
              cat.id === "todos"
                ? unlockedCount
                : achievements.filter(
                    (a) => a.category === cat.id && unlockedAchievements[a.id]
                  ).length;
            const total =
              cat.id === "todos"
                ? totalAchievements
                : achievements.filter((a) => a.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-gray-100 dark:bg-white/3 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/5 hover:bg-gray-200 dark:hover:bg-white/6 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <span className="text-xs">{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-70">
                  {count}/{total}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((achievement, index) => {
              const isUnlocked = !!unlockedAchievements[achievement.id];
              const unlockedAt = unlockedAchievements[achievement.id];

              return (
                <motion.div
                  key={achievement.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`glass-card rounded-xl p-5 transition-all duration-300 ${
                    isUnlocked
                      ? "border border-emerald-500/30 hover:border-emerald-500/50"
                      : "border border-gray-200 dark:border-white/5 opacity-60 hover:opacity-80"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl text-2xl shrink-0 ${
                        isUnlocked
                          ? "bg-emerald-500/15"
                          : "bg-gray-100 dark:bg-white/5 grayscale"
                      }`}
                    >
                      {isUnlocked ? (
                        achievement.icon
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`text-sm font-semibold ${
                            isUnlocked ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {achievement.title}
                        </h3>
                        {isUnlocked && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          isUnlocked ? "text-gray-500 dark:text-gray-400" : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          className={`text-[9px] px-1.5 py-0 ${
                            categoryColors[achievement.category]
                          }`}
                        >
                          {categoryLabels[achievement.category]}
                        </Badge>
                        {isUnlocked && unlockedAt && (
                          <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5" />
                            {formatDate(unlockedAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Logros de la Academia D5 Render —{" "}
              <span className="text-emerald-500/70 dark:text-emerald-400/70">
                {unlockedCount}/{totalAchievements} desbloqueados
              </span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
