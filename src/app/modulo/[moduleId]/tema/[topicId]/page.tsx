"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  Lightbulb,
  ListChecks,
  PenLine,
  Target,
  ExternalLink,
  Home,
} from "lucide-react";
import { modules } from "@/lib/curriculum";
import { getTopicContent } from "@/lib/topic-content";
import { useStudyStore } from "@/lib/store";
import { ThemeToggle } from "@/components/theme-toggle";

function TopicNotes({ moduleId, topicIndex }: { moduleId: string; topicIndex: number }) {
  const saveTopicNote = useStudyStore((s) => s.saveTopicNote);
  const getTopicNote = useStudyStore((s) => s.getTopicNote);
  const [noteText, setNoteText] = useState(() => getTopicNote(moduleId, topicIndex));
  const [savedIndicator, setSavedIndicator] = useState(false);

  // Debounced auto-save for notes
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentNote = getTopicNote(moduleId, topicIndex);
      if (noteText !== currentNote) {
        saveTopicNote(moduleId, topicIndex, noteText);
        setSavedIndicator(true);
        const hideTimer = setTimeout(() => setSavedIndicator(false), 2000);
        return () => clearTimeout(hideTimer);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [noteText, moduleId, topicIndex, getTopicNote, saveTopicNote]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PenLine className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Mis Notas</h2>
        </div>
        {savedIndicator && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-emerald-500/70 dark:text-emerald-400/70"
          >
            Guardado
          </motion.span>
        )}
      </div>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Escribe tus notas personales sobre este tema aquí..."
        rows={5}
        className="w-full bg-gray-100 dark:bg-white/3 border border-gray-200 dark:border-white/8 rounded-lg px-4 py-3 text-gray-600 dark:text-gray-300 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/15 resize-y transition-colors"
      />
    </motion.section>
  );
}

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  const topicIndex = parseInt(params.topicId as string, 10);

  const moduleData = modules.find((m) => m.id === moduleId);
  const content = getTopicContent(moduleId, topicIndex);

  const toggleTopic = useStudyStore((s) => s.toggleTopic);
  const isCompleted = useStudyStore((s) => s.isTopicCompleted(moduleId, topicIndex));
  const toggleBookmark = useStudyStore((s) => s.toggleBookmark);
  const bookmarked = useStudyStore((s) => s.isBookmarked(moduleId, topicIndex));

  if (!moduleData || topicIndex < 0 || topicIndex >= moduleData.topics.length) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tema no encontrado</h2>
          <p className="text-gray-500 dark:text-gray-400">El tema que buscas no existe.</p>
          <Button onClick={() => router.push("/")} className="bg-emerald-600 hover:bg-emerald-500 text-white">
            <Home className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  const topicInfo = moduleData.topics[topicIndex];
  const topicTitle = topicInfo.name;
  const totalTopics = moduleData.topics.length;
  const hasPrev = topicIndex > 0;
  const hasNext = topicIndex < totalTopics - 1;

  const prevPath = hasPrev ? `/modulo/${moduleId}/tema/${topicIndex - 1}` : null;
  const nextPath = hasNext ? `/modulo/${moduleId}/tema/${topicIndex + 1}` : null;

  const notesKey = `${moduleId}-${topicIndex}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-400 flex-wrap">
            <button
              onClick={() => router.push("/")}
              className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              Inicio
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 dark:text-gray-500">Módulo {moduleData.number}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 dark:text-gray-500">{moduleData.title}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-emerald-500 dark:text-emerald-400">Tema {topicIndex + 1}</span>
          </nav>
          <ThemeToggle />
        </div>

        {/* Module hero banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-52 rounded-xl overflow-hidden mb-8"
        >
          <Image
            src={`/images/modules/modulo-${moduleData.number}.png`}
            alt={`Módulo ${moduleData.number}: ${moduleData.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/40 to-transparent dark:from-zinc-950 dark:via-zinc-950/40 dark:to-transparent" />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs">
                  Módulo {moduleData.number}
                </Badge>
                <Badge className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 text-xs">
                  Tema {topicIndex + 1} de {totalTopics}
                </Badge>
                <Badge className={`text-xs ${
                  topicInfo.difficulty === 'basico'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : topicInfo.difficulty === 'intermedio'
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20'
                      : 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20'
                }`}>
                  {topicInfo.difficulty === 'basico' ? 'Básico' : topicInfo.difficulty === 'intermedio' ? 'Intermedio' : 'Avanzado'}
                </Badge>
                <Badge className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {topicInfo.estimatedTime}
                </Badge>
                {isCompleted && (
                  <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/30 text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completado
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {topicTitle}
              </h1>
              {content && (
                <div className="flex items-center gap-2 text-sm text-emerald-600/80 dark:text-emerald-400/80">
                  <Target className="w-4 h-4" />
                  <span>{content.objective}</span>
                </div>
              )}
            </div>

            {/* Complete toggle + Bookmark */}
            <div className="flex items-center gap-3 shrink-0">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleBookmark(moduleId, topicIndex)}
                className="p-2.5 rounded-lg glass-card transition-colors hover:bg-gray-200 dark:hover:bg-white/6"
                title={bookmarked ? "Quitar marcador" : "Añadir marcador"}
              >
                {bookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <Bookmark className="w-5 h-5 text-gray-400" />
                )}
              </motion.button>
              <div className="flex items-center gap-2 glass-card rounded-lg px-4 py-2.5">
                <Checkbox
                  id="topic-complete"
                  checked={isCompleted}
                  onCheckedChange={() => toggleTopic(moduleId, topicIndex)}
                  className="border-gray-300 dark:border-white/20 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                />
                <label
                  htmlFor="topic-complete"
                  className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer select-none"
                >
                  Marcar como completado
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {content ? (
          <div className="space-y-8">
            {/* Explanation */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Explicación</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                {content.explanation.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>

            {/* Key Points */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Puntos Clave</h2>
              </div>
              <ul className="space-y-3">
                {content.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Steps / Tutorial */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <ListChecks className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tutorial Paso a Paso</h2>
              </div>
              <div className="space-y-6">
                {content.steps.map((step, i) => (
                  <div key={i} className="relative">
                    {i < content.steps.length - 1 && (
                      <div className="absolute left-5 top-12 bottom-0 w-px bg-emerald-500/20" />
                    )}
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold shrink-0 text-sm border border-emerald-500/20">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
                        {step.tip && (
                          <div className="mt-2 flex items-start gap-2 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2">
                            <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span className="text-amber-600/80 dark:text-amber-300/80 text-xs">{step.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Practice */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="glass-card rounded-xl p-6 border-emerald-500/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Práctica</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{content.practice}</p>
            </motion.section>

            {/* Personal Notes */}
            <TopicNotes key={notesKey} moduleId={moduleId} topicIndex={topicIndex} />

            {/* Extra Resources */}
            {content.extraResources.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <ExternalLink className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recursos Adicionales</h2>
                </div>
                <div className="space-y-2">
                  {content.extraResources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors group"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="group-hover:underline">{res.label}</span>
                    </a>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="glass-card rounded-xl p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Contenido en desarrollo</h2>
              <p className="text-gray-500 dark:text-gray-400">
                El contenido detallado para este tema aún no está disponible. Mientras tanto,
                puedes marcar el tema como completado si ya lo has estudiado.
              </p>
            </div>

            {/* Personal Notes (shown even when content is not available) */}
            <TopicNotes key={notesKey} moduleId={moduleId} topicIndex={topicIndex} />
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 flex items-center justify-between gap-4"
        >
          {prevPath ? (
            <Button
              variant="outline"
              onClick={() => router.push(prevPath)}
              className="border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Tema {topicIndex}</span>
              <span className="sm:hidden">Anterior</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white gap-2"
            >
              <Home className="w-4 h-4" />
              Inicio
            </Button>
          )}

          <div className="flex items-center gap-1">
            {moduleData.topics.map((_, i) => (
              <button
                key={i}
                onClick={() => router.push(`/modulo/${moduleId}/tema/${i}`)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === topicIndex
                    ? "bg-emerald-500 dark:bg-emerald-400 w-6"
                    : useStudyStore.getState().isTopicCompleted(moduleId, i)
                      ? "bg-emerald-500/50"
                      : "bg-gray-300 dark:bg-white/10 hover:bg-gray-400 dark:hover:bg-white/20"
                }`}
              />
            ))}
          </div>

          {nextPath ? (
            <Button
              onClick={() => router.push(nextPath)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
            >
              <span className="hidden sm:inline">Tema {topicIndex + 2}</span>
              <span className="sm:hidden">Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
            >
              Finalizar
              <CheckCircle2 className="w-4 h-4" />
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
