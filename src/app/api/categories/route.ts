import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/categories - List all categories with course counts
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { published: true },
      select: {
        id: true,
        slug: true,
        name: true,
        icon: true,
        description: true,
        color: true,
        order: true,
      },
      orderBy: { order: "asc" },
    });

    // Get course counts separately to avoid relation filter issues
    const categoriesWithCounts = await Promise.all(
      categories.map(async (cat) => {
        const courseCount = await prisma.course.count({
          where: {
            categoryId: cat.id,
            published: true,
          },
        });
        return {
          ...cat,
          courseCount,
        };
      })
    );

    return NextResponse.json(categoriesWithCounts);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
