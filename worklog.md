# Worklog: Fix Hardcoded d5-render Navigation Links

**Date:** 2024-03-05
**Issue:** 9 pages had hardcoded back links pointing to `/curso/d5-render`, meaning users in BIM, Web, Cybersecurity, or IA courses would be incorrectly navigated to the D5 Render course when clicking "back".

## Summary of Changes

All 9 files were updated to:
1. Read the `course` query parameter from the URL using `useSearchParams()`
2. Compute a dynamic `backUrl` based on the course slug (or default to `/` home page)
3. Replace all hardcoded `/curso/d5-render` references with the dynamic URL
4. Replace all hardcoded `?course=d5-render` in module navigation links with dynamic course slugs
5. Wrap components using `useSearchParams()` in a `<Suspense>` boundary (Next.js requirement)

## Files Modified

### 1. `src/app/glosario/page.tsx`
- Added `useSearchParams` import and `Suspense` import
- Renamed main component to `GlosarioContent`, created `GlosarioFallback` loading component
- New export: `GlosarioPage` wrapping `GlosarioContent` in `<Suspense>`
- Replaced `router.push("/curso/d5-render")` → `router.push(backUrl)`

### 2. `src/app/marcadores/page.tsx`
- Added `useSearchParams` import and `Suspense` import
- Renamed main component to `MarcadoresContent`, created `MarcadoresFallback` loading component
- New export: `MarcadoresPage` wrapping `MarcadoresContent` in `<Suspense>`
- Replaced `router.push("/curso/d5-render")` → `router.push(backUrl)` (2 instances)
- Replaced `/modulo/...?course=d5-render` → `/modulo/...${courseSlug ? ?course=${courseSlug} : ""}`

### 3. `src/app/logros/page.tsx`
- Added `useSearchParams` import and `Suspense` import
- Renamed main component to `LogrosContent`, created `LogrosFallback` loading component
- New export: `LogrosPage` wrapping `LogrosContent` in `<Suspense>`
- Replaced `router.push("/curso/d5-render")` → `router.push(backUrl)`

### 4. `src/app/certificado/page.tsx`
- Added `useSearchParams` import and `Suspense` import
- Renamed main component to `CertificadoContent`, created `CertificadoFallback` loading component
- New export: `CertificadoPage` wrapping `CertificadoContent` in `<Suspense>`
- Replaced `router.push("/curso/d5-render")` → `router.push(backUrl)` (2 instances)
- Replaced download filename `certificado-d5-render-` → `certificado-${courseSlug || "curso"}-`

### 5. `src/app/buscar/page.tsx`
- Already had `useSearchParams()` and `<Suspense>` boundary
- Added `courseSlug` and `backUrl` computation from searchParams
- Replaced `router.push("/curso/d5-render")` → `router.push(backUrl)`
- Replaced `/modulo/...?course=d5-render` → `/modulo/...${courseSlug ? ?course=${courseSlug} : ""}`

### 6. `src/app/soluciones/page.tsx`
- Added `useSearchParams` import and `Suspense` import
- Renamed main component to `SolucionesContent`, created `SolucionesFallback` loading component
- New export: `SolucionesPage` wrapping `SolucionesContent` in `<Suspense>`
- Replaced `router.push("/curso/d5-render")` → `router.push(backUrl)`

### 7. `src/app/perfil/page.tsx`
- Added `useSearchParams` import and `Suspense` import
- Renamed main component to `PerfilContent`, created `PerfilFallback` loading component
- New export: `PerfilPage` wrapping `PerfilContent` in `<Suspense>`
- Replaced `router.push("/curso/d5-render")` → `router.push(backUrl)`

### 8. `src/app/atajos/page.tsx`
- Added `useSearchParams` import and `Suspense` import
- Renamed main component to `AtajosContent`, created `AtajosFallback` loading component
- New export: `AtajosPage` wrapping `AtajosContent` in `<Suspense>`
- Replaced `router.push("/curso/d5-render")` → `router.push(backUrl)`

