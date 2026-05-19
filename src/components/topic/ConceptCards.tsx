"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ChevronDown } from "lucide-react";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";

interface ConceptCardsProps {
  concepts: string[];
  title?: string;
}

export function ConceptCards({
  concepts,
  title = "Conceptos Clave",
}: ConceptCardsProps) {
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (concepts.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className={`p-1.5 rounded-lg ${tw.iconBg} ${tw.iconBgDark}`}>
          <Lightbulb className={`w-4 h-4 ${tw.text} ${tw.textDark}`} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {concepts.map((concept, i) => {
          const isExpanded = expandedIndex === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => setExpandedIndex(isExpanded ? null : i)}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all overflow-hidden ${
                isExpanded
                  ? "sm:col-span-2"
                  : "hover:shadow-md"
              }`}
              style={{
                borderColor: isExpanded
                  ? theme.primaryColor
                  : "rgba(156, 163, 175, 0.15)",
              }}
            >
              {/* Background gradient on expand */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primaryColor}08, ${theme.primaryColor}03)`,
                  }}
                />
              )}

              <div className="relative z-10">
                {/* Card header */}
                <div className="flex items-start gap-3">
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold shrink-0"
                    style={{
                      backgroundColor: `${theme.primaryColor}15`,
                      color: theme.primaryColor,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">
                      {concept}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 mt-0.5"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </div>

                {/* Expanded content - visual concept reinforcement */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Recuerda
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          Este concepto es fundamental para entender el tema. Asegúrate de dominarlo antes de continuar.
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `${theme.primaryColor}12`,
                              color: theme.primaryColor,
                            }}
                          >
                            Concepto clave
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400">
                            Tema {i + 1}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
