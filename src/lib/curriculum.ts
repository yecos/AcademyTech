export interface TopicInfo {
  name: string;
  difficulty: 'basico' | 'intermedio' | 'avanzado';
  estimatedTime: string;
}

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
  topics: TopicInfo[];
  quiz: QuizQuestion[];
}

export const modules: Module[] = [
  {
    id: "modulo-1",
    number: 1,
    title: "Introducción a D5 Render",
    topics: [
      { name: "Qué es D5 Render y su historia", difficulty: "basico", estimatedTime: "15 min" },
      { name: "Requisitos del sistema y hardware recomendado", difficulty: "basico", estimatedTime: "20 min" },
      { name: "Descarga e instalación de D5 Render", difficulty: "basico", estimatedTime: "15 min" },
      { name: "Interfaz principal y navegación básica", difficulty: "basico", estimatedTime: "25 min" },
      { name: "Diferencias entre D5 Render y otros motores (Lumion, Enscape, V-Ray)", difficulty: "intermedio", estimatedTime: "30 min" },
      { name: "Configuración inicial y preferencias", difficulty: "basico", estimatedTime: "20 min" },
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
      {
        id: "m1-q4",
        question:
          "¿Qué componente de hardware es más determinante para el rendimiento de D5 Render?",
        options: [
          { label: "A", text: "La tarjeta de sonido" },
          { label: "B", text: "La tarjeta gráfica (GPU) con soporte RTX" },
          { label: "C", text: "El disco duro mecánico" },
          { label: "D", text: "La memoria RAM exclusivamente" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m1-q5",
        question:
          "¿Cuál es la principal ventaja de D5 Render sobre V-Ray en cuanto a flujo de trabajo?",
        options: [
          { label: "A", text: "V-Ray es más rápido en renderizado en tiempo real" },
          { label: "B", text: "D5 Render permite visualización en tiempo real con ray tracing" },
          { label: "C", text: "V-Ray tiene mejor biblioteca de materiales" },
          { label: "D", text: "D5 Render solo funciona con CPU" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m1-q6",
        question:
          "¿Qué diferencia a D5 Render de Lumion en términos de tecnología de renderizado?",
        options: [
          { label: "A", text: "Lumion usa ray tracing por hardware nativo" },
          { label: "B", text: "D5 Render utiliza ray tracing en tiempo real basado en GPU NVIDIA RTX" },
          { label: "C", text: "Ambos usan la misma tecnología" },
          { label: "D", text: "D5 Render no soporta ray tracing" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m1-q7",
        question:
          "¿Qué versión de DirectX requiere D5 Render como mínimo para funcionar correctamente?",
        options: [
          { label: "A", text: "DirectX 9" },
          { label: "B", text: "DirectX 11" },
          { label: "C", text: "DirectX 12" },
          { label: "D", text: "No requiere DirectX" },
        ],
        correctAnswer: "C",
      },
      {
        id: "m1-q8",
        question:
          "¿Por qué D5 Render requiere una GPU NVIDIA RTX para un rendimiento óptimo?",
        options: [
          { label: "A", text: "Porque los núcleos RT y Tensor aceleran el ray tracing y el denoising en tiempo real" },
          { label: "B", text: "Porque solo NVIDIA produce GPUs compatibles" },
          { label: "C", text: "Porque AMD no soporta gráficos 3D" },
          { label: "D", text: "No es necesario, cualquier GPU funciona igual" },
        ],
        correctAnswer: "A",
      },
    ],
  },
  {
    id: "modulo-2",
    number: 2,
    title: "Importación y Gestión de Modelos",
    topics: [
      { name: "Importar modelos desde SketchUp", difficulty: "basico", estimatedTime: "20 min" },
      { name: "Importar modelos desde Rhino y Revit", difficulty: "intermedio", estimatedTime: "25 min" },
      { name: "Formatos compatibles (FBX, OBJ, SKP, etc.)", difficulty: "basico", estimatedTime: "20 min" },
      { name: "Organización de la escena con capas", difficulty: "intermedio", estimatedTime: "30 min" },
      { name: "Reemplazo y actualización de modelos", difficulty: "intermedio", estimatedTime: "35 min" },
      { name: "Asignación básica de materiales al importar", difficulty: "basico", estimatedTime: "25 min" },
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
      {
        id: "m2-q4",
        question:
          "¿Cuál es la ventaja de usar el plugin de sincronización de D5 Render para SketchUp frente a la importación manual?",
        options: [
          { label: "A", text: "No hay ninguna diferencia" },
          { label: "B", text: "Permite sincronizar cambios bidireccionalmente sin reimportar manualmente" },
          { label: "C", text: "Solo funciona con la versión Pro de SketchUp" },
          { label: "D", text: "Importa modelos más lentamente" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m2-q5",
        question:
          "¿Qué formato de archivo conserva mejor la jerarquía de objetos y materiales al importar a D5 Render?",
        options: [
          { label: "A", text: "OBJ" },
          { label: "B", text: "STL" },
          { label: "C", text: "FBX" },
          { label: "D", text: "3DS" },
        ],
        correctAnswer: "C",
      },
      {
        id: "m2-q6",
        question:
          "¿Cómo se organiza una escena compleja con cientos de objetos en D5 Render?",
        options: [
          { label: "A", text: "No es posible organizar objetos" },
          { label: "B", text: "Usando capas y agrupación de objetos en la lista de escena" },
          { label: "C", text: "Solo se pueden nombrar los objetos" },
          { label: "D", text: "Eliminando objetos innecesarios únicamente" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m2-q7",
        question:
          "¿Qué sucede si el modelo original en SketchUp se modifica después de haberlo importado en D5 Render?",
        options: [
          { label: "A", text: "D5 Render actualiza automáticamente el modelo sin intervención" },
          { label: "B", text: "Se debe usar la función de reimportación o sincronización para reflejar los cambios" },
          { label: "C", text: "El modelo se elimina de D5 Render" },
          { label: "D", text: "Los cambios no se pueden reflejar nunca" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m2-q8",
        question:
          "¿Cuál es la mejor estrategia al importar un modelo de Revit con múltiples niveles y categorías?",
        options: [
          { label: "A", text: "Importar todo en una sola capa sin separación" },
          { label: "B", text: "Organizar por capas según categorías o niveles para facilitar la gestión y visibilidad" },
          { label: "C", text: "Eliminar los elementos que no se van a renderizar antes de importar" },
          { label: "D", text: "Convertir todo a un único formato OBJ antes de importar" },
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
      { name: "Iluminación natural: Sol y cielo", difficulty: "intermedio", estimatedTime: "25 min" },
      { name: "Uso de HDRI para iluminación ambiental", difficulty: "intermedio", estimatedTime: "30 min" },
      { name: "Iluminación artificial: luces puntuales, spots y áreas", difficulty: "intermedio", estimatedTime: "35 min" },
      { name: "Luz volumétrica y rayos de sol (God rays)", difficulty: "avanzado", estimatedTime: "40 min" },
      { name: "Configuración de sombras y suavizado", difficulty: "intermedio", estimatedTime: "30 min" },
      { name: "Geolocalización y hora del día", difficulty: "avanzado", estimatedTime: "45 min" },
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
      {
        id: "m3-q4",
        question:
          "¿Cuál es la diferencia entre una luz puntual y una luz spot en D5 Render?",
        options: [
          { label: "A", text: "No hay diferencia entre ambas" },
          { label: "B", text: "La luz puntual emite en todas las direcciones; la spot emite en un cono direccional" },
          { label: "C", text: "La luz spot emite en todas las direcciones; la puntual es direccional" },
          { label: "D", text: "Solo difieren en el color de la luz" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m3-q5",
        question:
          "¿Qué parámetro del sol controla la suavidad de las sombras proyectadas?",
        options: [
          { label: "A", text: "El tamaño del disco solar (Sun Size)" },
          { label: "B", text: "La intensidad de la luz" },
          { label: "C", text: "El color de la luz solar" },
          { label: "D", text: "La altura de la cámara" },
        ],
        correctAnswer: "A",
      },
      {
        id: "m3-q6",
        question:
          "¿Cómo afecta el HDRI a la escena además de proporcionar iluminación?",
        options: [
          { label: "A", text: "Solo afecta la iluminación, no el entorno visual" },
          { label: "B", text: "También se refleja en materiales reflectantes y actúa como fondo visible del skybox" },
          { label: "C", text: "Modifica la geometría de la escena" },
          { label: "D", text: "Cambia automáticamente los materiales de la escena" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m3-q7",
        question:
          "¿Qué tipo de luz es más adecuada para simular una lámpara de techo rectangular en un interior?",
        options: [
          { label: "A", text: "Luz puntual" },
          { label: "B", text: "Luz spot" },
          { label: "C", text: "Luz de área (Area Light)" },
          { label: "D", text: "Luz volumétrica" },
        ],
        correctAnswer: "C",
      },
      {
        id: "m3-q8",
        question:
          "¿Cuál es la mejor estrategia para lograr una iluminación realista en un interior con ventanas?",
        options: [
          { label: "A", text: "Usar solo luces artificiales sin sol" },
          { label: "B", text: "Combinar iluminación natural del sol/HDRI a través de las ventanas con luces artificiales de relleno" },
          { label: "C", text: "Usar solo HDRI sin luces artificiales" },
          { label: "D", text: "Aumentar la exposición al máximo para compensar" },
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
      { name: "Editor de materiales: interfaz y propiedades", difficulty: "intermedio", estimatedTime: "30 min" },
      { name: "Tipos de materiales PBR (metálicos, dieléctricos)", difficulty: "intermedio", estimatedTime: "35 min" },
      { name: "Mapas de textura: difuso, normal, rugosidad, metálico", difficulty: "intermedio", estimatedTime: "35 min" },
      { name: "Vidrio y materiales translúcidos", difficulty: "avanzado", estimatedTime: "40 min" },
      { name: "Biblioteca de materiales de D5 Render", difficulty: "intermedio", estimatedTime: "30 min" },
      { name: "Creación de materiales personalizados", difficulty: "avanzado", estimatedTime: "45 min" },
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
      {
        id: "m4-q4",
        question:
          "¿Qué diferencia un material metálico de uno dieléctrico en el sistema PBR?",
        options: [
          { label: "A", text: "Los materiales metálicos no reflejan la luz" },
          { label: "B", text: "Los materiales metálicos tienen valor metálico alto y tintan sus reflejos con el color base; los dieléctricos no" },
          { label: "C", text: "No hay diferencia en el sistema PBR" },
          { label: "D", text: "Los dieléctricos son siempre transparentes" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m4-q5",
        question:
          "¿Qué mapa se utiliza para crear agujeros o perforaciones en un material, como una cerca metálica?",
        options: [
          { label: "A", text: "Mapa normal" },
          { label: "B", text: "Mapa de rugosidad" },
          { label: "C", text: "Mapa de opacidad (Alpha)" },
          { label: "D", text: "Mapa metálico" },
        ],
        correctAnswer: "C",
      },
      {
        id: "m4-q6",
        question:
          "¿Cómo se configura un material de vidrio realista en D5 Render?",
        options: [
          { label: "A", text: "Aumentando la rugosidad al máximo" },
          { label: "B", text: "Usando transmisión con índice de refracción (IOR) adecuado y baja rugosidad" },
          { label: "C", text: "Asignando solo un mapa difuso transparente" },
          { label: "D", text: "Usando el material metálico con opacidad baja" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m4-q7",
        question:
          "¿Qué es el IOR (Índice de Refracción) en un material translúcido?",
        options: [
          { label: "A", text: "La cantidad de luz que refleja el material" },
          { label: "B", text: "La medida de cuánto se desvía la luz al atravesar el material" },
          { label: "C", text: "El nivel de opacidad del material" },
          { label: "D", text: "El brillo de la superficie" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m4-q8",
        question:
          "¿Cuál es la ventaja de crear materiales personalizados frente a usar solo la biblioteca de D5 Render?",
        options: [
          { label: "A", text: "No hay ventaja, la biblioteca siempre es suficiente" },
          { label: "B", text: "Permite adaptar materiales a necesidades específicas del proyecto con texturas y propiedades únicas" },
          { label: "C", text: "Los materiales personalizados siempre se renderizan más rápido" },
          { label: "D", text: "Solo sirve para materiales metálicos" },
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
      { name: "Sistema de vegetación de D5 Render", difficulty: "intermedio", estimatedTime: "25 min" },
      { name: "Colocación de árboles, arbustos y flores", difficulty: "intermedio", estimatedTime: "30 min" },
      { name: "Terreno y modelado del paisaje", difficulty: "avanzado", estimatedTime: "35 min" },
      { name: "Sistema de agua y océano", difficulty: "avanzado", estimatedTime: "40 min" },
      { name: "Skybox y atmósfera", difficulty: "intermedio", estimatedTime: "30 min" },
      { name: "Efectos climáticos: lluvia y nieve", difficulty: "intermedio", estimatedTime: "35 min" },
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
      {
        id: "m5-q4",
        question:
          "¿Qué tipo de geometría utiliza la vegetación nativa de D5 Render para optimizar el rendimiento?",
        options: [
          { label: "A", text: "Geometría de alta poligonización siempre" },
          { label: "B", text: "Billboards 2D planos" },
          { label: "C", text: "Modelos 3D optimizados con niveles de detalle adaptativos" },
          { label: "D", text: "Solo texturas sin geometría" },
        ],
        correctAnswer: "C",
      },
      {
        id: "m5-q5",
        question:
          "¿Cómo se coloca vegetación de forma masiva en una zona grande del terreno?",
        options: [
          { label: "A", text: "Solo se puede colocar una por una manualmente" },
          { label: "B", text: "Usando la herramienta de pintura de vegetación que permite esparcir elementos sobre el terreno" },
          { label: "C", text: "Importando un archivo CSV con posiciones" },
          { label: "D", text: "No es posible colocar vegetación masivamente" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m5-q6",
        question:
          "¿Qué parámetros se pueden ajustar en el sistema de agua de D5 Render?",
        options: [
          { label: "A", text: "Solo el color del agua" },
          { label: "B", text: "Ondas, velocidad del viento, profundidad, color y transparencia" },
          { label: "C", text: "Solo la velocidad del movimiento" },
          { label: "D", text: "El agua no se puede personalizar" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m5-q7",
        question:
          "¿Cómo afecta el skybox a la iluminación y el ambiente de la escena?",
        options: [
          { label: "A", text: "Solo cambia el fondo visual sin afectar la iluminación" },
          { label: "B", text: "El skybox define el entorno visible y también contribuye a la iluminación ambiental de la escena" },
          { label: "C", text: "Elimina todas las sombras" },
          { label: "D", text: "Solo funciona con iluminación artificial" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m5-q8",
        question:
          "¿Cuál es la mejor estrategia para crear un paisaje natural convincente con vegetación en D5 Render?",
        options: [
          { label: "A", text: "Usar un solo tipo de árbol repetido uniformemente" },
          { label: "B", text: "Combinar múltiples especies de vegetación con variaciones de escala, rotación y densidad para lograr naturalidad" },
          { label: "C", text: "Colocar vegetación solo en los bordes de la escena" },
          { label: "D", text: "Usar solo vegetación importada desde otros programas" },
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
      { name: "Configuración de la cámara virtual", difficulty: "intermedio", estimatedTime: "20 min" },
      { name: "Profundidad de campo (DOF)", difficulty: "intermedio", estimatedTime: "25 min" },
      { name: "Composición fotográfica: regla de tercios", difficulty: "intermedio", estimatedTime: "20 min" },
      { name: "Exposición y balance de blancos", difficulty: "intermedio", estimatedTime: "25 min" },
      { name: "Vistas guardadas y presets de cámara", difficulty: "intermedio", estimatedTime: "30 min" },
      { name: "Perspectiva vs. ortográfica", difficulty: "avanzado", estimatedTime: "35 min" },
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
      {
        id: "m6-q4",
        question:
          "¿Qué efecto produce un valor de apertura (f-stop) bajo en la cámara?",
        options: [
          { label: "A", text: "Mayor profundidad de campo (todo enfocado)" },
          { label: "B", text: "Menor profundidad de campo (desenfoque más pronunciado del fondo)" },
          { label: "C", text: "Más oscuridad en toda la imagen" },
          { label: "D", text: "Cambia el color de la imagen" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m6-q5",
        question:
          "¿Qué es el balance de blancos y cómo afecta a la imagen renderizada?",
        options: [
          { label: "A", text: "Controla el brillo general de la imagen" },
          { label: "B", text: "Ajusta la temperatura de color para que los blancos se vean neutros, afectando la dominante cálido/fría de la imagen" },
          { label: "C", text: "Cambia la resolución de la imagen" },
          { label: "D", text: "Afecta solo a las sombras" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m6-q6",
        question:
          "¿Cuándo es más útil utilizar la vista ortográfica en lugar de la perspectiva?",
        options: [
          { label: "A", text: "Para renders realistas de interiores" },
          { label: "B", text: "Para visualizaciones arquitectónicas técnicas como plantas, elevaciones o secciones sin distorsión" },
          { label: "C", text: "Para animaciones de recorrido" },
          { label: "D", text: "La vista ortográfica no está disponible en D5 Render" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m6-q7",
        question:
          "¿Cómo se utiliza la distancia focal de la cámara para mejorar la composición de un interior?",
        options: [
          { label: "A", text: "Siempre usar la distancia focal más corta posible" },
          { label: "B", text: "Usar distancias focales amplias (gran angular) para capturar más espacio, y distancias largas para detalles específicos sin distorsión" },
          { label: "C", text: "La distancia focal no afecta la composición" },
          { label: "D", text: "Solo importa la orientación de la cámara" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m6-q8",
        question:
          "¿Cuál es la ventaja de guardar múltiples vistas de cámara en un mismo proyecto?",
        options: [
          { label: "A", text: "No hay ventaja significativa" },
          { label: "B", text: "Permite comparar rápidamente diferentes ángulos y composiciones, y generar múltiples renders sin reconfigurar la cámara cada vez" },
          { label: "C", text: "Reduce el tiempo de render" },
          { label: "D", text: "Solo sirve para animaciones" },
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
      { name: "Configuración de resolución y calidad de render", difficulty: "intermedio", estimatedTime: "25 min" },
      { name: "Render de imagen fija (fotografía)", difficulty: "intermedio", estimatedTime: "30 min" },
      { name: "Render de video y animación", difficulty: "avanzado", estimatedTime: "35 min" },
      { name: "Render panorámico 360°", difficulty: "avanzado", estimatedTime: "40 min" },
      { name: "Formatos de exportación", difficulty: "intermedio", estimatedTime: "25 min" },
      { name: "Optimización del tiempo de render", difficulty: "avanzado", estimatedTime: "35 min" },
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
      {
        id: "m7-q4",
        question:
          "¿Qué resolución se recomienda como mínimo para un render de alta calidad destinado a impresión A3?",
        options: [
          { label: "A", text: "1920x1080 (Full HD)" },
          { label: "B", text: "3840x2160 (4K)" },
          { label: "C", text: "800x600" },
          { label: "D", text: "1280x720 (HD)" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m7-q5",
        question:
          "¿Qué factor afecta más significativamente al tiempo de renderizado?",
        options: [
          { label: "A", text: "El nombre del archivo" },
          { label: "B", text: "La cantidad de luces, materiales complejos y resolución de salida" },
          { label: "C", text: "La fecha del proyecto" },
          { label: "D", text: "El formato del archivo original importado" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m7-q6",
        question:
          "¿Cuál es la ventaja de exportar un render en formato PNG frente a JPEG?",
        options: [
          { label: "A", text: "PNG tiene menor tamaño de archivo" },
          { label: "B", text: "PNG soporta transparencia (canal alfa) y compresión sin pérdida de calidad" },
          { label: "C", text: "JPEG tiene mejor calidad siempre" },
          { label: "D", text: "No hay diferencia entre ambos formatos" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m7-q7",
        question:
          "¿Qué configuración de calidad de render es más apropiada durante la etapa de pruebas?",
        options: [
          { label: "A", text: "Calidad máxima siempre" },
          { label: "B", text: "Calidad baja o media para iterar rápidamente y alta solo para el render final" },
          { label: "C", text: "Calidad media fija en todo momento" },
          { label: "D", text: "No se puede cambiar la calidad" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m7-q8",
        question:
          "¿Cómo se puede reducir el tiempo de render en una escena con muchos reflejos y refracciones?",
        options: [
          { label: "A", text: "Agregar más objetos reflectantes para equilibrar" },
          { label: "B", text: "Reducir el número de pases de reflejos, simplificar materiales complejos y optimizar la geometría" },
          { label: "C", text: "Aumentar la resolución para que el render se haga más rápido" },
          { label: "D", text: "Eliminar todas las luces de la escena" },
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
      { name: "Panel de efectos de post-producción", difficulty: "intermedio", estimatedTime: "20 min" },
      { name: "Ambient Occlusion (AO)", difficulty: "intermedio", estimatedTime: "25 min" },
      { name: "Bloom y resplandor", difficulty: "intermedio", estimatedTime: "20 min" },
      { name: "Viñeta y corrección de color", difficulty: "intermedio", estimatedTime: "25 min" },
      { name: "Estilos artísticos y efectos especiales", difficulty: "avanzado", estimatedTime: "30 min" },
      { name: "Exportación para post-producción externa (Photoshop, After Effects)", difficulty: "avanzado", estimatedTime: "35 min" },
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
      {
        id: "m8-q4",
        question:
          "¿Qué efecto de viñeta se logra en D5 Render y para qué se utiliza?",
        options: [
          { label: "A", text: "Oscurece los bordes de la imagen para dirigir la atención al centro" },
          { label: "B", text: "Aclara los bordes de la imagen" },
          { label: "C", text: "Agrega un marco decorativo" },
          { label: "D", text: "Cambia la resolución de los bordes" },
        ],
        correctAnswer: "A",
      },
      {
        id: "m8-q5",
        question:
          "¿Qué es la corrección de color en el contexto de la post-producción de D5 Render?",
        options: [
          { label: "A", text: "Cambiar la geometría de la escena" },
          { label: "B", text: "Ajustar los niveles de brillo, contraste, saturación y tono para mejorar la imagen final" },
          { label: "C", text: "Agregar nuevos objetos a la escena" },
          { label: "D", text: "Eliminar ruido de la malla 3D" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m8-q6",
        question:
          "¿Qué canales de render se pueden exportar para facilitar la post-producción en Photoshop?",
        options: [
          { label: "A", text: "Solo la imagen final en JPEG" },
          { label: "B", text: "Canales como reflejos, refracciones, sombras, profundidad y material ID para selección precisa" },
          { label: "C", text: "Solo el canal alfa" },
          { label: "D", text: "D5 Render no permite exportar canales separados" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m8-q7",
        question:
          "¿Qué efecto de estilo artístico ofrece D5 Render para dar un aspecto no fotorrealista?",
        options: [
          { label: "A", text: "Solo efectos fotorrealistas están disponibles" },
          { label: "B", text: "Estilos como acuarela, boceto y efecto de línea que transforman la imagen renderizada" },
          { label: "C", text: "Solo filtros de color básicos" },
          { label: "D", text: "Estilos que solo funcionan en video" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m8-q8",
        question:
          "¿Cuál es la ventaja de realizar la corrección de color en D5 Render frente a hacerlo en Photoshop?",
        options: [
          { label: "A", text: "No hay diferencia entre ambas opciones" },
          { label: "B", text: "En D5 Render los ajustes se aplican directamente sobre el render en tiempo real, permitiendo iteración instantánea sin necesidad de reexportar" },
          { label: "C", text: "Photoshop no permite corrección de color" },
          { label: "D", text: "D5 Render tiene menos opciones de ajuste que Photoshop" },
        ],
        correctAnswer: "B",
      },
    ],
  },
  {
    id: "modulo-9",
    number: 9,
    title: "Animación",
    topics: [
      { name: "Introducción a la línea de tiempo", difficulty: "intermedio", estimatedTime: "30 min" },
      { name: "Keyframes y animación de cámara", difficulty: "intermedio", estimatedTime: "35 min" },
      { name: "Animación de objetos y transformaciones", difficulty: "avanzado", estimatedTime: "40 min" },
      { name: "Animación de luces y materiales", difficulty: "avanzado", estimatedTime: "45 min" },
      { name: "Transiciones y efectos de cámara", difficulty: "intermedio", estimatedTime: "35 min" },
      { name: "Exportación de animaciones en video", difficulty: "intermedio", estimatedTime: "30 min" },
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
      {
        id: "m9-q4",
        question:
          "¿Qué es la línea de tiempo en el sistema de animación de D5 Render?",
        options: [
          { label: "A", text: "Una lista de materiales ordenados" },
          { label: "B", text: "Una interfaz que muestra la secuencia temporal de la animación con keyframes y pistas de objetos" },
          { label: "C", text: "Un contador de polígonos" },
          { label: "D", text: "Un historial de cambios del proyecto" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m9-q5",
        question:
          "¿Cómo se crea una animación de recorrido de cámara en D5 Render?",
        options: [
          { label: "A", text: "Grabando la navegación en tiempo real con la cámara" },
          { label: "B", text: "Definiendo keyframes de posición y orientación de cámara en diferentes puntos de la línea de tiempo" },
          { label: "C", text: "Importando un archivo de animación externo" },
          { label: "D", text: "No es posible crear recorridos de cámara" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m9-q6",
        question:
          "¿Qué propiedades de los objetos se pueden animar con transformaciones?",
        options: [
          { label: "A", text: "Solo la posición" },
          { label: "B", text: "Posición, rotación y escala del objeto" },
          { label: "C", text: "Solo el material del objeto" },
          { label: "D", text: "Solo el nombre del objeto" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m9-q7",
        question:
          "¿Qué formato de video es más adecuado para publicar animaciones en web con buena calidad y tamaño reducido?",
        options: [
          { label: "A", text: "AVI sin compresión" },
          { label: "B", text: "MP4 con códec H.264 o H.265" },
          { label: "C", text: "BMP secuencial" },
          { label: "D", text: "GIF animado" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m9-q8",
        question:
          "¿Cuál es la mejor práctica para crear una animación fluida de cámara en un recorrido arquitectónico?",
        options: [
          { label: "A", text: "Usar muchos keyframes cercanos con movimientos bruscos" },
          { label: "B", text: "Distribuir keyframes con suficiente separación temporal y usar curvas de interpolación suaves para transiciones naturales" },
          { label: "C", text: "Usar un solo keyframe de inicio y fin" },
          { label: "D", text: "Animar la cámara manualmente sin keyframes" },
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
      { name: "Planificación de un proyecto completo", difficulty: "avanzado", estimatedTime: "35 min" },
      { name: "Flujo de trabajo profesional: del modelo al render final", difficulty: "avanzado", estimatedTime: "45 min" },
      { name: "Optimización de escenas pesadas", difficulty: "avanzado", estimatedTime: "40 min" },
      { name: "Tips y trucos para resultados realistas", difficulty: "avanzado", estimatedTime: "50 min" },
      { name: "Errores comunes y cómo evitarlos", difficulty: "avanzado", estimatedTime: "45 min" },
      { name: "Recursos y comunidad D5 Render", difficulty: "avanzado", estimatedTime: "60 min" },
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
      {
        id: "m10-q4",
        question:
          "¿Cuál es el primer paso recomendado al planificar un proyecto de visualización completo?",
        options: [
          { label: "A", text: "Comenzar directamente con el render final" },
          { label: "B", text: "Definir el objetivo del proyecto, las vistas necesarias y el estilo visual deseado antes de comenzar a modelar" },
          { label: "C", text: "Agregar la mayor cantidad de detalles posible" },
          { label: "D", text: "Elegir la música de fondo primero" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m10-q5",
        question:
          "¿Qué error común cometido por principiantes afecta negativamente al realismo de un render?",
        options: [
          { label: "A", text: "Usar iluminación HDRI" },
          { label: "B", text: "Utilizar materiales perfectamente limpios y sin imperfecciones, resultando en superficies poco naturales" },
          { label: "C", text: "Configurar correctamente el balance de blancos" },
          { label: "D", text: "Guardar múltiples vistas de cámara" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m10-q6",
        question:
          "¿Qué técnica ayuda a mejorar el realismo de los materiales en un render?",
        options: [
          { label: "A", text: "Usar colores sólidos sin texturas" },
          { label: "B", text: "Agregar mapas de desgaste, rugosidad variada y mapas normales que simulen imperfecciones reales" },
          { label: "C", text: "Aumentar la rugosidad al máximo en todos los materiales" },
          { label: "D", text: "Usar solo el color base de los materiales PBR" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m10-q7",
        question:
          "¿Cuál es la causa más común de un render con ruido excesivo?",
        options: [
          { label: "A", text: "Usar formato PNG para exportar" },
          { label: "B", text: "Insuficientes pases de render, iluminación compleja con reflejos o materiales con valores extremos" },
          { label: "C", text: "Guardar el proyecto con un nombre largo" },
          { label: "D", text: "Usar la vista en perspectiva" },
        ],
        correctAnswer: "B",
      },
      {
        id: "m10-q8",
        question:
          "¿Cuál es un flujo de trabajo profesional eficiente para un proyecto de visualización arquitectónica?",
        options: [
          { label: "A", text: "Modelar, importar, renderizar sin revisiones" },
          { label: "B", text: "Planificar → Modelar → Importar → Iluminar y aplicar materiales → Iterar con previews → Render final → Post-producción" },
          { label: "C", text: "Renderizar primero y ajustar materiales después" },
          { label: "D", text: "Comenzar por la post-producción y retroceder" },
        ],
        correctAnswer: "B",
      },
    ],
  },
];

export function getTotalTopics(): number {
  return modules.reduce((sum, m) => sum + m.topics.length, 0);
}
