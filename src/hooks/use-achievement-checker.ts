"use client";

import { useEffect, useRef, useCallback } from "react";
import { useStudyStore } from "@/lib/store";
import { getAchievementById } from "@/lib/achievements";
import { toast } from "sonner";

export function useAchievementChecker() {
  const checkAndUnlockAchievements = useStudyStore((s) => s.checkAndUnlockAchievements);
  const checkAndUpdateStreak = useStudyStore((s) => s.checkAndUpdateStreak);
  const unlockedAchievements = useStudyStore((s) => s.unlockedAchievements);
  const completedTopics = useStudyStore((s) => s.completedTopics);
  const quizResults = useStudyStore((s) => s.quizResults);
  const topicNotes = useStudyStore((s) => s.topicNotes);
  const currentStreak = useStudyStore((s) => s.currentStreak);
  const lastStudyDate = useStudyStore((s) => s.lastStudyDate);

  const isInitialMountRef = useRef(true);

  const runCheck = useCallback((showToast: boolean) => {
    const newlyUnlocked = checkAndUnlockAchievements();

    if (showToast && newlyUnlocked.length > 0) {
      for (const id of newlyUnlocked) {
        const achievement = getAchievementById(id);
        if (achievement) {
          toast.success(`¡Logro Desbloqueado!`, {
            description: `${achievement.icon} ${achievement.title} — ${achievement.description}`,
            duration: 5000,
          });
        }
      }
    }
  }, [checkAndUnlockAchievements]);

  // On mount: check streak and achievements (without showing toasts)
  useEffect(() => {
    checkAndUpdateStreak();
    runCheck(false);
    isInitialMountRef.current = false;
  }, [checkAndUpdateStreak, runCheck]);

  // Re-check achievements when relevant state changes
  useEffect(() => {
    if (isInitialMountRef.current) return;

    const timeout = setTimeout(() => {
      runCheck(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, [completedTopics, quizResults, topicNotes, currentStreak, lastStudyDate, runCheck]);
}
