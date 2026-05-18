# Worklog - Task 7: AI Assistant (BYOK) + Course PDF Export

## Summary
Built a comprehensive AI Assistant system with BYOK (Bring Your Own Key) architecture and professional PDF export for course content.

## Files Created

### PART A: AI Assistant (BYOK)

1. **`/src/app/profesor/ai-config/page.tsx`** - AI Settings page
   - Provider selector (OpenAI, Anthropic, Google Gemini)
   - Model selector (dynamic based on provider)
   - API key input with show/hide toggle (password masked)
   - Test connection button
   - Save/clear config to localStorage (NOT database - security)
   - Status indicator (configured / not configured)
   - BYOK explanation section
   - All text in Spanish

2. **`/src/app/api/ai/chat/route.ts`** - Streaming chat completion API
   - Accepts: messages, provider, apiKey, model
   - Routes to OpenAI, Anthropic, or Google Gemini APIs
   - Returns streaming SSE response
   - Never stores API key server-side
   - Validates requests (max messages, valid providers/models)
   - Error handling for invalid keys, rate limits, etc.

3. **`/src/components/AIAssistant.tsx`** - Floating chat panel component
   - Floating action button (bottom-right) with pulse animation
   - Slide-up glassmorphism chat panel
   - Chat interface with message bubbles
   - System prompt for course creation assistance
   - Pre-built prompt buttons (4 Spanish quick actions)
   - Streaming typewriter effect for AI responses
   - Copy to clipboard button
   - Insert into course editor button
   - Setup prompt if no API key configured
   - Expand/collapse, clear conversation
   - Dark mode fully compatible

4. **Modified `/src/app/profesor/curso/[id]/editar/page.tsx`** - Course Editor Integration
   - Added AIAssistant component with context-aware integration
   - "Generar con IA" buttons next to course description and topic content
   - PDF export button in top bar
   - Insert from AI goes into the active content field

5. **Modified `/src/app/profesor/page.tsx`** - Professor Dashboard
   - Added "Config IA" button linking to AI settings page

### PART B: Course PDF Export

6. **`/src/app/api/export/course/[courseId]/route.ts`** - PDF Export API
   - Fetches course with all modules, topics, and metadata
   - Generates professional HTML with print-to-PDF capability
   - Cover page with course branding
   - Table of contents
   - Module sections with topic content
   - Markdown-to-HTML rendering
   - Academy Tech branding
   - Professional layout with emerald color scheme
   - Print button (hidden during print)

7. **Modified `/src/components/study-app.tsx`** - Student Course Page
   - Added PDF download button in header

## Technical Details

- AI API key stored ONLY in localStorage (browser-only), never sent to server or database
- Streaming SSE for real-time AI response display
- Provider routing: OpenAI (gpt-4o, gpt-4o-mini, gpt-4-turbo), Anthropic (claude-sonnet-4, claude-3-haiku), Google (gemini-2.0-flash, gemini-1.5-pro)
- PDF generation uses HTML-to-print approach with professional CSS styling
- All text in Spanish
- Lint and build pass successfully
---
Task ID: 2
Agent: main
Task: Create complete courses for Academy Tech app

Work Log:
- Created 4 comprehensive seed scripts for each category
- prisma/seed-arquitectura.ts: Diseño Arquitectónico con BIM (6 modules, 26 topics with rich content)
- prisma/seed-programacion.ts: Desarrollo Web Completo HTML/CSS/JS (6 modules, 24 topics with rich content)
- prisma/seed-ciberseguridad.ts: Fundamentos de Ciberseguridad y Ethical Hacking (6 modules, 24 topics with rich content)
- prisma/seed-ia.ts: Inteligencia Artificial Fundamentos a Práctica (6 modules, 25 topics with rich content)
- Added npm scripts: seed:arquitectura, seed:programacion, seed:ciberseguridad, seed:ia, seed:all-courses
- Created API endpoint POST /api/seed-courses (admin only) for seeding from production
- Pushed each course as separate commit: 7484d5b, 6a1eee5, b6c8d43, d86bb1e, 5ce04e6

Stage Summary:
- 4 complete courses created with full educational content (99+ topics total)
- Each topic has rich text content (not just names)
- API endpoint allows seeding from production without CLI access
- All pushed to GitHub on main branch
- User needs to deploy and then call POST /api/seed-courses to populate the database

---

Task ID: 1
Agent: main
Task: Refactor Academy Tech learning platform to make courses dynamic instead of hardcoded

## Summary
Refactored the "Academy Tech" learning platform so that courses load dynamically from the database instead of using hardcoded D5 Render curriculum data. Previously, only the D5 Render course worked because curriculum data was hardcoded in `src/lib/curriculum.ts`. Now all courses (BIM, Web Dev, Ciberseguridad, IA) can load their modules and topics from the database via a new API endpoint and React context.

