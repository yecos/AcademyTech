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
    // Use published: true for backward compatibility
    const courses = await prisma.course.findMany({
      where: { published: true },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        image: true,
        icon: true,
        order: true,
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

    // Try to get extra fields if available (category, teacher, level, etc.)
    let coursesExtra: Record<string, any> = {};
    try {
      const extra = await prisma.course.findMany({
        where: { published: true },
        select: {
          id: true,
          level: true,
          duration: true,
          status: true,
          categoryId: true,
          teacherId: true,
          category: {
            select: {
              id: true,
              name: true,
              icon: true,
              color: true,
              slug: true,
            },
          },
          teacher: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });
      for (const c of extra) {
        coursesExtra[c.id] = c;
      }
    } catch (e) {
      // Extra fields not available yet (migration not applied)
      console.log("Extra course fields not available, using defaults");
    }

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
        let enrolledAt: string | null = null;
        let completedTopics = 0;
        let lastStudyDate: string | null = null;

        if (userId) {
          // Check enrollment
          const enrollment = await prisma.enrollment.findUnique({
            where: {
              userId_courseId: { userId, courseId: course.id },
            },
            select: { enrolledAt: true },
          });
          enrolled = !!enrollment;
          enrolledAt = enrollment?.enrolledAt?.toISOString() || null;

          // Calculate progress
          if (topicCount > 0) {
            const allTopicIds = course.modules.flatMap((mod) =>
              mod.topics.map((t) => t.id)
            );

            const completedRecords = await prisma.userProgress.findMany({
              where: {
                userId,
                topicId: { in: allTopicIds },
                completed: true,
              },
              select: { completedAt: true },
              orderBy: { completedAt: "desc" },
            });

            completedTopics = completedRecords.length;
            progress = Math.round((completedTopics / topicCount) * 100);

            // Last study date = most recent completedAt
            if (completedRecords.length > 0 && completedRecords[0].completedAt) {
              lastStudyDate = completedRecords[0].completedAt.toISOString();
            }
          }
        }

        const extra = coursesExtra[course.id] || {};

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
          enrolledAt,
          completedTopics,
          lastStudyDate,
          level: extra.level || "principiante",
          duration: extra.duration || null,
          status: extra.status || "published",
          categoryId: extra.categoryId || null,
          category: extra.category || null,
          teacherId: extra.teacherId || null,
          teacher: extra.teacher || null,
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
