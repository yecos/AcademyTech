"use client";

import { useParams } from "next/navigation";
import { StudyApp } from "@/components/study-app";
import { CourseDataProvider } from "@/hooks/use-course-context";

export default function CoursePage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <CourseDataProvider courseSlug={slug}>
      <StudyApp />
    </CourseDataProvider>
  );
}
