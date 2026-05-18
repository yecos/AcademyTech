"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Trophy,
  TrendingUp,
  Target,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useCourse } from "@/hooks/use-course-context";
import { useCurriculum } from "@/hooks/use-curriculum";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";

export function ProgressOverview() {
  const course = useCourse();
  const { modules } = useCurriculum();
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;

  const overallProgress = course.getOverallProgress();
  const completedTopics = course.getTotalCompletedTopics();
  const totalTopics = modules.reduce((sum, m) => sum + m.topics.length, 0);
  const avgQuizScore = course.getAverageQuizScore();
  const quizzesCompleted = Object.keys(course.quizResults).length;
  const modulesCompleted = modules.filter(
    (m) => course.getModuleProgress(m.id) === 100
  ).length;

  const stats = [
    {
      icon: BookOpen,
      label: "Temas Completados",
      value: `${completedTopics}/${totalTopics}`,
      color: `${tw.text} ${tw.textDark}`,
      bgColor: tw.bg,
    },
    {
      icon: Trophy,
      label: "Módulos Completados",
      value: `${modulesCompleted}/${modules.length}`,
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: Target,
      label: "Evaluaciones Hechas",
      value: `${quizzesCompleted}/${modules.length}`,
      color: "text-sky-500 dark:text-sky-400",
      bgColor: "bg-sky-500/10",
    },
    {
      icon: TrendingUp,
      label: "Promedio Evaluaciones",
      value: quizzesCompleted > 0 ? `${avgQuizScore}%` : "—",
      color: "text-violet-500 dark:text-violet-400",
      bgColor: "bg-violet-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${tw.iconBg} ${tw.iconBgDark}`}>
              <CheckCircle2 className={`w-5 h-5 ${tw.text} ${tw.textDark}`} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Progreso General del Curso
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Avanza por todos los módulos para completar el curso
              </p>
            </div>
          </div>
          <div className={`text-3xl font-bold ${tw.text} ${tw.textDark}`}>
            {overallProgress}%
          </div>
        </div>
        <div className="relative">
          <Progress
            value={overallProgress}
            className="h-3 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden"
          />
          <motion.div
            className="absolute top-0 left-0 h-3 rounded-full progress-category"
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="glass-card rounded-xl p-4 text-center"
          >
            <div
              className={`inline-flex p-2 rounded-lg ${stat.bgColor} mb-2`}
            >
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
