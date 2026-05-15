import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/teacher/courses - List courses by teacherId (requires auth with role "teacher" or "admin")
export async function GET() {
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

    const where = role === "admin" ? {} : { teacherId: session.user.id };

    const courses = await prisma.course.findMany({
      where,
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        image: true,
        icon: true,
        order: true,
        published: true,
        level: true,
        duration: true,
        status: true,
        categoryId: true,
        category: {
          select: { id: true, name: true, icon: true, color: true, slug: true },
        },
        teacherId: true,
        teacher: {
          select: { id: true, name: true, image: true },
        },
        createdAt: true,
        modules: {
          select: {
            id: true,
            number: true,
            title: true,
            description: true,
            topics: {
              select: { id: true },
            },
          },
          orderBy: { number: "asc" },
        },
        _count: {
          select: { enrollments: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = courses.map((course) => ({
      ...course,
      moduleCount: course.modules.length,
      topicCount: course.modules.reduce((sum, m) => sum + m.topics.length, 0),
      enrollmentCount: course._count.enrollments,
      _count: undefined,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching teacher courses:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST /api/teacher/courses - Create a new course (requires auth with role "teacher" or "admin")
export async function POST(request: Request) {
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

    const body = await request.json();
    const {
      slug,
      title,
      description,
      image,
      icon,
      order,
      categoryId,
      level,
      duration,
      status,
    } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { error: "El slug y el título son obligatorios" },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await prisma.course.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe un curso con ese slug" },
        { status: 409 }
      );
    }

    // Validate category if provided
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        return NextResponse.json(
          { error: "La categoría no existe" },
          { status: 400 }
        );
      }
    }

    const course = await prisma.course.create({
      data: {
        slug,
        title,
        description: description || null,
        image: image || null,
        icon: icon || null,
        order: order ?? 0,
        categoryId: categoryId || null,
        teacherId: session.user.id,
        level: level || "principiante",
        duration: duration || null,
        status: status || "draft",
      },
      include: {
        category: { select: { id: true, name: true, icon: true, color: true, slug: true } },
        teacher: { select: { id: true, name: true, image: true } },
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