## Files Created

1. **`/src/app/api/curriculum/route.ts`** - New API endpoint
   - GET `/api/curriculum?slug=<course-slug>` returns full curriculum for any course
   - For D5 Render: uses hardcoded `curriculum.ts` data (with quiz) + merges DB content
   - For other courses: builds curriculum from DB (Course -> Module -> Topic)
   - Module IDs follow `modulo-{number}` pattern for compatibility with existing key system
   - Public endpoint (no auth required)

2. **`/src/hooks/use-curriculum.tsx`** - React context + hook
   - `CurriculumProvider` component wraps app sections with curriculum data
   - `useCurriculum()` hook provides: modules, courseId, courseTitle, courseDescription, isLoading, error, getTopicContentFromDB
   - `getTopicContentFromDB()`: for D5 Render checks hardcoded topic-content.ts first then falls back to DB; for other courses uses DB content field
   - Supports structured JSON content and plain text content from DB
   - Global cache prevents re-fetching on navigation
   - Exported `TopicInfoWithContent` and `ModuleWithContent` extended interfaces

3. **`/src/components/curriculum-provider.tsx`** - Wrapper component
   - `CurriculumWrapper` component that wraps course pages with CurriculumProvider
   - Re-exports useCurriculum for convenience

## Files Modified

4. **`/src/components/study-app.tsx`**
   - Removed `import { modules } from "@/lib/curriculum"`
   - Added `import { useCurriculum } from "@/hooks/use-curriculum"`
   - Uses `const { modules, isLoading, courseTitle, courseDescription } = useCurriculum()`
   - Added loading spinner state while curriculum is being fetched
   - Dynamic courseName/courseDescription from API data
   - Moved hooks (useCategoryTheme, useAchievementChecker) before early return to comply with React hooks rules

5. **`/src/app/modulo/[moduleId]/tema/[topicId]/page.tsx`**
   - Removed `import { modules } from "@/lib/curriculum"` and `import { getTopicContent } from "@/lib/topic-content"`
   - Uses `const { modules, getTopicContentFromDB, isLoading } = useCurriculum()`
   - Added loading spinner state while curriculum loads
   - getTopicContentFromDB replaces direct getTopicContent call
   - "Tema no encontrado" fallback still works when module/topic not found

6. **`/src/hooks/use-course-data.ts`**
   - Removed `import { modules } from "@/lib/curriculum"`
   - Added `import { useCurriculum } from "@/hooks/use-curriculum"`
   - `const { modules } = useCurriculum()` provides dynamic modules
   - All computed helpers (getModuleProgress, getOverallProgress, getBookmarkedTopics, etc.) now use dynamic modules

7. **`/src/app/curso/[slug]/page.tsx`**
   - Added `import { CurriculumWrapper } from "@/components/curriculum-provider"`
   - Wraps children with `<CurriculumWrapper courseSlug={slug}>` outside CourseDataProvider

8. **`/src/app/layout.tsx`**
   - Added `import { CurriculumProvider } from "@/hooks/use-curriculum"`
   - Root layout wraps everything in `<CurriculumProvider courseSlug="d5-render">` as default
   - Course pages override with their own CurriculumProvider via CurriculumWrapper

9. **`/src/components/progress-overview.tsx`**
   - Removed `import { modules } from "@/lib/curriculum"`
   - Added `import { useCurriculum } from "@/hooks/use-curriculum"`
   - Uses `const { modules } = useCurriculum()` for dynamic stats

## Files NOT Modified (intentionally)

- `src/lib/curriculum.ts` - Kept as-is, still used by D5 Render API route for quiz data
- `src/lib/topic-content.ts` - Kept as-is, still used for D5 Render topic content
- `src/app/buscar/page.tsx` - D5 Render specific search, keeps hardcoded modules
- `src/app/marcadores/page.tsx` - D5 Render specific bookmarks, keeps hardcoded modules
- `src/components/module-card.tsx` - Only imports types (Module, TopicInfo), not runtime data
- `src/components/quiz-dialog.tsx` - Only imports types (Module, QuizQuestion), not runtime data

## Key Design Decisions

1. **Backward Compatibility**: D5 Render course works exactly as before - hardcoded quiz data and topic content are preserved
2. **Module ID Convention**: All modules use `modulo-{number}` ID pattern to maintain compatibility with existing key system
3. **Content Rendering**: DB content can be structured JSON or plain text - both are handled
4. **Caching**: Global cache by slug prevents redundant API calls during navigation
5. **Root Provider**: Default CurriculumProvider in root layout ensures topic pages always have access to curriculum data

## Build Verification

- `bun run lint` passes (only pre-existing errors remain)
- `next build` succeeds with no new errors
- All existing functionality preserved for D5 Render
