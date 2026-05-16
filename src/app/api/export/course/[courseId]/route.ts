import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ courseId: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { courseId } = await params;

    // Fetch course with all related data
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        category: {
          select: { id: true, name: true, icon: true, color: true, slug: true },
        },
        teacher: {
          select: { id: true, name: true, image: true },
        },
        modules: {
          include: {
            topics: {
              orderBy: { number: "asc" },
            },
          },
          orderBy: { number: "asc" },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    // Generate HTML for PDF
    const html = generateCoursePDFHTML(course);

    // Return as HTML that can be printed to PDF by the browser
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="${course.title.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ]/g, '_')}.html"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Error al generar el PDF" },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderMarkdownToHTML(markdown: string | null): string {
  if (!markdown) return "";

  let html = escapeHtml(markdown);

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 style="font-size:16px;font-weight:600;margin:16px 0 8px;color:#374151;">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 style="font-size:18px;font-weight:600;margin:20px 0 10px;color:#1f2937;">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 style="font-size:22px;font-weight:700;margin:24px 0 12px;color:#111827;">$1</h1>');
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li style="margin-left:20px;margin-bottom:4px;">$1</li>');
  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li style="margin-left:20px;margin-bottom:4px;">$1</li>');
  // Paragraphs (double newlines)
  html = html.replace(/\n\n/g, '</p><p style="margin-bottom:12px;line-height:1.7;">');
  // Single newlines
  html = html.replace(/\n/g, "<br/>");

  return `<p style="margin-bottom:12px;line-height:1.7;">${html}</p>`;
}

interface TopicRow {
  name: string;
  difficulty: string;
  estimatedTime: string;
  content: string | null;
}

interface ModuleRow {
  number: number;
  title: string;
  description: string | null;
  topics: TopicRow[];
}

interface CourseRow {
  title: string;
  description: string | null;
  icon: string | null;
  level: string;
  duration: string | null;
  category: { name: string; icon: string } | null;
  teacher: { name: string | null } | null;
  modules: ModuleRow[];
}

