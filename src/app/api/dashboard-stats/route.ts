import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/dashboard-stats - Aggregate stats for the student dashboard
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = session.user.id;

    // Courses enrolled
    const enrollmentCount = await prisma.enrollment.count({
      where: { userId },
    });

    // Total topics completed across all courses
    const totalCompletedTopics = await prisma.userProgress.count({
      where: { userId, completed: true },
    });

    // Average quiz score across all quiz results
    const quizResults = await prisma.quizResult.findMany({
      where: { userId },
      select: { score: true, totalQuestions: true },
    });

    let avgQuizScore = 0;
    if (quizResults.length > 0) {
      const totalScore = quizResults.reduce((sum, q) => {
        const pct = q.totalQuestions > 0 ? (q.score / q.totalQuestions) * 100 : 0;
        return sum + pct;
      }, 0);
      avgQuizScore = Math.round(totalScore / quizResults.length);
    }

    return NextResponse.json({
      coursesEnrolled: enrollmentCount,
      topicsCompleted: totalCompletedTopics,
      avgQuizScore,
      quizzesTaken: quizResults.length,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
