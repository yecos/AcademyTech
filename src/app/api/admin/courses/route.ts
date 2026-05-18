import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/courses - List ALL courses (including drafts) with teacher info and category
export async function GET(request: Request) {
  try {
    const auth = await requireAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");

    const where: any = {};
    if (statusFilter) {
      where.status = statusFilter;
    }

    const courses = await prisma.course.findMany({
      where,
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        image: true,
        icon: true,
        status: true,
        published: true,
        level: true,
        duration: true,
        price: true,
        createdAt: true,
        category: {
          select: { id: true, name: true, slug: true, icon: true, color: true },
        },
        teacher: {
          select: { id: true, name: true, email: true, image: true },
        },
        _count: {
          select: {
            modules: true,
            enrollments: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = courses.map((course) => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      image: course.image,
      icon: course.icon,
      status: course.status,
      published: course.published,
      level: course.level,
      duration: course.duration,
      price: course.price,
      createdAt: course.createdAt.toISOString(),
      category: course.category,
      teacher: course.teacher,
      moduleCount: course._count.modules,
      enrollmentCount: course._count.enrollments,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching admin courses:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST /api/admin/courses - Create a new course
export async function POST(request: Request) {
  try {
    const auth = await requireAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { title, slug, description, icon, categoryId, level, duration, price, published, status } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "El título es obligatorio" },
        { status: 400 }
      );
    }

    if (!description || !description.trim()) {
      return NextResponse.json(
        { error: "La descripción es obligatoria" },
        { status: 400 }
      );
    }

    const courseSlug = slug || title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check for duplicate slug
    const existing = await prisma.course.findUnique({ where: { slug: courseSlug } });
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe un curso con ese slug" },
        { status: 409 }
      );
    }

    const validStatuses = ["draft", "pending_review", "published", "rejected"];
    const courseStatus = validStatuses.includes(status) ? status : "draft";
    const validLevels = ["principiante", "intermedio", "avanzado"];
    const courseLevel = validLevels.includes(level) ? level : "principiante";

    const course = await prisma.course.create({
      data: {
        title: title.trim(),
        slug: courseSlug,
        description: description.trim(),
        icon: icon || null,
        categoryId: categoryId || null,
        level: courseLevel,
        duration: duration || null,
        price: typeof price === "number" ? price : 0,
        published: typeof published === "boolean" ? published : false,
        status: courseStatus,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        icon: true,
        status: true,
        published: true,
        level: true,
        duration: true,
        price: true,
        createdAt: true,
        category: {
          select: { id: true, name: true, slug: true, icon: true, color: true },
        },
        teacher: {
          select: { id: true, name: true, email: true, image: true },
        },
        _count: {
          select: {
            modules: true,
            enrollments: true,
          },
        },
      },
    });

    const result = {
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      icon: course.icon,
      status: course.status,
      published: course.published,
      level: course.level,
      duration: course.duration,
      price: course.price,
      createdAt: course.createdAt.toISOString(),
      category: course.category,
      teacher: course.teacher,
      moduleCount: course._count.modules,
      enrollmentCount: course._count.enrollments,
    };

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
