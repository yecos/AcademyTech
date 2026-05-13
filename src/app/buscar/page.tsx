"use client";

import { Suspense, useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Search,
  X,
  BookOpen,
  AlertTriangle,
  Clock,
  FileText,
} from "lucide-react";
import { modules } from "@/lib/curriculum";
import { getAllTopicContents } from "@/lib/topic-content";
import {
  glossaryTerms,
  troubleshootingItems,
  glossaryCategoryColors,
  glossaryCategoryLabels,
  troubleshootingCategoryColors,
  troubleshootingCategoryLabels,
  severityColors,
  severityLabels,
  type GlossaryCategoryKey,
  type TroubleshootingCategoryKey,
  type Severity,
} from "@/lib/search-data";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";

// ============================================================
// Types
// ============================================================

interface TopicResult {
  type: "tema";
  moduleId: string;
  moduleNumber: number;
  moduleTitle: string;
  topicIndex: number;
  topicName: string;
  difficulty: "basico" | "intermedio" | "avanzado";
  estimatedTime: string;
  snippet: string;
}

interface GlossaryResult {
  type: "glosario";
  term: string;
  definition: string;
  category: GlossaryCategoryKey;
  snippet: string;
}

interface TroubleshootingResult {
  type: "solucion";
  id: string;
  title: string;
  description: string;
  category: TroubleshootingCategoryKey;
  severity: Severity;
  snippet: string;
}

// ============================================================
// Helpers
// ============================================================

