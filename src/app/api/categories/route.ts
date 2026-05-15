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
        courses: {
          select: { id: true },
          where: {
            OR: [{ published: true }, { status: "published" }],
          },
        },
      },
      orderBy: { order: "asc" },
    });

    const result = categories.map((cat) => ({
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      icon: cat.icon,
      description: cat.description,
      color: cat.color,
      order: cat.order,
      courseCount: cat.courses.length,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
