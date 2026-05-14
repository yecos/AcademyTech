import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/students - Returns list of all students with progress data
export async function GET(request: Request) {
  try {
    const auth = await requireAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") || "desc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Build where clause
    const where: any = { role: "student" };
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    // Get total count
    const totalCount = await prisma.user.count({ where });

    // Get total topics
    const totalTopics = await prisma.topic.count();

    // Get total modules
    const allModules = await prisma.module.findMany({
      select: { id: true },
    });
    const totalModules = allModules.length;

    // Fetch students
    const students = await prisma.user.findMany({
      where,
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
          },
        },
        quizResults: {
          select: {
            moduleId: true,
            score: true,
            totalQuestions: true,
          },
        },
        streak: {
          select: {
            currentStreak: true,
            longestStreak: true,
            lastStudyDate: true,
          },
        },
      },
      orderBy: getOrderBy(sort, order),
      skip: (page - 1) * limit,
      take: limit,
    });

    // Format student data
    const formattedStudents = students.map((student) => {
      const completedTopics = student.progress.filter(
        (p) => p.completed
      ).length;
      const progressPct =
        totalTopics > 0
          ? Math.round((completedTopics / totalTopics) * 100)
          : 0;

      const quizzesCompleted = student.quizResults.length;
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

      // Last activity date
      const completedDates = student.progress
        .filter((p) => p.completedAt)
        .map((p) => p.completedAt!);
      const lastActivity =
        completedDates.length > 0
          ? new Date(
              Math.max(...completedDates.map((d) => d.getTime()))
            ).toISOString()
          : null;

      return {
        id: student.id,
        name: student.name || "Sin nombre",
        email: student.email || "",
        image: student.image,
        enrolledAt: student.createdAt.toISOString(),
        progressPct,
        completedTopics,
        totalTopics,
        quizzesCompleted,
        totalQuizzes: totalModules,
        avgScore,
        lastActivity,
        streak: student.streak?.currentStreak || 0,
        longestStreak: student.streak?.longestStreak || 0,
      };
    });

    return NextResponse.json({
      students: formattedStudents,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error("Error fetching admin students:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

function getOrderBy(sort: string, order: string): any {
  const dir = order === "asc" ? "asc" : "desc";
  switch (sort) {
    case "name":
      return { name: dir };
    case "email":
      return { email: dir };
    case "createdAt":
    default:
      return { createdAt: dir };
  }
}
