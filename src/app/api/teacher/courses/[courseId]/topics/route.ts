import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ courseId: string }>;
};

// POST /api/teacher/courses/[courseId]/topics - Add a topic to a module within a course
export async function POST(
  request: Request,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const role = session.user.role;
    if (role !== "teacher" && role !== "admin") {
      return NextResponse.json(
        { error: "No tienes permisos de profesor o administrador" },
        { status: 403 }
      );
    }

    const { courseId } = await params;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    // Check ownership (unless admin)
    if (role !== "admin" && course.teacherId !== session.user.id) {
      return NextResponse.json(
        { error: "No tienes permisos para modificar este curso" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      moduleId,
      name,
      number,
      difficulty,
      estimatedTime,
      videoUrl,
      content,
      attachments,
    } = body;

    if (!moduleId) {
      return NextResponse.json(
        { error: "El moduleId es obligatorio" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: "El nombre del tema es obligatorio" },
        { status: 400 }
      );
    }

    // Verify the module belongs to this course
    const moduleRecord = await prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!moduleRecord || moduleRecord.courseId !== courseId) {
      return NextResponse.json(
        { error: "El módulo no pertenece a este curso" },
        { status: 400 }
      );
    }

    // Auto-assign number if not provided
    let topicNumber = number;
    if (!topicNumber) {
      const lastTopic = await prisma.topic.findFirst({
        where: { moduleId },
        orderBy: { number: "desc" },
        select: { number: true },
      });
      topicNumber = (lastTopic?.number ?? 0) + 1;
    }

    // Check for duplicate number
    const existingTopic = await prisma.topic.findUnique({
      where: { moduleId_number: { moduleId, number: topicNumber } },
    });

    if (existingTopic) {
      return NextResponse.json(
        { error: `Ya existe un tema con el número ${topicNumber} en este módulo` },
        { status: 409 }
      );
    }

    const topic = await prisma.topic.create({
      data: {
        name,
        number: topicNumber,
        difficulty: difficulty || "basico",
        estimatedTime: estimatedTime || "30 min",
        videoUrl: videoUrl || null,
        content: content || null,
        attachments: attachments || null,
        moduleId,
      },
    });

    return NextResponse.json(topic, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
