"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Bookmark,
  Clock,
  Home,
  X,
} from "lucide-react";
import { modules } from "@/lib/curriculum";
import { useStudyStore } from "@/lib/store";

export default function MarcadoresPage() {
  const router = useRouter();
  const bookmarkedTopics = useStudyStore((s) => s.getBookmarkedTopics());
  const toggleBookmark = useStudyStore((s) => s.toggleBookmark);

  // Group bookmarks by module
  const groupedBookmarks = bookmarkedTopics.reduce<
    Record<string, typeof bookmarkedTopics>
  >((acc, item) => {
    if (!acc[item.moduleId]) acc[item.moduleId] = [];
    acc[item.moduleId].push(item);
    return acc;
  }, {});

  const diffColors: Record<string, string> = {
    basico: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    intermedio: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    avanzado: "bg-red-500/15 text-red-400 border-red-500/20",
  };

  const diffLabels: Record<string, string> = {
    basico: "Básico",
    intermedio: "Intermedio",
    avanzado: "Avanzado",
  };

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
              <Bookmark className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Mis{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  Marcadores
                </span>
              </h1>
              <p className="text-sm text-gray-400">
                {bookmarkedTopics.length} tema{bookmarkedTopics.length !== 1 ? "s" : ""} guardado{bookmarkedTopics.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        {bookmarkedTopics.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="glass-card rounded-xl p-8 text-center">
              <Bookmark className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Sin marcadores aún
              </h2>
              <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
                Añade marcadores a los temas que te interesen para acceder a ellos rápidamente. Haz clic en el icono de marcador en cualquier tema.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
              >
                <Home className="w-4 h-4" />
                Ir al inicio
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedBookmarks).map(
              ([moduleId, topics], groupIndex) => {
                const mod = modules.find((m) => m.id === moduleId);
                if (!mod) return null;
                return (
                  <motion.div
                    key={moduleId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: groupIndex * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 text-xs">
                        Módulo {mod.number}
                      </Badge>
                      <h2 className="text-sm font-semibold text-white">
                        {mod.title}
                      </h2>
                      <div className="flex-1 h-px bg-white/5" />
                      <span className="text-xs text-gray-500">
                        {topics.length} tema{topics.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {topics.map((topic, index) => {
                        const topicInfo = mod.topics[topic.topicIndex];
                        return (
                          <motion.div
                            key={`${topic.moduleId}-${topic.topicIndex}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: groupIndex * 0.1 + index * 0.05,
                            }}
                            className="glass-card glass-card-hover rounded-xl p-4 transition-all duration-300 group"
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  router.push(
                                    `/modulo/${topic.moduleId}/tema/${topic.topicIndex}`
                                  )
                                }
                                className="flex-1 flex items-center gap-3 text-left min-w-0"
                              >
                                <span className="text-gray-500 text-xs shrink-0">
                                  {topic.topicIndex + 1}.
                                </span>
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  {topic.topicName}
                                </span>
                                {topicInfo && (
                                  <>
                                    <Badge
                                      className={`text-[9px] px-1.5 py-0 ${diffColors[topicInfo.difficulty]} shrink-0`}
                                    >
                                      {diffLabels[topicInfo.difficulty]}
                                    </Badge>
                                    <span className="text-[10px] text-gray-500 shrink-0 flex items-center gap-0.5">
                                      <Clock className="w-2.5 h-2.5" />
                                      {topicInfo.estimatedTime}
                                    </span>
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  toggleBookmark(topic.moduleId, topic.topicIndex)
                                }
                                className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-red-400 transition-colors shrink-0"
                                title="Quitar marcador"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Marcadores de la Academia D5 Render —{" "}
              <span className="text-emerald-400/70">
                {bookmarkedTopics.length} tema{bookmarkedTopics.length !== 1 ? "s" : ""} guardado{bookmarkedTopics.length !== 1 ? "s" : ""}
              </span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
