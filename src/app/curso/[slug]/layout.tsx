import { Metadata } from "next";
import { COURSE_NAMES, COURSE_DESCRIPTIONS } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const courseName = COURSE_NAMES[slug] || slug;
  const courseDescription =
    COURSE_DESCRIPTIONS[slug] ||
    "Plataforma de aprendizaje tecnológico con cursos interactivos y seguimiento de progreso.";

  return {
    title: `${courseName} - Academy Tech`,
    description: courseDescription,
    openGraph: {
      title: `${courseName} - Academy Tech`,
      description: courseDescription,
    },
  };
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
