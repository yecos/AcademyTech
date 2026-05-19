import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/reset - Reset all user data for a course
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: "courseId es requerido" }, { status: 400 });
    }

    const userId = session.user.id;

    // Get all topic IDs for this course
    const topicIds = await prisma.topic.findMany({
      where: { module: { courseId } },
      select: { id: true },
    });
    const topicIdList = topicIds.map((t) => t.id);

    // Get all module IDs for this course
    const moduleIds = await prisma.module.findMany({
      where: { courseId },
      select: { id: true },
    });
    const moduleIdList = moduleIds.map((m) => m.id);

    // Delete all user data for this course in a transaction
    // Note: Only delete course-specific data, NOT global data like achievements and streaks
    // that may belong to other courses
    await prisma.$transaction([
      prisma.userProgress.deleteMany({
        where: { userId, topicId: { in: topicIdList } },
      }),
      prisma.quizResult.deleteMany({
        where: { userId, moduleId: { in: moduleIdList } },
      }),
      prisma.userNote.deleteMany({
        where: { userId, topicId: { in: topicIdList } },
      }),
      prisma.bookmark.deleteMany({
        where: { userId, topicId: { in: topicIdList } },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error resetting data:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
