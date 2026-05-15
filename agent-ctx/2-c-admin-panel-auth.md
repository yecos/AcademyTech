# Task 2-c: Admin Panel Improvements + Auth Updates

## Agent: Admin Panel & Auth Updates Agent

## Summary
Completed all 4 major tasks for admin panel improvements and auth updates.

## Changes Made

### 1. Admin Auth (`src/lib/admin-auth.ts`)
- `requireAdmin()` → only "admin" role
- `requireTeacher()` → "teacher" or "admin" role (NEW)
- Backward compatible for existing teacher routes

### 2. Auth System (`src/lib/auth.ts`)
- ADMIN_EMAIL handler assigns "admin" role (was "teacher")
- Guest email domain: `academytech.guest` (was `d5academy.guest`)

### 3. Use Auth Hook (`src/hooks/use-auth.ts`)
- `isAdmin = user.role === "admin"` (was "teacher" || "admin")
- `isTeacher = user.role === "teacher" || user.role === "admin"`
- Guest domain updated

### 4. Admin API Routes (4 new files)
- `src/app/api/admin/courses/route.ts` - GET all courses with filters
- `src/app/api/admin/courses/[id]/route.ts` - PUT status, DELETE
- `src/app/api/admin/categories/route.ts` - GET all, POST create
- `src/app/api/admin/categories/[id]/route.ts` - PUT update, DELETE

### 5. Enhanced Admin Stats API
- Added: totalCourses, totalTeachers, pendingReviews
- Added: coursesByCategory breakdown
- Added: recentActivity (last 5 enrollments + last 5 course creations)

### 6. Admin Page Rewrite (5 tabs)
- Overview: 8 stat cards, category breakdown, recent activity, score distribution, drop-off
- Students: Unchanged
- Courses: ALL courses with status filter, approve/reject, publish/unpublish, delete
- Categorías (NEW): Full CRUD with emoji/color picker, toggle published
- Usuarios (NEW): User list with role management, search/filter, count badges

### 7. Bug Fix
- Resolved dynamic route slug conflict: merged `[id]` into `[courseId]` in teacher courses API

## Verification
- Lint: ✅ No errors
- Dev server: ✅ Running (GET / 200, GET /admin 200)
- API routes: ✅ Return 401 for unauthenticated requests
