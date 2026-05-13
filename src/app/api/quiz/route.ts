import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/quiz?courseId=xxx - Get all quiz results for a course
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "courseId es requerido" }, { status: 400 });
    }

    // QuizResult doesn't have a module relation, so we need to get module IDs first
    const courseModules = await prisma.module.findMany({
      where: { courseId },
      select: { id: true },
    });
    const moduleIds = courseModules.map((m) => m.id);

    const quizResults = await prisma.quizResult.findMany({
      where: {
        userId: session.user.id,
        moduleId: { in: moduleIds },
      },
      select: {
        moduleId: true,
        score: true,
        totalQuestions: true,
        answers: true,
        completedAt: true,
      },
    });

    // Return as Record<moduleId, { score, total, answers }>
    const resultsMap: Record<string, { score: number; total: number; answers: string }> = {};
    for (const r of quizResults) {
      resultsMap[r.moduleId] = {
        score: r.score,
        total: r.totalQuestions,
        answers: r.answers,
      };
    }

    return NextResponse.json(resultsMap);
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST /api/quiz - Save quiz result
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { moduleId, score, totalQuestions, answers } = body;

    if (!moduleId || score === undefined || !totalQuestions || !answers) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    // Use upsert since there's a unique constraint on userId+moduleId
    await prisma.quizResult.upsert({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId,
        },
      },
      create: {
        userId: session.user.id,
        moduleId,
        score,
        totalQuestions,
        answers: typeof answers === "string" ? answers : JSON.stringify(answers),
      },
      update: {
        score,
        totalQuestions,
        answers: typeof answers === "string" ? answers : JSON.stringify(answers),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving quiz result:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
