"use client";

import { useEffect, useRef, useCallback } from "react";
import { useCourse } from "@/hooks/use-course-context";
import { getAchievementById } from "@/lib/achievements";
import { toast } from "sonner";

export function useAchievementChecker() {
  const course = useCourse();
  const isInitialMountRef = useRef(true);

  const runCheck = useCallback((showToast: boolean) => {
    const newlyUnlocked = course.checkAndUnlockAchievements();

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
  }, [course]);

  // On mount: check streak and achievements (without showing toasts)
  useEffect(() => {
    course.updateStreak();
    runCheck(false);
    isInitialMountRef.current = false;
  }, [runCheck, course]);

  // Re-check achievements when relevant state changes
  useEffect(() => {
    if (isInitialMountRef.current) return;

    const timeout = setTimeout(() => {
      runCheck(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, [course.progress, course.quizResults, course.notes, course.streak.current, course.streak.lastDate, runCheck]);
}
