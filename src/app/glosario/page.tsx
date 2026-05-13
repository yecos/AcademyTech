"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BookOpen,
  Search,
  X,
} from "lucide-react";
import {
  glossaryTerms,
  glossaryCategoryColors,
  glossaryCategoryLabels,
  type GlossaryCategoryKey,
} from "@/lib/search-data";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";

type CategoryKey = "todos" | GlossaryCategoryKey;

const categories: { key: CategoryKey; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "renderizado", label: "Renderizado" },
  { key: "iluminacion", label: "Iluminación" },
  { key: "materiales", label: "Materiales" },
  { key: "camara", label: "Cámara" },
  { key: "animacion", label: "Animación" },
  { key: "exportacion", label: "Exportación" },
];

const categoryColorsAll: Record<CategoryKey, string> = {
  todos: "bg-gray-200/60 text-gray-600 dark:bg-white/10 dark:text-gray-300 border-gray-300 dark:border-white/10",
  ...glossaryCategoryColors,
};

const categoryLabelsAll: Record<CategoryKey, string> = {
  todos: "Todos",
  ...glossaryCategoryLabels,
};

export default function GlosarioPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("todos");

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((item) => {
      const matchesCategory =
        activeCategory === "todos" || item.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const groupedTerms = useMemo(() => {
    if (activeCategory !== "todos") return { [activeCategory]: filteredTerms };
    const groups: Record<string, typeof glossaryTerms> = {};
    for (const term of filteredTerms) {
      if (!groups[term.category]) groups[term.category] = [];
      groups[term.category].push(term);
    }
    return groups;
  }, [filteredTerms, activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-600/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
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
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/20">
              <BookOpen className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Glosario{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  D5 Render
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {glossaryTerms.length} términos de renderizado 3D y D5 Render
              </p>
            </div>
          </div>
        </motion.header>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar término..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  activeCategory === cat.key
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-gray-100 dark:bg-white/3 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/8 hover:bg-gray-200 dark:hover:bg-white/6 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {cat.label}
                {cat.key !== "todos" && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    {glossaryTerms.filter((t) => t.category === cat.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Terms */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredTerms.length === 0 ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <Search className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Sin resultados
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No se encontraron términos que coincidan con tu búsqueda.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedTerms).map(([category, terms]) => (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge
                        className={`${categoryColorsAll[category as CategoryKey]} text-xs`}
                      >
                        {categoryLabelsAll[category as CategoryKey]}
                      </Badge>
                      <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {terms.length} términos
                      </span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {terms.map((item, index) => (
                        <motion.div
                          key={item.term}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.03,
                          }}
                          className="glass-card glass-card-hover rounded-xl p-4 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                              {item.term}
                            </h3>
                            <Badge
                              className={`${categoryColorsAll[item.category as CategoryKey]} text-[9px] px-1.5 py-0 shrink-0`}
                            >
                              {categoryLabelsAll[item.category as CategoryKey]}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                            {item.definition}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Glosario de la Academia D5 Render —{" "}
              <span className="text-emerald-500/70 dark:text-emerald-400/70">
                {glossaryTerms.length} términos definidos
              </span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
