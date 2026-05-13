import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/progress?courseId=xxx - Get all user progress for a course
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

    const progress = await prisma.userProgress.findMany({
      where: {
        userId: session.user.id,
        topic: {
          module: { courseId },
        },
        completed: true,
      },
      select: {
        topicId: true,
        completedAt: true,
      },
    });

    // Return as Record<topicId, true>
    const progressMap: Record<string, boolean> = {};
    for (const p of progress) {
      progressMap[p.topicId] = true;
    }

    return NextResponse.json(progressMap);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST /api/progress - Toggle topic completion
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { topicId, completed } = body;

    if (!topicId) {
      return NextResponse.json({ error: "topicId es requerido" }, { status: 400 });
    }

    // Verify topic exists
    const topic = await prisma.topic.findUnique({ where: { id: topicId } });
    if (!topic) {
      return NextResponse.json({ error: "Tema no encontrado" }, { status: 404 });
    }

    const existing = await prisma.userProgress.findUnique({
      where: {
        userId_topicId: {
          userId: session.user.id,
          topicId,
        },
      },
    });

    if (existing) {
      const newCompleted = completed !== undefined ? completed : !existing.completed;
      await prisma.userProgress.update({
        where: { id: existing.id },
        data: {
          completed: newCompleted,
          completedAt: newCompleted ? new Date() : null,
        },
      });
    } else {
      const newCompleted = completed !== undefined ? completed : true;
      await prisma.userProgress.create({
        data: {
          userId: session.user.id,
          topicId,
          completed: newCompleted,
          completedAt: newCompleted ? new Date() : null,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
