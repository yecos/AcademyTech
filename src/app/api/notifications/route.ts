import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/notifications - List notifications for the authenticated user
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "20"), 1), 100);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0"), 0);

    const [notifications, unreadCount, total] = await Promise.all([
      prisma.notification.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
        select: {
          id: true,
          type: true,
          title: true,
          message: true,
          read: true,
          createdAt: true,
        },
      }),
      prisma.notification.count({
        where: { userId: session.user.id, read: false },
      }),
      prisma.notification.count({
        where: { userId: session.user.id },
      }),
    ]);

    return NextResponse.json({
      notifications,
      unreadCount,
      total,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// PATCH /api/notifications - Mark notifications as read
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { notificationIds, all } = body as {
      notificationIds?: string[];
      all?: boolean;
    };

    if (all) {
      // Mark all notifications as read for this user
      await prisma.notification.updateMany({
        where: { userId: session.user.id, read: false },
        data: { read: true },
      });
    } else if (notificationIds && Array.isArray(notificationIds) && notificationIds.length > 0) {
      // Mark specific notifications as read
      await prisma.notification.updateMany({
        where: {
          id: { in: notificationIds },
          userId: session.user.id,
        },
        data: { read: true },
      });
    } else {
      return NextResponse.json(
        { error: "Se requiere notificationIds o all: true" },
        { status: 400 }
      );
    }

    // Return updated unread count
    const unreadCount = await prisma.notification.count({
      where: { userId: session.user.id, read: false },
    });

    return NextResponse.json({ success: true, unreadCount });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
