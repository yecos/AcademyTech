import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/enrollment - Get user enrollments
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: session.user.id },
      select: {
        courseId: true,
        enrolledAt: true,
      },
    });

    return NextResponse.json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST /api/enrollment - Enroll in course
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

    // Upsert enrollment
    await prisma.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
      create: {
        userId: session.user.id,
        courseId,
      },
      update: {},
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
