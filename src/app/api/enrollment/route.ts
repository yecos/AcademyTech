import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/enrollment - Get user enrollments
// Query params:
//   - courseId (optional): Check enrollment for a specific course. Returns { enrolled: boolean, enrollment?: object }
//   - Without courseId: Returns all enrollments for the user
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    // If courseId is provided, check enrollment for that specific course
    if (courseId) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId,
          },
        },
        select: {
          id: true,
          courseId: true,
          enrolledAt: true,
          completedAt: true,
        },
      });

      return NextResponse.json({
        enrolled: !!enrollment,
        enrollment: enrollment || null,
      });
    }

    // Otherwise, return all enrollments
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

// POST /api/enrollment - Enroll in course (idempotent)
// Body: { courseId: string }
// Calling this multiple times with the same courseId will not create duplicates.
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

    // Verify the course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true },
    });

    if (!course) {
      return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
    }

    // Upsert enrollment - idempotent: enrolling twice does not error
    const enrollment = await prisma.enrollment.upsert({
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

    return NextResponse.json({ success: true, enrollment });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
