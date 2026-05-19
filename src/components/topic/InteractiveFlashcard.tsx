"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";
import { Button } from "@/components/ui/button";

export interface FlashcardItem {
  front: string;
  back: string;
}

interface InteractiveFlashcardProps {
  cards: FlashcardItem[];
  title?: string;
}

export function InteractiveFlashcard({
  cards,
  title = "Tarjetas de Estudio",
}: InteractiveFlashcardProps) {
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState<Set<number>>(new Set());

  if (cards.length === 0) return null;

  const currentCard = cards[currentIndex];
  const masteredCount = mastered.size;
  const progressPercent = Math.round((masteredCount / cards.length) * 100);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const toggleMastered = () => {
    setMastered((prev) => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${tw.iconBg} ${tw.iconBgDark}`}>
            <Layers className={`w-4 h-4 ${tw.text} ${tw.textDark}`} />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {masteredCount}/{cards.length} dominadas
          </span>
          <span className="text-xs font-medium" style={{ color: theme.primaryColor }}>
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden mb-5">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${tw.progress}`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Flashcard */}
      <div className="relative perspective-1000" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${isFlipped}`}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative cursor-pointer min-h-[200px] rounded-xl border-2 overflow-hidden select-none"
            style={{
              borderColor: mastered.has(currentIndex)
                ? theme.primaryColor
                : "rgba(156, 163, 175, 0.2)",
            }}
          >
            {/* Front side */}
            {!isFlipped ? (
              <div className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                <div className={`absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full ${tw.badge} ${tw.badgeDark} border`}>
                  {currentIndex + 1} / {cards.length}
                </div>
                <div className="absolute top-3 left-3">
                  <RotateCcw className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                </div>
                {mastered.has(currentIndex) && (
                  <div className="absolute bottom-3 left-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold`}
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      ✓
                    </motion.div>
                  </div>
                )}
                <p className="text-gray-900 dark:text-white text-center text-lg font-medium mt-6">
                  {currentCard.front}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                  Toca para ver la respuesta
                </p>
              </div>
            ) : (
              /* Back side */
              <div
                className="p-6 flex flex-col items-center justify-center min-h-[200px]"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor}08, ${theme.primaryColor}03)`,
                }}
              >
                <div className={`absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full ${tw.badge} ${tw.badgeDark} border`}>
                  Respuesta
                </div>
                <div className="absolute top-3 left-3">
                  <RotateCcw className={`w-4 h-4 ${tw.text} ${tw.textDark}`} />
                </div>
                <p className="text-gray-700 dark:text-gray-200 text-center text-base leading-relaxed mt-4">
                  {currentCard.back}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMastered();
                  }}
                  className={`mt-5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    mastered.has(currentIndex)
                      ? `${tw.badge} ${tw.badgeDark}`
                      : "border-gray-300 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  {mastered.has(currentIndex) ? "Dominada ✓" : "Marcar como dominada"}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          className="border-gray-200 dark:border-white/10 gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <div className="flex items-center gap-1">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsFlipped(false);
                setTimeout(() => setCurrentIndex(i), 150);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex
                  ? "w-4"
                  : mastered.has(i)
                    ? ""
                    : "bg-gray-300 dark:bg-white/10"
              }`}
              style={{
                backgroundColor:
                  i === currentIndex
                    ? theme.primaryColor
                    : mastered.has(i)
                      ? `${theme.primaryColor}80`
                      : undefined,
              }}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          className="border-gray-200 dark:border-white/10 gap-1"
        >
          Siguiente
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.section>
  );
}
