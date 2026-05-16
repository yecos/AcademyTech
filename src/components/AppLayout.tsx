"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { useIsMobile } from "@/hooks/use-mobile";

// ============================================================
// AppLayout Component
// ============================================================

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    if (isMobile) {
      setSidebarOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  }, [isMobile]);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleCollapseToggle = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  // Compute sidebar width for main content offset (desktop only)
  const sidebarWidth = isMobile ? 0 : sidebarCollapsed ? 68 : 260;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative orbs - centralized here */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-violet-600/3 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={handleToggleSidebar}
        onClose={handleCloseSidebar}
        isCollapsed={sidebarCollapsed}
        onCollapseToggle={handleCollapseToggle}
      />

      {/* Main content area */}
      <motion.div
        animate={{ marginLeft: sidebarWidth }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-10 flex flex-col min-h-screen"
      >
        {/* Top Bar */}
        <TopBar onMenuToggle={handleToggleSidebar} isSidebarOpen={sidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-auto pb-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                  Academy Tech
                </span>
              </div>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 max-w-md mx-auto">
                Tu plataforma de aprendizaje tecnológico: Arquitectura, Programación, Ciberseguridad e IA.
              </p>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
