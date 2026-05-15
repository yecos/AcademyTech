# Task 1 - Database & API Agent

## Summary
Completed all database schema updates, migration, seed, and API route creation for Academy Tech.

## What Was Done

### 1. Prisma Schema Updates (`prisma/schema.prisma`)
- **Added Category model**: id, slug (unique), name, icon, description, color, order, published, createdAt, courses relation
- **Modified Course model**: Added categoryId/category (optional relation to Category), teacherId/teacher (optional relation to User), level, duration, status fields
- **Modified Topic model**: Added videoUrl, content (Text), attachments (Text/JSON) fields
- **Modified User model**: Added `courses Course[]` relation for teacher-created courses
- **Modified Module model**: Added `description String?` field

### 2. Migration
- Ran `prisma migrate dev --name add_categories_and_teacher_courses` successfully
- Migration applied on Neon PostgreSQL

### 3. Seed Updates (`prisma/seed.ts`)
- Creates 4 categories: Arquitectura, Programación, Ciberseguridad, Inteligencia Artificial
- D5 Render course now linked to "arquitectura" category with `status: "published"`
- Seed output: 4 categories, 10 modules, 60 topics

### 4. Updated API Routes
- `/api/courses/route.ts` - Added category, teacher, level, duration, status fields; backward-compatible filter (published: true OR status: "published")

### 5. New API Routes
- `/api/categories/route.ts` - GET: list categories with course counts
- `/api/teacher/courses/route.ts` - GET: teacher's courses (admin sees all), POST: create course
- `/api/teacher/courses/[id]/route.ts` - GET/PUT/DELETE with ownership checks; PUT supports nested module/topic CRUD
- `/api/teacher/courses/[courseId]/modules/route.ts` - POST: add module
- `/api/teacher/courses/[courseId]/topics/route.ts` - POST: add topic to module
- `/api/admin/users/route.ts` - GET: list users with stats, PUT: update user role

### 6. Verification
- Lint passes with no errors
- Seed ran successfully
