import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ courseId: string }>;
};

// GET /api/teacher/courses/[courseId] - Get a specific course (only if teacher owns it or admin)
export async function GET(
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

    const { courseId: id } = await params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true, icon: true, color: true, slug: true },
        },
        teacher: {
          select: { id: true, name: true, image: true },
        },
        modules: {
          select: {
            id: true,
            number: true,
            title: true,
            description: true,
            topics: {
              select: {
                id: true,
                name: true,
                number: true,
                difficulty: true,
                estimatedTime: true,
                videoUrl: true,
                content: true,
                attachments: true,
              },
              orderBy: { number: "asc" },
            },
          },
          orderBy: { number: "asc" },
        },
        enrollments: {
          select: { id: true },
        },
      },
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
        { error: "No tienes permisos para ver este curso" },
        { status: 403 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PUT /api/teacher/courses/[courseId] - Update a specific course
export async function PUT(
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

    const { courseId: id } = await params;

    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    // Check ownership (unless admin)
    if (role !== "admin" && existingCourse.teacherId !== session.user.id) {
      return NextResponse.json(
        { error: "No tienes permisos para editar este curso" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      icon,
      level,
      duration,
      status,
      categoryId,
      image,
      order,
      modules: modulesData,
    } = body;

    // Validate category if provided
    if (categoryId !== undefined && categoryId !== null) {
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

    // Update course basic fields
    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;
    if (level !== undefined) updateData.level = level;
    if (duration !== undefined) updateData.duration = duration;
    if (status !== undefined) updateData.status = status;
    if (categoryId !== undefined) updateData.categoryId = categoryId || null;
    if (image !== undefined) updateData.image = image;
    if (order !== undefined) updateData.order = order;

    // Also set published flag based on status for backward compat
    if (status === "published") {
      updateData.published = true;
    } else if (status && status !== "published") {
      updateData.published = false;
    }

    await prisma.course.update({
      where: { id },
      data: updateData,
    });

    // Handle nested modules create/update/delete
    if (modulesData && Array.isArray(modulesData)) {
      for (const mod of modulesData) {
        if (mod._delete && mod.id) {
          // Delete module
          await prisma.module.delete({ where: { id: mod.id } });
        } else if (mod.id) {
          // Update existing module
          const modUpdate: Record<string, unknown> = {};
          if (mod.title !== undefined) modUpdate.title = mod.title;
          if (mod.number !== undefined) modUpdate.number = mod.number;
          if (mod.description !== undefined) modUpdate.description = mod.description;

          await prisma.module.update({
            where: { id: mod.id },
            data: modUpdate,
          });

          // Handle nested topics
          if (mod.topics && Array.isArray(mod.topics)) {
            for (const topic of mod.topics) {
              if (topic._delete && topic.id) {
                await prisma.topic.delete({ where: { id: topic.id } });
              } else if (topic.id) {
                // Update existing topic
                const topicUpdate: Record<string, unknown> = {};
                if (topic.name !== undefined) topicUpdate.name = topic.name;
                if (topic.number !== undefined) topicUpdate.number = topic.number;
                if (topic.difficulty !== undefined) topicUpdate.difficulty = topic.difficulty;
                if (topic.estimatedTime !== undefined) topicUpdate.estimatedTime = topic.estimatedTime;
                if (topic.videoUrl !== undefined) topicUpdate.videoUrl = topic.videoUrl;
                if (topic.content !== undefined) topicUpdate.content = topic.content;
                if (topic.attachments !== undefined) topicUpdate.attachments = topic.attachments;

                await prisma.topic.update({
                  where: { id: topic.id },
                  data: topicUpdate,
                });
              } else if (!topic._delete) {
                // Create new topic
                await prisma.topic.create({
                  data: {
                    name: topic.name || "Nuevo tema",
                    number: topic.number || 1,
                    difficulty: topic.difficulty || "basico",
                    estimatedTime: topic.estimatedTime || "30 min",
                    videoUrl: topic.videoUrl || null,
                    content: topic.content || null,
                    attachments: topic.attachments || null,
                    moduleId: mod.id,
                  },
                });
              }
            }
          }
        } else if (!mod._delete) {
          // Create new module with topics
          const newModule = await prisma.module.create({
            data: {
              number: mod.number || 1,
              title: mod.title || "Nuevo módulo",
              description: mod.description || null,
              courseId: id,
            },
          });

          if (mod.topics && Array.isArray(mod.topics)) {
            for (const topic of mod.topics) {
              if (!topic._delete) {
                await prisma.topic.create({
                  data: {
                    name: topic.name || "Nuevo tema",
                    number: topic.number || 1,
                    difficulty: topic.difficulty || "basico",
                    estimatedTime: topic.estimatedTime || "30 min",
                    videoUrl: topic.videoUrl || null,
                    content: topic.content || null,
                    attachments: topic.attachments || null,
                    moduleId: newModule.id,
                  },
                });
              }
            }
          }
        }
      }
    }

    // Return updated course
    const updatedCourse = await prisma.course.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true, icon: true, color: true, slug: true },
        },
        teacher: {
          select: { id: true, name: true, image: true },
        },
        modules: {
          include: {
            topics: { orderBy: { number: "asc" } },
          },
          orderBy: { number: "asc" },
        },
      },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// DELETE /api/teacher/courses/[courseId] - Delete a specific course
export async function DELETE(
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

    const { courseId: id } = await params;

    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    // Check ownership (unless admin)
    if (role !== "admin" && existingCourse.teacherId !== session.user.id) {
      return NextResponse.json(
        { error: "No tienes permisos para eliminar este curso" },
        { status: 403 }
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
