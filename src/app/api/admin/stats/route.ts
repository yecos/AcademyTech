import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/stats - Returns overall platform stats with chart data
export async function GET() {
  try {
    const auth = await requireAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Total users by role
    const totalStudents = await prisma.user.count({
      where: { role: "student" },
    });

    const totalTeachers = await prisma.user.count({
      where: { role: "teacher" },
    });

    const totalAdmins = await prisma.user.count({
      where: { role: "admin" },
    });

    const totalUsers = totalStudents + totalTeachers + totalAdmins;

    // Total courses
    const totalCourses = await prisma.course.count();

    // Total enrollments
    const totalEnrollments = await prisma.enrollment.count();

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

    // ── New users per day (last 30 days) ──────────────────────
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const usersCreated = await prisma.user.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
    });

    // Build a map of date -> count
    const usersPerDayMap = new Map<string, number>();
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      const key = d.toISOString().split("T")[0];
      usersPerDayMap.set(key, 0);
    }

    for (const u of usersCreated) {
      const key = u.createdAt.toISOString().split("T")[0];
      if (usersPerDayMap.has(key)) {
        usersPerDayMap.set(key, (usersPerDayMap.get(key) || 0) + 1);
      }
    }

    const newUsersPerDay = Array.from(usersPerDayMap.entries()).map(
      ([date, count]) => ({
        date,
        count,
      })
    );

    // ── Active users per day (last 30 days) ───────────────────
    const progressLast30 = await prisma.userProgress.findMany({
      where: {
        completedAt: { gte: thirtyDaysAgo },
        completed: true,
        user: { role: "student" },
      },
      select: { completedAt: true, userId: true },
    });

    const activePerDayMap = new Map<string, Set<string>>();
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      const key = d.toISOString().split("T")[0];
      activePerDayMap.set(key, new Set());
    }

    for (const p of progressLast30) {
      if (p.completedAt) {
        const key = p.completedAt.toISOString().split("T")[0];
        const set = activePerDayMap.get(key);
        if (set) {
          set.add(p.userId);
        }
      }
    }

    const activeUsersPerDay = Array.from(activePerDayMap.entries()).map(
      ([date, userIds]) => ({
        date,
        count: userIds.size,
      })
    );

    // ── Course enrollment distribution by category ────────────
    const categoriesWithEnrollments = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
        color: true,
        courses: {
          select: {
            _count: { select: { enrollments: true } },
          },
        },
      },
      orderBy: { order: "asc" },
    });

    const enrollmentDistribution = categoriesWithEnrollments
      .filter((cat) => cat.courses.length > 0)
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        color: cat.color,
        enrollments: cat.courses.reduce(
          (sum, c) => sum + c._count.enrollments,
          0
        ),
      }));

    // ── Category popularity (courses per category for bar chart) ──
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

    // ── Completion rates by course (for horizontal bar chart) ──
    const coursesWithProgress = await prisma.course.findMany({
      where: { status: "published" },
      select: {
        id: true,
        title: true,
        modules: {
          select: {
            topics: {
              select: { id: true },
            },
          },
        },
        enrollments: {
          select: { userId: true },
        },
      },
      take: 10,
      orderBy: { enrollments: { _count: "desc" } },
    });

    const completionByCourse = await Promise.all(
      coursesWithProgress.map(async (course) => {
        const topicIds = course.modules.flatMap((m) =>
          m.topics.map((t) => t.id)
        );
        const enrolledCount = course.enrollments.length;

        let courseCompletion = 0;
        if (enrolledCount > 0 && topicIds.length > 0) {
          const completedInCourse = await prisma.userProgress.count({
            where: {
              topicId: { in: topicIds },
              completed: true,
              userId: { in: course.enrollments.map((e) => e.userId) },
            },
          });
          courseCompletion = Math.round(
            (completedInCourse / (enrolledCount * topicIds.length)) * 100
          );
        }

        return {
          id: course.id,
          title: course.title,
          completionRate: courseCompletion,
        };
      })
    );

    // ── Quiz score distribution (histogram ranges) ────────────
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

    // Histogram with finer ranges
    const scoreHistogram = [
      { range: "0-20", min: 0, max: 20, count: 0 },
      { range: "21-40", min: 21, max: 40, count: 0 },
      { range: "41-60", min: 41, max: 60, count: 0 },
      { range: "61-80", min: 61, max: 80, count: 0 },
      { range: "81-100", min: 81, max: 100, count: 0 },
    ];

    for (const r of allQuizResults) {
      const pct = Math.round((r.score / r.totalQuestions) * 100);
      if (pct >= 90) scoreDistribution.excellent++;
      else if (pct >= 70) scoreDistribution.good++;
      else if (pct >= 50) scoreDistribution.average++;
      else scoreDistribution.below++;

      // Histogram
      for (const bucket of scoreHistogram) {
        if (pct >= bucket.min && pct <= bucket.max) {
          bucket.count++;
          break;
        }
      }
    }

    // ── Module stats ──────────────────────────────────────────
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

    // ── Recent Activity ───────────────────────────────────────
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
      totalUsers,
      totalStudents,
      totalTeachers,
      totalAdmins,
      totalCourses,
      totalEnrollments,
      pendingReviews,
      activeStudents,
      completionRate,
      avgQuizScore,
      moduleStats,
      scoreDistribution,
      scoreHistogram,
      totalTopics,
      coursesByCategory,
      enrollmentDistribution,
      completionByCourse,
      newUsersPerDay,
      activeUsersPerDay,
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
