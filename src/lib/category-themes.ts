// ============================================================
// Category Theme System
// Inspired by Open Design's 72 brand-grade Design Systems
// with deterministic OKLch palettes
// ============================================================

export type PatternType = "geometric" | "code" | "hexagonal" | "neural";

export interface CategoryTheme {
  slug: string;
  name: string;
  primaryColor: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  textAccent: string;
  textAccentDark: string;
  bgAccent: string;
  bgAccentDark: string;
  borderAccent: string;
  borderAccentDark: string;
  icon: string; // Lucide icon name
  pattern: PatternType;
  // CSS custom property values
  cssVars: {
    primary: string;
    "gradient-from": string;
    "gradient-via": string;
    "gradient-to": string;
    "text-accent": string;
    "bg-accent": string;
    "border-accent": string;
    "glow-color": string;
    "pattern-opacity": string;
  };
  // Tailwind class helpers
  tailwind: {
    text: string;
    textDark: string;
    bg: string;
    bgDark: string;
    border: string;
    borderDark: string;
    gradient: string;
    iconBg: string;
    iconBgDark: string;
    badge: string;
    badgeDark: string;
    hoverBorder: string;
    hoverBorderDark: string;
    progress: string;
    button: string;
    buttonHover: string;
    shadow: string;
  };
}

