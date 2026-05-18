"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Trophy,
  Award,
  BookOpen,
  Check,
  CheckCheck,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

// ── Types ────────────────────────────────────────────────────

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
  total: number;
  hasMore: boolean;
}

// ── Notification type → icon & color config ──────────────────

const NOTIFICATION_CONFIG: Record<
  string,
  { icon: typeof Trophy; color: string; bgColor: string; borderColor: string }
> = {
  achievement: {
    icon: Trophy,
    color: "text-amber-500 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  course_completed: {
    icon: Award,
    color: "text-emerald-500 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  enrollment: {
    icon: BookOpen,
    color: "text-sky-500 dark:text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/20",
  },
  system: {
    icon: Bell,
    color: "text-gray-500 dark:text-gray-400",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/20",
  },
};

const DEFAULT_CONFIG = NOTIFICATION_CONFIG.system;

// ── Relative time formatter ──────────────────────────────────

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "ahora";
  if (diffMin < 60) return `${diffMin}m`;
  if (diffHour < 24) return `${diffHour}h`;
  if (diffDay < 7) return `${diffDay}d`;
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

// ── Notification link by type ────────────────────────────────

function getNotificationLink(type: string): string {
  switch (type) {
    case "achievement":
      return "/logros";
    case "course_completed":
      return "/certificado";
    case "enrollment":
      return "/";
    case "system":
    default:
      return "/";
  }
}

// ── Main Component ───────────────────────────────────────────

export function NotificationsDropdown() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkingRead, setIsMarkingRead] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Fetch notifications ──────────────────────────────────

  const fetchNotifications = useCallback(
    async (showLoading = false) => {
      if (!isAuthenticated) return;
      if (showLoading) setIsLoading(true);
      try {
        const res = await fetch("/api/notifications?limit=15&offset=0");
        if (res.ok) {
          const data: NotificationsResponse = await res.json();
          setNotifications(data.notifications);
          setUnreadCount(data.unreadCount);
        }
      } catch {
        // Silently fail on network errors
      } finally {
        if (showLoading) setIsLoading(false);
      }
    },
    [isAuthenticated]
  );

  // ── Polling every 30 seconds ─────────────────────────────

  useEffect(() => {
    if (!isAuthenticated) return;

    // Initial fetch
    fetchNotifications();

    // Set up polling
    pollingRef.current = setInterval(() => fetchNotifications(false), 30000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [isAuthenticated, fetchNotifications]);

  // ── Fetch on dropdown open ───────────────────────────────

  const handleToggleDropdown = useCallback(() => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    if (willOpen && isAuthenticated) {
      fetchNotifications(true);
    }
  }, [isOpen, isAuthenticated, fetchNotifications]);

  // ── Close on outside click ───────────────────────────────

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Mark all as read ─────────────────────────────────────

  const handleMarkAllRead = async () => {
    if (isMarkingRead || unreadCount === 0) return;
    setIsMarkingRead(true);
    try {
      const res = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unreadCount);
        setNotifications((prev) =>
          prev.map((n) => ({ ...n, read: true }))
        );
      }
    } catch {
      // Silently fail
    } finally {
      setIsMarkingRead(false);
    }
  };

  // ── Mark single notification as read ─────────────────────

  const handleMarkSingleRead = async (notificationId: string) => {
    try {
      const res = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationIds: [notificationId] }),
      });
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unreadCount);
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          )
        );
      }
    } catch {
      // Silently fail
    }
  };

  // ── Don't render if not authenticated ────────────────────

  if (authLoading || !isAuthenticated) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleToggleDropdown}
        className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/10 hover:bg-gray-300 dark:hover:bg-white/15 transition-colors duration-200"
        aria-label="Notificaciones"
        title="Notificaciones"
      >
        <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />

        {/* Unread badge */}
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-emerald-500 text-white text-[9px] font-bold leading-none shadow-sm"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-xl glass-card border border-gray-200/60 dark:border-white/10 shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Notificaciones
                </h3>
                {unreadCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                    {unreadCount} nueva{unreadCount !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  disabled={isMarkingRead}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors disabled:opacity-50"
                >
                  {isMarkingRead ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <CheckCheck className="w-3 h-3" />
                  )}
                  Marcar leídas
                </button>
              )}
            </div>

            {/* Notification list */}
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-3">
                    <Bell className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    No hay notificaciones
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Te avisaremos cuando haya novedades
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-white/5">
                  {notifications.map((notification) => {
                    const config =
                      NOTIFICATION_CONFIG[notification.type] ?? DEFAULT_CONFIG;
                    const IconComponent = config.icon;

                    return (
                      <a
                        key={notification.id}
                        href={getNotificationLink(notification.type)}
                        onClick={() => {
                          if (!notification.read) {
                            handleMarkSingleRead(notification.id);
                          }
                          setIsOpen(false);
                        }}
                        className={`flex items-start gap-3 px-4 py-3 transition-colors group ${
                          notification.read
                            ? "bg-transparent hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                            : "bg-emerald-500/[0.03] hover:bg-emerald-500/[0.06] dark:bg-emerald-500/[0.04] dark:hover:bg-emerald-500/[0.07]"
                        }`}
                      >
                        {/* Icon */}
                        <div
                          className={`shrink-0 w-8 h-8 rounded-full ${config.bgColor} border ${config.borderColor} flex items-center justify-center mt-0.5`}
                        >
                          <IconComponent
                            className={`w-3.5 h-3.5 ${config.color}`}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`text-[13px] leading-snug ${
                                notification.read
                                  ? "text-gray-600 dark:text-gray-400"
                                  : "text-gray-900 dark:text-white font-medium"
                              }`}
                            >
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="shrink-0 w-2 h-2 mt-1.5 rounded-full bg-emerald-500" />
                            )}
                          </div>
                          <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 inline-block">
                            {formatRelativeTime(notification.createdAt)}
                          </span>
                        </div>

                        {/* Mark read button (only on hover for unread) */}
                        {!notification.read && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleMarkSingleRead(notification.id);
                            }}
                            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-200 dark:hover:bg-white/10"
                            title="Marcar como leída"
                          >
                            <Check className="w-3 h-3 text-gray-400" />
                          </button>
                        )}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="border-t border-gray-100 dark:border-white/5 px-4 py-2.5">
                <a
                  href="/logros"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  Ver todas las notificaciones
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
