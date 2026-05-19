import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/debug - Debug endpoint to check DB connectivity (admin only)
export async function GET() {
  try {
    // Require admin authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Prohibido — solo administradores" }, { status: 403 });
    }

    // Check if Category model exists
    const categoryCount = await prisma.category.count().catch(() => -1);

    // Check if Course has new fields
    const courseSample = await prisma.course.findFirst({
      select: {
        id: true,
        slug: true,
        published: true,
        status: true,
        categoryId: true,
        teacherId: true,
        level: true,
      },
    }).catch((e: unknown) => ({ error: e instanceof Error ? e.message : "Error desconocido" }));

    // Check database URL (masked)
    const dbUrl = process.env.DATABASE_URL;
    const maskedUrl = dbUrl ? dbUrl.substring(0, 30) + "..." : "NOT SET";

    return NextResponse.json({
      categoryCount,
      courseSample,
      dbUrlSet: !!dbUrl,
      dbUrlPrefix: maskedUrl,
      nodeEnv: process.env.NODE_ENV,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({
      error: message,
    });
  }
}
