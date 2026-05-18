import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { modules as d5Modules } from "@/lib/curriculum";
import { bimQuizzes } from "@/lib/quizzes/bim-quizzes";
import { webDevQuizzes } from "@/lib/quizzes/web-dev-quizzes";
import { cybersecurityQuizzes } from "@/lib/quizzes/cybersecurity-quizzes";
import { iaQuizzes } from "@/lib/quizzes/ia-quizzes";
import { QuizQuestion } from "@/lib/curriculum";

// Map course slugs to their quiz data
const courseQuizMap: Record<string, Record<number, QuizQuestion[]>> = {
  "diseno-arquitectonico-bim": bimQuizzes,
  "desarrollo-web-completo": webDevQuizzes,
  "fundamentos-ciberseguridad": cybersecurityQuizzes,
  "introduccion-inteligencia-artificial": iaQuizzes,
};

// GET /api/curriculum?slug=d5-render
// Returns the full curriculum for a course, including modules, topics, and quiz data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug del curso requerido" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        modules: {
          orderBy: { number: "asc" },
          select: {
            id: true,
            number: true,
            title: true,
            description: true,
            topics: {
              orderBy: { number: "asc" },
              select: {
                id: true,
                name: true,
                number: true,
                difficulty: true,
                estimatedTime: true,
                videoUrl: true,
                content: true,
                attachments: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    // For D5 Render, use the hardcoded curriculum data (which includes quiz data)
    // and merge it with any DB content that may exist for topics
    if (slug === "d5-render") {
      // Build a map of DB content for topics by module number + topic index
      const dbContentMap = new Map<string, string>();
      for (const dbModule of course.modules) {
        for (const dbTopic of dbModule.topics) {
          const key = `modulo-${dbModule.number}-${dbTopic.number - 1}`;
          if (dbTopic.content) {
            dbContentMap.set(key, dbTopic.content);
          }
        }
      }

      const modules = d5Modules.map((mod) => ({
        id: mod.id,
        number: mod.number,
        title: mod.title,
        topics: mod.topics.map((topic, idx) => ({
          name: topic.name,
          difficulty: topic.difficulty,
          estimatedTime: topic.estimatedTime,
          // Include DB content if available
          content: dbContentMap.get(`${mod.id}-${idx}`) || null,
          number: idx + 1,
        })),
        quiz: mod.quiz,
      }));

      return NextResponse.json({
        courseId: course.id,
        courseTitle: course.title,
        courseDescription: course.description,
        modules,
      });
    }

    // For other courses, build curriculum from DB data
    const modules = course.modules.map((dbModule) => ({
      id: `modulo-${dbModule.number}`,
      number: dbModule.number,
      title: dbModule.title,
      topics: dbModule.topics.map((dbTopic) => ({
        name: dbTopic.name,
        difficulty: dbTopic.difficulty as "basico" | "intermedio" | "avanzado",
        estimatedTime: dbTopic.estimatedTime,
        content: dbTopic.content || null,
        number: dbTopic.number,
        videoUrl: dbTopic.videoUrl || null,
        attachments: dbTopic.attachments ? (() => { try { return JSON.parse(dbTopic.attachments); } catch { return null; } })() : null,
      })),
      quiz: courseQuizMap[slug]?.[dbModule.number] ?? []
    }));

    return NextResponse.json({
      courseId: course.id,
      courseTitle: course.title,
      courseDescription: course.description,
      modules,
    });
  } catch (error) {
    console.error("Error fetching curriculum:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
