export interface QuizOption {
  label: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string; // label: "A", "B", "C", "D"
}

export interface Module {
  id: string;
  number: number;
  title: string;
  topics: string[];
  quiz: QuizQuestion[];
}

export const modules: Module[] = [
  {
    id: "modulo-1",
    number: 1,
    title: "Introducción a D5 Render",
    topics: [
      "Qué es D5 Render y su historia",
      "Requisitos del sistema y hardware recomendado",
      "Descarga e instalación de D5 Render",
      "Interfaz principal y navegación básica",
      "Diferencias entre D5 Render y otros motores (Lumion, Enscape, V-Ray)",
      "Configuración inicial y preferencias",
    ],
    quiz: [
      {
        id: "m1-q1",
        question:
          "¿Qué tecnología de gráficos utiliza D5 Render para el renderizado en tiempo real?",
        options: [
          { label: "A", text: "CPU Rendering" },
          { label: "B", text: "Ray Tracing por hardware (RTX)" },
          { label: "C", text: "Rasterización clásica" },
          { label: "D", text: "Renderizado en la nube" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m1-q2",
        question:
          "¿Cuál de estos NO es un formato de archivo compatible para importar en D5 Render?",
        options: [
          { label: "A", text: "FBX" },
          { label: "B", text: "SKP (SketchUp)" },
          { label: "C", text: "MP4" },
          { label: "D", text: "OBJ" },
        ],
        correctAnswer: "C",
      },
      {
        id: "m1-q3",
        question:
          "¿Qué plugin de sincronización directa ofrece D5 Render para software de modelado?",
        options: [
          { label: "A", text: "Solo para 3ds Max" },
          { label: "B", text: "Solo para SketchUp" },
          {
            label: "C",
            text: "Para SketchUp, Rhino, Revit, Archicad, 3ds Max y más",
          },
          { label: "D", text: "No tiene plugins" },
        ],
        correctAnswer: "C",
      },
    ],
  },
  {
    id: "modulo-2",
    number: 2,
    title: "Importación y Gestión de Modelos",
    topics: [
      "Importar modelos desde SketchUp",
      "Importar modelos desde Rhino y Revit",
      "Formatos compatibles (FBX, OBJ, SKP, etc.)",
      "Organización de la escena con capas",
      "Reemplazo y actualización de modelos",
      "Asignación básica de materiales al importar",
    ],
    quiz: [
      {
        id: "m2-q1",
        question:
          "¿Qué opción permite actualizar un modelo ya importado sin perder los materiales asignados?",
        options: [
          { label: "A", text: "Eliminar y volver a importar" },
          {
            label: "B",
            text: 'Usar la función "Reimportar" o "Actualizar modelo"',
          },
          { label: "C", text: "No es posible actualizar modelos" },
          {
            label: "D",
            text: "Copiar y pegar desde el software original",
          },
        ],
        correctAnswer: "B",
      },
      {
        id: "m2-q2",
        question: "¿Para qué sirven las capas en D5 Render?",
        options: [
          { label: "A", text: "Para agregar efectos de post-producción" },
          {
            label: "B",
            text: "Para organizar y mostrar/ocultar grupos de objetos",
          },
          { label: "C", text: "Para cambiar el material de los objetos" },
          { label: "D", text: "Para crear animaciones" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m2-q3",
        question:
          "¿Qué sucede con los materiales cuando importas un modelo desde SketchUp?",
        options: [
          { label: "A", text: "Se pierden todos los materiales" },
          {
            label: "B",
            text: "D5 Render intenta convertir automáticamente los materiales de SketchUp",
          },
          { label: "C", text: "Solo se importa la geometría sin materiales" },
          { label: "D", text: "Se asignan materiales aleatorios" },
        ],
        correctAnswer: "B",
      },
    ],
  },
  {
    id: "modulo-3",
    number: 3,
    title: "Iluminación",
    topics: [
      "Iluminación natural: Sol y cielo",
      "Uso de HDRI para iluminación ambiental",
      "Iluminación artificial: luces puntuales, spots y áreas",
      "Luz volumétrica y rayos de sol (God rays)",
      "Configuración de sombras y suavizado",
      "Geolocalización y hora del día",
    ],
    quiz: [
      {
        id: "m3-q1",
        question:
          "¿Qué tipo de mapa se utiliza para simular la iluminación ambiental del entorno?",
        options: [
          { label: "A", text: "Mapa de normales" },
          { label: "B", text: "HDRI (High Dynamic Range Image)" },
          { label: "C", text: "Mapa de desplazamiento" },
          { label: "D", text: "Mapa de opacidad" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m3-q2",
        question:
          "¿Cómo se crea un efecto de rayos de sol visibles (God rays) en D5 Render?",
        options: [
          { label: "A", text: "Aumentando la resolución del render" },
          {
            label: "B",
            text: "Activando la luz volumétrica en la configuración del sol",
          },
          { label: "C", text: "Agregando más luces puntuales" },
          { label: "D", text: "Cambiando el material del suelo" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m3-q3",
        question:
          "¿Se puede ajustar la posición del sol según una ubicación geográfica real?",
        options: [
          { label: "A", text: "No, solo se puede ajustar manualmente" },
          {
            label: "B",
            text: "Sí, D5 Render permite geolocalizar la escena y ajustar fecha y hora",
          },
          { label: "C", text: "Solo con plugins adicionales" },
          { label: "D", text: "Solo en la versión Pro" },
        ],
        correctAnswer: "B",
      },
    ],
  },
  {
    id: "modulo-4",
    number: 4,
    title: "Materiales y Texturas",
    topics: [
      "Editor de materiales: interfaz y propiedades",
      "Tipos de materiales PBR (metálicos, dieléctricos)",
      "Mapas de textura: difuso, normal, rugosidad, metálico",
      "Vidrio y materiales translúcidos",
      "Biblioteca de materiales de D5 Render",
      "Creación de materiales personalizados",
    ],
    quiz: [
      {
        id: "m4-q1",
        question:
          "¿Qué mapa define las irregularidades superficiales finas de un material sin alterar la geometría?",
        options: [
          { label: "A", text: "Mapa difuso" },
          { label: "B", text: "Mapa de desplazamiento" },
          { label: "C", text: "Mapa normal" },
          { label: "D", text: "Mapa de opacidad" },
        ],
        correctAnswer: "C",
      },
      {
        id: "m4-q2",
        question:
          "¿Qué parámetro controla qué tan reflectante es una superficie?",
        options: [
          {
            label: "A",
            text: "Rugosidad (Roughness) - valores bajos = más reflectante",
          },
          { label: "B", text: "Color base" },
          { label: "C", text: "Opacidad" },
          { label: "D", text: "Transmisión" },
        ],
        correctAnswer: "A",
      },
      {
        id: "m4-q3",
        question:
          "¿Dónde puedes encontrar materiales predefinidos listos para usar en D5 Render?",
        options: [
          { label: "A", text: "Solo en sitios web de terceros" },
          {
            label: "B",
            text: "En la Biblioteca de Materiales integrada de D5 Render",
          },
          { label: "C", text: "No existen materiales predefinidos" },
          { label: "D", text: "Solo se pueden crear manualmente" },
        ],
        correctAnswer: "B",
      },
    ],
  },
  {
    id: "modulo-5",
    number: 5,
    title: "Vegetación y Entorno",
    topics: [
      "Sistema de vegetación de D5 Render",
      "Colocación de árboles, arbustos y flores",
      "Terreno y modelado del paisaje",
      "Sistema de agua y océano",
      "Skybox y atmósfera",
      "Efectos climáticos: lluvia y nieve",
    ],
    quiz: [
      {
        id: "m5-q1",
        question:
          "¿Qué característica tiene la vegetación nativa de D5 Render?",
        options: [
          { label: "A", text: "Es geometría estática sin movimiento" },
          {
            label: "B",
            text: "Tiene animación de viento integrada y respuesta al clima",
          },
          { label: "C", text: "Solo incluye árboles sin hojas" },
          { label: "D", text: "No se puede personalizar" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m5-q2",
        question: "¿Cómo se modifica el terreno en D5 Render?",
        options: [
          { label: "A", text: "No se puede modificar el terreno" },
          {
            label: "B",
            text: "Con la herramienta Terrain que permite pintar elevaciones",
          },
          { label: "C", text: "Solo importando desde SketchUp" },
          { label: "D", text: "Usando el editor de materiales" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m5-q3",
        question: "¿Se pueden simular efectos de lluvia y nieve en D5 Render?",
        options: [
          {
            label: "A",
            text: "No, solo se pueden agregar en post-producción",
          },
          {
            label: "B",
            text: "Sí, D5 Render tiene efectos climáticos integrados",
          },
          { label: "C", text: "Solo en la versión de pago" },
          { label: "D", text: "Solo lluvia, no nieve" },
        ],
        correctAnswer: "B",
      },
    ],
  },
  {
    id: "modulo-6",
    number: 6,
    title: "Cámara y Composición",
    topics: [
      "Configuración de la cámara virtual",
      "Profundidad de campo (DOF)",
      "Composición fotográfica: regla de tercios",
      "Exposición y balance de blancos",
      "Vistas guardadas y presets de cámara",
      "Perspectiva vs. ortográfica",
    ],
    quiz: [
      {
        id: "m6-q1",
        question:
          "¿Qué parámetro controla la profundidad de campo en D5 Render?",
        options: [
          { label: "A", text: "La distancia focal solamente" },
          {
            label: "B",
            text: "El diafragma (apertura) y la distancia de enfoque",
          },
          { label: "C", text: "La resolución de la imagen" },
          { label: "D", text: "El tipo de luz" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m6-q2",
        question:
          "¿Para qué sirve la regla de tercios en composición?",
        options: [
          { label: "A", text: "Para medir la exposición correcta" },
          {
            label: "B",
            text: "Para colocar elementos clave en intersecciones que generan mayor interés visual",
          },
          { label: "C", text: "Para calcular el tiempo de render" },
          { label: "D", text: "Para ajustar el balance de blancos" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m6-q3",
        question:
          "¿Se pueden guardar múltiples configuraciones de cámara para una misma escena?",
        options: [
          { label: "A", text: "No, solo una vista por escena" },
          {
            label: "B",
            text: "Sí, D5 Render permite guardar múltiples vistas con diferentes configuraciones",
          },
          { label: "C", text: "Solo si se duplica la escena" },
          { label: "D", text: "Solo en la versión Pro" },
        ],
        correctAnswer: "B",
      },
    ],
  },
  {
    id: "modulo-7",
    number: 7,
    title: "Renderizado",
    topics: [
      "Configuración de resolución y calidad de render",
      "Render de imagen fija (fotografía)",
      "Render de video y animación",
      "Render panorámico 360°",
      "Formatos de exportación",
      "Optimización del tiempo de render",
    ],
    quiz: [
      {
        id: "m7-q1",
        question:
          "¿Cuál es la diferencia principal entre el renderizado en tiempo real y el render final?",
        options: [
          { label: "A", text: "No hay diferencia" },
          {
            label: "B",
            text: "El render final aplica más pases de ray tracing para mayor calidad",
          },
          { label: "C", text: "El render en tiempo real tiene mejor calidad" },
          { label: "D", text: "El render final no soporta efectos" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m7-q2",
        question:
          "¿Qué formato de imagen es recomendado para preservar la mayor información de color?",
        options: [
          { label: "A", text: "JPEG" },
          { label: "B", text: "PNG" },
          { label: "C", text: "EXR o HDR" },
          { label: "D", text: "BMP" },
        ],
        correctAnswer: "C",
      },
      {
        id: "m7-q3",
        question:
          "¿Qué tipo de render permite visualizar la escena en 360° interactivo?",
        options: [
          { label: "A", text: "Render de imagen normal" },
          { label: "B", text: "Render panorámico" },
          { label: "C", text: "Render de video" },
          { label: "D", text: "Render de profundidad" },
        ],
        correctAnswer: "B",
      },
    ],
  },
  {
    id: "modulo-8",
    number: 8,
    title: "Efectos y Post-producción",
    topics: [
      "Panel de efectos de post-producción",
      "Ambient Occlusion (AO)",
      "Bloom y resplandor",
      "Viñeta y corrección de color",
      "Estilos artísticos y efectos especiales",
      "Exportación para post-producción externa (Photoshop, After Effects)",
    ],
    quiz: [
      {
        id: "m8-q1",
        question:
          "¿Qué efecto produce un resplandor suave alrededor de las fuentes de luz brillantes?",
        options: [
          { label: "A", text: "Ambient Occlusion" },
          { label: "B", text: "Viñeta" },
          { label: "C", text: "Bloom" },
          { label: "D", text: "Sharpen" },
        ],
        correctAnswer: "C",
      },
      {
        id: "m8-q2",
        question: "¿Qué es el Ambient Occlusion?",
        options: [
          { label: "A", text: "Un efecto que difumina toda la imagen" },
          {
            label: "B",
            text: "Una técnica que oscurece las esquinas y pliegues donde la luz no llega fácilmente",
          },
          { label: "C", text: "Un filtro de color" },
          { label: "D", text: "Un efecto de movimiento" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m8-q3",
        question:
          "¿Por qué es útil exportar en formato EXR para post-producción?",
        options: [
          { label: "A", text: "Porque es el formato más ligero" },
          {
            label: "B",
            text: "Porque es compatible con todos los programas",
          },
          {
            label: "C",
            text: "Porque conserva información HDR y permite ajustar exposición y color sin pérdida",
          },
          {
            label: "D",
            text: "Porque no requiere software especializado",
          },
        ],
        correctAnswer: "C",
      },
    ],
  },
  {
    id: "modulo-9",
    number: 9,
    title: "Animación",
    topics: [
      "Introducción a la línea de tiempo",
      "Keyframes y animación de cámara",
      "Animación de objetos y transformaciones",
      "Animación de luces y materiales",
      "Transiciones y efectos de cámara",
      "Exportación de animaciones en video",
    ],
    quiz: [
      {
        id: "m9-q1",
        question: "¿Qué es un keyframe en animación?",
        options: [
          { label: "A", text: "Un tipo de material" },
          {
            label: "B",
            text: "Un punto en el tiempo donde se define un estado específico de una propiedad",
          },
          { label: "C", text: "Una luz especial" },
          { label: "D", text: "Un formato de video" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m9-q2",
        question: "¿Se pueden animar materiales en D5 Render?",
        options: [
          { label: "A", text: "No, solo se pueden animar cámaras" },
          {
            label: "B",
            text: "Sí, se pueden animar propiedades de materiales como opacidad y color",
          },
          { label: "C", text: "Solo en la versión Pro" },
          { label: "D", text: "Solo materiales de agua" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m9-q3",
        question:
          "¿Qué tipo de transiciones de cámara ofrece D5 Render?",
        options: [
          { label: "A", text: "Solo cortes directos" },
          {
            label: "B",
            text: "Transiciones suaves, recorrido y orbit",
          },
          { label: "C", text: "No soporta transiciones" },
          { label: "D", text: "Solo zoom in/out" },
        ],
        correctAnswer: "B",
      },
    ],
  },
  {
    id: "modulo-10",
    number: 10,
    title: "Proyecto Final y Tips Avanzados",
    topics: [
      "Planificación de un proyecto completo",
      "Flujo de trabajo profesional: del modelo al render final",
      "Optimización de escenas pesadas",
      "Tips y trucos para resultados realistas",
      "Errores comunes y cómo evitarlos",
      "Recursos y comunidad D5 Render",
    ],
    quiz: [
      {
        id: "m10-q1",
        question:
          "¿Cuál es una buena práctica para optimizar una escena pesada en D5 Render?",
        options: [
          { label: "A", text: "Agregar más luces para mejorar la calidad" },
          {
            label: "B",
            text: "Reducir geometría innecesaria y usar LOD (Level of Detail)",
          },
          { label: "C", text: "Aumentar la resolución al máximo" },
          { label: "D", text: "Usar solo materiales personalizados" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m10-q2",
        question: "¿Qué es el LOD (Level of Detail)?",
        options: [
          { label: "A", text: "Un tipo de material" },
          {
            label: "B",
            text: "Una técnica que reduce la complejidad de los objetos según la distancia a la cámara",
          },
          { label: "C", text: "Un efecto de iluminación" },
          { label: "D", text: "Un formato de archivo 3D" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m10-q3",
        question:
          "¿Dónde puedes encontrar recursos adicionales y soporte para D5 Render?",
        options: [
          { label: "A", text: "Solo en la documentación oficial" },
          {
            label: "B",
            text: "En la comunidad oficial, foros, y la biblioteca de recursos de D5",
          },
          { label: "C", text: "No existen recursos adicionales" },
          { label: "D", text: "Solo en redes sociales" },
        ],
        correctAnswer: "B",
      },
    ],
  },
];

export function getTotalTopics(): number {
  return modules.reduce((sum, m) => sum + m.topics.length, 0);
}
