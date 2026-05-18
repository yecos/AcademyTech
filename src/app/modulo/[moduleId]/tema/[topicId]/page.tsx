"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  Home,
  Lightbulb,
  ListChecks,
  PenLine,
  Target,
  ExternalLink,
  Code2,
} from "lucide-react";
import { useCurriculum, CurriculumProvider } from "@/hooks/use-curriculum";
import { useCourse, useCourseSlug, CourseDataProvider } from "@/hooks/use-course-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import {
  CodeSandbox,
  CodeBlockWithSandbox,
} from "@/components/CodeSandbox";
import {
  parseCodeBlocks,
  hasCodeBlocks,
  type ContentSegment,
  type CodeBlock,
} from "@/lib/code-block-parser";
import { useCategoryTheme, CategoryThemeProvider } from "@/components/CategoryThemeProvider";
import { CategoryBackground } from "@/components/CategoryBackground";

// Component to render parsed content segments (text + code blocks)
function ContentWithCodeBlocks({ content }: { content: string }) {
  const parsed = useMemo(() => parseCodeBlocks(content), [content]);

  if (parsed.codeBlocks.length === 0) {
    // No code blocks - render as plain text paragraphs
    return (
      <div className="prose prose-invert max-w-none">
        {content.split("\n\n").map((paragraph, i) => (
          <p
            key={i}
            className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  // Has code blocks - render segments
  return (
    <div className="space-y-4">
      {parsed.segments.map((segment: ContentSegment, i: number) => {
        if (segment.type === "text") {
          return (
            <div key={`text-${i}`} className="prose prose-invert max-w-none">
              {segment.content.split("\n\n").map((paragraph, j) => (
                <p
                  key={j}
                  className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          );
        }

        if (segment.type === "code") {
          const block = segment.block;
          const filename =
            block.filename ||
            (block.language === "html"
              ? "index.html"
              : block.language === "css"
                ? "styles.css"
                : "script.js");

          return (
            <CodeBlockWithSandbox
              key={`code-${block.index}`}
              code={block.code}
              language={block.language as "html" | "css" | "javascript"}
              filename={filename}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

function TopicNotes({
  moduleId,
  topicIndex,
}: {
  moduleId: string;
  topicIndex: number;
}) {
  const course = useCourse();
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;
  const [noteText, setNoteText] = useState(() =>
    course.getTopicNote(moduleId, topicIndex)
  );
  const [savedIndicator, setSavedIndicator] = useState(false);

  // Debounced auto-save for notes
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentNote = course.getTopicNote(moduleId, topicIndex);
      if (noteText !== currentNote) {
        course.saveNote(moduleId, topicIndex, noteText);
        setSavedIndicator(true);
        const hideTimer = setTimeout(() => setSavedIndicator(false), 2000);
        return () => clearTimeout(hideTimer);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [noteText, moduleId, topicIndex, course]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PenLine className={`w-5 h-5 ${tw.text} ${tw.textDark}`} />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Mis Notas
          </h2>
        </div>
        {savedIndicator && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-xs ${tw.text} ${tw.textDark} opacity-70`}
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
        className={`w-full bg-gray-100 dark:bg-white/3 border border-gray-200 dark:border-white/8 rounded-lg px-4 py-3 text-gray-600 dark:text-gray-300 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none ${tw.border} ${tw.borderDark} focus:ring-1 ${tw.bg} ${tw.bgDark} resize-y transition-colors`}
      />
    </motion.section>
  );
}

// Interactive Code Sandbox Section
function CodeSandboxSection() {
  const [showSandbox, setShowSandbox] = useState(false);
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.28 }}
      className={`glass-card rounded-xl overflow-hidden ${tw.border} ${tw.borderDark}`}
    >
      {!showSandbox ? (
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className={`w-5 h-5 ${tw.text} ${tw.textDark}`} />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sandbox de Código
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">
            Practica escribiendo HTML, CSS y JavaScript directamente en el
            navegador. Escribe código y ejecútalo para ver los resultados al
            instante.
          </p>
          <Button
            onClick={() => setShowSandbox(true)}
            className={`${tw.button} text-white gap-2`}
          >
            <Code2 className="w-4 h-4" />
            Abrir Sandbox
          </Button>
        </div>
      ) : (
        <CodeSandbox
          title="Sandbox de Código"
          isExpanded={true}
          onClose={() => setShowSandbox(false)}
        />
      )}
    </motion.section>
  );
}

export default function TopicPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Cargando tema...</p>
        </div>
      </div>
    }>
      <TopicPageWithProvider />
    </Suspense>
  );
}

// Wrapper that provides the correct curriculum based on the course query param
function TopicPageWithProvider() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course") || "d5-render";

  const [categorySlug, setCategorySlug] = useState<string>("arquitectura");

  useEffect(() => {
    async function fetchCourseCategory() {
      try {
        const res = await fetch(`/api/course?slug=${courseSlug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.category?.slug) {
            setCategorySlug(data.category.slug);
          }
        }
      } catch (error) {
        console.error("Failed to fetch course category:", error);
      }
    }
    fetchCourseCategory();
  }, [courseSlug]);

  return (
    <CategoryThemeProvider slug={categorySlug} animated={true}>
      <CurriculumProvider courseSlug={courseSlug}>
        <CourseDataProvider courseSlug={courseSlug}>
          <TopicPageContent courseSlug={courseSlug} />
        </CourseDataProvider>
      </CurriculumProvider>
    </CategoryThemeProvider>
  );
}

function TopicPageContent({ courseSlug }: { courseSlug: string }) {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  const topicIndex = parseInt(params.topicId as string, 10);

  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;

  // Use the course slug from the query param to get the right curriculum
  const { modules, getTopicContentFromDB, isLoading: curriculumLoading, courseTitle, error: curriculumError } = useCurriculum();

  // Build course URL prefix based on slug
  const courseUrl = `/curso/${courseSlug}`;

  const moduleData = modules.find((m) => m.id === moduleId);
  const content = getTopicContentFromDB(moduleId, topicIndex);

  const course = useCourse();
  const toggleTopic = course.toggleProgress;
  const isCompleted = course.isTopicCompleted(moduleId, topicIndex);
  const toggleBookmark = course.toggleBookmark;
  const bookmarked = course.isBookmarked(moduleId, topicIndex);

  // Show loading state while curriculum is being fetched
  if (curriculumLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
        <CategoryBackground showPattern={false} />
        <div className="text-center space-y-4 relative z-10">
          <div
            className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto"
            style={{ borderColor: theme.primaryColor, borderTopColor: 'transparent' }}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">Cargando tema...</p>
        </div>
      </div>
    );
  }

  // Show error state if curriculum failed to load
  if (curriculumError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
        <CategoryBackground showPattern={false} />
        <div className="text-center space-y-4 max-w-md px-4 relative z-10">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Error al cargar el tema
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {curriculumError}
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => window.location.reload()}
              className={`${tw.button} text-white gap-2`}
            >
              Reintentar
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="border-gray-200 dark:border-white/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (
    !moduleData ||
    topicIndex < 0 ||
    topicIndex >= moduleData.topics.length
  ) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <CategoryBackground showPattern={false} />
        <div className="text-center space-y-4 relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tema no encontrado
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            El tema que buscas no existe.
          </p>
          <Button
            onClick={() => router.push("/")}
            className={`${tw.button} text-white`}
          >
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

  const prevPath = hasPrev
    ? `/modulo/${moduleId}/tema/${topicIndex - 1}?course=${courseSlug}`
    : null;
  const nextPath = hasNext
    ? `/modulo/${moduleId}/tema/${topicIndex + 1}?course=${courseSlug}`
    : null;

  const notesKey = `${moduleId}-${topicIndex}`;

  // Check if explanation has code blocks
  const explanationHasCode = content
    ? hasCodeBlocks(content.explanation)
    : false;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Category-themed background */}
      <CategoryBackground />

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6 z-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-400 flex-wrap">
            <button
              onClick={() => router.push("/")}
              className={`${tw.text} ${tw.textDark} transition-colors flex items-center gap-1 hover:opacity-80`}
            >
              <Home className="w-3.5 h-3.5" />
              Inicio
            </button>
            <ChevronRight className="w-3 h-3" />
            <button
              onClick={() => router.push(courseUrl)}
              className={`${tw.text} ${tw.textDark} transition-colors hover:opacity-80`}
            >
              {courseTitle || (courseSlug === "d5-render" ? "D5 Render" : courseSlug)}
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 dark:text-gray-500">
              Módulo {moduleData.number}
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 dark:text-gray-500">
              {moduleData.title}
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className={`${tw.text} ${tw.textDark}`}>
              Tema {topicIndex + 1}
            </span>
          </nav>
          <div className="flex items-center gap-2">
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>

        {/* Module hero banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-52 rounded-xl overflow-hidden mb-8"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${tw.gradient} opacity-30`} />
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-6 left-8 w-24 h-24 rounded-full border-2 border-white/30" />
            <div className="absolute bottom-4 right-12 w-16 h-16 rounded-full border border-white/20" />
            <div className="absolute top-3 right-1/4 w-10 h-10 rounded-full bg-white/10" />
            <div className="absolute bottom-8 left-1/3 w-12 h-12 rounded-full border border-white/15" />
          </div>
          {/* Module number overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-black text-white/15">{String(moduleData.number).padStart(2, '0')}</span>
          </div>
          {/* Bottom gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/40 to-transparent dark:from-zinc-950 dark:via-zinc-950/40 dark:to-transparent" />
          {/* Category-colored bottom border */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tw.gradient}`} />
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
                <Badge className={`${tw.badge} ${tw.badgeDark} text-xs border`}>
                  Módulo {moduleData.number}
                </Badge>
                <Badge className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 text-xs">
                  Tema {topicIndex + 1} de {totalTopics}
                </Badge>
                <Badge
                  className={`text-xs ${
                    topicInfo.difficulty === "basico"
                      ? `${tw.badge} ${tw.badgeDark} border`
                      : topicInfo.difficulty === "intermedio"
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        : "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20"
                  }`}
                >
                  {topicInfo.difficulty === "basico"
                    ? "Básico"
                    : topicInfo.difficulty === "intermedio"
                      ? "Intermedio"
                      : "Avanzado"}
                </Badge>
                <Badge className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {topicInfo.estimatedTime}
                </Badge>
                {isCompleted && (
                  <Badge className={`${tw.iconBg} ${tw.iconBgDark} ${tw.text} ${tw.textDark} text-xs border`}>
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completado
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {topicTitle}
              </h1>
              {content && (
                <div className={`flex items-center gap-2 text-sm ${tw.text} ${tw.textDark} opacity-80`}>
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
                  <BookmarkCheck className={`w-5 h-5 ${tw.text} ${tw.textDark}`} />
                ) : (
                  <Bookmark className="w-5 h-5 text-gray-400" />
                )}
              </motion.button>
              <div className="flex items-center gap-2 glass-card rounded-lg px-4 py-2.5">
                <Checkbox
                  id="topic-complete"
                  checked={isCompleted}
                  onCheckedChange={() => toggleTopic(moduleId, topicIndex)}
                  className="border-gray-300 dark:border-white/20"
                  style={isCompleted ? {
                    backgroundColor: theme.primaryColor,
                    borderColor: theme.primaryColor,
                  } : undefined}
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
            {/* Explanation - with code block support */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className={`w-5 h-5 ${tw.text} ${tw.textDark}`} />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Explicación
                </h2>
                {explanationHasCode && (
                  <Badge className={`${tw.badge} ${tw.badgeDark} text-xs ml-2 border`}>
                    <Code2 className="w-3 h-3 mr-1" />
                    Código interactivo
                  </Badge>
                )}
              </div>
              <ContentWithCodeBlocks content={content.explanation} />
            </motion.section>

            {/* Key Points - only show if there are key points */}
            {content.keyPoints.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className={`w-5 h-5 ${tw.text} ${tw.textDark}`} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Puntos Clave
                  </h2>
                </div>
                <ul className="space-y-3">
                  {content.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full ${tw.bg} ${tw.bgDark} ${tw.text} ${tw.textDark} text-xs font-bold shrink-0 mt-0.5`}>
                        {i + 1}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Steps / Tutorial - only show if there are steps */}
            {content.steps.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <ListChecks className={`w-5 h-5 ${tw.text} ${tw.textDark}`} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Tutorial Paso a Paso
                  </h2>
                </div>
                <div className="space-y-6">
                  {content.steps.map((step, i) => (
                    <div key={i} className="relative">
                      {i < content.steps.length - 1 && (
                        <div className={`absolute left-5 top-12 bottom-0 w-px ${tw.border} ${tw.borderDark}`} />
                      )}
                      <div className="flex items-start gap-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${tw.iconBg} ${tw.iconBgDark} ${tw.text} ${tw.textDark} font-bold shrink-0 text-sm`}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                            {step.title}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                            {step.description}
                          </p>
                          {step.tip && (
                            <div className="mt-2 flex items-start gap-2 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2">
                              <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                              <span className="text-amber-600/80 dark:text-amber-300/80 text-xs">
                                {step.tip}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Practice - only show if there is practice content */}
            {content.practice && content.practice.trim() && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className={`glass-card rounded-xl p-6 ${tw.border} ${tw.borderDark}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Eye className={`w-5 h-5 ${tw.text} ${tw.textDark}`} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Práctica
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  {content.practice}
                </p>
              </motion.section>
            )}

            {/* Interactive Code Sandbox Section */}
            <CodeSandboxSection />

            {/* Personal Notes */}
            <TopicNotes
              key={notesKey}
              moduleId={moduleId}
              topicIndex={topicIndex}
            />

            {/* Extra Resources */}
            {content.extraResources.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <ExternalLink className={`w-5 h-5 ${tw.text} ${tw.textDark}`} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recursos Adicionales
                  </h2>
                </div>
                <div className="space-y-2">
                  {content.extraResources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-sm ${tw.text} ${tw.textDark} transition-colors group hover:opacity-80`}
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Contenido en desarrollo
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                El contenido detallado para este tema aún no está disponible.
                Mientras tanto, puedes marcar el tema como completado si ya lo
                has estudiado.
              </p>
            </div>

            {/* Still show sandbox even when content is not available */}
            <CodeSandboxSection />

            {/* Personal Notes (shown even when content is not available) */}
            <TopicNotes
              key={notesKey}
              moduleId={moduleId}
              topicIndex={topicIndex}
            />
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
              onClick={() => router.push(courseUrl)}
              className="border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white gap-2"
            >
              <Home className="w-4 h-4" />
              Curso
            </Button>
          )}

          <div className="flex items-center gap-1">
            {moduleData.topics.map((_, i) => (
              <button
                key={i}
                onClick={() =>
                  router.push(`/modulo/${moduleId}/tema/${i}?course=${courseSlug}`)
                }
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === topicIndex
                    ? `${tw.button} text-white w-6`
                    : course.isTopicCompleted(moduleId, i)
                      ? `${tw.bg} ${tw.bgDark}`
                      : "bg-gray-300 dark:bg-white/10 hover:bg-gray-400 dark:hover:bg-white/20"
                }`}
              />
            ))}
          </div>

          {nextPath ? (
            <Button
              onClick={() => router.push(nextPath)}
              className={`${tw.button} text-white gap-2`}
            >
              <span className="hidden sm:inline">
                Tema {topicIndex + 2}
              </span>
              <span className="sm:hidden">Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={() => router.push(courseUrl)}
              className={`${tw.button} text-white gap-2`}
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
