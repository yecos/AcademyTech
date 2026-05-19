import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/course - Get course info by slug
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "El parámetro 'slug' es requerido" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        icon: true,
        image: true,
        level: true,
        duration: true,
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
            slug: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
