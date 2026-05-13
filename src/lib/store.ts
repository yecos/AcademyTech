import { create } from "zustand";
import { persist } from "zustand/middleware";
import { modules } from "./curriculum";

interface QuizResult {
  moduleId: string;
  score: number;
  totalQuestions: number;
  answers: Record<string, string>; // questionId -> selected answer label
  completedAt: string;
}

interface StudyStore {
  completedTopics: Record<string, boolean>; // "moduleId-topicIndex" -> true
  quizResults: Record<string, QuizResult>; // moduleId -> QuizResult
  topicNotes: Record<string, string>; // "moduleId-topicIndex" -> note text
  bookmarks: Record<string, boolean>; // "moduleId-topicIndex" -> true

  // Navigation state
  currentView: 'modules' | 'topic';
  selectedModule: string | null;
  selectedTopic: number | null;

  // Actions
  toggleTopic: (moduleId: string, topicIndex: number) => void;
  isTopicCompleted: (moduleId: string, topicIndex: number) => boolean;
  getModuleProgress: (moduleId: string) => number;
  getOverallProgress: () => number;
  getModuleCompletedCount: (moduleId: string) => number;
  getModuleTotalCount: (moduleId: string) => number;
  saveQuizResult: (result: QuizResult) => void;
  getQuizResult: (moduleId: string) => QuizResult | undefined;
  getTotalCompletedTopics: () => number;
  getTotalTopics: () => number;
  getAverageQuizScore: () => number;
  resetAll: () => void;
  navigateToTopic: (moduleId: string, topicIndex: number) => void;
  navigateToModules: () => void;

  // Notes actions
  saveTopicNote: (moduleId: string, topicIndex: number, note: string) => void;
  getTopicNote: (moduleId: string, topicIndex: number) => string;

  // Bookmarks actions
  toggleBookmark: (moduleId: string, topicIndex: number) => void;
  isBookmarked: (moduleId: string, topicIndex: number) => boolean;
  getBookmarkedTopics: () => Array<{ moduleId: string; topicIndex: number; moduleName: string; topicName: string }>;
}

export const useStudyStore = create<StudyStore>()(
  persist(
    (set, get) => ({
      completedTopics: {},
      quizResults: {},
      topicNotes: {},
      bookmarks: {},
      currentView: 'modules' as const,
      selectedModule: null,
      selectedTopic: null,

      toggleTopic: (moduleId: string, topicIndex: number) => {
        const key = `${moduleId}-${topicIndex}`;
        set((state) => {
          const newCompleted = { ...state.completedTopics };
          if (newCompleted[key]) {
            delete newCompleted[key];
          } else {
            newCompleted[key] = true;
          }
          return { completedTopics: newCompleted };
        });
      },

      isTopicCompleted: (moduleId: string, topicIndex: number) => {
        const key = `${moduleId}-${topicIndex}`;
        return !!get().completedTopics[key];
      },

      getModuleCompletedCount: (moduleId: string) => {
        const state = get();
        const mod = modules.find((m) => m.id === moduleId);
        if (!mod) return 0;
        let count = 0;
        for (let i = 0; i < mod.topics.length; i++) {
          if (state.completedTopics[`${moduleId}-${i}`]) {
            count++;
          }
        }
        return count;
      },

      getModuleTotalCount: (moduleId: string) => {
        const mod = modules.find((m) => m.id === moduleId);
        return mod ? mod.topics.length : 0;
      },

      getModuleProgress: (moduleId: string) => {
        const state = get();
        const mod = modules.find((m) => m.id === moduleId);
        if (!mod) return 0;
        let completed = 0;
        for (let i = 0; i < mod.topics.length; i++) {
          if (state.completedTopics[`${moduleId}-${i}`]) {
            completed++;
          }
        }
        return Math.round((completed / mod.topics.length) * 100);
      },

      getOverallProgress: () => {
        const state = get();
        let totalTopics = 0;
        let completedTopics = 0;
        for (const mod of modules) {
          totalTopics += mod.topics.length;
          for (let i = 0; i < mod.topics.length; i++) {
            if (state.completedTopics[`${mod.id}-${i}`]) {
              completedTopics++;
            }
          }
        }
        if (totalTopics === 0) return 0;
        return Math.round((completedTopics / totalTopics) * 100);
      },

      saveQuizResult: (result: QuizResult) => {
        set((state) => ({
          quizResults: { ...state.quizResults, [result.moduleId]: result },
        }));
      },

      getQuizResult: (moduleId: string) => {
        return get().quizResults[moduleId];
      },

      getTotalCompletedTopics: () => {
        const state = get();
        let count = 0;
        for (const mod of modules) {
          for (let i = 0; i < mod.topics.length; i++) {
            if (state.completedTopics[`${mod.id}-${i}`]) {
              count++;
            }
          }
        }
        return count;
      },

      getTotalTopics: () => {
        return modules.reduce((sum, m) => sum + m.topics.length, 0);
      },

      getAverageQuizScore: () => {
        const state = get();
        const results = Object.values(state.quizResults);
        if (results.length === 0) return 0;
        const totalPercentage = results.reduce(
          (sum, r) => sum + (r.score / r.totalQuestions) * 100,
          0
        );
        return Math.round(totalPercentage / results.length);
      },

      resetAll: () => {
        set({ completedTopics: {}, quizResults: {} });
      },

      navigateToTopic: (moduleId: string, topicIndex: number) => {
        set({ currentView: 'topic', selectedModule: moduleId, selectedTopic: topicIndex });
      },

      navigateToModules: () => {
        set({ currentView: 'modules', selectedModule: null, selectedTopic: null });
      },

      // Notes actions
      saveTopicNote: (moduleId: string, topicIndex: number, note: string) => {
        const key = `${moduleId}-${topicIndex}`;
        set((state) => ({
          topicNotes: { ...state.topicNotes, [key]: note },
        }));
      },

      getTopicNote: (moduleId: string, topicIndex: number) => {
        const key = `${moduleId}-${topicIndex}`;
        return get().topicNotes[key] || "";
      },

      // Bookmarks actions
      toggleBookmark: (moduleId: string, topicIndex: number) => {
        const key = `${moduleId}-${topicIndex}`;
        set((state) => {
          const newBookmarks = { ...state.bookmarks };
          if (newBookmarks[key]) {
            delete newBookmarks[key];
          } else {
            newBookmarks[key] = true;
          }
          return { bookmarks: newBookmarks };
        });
      },

      isBookmarked: (moduleId: string, topicIndex: number) => {
        const key = `${moduleId}-${topicIndex}`;
        return !!get().bookmarks[key];
      },

      getBookmarkedTopics: () => {
        const state = get();
        const result: Array<{ moduleId: string; topicIndex: number; moduleName: string; topicName: string }> = [];
        for (const mod of modules) {
          for (let i = 0; i < mod.topics.length; i++) {
            const key = `${mod.id}-${i}`;
            if (state.bookmarks[key]) {
              result.push({
                moduleId: mod.id,
                topicIndex: i,
                moduleName: `Módulo ${mod.number}: ${mod.title}`,
                topicName: mod.topics[i].name,
              });
            }
          }
        }
        return result;
      },
    }),
    {
      name: "d5-render-study-store",
      partialize: (state) => ({
        completedTopics: state.completedTopics,
        quizResults: state.quizResults,
        topicNotes: state.topicNotes,
        bookmarks: state.bookmarks,
      }),
    }
  )
);
