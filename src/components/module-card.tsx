"use client";

import { useState } from "react";
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
import { useStudyStore } from "@/lib/store";

interface ModuleCardProps {
  module: Module;
  index: number;
  onEvaluar: (module: Module) => void;
}

export function ModuleCard({ module, index, onEvaluar }: ModuleCardProps) {
  const router = useRouter();
  const completedTopics = useStudyStore((s) =>
    s.getModuleCompletedCount(module.id)
  );
  const totalTopics = module.topics.length;
  const progress = useStudyStore((s) => s.getModuleProgress(module.id));
  const toggleTopic = useStudyStore((s) => s.toggleTopic);
  const isTopicCompleted = useStudyStore((s) => s.isTopicCompleted);
  const isBookmarked = useStudyStore((s) => s.isBookmarked);
  const quizResult = useStudyStore((s) => s.quizResults[module.id]);

  const isComplete = progress === 100;
  const hasQuiz = !!quizResult;
  const quizScore = quizResult
    ? Math.round((quizResult.score / quizResult.totalQuestions) * 100)
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
        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-transparent">
          <div className="flex items-center gap-4 flex-1 text-left">
            {/* Module number */}
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold shrink-0 ${
                isComplete
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-white/5 text-gray-400"
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
                <h3 className="text-sm font-semibold text-white truncate">
                  Módulo {module.number}: {module.title}
                </h3>
                {isComplete && (
                  <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 text-[10px] px-1.5">
                    Completo
                  </Badge>
                )}
                {hasQuiz && (
                  <Badge
                    className={`text-[10px] px-1.5 ${
                      quizScore >= 80
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                        : quizScore >= 60
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/20"
                          : "bg-red-500/15 text-red-400 border-red-500/20"
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
                    className="h-1.5 bg-white/5 rounded-full overflow-hidden"
                  />
                </div>
                <span className="text-[11px] text-gray-500 shrink-0">
                  {completedTopics}/{totalTopics} temas
                </span>
              </div>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-5 pb-4">
          <div className="space-y-4">
            {/* Topics list - now clickable */}
            <div className="space-y-1">
              {module.topics.map((topic, topicIndex) => {
                const key = `${module.id}-${topicIndex}`;
                const checked = isTopicCompleted(module.id, topicIndex);
                const diffColors = {
                  basico: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
                  intermedio: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
                  avanzado: 'bg-red-500/15 text-red-400 border-red-500/20',
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
                    className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white/3 transition-colors group"
                  >
                    <Checkbox
                      id={key}
                      checked={checked}
                      onCheckedChange={() =>
                        toggleTopic(module.id, topicIndex)
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="border-white/20 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                    />
                    <button
                      onClick={() =>
                        router.push(`/modulo/${module.id}/tema/${topicIndex}`)
                      }
                      className={`flex-1 flex items-center gap-1 text-left cursor-pointer transition-colors ${
                        checked
                          ? "text-gray-500 line-through"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      <span className="text-gray-500 mr-1.5 text-xs">
                        {topicIndex + 1}.
                      </span>
                      <span className="flex-1 text-sm">{topic.name}</span>
                      <Badge className={`text-[9px] px-1.5 py-0 ${diffColors[topic.difficulty]} shrink-0`}>
                        {diffLabels[topic.difficulty]}
                      </Badge>
                      <span className="text-[10px] text-gray-500 shrink-0 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {topic.estimatedTime}
                      </span>
                      {isBookmarked(module.id, topicIndex) && (
                        <Bookmark className="w-3 h-3 text-emerald-400 fill-emerald-400 shrink-0" />
                      )}
                      <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-emerald-400 transition-colors shrink-0" />
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Evaluar button */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div className="text-xs text-gray-500">
                {progress < 100
                  ? "Completa todos los temas para dominar el módulo"
                  : "¡Todos los temas completados!"}
              </div>
              <Button
                size="sm"
                onClick={() => onEvaluar(module)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5"
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
