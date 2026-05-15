import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// PUT /api/admin/courses/[id] - Update course status (approve/reject/publish/unpublish)
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
    const { status, published } = body;

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    const updateData: any = {};
    if (status !== undefined) {
      const validStatuses = ["draft", "pending_review", "published", "rejected"];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { error: `Estado inválido. Estados válidos: ${validStatuses.join(", ")}` },
          { status: 400 }
        );
      }
      updateData.status = status;
      // If approving/publishing, also set published boolean
      if (status === "published") {
        updateData.published = true;
      }
      if (status === "rejected" || status === "draft") {
        updateData.published = false;
      }
    }
    if (published !== undefined) {
      updateData.published = published;
      if (published && course.status !== "published") {
        updateData.status = "published";
      }
      if (!published && course.status === "published") {
        updateData.status = "draft";
      }
    }

    const updated = await prisma.course.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        title: true,
        status: true,
        published: true,
      },
    });

    return NextResponse.json(updated);
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
