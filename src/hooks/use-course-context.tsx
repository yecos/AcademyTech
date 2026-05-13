"use client";

import { createContext, useContext, ReactNode } from "react";
import { useCourseData, CourseData } from "@/hooks/use-course-data";

const CourseDataContext = createContext<CourseData | null>(null);

export function CourseDataProvider({ children }: { children: ReactNode }) {
  const courseData = useCourseData();

  return (
    <CourseDataContext.Provider value={courseData}>
      {children}
    </CourseDataContext.Provider>
  );
}

export function useCourse(): CourseData {
  const context = useContext(CourseDataContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseDataProvider");
  }
  return context;
}
