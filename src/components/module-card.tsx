"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Bookmark,
  CheckCircle2,
  ClipboardCheck,
  Trophy,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Module, TopicInfo } from "@/lib/curriculum";
import { useCourse, useCourseSlug } from "@/hooks/use-course-context";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";

interface ModuleCardProps {
  module: Module;
  index: number;
  onEvaluar: (module: Module) => void;
}

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
        {/* Module banner with category gradient */}
        <div className={`relative w-full h-24 overflow-hidden bg-gradient-to-br ${tw.gradient}`}>
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-4 w-16 h-16 rounded-full border-2 border-white/30" />
            <div className="absolute bottom-2 right-8 w-12 h-12 rounded-full border border-white/20" />
            <div className="absolute top-1 right-1/3 w-8 h-8 rounded-full bg-white/10" />
          </div>
          {/* Module number overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-black text-white/20">{String(module.number).padStart(2, '0')}</span>
          </div>
          {/* Bottom gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/60 to-gray-50/30 dark:from-zinc-950 dark:via-zinc-950/60 dark:to-zinc-950/30" />
          {/* Category-colored bottom border */}
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${tw.gradient}`} />
        </div>

        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-transparent -mt-6 relative z-10">
          <div className="flex items-center gap-4 flex-1 text-left">
            {/* Module number */}
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold shrink-0 ${
                isComplete
                  ? `${tw.iconBg} ${tw.iconBgDark} ${tw.text} ${tw.textDark}`
                  : "bg-gray-100 dark:bg-white/5 text-gray-400"
              }`}
            >
              {isComplete ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                module.number
              )}
            </div>

            {/* Module info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
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
                <div className="flex-1 max-w-48">
                  <Progress
                    value={progress}
                    className="h-1.5 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden"
                  />
                </div>
                <span className={`text-[11px] ${progress === 100 ? `${tw.text} ${tw.textDark} font-medium` : "text-gray-400 dark:text-gray-500"} shrink-0`}>
                  {completedTopics}/{totalTopics} temas
                </span>
              </div>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-5 pb-4">
          <div className="space-y-4">
            {/* Topics list */}
            <div className="space-y-1">
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
                return (
                  <motion.div
                    key={key}
                    initial={false}
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/3 transition-colors group"
                  >
                    <Checkbox
                      id={key}
                      checked={checked}
                      onCheckedChange={() =>
                        course.toggleProgress(module.id, topicIndex)
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="border-gray-300 dark:border-white/20"
                      style={checked ? {
                        backgroundColor: theme.primaryColor,
                        borderColor: theme.primaryColor,
                      } : undefined}
                    />
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
                      <Badge className={`text-[9px] px-1.5 py-0 ${diffColors[topic.difficulty]} shrink-0 border`}>
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

            {/* Evaluar button */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-white/5">
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {progress < 100
                  ? "Completa todos los temas para dominar el módulo"
                  : "¡Todos los temas completados!"}
              </div>
              <Button
                size="sm"
                onClick={() => onEvaluar(module)}
                className={`${tw.button} text-white gap-1.5`}
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                {hasQuiz ? "Revaluar" : "Evaluar"}
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}
