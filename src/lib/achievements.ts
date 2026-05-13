export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji
  category: "progreso" | "evaluacion" | "streak" | "especial";
  condition: (getState: () => AchievementState) => boolean;
}

export interface QuizResultInfo {
  moduleId: string;
  score: number;
  totalQuestions: number;
  answers: Record<string, string>;
  completedAt: string;
}

export interface AchievementState {
  completedTopics: Record<string, boolean>;
  quizResults: Record<string, QuizResultInfo>;
  topicNotes: Record<string, string>;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  unlockedAchievements: Record<string, string>;
}

export const achievements: Achievement[] = [
  // Progreso
  {
    id: "first-step",
    title: "Primer Paso",
    description: "Completa tu primer tema",
    icon: "🎯",
    category: "progreso",
    condition: (getState) => {
      const state = getState();
      return Object.keys(state.completedTopics).length >= 1;
    },
  },
  {
    id: "getting-started",
    title: "En Marcha",
    description: "Completa 10 temas",
    icon: "🚀",
    category: "progreso",
    condition: (getState) => {
      const state = getState();
      return Object.keys(state.completedTopics).length >= 10;
    },
  },
  {
    id: "halfway",
    title: "Mitad del Camino",
    description: "Completa 30 temas",
    icon: "📚",
    category: "progreso",
    condition: (getState) => {
      const state = getState();
      return Object.keys(state.completedTopics).length >= 30;
    },
  },
  {
    id: "almost-there",
    title: "Casi Llegas",
    description: "Completa 50 temas",
    icon: "🏃",
    category: "progreso",
    condition: (getState) => {
      const state = getState();
      return Object.keys(state.completedTopics).length >= 50;
    },
  },
  {
    id: "graduated",
    title: "Graduado",
    description: "Completa los 60 temas",
    icon: "🎓",
    category: "progreso",
    condition: (getState) => {
      const state = getState();
      return Object.keys(state.completedTopics).length >= 60;
    },
  },
  {
    id: "module-master",
    title: "Maestro de Módulo",
    description: "Completa un módulo entero",
    icon: "⭐",
    category: "progreso",
    condition: (getState) => {
      const state = getState();
      const moduleIds = [
        "modulo-1", "modulo-2", "modulo-3", "modulo-4", "modulo-5",
        "modulo-6", "modulo-7", "modulo-8", "modulo-9", "modulo-10",
      ];
      const topicsPerModule = 6;
      return moduleIds.some((modId) => {
        let count = 0;
        for (let i = 0; i < topicsPerModule; i++) {
          if (state.completedTopics[`${modId}-${i}`]) count++;
        }
        return count === topicsPerModule;
      });
    },
  },

  // Evaluación
  {
    id: "first-quiz",
    title: "Primera Evaluación",
    description: "Completa tu primera evaluación",
    icon: "📝",
    category: "evaluacion",
    condition: (getState) => {
      const state = getState();
      return Object.keys(state.quizResults).length >= 1;
    },
  },
  {
    id: "perfect-score",
    title: "Puntuación Perfecta",
    description: "Obtén 100% en una evaluación",
    icon: "💯",
    category: "evaluacion",
    condition: (getState) => {
      const state = getState();
      return Object.values(state.quizResults).some(
        (r) => r.score === r.totalQuestions
      );
    },
  },
  {
    id: "quiz-master",
    title: "Maestro de Evaluaciones",
    description: "Completa todas las evaluaciones",
    icon: "🏆",
    category: "evaluacion",
    condition: (getState) => {
      const state = getState();
      return Object.keys(state.quizResults).length >= 10;
    },
  },
  {
    id: "high-achiever",
    title: "Sobresaliente",
    description: "Obtén 80%+ en todas las evaluaciones",
    icon: "🎖️",
    category: "evaluacion",
    condition: (getState) => {
      const state = getState();
      const results = Object.values(state.quizResults);
      if (results.length === 0) return false;
      return results.every(
        (r) => (r.score / r.totalQuestions) * 100 >= 80
      );
    },
  },

  // Racha
  {
    id: "three-day",
    title: "3 Días Seguidos",
    description: "Estudia 3 días consecutivos",
    icon: "🔥",
    category: "streak",
    condition: (getState) => {
      const state = getState();
      return state.currentStreak >= 3;
    },
  },
  {
    id: "week-warrior",
    title: "Guerrero Semanal",
    description: "Estudia 7 días consecutivos",
    icon: "💪",
    category: "streak",
    condition: (getState) => {
      const state = getState();
      return state.currentStreak >= 7;
    },
  },
  {
    id: "two-week-champ",
    title: "Campeón de 2 Semanas",
    description: "Estudia 14 días consecutivos",
    icon: "🏅",
    category: "streak",
    condition: (getState) => {
      const state = getState();
      return state.currentStreak >= 14;
    },
  },

  // Especial
  {
    id: "bookworm",
    title: "Ratón de Biblioteca",
    description: "Escribe notas en 10 temas",
    icon: "📖",
    category: "especial",
    condition: (getState) => {
      const state = getState();
      return (
        Object.values(state.topicNotes).filter((note) => note.trim().length > 0)
          .length >= 10
      );
    },
  },
  {
    id: "explorer",
    title: "Explorador",
    description: "Usa el glosario, atajos y soluciones",
    icon: "🧭",
    category: "especial",
    condition: () => true, // Always unlocked (hard to track)
  },
];

export const achievementCategories = [
  { id: "todos", label: "Todos", icon: "✨" },
  { id: "progreso", label: "Progreso", icon: "📊" },
  { id: "evaluacion", label: "Evaluación", icon: "📝" },
  { id: "streak", label: "Racha", icon: "🔥" },
  { id: "especial", label: "Especial", icon: "⭐" },
] as const;

export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id);
}
