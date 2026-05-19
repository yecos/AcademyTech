"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Trophy,
  TrendingUp,
  Target,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useCourse } from "@/hooks/use-course-context";
import { useCurriculum } from "@/hooks/use-curriculum";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";
import { useRouter } from "next/navigation";
import { useCourseSlug } from "@/hooks/use-course-context";

// ─── Animated Counter ─────────────────────────────────────

function AnimatedCounter({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startVal = 0;
    const endVal = value;

    function update() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startVal + (endVal - startVal) * eased));
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [value, duration]);

  return <>{display}</>;
}

// ─── Circular Progress Ring ───────────────────────────────

function CircularProgressRing({
  progress,
  size = 140,
  strokeWidth = 8,
  color,
  gradientId,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  gradientId: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-white/5"
        />
        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Glow effect on progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth + 4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          opacity={0.15}
          filter="blur(4px)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold"
          style={{ color }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
        >
          <AnimatedCounter value={progress} />
        </motion.span>
        <span className="text-xs text-gray-400 dark:text-gray-500 -mt-0.5">%</span>
      </div>
    </div>
  );
}

// ─── Milestone Marker ─────────────────────────────────────

function MilestoneMarker({
  progress,
  threshold,
  label,
  color,
}: {
  progress: number;
  threshold: number;
  label: string;
  color: string;
}) {
  const reached = progress >= threshold;
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2"
        style={{
          borderColor: reached ? color : "rgba(156, 163, 175, 0.3)",
          backgroundColor: reached ? color : "transparent",
          color: reached ? "white" : "rgba(156, 163, 175, 0.5)",
        }}
        animate={reached ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        {reached ? "✓" : `${threshold}`}
      </motion.div>
      <span className={`text-[9px] ${reached ? "font-medium" : "text-gray-400 dark:text-gray-500"}`}
        style={reached ? { color } : undefined}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Next Topic Suggestion ────────────────────────────────

function NextTopicSuggestion() {
  const course = useCourse();
  const { modules } = useCurriculum();
  const courseSlug = useCourseSlug();
  const { theme } = useCategoryTheme();
  const router = useRouter();
  const tw = theme.tailwind;

  // Find the first incomplete topic
  let nextModule: { id: string; title: string; number: number } | null = null;
  let nextTopicIndex: number | null = null;

  for (const mod of modules) {
    for (let i = 0; i < mod.topics.length; i++) {
      if (!course.isTopicCompleted(mod.id, i)) {
        nextModule = { id: mod.id, title: mod.title, number: mod.number };
        nextTopicIndex = i;
        break;
      }
    }
    if (nextModule) break;
  }

  if (!nextModule || nextTopicIndex === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card rounded-xl p-4 border-dashed"
      style={{ borderColor: `${theme.primaryColor}30` }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${tw.iconBg} ${tw.iconBgDark} shrink-0`}>
          <Sparkles className={`w-4 h-4 ${tw.text} ${tw.textDark}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 dark:text-gray-400">Continúa aprendiendo</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            M{nextModule.number} · {modules.find(m => m.id === nextModule!.id)?.topics[nextTopicIndex!]?.name}
          </p>
        </div>
        <motion.button
          onClick={() => router.push(`/modulo/${nextModule.id}/tema/${nextTopicIndex}?course=${courseSlug}`)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white ${tw.button} shrink-0`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Ir
          <ArrowRight className="w-3 h-3" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────

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
      value: completedTopics,
      maxValue: totalTopics,
      displayValue: `${completedTopics}/${totalTopics}`,
      color: `${tw.text} ${tw.textDark}`,
      bgColor: tw.bg,
      rawColor: theme.primaryColor,
    },
    {
      icon: Trophy,
      label: "Módulos Completados",
      value: modulesCompleted,
      maxValue: modules.length,
      displayValue: `${modulesCompleted}/${modules.length}`,
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
      rawColor: "#f59e0b",
    },
    {
      icon: Target,
      label: "Evaluaciones Hechas",
      value: quizzesCompleted,
      maxValue: modules.length,
      displayValue: `${quizzesCompleted}/${modules.length}`,
      color: "text-sky-500 dark:text-sky-400",
      bgColor: "bg-sky-500/10",
      rawColor: "#0ea5e9",
    },
    {
      icon: TrendingUp,
      label: "Promedio Evaluaciones",
      value: avgQuizScore,
      maxValue: 100,
      displayValue: quizzesCompleted > 0 ? `${avgQuizScore}%` : "—",
      color: "text-violet-500 dark:text-violet-400",
      bgColor: "bg-violet-500/10",
      rawColor: "#8b5cf6",
    },
  ];

  const milestones = [
    { threshold: 25, label: "Inicio" },
    { threshold: 50, label: "Mitad" },
    { threshold: 75, label: "Avanzado" },
    { threshold: 100, label: "Completo" },
  ];

  return (
    <div className="space-y-5">
      {/* Overall Progress — Circular Ring + Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Circular progress */}
          <div className="shrink-0">
            <CircularProgressRing
              progress={overallProgress}
              color={theme.primaryColor}
              gradientId={`progress-ring-${theme.slug}`}
            />
          </div>

          {/* Right side — title + milestones + next topic */}
          <div className="flex-1 space-y-4 w-full">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className={`p-1.5 rounded-lg ${tw.iconBg} ${tw.iconBgDark}`}>
                  <CheckCircle2 className={`w-4 h-4 ${tw.text} ${tw.textDark}`} />
                </div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  Progreso General
                </h2>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 ml-8">
                {overallProgress === 100
                  ? "¡Felicidades! Has completado el curso"
                  : overallProgress >= 75
                    ? "¡Ya casi terminas! Sigue así"
                    : overallProgress >= 50
                      ? "Vas por la mitad, ¡excelente ritmo!"
                      : overallProgress >= 25
                        ? "Buen comienzo, continúa avanzando"
                        : "Avanza por los módulos para completar el curso"}
              </p>
            </div>

            {/* Milestone markers */}
            <div className="flex items-center justify-between px-2">
              {milestones.map((m) => (
                <MilestoneMarker
                  key={m.threshold}
                  progress={overallProgress}
                  threshold={m.threshold}
                  label={m.label}
                  color={theme.primaryColor}
                />
              ))}
            </div>

            {/* Next topic suggestion */}
            <NextTopicSuggestion />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid — Mini progress rings */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="glass-card rounded-xl p-4 text-center group hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="flex items-center justify-center mb-2">
              <div className="relative" style={{ width: 48, height: 48 }}>
                <svg width="48" height="48" viewBox="0 0 48 48" className="transform -rotate-90">
                  <circle
                    cx="24" cy="24" r="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-gray-200 dark:text-white/5"
                  />
                  <motion.circle
                    cx="24" cy="24" r="18"
                    fill="none"
                    stroke={stat.rawColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 18}
                    initial={{ strokeDashoffset: 2 * Math.PI * 18 }}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 18 * (1 - (stat.maxValue > 0 ? stat.value / stat.maxValue : 0)),
                    }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 * index }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {stat.displayValue}
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
