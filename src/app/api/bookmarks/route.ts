import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/bookmarks?courseId=xxx - Get all bookmarks for a course
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

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: session.user.id,
        topic: {
          module: { courseId },
        },
      },
      select: {
        topicId: true,
      },
    });

    // Return as Record<topicId, true>
    const bookmarksMap: Record<string, boolean> = {};
    for (const b of bookmarks) {
      bookmarksMap[b.topicId] = true;
    }

    return NextResponse.json(bookmarksMap);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST /api/bookmarks - Toggle bookmark
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { topicId, bookmarked } = body;

    if (!topicId) {
      return NextResponse.json({ error: "topicId es requerido" }, { status: 400 });
    }

    // Verify topic exists
    const topic = await prisma.topic.findUnique({ where: { id: topicId } });
    if (!topic) {
      return NextResponse.json({ error: "Tema no encontrado" }, { status: 404 });
    }

    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_topicId: {
          userId: session.user.id,
          topicId,
        },
      },
    });

    const shouldBookmark = bookmarked !== undefined ? bookmarked : !existing;

    if (shouldBookmark && !existing) {
      await prisma.bookmark.create({
        data: {
          userId: session.user.id,
          topicId,
        },
      });
    } else if (!shouldBookmark && existing) {
      await prisma.bookmark.delete({
        where: { id: existing.id },
      });
    }

    return NextResponse.json({ success: true, bookmarked: shouldBookmark });
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
