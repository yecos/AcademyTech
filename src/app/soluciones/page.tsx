"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  AlertTriangle,
  Search,
  X,
  ChevronRight,
  Zap,
  Download,
  Lightbulb,
  Palette,
  Upload,
  CircleAlert,
  CircleCheck,
  Wrench,
} from "lucide-react";
import {
  troubleshootingItems,
  troubleshootingCategoryColors,
  troubleshootingCategoryLabels,
  severityColors,
  severityLabels,
  type TroubleshootingCategoryKey,
  type Severity,
} from "@/lib/search-data";

type CategoryKey = "todos" | TroubleshootingCategoryKey;

const categories: { key: CategoryKey; label: string; icon: React.ReactNode }[] = [
  { key: "todos", label: "Todos", icon: <CircleCheck className="w-3.5 h-3.5" /> },
  { key: "instalacion", label: "Instalación", icon: <Download className="w-3.5 h-3.5" /> },
  { key: "importacion", label: "Importación", icon: <Upload className="w-3.5 h-3.5" /> },
  { key: "iluminacion", label: "Iluminación", icon: <Lightbulb className="w-3.5 h-3.5" /> },
  { key: "materiales", label: "Materiales", icon: <Palette className="w-3.5 h-3.5" /> },
  { key: "exportacion", label: "Exportación", icon: <Zap className="w-3.5 h-3.5" /> },
];

const categoryColorsAll: Record<CategoryKey, string> = {
  todos: "bg-white/10 text-gray-300 border-white/10",
  ...troubleshootingCategoryColors,
};

const categoryLabelsAll: Record<CategoryKey, string> = {
  todos: "Todos",
  ...troubleshootingCategoryLabels,
};

const severityConfig: Record<Severity, { label: string; color: string; icon: React.ReactNode }> = {
  critico: {
    label: "Crítico",
    color: severityColors.critico,
    icon: <CircleAlert className="w-3 h-3" />,
  },
  moderado: {
    label: "Moderado",
    color: severityColors.moderado,
    icon: <AlertTriangle className="w-3 h-3" />,
  },
  leve: {
    label: "Leve",
    color: severityColors.leve,
    icon: <CircleCheck className="w-3 h-3" />,
  },
};

