"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  CategoryTheme,
  getCategoryTheme,
  getCategoryThemeStyle,
  DEFAULT_THEME,
} from "@/lib/category-themes";

// ============================================================
// Context
// ============================================================

interface CategoryThemeContextValue {
  theme: CategoryTheme;
  slug: string;
}

const CategoryThemeContext = createContext<CategoryThemeContextValue>({
  theme: DEFAULT_THEME,
  slug: "arquitectura",
});

// ============================================================
// Hook
// ============================================================

export function useCategoryTheme(): CategoryThemeContextValue {
  return useContext(CategoryThemeContext);
}

// ============================================================
// Provider Component
// ============================================================

interface CategoryThemeProviderProps {
  slug: string;
  children: ReactNode;
  /** If true, applies CSS custom properties to the wrapper div */
  applyCssVars?: boolean;
  /** If true, wraps children in a motion.div for smooth theme transitions */
  animated?: boolean;
  /** Additional class names for the wrapper */
  className?: string;
}

export function CategoryThemeProvider({
  slug,
  children,
  applyCssVars = true,
  animated = true,
  className = "",
}: CategoryThemeProviderProps) {
  const theme = useMemo(() => getCategoryTheme(slug), [slug]);

  const contextValue = useMemo(
    () => ({ theme, slug }),
    [theme, slug]
  );

  const cssStyle = useMemo(
    () => (applyCssVars ? getCategoryThemeStyle(theme) : {}),
    [applyCssVars, theme]
  );

  const Wrapper = animated ? motion.div : "div";

  const wrapperProps = animated
    ? {
        initial: { opacity: 0.8 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
        style: cssStyle,
        className: `category-theme-provider ${className}`,
      }
    : {
        style: cssStyle,
        className: `category-theme-provider ${className}`,
      };

  return (
    <CategoryThemeContext.Provider value={contextValue}>
      <Wrapper {...wrapperProps}>{children}</Wrapper>
    </CategoryThemeContext.Provider>
  );
}
