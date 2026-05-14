import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function getTodayDateString(): string {
  const now = new Date();
  return now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0");
}

function getYesterdayDateString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.getFullYear() + "-" +
    String(yesterday.getMonth() + 1).padStart(2, "0") + "-" +
    String(yesterday.getDate()).padStart(2, "0");
}

// GET /api/streak - Get user streak
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    let streak = await prisma.userStreak.findUnique({
      where: { userId: session.user.id },
    });

    // Auto-create streak record if it doesn't exist
    if (!streak) {
      streak = await prisma.userStreak.create({
        data: {
          userId: session.user.id,
          currentStreak: 0,
          longestStreak: 0,
          lastStudyDate: null,
        },
      });
    }

    // Check if streak needs to be reset (if lastStudyDate is before yesterday)
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    if (streak.lastStudyDate && streak.lastStudyDate !== today && streak.lastStudyDate !== yesterday) {
      // Streak is broken
      streak = await prisma.userStreak.update({
        where: { userId: session.user.id },
        data: { currentStreak: 0 },
      });
    }

    return NextResponse.json({
      current: streak.currentStreak,
      longest: streak.longestStreak,
      lastDate: streak.lastStudyDate,
    });
  } catch (error) {
    console.error("Error fetching streak:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST /api/streak - Update streak (studied today)
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    let streak = await prisma.userStreak.findUnique({
      where: { userId: session.user.id },
    });

    if (!streak) {
      streak = await prisma.userStreak.create({
        data: {
          userId: session.user.id,
          currentStreak: 1,
          longestStreak: 1,
          lastStudyDate: today,
        },
      });
    } else {
      if (streak.lastStudyDate === today) {
        // Already studied today, do nothing
      } else if (streak.lastStudyDate === yesterday) {
        // Studied yesterday, increment streak
        const newStreak = streak.currentStreak + 1;
        const newLongest = Math.max(streak.longestStreak, newStreak);
        streak = await prisma.userStreak.update({
          where: { userId: session.user.id },
          data: {
            currentStreak: newStreak,
            longestStreak: newLongest,
            lastStudyDate: today,
          },
        });
      } else {
        // First time or streak broken
        const newLongest = Math.max(streak.longestStreak, 1);
        streak = await prisma.userStreak.update({
          where: { userId: session.user.id },
          data: {
            currentStreak: 1,
            longestStreak: newLongest,
            lastStudyDate: today,
          },
        });
      }
    }

    return NextResponse.json({
      current: streak.currentStreak,
      longest: streak.longestStreak,
      lastDate: streak.lastStudyDate,
    });
  } catch (error) {
    console.error("Error updating streak:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