export default function SolucionesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("todos");

  const filteredIssues = useMemo(() => {
    return troubleshootingItems.filter((issue) => {
      const matchesCategory =
        activeCategory === "todos" || issue.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.causes.some((c) =>
          c.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        issue.solutions.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const groupedIssues = useMemo(() => {
    if (activeCategory !== "todos")
      return { [activeCategory]: filteredIssues };
    const groups: Record<string, typeof troubleshootingItems> = {};
    for (const issue of filteredIssues) {
      if (!groups[issue.category]) groups[issue.category] = [];
      groups[issue.category].push(issue);
    }
    return groups;
  }, [filteredIssues, activeCategory]);

  const severityCounts = useMemo(() => {
    return {
      critico: filteredIssues.filter((i) => i.severity === "critico").length,
      moderado: filteredIssues.filter((i) => i.severity === "moderado").length,
      leve: filteredIssues.filter((i) => i.severity === "leve").length,
    };
  }, [filteredIssues]);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-600/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="text-gray-400 hover:text-white hover:bg-white/5 mb-6 gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/20">
              <AlertTriangle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Soluciones{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  D5 Render
                </span>
              </h1>
              <p className="text-sm text-gray-400">
                {troubleshootingItems.length} problemas comunes y sus soluciones
              </p>
            </div>
          </div>
        </motion.header>

        {/* Severity summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-6"
        >
          <div className="glass-card rounded-xl p-4 flex flex-wrap items-center gap-4">
            <span className="text-xs text-gray-500 font-medium">
              Severidad:
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-xs text-gray-400">
                  {severityCounts.critico} Críticos
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs text-gray-400">
                  {severityCounts.moderado} Moderados
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-gray-400">
                  {severityCounts.leve} Leves
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar problema, causa o solución..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  activeCategory === cat.key
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-white/3 text-gray-400 border-white/8 hover:bg-white/6 hover:text-gray-300"
                }`}
              >
                {cat.icon}
                {cat.label}
                {cat.key !== "todos" && (
                  <span className="ml-1 text-[10px] opacity-60">
                    {troubleshootingItems.filter((t) => t.category === cat.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Issues */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredIssues.length === 0 ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <Search className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  Sin resultados
                </h3>
                <p className="text-sm text-gray-400">
                  No se encontraron problemas que coincidan con tu búsqueda.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedIssues).map(
                  ([category, categoryIssues]) => (
                    <div key={category}>
                      {/* Category header */}
                      <div className="flex items-center gap-2 mb-4">
                        <Badge
                          className={`${categoryColorsAll[category as CategoryKey]} text-xs`}
                        >
                          {categoryLabelsAll[category as CategoryKey]}
                        </Badge>
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-xs text-gray-500">
                          {categoryIssues.length}{" "}
                          {categoryIssues.length === 1
                            ? "problema"
                            : "problemas"}
                        </span>
                      </div>

                      {/* Accordion items */}
                      <Accordion type="multiple" className="space-y-2">
                        {categoryIssues.map((issue, index) => (
                          <motion.div
                            key={issue.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.05,
                            }}
                          >
                            <AccordionItem
                              value={`issue-${issue.id}`}
                              className="glass-card rounded-xl border-0 overflow-hidden data-[state=open]:border-emerald-500/15 transition-colors duration-300"
                            >
                              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/3 transition-colors duration-200 [&[data-state=open]]:border-b [&[data-state=open]]:border-white/5">
                                <div className="flex items-center gap-3 text-left flex-1 min-w-0">
                                  <div
                                    className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${severityConfig[issue.severity].color}`}
                                  >
                                    {severityConfig[issue.severity].icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                      <h3 className="text-sm font-semibold text-white truncate">
                                        {issue.title}
                                      </h3>
                                      <Badge
                                        className={`${severityConfig[issue.severity].color} text-[9px] px-1.5 py-0 shrink-0`}
                                      >
                                        {severityConfig[issue.severity].label}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-1">
                                      {issue.description}
                                    </p>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4">
                                <div className="space-y-4 pt-2">
                                  {/* Description */}
                                  <div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                      {issue.description}
                                    </p>
                                  </div>

                                  {/* Causes */}
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <CircleAlert className="w-3.5 h-3.5 text-red-400/70" />
                                      <h4 className="text-xs font-semibold text-red-400/90 uppercase tracking-wider">
                                        Causas
                                      </h4>
                                    </div>
                                    <ul className="space-y-1.5">
                                      {issue.causes.map((cause, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-2 text-xs text-gray-400"
                                        >
                                          <ChevronRight className="w-3 h-3 text-red-400/50 shrink-0 mt-0.5" />
                                          <span>{cause}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Solutions */}
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <Wrench className="w-3.5 h-3.5 text-emerald-400/70" />
                                      <h4 className="text-xs font-semibold text-emerald-400/90 uppercase tracking-wider">
                                        Soluciones
                                      </h4>
                                    </div>
                                    <ul className="space-y-1.5">
                                      {issue.solutions.map((solution, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-2 text-xs text-gray-300"
                                        >
                                          <span className="shrink-0 w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-[9px] font-bold mt-0.5">
                                            {i + 1}
                                          </span>
                                          <span>{solution}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </motion.div>
                        ))}
                      </Accordion>
                    </div>
                  )
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tip section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-10 glass-card rounded-xl p-5 border-emerald-500/10"
        >
          <div className="flex items-start gap-3">
            <Wrench className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">
                Consejo
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Si tu problema no aparece en esta lista, asegúrate de tener la
                última versión de D5 Render instalada. Muchos errores se
                corrigen en cada actualización. También puedes consultar la{" "}
                <span className="text-emerald-400/80">
                  comunidad oficial de D5 Render
                </span>{" "}
                o contactar al soporte técnico con tu archivo de registro
                (log) para obtener ayuda personalizada.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Soluciones de la Academia D5 Render —{" "}
              <span className="text-emerald-400/70">
                {troubleshootingItems.length} problemas documentados
              </span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
