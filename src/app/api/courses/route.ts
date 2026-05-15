import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/courses - List all published courses with user progress
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Fetch all published courses with module/topic counts
    // Backward compat: show course if published: true OR status: "published"
    const courses = await prisma.course.findMany({
      where: {
        OR: [{ published: true }, { status: "published" }],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        image: true,
        icon: true,
        order: true,
        level: true,
        duration: true,
        status: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
            slug: true,
          },
        },
        teacherId: true,
        teacher: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        modules: {
          select: {
            id: true,
            topics: {
              select: { id: true },
            },
          },
        },
      },
      orderBy: { order: "asc" },
    });

    // Calculate module/topic counts and user progress if authenticated
    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const moduleCount = course.modules.length;
        const topicCount = course.modules.reduce(
          (sum, mod) => sum + mod.topics.length,
          0
        );

        let progress = 0;
        let enrolled = false;

        if (userId) {
          // Check enrollment
          const enrollment = await prisma.enrollment.findUnique({
            where: {
              userId_courseId: { userId, courseId: course.id },
            },
          });
          enrolled = !!enrollment;

          // Calculate progress
          if (topicCount > 0) {
            const allTopicIds = course.modules.flatMap((mod) =>
              mod.topics.map((t) => t.id)
            );

            const completedCount = await prisma.userProgress.count({
              where: {
                userId,
                topicId: { in: allTopicIds },
                completed: true,
              },
            });

            progress = Math.round((completedCount / topicCount) * 100);
          }
        }

        return {
          id: course.id,
          slug: course.slug,
          title: course.title,
          description: course.description,
          image: course.image,
          icon: course.icon,
          moduleCount,
          topicCount,
          progress,
          enrolled,
          level: course.level,
          duration: course.duration,
          status: course.status,
          categoryId: course.categoryId,
          category: course.category,
          teacherId: course.teacherId,
          teacher: course.teacher,
        };
      })
    );

    return NextResponse.json(coursesWithStats);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
