"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | number | null;
  trend?: number | null;
  suffix?: string;
}

function AnimatedCounter({
  target,
  duration = 1200,
}: {
  target: number;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min(
        (timestamp - startTime.current) / duration,
        1
      );
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return <>{current}</>;
}

export default function StatCard({
  icon,
  iconBg,
  label,
  value,
  trend,
  suffix = "",
}: StatCardProps) {
  const numericValue =
    value !== null && typeof value === "number" ? value : 0;
  const isPercentage = typeof value === "string" && value.includes("%");
  const displayNumber = isPercentage
    ? parseInt(value.replace("%", ""), 10) || 0
    : numericValue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group"
    >
      {/* Glassmorphism glow effect */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-xl group-hover:from-emerald-500/20 transition-all duration-500" />

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-xl ${iconBg}`}
          >
            {icon}
          </div>
          {trend !== null && trend !== undefined && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                trend >= 0
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
            >
              {trend >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(trend)}%
            </div>
          )}
        </div>

        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {value === null ? (
            <div className="h-9 w-16 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
          ) : isPercentage ? (
            <span>
              <AnimatedCounter target={displayNumber} />
              {suffix}%
            </span>
          ) : (
            <span>
              <AnimatedCounter target={displayNumber} />
              {suffix}
            </span>
          )}
        </div>

        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
