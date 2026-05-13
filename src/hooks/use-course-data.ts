"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useStudyStore } from "@/lib/store";
import { modules } from "@/lib/curriculum";
import { achievements as achievementDefs } from "@/lib/achievements";

// Types for course data
export interface CourseData {
  progress: Record<string, boolean>; // "modulo-1-0" -> true
  quizResults: Record<string, { score: number; total: number; answers: string }>; // "modulo-1" -> result
  notes: Record<string, string>; // "modulo-1-0" -> note content
  bookmarks: Record<string, boolean>; // "modulo-1-0" -> true
  achievements: Record<string, string>; // achievementId -> unlockedAt
  streak: { current: number; longest: number; lastDate: string | null };
  isLoading: boolean;

  // Actions
  toggleProgress: (moduleId: string, topicIndex: number) => Promise<void>;
  saveNote: (moduleId: string, topicIndex: number, content: string) => Promise<void>;
  toggleBookmark: (moduleId: string, topicIndex: number) => Promise<void>;
  saveQuizResult: (moduleId: string, score: number, total: number, answers: string) => Promise<void>;
  unlockAchievement: (achievementId: string) => Promise<void>;
  updateStreak: () => Promise<void>;
  resetAll: () => Promise<void>;

  // Computed helpers
  isTopicCompleted: (moduleId: string, topicIndex: number) => boolean;
  getModuleProgress: (moduleId: string) => number;
  getModuleCompletedCount: (moduleId: string) => number;
  getOverallProgress: () => number;
  getTotalCompletedTopics: () => number;
  getAverageQuizScore: () => number;
  getBookmarkedTopics: () => Array<{ moduleId: string; topicIndex: number; moduleName: string; topicName: string }>;
  isBookmarked: (moduleId: string, topicIndex: number) => boolean;
  getTopicNote: (moduleId: string, topicIndex: number) => string;
  getUnlockedCount: () => number;
  getTotalAchievements: () => number;
  checkAndUnlockAchievements: () => string[];
}

function makeKey(moduleId: string, topicIndex: number): string {
  return `${moduleId}-${topicIndex}`;
}

// Global cache for course DB ID
let cachedCourseId: string | null = null;

async function getCourseId(): Promise<string | null> {
  if (cachedCourseId) return cachedCourseId;
  try {
    const res = await fetch("/api/course?slug=d5-render");
    if (res.ok) {
      const data = await res.json();
      cachedCourseId = data.id;
      return cachedCourseId;
    }
  } catch {
    // ignore
  }
  return null;
}

