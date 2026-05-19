"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
  useMemo,
} from "react";
import {
  Module,
  TopicInfo,
  QuizQuestion,
} from "@/lib/curriculum";
import { getTopicContent, TopicContent } from "@/lib/topic-content";
import { DEFAULT_COURSE_SLUG } from "@/lib/constants";

// Extended topic info that includes DB content
export interface TopicInfoWithContent extends TopicInfo {
  content?: string | null;
  number?: number;
  videoUrl?: string | null;
  attachments?: Array<{ name: string; url: string; type: string }> | null;
}

// Extended module that uses TopicInfoWithContent
export interface ModuleWithContent extends Omit<Module, "topics"> {
  topics: TopicInfoWithContent[];
}

interface CurriculumData {
  courseId: string;
  courseTitle: string;
  courseDescription: string | null;
  modules: ModuleWithContent[];
}

interface CurriculumContextType {
  modules: ModuleWithContent[];
  courseId: string;
  courseTitle: string;
  courseDescription: string | null;
  isLoading: boolean;
  error: string | null;
  courseSlug: string;
  /**
   * Get topic content: for D5 Render, checks hardcoded topic-content.ts first,
   * then falls back to DB content. For other courses, uses DB content.
   */
  getTopicContentFromDB: (
    moduleId: string,
    topicIndex: number
  ) => TopicContent | null;
}

const CurriculumContext = createContext<CurriculumContextType | null>(null);

// Global cache for curriculum data by slug
const curriculumCache: Record<string, CurriculumData> = {};

export function CurriculumProvider({
  courseSlug,
  children,
}: {
  courseSlug: string;
  children: ReactNode;
}) {
  // Initialize from cache if available
  const cached = curriculumCache[courseSlug];
  const [data, setData] = useState<CurriculumData | null>(cached || null);
  const [isLoading, setIsLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!courseSlug) return;

    // If we already have cached data for this slug, use it (no setState needed - already set in initial state)
    if (curriculumCache[courseSlug]) {
      return;
    }

    // Prevent duplicate fetches
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    let cancelled = false;

    async function fetchCurriculum() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/curriculum?slug=${courseSlug}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to load curriculum");
        }

        const curriculumData: CurriculumData = await res.json();

        if (!cancelled) {
          // Cache the data
          curriculumCache[courseSlug] = curriculumData;
          setData(curriculumData);
          setIsLoading(false);
          isFetchingRef.current = false;
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load curriculum"
          );
          setIsLoading(false);
          isFetchingRef.current = false;
        }
      }
    }

    fetchCurriculum();

    return () => {
      cancelled = true;
    };
  }, [courseSlug]);

  const getTopicContentFromDB = useCallback(
    (moduleId: string, topicIndex: number): TopicContent | null => {
      // For D5 Render, always check hardcoded content first
      if (courseSlug === DEFAULT_COURSE_SLUG) {
        const hardcoded = getTopicContent(moduleId, topicIndex);
        if (hardcoded) return hardcoded;
      }

      // Try to get content from the DB-loaded modules
      if (!data) return null;

      const mod = data.modules.find((m) => m.id === moduleId);
      if (!mod) return null;

      const topic = mod.topics[topicIndex];
      if (!topic || !topic.content) return null;

      // Parse DB content as rich text
      // If the content is structured JSON, try to parse it
      try {
        const parsed = JSON.parse(topic.content);
        if (parsed && typeof parsed === "object" && parsed.explanation) {
          return {
            moduleId,
            topicIndex,
            title: topic.name,
            objective: parsed.objective || "",
            explanation: parsed.explanation || "",
            keyPoints: parsed.keyPoints || [],
            steps: parsed.steps || [],
            practice: parsed.practice || "",
            extraResources: parsed.extraResources || [],
          };
        }
      } catch {
        // Not JSON, treat as plain text content
      }

      // Plain text content - wrap it in a TopicContent structure
      // Auto-generate keyPoints and practice from the content
      const sentences = topic.content
        .split(/\.\s+/)
        .filter((s: string) => s.trim().length > 15);
      const autoKeyPoints = sentences.slice(0, 5).map((s: string) => s.trim() + (s.trim().endsWith('.') ? '' : '.'));

      return {
        moduleId,
        topicIndex,
        title: topic.name,
        objective: `Comprender y aplicar los conceptos de: ${topic.name}`,
        explanation: topic.content,
        keyPoints: autoKeyPoints,
        steps: [],
        practice: `Practica los conceptos aprendidos en este tema. Revisa los puntos clave e intenta explicarlos con tus propias palabras. Si es posible, implementa un pequeño ejemplo práctico relacionado con ${topic.name}.`,
        extraResources: [],
      };
    },
    [courseSlug, data]
  );

  const contextValue: CurriculumContextType = useMemo(() => ({
    modules: data?.modules || [],
    courseId: data?.courseId || "",
    courseTitle: data?.courseTitle || "",
    courseDescription: data?.courseDescription || null,
    isLoading,
    error,
    courseSlug,
    getTopicContentFromDB,
  }), [data, isLoading, error, courseSlug, getTopicContentFromDB]);

  return (
    <CurriculumContext.Provider value={contextValue}>
      {children}
    </CurriculumContext.Provider>
  );
}

export function useCurriculum(): CurriculumContextType {
  const context = useContext(CurriculumContext);
  if (!context) {
    // Return a safe default instead of throwing
    // This allows pages outside of a CurriculumProvider to use useCourse() safely
    return {
      modules: [],
      courseId: "",
      courseTitle: "",
      courseDescription: null,
      isLoading: false,
      error: null,
      courseSlug: DEFAULT_COURSE_SLUG,
      getTopicContentFromDB: () => null,
    };
  }
  return context;
}

export function useCurriculumModules(): ModuleWithContent[] {
  const { modules } = useCurriculum();
  return modules;
}
