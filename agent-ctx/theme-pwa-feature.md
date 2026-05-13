# Task: Light/Dark Mode Toggle + PWA Support

## Summary

Successfully implemented both features for the D5 Render Academy Next.js project.

### Feature 1: Light/Dark Mode Toggle

**Files Created:**
- `src/components/theme-provider.tsx` - Theme context provider using React context + useSyncExternalStore
  - Stores preference in localStorage (key: "d5-render-theme")
  - Defaults to "dark" if no preference saved
  - Supports "light", "dark", and "system" modes
  - Exports `useTheme` hook
  - Applies/removes "dark" class on `<html>` element
- `src/components/theme-toggle.tsx` - Small pill-shaped toggle button with Sun/Moon icons

**Files Modified:**
- `src/app/layout.tsx` - Wrapped app with ThemeProvider, removed hardcoded `className="dark"`, added PWA meta tags
- `src/app/globals.css` - Added light mode CSS variables in `:root`, updated glass-card, scrollbar for dual-mode support
- `src/components/study-app.tsx` - Added ThemeToggle, updated all color classes with `dark:` variants
- `src/components/module-card.tsx` - Updated all color classes for light/dark mode
- `src/components/quiz-dialog.tsx` - Updated dialog background, text colors, borders for dual mode
- `src/components/progress-overview.tsx` - Updated stats and progress bar colors
- `src/app/glosario/page.tsx` - Added ThemeToggle, updated all color classes
- `src/app/atajos/page.tsx` - Added ThemeToggle, updated all color classes
- `src/app/marcadores/page.tsx` - Added ThemeToggle, updated all color classes
- `src/app/soluciones/page.tsx` - Added ThemeToggle, updated all color classes
- `src/app/buscar/page.tsx` - Added ThemeToggle, updated all color classes
- `src/app/logros/page.tsx` - Added ThemeToggle, updated all color classes
- `src/app/certificado/page.tsx` - Added ThemeToggle, updated all color classes
- `src/app/comparar/page.tsx` - Added ThemeToggle, updated all color classes
- `src/app/modulo/[moduleId]/tema/[topicId]/page.tsx` - Added ThemeToggle, updated all color classes

**Key class transformation patterns:**
- `bg-zinc-950` → `bg-gray-50 dark:bg-zinc-950`
- `text-white` → `text-gray-900 dark:text-white`
- `text-gray-300` → `text-gray-600 dark:text-gray-300`
- `text-gray-400` → `text-gray-500 dark:text-gray-400`
- `text-gray-500` → `text-gray-400 dark:text-gray-500`
- `bg-white/5` → `bg-gray-100 dark:bg-white/5`
- `bg-white/3` → `bg-gray-100 dark:bg-white/3`
- `border-white/10` → `border-gray-200 dark:border-white/10`
- `border-white/5` → `border-gray-200 dark:border-white/5`
- `hover:bg-white/6` → `hover:bg-gray-200 dark:hover:bg-white/6`

**CSS Updates:**
- `:root` section now has light mode variables (white/light backgrounds, dark text, emerald primary)
- `.dark` section keeps existing dark theme values
- `.glass-card` now renders as white card with subtle border in light mode, transparent glass in dark mode
- `.glass-card-hover` updated for both modes
- Scrollbar styles updated for both modes
- Emerald accent colors adapted for light mode (slightly darker to be visible on white)

### Feature 2: PWA Support

**Files Created:**
- `public/manifest.json` - Web app manifest with D5 Academy branding
- `public/sw.js` - Service worker with stale-while-revalidate caching strategy
- `src/components/sw-registration.tsx` - Client component to register service worker

**Files Modified:**
- `src/app/layout.tsx` - Added manifest link, apple-web-app meta tags, theme-color viewport config, ServiceWorkerRegistration component

### Lint Status
All lint errors resolved. Only pre-existing issue in `use-mobile.ts` was also fixed (setState in effect).

### Bug Fixes
- Fixed `use-mobile.ts` pre-existing lint error by using callback pattern instead of direct setState in effect body
