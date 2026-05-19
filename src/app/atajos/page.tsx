"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Keyboard,
  Command,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import {
  getCategoryToolsData,
  courseSlugToCategorySlug,
} from "@/lib/tools-data";
import {
  CategoryThemeProvider,
  useCategoryTheme,
} from "@/components/CategoryThemeProvider";
import { CategoryBackground } from "@/components/CategoryBackground";

function KeyCap({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-gray-200 dark:bg-white/8 border border-gray-300 dark:border-white/15 border-b-2 border-b-gray-400 dark:border-b-white/20 text-[11px] font-mono font-medium text-gray-700 dark:text-gray-200 shadow-sm select-none">
      {children}
    </kbd>
  );
}

function KeyCombo({ keys }: { keys: string[] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {keys.map((key, i) => (
        <span key={i} className="flex items-center gap-1">
          <KeyCap>{key}</KeyCap>
          {i < keys.length - 1 && (
            <span className="text-gray-400 dark:text-gray-500 text-xs">+</span>
          )}
        </span>
      ))}
    </div>
  );
}

function AtajosThemedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  const categorySlug = courseSlugToCategorySlug(courseSlug || "arquitectura");
  const toolsData = getCategoryToolsData(categorySlug);
  const { config, categories: shortcutCategories } = toolsData.shortcuts;
  const backUrl = courseSlug ? `/curso/${courseSlug}` : "/";

  const { theme } = useCategoryTheme();
  const tw = theme.tailwind;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <CategoryBackground />

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(backUrl)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
          <div className="flex items-center gap-2">
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${tw.iconBg} ${tw.iconBgDark}`}
            >
              <Keyboard className={`w-5 h-5 ${tw.text} ${tw.textDark}`} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                {config.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span
                  className={`bg-gradient-to-r ${tw.gradient} bg-clip-text text-transparent`}
                >
                  {config.title.split(" ").slice(-1)[0]}
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {config.subtitle}
              </p>
            </div>
          </div>
        </motion.header>

        {/* Shortcut categories */}
        <div className="space-y-8">
          {shortcutCategories.map((category, catIndex) => (
            <motion.section
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: catIndex * 0.08 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{category.icon}</span>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  {category.title}
                </h2>
                <Badge
                  className={`${tw.badge} ${tw.badgeDark} text-[10px] px-1.5`}
                >
                  {category.shortcuts.length}
                </Badge>
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
              </div>

              {/* Shortcuts grid */}
              <div className="grid gap-2 sm:grid-cols-2">
                {category.shortcuts.map((shortcut, sIndex) => (
                  <motion.div
                    key={shortcut.description}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: catIndex * 0.08 + sIndex * 0.03,
                    }}
                    className={`glass-card glass-card-hover rounded-lg px-4 py-3 flex items-center justify-between gap-3 transition-all duration-200 ${tw.hoverBorder} ${tw.hoverBorderDark}`}
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-300 min-w-0">
                      {shortcut.description}
                    </span>
                    <KeyCombo keys={shortcut.keys} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Tip section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className={`mt-10 glass-card rounded-xl p-5 ${tw.border}`}
        >
          <div className="flex items-start gap-3">
            <Command
              className={`w-5 h-5 ${tw.text} ${tw.textDark} shrink-0 mt-0.5`}
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Consejo
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {config.tipText}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Atajos — Academy Tech —{" "}
              <span className={`${tw.text} opacity-70`}>
                {shortcutCategories.reduce(
                  (acc, cat) => acc + cat.shortcuts.length,
                  0
                )}{" "}
                atajos listados
              </span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

function AtajosContent() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  const categorySlug = courseSlugToCategorySlug(courseSlug || "arquitectura");

  return (
    <CategoryThemeProvider slug={categorySlug} animated>
      <AtajosThemedContent />
    </CategoryThemeProvider>
  );
}

function AtajosFallback() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse flex items-center gap-2 text-gray-400">
            <Keyboard className="w-5 h-5" />
            <span className="text-sm">Cargando atajos...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AtajosPage() {
  return (
    <Suspense fallback={<AtajosFallback />}>
      <AtajosContent />
    </Suspense>
  );
}
