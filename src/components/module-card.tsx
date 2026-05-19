"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Bookmark,
  CheckCircle2,
  ClipboardCheck,
  Trophy,
  ChevronRight,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import { Module, TopicInfo } from "@/lib/curriculum";
import { useCourse, useCourseSlug } from "@/hooks/use-course-context";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";

interface ModuleCardProps {
  module: Module;
  index: number;
  onEvaluar: (module: Module) => void;
}

// ─── Mini Progress Ring for Module ────────────────────────

function ModuleProgressRing({
  progress,
  size = 44,
  strokeWidth = 3,
  color,
  moduleNumber,
  isComplete,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  moduleNumber: number;
  isComplete: boolean;
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
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-white/8"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <CheckCircle2 className="w-5 h-5" style={{ color }} />
            </motion.div>
          ) : (
            <motion.span
              key="number"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs font-bold text-gray-400 dark:text-gray-500"
            >
              {moduleNumber}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Celebration Confetti Effect ──────────────────────────

function CelebrationEffect({ color }: { color: string }) {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 30) * (Math.PI / 180),
    distance: 30 + Math.random() * 20,
    size: 3 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: color,
            top: "50%",
            left: "50%",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ─── Main Module Card ─────────────────────────────────────

export function ModuleCard({ module, index, onEvaluar }: ModuleCardProps) {
  const router = useRouter();
  const course = useCourse();
  const courseSlug = useCourseSlug();
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;

  const completedTopics = course.getModuleCompletedCount(module.id);
  const totalTopics = module.topics.length;
  const progress = course.getModuleProgress(module.id);
  const isTopicCompleted = course.isTopicCompleted;
  const isBookmarked = course.isBookmarked;
  const quizResult = course.quizResults[module.id];

  const isComplete = progress === 100;
  const hasQuiz = !!quizResult;
  const quizScore = quizResult
    ? Math.round((quizResult.score / quizResult.total) * 100)
    : 0;

  const [justCompleted, setJustCompleted] = useState(false);

  const handleToggleProgress = async (moduleId: string, topicIndex: number) => {
    const wasComplete = isTopicCompleted(moduleId, topicIndex);
    await course.toggleProgress(moduleId, topicIndex);

    // Check if this completion just finished the module
    if (!wasComplete) {
      const newCompletedCount = course.getModuleCompletedCount(moduleId);
      const mod = module;
      if (newCompletedCount === mod.topics.length && completedTopics < mod.topics.length) {
        setJustCompleted(true);
        setTimeout(() => setJustCompleted(false), 1500);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <AccordionItem
        value={module.id}
        className="glass-card glass-card-hover rounded-xl border-0 mb-3 overflow-hidden transition-all duration-300"
      >
        {/* Module banner with richer visual elements */}
        <div className={`relative w-full h-20 overflow-hidden bg-gradient-to-br ${tw.gradient}`}>
          {/* Animated decorative elements */}
          <div className="absolute inset-0 opacity-25">
            <motion.div
              className="absolute top-3 left-6 w-14 h-14 rounded-full border-2 border-white/30"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-2 right-10 w-10 h-10 rounded-full border border-white/20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <div className="absolute top-2 right-1/3 w-6 h-6 rounded-full bg-white/10" />
          </div>

          {/* Module number overlay — larger and more dramatic */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black text-white/15 select-none">
              {String(module.number).padStart(2, '0')}
            </span>
          </div>

          {/* Completion sparkle overlay */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-white/5"
              >
                <Sparkles className="absolute top-2 right-3 w-4 h-4 text-white/40" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/60 to-gray-50/30 dark:from-zinc-950 dark:via-zinc-950/60 dark:to-zinc-950/30" />
          {/* Category-colored bottom accent */}
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${tw.gradient}`} />

          {/* Celebration effect */}
          <AnimatePresence>
            {justCompleted && <CelebrationEffect color={theme.primaryColor} />}
          </AnimatePresence>
        </div>

        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-transparent -mt-6 relative z-10">
          <div className="flex items-center gap-4 flex-1 text-left">
            {/* Module progress ring — replaces plain number */}
            <div className="shrink-0">
              <ModuleProgressRing
                progress={progress}
                color={theme.primaryColor}
                moduleNumber={module.number}
                isComplete={isComplete}
              />
            </div>

            {/* Module info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  Módulo {module.number}: {module.title}
                </h3>
                {isComplete && (
                  <Badge className={`${tw.badge} ${tw.badgeDark} text-[10px] px-1.5 border`}>
                    Completo
                  </Badge>
                )}
                {hasQuiz && (
                  <Badge
                    className={`text-[10px] px-1.5 border ${
                      quizScore >= 80
                        ? `${tw.badge} ${tw.badgeDark}`
                        : quizScore >= 60
                          ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          : "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20"
                    }`}
                  >
                    <Trophy className="w-2.5 h-2.5 mr-0.5" />
                    {quizScore}%
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                {/* Enhanced progress bar — thicker and animated */}
                <div className="flex-1 max-w-56">
                  <div className="h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${tw.progress}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <span className={`text-[11px] flex items-center gap-1 ${
                  progress === 100
                    ? `${tw.text} ${tw.textDark} font-medium`
                    : "text-gray-400 dark:text-gray-500"
                } shrink-0`}>
                  <span>{completedTopics}/{totalTopics}</span>
                  <span className="hidden sm:inline">temas</span>
                </span>
              </div>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-5 pb-4">
          <div className="space-y-4">
            {/* Topics list */}
            <div className="space-y-0.5">
              {module.topics.map((topic, topicIndex) => {
                const key = `${module.id}-${topicIndex}`;
                const checked = isTopicCompleted(module.id, topicIndex);
                const diffColors = {
                  basico: `${tw.badge} ${tw.badgeDark}`,
                  intermedio: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20',
                  avanzado: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20',
                };
                const diffLabels = {
                  basico: 'Básico',
                  intermedio: 'Intermedio',
                  avanzado: 'Avanzado',
                };
                const diffIcons = {
                  basico: <Zap className="w-2 h-2" />,
                  intermedio: <Zap className="w-2 h-2" />,
                  avanzado: <Zap className="w-2 h-2" />,
                };
                return (
                  <motion.div
                    key={key}
                    initial={false}
                    whileHover={{ x: 3, backgroundColor: checked ? "transparent" : undefined }}
                    className={`flex items-center gap-3 py-2 px-2 rounded-lg transition-colors group ${
                      checked
                        ? "hover:bg-transparent"
                        : "hover:bg-gray-100 dark:hover:bg-white/3"
                    }`}
                  >
                    <div className="relative">
                      <Checkbox
                        id={key}
                        checked={checked}
                        onCheckedChange={() =>
                          handleToggleProgress(module.id, topicIndex)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="border-gray-300 dark:border-white/20"
                        style={checked ? {
                          backgroundColor: theme.primaryColor,
                          borderColor: theme.primaryColor,
                        } : undefined}
                      />
                      {/* Pulse animation on check */}
                      <AnimatePresence>
                        {checked && (
                          <motion.div
                            className="absolute inset-0 rounded-sm"
                            style={{ borderColor: theme.primaryColor }}
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    <button
                      onClick={() =>
                        router.push(`/modulo/${module.id}/tema/${topicIndex}?course=${courseSlug}`)
                      }
                      className={`flex-1 flex items-center gap-1 text-left cursor-pointer transition-colors ${
                        checked
                          ? "text-gray-400 dark:text-gray-500 line-through"
                          : "text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`}
                    >
                      <span className="text-gray-400 dark:text-gray-500 mr-1.5 text-xs">
                        {topicIndex + 1}.
                      </span>
                      <span className="flex-1 text-sm">{topic.name}</span>
                      <Badge className={`text-[9px] px-1.5 py-0 ${diffColors[topic.difficulty]} shrink-0 border flex items-center gap-0.5`}>
                        {diffIcons[topic.difficulty]}
                        {diffLabels[topic.difficulty]}
                      </Badge>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 shrink-0 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {topic.estimatedTime}
                      </span>
                      {isBookmarked(module.id, topicIndex) && (
                        <Bookmark className={`w-3 h-3 ${tw.text} ${tw.textDark} shrink-0`} style={{ fill: theme.primaryColor }} />
                      )}
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors shrink-0" />
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Evaluar button — more prominent */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-white/5">
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {progress < 100
                  ? "Completa todos los temas para dominar el módulo"
                  : "¡Todos los temas completados!"}
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="sm"
                  onClick={() => onEvaluar(module)}
                  className={`${tw.button} text-white gap-1.5 shadow-sm`}
                >
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  {hasQuiz ? "Revaluar" : "Evaluar"}
                </Button>
              </motion.div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}
