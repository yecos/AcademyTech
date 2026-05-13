import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/notes?courseId=xxx - Get all notes for a course
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

    const notes = await prisma.userNote.findMany({
      where: {
        userId: session.user.id,
        topic: {
          module: { courseId },
        },
      },
      select: {
        topicId: true,
        content: true,
      },
    });

    // Return as Record<topicId, content>
    const notesMap: Record<string, string> = {};
    for (const n of notes) {
      notesMap[n.topicId] = n.content;
    }

    return NextResponse.json(notesMap);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST /api/notes - Save/update note
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { topicId, content } = body;

    if (!topicId) {
      return NextResponse.json({ error: "topicId es requerido" }, { status: 400 });
    }

    // Verify topic exists
    const topic = await prisma.topic.findUnique({ where: { id: topicId } });
    if (!topic) {
      return NextResponse.json({ error: "Tema no encontrado" }, { status: 404 });
    }

    await prisma.userNote.upsert({
      where: {
        userId_topicId: {
          userId: session.user.id,
          topicId,
        },
      },
      create: {
        userId: session.user.id,
        topicId,
        content: content || "",
      },
      update: {
        content: content || "",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving note:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
