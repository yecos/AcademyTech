import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE /api/reviews/[id] - Delete a review
// Only the review author or an admin can delete
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    // Find the review
    const review = await prisma.review.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        courseId: true,
      },
    });

    if (!review) {
      return NextResponse.json(
        { error: "Reseña no encontrada" },
        { status: 404 }
      );
    }

    // Only the author or an admin can delete the review
    const isAuthor = review.userId === session.user.id;
    const isAdmin = session.user.role === "admin";

    if (!isAuthor && !isAdmin) {
      return NextResponse.json(
        { error: "No tienes permiso para eliminar esta reseña" },
        { status: 403 }
      );
    }

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
