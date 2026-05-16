"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Search,
  BookText,
  Bookmark,
  Keyboard,
  GitCompareArrows,
  Lightbulb,
  Trophy,
  Award,
  Flame,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";

// ============================================================
// Navigation config
// ============================================================

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
  requiredRole?: "admin" | "teacher";
}

const navGroups: NavGroup[] = [
  {
    title: "Aprender",
    items: [
      { label: "Inicio", href: "/", icon: <Home className="w-4 h-4" /> },
      { label: "Mis Cursos", href: "/perfil", icon: <BookOpen className="w-4 h-4" /> },
      { label: "Buscar", href: "/buscar", icon: <Search className="w-4 h-4" /> },
      { label: "Glosario", href: "/glosario", icon: <BookText className="w-4 h-4" /> },
    ],
  },
  {
    title: "Herramientas",
    items: [
      { label: "Marcadores", href: "/marcadores", icon: <Bookmark className="w-4 h-4" /> },
      { label: "Atajos", href: "/atajos", icon: <Keyboard className="w-4 h-4" /> },
      { label: "Comparar", href: "/comparar", icon: <GitCompareArrows className="w-4 h-4" /> },
      { label: "Soluciones", href: "/soluciones", icon: <Lightbulb className="w-4 h-4" /> },
    ],
  },
  {
    title: "Progreso",
    items: [
      { label: "Logros", href: "/logros", icon: <Trophy className="w-4 h-4" /> },
      { label: "Certificado", href: "/certificado", icon: <Award className="w-4 h-4" /> },
      { label: "Racha", href: "/logros", icon: <Flame className="w-4 h-4" /> },
    ],
  },
  {
    title: "Admin",
    items: [
      { label: "Panel Admin", href: "/admin", icon: <ShieldCheck className="w-4 h-4" /> },
    ],
    requiredRole: "admin",
  },
  {
    title: "Profesor",
    items: [
      { label: "Panel Profesor", href: "/profesor", icon: <GraduationCap className="w-4 h-4" /> },
    ],
    requiredRole: "teacher",
  },
];

// ============================================================
// Types
// ============================================================

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isCollapsed: boolean;
  onCollapseToggle: () => void;
}

// ============================================================
// Sidebar Component
// ============================================================

export function Sidebar({
  isOpen,
  onToggle,
  onClose,
  isCollapsed,
  onCollapseToggle,
}: SidebarProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, isTeacher } = useAuth();
  const isMobile = useIsMobile();

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (isMobile) {
      onClose();
    }
  }, [pathname, isMobile, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen && isMobile) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, isMobile, onClose]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobile, isOpen]);

  // Check if a nav item is active
  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  // Filter groups by role
  const visibleGroups = navGroups.filter((group) => {
    if (!group.requiredRole) return true;
    if (group.requiredRole === "admin") return isAdmin;
    if (group.requiredRole === "teacher") return isTeacher;
    return true;
  });

  // Get user display name
  const getDisplayName = () => {
    if (!user) return "Invitado";
    if (user.name) {
      return user.name.length > 20 ? user.name.substring(0, 20) + "..." : user.name;
    }
    return "Usuario";
  };

  // Get user initial
  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "?";
  };

  // Get role badge info
  const getRoleBadge = () => {
    if (isAdmin) return { label: "Admin", className: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20" };
    if (isTeacher) return { label: "Profesor", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" };
    if (isAuthenticated) return { label: "Estudiante", className: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/20" };
    return null;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200/60 dark:border-white/5 shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group" onClick={onClose}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 group-hover:bg-emerald-500/25 transition-colors">
            <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-sm font-bold text-gray-900 dark:text-white tracking-tight whitespace-nowrap overflow-hidden"
            >
              Academy{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                Tech
              </span>
            </motion.span>
          )}
        </Link>

        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        )}

        {/* Desktop collapse toggle */}
        {!isMobile && (
          <button
            onClick={onCollapseToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
        {visibleGroups.map((group) => (
          <div key={group.title}>
            {/* Group title */}
            {!isCollapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500"
              >
                {group.title}
              </motion.p>
            )}
            {isCollapsed && (
              <div className="mb-2 mx-auto w-6 h-px bg-gray-200 dark:bg-white/10" />
            )}

            {/* Nav items */}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={onClose}
                    className={`
                      group relative flex items-center gap-3 rounded-lg transition-all duration-200
                      ${isCollapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"}
                      ${
                        active
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                      }
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {/* Active indicator bar */}
                    {active && (
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-emerald-500 dark:bg-emerald-400"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    {/* Icon */}
                    <span
                      className={`shrink-0 transition-colors ${
                        active
                          ? "text-emerald-500 dark:text-emerald-400"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                      }`}
                    >
                      {item.icon}
                    </span>

                    {/* Label */}
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User info at bottom */}
      <div className="border-t border-gray-200/60 dark:border-white/5 px-3 py-3 shrink-0">
        <div
          className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""} px-2 py-2 rounded-lg bg-gray-50 dark:bg-white/3`}
        >
          {/* Avatar */}
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name || "Avatar"}
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400">
                {getInitial()}
              </span>
            </div>
          )}

          {/* Name + Role */}
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {getDisplayName()}
              </p>
              {getRoleBadge() && (
                <span
                  className={`inline-block text-[9px] px-1.5 py-0.5 rounded border font-medium mt-0.5 ${getRoleBadge()!.className}`}
                >
                  {getRoleBadge()!.label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Mobile: overlay sidebar
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={onClose}
            />
          )}
        </AnimatePresence>

        {/* Sidebar panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 z-50 glass-card border-r border-gray-200/60 dark:border-white/5"
            >
              {sidebarContent}
            </motion.aside>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop: fixed sidebar
  return (
    <motion.aside
      animate={{ width: isCollapsed ? 68 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 left-0 z-30 glass-card border-r border-gray-200/60 dark:border-white/5 shrink-0"
    >
      {sidebarContent}
    </motion.aside>
  );
}
