"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Award,
} from "lucide-react";
import { Module, QuizQuestion } from "@/lib/curriculum";
import { useCourse } from "@/hooks/use-course-context";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";

interface QuizDialogProps {
  module: Module;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuizDialog({
  module,
  open,
  onOpenChange,
}: QuizDialogProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const course = useCourse();
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;

  const questions = module.quiz;
  const totalQuestions = questions.length;

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    let correct = 0;
    for (const q of questions) {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    }
    setScore(correct);
    setSubmitted(true);
    course.saveQuizResult(module.id, correct, totalQuestions, JSON.stringify(answers));
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when closing
      setCurrentQuestion(0);
      setAnswers({});
      setSubmitted(false);
      setScore(0);
    }
    onOpenChange(newOpen);
  };

  const isAllAnswered = questions.every((q) => answers[q.id]);
  const currentQ = questions[currentQuestion];
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return `${tw.text} ${tw.textDark}`;
    if (percentage >= 60) return "text-amber-500 dark:text-amber-400";
    return "text-red-500 dark:text-red-400";
  };

  const getScoreMessage = () => {
    if (percentage === 100) return "¡Perfecto! ¡Dominas completamente este módulo!";
    if (percentage >= 80) return "¡Excelente! Tienes un gran dominio del tema.";
    if (percentage >= 60) return "¡Bien! Pero aún puedes mejorar.";
    return "Necesitas repasar este módulo. ¡No te rindas!";
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Award className={`w-5 h-5 ${tw.text} ${tw.textDark}`} />
            Evaluación: {module.title}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            {submitted
              ? "Resultados de tu evaluación"
              : `Pregunta ${currentQuestion + 1} de ${totalQuestions}`}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Progress indicator */}
              <div className="flex gap-1.5">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      i === currentQuestion
                        ? tw.progress
                        : answers[questions[i].id]
                          ? `${tw.bg} ${tw.bgDark}`
                          : "bg-gray-200 dark:bg-white/10"
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <div className="space-y-4">
                <h3 className="text-base font-medium leading-relaxed">
                  {currentQ.question}
                </h3>

                <RadioGroup
                  value={answers[currentQ.id] || ""}
                  onValueChange={(value) =>
                    handleAnswerChange(currentQ.id, value)
                  }
                  className="space-y-2"
                >
                  {currentQ.options.map((option) => (
                    <motion.div
                      key={option.label}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Label
                        htmlFor={`${currentQ.id}-${option.label}`}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                          answers[currentQ.id] === option.label
                            ? `${tw.bg} ${tw.bgDark} ${tw.border} ${tw.borderDark} ${tw.text} ${tw.textDark}`
                            : "bg-gray-50 dark:bg-white/3 border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/10"
                        }`}
                      >
                        <RadioGroupItem
                          value={option.label}
                          id={`${currentQ.id}-${option.label}`}
                          className={`border-gray-300 dark:border-white/20 ${tw.text} ${tw.textDark}`}
                        />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {option.label})
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {option.text}
                        </span>
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </div>

              <Separator className="bg-gray-200 dark:bg-white/5" />

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setCurrentQuestion((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentQuestion === 0}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Anterior
                </Button>

                {currentQuestion < totalQuestions - 1 ? (
                  <Button
                    size="sm"
                    onClick={() =>
                      setCurrentQuestion((prev) =>
                        Math.min(totalQuestions - 1, prev + 1)
                      )
                    }
                    disabled={!answers[currentQ.id]}
                    className={`${tw.button} text-white`}
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleSubmit}
                    disabled={!isAllAnswered}
                    className={`${tw.button} text-white`}
                  >
                    <Trophy className="w-4 h-4 mr-1.5" />
                    Enviar Evaluación
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* Score display */}
              <div className="text-center py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${tw.bg} ${tw.bgDark} mb-3`}
                >
                  <Trophy className={`w-10 h-10 ${tw.text} ${tw.textDark}`} />
                </motion.div>
                <div className={`text-4xl font-bold ${getScoreColor()} mb-1`}>
                  {score}/{totalQuestions}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{percentage}% correcto</div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-xs mx-auto">
                  {getScoreMessage()}
                </p>
              </div>

              <Separator className="bg-gray-200 dark:bg-white/5" />

              {/* Question review */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {questions.map((q, i) => {
                  const userAnswer = answers[q.id];
                  const isCorrect = userAnswer === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className={`rounded-lg p-3 border ${
                        isCorrect
                          ? "bg-emerald-500/5 border-emerald-500/20"
                          : "bg-red-500/5 border-red-500/20"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-0.5 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500 dark:text-red-400 mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                            {i + 1}. {q.question}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            <Badge
                              variant="outline"
                              className={`text-[10px] px-1.5 ${
                                isCorrect
                                  ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                                  : "border-red-500/30 text-red-600 dark:text-red-400"
                              }`}
                            >
                              Tu respuesta: {userAnswer}
                            </Badge>
                            {!isCorrect && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                              >
                                Correcta: {q.correctAnswer}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator className="bg-gray-200 dark:bg-white/5" />

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetake}
                  className="flex-1 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                >
                  <RotateCcw className="w-4 h-4 mr-1.5" />
                  Reintentar
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleOpenChange(false)}
                  className={`flex-1 ${tw.button} text-white`}
                >
                  Cerrar
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
