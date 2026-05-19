"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListChecks, CheckCircle2, Circle, Lightbulb } from "lucide-react";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";

interface StepItem {
  title: string;
  description: string;
  tip?: string;
}

interface InteractiveStepsProps {
  steps: StepItem[];
  title?: string;
}

export function InteractiveSteps({
  steps,
  title = "Tutorial Paso a Paso",
}: InteractiveStepsProps) {
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [activeStep, setActiveStep] = useState(0);

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const progressPercent = steps.length > 0
    ? Math.round((completedSteps.size / steps.length) * 100)
    : 0;

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
            <ListChecks className={`w-4 h-4 ${tw.text} ${tw.textDark}`} />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        {completedSteps.size > 0 && (
          <span className="text-xs font-medium" style={{ color: theme.primaryColor }}>
            {completedSteps.size}/{steps.length} completados
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden mb-6">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${tw.progress}`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, i) => {
          const isCompleted = completedSteps.has(i);
          const isActive = activeStep === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`relative rounded-xl border-2 transition-all overflow-hidden ${
                isActive
                  ? "shadow-md"
                  : ""
              }`}
              style={{
                borderColor: isCompleted
                  ? theme.primaryColor
                  : isActive
                    ? `${theme.primaryColor}40`
                    : "rgba(156, 163, 175, 0.12)",
              }}
            >
              {/* Step background on completion */}
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primaryColor}06, ${theme.primaryColor}02)`,
                  }}
                />
              )}

              <div className="relative z-10">
                {/* Step header - clickable to expand */}
                <button
                  onClick={() => setActiveStep(isActive ? -1 : i)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                >
                  {/* Step number / completion indicator */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStep(i);
                    }}
                    whileTap={{ scale: 0.85 }}
                    className="shrink-0"
                  >
                    <AnimatePresence mode="wait">
                      {isCompleted ? (
                        <motion.div
                          key="completed"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="w-9 h-9 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="incomplete"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                          style={{ borderColor: `${theme.primaryColor}40` }}
                        >
                          <span className="text-sm font-bold" style={{ color: `${theme.primaryColor}80` }}>
                            {i + 1}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Step title */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-semibold ${
                      isCompleted
                        ? "line-through text-gray-400 dark:text-gray-500"
                        : "text-gray-900 dark:text-white"
                    }`}>
                      {step.title}
                    </h3>
                  </div>

                  {/* Expand/collapse indicator */}
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Circle
                      className="w-4 h-4 text-gray-300 dark:text-gray-600"
                      style={isActive ? { color: theme.primaryColor } : undefined}
                    />
                  </motion.div>
                </button>

                {/* Expanded step content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pl-[4.25rem]">
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3">
                          {step.description}
                        </p>
                        {step.tip && (
                          <div className="flex items-start gap-2 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2">
                            <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span className="text-amber-600/80 dark:text-amber-300/80 text-xs">
                              {step.tip}
                            </span>
                          </div>
                        )}
                        {!isCompleted && (
                          <button
                            onClick={() => toggleStep(i)}
                            className={`mt-3 text-xs px-3 py-1.5 rounded-lg ${tw.button} text-white transition-colors`}
                          >
                            Marcar como completado
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Connecting line to next step */}
              {i < steps.length - 1 && (
                <div
                  className="absolute left-[2.05rem] -bottom-3 w-0.5 h-3"
                  style={{
                    backgroundColor: isCompleted && completedSteps.has(i + 1)
                      ? theme.primaryColor
                      : "rgba(156, 163, 175, 0.15)",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* All completed celebration */}
      <AnimatePresence>
        {completedSteps.size === steps.length && steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 p-4 rounded-xl text-center"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}10, ${theme.primaryColor}05)`,
              border: `1px solid ${theme.primaryColor}20`,
            }}
          >
            <p className="text-sm font-medium" style={{ color: theme.primaryColor }}>
              ¡Todos los pasos completados! Estás listo para practicar.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