### 9. `src/app/comparar/page.tsx`
- Added `useSearchParams` import and `Suspense` import
- Renamed main component to `CompararContent`, created `CompararFallback` loading component
- New export: `CompararPage` wrapping `CompararContent` in `<Suspense>`
- Replaced `router.push("/curso/d5-render")` → `router.push(backUrl)`

## Not Modified (Acceptable Defaults)

### `src/app/modulo/[moduleId]/tema/[topicId]/page.tsx`
- Line 238: `const courseSlug = searchParams.get("course") || "d5-render"` — This is a fallback default for backward compatibility when no course param is in the URL. The page already uses `courseSlug` dynamically for all navigation.
- Line 412: `courseSlug === "d5-render" ? "D5 Render" : courseSlug` — Display name fallback. Not a navigation link.

## Pattern Applied

```tsx
// Before
export default function SomePage() {
  const router = useRouter();
  // ...
  onClick={() => router.push("/curso/d5-render")}
}

// After
function SomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  const backUrl = courseSlug ? `/curso/${courseSlug}` : "/";
  // ...
  onClick={() => router.push(backUrl)}
}

function SomeFallback() {
  return <div>Loading...</div>;
}

export default function SomePage() {
  return (
    <Suspense fallback={<SomeFallback />}>
      <SomeContent />
    </Suspense>
  );
}
```

## Verification

- Build passed successfully (`npx next build`)
- No remaining hardcoded `/curso/d5-render` navigation links in the 9 specified files
- Only remaining `d5-render` references are in the topic page as acceptable fallback defaults

---
Task ID: 1
Agent: Main Agent
Task: Create comprehensive improvement plan for Academy Tech platform production readiness

Work Log:
- Reviewed entire Prisma schema (14 models: Account, Session, VerificationToken, User, Category, Course, Module, Topic, Enrollment, UserProgress, QuizResult, UserNote, Bookmark, UserAchievement, UserStreak)
- Reviewed all existing pages: Home, Login, Profile, Course/[slug], Category/[slug], Module/Topic, Admin, Professor, Certificado, Logros, Marcadores, Buscar, Glosario, Atajos, Comparar, Soluciones
- Reviewed all components: Sidebar, TopBar, StudyApp, ModuleCard, QuizDialog, CategoryThemeProvider, CategoryBackground, AIAssistant, CodeSandbox, ProgressOverview
- Reviewed category theme system (4 hardcoded themes: arquitectura=emerald, programacion=blue, ciberseguridad=red, ia=violet)
- Identified critical gaps: no input validation, no rate limiting, no monetization, no reviews, no notifications, no verifiable certificates, hardcoded certificate text, no rich text editor, no image upload, no dynamic themes
- Designed new database schema with 6 new models: CourseReview, Notification, Certificate, Payment, AuditLog, Coupon
- Designed schema changes for 8 existing models (User, Category, Course, Topic, Module, Enrollment, QuizResult, UserStreak)
- Identified 12 recommended composite indexes for query optimization
- Created 6-phase improvement plan spanning 22 weeks
- Generated professional PDF document with ReportLab (16 pages, 99KB)

Stage Summary:
- Produced: /home/z/my-project/download/Plan_Mejoramiento_Academy_Tech.pdf (16 pages)
- Phase 1 (Weeks 1-3): Security & Quality - Zod validation, rate limiting, sanitization, audit logs
- Phase 2 (Weeks 4-6): Student Experience - notifications, reviews, verifiable certificates, dynamic themes
- Phase 3 (Weeks 7-9): Monetization - Stripe, pricing model, coupons, payment flow
- Phase 4 (Weeks 10-13): Content Tools - rich text editor, image upload, dynamic quizzes, discussions
- Phase 5 (Weeks 14-16): Scalability - Redis cache, ISR, query optimization, CI/CD, E2E tests
- Phase 6 (Weeks 17-22): Advanced - learning paths, recommendations, gamification, i18n, emails
