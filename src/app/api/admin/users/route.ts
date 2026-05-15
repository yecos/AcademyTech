import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/users - List all users with their roles (admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const role = session.user.role;
    if (role !== "admin") {
      return NextResponse.json(
        { error: "No tienes permisos de administrador" },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            enrollments: true,
            progress: true,
            courses: true, // courses created as teacher
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      createdAt: user.createdAt,
      enrollmentCount: user._count.enrollments,
      progressCount: user._count.progress,
      courseCount: user._count.courses,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users - Update user role (admin only)
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const role = session.user.role;
    if (role !== "admin") {
      return NextResponse.json(
        { error: "No tienes permisos de administrador" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, role: newRole } = body;

    if (!userId || !newRole) {
      return NextResponse.json(
        { error: "userId y role son obligatorios" },
        { status: 400 }
      );
    }

    const validRoles = ["student", "teacher", "admin"];
    if (!validRoles.includes(newRole)) {
      return NextResponse.json(
        { error: `Rol inválido. Roles válidos: ${validRoles.join(", ")}` },
        { status: 400 }
      );
    }

    // Prevent admin from demoting themselves
    if (userId === session.user.id && newRole !== "admin") {
      return NextResponse.json(
        { error: "No puedes cambiar tu propio rol de administrador" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
