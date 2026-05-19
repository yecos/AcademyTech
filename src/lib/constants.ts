/**
 * Application-wide constants
 * Centralizes hardcoded values that are used across multiple files
 */

/** Default course slug used as fallback when no course is specified */
export const DEFAULT_COURSE_SLUG = "d5-render";

/** Map of course slugs to display names */
export const COURSE_NAMES: Record<string, string> = {
  "d5-render": "D5 Render",
  "diseno-arquitectonico-bim": "Diseño Arquitectónico BIM",
  "desarrollo-web-completo": "Desarrollo Web Completo",
  "fundamentos-ciberseguridad": "Ciberseguridad y Ethical Hacking",
  "introduccion-inteligencia-artificial": "Inteligencia Artificial",
};

/** Map of course slugs to descriptions */
export const COURSE_DESCRIPTIONS: Record<string, string> = {
  "d5-render": "Sigue tu progreso a través del curso completo de D5 Render. Completa los temas y evalúa tus conocimientos con las evaluaciones de cada módulo.",
  "diseno-arquitectonico-bim": "Domina la metodología BIM desde los fundamentos hasta la práctica profesional con Revit.",
  "desarrollo-web-completo": "Aprende a crear sitios web profesionales con HTML5, CSS3 y JavaScript ES6+.",
  "fundamentos-ciberseguridad": "Aprende cómo proteger sistemas y realizar auditorías de seguridad éticas.",
  "introduccion-inteligencia-artificial": "Desde machine learning hasta deep learning y modelos generativos.",
};
