"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  GitCompare,
  CheckCircle2,
  XCircle,
  MinusCircle,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import {
  getCategoryToolsData,
  courseSlugToCategorySlug,
} from "@/lib/tools-data";
import {
  CategoryThemeProvider,
  useCategoryTheme,
} from "@/components/CategoryThemeProvider";
import { CategoryBackground } from "@/components/CategoryBackground";
import type { ComparisonEngine, ComparisonCriterion } from "@/lib/tools-data";

function BooleanValue({
  value,
  theme,
}: {
  value: boolean;
  theme: ReturnType<typeof useCategoryTheme>["theme"];
}) {
  return value ? (
    <CheckCircle2
      className={`w-4 h-4 ${theme.tailwind.text} ${theme.tailwind.textDark} mx-auto`}
    />
  ) : (
    <XCircle className="w-4 h-4 text-red-400/60 mx-auto" />
  );
}

function ScoreBar({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-8 text-right">
        {value}
      </span>
    </div>
  );
}

type TabKey = "tabla" | "detalles" | "puntuacion";

function CompararContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  const categorySlug = courseSlugToCategorySlug(courseSlug || "");
  const backUrl = courseSlug ? `/curso/${courseSlug}` : "/";

  const { theme } = useCategoryTheme();
  const comparisonData = getCategoryToolsData(categorySlug).comparisons;
  const { config, engines, criteria, scoreLabels } = comparisonData;

  const [activeTab, setActiveTab] = useState<TabKey>("tabla");

  const tabs: { key: TabKey; label: string; icon: typeof BarChart3 }[] = [
    { key: "tabla", label: "Comparación", icon: GitCompare },
    { key: "detalles", label: "Pros y Contras", icon: Lightbulb },
    { key: "puntuacion", label: "Puntuaciones", icon: BarChart3 },
  ];

  // Static color map for Tailwind JIT compatibility
  // Covers all possible engine colors across categories
  const staticScoreColorMap: Record<string, string> = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    cyan: "bg-cyan-500",
    red: "bg-red-500",
    gray: "bg-gray-500",
    violet: "bg-violet-500",
    teal: "bg-teal-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    indigo: "bg-indigo-500",
  };

  // Build scoreColorMap from engine data using static lookup
  const scoreColorMap: Record<string, string> = {};
  for (const engine of engines) {
    scoreColorMap[engine.color] =
      staticScoreColorMap[engine.color] || "bg-gray-500";
  }

  // Helper to get a criterion value from an engine
  function getCriterionValue(
    engine: ComparisonEngine,
    criterion: ComparisonCriterion
  ): string | boolean {
    // First check if it's a top-level field (tipo, tecnologia)
    if (criterion.key === "tipo") return engine.tipo;
    if (criterion.key === "tecnologia") return engine.tecnologia;
    // Otherwise look in details
    return engine.details[criterion.key];
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background */}
      <CategoryBackground />

      <div className="relative max-w-6xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(backUrl)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
          <div className="flex items-center gap-2">
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${theme.tailwind.iconBg} ${theme.tailwind.iconBgDark}`}
            >
              <span className="text-lg">{config.iconEmoji}</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                {config.title.split(" ").slice(0, -1).join(" ") + " "}{" "}
                <span
                  className={`bg-gradient-to-r ${theme.tailwind.gradient} bg-clip-text text-transparent`}
                >
                  {config.title.split(" ").slice(-1)}
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {config.subtitle}
              </p>
            </div>
          </div>
        </motion.header>

        {/* Engine color legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          {engines.map((engine) => (
            <div
              key={engine.name}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${engine.bgColor} border ${engine.borderColor}`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${scoreColorMap[engine.color]}`}
              />
              <span className={`text-xs font-medium ${engine.textColor}`}>
                {engine.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
                  activeTab === tab.key
                    ? `${theme.tailwind.bg} ${theme.tailwind.text} ${theme.tailwind.textDark} ${theme.tailwind.border}`
                    : "bg-gray-100 dark:bg-white/3 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/8 hover:bg-gray-200 dark:hover:bg-white/6 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab content */}
        {activeTab === "tabla" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Horizontal scrollable table */}
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-white/5">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur z-10">
                        Criterio
                      </th>
                      {engines.map((engine) => (
                        <th
                          key={engine.name}
                          className={`text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider ${engine.textColor}`}
                        >
                          {engine.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {criteria.map((criterion, idx) => (
                      <tr
                        key={criterion.key}
                        className={`border-b border-gray-100 dark:border-white/3 ${
                          idx % 2 === 0
                            ? "bg-gray-50/50 dark:bg-white/[0.01]"
                            : ""
                        }`}
                      >
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 font-medium sticky left-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur z-10">
                          {criterion.label}
                        </td>
                        {engines.map((engine) => {
                          const value = getCriterionValue(engine, criterion);
                          return (
                            <td
                              key={engine.name}
                              className="text-center px-4 py-3 text-sm text-gray-500 dark:text-gray-400"
                            >
                              {criterion.type === "boolean" ? (
                                <BooleanValue
                                  value={value as boolean}
                                  theme={theme}
                                />
                              ) : (
                                <span>{value as string}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "detalles" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {engines.map((engine, engineIdx) => (
              <motion.div
                key={engine.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: engineIdx * 0.05 }}
                className={`glass-card rounded-xl p-6 border ${engine.borderColor}`}
              >
                {/* Engine header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-3 h-8 rounded-full ${scoreColorMap[engine.color]}`}
                  />
                  <h3 className={`text-lg font-bold ${engine.textColor}`}>
                    {engine.name}
                  </h3>
                  <Badge
                    className={`${engine.bgColor} ${engine.textColor} border ${engine.borderColor} text-xs`}
                  >
                    {engine.tipo}
                  </Badge>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  {/* Pros */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <ThumbsUp
                        className={`w-3.5 h-3.5 ${theme.tailwind.text} ${theme.tailwind.textDark}`}
                      />
                      <h4
                        className={`text-xs font-semibold ${theme.tailwind.text} ${theme.tailwind.textDark} uppercase tracking-wider`}
                      >
                        Ventajas
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {engine.pros.map((pro, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${theme.tailwind.text} opacity-70 mt-0.5 shrink-0`}
                          />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contras */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
                      <h4 className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wider">
                        Desventajas
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {engine.contras.map((contra, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <MinusCircle className="w-3.5 h-3.5 text-red-500/70 mt-0.5 shrink-0" />
                          {contra}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best use case */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      <h4 className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        Mejor uso
                      </h4>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {engine.mejorCaso}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "puntuacion" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Overall scores */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3
                  className={`w-5 h-5 ${theme.tailwind.text} ${theme.tailwind.textDark}`}
                />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Puntuaciones Comparativas
                </h3>
              </div>

              <div className="space-y-8">
                {scoreLabels.map((scoreLabel) => (
                  <div key={scoreLabel.key}>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                      {scoreLabel.label}
                    </h4>
                    <div className="space-y-2.5">
                      {engines.map((engine) => (
                        <div
                          key={engine.name}
                          className="flex items-center gap-3"
                        >
                          <span
                            className={`text-xs font-medium w-24 shrink-0 ${engine.textColor}`}
                          >
                            {engine.name}
                          </span>
                          <div className="flex-1">
                            <ScoreBar
                              value={engine.scores[scoreLabel.key]}
                              color={scoreColorMap[engine.color]}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary card */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Resumen de Recomendaciones
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {engines.map((engine) => {
                  const totalScore = Object.values(engine.scores).reduce(
                    (a, b) => a + b,
                    0
                  );
                  const avgScore = Math.round(
                    totalScore / Object.keys(engine.scores).length
                  );
                  return (
                    <div
                      key={engine.name}
                      className={`rounded-lg p-4 ${engine.bgColor} border ${engine.borderColor}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm font-bold ${engine.textColor}`}
                        >
                          {engine.name}
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {avgScore}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {engine.mejorCaso}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {config.title} —{" "}
              <span
                className={`${theme.tailwind.text} ${theme.tailwind.textDark} opacity-70`}
              >
                Academy Tech
              </span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

function CompararFallback() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse flex items-center gap-2 text-gray-400">
            <GitCompare className="w-5 h-5" />
            <span className="text-sm">Cargando comparación...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompararContentWithProvider() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  const categorySlug = courseSlugToCategorySlug(courseSlug || "");

  return (
    <CategoryThemeProvider slug={categorySlug}>
      <CompararContent />
    </CategoryThemeProvider>
  );
}

export default function CompararPage() {
  return (
    <Suspense fallback={<CompararFallback />}>
      <CompararContentWithProvider />
    </Suspense>
  );
}
