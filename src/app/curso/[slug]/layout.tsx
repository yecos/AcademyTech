import { Metadata } from "next";

const courseNames: Record<string, string> = {
  "d5-render": "D5 Render",
  "diseno-arquitectonico-bim": "Diseño Arquitectónico BIM",
  "desarrollo-web-completo": "Desarrollo Web Completo",
  "fundamentos-ciberseguridad": "Ciberseguridad y Ethical Hacking",
  "introduccion-inteligencia-artificial": "Inteligencia Artificial",
};

const courseDescriptions: Record<string, string> = {
  "d5-render": "Sigue tu progreso a través del curso completo de D5 Render. Completa los temas y evalúa tus conocimientos.",
  "diseno-arquitectonico-bim": "Domina la metodología BIM desde los fundamentos hasta la práctica profesional con Revit.",
  "desarrollo-web-completo": "Aprende a crear sitios web profesionales con HTML5, CSS3 y JavaScript ES6+.",
  "fundamentos-ciberseguridad": "Aprende cómo proteger sistemas y realizar auditorías de seguridad éticas.",
  "introduccion-inteligencia-artificial": "Desde machine learning hasta deep learning y modelos generativos.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const courseName = courseNames[slug] || slug;
  const courseDescription =
    courseDescriptions[slug] ||
    "Plataforma de aprendizaje tecnológico con cursos interactivos y seguimiento de progreso.";

  return {
    title: `${courseName} - Academy Tech`,
    description: courseDescription,
    openGraph: {
      title: `${courseName} - Academy Tech`,
      description: courseDescription,
    },
  };
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
