"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, LogOut, User, ChevronDown, Shield, Settings, GraduationCap } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function UserMenu() {
  const { user, isAuthenticated, isLoading, login, logout, isGuest, isAdmin, isTeacher } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get user initial for avatar
  const getInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "?";
  };

  // Get display name
  const getDisplayName = () => {
    if (!user) return "";
    if (user.name) {
      return user.name.length > 20 ? user.name.substring(0, 20) + "..." : user.name;
    }
    return "Usuario";
  };

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
    );
  }

  if (!isAuthenticated) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={login}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all duration-200"
      >
        <LogIn className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Iniciar Sesión
        </span>
      </motion.button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200"
      >
        {/* Avatar */}
        {user?.image ? (
          <img
            src={user.image}
            alt={user.name || "Avatar"}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center">
            <span className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400">
              {getInitial()}
            </span>
          </div>
        )}
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 max-w-[80px] truncate hidden sm:inline">
          {getDisplayName()}
        </span>
        {/* Admin badge in top bar */}
        {isAdmin && (
          <span className="text-[8px] px-1 py-0.5 rounded bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/20 font-bold shrink-0">
            Admin
          </span>
        )}
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 shadow-xl z-50 overflow-hidden"
          >
            {/* User info header */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "Avatar"}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <span className="text-sm font-bold text-emerald-500 dark:text-emerald-400">
                      {getInitial()}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user?.name || "Usuario"}
                    </p>
                    {isAdmin && (
                      <Shield className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {isGuest && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium">
                    Invitado
                  </span>
                )}
                {isAdmin && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 font-medium">
                    {user?.role === "teacher" ? "Profesor" : "Admin"}
                  </span>
                )}
              </div>
            </div>

            {/* Menu items */}
            <div className="py-1">
              {/* Professor Panel link - only for teacher/admin */}
              {isTeacher && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/profesor");
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/5 transition-colors"
                >
                  <GraduationCap className="w-4 h-4" />
                  Mi Panel de Profesor
                </button>
              )}
              {/* Admin link - only for admin */}
              {isAdmin && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/admin");
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/5 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Panel de Admin
                </button>
              )}
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/perfil");
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <User className="w-4 h-4 text-gray-400" />
                Mi Perfil
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