const difficultyColors: Record<string, string> = {
  basico: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  intermedio: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  avanzado: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

const difficultyLabels: Record<string, string> = {
  basico: "Básico",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

function truncate(text: string, maxLen: number = 120): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + "...";
}

function findSnippet(text: string, query: string, contextLen: number = 80): string {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const idx = lowerText.indexOf(lowerQuery);
  if (idx === -1) return truncate(text, 150);
  const start = Math.max(0, idx - contextLen);
  const end = Math.min(text.length, idx + query.length + contextLen);
  let snippet = text.slice(start, end);
  if (start > 0) snippet = "..." + snippet;
  if (end < text.length) snippet = snippet + "...";
  return snippet;
}

// Highlight matching text with emerald-colored span
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  let searchFrom = 0;
  while (searchFrom < lowerText.length) {
    const idx = lowerText.indexOf(lowerQuery, searchFrom);
    if (idx === -1) break;
    if (idx > lastIndex) {
      parts.push(text.slice(lastIndex, idx));
    }
    parts.push(
      <mark key={idx} className="bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 rounded px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
    );
    lastIndex = idx + query.length;
    searchFrom = idx + 1;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}

// ============================================================
// Search logic
// ============================================================

function performSearch(query: string): {
  topics: TopicResult[];
  glossary: GlossaryResult[];
  solutions: TroubleshootingResult[];
} {
  const q = query.toLowerCase().trim();
  if (!q) return { topics: [], glossary: [], solutions: [] };

  // Search topics
  const topicResults: TopicResult[] = [];
  const topicContents = getAllTopicContents();

  for (const mod of modules) {
    for (let i = 0; i < mod.topics.length; i++) {
      const topic = mod.topics[i];
      const content = topicContents.find(
        (c) => c.moduleId === mod.id && c.topicIndex === i
      );

      let matches = false;
      let snippet = "";

      if (
        topic.name.toLowerCase().includes(q) ||
        topic.difficulty.toLowerCase().includes(q) ||
        topic.estimatedTime.toLowerCase().includes(q)
      ) {
        matches = true;
        snippet = findSnippet(topic.name, q);
      }

      if (!matches && content) {
        const contentTexts = [
          content.title,
          content.explanation,
          ...content.keyPoints,
          content.practice,
        ].join(" ");

        if (contentTexts.toLowerCase().includes(q)) {
          matches = true;
          const sources = [content.explanation, ...content.keyPoints, content.practice];
          for (const src of sources) {
            if (src.toLowerCase().includes(q)) {
              snippet = findSnippet(src, q);
              break;
            }
          }
        }
      }

      if (matches) {
        topicResults.push({
          type: "tema",
          moduleId: mod.id,
          moduleNumber: mod.number,
          moduleTitle: mod.title,
          topicIndex: i,
          topicName: topic.name,
          difficulty: topic.difficulty,
          estimatedTime: topic.estimatedTime,
          snippet,
        });
      }
    }
  }

  // Search glossary
  const glossaryResults: GlossaryResult[] = [];
  for (const term of glossaryTerms) {
    if (
      term.term.toLowerCase().includes(q) ||
      term.definition.toLowerCase().includes(q) ||
      glossaryCategoryLabels[term.category].toLowerCase().includes(q)
    ) {
      glossaryResults.push({
        type: "glosario",
        term: term.term,
        definition: term.definition,
        category: term.category,
        snippet: findSnippet(term.definition, q),
      });
    }
  }

  // Search troubleshooting
  const solutionResults: TroubleshootingResult[] = [];
  for (const item of troubleshootingItems) {
    const searchable = [
      item.title,
      item.description,
      ...item.causes,
      ...item.solutions,
    ]
      .join(" ")
      .toLowerCase();

    if (
      searchable.includes(q) ||
      troubleshootingCategoryLabels[item.category].toLowerCase().includes(q)
    ) {
      solutionResults.push({
        type: "solucion",
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        severity: item.severity,
        snippet: findSnippet(item.description, q),
      });
    }
  }

  return { topics: topicResults, glossary: glossaryResults, solutions: solutionResults };
}

// ============================================================
// Inner component (uses useSearchParams)
// ============================================================

function BuscarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce search: 300ms
  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 300);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Perform search
  const results = useMemo(() => performSearch(debouncedQuery), [debouncedQuery]);

  const totalResults = results.topics.length + results.glossary.length + results.solutions.length;
  const hasQuery = debouncedQuery.trim().length > 0;

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
              <Search className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Buscar{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  D5 Render
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Busca temas, términos del glosario y soluciones
              </p>
            </div>
          </div>
        </motion.header>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar temas, términos, soluciones..."
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-base focus:outline-none focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setDebouncedQuery("");
                  inputRef.current?.focus();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          <motion.div
            key={debouncedQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {!hasQuery ? (
              /* Empty state - no query */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-xl p-10 text-center"
              >
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Busca en toda la academia
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Escribe para buscar en los 60 temas del curso, {glossaryTerms.length} términos
                  del glosario y {troubleshootingItems.length} soluciones de problemas.
                </p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Temas</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Glosario</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Soluciones</span>
                  </div>
                </div>
              </motion.div>
            ) : totalResults === 0 ? (
              /* No results */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-xl p-10 text-center"
              >
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-4">
                  No hay coincidencias para &quot;{debouncedQuery}&quot;.
                  Intenta con otros términos o revisa la ortografía.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {["iluminación", "materiales", "render", "vidrio", "GPU"].map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setQuery(suggestion);
                          setDebouncedQuery(suggestion);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 text-xs text-gray-500 dark:text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/20 transition-all"
                      >
                        {suggestion}
                      </button>
                    )
                  )}
                </div>
              </motion.div>
            ) : (
              /* Results grouped by category */
              <div className="space-y-8">
                {/* Result counts summary */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {totalResults} resultado{totalResults !== 1 ? "s" : ""}
                  </span>
                  <div className="flex items-center gap-2">
                    {results.topics.length > 0 && (
                      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        {results.topics.length} tema{results.topics.length !== 1 ? "s" : ""}
                      </Badge>
                    )}
                    {results.glossary.length > 0 && (
                      <Badge className="bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20 text-xs">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {results.glossary.length} glosario{results.glossary.length !== 1 ? "s" : ""}
                      </Badge>
                    )}
                    {results.solutions.length > 0 && (
                      <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20 text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {results.solutions.length} solución{results.solutions.length !== 1 ? "es" : ""}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Topics results */}
                {results.topics.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                      <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                        Temas
                      </h2>
                      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs">
                        {results.topics.length}
                      </Badge>
                      <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
                    </div>
                    <div className="grid gap-3">
                      {results.topics.map((topic, index) => (
                        <motion.div
                          key={`${topic.moduleId}-${topic.topicIndex}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.03 }}
                          onClick={() =>
                            router.push(
                              `/modulo/${topic.moduleId}/tema/${topic.topicIndex}`
                            )
                          }
                          className="glass-card glass-card-hover rounded-xl p-4 cursor-pointer transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              {topic.moduleNumber}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                  <HighlightedText text={topic.topicName} query={debouncedQuery} />
                                </h3>
                                <Badge
                                  className={`${difficultyColors[topic.difficulty]} text-[9px] px-1.5 py-0 shrink-0`}
                                >
                                  {difficultyLabels[topic.difficulty]}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-3 mb-2 text-xs text-gray-400 dark:text-gray-500">
                                <span>Módulo {topic.moduleNumber}: {topic.moduleTitle}</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {topic.estimatedTime}
                                </span>
                              </div>
                              {topic.snippet && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                  <HighlightedText text={topic.snippet} query={debouncedQuery} />
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Glossary results */}
                {results.glossary.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-4 h-4 text-violet-500 dark:text-violet-400" />
                      <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                        Glosario
                      </h2>
                      <Badge className="bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20 text-xs">
                        {results.glossary.length}
                      </Badge>
                      <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {results.glossary.map((item, index) => (
                        <motion.div
                          key={item.term}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.03 }}
                          onClick={() => router.push("/glosario")}
                          className="glass-card glass-card-hover rounded-xl p-4 cursor-pointer transition-all duration-300"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                              <HighlightedText text={item.term} query={debouncedQuery} />
                            </h3>
                            <Badge
                              className={`${glossaryCategoryColors[item.category]} text-[9px] px-1.5 py-0 shrink-0`}
                            >
                              {glossaryCategoryLabels[item.category]}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3">
                            <HighlightedText text={item.snippet} query={debouncedQuery} />
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Troubleshooting results */}
                {results.solutions.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                      <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                        Soluciones
                      </h2>
                      <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20 text-xs">
                        {results.solutions.length}
                      </Badge>
                      <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
                    </div>
                    <div className="grid gap-3">
                      {results.solutions.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.03 }}
                          onClick={() => router.push("/soluciones")}
                          className="glass-card glass-card-hover rounded-xl p-4 cursor-pointer transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${severityColors[item.severity]}`}
                            >
                              <AlertTriangle className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                  <HighlightedText text={item.title} query={debouncedQuery} />
                                </h3>
                                <Badge
                                  className={`${severityColors[item.severity]} text-[9px] px-1.5 py-0 shrink-0`}
                                >
                                  {severityLabels[item.severity]}
                                </Badge>
                                <Badge
                                  className={`${troubleshootingCategoryColors[item.category]} text-[9px] px-1.5 py-0 shrink-0`}
                                >
                                  {troubleshootingCategoryLabels[item.category]}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                <HighlightedText text={item.snippet} query={debouncedQuery} />
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
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
              Búsqueda de la Academia D5 Render —{" "}
              <span className="text-emerald-500/70 dark:text-emerald-400/70">
                60 temas · {glossaryTerms.length} términos · {troubleshootingItems.length} soluciones
              </span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

// ============================================================
// Page with Suspense boundary
// ============================================================

function BuscarFallback() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse flex items-center gap-2 text-gray-400">
            <Search className="w-5 h-5" />
            <span className="text-sm">Cargando búsqueda...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuscarPage() {
  return (
    <Suspense fallback={<BuscarFallback />}>
      <BuscarContent />
    </Suspense>
  );
}
