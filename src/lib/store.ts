import { create } from "zustand";
import { persist } from "zustand/middleware";
import { modules } from "./curriculum";
import { achievements } from "./achievements";

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

  // Certificate state
  studentName: string;
  completionDate: string | null;

  // Study streaks
  lastStudyDate: string | null; // ISO date string (YYYY-MM-DD)
  currentStreak: number;
  longestStreak: number;

  // Achievements unlocked
  unlockedAchievements: Record<string, string>; // achievementId -> unlockedAt ISO string

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

  // Certificate actions
  setStudentName: (name: string) => void;
  setCompletionDate: (date: string) => void;

  // Streak actions
  checkAndUpdateStreak: () => void;
  updateStudyDate: () => void;

  // Achievement actions
  unlockAchievement: (id: string) => void;
  isAchievementUnlocked: (id: string) => boolean;
  getTotalAchievements: () => number;
  getUnlockedCount: () => number;
  checkAndUnlockAchievements: () => string[]; // returns newly unlocked achievement IDs
}

function getTodayDateString(): string {
  const now = new Date();
  return now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0");
}

function getYesterdayDateString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.getFullYear() + "-" +
    String(yesterday.getMonth() + 1).padStart(2, "0") + "-" +
    String(yesterday.getDate()).padStart(2, "0");
}

export const useStudyStore = create<StudyStore>()(
  persist(
    (set, get) => ({
      completedTopics: {},
      quizResults: {},
      topicNotes: {},
      bookmarks: {},
      studentName: "",
      completionDate: null,
      lastStudyDate: null,
      currentStreak: 0,
      longestStreak: 0,
      unlockedAchievements: {},
      currentView: 'modules' as const,
      selectedModule: null,
      selectedTopic: null,

      toggleTopic: (moduleId: string, topicIndex: number) => {
        const key = `${moduleId}-${topicIndex}`;
        const wasCompleted = !!get().completedTopics[key];

        set((state) => {
          const newCompleted = { ...state.completedTopics };
          if (newCompleted[key]) {
            delete newCompleted[key];
          } else {
            newCompleted[key] = true;
          }
          return { completedTopics: newCompleted };
        });

        // If topic was just marked as complete, update study date
        if (!wasCompleted) {
          get().updateStudyDate();
        }

        // Check if overall progress reached 100% and set completion date
        const state = get();
        let totalTopics = 0;
        let completedCount = 0;
        for (const mod of modules) {
          totalTopics += mod.topics.length;
          for (let i = 0; i < mod.topics.length; i++) {
            if (state.completedTopics[`${mod.id}-${i}`]) {
              completedCount++;
            }
          }
        }
        if (totalTopics > 0 && completedCount === totalTopics && !state.completionDate) {
          set({ completionDate: new Date().toISOString() });
        }
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
        set({
          completedTopics: {},
          quizResults: {},
          topicNotes: {},
          bookmarks: {},
          lastStudyDate: null,
          currentStreak: 0,
          longestStreak: 0,
          unlockedAchievements: {},
        });
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

      // Certificate actions
      setStudentName: (name: string) => {
        set({ studentName: name });
      },

      setCompletionDate: (date: string) => {
        set({ completionDate: date });
      },

      // Streak actions
      checkAndUpdateStreak: () => {
        const state = get();
        const today = getTodayDateString();
        const yesterday = getYesterdayDateString();

        if (state.lastStudyDate === today) {
          // Already studied today, do nothing
          return;
        }

        if (state.lastStudyDate === yesterday) {
          // Studied yesterday, continue streak
          const newStreak = state.currentStreak + 1;
          const newLongest = Math.max(state.longestStreak, newStreak);
          set({
            currentStreak: newStreak,
            longestStreak: newLongest,
            lastStudyDate: today,
          });
        } else if (state.lastStudyDate !== null) {
          // Streak broken - reset to 0 (but don't set lastStudyDate until they study)
          set({ currentStreak: 0 });
        }
      },

      updateStudyDate: () => {
        const state = get();
        const today = getTodayDateString();
        const yesterday = getYesterdayDateString();

        if (state.lastStudyDate === today) {
          // Already studied today, do nothing
          return;
        }

        if (state.lastStudyDate === yesterday) {
          // Studied yesterday, increment streak
          const newStreak = state.currentStreak + 1;
          const newLongest = Math.max(state.longestStreak, newStreak);
          set({
            currentStreak: newStreak,
            longestStreak: newLongest,
            lastStudyDate: today,
          });
        } else {
          // First time studying or streak was broken
          const newStreak = 1;
          const newLongest = Math.max(state.longestStreak, newStreak);
          set({
            currentStreak: newStreak,
            longestStreak: newLongest,
            lastStudyDate: today,
          });
        }
      },

      // Achievement actions
      unlockAchievement: (id: string) => {
        const state = get();
        if (state.unlockedAchievements[id]) return; // already unlocked
        set({
          unlockedAchievements: {
            ...state.unlockedAchievements,
            [id]: new Date().toISOString(),
          },
        });
      },

      isAchievementUnlocked: (id: string) => {
        return !!get().unlockedAchievements[id];
      },

      getTotalAchievements: () => {
        return achievements.length;
      },

      getUnlockedCount: () => {
        return Object.keys(get().unlockedAchievements).length;
      },

      checkAndUnlockAchievements: () => {
        const state = get();
        const getState = () => ({
          completedTopics: state.completedTopics,
          quizResults: state.quizResults,
          topicNotes: state.topicNotes,
          currentStreak: state.currentStreak,
          longestStreak: state.longestStreak,
          lastStudyDate: state.lastStudyDate,
          unlockedAchievements: state.unlockedAchievements,
        });

        const newlyUnlocked: string[] = [];

        for (const achievement of achievements) {
          if (!state.unlockedAchievements[achievement.id]) {
            if (achievement.condition(getState)) {
              get().unlockAchievement(achievement.id);
              newlyUnlocked.push(achievement.id);
            }
          }
        }

        return newlyUnlocked;
      },
    }),
    {
      name: "d5-render-study-store",
      partialize: (state) => ({
        completedTopics: state.completedTopics,
        quizResults: state.quizResults,
        topicNotes: state.topicNotes,
        bookmarks: state.bookmarks,
        studentName: state.studentName,
        completionDate: state.completionDate,
        lastStudyDate: state.lastStudyDate,
        currentStreak: state.currentStreak,
        longestStreak: state.longestStreak,
        unlockedAchievements: state.unlockedAchievements,
      }),
    }
  )
);