// ============================================================
// Theme Definitions
// ============================================================

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  arquitectura: {
    slug: "arquitectura",
    name: "Arquitectura",
    primaryColor: "#10b981",
    gradientFrom: "#10b981",
    gradientVia: "#14b8a6",
    gradientTo: "#0d9488",
    textAccent: "#059669",
    textAccentDark: "#34d399",
    bgAccent: "rgba(16, 185, 129, 0.10)",
    bgAccentDark: "rgba(16, 185, 129, 0.15)",
    borderAccent: "rgba(16, 185, 129, 0.20)",
    borderAccentDark: "rgba(16, 185, 129, 0.25)",
    icon: "Building2",
    pattern: "geometric",
    cssVars: {
      primary: "#10b981",
      "gradient-from": "#10b981",
      "gradient-via": "#14b8a6",
      "gradient-to": "#0d9488",
      "text-accent": "#059669",
      "bg-accent": "rgba(16, 185, 129, 0.10)",
      "border-accent": "rgba(16, 185, 129, 0.20)",
      "glow-color": "rgba(16, 185, 129, 0.15)",
      "pattern-opacity": "0.06",
    },
    tailwind: {
      text: "text-emerald-600",
      textDark: "dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      bgDark: "dark:bg-emerald-500/15",
      border: "border-emerald-500/20",
      borderDark: "dark:border-emerald-500/25",
      gradient: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-500/15 border-emerald-500/20",
      iconBgDark: "dark:bg-emerald-500/20 dark:border-emerald-500/30",
      badge: "bg-emerald-500/15 text-emerald-600 border-emerald-500/20",
      badgeDark: "dark:text-emerald-400 dark:border-emerald-500/25",
      hoverBorder: "hover:border-emerald-500/30",
      hoverBorderDark: "dark:hover:border-emerald-500/30",
      progress: "bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400",
      button: "bg-emerald-600 hover:bg-emerald-500",
      buttonHover: "hover:bg-emerald-500",
      shadow: "shadow-emerald-500/20 hover:shadow-emerald-500/30",
    },
  },

  programacion: {
    slug: "programacion",
    name: "Programación",
    primaryColor: "#3b82f6",
    gradientFrom: "#3b82f6",
    gradientVia: "#6366f1",
    gradientTo: "#4f46e5",
    textAccent: "#2563eb",
    textAccentDark: "#60a5fa",
    bgAccent: "rgba(59, 130, 246, 0.10)",
    bgAccentDark: "rgba(59, 130, 246, 0.15)",
    borderAccent: "rgba(59, 130, 246, 0.20)",
    borderAccentDark: "rgba(59, 130, 246, 0.25)",
    icon: "Code2",
    pattern: "code",
    cssVars: {
      primary: "#3b82f6",
      "gradient-from": "#3b82f6",
      "gradient-via": "#6366f1",
      "gradient-to": "#4f46e5",
      "text-accent": "#2563eb",
      "bg-accent": "rgba(59, 130, 246, 0.10)",
      "border-accent": "rgba(59, 130, 246, 0.20)",
      "glow-color": "rgba(59, 130, 246, 0.15)",
      "pattern-opacity": "0.06",
    },
    tailwind: {
      text: "text-blue-600",
      textDark: "dark:text-blue-400",
      bg: "bg-blue-500/10",
      bgDark: "dark:bg-blue-500/15",
      border: "border-blue-500/20",
      borderDark: "dark:border-blue-500/25",
      gradient: "from-blue-500 to-indigo-600",
      iconBg: "bg-blue-500/15 border-blue-500/20",
      iconBgDark: "dark:bg-blue-500/20 dark:border-blue-500/30",
      badge: "bg-blue-500/15 text-blue-600 border-blue-500/20",
      badgeDark: "dark:text-blue-400 dark:border-blue-500/25",
      hoverBorder: "hover:border-blue-500/30",
      hoverBorderDark: "dark:hover:border-blue-500/30",
      progress: "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400",
      button: "bg-blue-600 hover:bg-blue-500",
      buttonHover: "hover:bg-blue-500",
      shadow: "shadow-blue-500/20 hover:shadow-blue-500/30",
    },
  },

  ciberseguridad: {
    slug: "ciberseguridad",
    name: "Ciberseguridad",
    primaryColor: "#ef4444",
    gradientFrom: "#ef4444",
    gradientVia: "#f43f5e",
    gradientTo: "#be123c",
    textAccent: "#dc2626",
    textAccentDark: "#f87171",
    bgAccent: "rgba(239, 68, 68, 0.10)",
    bgAccentDark: "rgba(239, 68, 68, 0.15)",
    borderAccent: "rgba(239, 68, 68, 0.20)",
    borderAccentDark: "rgba(239, 68, 68, 0.25)",
    icon: "Shield",
    pattern: "hexagonal",
    cssVars: {
      primary: "#ef4444",
      "gradient-from": "#ef4444",
      "gradient-via": "#f43f5e",
      "gradient-to": "#be123c",
      "text-accent": "#dc2626",
      "bg-accent": "rgba(239, 68, 68, 0.10)",
      "border-accent": "rgba(239, 68, 68, 0.20)",
      "glow-color": "rgba(239, 68, 68, 0.15)",
      "pattern-opacity": "0.06",
    },
    tailwind: {
      text: "text-red-600",
      textDark: "dark:text-red-400",
      bg: "bg-red-500/10",
      bgDark: "dark:bg-red-500/15",
      border: "border-red-500/20",
      borderDark: "dark:border-red-500/25",
      gradient: "from-red-500 to-rose-700",
      iconBg: "bg-red-500/15 border-red-500/20",
      iconBgDark: "dark:bg-red-500/20 dark:border-red-500/30",
      badge: "bg-red-500/15 text-red-600 border-red-500/20",
      badgeDark: "dark:text-red-400 dark:border-red-500/25",
      hoverBorder: "hover:border-red-500/30",
      hoverBorderDark: "dark:hover:border-red-500/30",
      progress: "bg-gradient-to-r from-red-600 via-red-500 to-rose-400",
      button: "bg-red-600 hover:bg-red-500",
      buttonHover: "hover:bg-red-500",
      shadow: "shadow-red-500/20 hover:shadow-red-500/30",
    },
  },

  ia: {
    slug: "ia",
    name: "IA",
    primaryColor: "#8b5cf6",
    gradientFrom: "#8b5cf6",
    gradientVia: "#a855f7",
    gradientTo: "#7c3aed",
    textAccent: "#7c3aed",
    textAccentDark: "#a78bfa",
    bgAccent: "rgba(139, 92, 246, 0.10)",
    bgAccentDark: "rgba(139, 92, 246, 0.15)",
    borderAccent: "rgba(139, 92, 246, 0.20)",
    borderAccentDark: "rgba(139, 92, 246, 0.25)",
    icon: "Brain",
    pattern: "neural",
    cssVars: {
      primary: "#8b5cf6",
      "gradient-from": "#8b5cf6",
      "gradient-via": "#a855f7",
      "gradient-to": "#7c3aed",
      "text-accent": "#7c3aed",
      "bg-accent": "rgba(139, 92, 246, 0.10)",
      "border-accent": "rgba(139, 92, 246, 0.20)",
      "glow-color": "rgba(139, 92, 246, 0.15)",
      "pattern-opacity": "0.06",
    },
    tailwind: {
      text: "text-violet-600",
      textDark: "dark:text-violet-400",
      bg: "bg-violet-500/10",
      bgDark: "dark:bg-violet-500/15",
      border: "border-violet-500/20",
      borderDark: "dark:border-violet-500/25",
      gradient: "from-violet-500 to-purple-700",
      iconBg: "bg-violet-500/15 border-violet-500/20",
      iconBgDark: "dark:bg-violet-500/20 dark:border-violet-500/30",
      badge: "bg-violet-500/15 text-violet-600 border-violet-500/20",
      badgeDark: "dark:text-violet-400 dark:border-violet-500/25",
      hoverBorder: "hover:border-violet-500/30",
      hoverBorderDark: "dark:hover:border-violet-500/30",
      progress: "bg-gradient-to-r from-violet-600 via-violet-500 to-purple-400",
      button: "bg-violet-600 hover:bg-violet-500",
      buttonHover: "hover:bg-violet-500",
      shadow: "shadow-violet-500/20 hover:shadow-violet-500/30",
    },
  },

  // Alias for backward compatibility
  "inteligencia-artificial": {
    slug: "ia",
    name: "IA",
    primaryColor: "#8b5cf6",
    gradientFrom: "#8b5cf6",
    gradientVia: "#a855f7",
    gradientTo: "#7c3aed",
    textAccent: "#7c3aed",
    textAccentDark: "#a78bfa",
    bgAccent: "rgba(139, 92, 246, 0.10)",
    bgAccentDark: "rgba(139, 92, 246, 0.15)",
    borderAccent: "rgba(139, 92, 246, 0.20)",
    borderAccentDark: "rgba(139, 92, 246, 0.25)",
    icon: "Brain",
    pattern: "neural",
    cssVars: {
      primary: "#8b5cf6",
      "gradient-from": "#8b5cf6",
      "gradient-via": "#a855f7",
      "gradient-to": "#7c3aed",
      "text-accent": "#7c3aed",
      "bg-accent": "rgba(139, 92, 246, 0.10)",
      "border-accent": "rgba(139, 92, 246, 0.20)",
      "glow-color": "rgba(139, 92, 246, 0.15)",
      "pattern-opacity": "0.06",
    },
    tailwind: {
      text: "text-violet-600",
      textDark: "dark:text-violet-400",
      bg: "bg-violet-500/10",
      bgDark: "dark:bg-violet-500/15",
      border: "border-violet-500/20",
      borderDark: "dark:border-violet-500/25",
      gradient: "from-violet-500 to-purple-700",
      iconBg: "bg-violet-500/15 border-violet-500/20",
      iconBgDark: "dark:bg-violet-500/20 dark:border-violet-500/30",
      badge: "bg-violet-500/15 text-violet-600 border-violet-500/20",
      badgeDark: "dark:text-violet-400 dark:border-violet-500/25",
      hoverBorder: "hover:border-violet-500/30",
      hoverBorderDark: "dark:hover:border-violet-500/30",
      progress: "bg-gradient-to-r from-violet-600 via-violet-500 to-purple-400",
      button: "bg-violet-600 hover:bg-violet-500",
      buttonHover: "hover:bg-violet-500",
      shadow: "shadow-violet-500/20 hover:shadow-violet-500/30",
    },
  },
};

