"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";

export function ReadingProgressBar() {
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) {
        setProgress(0);
        setIsVisible(false);
        return;
      }

      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
      setProgress(scrollPercent);
      setIsVisible(scrollTop > 100);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200/50 dark:bg-white/5"
    >
      <motion.div
        className={`h-full bg-gradient-to-r ${tw.progress}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
      {/* Glow effect on the progress tip */}
      <div
        className="absolute top-0 h-full w-4 blur-sm"
        style={{
          left: `${progress}%`,
          transform: "translateX(-50%)",
          backgroundColor: theme.primaryColor,
          opacity: 0.6,
        }}
      />
    </motion.div>
  );
}
