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

    return NextResponse.json({
      totalStudents,
      activeStudents,
      completionRate,
      avgQuizScore,
      moduleStats,
      scoreDistribution,
      totalTopics,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
