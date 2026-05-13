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
}

export const useStudyStore = create<StudyStore>()(
  persist(
    (set, get) => ({
      completedTopics: {},
      quizResults: {},

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
    }),
    {
      name: "d5-render-study-store",
    }
  )
);
