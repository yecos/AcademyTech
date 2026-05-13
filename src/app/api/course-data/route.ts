import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/course-data?courseId=xxx - Get all user data for a course in one request
// Returns data keyed by curriculum-style keys (e.g. "modulo-1-0") for easy frontend consumption
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "courseId es requerido" }, { status: 400 });
    }

    const userId = session.user.id;

    // Fetch all modules with topics for this course
    const courseModules = await prisma.module.findMany({
      where: { courseId },
      include: {
        topics: {
          orderBy: { number: "asc" },
          select: { id: true, number: true },
        },
      },
      orderBy: { number: "asc" },
    });

    // Build topic lookup: curriculum key -> DB ID
    // Key format: "modulo-{moduleNumber}-{topicIndex}" where topicIndex is 0-based
    const topicLookup: Record<string, string> = {};
    // Also reverse lookup: DB topicId -> curriculum key
    const dbTopicToKey: Record<string, string> = {};
    // Module lookup: curriculum moduleId -> DB moduleId
    const moduleLookup: Record<string, string> = {};

    for (const mod of courseModules) {
      const moduleCurriculumId = `modulo-${mod.number}`;
      moduleLookup[moduleCurriculumId] = mod.id;

      for (const topic of mod.topics) {
        const topicIndex = topic.number - 1; // 0-based index
        const key = `${moduleCurriculumId}-${topicIndex}`;
        topicLookup[key] = topic.id;
        dbTopicToKey[topic.id] = key;
      }
    }

    // Fetch all data in parallel
    const allTopicIds = Object.values(topicLookup);
    const allModuleIds = Object.values(moduleLookup);

    const [progressRows, quizResultRows, noteRows, bookmarkRows, achievementRows, streak] = await Promise.all([
      prisma.userProgress.findMany({
        where: {
          userId,
          topicId: { in: allTopicIds },
          completed: true,
        },
        select: { topicId: true },
      }),
      prisma.quizResult.findMany({
        where: {
          userId,
          moduleId: { in: allModuleIds },
        },
        select: {
          moduleId: true,
          score: true,
          totalQuestions: true,
          answers: true,
        },
      }),
      prisma.userNote.findMany({
        where: {
          userId,
          topicId: { in: allTopicIds },
        },
        select: {
          topicId: true,
          content: true,
        },
      }),
      prisma.bookmark.findMany({
        where: {
          userId,
          topicId: { in: allTopicIds },
        },
        select: { topicId: true },
      }),
      prisma.userAchievement.findMany({
        where: { userId },
        select: {
          achievementId: true,
          unlockedAt: true,
        },
      }),
      prisma.userStreak.findUnique({
        where: { userId },
      }),
    ]);

    // Auto-enroll if not enrolled
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (!enrollment) {
      await prisma.enrollment.create({
        data: { userId, courseId },
      });
    }

    // Convert to curriculum-keyed maps
    const progressMap: Record<string, boolean> = {};
    for (const p of progressRows) {
      const key = dbTopicToKey[p.topicId];
      if (key) progressMap[key] = true;
    }

    const quizMap: Record<string, { score: number; total: number; answers: string }> = {};
    for (const q of quizResultRows) {
      // Find curriculum module ID
      const moduleKey = Object.entries(moduleLookup).find(([, dbId]) => dbId === q.moduleId)?.[0];
      if (moduleKey) {
        quizMap[moduleKey] = {
          score: q.score,
          total: q.totalQuestions,
          answers: q.answers,
        };
      }
    }

    const notesMap: Record<string, string> = {};
    for (const n of noteRows) {
      const key = dbTopicToKey[n.topicId];
      if (key) notesMap[key] = n.content;
    }

    const bookmarksMap: Record<string, boolean> = {};
    for (const b of bookmarkRows) {
      const key = dbTopicToKey[b.topicId];
      if (key) bookmarksMap[key] = true;
    }

    const achievementsMap: Record<string, string> = {};
    for (const a of achievementRows) {
      achievementsMap[a.achievementId] = a.unlockedAt.toISOString();
    }

    // Check and reset streak if needed
    const today = new Date();
    const todayStr = today.getFullYear() + "-" +
      String(today.getMonth() + 1).padStart(2, "0") + "-" +
      String(today.getDate()).padStart(2, "0");
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.getFullYear() + "-" +
      String(yesterday.getMonth() + 1).padStart(2, "0") + "-" +
      String(yesterday.getDate()).padStart(2, "0");

    let currentStreak = streak?.currentStreak ?? 0;
    let longestStreak = streak?.longestStreak ?? 0;
    let lastStudyDate = streak?.lastStudyDate ?? null;

    if (streak && lastStudyDate && lastStudyDate !== todayStr && lastStudyDate !== yesterdayStr) {
      currentStreak = 0;
      await prisma.userStreak.update({
        where: { userId },
        data: { currentStreak: 0 },
      });
    }

    return NextResponse.json({
      progress: progressMap,
      quizResults: quizMap,
      notes: notesMap,
      bookmarks: bookmarksMap,
      achievements: achievementsMap,
      streak: {
        current: currentStreak,
        longest: longestStreak,
        lastDate: lastStudyDate,
      },
      topicLookup,
      moduleLookup,
    });
  } catch (error) {
    console.error("Error fetching course data:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
