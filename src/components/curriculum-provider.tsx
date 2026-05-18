"use client";

import { ReactNode } from "react";
import { CurriculumProvider, useCurriculum } from "@/hooks/use-curriculum";

// Re-export the hook for convenience
export { useCurriculum } from "@/hooks/use-curriculum";

interface CurriculumWrapperProps {
  courseSlug: string;
  children: ReactNode;
}

/**
 * Provider component that wraps the course page with the curriculum context.
 * Place this OUTSIDE CourseDataProvider so curriculum data is available to all children.
 *
 * Usage:
 * <CurriculumWrapper courseSlug={slug}>
 *   <CourseDataProvider courseSlug={slug}>
 *     <StudyApp />
 *   </CourseDataProvider>
 * </CurriculumWrapper>
 */
export function CurriculumWrapper({
  courseSlug,
  children,
}: CurriculumWrapperProps) {
  return (
    <CurriculumProvider courseSlug={courseSlug}>
      {children}
    </CurriculumProvider>
  );
}
