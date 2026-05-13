# Task: Add Completion Certificate and Comparison Page

## Summary
Added two major features to the D5 Render Academy project:

### Feature 1: Completion Certificate
- **Store updates** (`src/lib/store.ts`):
  - Added `studentName: string` and `completionDate: string | null` to store
  - Added `setStudentName()` and `setCompletionDate()` actions
  - Auto-sets `completionDate` when `toggleTopic()` reaches 100% progress
  - Added both fields to `partialize` for localStorage persistence

- **Certificate page** (`src/app/certificado/page.tsx`):
  - Shows motivational message with progress bar if < 100% complete
  - Shows certificate preview + name input + download button if 100% complete
  - Beautiful dark-themed certificate with emerald accents, decorative borders, seal/badge
  - Uses `html2canvas` for PNG download with `window.print()` fallback
  - Dynamic import of html2canvas (client-side only)

- **Header link**: Added "Certificado" link with Award icon; grayed out if < 100%
- **Footer update**: Added "Obtener Certificado" button when progress is 100%

### Feature 2: Comparison Page
- **Comparison page** (`src/app/comparar/page.tsx`):
  - Compares D5 Render, Lumion, Enscape, V-Ray, Twinmotion
  - 3-tab layout: Comparison Table, Pros & Cons, Scores
  - Horizontal scrollable table with 12 comparison criteria
  - Color-coded engines (D5=emerald, Lumion=blue, Enscape=purple, V-Ray=orange, Twinmotion=cyan)
  - Animated score bars with 6 categories per engine
  - Summary recommendations with average scores

- **Header link**: Added "Comparar" link with GitCompare icon

## Dependencies Added
- `html2canvas@1.4.1` - for certificate PNG download

## Build Verification
- `npx next build` compiled successfully
- Both `/certificado` and `/comparar` routes confirmed in build output
