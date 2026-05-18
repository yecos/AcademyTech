# Task 1 - Dynamic Curriculum Refactor

## What was done

Refactored the Academy Tech learning platform to make courses dynamic instead of hardcoded. Previously only D5 Render worked because curriculum data was hardcoded. Now all courses (BIM, Web Dev, Ciberseguridad, IA) load their modules and topics from the database.

## Key changes:

### New files:
- `src/app/api/curriculum/route.ts` - API endpoint GET /api/curriculum?slug=<slug>
- `src/hooks/use-curriculum.tsx` - React context + hook for curriculum data
- `src/components/curriculum-provider.tsx` - Wrapper component

### Modified files:
- `src/components/study-app.tsx` - Uses useCurriculum() instead of hardcoded import
- `src/app/modulo/[moduleId]/tema/[topicId]/page.tsx` - Uses useCurriculum() for modules and content
- `src/hooks/use-course-data.ts` - Gets modules from useCurriculum() 
- `src/app/curso/[slug]/page.tsx` - Wraps with CurriculumWrapper
- `src/app/layout.tsx` - Added CurriculumProvider at root level
- `src/components/progress-overview.tsx` - Uses useCurriculum() for dynamic stats

### Backward compatibility:
- D5 Render still uses hardcoded quiz data from curriculum.ts
- D5 Render topic content still uses hardcoded topic-content.ts (with DB fallback)
- Other courses load all data from the database
- Module IDs follow `modulo-{number}` pattern for key compatibility
