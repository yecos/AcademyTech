import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ courseId: string }>;
};

// POST /api/teacher/courses/[courseId]/modules - Add a module to a course
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
    const { number, title, description } = body;

    if (!title) {
      return NextResponse.json(
        { error: "El título del módulo es obligatorio" },
        { status: 400 }
      );
    }

    // Auto-assign number if not provided
    let moduleNumber = number;
    if (!moduleNumber) {
      const lastModule = await prisma.module.findFirst({
        where: { courseId },
        orderBy: { number: "desc" },
        select: { number: true },
      });
      moduleNumber = (lastModule?.number ?? 0) + 1;
    }

    // Check for duplicate number
    const existingModule = await prisma.module.findUnique({
      where: { courseId_number: { courseId, number: moduleNumber } },
    });

    if (existingModule) {
      return NextResponse.json(
        { error: `Ya existe un módulo con el número ${moduleNumber}` },
        { status: 409 }
      );
    }

    const moduleRecord = await prisma.module.create({
      data: {
        number: moduleNumber,
        title,
        description: description || null,
        courseId,
      },
    });

    return NextResponse.json(moduleRecord, { status: 201 });
  } catch (error) {
    console.error("Error creating module:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
