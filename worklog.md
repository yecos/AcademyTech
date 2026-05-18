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
