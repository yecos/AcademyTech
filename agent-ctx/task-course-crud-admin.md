# Task: Add Course Creation and Editing to Admin Panel

## Summary
Added full course creation and editing functionality to the "Cursos" tab in the admin panel, including backend API support.

## Changes Made

### 1. Backend API - `/src/app/api/admin/courses/route.ts`
- **Added POST handler** for creating courses with validation:
  - Validates required fields (title, description)
  - Auto-generates slug from title if not provided
  - Checks for duplicate slugs (409 conflict)
  - Validates level and status enums
  - Returns the created course with full details (201)

- **Updated GET handler** to include `price` field in the response

### 2. Backend API - `/src/app/api/admin/courses/[id]/route.ts`
- **Enhanced PUT handler** to support full course updates:
  - Added support for: title, slug, description, icon, categoryId, level, duration, price
  - Validates title (required if provided)
  - Validates slug (required if provided, checks for duplicates excluding current course)
  - Validates level and status enums
  - Maintains backward compatibility with status/published toggle functionality
  - Returns full updated course details instead of just id/title/status/published

### 3. Frontend - `/src/app/admin/page.tsx`
- **Added state variables**: showCourseForm, editingCourse, isSavingCourse, courseFormError, slugManuallyEdited, courseForm
- **Added AdminCourse interface field**: `price: number`
- **Added handlers**:
  - `handleCreateCourse()` - POST to create new course
  - `handleUpdateCourse()` - PUT to update existing course
  - `startEditCourse()` - Populate form with course data for editing
  - `cancelCourseForm()` - Reset form and close
- **Added "Nuevo Curso" button** at the top of the courses tab
- **Added course creation/editing form** as inline section with:
  - Title (auto-generates slug)
  - Slug (editable, tracks manual edits)
  - Description (textarea)
  - Icon (emoji picker with text input)
  - Category (select from existing categories)
  - Level (select: principiante, intermedio, avanzado)
  - Duration (text input)
  - Price (number input, default 0)
  - Published (checkbox)
  - Status (select: draft, pending_review, published, rejected)
  - Error message display
  - Save/Cancel buttons with loading state
- **Added "Editar" button** to each course card
- **Added price display** on course cards (when > 0)
- **Added Save icon import** from lucide-react

## All UI text is in Spanish as required.