// Default theme (Arquitectura / Emerald)
export const DEFAULT_THEME = CATEGORY_THEMES.arquitectura;

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get a category theme by its slug
 */
export function getCategoryTheme(slug: string): CategoryTheme {
  return CATEGORY_THEMES[slug] || DEFAULT_THEME;
}

/**
 * Get a category theme by the hex color from the database
 */
export function getCategoryThemeByColor(color: string): CategoryTheme {
  const colorMap: Record<string, string> = {
    "#10b981": "arquitectura",
    "#3b82f6": "programacion",
    "#ef4444": "ciberseguridad",
    "#8b5cf6": "ia",
  };
  const slug = colorMap[color.toLowerCase()] || "arquitectura";
  return CATEGORY_THEMES[slug] || DEFAULT_THEME;
}

/**
 * Get a category theme by the category name
 */
export function getCategoryThemeByName(name: string): CategoryTheme {
  const nameMap: Record<string, string> = {
    Arquitectura: "arquitectura",
    "Programación": "programacion",
    Programacion: "programacion",
    Ciberseguridad: "ciberseguridad",
    "Inteligencia Artificial": "ia",
    "inteligencia-artificial": "ia",
    IA: "ia",
  };
  const slug = nameMap[name] || "arquitectura";
  return CATEGORY_THEMES[slug] || DEFAULT_THEME;
}

/**
 * Generate CSS custom properties style object for a theme
 */
export function getCategoryThemeStyle(theme: CategoryTheme): React.CSSProperties {
  const styles: Record<string, string> = {};
  for (const [key, value] of Object.entries(theme.cssVars)) {
    styles[`--category-${key}`] = value;
  }
  return styles as React.CSSProperties;
}

/**
 * All themes as an array (for iteration)
 */
export const ALL_THEMES = Object.values(CATEGORY_THEMES);
