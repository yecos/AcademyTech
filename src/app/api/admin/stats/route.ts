import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/stats - Returns overall platform stats
export async function GET() {
  try {
    const auth = await requireAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Total students
    const totalStudents = await prisma.user.count({
      where: { role: "student" },
    });

    // Total teachers
    const totalTeachers = await prisma.user.count({
      where: { role: "teacher" },
    });

    // Total courses
    const totalCourses = await prisma.course.count();

    // Pending reviews
    const pendingReviews = await prisma.course.count({
      where: { status: "pending_review" },
    });

    // Active students (progress in the last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activeStudents = await prisma.user.count({
      where: {
        role: "student",
        progress: {
          some: {
            completedAt: { gte: sevenDaysAgo },
          },
        },
      },
    });

    // Total topics across all courses
    const totalTopics = await prisma.topic.count();

    // Average completion rate across all students
    let completionRate = 0;
    if (totalStudents > 0 && totalTopics > 0) {
      const totalCompleted = await prisma.userProgress.count({
        where: {
          user: { role: "student" },
          completed: true,
        },
      });
      completionRate = Math.round((totalCompleted / (totalStudents * totalTopics)) * 100);
    }

    // Average quiz score
    const quizAgg = await prisma.quizResult.aggregate({
      _avg: { score: true, totalQuestions: true },
      where: {
        user: { role: "student" },
      },
    });

    let avgQuizScore = 0;
    if (quizAgg._avg.score && quizAgg._avg.totalQuestions) {
      avgQuizScore = Math.round(
        (quizAgg._avg.score / quizAgg._avg.totalQuestions) * 100
      );
    }

    // Module completion rates
    const modules = await prisma.module.findMany({
      select: {
        id: true,
        number: true,
        title: true,
        topics: { select: { id: true } },
      },
      orderBy: { number: "asc" },
    });

    const moduleStats = await Promise.all(
      modules.map(async (mod) => {
        const topicIds = mod.topics.map((t) => t.id);
        const topicCount = topicIds.length;

        // Completion rate for this module
        let completionRate = 0;
        if (totalStudents > 0 && topicCount > 0) {
          const completedEntries = await prisma.userProgress.count({
            where: {
              topicId: { in: topicIds },
              completed: true,
              user: { role: "student" },
            },
          });
          completionRate = Math.round(
            (completedEntries / (totalStudents * topicCount)) * 100
          );
        }

        // Quiz stats for this module
        const quizAgg = await prisma.quizResult.aggregate({
          _avg: { score: true, totalQuestions: true },
          _count: true,
          where: {
            moduleId: mod.id,
            user: { role: "student" },
          },
        });

        const avgModuleScore =
          quizAgg._avg.score && quizAgg._avg.totalQuestions
            ? Math.round(
                (quizAgg._avg.score / quizAgg._avg.totalQuestions) * 100
              )
            : 0;

        return {
          id: mod.id,
          number: mod.number,
          title: mod.title,
          topicCount,
          completionRate,
          quizTakes: quizAgg._count,
          avgQuizScore: avgModuleScore,
        };
      })
    );

    // Quiz score distribution
    const allQuizResults = await prisma.quizResult.findMany({
      where: { user: { role: "student" } },
      select: { score: true, totalQuestions: true },
    });

    const scoreDistribution = {
      excellent: 0, // 90-100%
      good: 0,      // 70-89%
      average: 0,   // 50-69%
      below: 0,     // <50%
    };

    for (const r of allQuizResults) {
      const pct = (r.score / r.totalQuestions) * 100;
      if (pct >= 90) scoreDistribution.excellent++;
      else if (pct >= 70) scoreDistribution.good++;
      else if (pct >= 50) scoreDistribution.average++;
      else scoreDistribution.below++;
    }

    // Courses by Category breakdown
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
        color: true,
        courses: {
          select: { id: true, status: true },
        },
      },
      orderBy: { order: "asc" },
    });

    const coursesByCategory = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      color: cat.color,
      totalCourses: cat.courses.length,
      publishedCourses: cat.courses.filter((c) => c.status === "published").length,
      draftCourses: cat.courses.filter((c) => c.status === "draft").length,
      pendingCourses: cat.courses.filter((c) => c.status === "pending_review").length,
    }));

    // Recent Activity - last 5 enrollments
    const recentEnrollments = await prisma.enrollment.findMany({
      take: 5,
      orderBy: { enrolledAt: "desc" },
      select: {
        id: true,
        enrolledAt: true,
        user: { select: { id: true, name: true, email: true } },
        course: { select: { id: true, title: true } },
      },
    });

    // Recent Activity - last 5 course creations
    const recentCourses = await prisma.course.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
        status: true,
        teacher: { select: { id: true, name: true, email: true } },
      },
    });

    const recentActivity = {
      enrollments: recentEnrollments.map((e) => ({
        id: e.id,
        type: "enrollment" as const,
        userName: e.user.name,
        courseTitle: e.course.title,
        date: e.enrolledAt.toISOString(),
      })),
      courses: recentCourses.map((c) => ({
        id: c.id,
        type: "course_created" as const,
        title: c.title,
        teacherName: c.teacher?.name,
        status: c.status,
        date: c.createdAt.toISOString(),
      })),
    };

    return NextResponse.json({
      totalStudents,
      totalTeachers,
      totalCourses,
      pendingReviews,
      activeStudents,
      completionRate,
      avgQuizScore,
      moduleStats,
      scoreDistribution,
      totalTopics,
      coursesByCategory,
      recentActivity,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
