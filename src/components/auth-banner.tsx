"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LogIn, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

export function AuthBanner() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  // Don't show banner if loading, authenticated, or dismissed
  if (isLoading || isAuthenticated || dismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 bg-emerald-500/10 border-b border-emerald-500/20 backdrop-blur-sm"
      >
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <LogIn className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
            <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 truncate">
              Inicia sesión para guardar tu progreso
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={login}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors duration-200"
            >
              <LogIn className="w-3 h-3" />
              Iniciar Sesión
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded-lg hover:bg-emerald-500/10 text-emerald-500/50 hover:text-emerald-500 transition-colors"
              aria-label="Cerrar banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
