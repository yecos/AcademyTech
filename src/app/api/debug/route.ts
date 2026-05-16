import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/debug - Debug endpoint to check DB connectivity
export async function GET() {
  try {
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
    }).catch((e: any) => ({ error: e.message }));

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
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack?.split("\n").slice(0, 5),
    });
  }
}
