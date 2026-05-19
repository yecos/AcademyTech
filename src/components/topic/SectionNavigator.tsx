"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SectionNavigatorProps {
  sections: Section[];
}

export function SectionNavigator({ sections }: SectionNavigatorProps) {
  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });
  }, [sections]);

  useEffect(() => {
    setupObserver();

    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setupObserver]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
        >
          <div className="glass-card rounded-xl p-2 space-y-1">
            {sections.map((section) => {
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="group relative flex items-center gap-2 w-full"
                  title={section.label}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="section-indicator"
                      className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                      style={{ backgroundColor: theme.primaryColor }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                      isActive
                        ? "font-medium"
                        : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                    style={isActive ? { color: theme.primaryColor } : undefined}
                  >
                    <span className="shrink-0">{section.icon}</span>
                    <span className="truncate max-w-[100px]">{section.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