export function useCourseData(): CourseData {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const store = useStudyStore();

  // State for DB-backed data
  const [dbData, setDbData] = useState<{
    progress: Record<string, boolean>;
    quizResults: Record<string, { score: number; total: number; answers: string }>;
    notes: Record<string, string>;
    bookmarks: Record<string, boolean>;
    achievements: Record<string, string>;
    streak: { current: number; longest: number; lastDate: string | null };
    topicLookup: Record<string, string>;
    moduleLookup: Record<string, string>;
  }>({
    progress: {},
    quizResults: {},
    notes: {},
    bookmarks: {},
    achievements: {},
    streak: { current: 0, longest: 0, lastDate: null },
    topicLookup: {},
    moduleLookup: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  // Load course data function
  const loadCourseData = useCallback(async () => {
    setIsLoading(true);
    try {
      const courseId = await getCourseId();
      if (!courseId) {
        setIsLoading(false);
        return;
      }

      const courseRes = await fetch(`/api/course-data?courseId=${courseId}`);
      if (courseRes.ok) {
        const data = await courseRes.json();
        if (data.error) {
          console.error("Error from API:", data.error);
        } else {
          setDbData({
            progress: data.progress || {},
            quizResults: data.quizResults || {},
            notes: data.notes || {},
            bookmarks: data.bookmarks || {},
            achievements: data.achievements || {},
            streak: data.streak || { current: 0, longest: 0, lastDate: null },
            topicLookup: data.topicLookup || {},
            moduleLookup: data.moduleLookup || {},
          });
        }
      }
    } catch (error) {
      console.error("Failed to load course data:", error);
    }
    setIsLoading(false);
  }, []);

  // Fetch all course data on mount for authenticated users
  useEffect(() => {
    if (status === "loading") return;

    if (isAuthenticated && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      loadCourseData();
    } else if (!isAuthenticated) {
      // Use a microtask to avoid calling setState synchronously in effect
      queueMicrotask(() => setIsLoading(false));
      hasFetchedRef.current = false;
    }
  }, [status, isAuthenticated, loadCourseData]);

  // --- API action functions ---

  const toggleProgress = useCallback(async (moduleId: string, topicIndex: number) => {
    const key = makeKey(moduleId, topicIndex);
    const wasCompleted = isAuthenticated ? !!dbData.progress[key] : store.isTopicCompleted(moduleId, topicIndex);
    const newCompleted = !wasCompleted;

    if (isAuthenticated) {
      // Optimistic update
      setDbData((prev) => {
        const newProgress = { ...prev.progress };
        if (newCompleted) {
          newProgress[key] = true;
        } else {
          delete newProgress[key];
        }
        return { ...prev, progress: newProgress };
      });

      const topicDbId = dbData.topicLookup[key];
      if (topicDbId) {
        try {
          await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topicId: topicDbId, completed: newCompleted }),
          });
          // Update streak when marking as complete
          if (newCompleted) {
            fetch("/api/streak", { method: "POST" }).then(async (res) => {
              if (res.ok) {
                const data = await res.json();
                setDbData((prev) => ({
                  ...prev,
                  streak: { current: data.current, longest: data.longest, lastDate: data.lastDate },
                }));
              }
            });
          }
        } catch (error) {
          console.error("Failed to toggle progress:", error);
          // Revert on error
          setDbData((prev) => {
            const revertedProgress = { ...prev.progress };
            if (wasCompleted) {
              revertedProgress[key] = true;
            } else {
              delete revertedProgress[key];
            }
            return { ...prev, progress: revertedProgress };
          });
        }
      }
    } else {
      store.toggleTopic(moduleId, topicIndex);
    }
  }, [isAuthenticated, dbData.progress, dbData.topicLookup, store]);

  const saveNote = useCallback(async (moduleId: string, topicIndex: number, content: string) => {
    const key = makeKey(moduleId, topicIndex);

    if (isAuthenticated) {
      setDbData((prev) => ({
        ...prev,
        notes: { ...prev.notes, [key]: content },
      }));

      const topicDbId = dbData.topicLookup[key];
      if (topicDbId) {
        try {
          await fetch("/api/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topicId: topicDbId, content }),
          });
        } catch (error) {
          console.error("Failed to save note:", error);
        }
      }
    } else {
      store.saveTopicNote(moduleId, topicIndex, content);
    }
  }, [isAuthenticated, dbData.topicLookup, store]);

  const toggleBookmark = useCallback(async (moduleId: string, topicIndex: number) => {
    const key = makeKey(moduleId, topicIndex);
    const wasBookmarked = isAuthenticated ? !!dbData.bookmarks[key] : store.isBookmarked(moduleId, topicIndex);
    const newBookmarked = !wasBookmarked;

    if (isAuthenticated) {
      setDbData((prev) => {
        const newBookmarks = { ...prev.bookmarks };
        if (newBookmarked) {
          newBookmarks[key] = true;
        } else {
          delete newBookmarks[key];
        }
        return { ...prev, bookmarks: newBookmarks };
      });

      const topicDbId = dbData.topicLookup[key];
      if (topicDbId) {
        try {
          await fetch("/api/bookmarks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topicId: topicDbId, bookmarked: newBookmarked }),
          });
        } catch (error) {
          console.error("Failed to toggle bookmark:", error);
          setDbData((prev) => {
            const revertedBookmarks = { ...prev.bookmarks };
            if (wasBookmarked) {
              revertedBookmarks[key] = true;
            } else {
              delete revertedBookmarks[key];
            }
            return { ...prev, bookmarks: revertedBookmarks };
          });
        }
      }
    } else {
      store.toggleBookmark(moduleId, topicIndex);
    }
  }, [isAuthenticated, dbData.bookmarks, dbData.topicLookup, store]);

  const saveQuizResult = useCallback(async (moduleId: string, score: number, total: number, answers: string) => {
    if (isAuthenticated) {
      setDbData((prev) => ({
        ...prev,
        quizResults: {
          ...prev.quizResults,
          [moduleId]: { score, total, answers },
        },
      }));

      const moduleDbId = dbData.moduleLookup[moduleId];
      if (moduleDbId) {
        try {
          await fetch("/api/quiz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ moduleId: moduleDbId, score, totalQuestions: total, answers }),
          });
          // Update streak when completing a quiz
          fetch("/api/streak", { method: "POST" }).then(async (res) => {
            if (res.ok) {
              const data = await res.json();
              setDbData((prev) => ({
                ...prev,
                streak: { current: data.current, longest: data.longest, lastDate: data.lastDate },
              }));
            }
          });
        } catch (error) {
          console.error("Failed to save quiz result:", error);
        }
      }
    } else {
      store.saveQuizResult({
        moduleId,
        score,
        totalQuestions: total,
        answers: JSON.parse(answers),
        completedAt: new Date().toISOString(),
      });
    }
  }, [isAuthenticated, dbData.moduleLookup, store]);

  const unlockAchievement = useCallback(async (achievementId: string) => {
    if (isAuthenticated) {
      if (dbData.achievements[achievementId]) return; // already unlocked

      setDbData((prev) => ({
        ...prev,
        achievements: {
          ...prev.achievements,
          [achievementId]: new Date().toISOString(),
        },
      }));

      try {
        await fetch("/api/achievements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ achievementId }),
        });
      } catch (error) {
        console.error("Failed to unlock achievement:", error);
      }
    } else {
      store.unlockAchievement(achievementId);
    }
  }, [isAuthenticated, dbData.achievements, store]);

  const updateStreak = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const res = await fetch("/api/streak", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          setDbData((prev) => ({
            ...prev,
            streak: {
              current: data.current,
              longest: data.longest,
              lastDate: data.lastDate,
            },
          }));
        }
      } catch (error) {
        console.error("Failed to update streak:", error);
      }
    } else {
      store.updateStudyDate();
    }
  }, [isAuthenticated, store]);

  const resetAll = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const courseId = await getCourseId();
        if (courseId) {
          await fetch("/api/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId }),
          });
        }
        setDbData((prev) => ({
          ...prev,
          progress: {},
          quizResults: {},
          notes: {},
          bookmarks: {},
          achievements: {},
          streak: { current: 0, longest: 0, lastDate: null },
        }));
      } catch (error) {
        console.error("Failed to reset:", error);
      }
    } else {
      store.resetAll();
    }
  }, [isAuthenticated, store]);

  // --- Computed helpers ---
  const isTopicCompleted = useCallback((moduleId: string, topicIndex: number): boolean => {
    const key = makeKey(moduleId, topicIndex);
    if (isAuthenticated) return !!dbData.progress[key];
    return store.isTopicCompleted(moduleId, topicIndex);
  }, [isAuthenticated, dbData.progress, store]);

  const getModuleProgress = useCallback((moduleId: string): number => {
    const mod = modules.find((m) => m.id === moduleId);
    if (!mod) return 0;
    let completed = 0;
    for (let i = 0; i < mod.topics.length; i++) {
      if (isTopicCompleted(moduleId, i)) completed++;
    }
    return Math.round((completed / mod.topics.length) * 100);
  }, [isTopicCompleted]);

  const getModuleCompletedCount = useCallback((moduleId: string): number => {
    const mod = modules.find((m) => m.id === moduleId);
    if (!mod) return 0;
    let count = 0;
    for (let i = 0; i < mod.topics.length; i++) {
      if (isTopicCompleted(moduleId, i)) count++;
    }
    return count;
  }, [isTopicCompleted]);

  const getOverallProgress = useCallback((): number => {
    let totalTopics = 0;
    let completedTopics = 0;
    for (const mod of modules) {
      totalTopics += mod.topics.length;
      for (let i = 0; i < mod.topics.length; i++) {
        if (isTopicCompleted(mod.id, i)) completedTopics++;
      }
    }
    if (totalTopics === 0) return 0;
    return Math.round((completedTopics / totalTopics) * 100);
  }, [isTopicCompleted]);

  const getTotalCompletedTopics = useCallback((): number => {
    let count = 0;
    for (const mod of modules) {
      for (let i = 0; i < mod.topics.length; i++) {
        if (isTopicCompleted(mod.id, i)) count++;
      }
    }
    return count;
  }, [isTopicCompleted]);

  const getAverageQuizScore = useCallback((): number => {
    if (isAuthenticated) {
      const results = Object.values(dbData.quizResults);
      if (results.length === 0) return 0;
      const totalPercentage = results.reduce(
        (sum, r) => sum + (r.score / r.total) * 100,
        0
      );
      return Math.round(totalPercentage / results.length);
    }
    return store.getAverageQuizScore();
  }, [isAuthenticated, dbData.quizResults, store]);

  const getBookmarkedTopics = useCallback((): Array<{ moduleId: string; topicIndex: number; moduleName: string; topicName: string }> => {
    const result: Array<{ moduleId: string; topicIndex: number; moduleName: string; topicName: string }> = [];

    if (isAuthenticated) {
      for (const mod of modules) {
        for (let i = 0; i < mod.topics.length; i++) {
          const key = makeKey(mod.id, i);
          if (dbData.bookmarks[key]) {
            result.push({
              moduleId: mod.id,
              topicIndex: i,
              moduleName: `Módulo ${mod.number}: ${mod.title}`,
              topicName: mod.topics[i].name,
            });
          }
        }
      }
    } else {
      return store.getBookmarkedTopics();
    }
    return result;
  }, [isAuthenticated, dbData.bookmarks, store]);

  const isBookmarked = useCallback((moduleId: string, topicIndex: number): boolean => {
    const key = makeKey(moduleId, topicIndex);
    if (isAuthenticated) return !!dbData.bookmarks[key];
    return store.isBookmarked(moduleId, topicIndex);
  }, [isAuthenticated, dbData.bookmarks, store]);

  const getTopicNote = useCallback((moduleId: string, topicIndex: number): string => {
    const key = makeKey(moduleId, topicIndex);
    if (isAuthenticated) return dbData.notes[key] || "";
    return store.getTopicNote(moduleId, topicIndex);
  }, [isAuthenticated, dbData.notes, store]);

  const getUnlockedCount = useCallback((): number => {
    if (isAuthenticated) return Object.keys(dbData.achievements).length;
    return store.getUnlockedCount();
  }, [isAuthenticated, dbData.achievements, store]);

  const getTotalAchievements = useCallback((): number => {
    return achievementDefs.length;
  }, []);

  const checkAndUnlockAchievements = useCallback((): string[] => {
    if (isAuthenticated) {
      // Build current state for achievement checking
      const currentState = {
        completedTopics: dbData.progress,
        quizResults: Object.fromEntries(
          Object.entries(dbData.quizResults).map(([k, v]) => [
            k,
            { moduleId: k, score: v.score, totalQuestions: v.total, answers: JSON.parse(v.answers || "{}"), completedAt: new Date().toISOString() },
          ])
        ),
        topicNotes: dbData.notes,
        currentStreak: dbData.streak.current,
        longestStreak: dbData.streak.longest,
        lastStudyDate: dbData.streak.lastDate,
        unlockedAchievements: dbData.achievements,
      };

      const newlyUnlocked: string[] = [];

      for (const achievement of achievementDefs) {
        if (!dbData.achievements[achievement.id]) {
          if (achievement.condition(() => currentState)) {
            // Fire and forget
            unlockAchievement(achievement.id);
            newlyUnlocked.push(achievement.id);
          }
        }
      }

      return newlyUnlocked;
    } else {
      return store.checkAndUnlockAchievements();
    }
  }, [isAuthenticated, dbData, store, unlockAchievement]);

  return {
    progress: isAuthenticated ? dbData.progress : store.completedTopics,
    quizResults: isAuthenticated
      ? dbData.quizResults
      : Object.fromEntries(
          Object.entries(store.quizResults).map(([k, v]) => [
            k,
            { score: v.score, total: v.totalQuestions, answers: JSON.stringify(v.answers) },
          ])
        ),
    notes: isAuthenticated ? dbData.notes : store.topicNotes,
    bookmarks: isAuthenticated ? dbData.bookmarks : store.bookmarks,
    achievements: isAuthenticated ? dbData.achievements : store.unlockedAchievements,
    streak: isAuthenticated
      ? dbData.streak
      : { current: store.currentStreak, longest: store.longestStreak, lastDate: store.lastStudyDate },
    isLoading: status === "loading" || (isAuthenticated && isLoading),
    toggleProgress,
    saveNote,
    toggleBookmark,
    saveQuizResult,
    unlockAchievement,
    updateStreak,
    resetAll,
    isTopicCompleted,
    getModuleProgress,
    getModuleCompletedCount,
    getOverallProgress,
    getTotalCompletedTopics,
    getAverageQuizScore,
    getBookmarkedTopics,
    isBookmarked,
    getTopicNote,
    getUnlockedCount,
    getTotalAchievements,
    checkAndUnlockAchievements,
  };
}
