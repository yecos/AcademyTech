import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/certificates - List certificates and eligible courses for the authenticated user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch all certificates for the user
    const certificates = await prisma.certificate.findMany({
      where: { userId },
      select: {
        id: true,
        courseId: true,
        issuedAt: true,
        certificateUrl: true,
        course: {
          select: {
            title: true,
            slug: true,
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
      orderBy: { issuedAt: "desc" },
    });

    const mappedCertificates = certificates.map((cert) => ({
      id: cert.id,
      courseId: cert.courseId,
      courseTitle: cert.course.title,
      courseSlug: cert.course.slug,
      issuedAt: cert.issuedAt.toISOString(),
      certificateUrl: cert.certificateUrl,
      category: cert.course.category
        ? { name: cert.course.category.name, slug: cert.course.category.slug, color: cert.course.category.color }
        : null,
    }));

    // Get course IDs that already have certificates
    const certCourseIds = new Set(certificates.map((c) => c.courseId));

    // Find enrolled courses without certificates
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      select: {
        courseId: true,
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            modules: {
              select: {
                topics: {
                  select: { id: true },
                },
              },
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

    // For each enrolled course without a certificate, check if 100% complete
    const eligibleCourses: {
      courseId: string;
      courseTitle: string;
      courseSlug: string;
      totalTopics: number;
      category: { name: string; slug: string; color: string } | null;
    }[] = [];

    for (const enrollment of enrollments) {
      if (certCourseIds.has(enrollment.courseId)) continue;

      const course = enrollment.course;
      const allTopicIds = course.modules.flatMap((m) =>
        m.topics.map((t) => t.id)
      );
      const totalTopics = allTopicIds.length;

      if (totalTopics === 0) continue;

      const completedCount = await prisma.userProgress.count({
        where: {
          userId,
          topicId: { in: allTopicIds },
          completed: true,
        },
      });

      if (completedCount >= totalTopics) {
        eligibleCourses.push({
          courseId: course.id,
          courseTitle: course.title,
          courseSlug: course.slug,
          totalTopics,
          category: course.category
            ? { name: course.category.name, slug: course.category.slug, color: course.category.color }
            : null,
        });
      }
    }

    return NextResponse.json({
      certificates: mappedCertificates,
      eligibleCourses,
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST /api/certificates - Generate certificate for a completed course
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json(
        { error: "courseId es requerido" },
        { status: 400 }
      );
    }

    // Check enrollment exists
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: "No estás inscrito en este curso" },
        { status: 403 }
      );
    }

    // Check if certificate already exists
    const existingCert = await prisma.certificate.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    if (existingCert) {
      return NextResponse.json({
        id: existingCert.id,
        courseId: existingCert.courseId,
        issuedAt: existingCert.issuedAt.toISOString(),
        certificateUrl: existingCert.certificateUrl,
        message: "Ya tienes un certificado para este curso",
      });
    }

    // Verify course is 100% complete: all topics in the course must be completed
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        title: true,
        slug: true,
        modules: {
          select: {
            topics: {
              select: { id: true },
            },
          },
        },
        category: {
          select: { name: true, slug: true, color: true },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    // Collect all topic IDs in the course
    const allTopicIds = course.modules.flatMap((m) =>
      m.topics.map((t) => t.id)
    );
    const totalTopics = allTopicIds.length;

    if (totalTopics === 0) {
      return NextResponse.json(
        { error: "El curso no tiene temas" },
        { status: 400 }
      );
    }

    // Count completed topics for this user in this course
    const completedCount = await prisma.userProgress.count({
      where: {
        userId: session.user.id,
        topicId: { in: allTopicIds },
        completed: true,
      },
    });

    if (completedCount < totalTopics) {
      return NextResponse.json(
        {
          error: "El curso no está completo",
          detail: {
            completed: completedCount,
            total: totalTopics,
            percentage: Math.round((completedCount / totalTopics) * 100),
          },
        },
        { status: 400 }
      );
    }

    // Create certificate
    const certificate = await prisma.certificate.create({
      data: {
        userId: session.user.id,
        courseId,
        enrollmentId: enrollment.id,
        certificateUrl: `/certificado/${courseId}`,
      },
    });

    // Mark enrollment as completed
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { completedAt: new Date() },
    });

    return NextResponse.json({
      id: certificate.id,
      courseId: certificate.courseId,
      courseTitle: course.title,
      courseSlug: course.slug,
      issuedAt: certificate.issuedAt.toISOString(),
      certificateUrl: certificate.certificateUrl,
      category: course.category
        ? { name: course.category.name, slug: course.category.slug, color: course.category.color }
        : null,
    });
  } catch (error) {
    console.error("Error generating certificate:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
