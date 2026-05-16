"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { StudyApp } from "@/components/study-app";
import { CourseDataProvider } from "@/hooks/use-course-context";
import { CategoryThemeProvider } from "@/components/CategoryThemeProvider";
import { getCategoryTheme, DEFAULT_THEME, CategoryTheme } from "@/lib/category-themes";

export default function CoursePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [categorySlug, setCategorySlug] = useState<string>("arquitectura");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourseCategory() {
      try {
        const res = await fetch(`/api/course?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.category?.slug) {
            setCategorySlug(data.category.slug);
          }
        }
      } catch (error) {
        console.error("Failed to fetch course category:", error);
      }
      setIsLoading(false);
    }
    fetchCourseCategory();
  }, [slug]);

  return (
    <CategoryThemeProvider slug={categorySlug} animated={true}>
      <CourseDataProvider courseSlug={slug}>
        <StudyApp />
      </CourseDataProvider>
    </CategoryThemeProvider>
  );
}
