# Certificate Generation System - Work Record

## Task ID: certificates-system
## Agent: main

## Summary
Created a proper certificate generation system for the Academy Tech learning platform with API routes and a fully rewritten certificate page.

## Changes Made

### 1. `/api/certificates/route.ts` (Updated)
- **GET**: Now returns `{ certificates: [...], eligibleCourses: [...] }` instead of just an array
  - `certificates`: List of user's earned certificates with course title, slug, category (name, slug, color), issue date
  - `eligibleCourses`: Enrolled courses that are 100% complete but don't have a certificate yet
  - Both include `category.color` for dynamic accent coloring
- **POST**: Unchanged - generates certificate after validating enrollment + 100% completion
  - Now also returns `category.color` in the response

### 2. `/api/certificates/[id]/route.ts` (Updated)
- **GET**: Now includes `category.color` in the response for public certificate sharing

### 3. `/app/certificado/page.tsx` (Complete Rewrite)
- Fetches certificates from `/api/certificates`
- Shows stats summary (earned vs available to generate)
- **Eligible courses section**: Lists completed courses without certificates with "Generar" button
- **Earned certificates section**: Lists certificates with course name, category, issue date, "Ver Certificado" button
- **Certificate preview modal**: Professional certificate design with:
  - Dynamic accent color based on category
  - Academy Tech branding
  - "Certificado de Finalización" title
  - Student name (large gradient text)
  - Course title, modules count, topics count
  - Completion date in Spanish format
  - Certificate ID
  - Decorative borders and corner accents
  - Download as PNG via html2canvas
- **Empty state**: Encouragement message with "Explorar Cursos" button
- Uses `useAuth` hook for authentication
- Glass-card styling, emerald accents, dark mode, framer-motion animations
- All text in Spanish

## Technical Details
- Dynamic accent colors from category.color field (defaults to emerald #10b981)
- Uses inline styles for dynamic colors (Tailwind can't handle runtime hex values)
- html2canvas for PNG download (dynamically imported)
- Dialog component from shadcn/ui for certificate preview modal
- Responsive design with mobile-first approach
