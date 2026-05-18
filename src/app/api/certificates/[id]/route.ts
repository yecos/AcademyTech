import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/certificates/[id] - Get a specific certificate (public access for sharing)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const certificate = await prisma.certificate.findUnique({
      where: { id },
      select: {
        id: true,
        issuedAt: true,
        certificateUrl: true,
        user: {
          select: {
            name: true,
          },
        },
        course: {
          select: {
            title: true,
            slug: true,
            description: true,
            level: true,
            duration: true,
            modules: {
              select: {
                id: true,
                number: true,
                title: true,
                topics: {
                  select: { id: true },
                },
              },
              orderBy: { number: "asc" },
            },
            category: {
              select: {
                name: true,
                slug: true,
                color: true,
              },
            },
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificado no encontrado" },
        { status: 404 }
      );
    }

    const totalModules = certificate.course.modules.length;
    const totalTopics = certificate.course.modules.reduce(
      (sum, m) => sum + m.topics.length,
      0
    );

    const result = {
      id: certificate.id,
      studentName: certificate.user.name || "Estudiante",
      courseTitle: certificate.course.title,
      courseDescription: certificate.course.description,
      courseLevel: certificate.course.level,
      courseDuration: certificate.course.duration,
      courseSlug: certificate.course.slug,
      totalModules,
      totalTopics,
      completionDate: certificate.issuedAt.toISOString(),
      certificateUrl: certificate.certificateUrl,
      category: certificate.course.category
        ? {
            name: certificate.course.category.name,
            slug: certificate.course.category.slug,
            color: certificate.course.category.color,
          }
        : null,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