function generateCoursePDFHTML(course: CourseRow): string {
  const levelLabels: Record<string, string> = {
    principiante: "Principiante",
    intermedio: "Intermedio",
    avanzado: "Avanzado",
  };

  const difficultyLabels: Record<string, string> = {
    basico: "Básico",
    intermedio: "Intermedio",
    avanzado: "Avanzado",
  };

  const totalTopics = course.modules.reduce(
    (acc, mod) => acc + mod.topics.length,
    0
  );

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${escapeHtml(course.title)} - Academy Tech</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #1f2937;
      background: white;
      line-height: 1.6;
      font-size: 14px;
    }
    
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page-break { page-break-before: always; }
      .no-print { display: none !important; }
    }
    
    .cover {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 60px 40px;
      background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #d1fae5 100%);
    }
    
    .cover-icon {
      font-size: 80px;
      margin-bottom: 24px;
    }
    
    .cover-title {
      font-size: 42px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }
    
    .cover-description {
      font-size: 18px;
      color: #6b7280;
      max-width: 600px;
      margin-bottom: 40px;
      line-height: 1.7;
    }
    
    .cover-meta {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .cover-meta-item {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 12px 20px;
      font-size: 13px;
      color: #374151;
    }
    
    .cover-meta-item strong {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #9ca3af;
      margin-bottom: 4px;
    }
    
    .cover-brand {
      margin-top: 60px;
      font-size: 14px;
      font-weight: 600;
      color: #10b981;
      letter-spacing: 0.02em;
    }
    
    .content {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 60px;
    }
    
    .toc {
      padding: 40px 60px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .toc h2 {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 2px solid #10b981;
    }
    
    .toc-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px dotted #e5e7eb;
      font-size: 14px;
    }
    
    .toc-item.module {
      font-weight: 600;
      color: #111827;
      margin-top: 8px;
    }
    
    .toc-item.topic {
      color: #6b7280;
      padding-left: 20px;
      font-size: 13px;
    }
    
    .module-section {
      margin-bottom: 48px;
    }
    
    .module-header {
      background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
      border-left: 4px solid #10b981;
      border-radius: 0 12px 12px 0;
      padding: 20px 24px;
      margin-bottom: 24px;
    }
    
    .module-number {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #10b981;
      margin-bottom: 4px;
    }
    
    .module-title {
      font-size: 22px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 8px;
    }
    
    .module-description {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.6;
    }
    
    .topic-section {
      margin-bottom: 32px;
      padding: 20px 24px;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
    }
    
    .topic-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .topic-icon {
      width: 36px;
      height: 36px;
      background: #f0fdf4;
      border: 1px solid #d1fae5;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
    
    .topic-title {
      font-size: 17px;
      font-weight: 600;
      color: #111827;
    }
    
    .topic-meta {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    
    .topic-badge {
      font-size: 11px;
      padding: 3px 10px;
      border-radius: 20px;
      font-weight: 500;
    }
    
    .badge-difficulty {
      background: #fef3c7;
      color: #92400e;
    }
    
    .badge-time {
      background: #e0e7ff;
      color: #3730a3;
    }
    
    .topic-content {
      font-size: 14px;
      color: #374151;
      line-height: 1.8;
    }
    
    .topic-content h1, .topic-content h2, .topic-content h3 {
      color: #111827;
    }
    
    .topic-content code {
      background: #f3f4f6;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
      color: #dc2626;
    }
    
    .topic-content pre {
      background: #1f2937;
      color: #e5e7eb;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 12px 0;
    }
    
    .topic-content pre code {
      background: transparent;
      color: inherit;
      padding: 0;
    }
    
    .footer {
      text-align: center;
      padding: 40px;
      color: #9ca3af;
      font-size: 12px;
      border-top: 1px solid #e5e7eb;
      margin-top: 48px;
    }
    
    .print-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 12px;
      padding: 14px 28px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .print-button:hover {
      background: #059669;
    }
  </style>
</head>
<body>
  <!-- Print Button (hidden in print) -->
  <button class="print-button no-print" onclick="window.print()">
    🖨️ Descargar PDF
  </button>

  <!-- Cover Page -->
  <div class="cover">
    <div class="cover-icon">${course.icon || "📚"}</div>
    <h1 class="cover-title">${escapeHtml(course.title)}</h1>
    ${course.description ? `<p class="cover-description">${escapeHtml(course.description)}</p>` : ""}
    <div class="cover-meta">
      ${course.teacher?.name ? `<div class="cover-meta-item"><strong>Profesor</strong>${escapeHtml(course.teacher.name)}</div>` : ""}
      ${course.category ? `<div class="cover-meta-item"><strong>Categoría</strong>${escapeHtml(course.category.icon)} ${escapeHtml(course.category.name)}</div>` : ""}
      <div class="cover-meta-item"><strong>Nivel</strong>${levelLabels[course.level] || course.level}</div>
      ${course.duration ? `<div class="cover-meta-item"><strong>Duración</strong>${escapeHtml(course.duration)}</div>` : ""}
      <div class="cover-meta-item"><strong>Módulos</strong>${course.modules.length}</div>
      <div class="cover-meta-item"><strong>Temas</strong>${totalTopics}</div>
    </div>
    <div class="cover-brand">✨ Academy Tech</div>
  </div>

  <!-- Table of Contents -->
  <div class="toc page-break">
    <h2>📑 Contenido del Curso</h2>
    ${course.modules.map((mod) => `
      <div class="toc-item module">
        <span>Módulo ${mod.number}: ${escapeHtml(mod.title)}</span>
        <span>${mod.topics.length} temas</span>
      </div>
      ${mod.topics.map((topic) => `
        <div class="toc-item topic">
          <span>📄 ${escapeHtml(topic.name)}</span>
        </div>
      `).join("")}
    `).join("")}
  </div>

  <!-- Course Content -->
  <div class="content">
    ${course.modules.map((mod) => `
      <div class="module-section">
        <div class="module-header">
          <div class="module-number">Módulo ${mod.number}</div>
          <div class="module-title">${escapeHtml(mod.title)}</div>
          ${mod.description ? `<div class="module-description">${escapeHtml(mod.description)}</div>` : ""}
        </div>
        
        ${mod.topics.map((topic) => `
          <div class="topic-section">
            <div class="topic-header">
              <div class="topic-icon">📖</div>
              <div class="topic-title">${escapeHtml(topic.name)}</div>
            </div>
            <div class="topic-meta">
              <span class="topic-badge badge-difficulty">${difficultyLabels[topic.difficulty] || topic.difficulty}</span>
              <span class="topic-badge badge-time">⏱ ${escapeHtml(topic.estimatedTime)}</span>
            </div>
            ${topic.content ? `<div class="topic-content">${renderMarkdownToHTML(topic.content)}</div>` : '<div style="color:#9ca3af;font-style:italic;">Sin contenido aún</div>'}
          </div>
        `).join("")}
      </div>
    `).join("")}

    <!-- Footer -->
    <div class="footer">
      <p>📄 ${escapeHtml(course.title)} — Academy Tech</p>
      <p style="margin-top:4px;">Generado el ${new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</p>
    </div>
  </div>
</body>
</html>`;
}
