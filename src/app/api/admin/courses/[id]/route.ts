import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// PUT /api/admin/courses/[id] - Update a course (status, published, or full edit)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await params;
    const body = await request.json();

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    const updateData: any = {};

    // Full edit fields
    if (body.title !== undefined) {
      if (!body.title.trim()) {
        return NextResponse.json(
          { error: "El título es obligatorio" },
          { status: 400 }
        );
      }
      updateData.title = body.title.trim();
    }
    if (body.slug !== undefined) {
      if (!body.slug.trim()) {
        return NextResponse.json(
          { error: "El slug es obligatorio" },
          { status: 400 }
        );
      }
      // Check for duplicate slug (excluding current course)
      const existing = await prisma.course.findFirst({
        where: { slug: body.slug, id: { not: id } },
      });
      if (existing) {
        return NextResponse.json(
          { error: "Ya existe un curso con ese slug" },
          { status: 409 }
        );
      }
      updateData.slug = body.slug.trim();
    }
    if (body.description !== undefined) {
      updateData.description = body.description.trim() || null;
    }
    if (body.icon !== undefined) {
      updateData.icon = body.icon || null;
    }
    if (body.categoryId !== undefined) {
      updateData.categoryId = body.categoryId || null;
    }
    if (body.level !== undefined) {
      const validLevels = ["principiante", "intermedio", "avanzado"];
      updateData.level = validLevels.includes(body.level) ? body.level : "principiante";
    }
    if (body.duration !== undefined) {
      updateData.duration = body.duration || null;
    }
    if (body.price !== undefined) {
      updateData.price = typeof body.price === "number" ? body.price : 0;
    }

    // Status management (with auto-sync to published boolean)
    if (body.status !== undefined) {
      const validStatuses = ["draft", "pending_review", "published", "rejected"];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: `Estado inválido. Estados válidos: ${validStatuses.join(", ")}` },
          { status: 400 }
        );
      }
      updateData.status = body.status;
      // If approving/publishing, also set published boolean
      if (body.status === "published") {
        updateData.published = true;
      }
      if (body.status === "rejected" || body.status === "draft") {
        updateData.published = false;
      }
    }
    if (body.published !== undefined) {
      updateData.published = body.published;
      if (body.published && course.status !== "published") {
        updateData.status = "published";
      }
      if (!body.published && course.status === "published") {
        updateData.status = "draft";
      }
    }

    const updated = await prisma.course.update({
      where: { id },
      data: updateData,
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
      id: updated.id,
      slug: updated.slug,
      title: updated.title,
      description: updated.description,
      icon: updated.icon,
      status: updated.status,
      published: updated.published,
      level: updated.level,
      duration: updated.duration,
      price: updated.price,
      createdAt: updated.createdAt.toISOString(),
      category: updated.category,
      teacher: updated.teacher,
      moduleCount: updated._count.modules,
      enrollmentCount: updated._count.enrollments,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/courses/[id] - Delete a course (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await params;

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    await prisma.course.delete({ where: { id } });

    return NextResponse.json({ message: "Curso eliminado correctamente" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
