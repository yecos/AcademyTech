import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/categories - List ALL categories (including unpublished)
export async function GET() {
  try {
    const auth = await requireAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const categories = await prisma.category.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        icon: true,
        description: true,
        color: true,
        order: true,
        published: true,
        createdAt: true,
        courses: {
          select: { id: true },
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
      published: cat.published,
      createdAt: cat.createdAt.toISOString(),
      courseCount: cat.courses.length,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching admin categories:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST /api/admin/categories - Create a new category
export async function POST(request: Request) {
  try {
    const auth = await requireAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { name, slug, icon, description, color, order, published } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "name y slug son obligatorios" },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe una categoría con ese slug" },
        { status: 409 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        icon: icon || "📁",
        description: description || null,
        color: color || "#10b981",
        order: order ?? 0,
        published: published ?? true,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
