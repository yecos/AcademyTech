import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/achievements - Get all user achievements
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const achievements = await prisma.userAchievement.findMany({
      where: { userId: session.user.id },
      select: {
        achievementId: true,
        unlockedAt: true,
      },
    });

    // Return as Record<achievementId, unlockedAt>
    const achievementsMap: Record<string, string> = {};
    for (const a of achievements) {
      achievementsMap[a.achievementId] = a.unlockedAt.toISOString();
    }

    return NextResponse.json(achievementsMap);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST /api/achievements - Unlock achievement
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { achievementId } = body;

    if (!achievementId) {
      return NextResponse.json({ error: "achievementId es requerido" }, { status: 400 });
    }

    // Upsert - don't fail if already unlocked
    await prisma.userAchievement.upsert({
      where: {
        userId_achievementId: {
          userId: session.user.id,
          achievementId,
        },
      },
      create: {
        userId: session.user.id,
        achievementId,
      },
      update: {},
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error unlocking achievement:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
