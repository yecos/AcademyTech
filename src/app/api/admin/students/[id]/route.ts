import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/students/[id] - Returns detailed student data
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await params;

    const student = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        role: true,
        progress: {
          select: {
            topicId: true,
            completed: true,
            completedAt: true,
            topic: {
              select: {
                id: true,
                name: true,
                number: true,
                module: {
                  select: {
                    id: true,
                    number: true,
                    title: true,
                  },
                },
              },
            },
          },
        },
        quizResults: {
          select: {
            id: true,
            moduleId: true,
            score: true,
            totalQuestions: true,
            answers: true,
            completedAt: true,
          },
        },
        notes: {
          select: {
            id: true,
            topicId: true,
            content: true,
            updatedAt: true,
            topic: {
              select: {
                id: true,
                name: true,
                number: true,
                module: {
                  select: {
                    id: true,
                    number: true,
                    title: true,
                  },
                },
              },
            },
          },
        },
        bookmarks: {
          select: {
            id: true,
            topicId: true,
            createdAt: true,
            topic: {
              select: {
                id: true,
                name: true,
                number: true,
                module: {
                  select: {
                    id: true,
                    number: true,
                    title: true,
                  },
                },
              },
            },
          },
        },
        achievements: {
          select: {
            achievementId: true,
            unlockedAt: true,
          },
        },
        streak: {
          select: {
            currentStreak: true,
            longestStreak: true,
            lastStudyDate: true,
          },
        },
        enrollments: {
          select: {
            courseId: true,
            enrolledAt: true,
            course: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Estudiante no encontrado" },
        { status: 404 }
      );
    }

    // Get all topics for calculating totals
    const totalTopics = await prisma.topic.count();
    const totalModules = await prisma.module.count();

    const completedTopics = student.progress.filter(
      (p) => p.completed
    ).length;
    const progressPct =
      totalTopics > 0
        ? Math.round((completedTopics / totalTopics) * 100)
        : 0;

    // Organize progress by module
    const modules = await prisma.module.findMany({
      select: {
        id: true,
        number: true,
        title: true,
        topics: {
          select: {
            id: true,
            name: true,
            number: true,
            difficulty: true,
            estimatedTime: true,
          },
          orderBy: { number: "asc" },
        },
      },
      orderBy: { number: "asc" },
    });

    const moduleProgress = modules.map((mod) => {
      const topicProgress = mod.topics.map((topic) => {
        const progress = student.progress.find(
          (p) => p.topicId === topic.id
        );
        const note = student.notes.find((n) => n.topicId === topic.id);
        const isBookmarked = student.bookmarks.some(
          (b) => b.topicId === topic.id
        );

        return {
          id: topic.id,
          name: topic.name,
          number: topic.number,
          difficulty: topic.difficulty,
          estimatedTime: topic.estimatedTime,
          completed: progress?.completed || false,
          completedAt: progress?.completedAt?.toISOString() || null,
          hasNote: !!note,
          noteContent: note?.content || null,
          noteUpdatedAt: note?.updatedAt.toISOString() || null,
          isBookmarked,
        };
      });

      const completedInModule = topicProgress.filter(
        (t) => t.completed
      ).length;
      const modulePct =
        mod.topics.length > 0
          ? Math.round((completedInModule / mod.topics.length) * 100)
          : 0;

      const quizResult = student.quizResults.find(
        (q) => q.moduleId === mod.id
      );

      return {
        id: mod.id,
        number: mod.number,
        title: mod.title,
        topicCount: mod.topics.length,
        completedTopics: completedInModule,
        progressPct: modulePct,
        topics: topicProgress,
        quiz: quizResult
          ? {
              score: quizResult.score,
              totalQuestions: quizResult.totalQuestions,
              pct: Math.round(
                (quizResult.score / quizResult.totalQuestions) * 100
              ),
              answers: JSON.parse(quizResult.answers),
              completedAt: quizResult.completedAt.toISOString(),
            }
          : null,
      };
    });

    // Avg quiz score
    const avgScore =
      student.quizResults.length > 0
        ? Math.round(
            (student.quizResults.reduce(
              (sum, q) => sum + q.score / q.totalQuestions,
              0
            ) /
              student.quizResults.length) *
              100
          )
        : 0;

    // Last activity
    const completedDates = student.progress
      .filter((p) => p.completedAt)
      .map((p) => p.completedAt!);
    const lastActivity =
      completedDates.length > 0
        ? new Date(
            Math.max(...completedDates.map((d) => d.getTime()))
          ).toISOString()
        : null;

    return NextResponse.json({
      id: student.id,
      name: student.name || "Sin nombre",
      email: student.email || "",
      image: student.image,
      role: student.role,
      enrolledAt: student.createdAt.toISOString(),
      progressPct,
      completedTopics,
      totalTopics,
      avgScore,
      quizzesCompleted: student.quizResults.length,
      totalQuizzes: totalModules,
      lastActivity,
      streak: student.streak?.currentStreak || 0,
      longestStreak: student.streak?.longestStreak || 0,
      lastStudyDate: student.streak?.lastStudyDate || null,
      moduleProgress,
      achievements: student.achievements.map((a) => ({
        id: a.achievementId,
        unlockedAt: a.unlockedAt.toISOString(),
      })),
      enrollments: student.enrollments.map((e) => ({
        courseId: e.courseId,
        courseTitle: e.course.title,
        enrolledAt: e.enrolledAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching student detail:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
