"use client";

import { createContext, useContext, ReactNode } from "react";
import { useCourseData, CourseData } from "@/hooks/use-course-data";
import { DEFAULT_COURSE_SLUG } from "@/lib/constants";

const CourseDataContext = createContext<CourseData | null>(null);

// Separate context for the course slug so it can be set from child components
const CourseSlugContext = createContext<string>(DEFAULT_COURSE_SLUG);

export function CourseDataProvider({
  children,
  courseSlug,
}: {
  children: ReactNode;
  courseSlug?: string;
}) {
  const effectiveSlug = courseSlug || DEFAULT_COURSE_SLUG;
  const courseData = useCourseData(effectiveSlug);

  return (
    <CourseSlugContext.Provider value={effectiveSlug}>
      <CourseDataContext.Provider value={courseData}>
        {children}
      </CourseDataContext.Provider>
    </CourseSlugContext.Provider>
  );
}

export function useCourse(): CourseData {
  const context = useContext(CourseDataContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseDataProvider");
  }
  return context;
}

export function useCourseSlug(): string {
  return useContext(CourseSlugContext);
}
