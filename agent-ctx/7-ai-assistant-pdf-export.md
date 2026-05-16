# Task 7: AI Assistant (BYOK) + Course PDF Export

## Status: COMPLETED

## What was built

### Part A: AI Assistant (BYOK)
1. **AI Settings Page** (`/profesor/ai-config`) - Configure API key, provider, model
2. **AI Chat API** (`/api/ai/chat`) - Streaming SSE endpoint routing to OpenAI/Anthropic/Gemini
3. **AIAssistant Component** - Floating glassmorphism chat panel with typewriter streaming
4. **Course Editor Integration** - "Generar con IA" buttons + insert from AI

### Part B: Course PDF Export
5. **PDF Export API** (`/api/export/course/[courseId]`) - Professional HTML-to-print PDF generation
6. **PDF Export Buttons** - On professor editor and student course page

## Key Files
- `/src/app/profesor/ai-config/page.tsx` (NEW)
- `/src/app/api/ai/chat/route.ts` (NEW)
- `/src/components/AIAssistant.tsx` (NEW)
- `/src/app/api/export/course/[courseId]/route.ts` (NEW)
- `/src/app/profesor/curso/[id]/editar/page.tsx` (MODIFIED)
- `/src/app/profesor/page.tsx` (MODIFIED)
- `/src/components/study-app.tsx` (MODIFIED)

## Verification
- `bun run lint` passes with no errors
- `npx next build` compiles successfully
- All TypeScript types are correct
