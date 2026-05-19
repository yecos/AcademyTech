"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from "lucide-react";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";
import { Button } from "@/components/ui/button";

export interface CheckQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface KnowledgeCheckProps {
  questions: CheckQuestion[];
  title?: string;
}

export function KnowledgeCheck({
  questions,
  title = "Verifica tu Conocimiento",
}: KnowledgeCheckProps) {
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQ.correctIndex;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === currentQ.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsComplete(false);
  };

  // Completion screen
  if (isComplete) {
    const score = Math.round((correctCount / questions.length) * 100);
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white"
          style={{
            backgroundColor: score >= 80 ? theme.primaryColor : score >= 50 ? "#f59e0b" : "#ef4444",
          }}
        >
          {score}%
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {score >= 80
            ? "¡Excelente!"
            : score >= 50
              ? "¡Buen intento!"
              : "Sigue practicando"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Acertaste {correctCount} de {questions.length} preguntas
        </p>
        <div className="flex justify-center gap-3">
          <Button
            onClick={handleReset}
            className={`${tw.button} text-white gap-2`}
          >
            Reintentar
          </Button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${tw.iconBg} ${tw.iconBgDark}`}>
            <HelpCircle className={`w-4 h-4 ${tw.text} ${tw.textDark}`} />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Pregunta {currentIndex + 1}/{questions.length}
          </span>
        </div>
      </div>

      {/* Question progress dots */}
      <div className="flex items-center gap-1 mb-5">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < currentIndex
                ? `bg-gradient-to-r ${tw.progress}`
                : i === currentIndex
                  ? "bg-gray-400 dark:bg-gray-500"
                  : "bg-gray-200 dark:bg-white/5"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-gray-900 dark:text-white font-medium mb-4 text-base">
            {currentQ.question}
          </p>

          {/* Options */}
          <div className="space-y-2">
            {currentQ.options.map((option, i) => {
              const isSelected = selectedAnswer === i;
              const isCorrectOption = i === currentQ.correctIndex;
              let optionStyle = "border-gray-200 dark:border-white/8 hover:border-gray-300 dark:hover:border-white/15";

              if (isAnswered) {
                if (isCorrectOption) {
                  optionStyle = "border-emerald-400 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/5";
                } else if (isSelected && !isCorrectOption) {
                  optionStyle = "border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-500/5";
                } else {
                  optionStyle = "border-gray-200 dark:border-white/5 opacity-50";
                }
              } else if (isSelected) {
                optionStyle = `border-current`;
              }

              return (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-start gap-3 ${optionStyle}`}
                  whileHover={!isAnswered ? { scale: 1.01 } : undefined}
                  whileTap={!isAnswered ? { scale: 0.99 } : undefined}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 mt-0.5 border-2 ${
                      isAnswered && isCorrectOption
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : isAnswered && isSelected && !isCorrectOption
                          ? "bg-red-500 border-red-500 text-white"
                          : isSelected
                            ? ""
                            : "border-gray-300 dark:border-white/15 text-gray-400 dark:text-gray-500"
                    }`}
                    style={
                      isSelected && !isAnswered
                        ? { borderColor: theme.primaryColor, color: theme.primaryColor }
                        : undefined
                    }
                  >
                    {isAnswered && isCorrectOption ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isAnswered && isSelected && !isCorrectOption ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-200 pt-0.5">
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <div
                  className={`p-3 rounded-lg flex items-start gap-2 ${
                    isCorrect
                      ? "bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20"
                      : "bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
                      {isCorrect ? "¡Correcto!" : "Incorrecto"}
                    </p>
                    {currentQ.explanation && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {currentQ.explanation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-3">
                  <Button
                    onClick={handleNext}
                    className={`${tw.button} text-white gap-1.5`}
                    size="sm"
                  >
                    {currentIndex < questions.length - 1 ? "Siguiente" : "Ver resultado"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
