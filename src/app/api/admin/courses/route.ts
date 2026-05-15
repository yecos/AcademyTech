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
