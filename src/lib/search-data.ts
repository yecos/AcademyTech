// Shared data file for glossary and troubleshooting items
// Used by: /glosario, /soluciones, /buscar pages

export type GlossaryCategoryKey =
  | "renderizado"
  | "iluminacion"
  | "materiales"
  | "camara"
  | "animacion"
  | "exportacion";

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: GlossaryCategoryKey;
}

export type TroubleshootingCategoryKey =
  | "instalacion"
  | "importacion"
  | "iluminacion"
  | "materiales"
  | "exportacion";

export type Severity = "critico" | "moderado" | "leve";

export interface TroubleshootingItem {
  id: string;
  title: string;
  description: string;
  causes: string[];
  solutions: string[];
  category: TroubleshootingCategoryKey;
  severity: Severity;
}

// ============================================================
// GLOSSARY TERMS
// ============================================================

export const glossaryTerms: GlossaryTerm[] = [
  // Renderizado General
  {
    term: "Ray Tracing",
    definition:
      "Técnica de renderizado que simula el comportamiento físico de la luz trazando rayos desde la cámara hacia la escena. Produce imágenes fotorrealistas con reflejos, refracciones y sombras precisas, pero requiere mayor poder computacional.",
    category: "renderizado",
  },
  {
    term: "Rasterización",
    definition:
      "Método de renderizado que convierte objetos 3D en píxeles 2D proyectándolos sobre la pantalla. Es el método más rápido y utilizado en tiempo real, aunque menos preciso físicamente que el ray tracing.",
    category: "renderizado",
  },
  {
    term: "Denoiser",
    definition:
      "Algoritmo de posprocesamiento que elimina el ruido visual generado durante el renderizado con pocos pases (samples). En D5 Render, el denoiser AI permite obtener imágenes limpias con menos muestras, acelerando el proceso de render.",
    category: "renderizado",
  },
  {
    term: "Render",
    definition:
      "Proceso de generar una imagen 2D a partir de una escena 3D mediante cálculos de iluminación, materiales y geometría. El resultado final puede ser una imagen fija o un fotograma de una animación.",
    category: "renderizado",
  },
  {
    term: "Viewport",
    definition:
      "Ventana de visualización en tiempo real donde se muestra la escena 3D durante la edición. En D5 Render, el viewport muestra una vista previa con iluminación y materiales aproximados antes del render final.",
    category: "renderizado",
  },
  {
    term: "FPS (Fotogramas por segundo)",
    definition:
      "Medida de la fluidez con la que se muestra la escena en el viewport. Mayor FPS significa navegación más suave. En D5 Render, los FPS dependen de la complejidad de la escena y la capacidad de la GPU.",
    category: "renderizado",
  },
  {
    term: "Pase (Sample)",
    definition:
      "Cada iteración individual del algoritmo de renderizado que calcula la iluminación de la escena. Más pases producen imágenes con menos ruido pero tardan más tiempo. Se combinan para formar la imagen final.",
    category: "renderizado",
  },
  {
    term: "GI (Global Illumination)",
    definition:
      "Sistema de iluminación global que simula cómo la luz rebota entre superficies, creando efectos de color bleeding y luz indirecta realista. Es fundamental para lograr renders arquitectónicos creíbles.",
    category: "renderizado",
  },
  {
    term: "LOD (Level of Detail)",
    definition:
      "Técnica que ajusta el nivel de detalle geométrico de un objeto según su distancia a la cámara. Objetos lejanos usan geometría simplificada para mejorar el rendimiento sin pérdida visual apreciable.",
    category: "renderizado",
  },
  {
    term: "Batch Render",
    definition:
      "Función que permite renderizar múltiples vistas o escenas de forma automática y secuencial sin intervención del usuario. Ideal para generar varias imágenes de un proyecto durante la noche o en tiempos de inactividad.",
    category: "renderizado",
  },

  // Iluminación
  {
    term: "HDRI",
    definition:
      "Imagen de alto rango dinámico (High Dynamic Range Image) que se utiliza como mapa de entorno para iluminar la escena. Los HDRIs capturan la iluminación real de un entorno y proporcionan luces, reflejos y fondos realistas.",
    category: "iluminacion",
  },
  {
    term: "IES",
    definition:
      "Archivo estándar de la industria que describe la distribución de luz de una lámpara real. Los perfiles IES permiten reproducir con precisión el patrón de luz de luminarias específicas en el render.",
    category: "iluminacion",
  },
  {
    term: "Luz Volumétrica",
    definition:
      "Efecto que hace visible el haz de luz al interactuar con partículas en el aire, como polvo o niebla. Crea el efecto clásico de rayos de luz visibles, también conocido como efecto Tyndall o god rays suaves.",
    category: "iluminacion",
  },
  {
    term: "God Rays",
    definition:
      "Efecto visual de rayos de luz crepusculares que se producen cuando la luz atraviesa aberturas o bordeando objetos. Simula el fenómeno atmosférico real y añade dramatismo a las escenas con iluminación direccional.",
    category: "iluminacion",
  },
  {
    term: "AO (Ambient Occlusion)",
    definition:
      "Técnica que simula el oscurecimiento en pliegues, esquinas y áreas donde la luz ambiental tiene dificultad para llegar. Añade profundidad y realismo a la escena sin necesidad de cálculos de iluminación complejos.",
    category: "iluminacion",
  },
  {
    term: "Caústicas",
    definition:
      "Patrones de luz enfocada que se forman cuando la luz se refracta o refleja en superficies curvas, como el agua o el vidrio. Producen los destellos luminosos característicos en piscinas o bajo objetos de cristal.",
    category: "iluminacion",
  },
  {
    term: "Bloom",
    definition:
      "Efecto de posprocesamiento que crea un resplandor suave alrededor de fuentes de luz brillantes o superficies muy iluminadas. Simula el efecto de dispersión luminosa en lentes de cámara y el ojo humano.",
    category: "iluminacion",
  },
  {
    term: "Luz Puntual",
    definition:
      "Fuente de luz que emite luz en todas las direcciones desde un punto único en el espacio 3D. Es el tipo de luz más básico y se usa para simular bombillas, velas o cualquier fuente omnidireccional.",
    category: "iluminacion",
  },
  {
    term: "Spot",
    definition:
      "Fuente de luz direccional que emite un cono de luz, similar a un foco escénico. Permite controlar el ángulo de apertura y la caída de los bordes, ideal para resaltar elementos específicos de la escena.",
    category: "iluminacion",
  },
  {
    term: "Area Light",
    definition:
      "Fuente de luz con superficie definida que emite luz de forma uniforme desde un área rectangular o circular. Produce sombras suaves y graduales, siendo ideal para simular ventanas, paneles LED o luminarias lineales.",
    category: "iluminacion",
  },
  {
    term: "Geolocalización",
    definition:
      "Función que asigna una ubicación geográfica real al proyecto para calcular la posición del sol según coordenadas, fecha y hora. Permite estudios de iluminación solar precisos para proyectos arquitectónicos.",
    category: "iluminacion",
  },
  {
    term: "Shadow Map",
    definition:
      "Técnica de generación de sombras que renderiza la escena desde el punto de vista de la luz para crear un mapa de profundidad. Es eficiente y permite ajustar la calidad y suavidad de las sombras.",
    category: "iluminacion",
  },

  // Materiales
  {
    term: "PBR",
    definition:
      "Metodología de creación de materiales (Physically Based Rendering) que simula el comportamiento real de la luz sobre superficies. Utiliza parámetros físicos como rugosidad y metalicidad para lograr resultados consistentes en cualquier condición de iluminación.",
    category: "materiales",
  },
  {
    term: "Mapa Difuso (Albedo)",
    definition:
      "Textura que define el color base de un material sin influencia de iluminación, sombras ni reflejos. Representa el color puro de la superficie y es la base fundamental de cualquier material PBR.",
    category: "materiales",
  },
  {
    term: "Mapa Normal",
    definition:
      "Textura que simula relieve y detalles superficiales sin añadir geometría real. Altera la dirección de las normales de la superficie para crear la ilusión de profundidad, arrugas o texturas finas con bajo impacto en rendimiento.",
    category: "materiales",
  },
  {
    term: "Rugosidad (Roughness)",
    definition:
      "Parámetro PBR que controla la microsuperficie de un material. Valor bajo produce reflejos nítidos y especulares; valor alto difumina los reflejos creando un aspecto mate. Va de 0 (espejo) a 1 (totalmente difuso).",
    category: "materiales",
  },
  {
    term: "Metalicidad",
    definition:
      "Parámetro PBR que define si un material se comporta como metal o dieléctrico. Los metales (valor 1) tintan sus reflejos con su color base, mientras que los no metales (valor 0) reflejan sin alteración cromática.",
    category: "materiales",
  },
  {
    term: "IOR (Índice de Refracción)",
    definition:
      "Valor numérico que indica cuánto se desvía la luz al atravesar un material transparente. El vidrio tiene un IOR de aproximadamente 1.5, el agua 1.33 y el diamante 2.42. Es clave para materiales como cristal y agua.",
    category: "materiales",
  },
  {
    term: "Transmisión",
    definition:
      "Propiedad que permite que la luz atraviese un material, creando efectos de transparencia y refracción. Esencial para simular vidrio, agua, plásticos translúcidos y cualquier material que deje pasar la luz.",
    category: "materiales",
  },
  {
    term: "Opacidad",
    definition:
      "Grado de opacidad o transparencia de un material. Un valor de 1 significa completamente opaco y 0 completamente transparente. A diferencia de la transmisión, la opacidad no refracta la luz.",
    category: "materiales",
  },
  {
    term: "Desplazamiento (Displacement)",
    definition:
      "Técnica que modifica geométricamente la superficie de un objeto usando un mapa de desplazamiento, creando relieve real que afecta siluetas y oclusión. A diferencia del mapa normal, añade geometría real a la malla.",
    category: "materiales",
  },
  {
    term: "Subsurface Scattering",
    definition:
      "Efecto de dispersión subsuperficial que ocurre cuando la luz penetra parcialmente un material translúcido antes de salir en otro punto. Es fundamental para simular piel, cera, mármol, leche y otros materiales orgánicos.",
    category: "materiales",
  },

  // Cámara
  {
    term: "DOF (Depth of Field)",
    definition:
      "Efecto de profundidad de campo que desenfoca las zonas de la imagen que están fuera del rango de enfoque de la cámara. Simula el comportamiento de las lentes reales y dirige la atención del espectador al punto focal.",
    category: "camara",
  },
  {
    term: "F-stop",
    definition:
      "Valor que indica la apertura del diafragma de la cámara. Un f-stop bajo (f/1.4) produce poca profundidad de campo con mucho desenfoque, mientras que un valor alto (f/16) mantiene todo enfocado.",
    category: "camara",
  },
  {
    term: "Distancia Focal",
    definition:
      "Distancia entre el centro óptico de la lente y el sensor, medida en milímetros. Determina el ángulo de visión y la perspectiva: distancias cortas (gran angular) capturan más escena, distancias largas (teleobjetivo) acercan el sujeto.",
    category: "camara",
  },
  {
    term: "Balance de Blancos",
    definition:
      "Ajuste que compensa la temperatura de color de la iluminación para que los colores blancos se vean neutros en la imagen. Permite corregir dominantes de color producidas por distintas fuentes de luz.",
    category: "camara",
  },
  {
    term: "Exposición",
    definition:
      "Control de la cantidad total de luz que llega al sensor de la cámara virtual. Ajustar la exposición permite compensar escenas demasiado brillantes u oscuras, similar a la compensación EV en fotografía real.",
    category: "camara",
  },
  {
    term: "FOV (Field of View)",
    definition:
      "Ángulo de visión que abarca la cámara, medido en grados. Un FOV amplio (90°+) crea perspectivas dramáticas tipo gran angular, mientras que un FOV estrecho (30°) comprime la perspectiva como un teleobjetivo.",
    category: "camara",
  },
  {
    term: "Ortográfica",
    definition:
      "Proyección de cámara que elimina la perspectiva, donde las líneas paralelas permanecen paralelas sin punto de fuga. Es ideal para representaciones técnicas, plantas, alzados y vistas arquitectónicas sin distorsión.",
    category: "camara",
  },
  {
    term: "Bokeh",
    definition:
      "Calidad estética del desenfoque producido en las zonas fuera de foco de una imagen. Un bokeh agradable presenta formas circulares suaves y luminosas; depende de la forma del diafragma y la apertura de la lente.",
    category: "camara",
  },

  // Animación
  {
    term: "Keyframe",
    definition:
      "Fotograma clave que define un estado específico de una propiedad animada (posición, rotación, escala, etc.) en un momento determinado. El software interpola automáticamente los valores entre keyframes consecutivos.",
    category: "animacion",
  },
  {
    term: "Timeline",
    definition:
      "Línea de tiempo que muestra la secuencia de keyframes y la duración de la animación. Permite organizar, editar y sincronizar los movimientos de cámara, objetos y luces a lo largo del tiempo.",
    category: "animacion",
  },
  {
    term: "Interpolación",
    definition:
      "Cálculo automático de los valores intermedios entre dos keyframes. La interpolación determina cómo se transiciona una propiedad de un estado a otro, pudiendo ser lineal, suavizada o con curvas personalizadas.",
    category: "animacion",
  },
  {
    term: "Easing",
    definition:
      "Curva de aceleración y desaceleración aplicada a la interpolación entre keyframes. Un easing suave produce movimientos naturales (lento-rápido-lento), mientras que uno lineal genera movimiento constante y mecánico.",
    category: "animacion",
  },
  {
    term: "FPS (video)",
    definition:
      "Cantidad de fotogramas por segundo en una animación o video renderizado. 24 FPS es el estándar cinematográfico, 30 FPS para televisión y 60 FPS para contenido interactivo o de alta fluidez.",
    category: "animacion",
  },
  {
    term: "Motion Blur",
    definition:
      "Efecto de desenfoque de movimiento que simula la persistencia visual de objetos en movimiento rápido durante la exposición de un fotograma. Aporta realismo y cinematismo a las animaciones.",
    category: "animacion",
  },

  // Exportación
  {
    term: "EXR",
    definition:
      "Formato de imagen de alto rango dinámico (OpenEXR) que almacena datos de color con precisión de punto flotante. Permite recuperar luces y sombras en posproducción sin pérdida de calidad, ideal para composición.",
    category: "exportacion",
  },
  {
    term: "HDR",
    definition:
      "Formato de imagen de alto rango dinámico que captura un espectro luminoso más amplio que los formatos estándar. Se usa tanto para mapas de entorno como para renders finales con ajuste posterior de exposición.",
    category: "exportacion",
  },
  {
    term: "PNG",
    definition:
      "Formato de imagen sin pérdida que soporta transparencia mediante canal alfa. Es el formato más común para renders arquitectónicos que requieran composición posterior o fondos transparentes.",
    category: "exportacion",
  },
  {
    term: "JPEG",
    definition:
      "Formato de imagen con compresión con pérdida que produce archivos ligeros. Adecuado para previsualizaciones y entregas donde el tamaño de archivo es prioritario sobre la máxima calidad.",
    category: "exportacion",
  },
  {
    term: "FBX",
    definition:
      "Formato de intercambio 3D de Autodesk que preserva geometría, materiales, animaciones y jerarquías de objetos. Es el formato más compatible para transferir modelos entre programas de 3D como SketchUp, Revit y D5 Render.",
    category: "exportacion",
  },
  {
    term: "OBJ",
    definition:
      "Formato de geometría 3D simple y universal que almacena vértices, caras y coordenadas de textura. Su simplicidad lo hace compatible con casi cualquier software 3D, pero no soporta animaciones ni materiales complejos.",
    category: "exportacion",
  },
  {
    term: "SKP",
    definition:
      "Formato nativo de SketchUp que D5 Render puede importar directamente mediante su plugin de sincronización. Permite mantener la conexión viva entre el modelo de SketchUp y la escena en D5 Render.",
    category: "exportacion",
  },
  {
    term: "Codec",
    definition:
      "Algoritmo de compresión y descompresión de video que determina la calidad y el tamaño del archivo de salida. D5 Render soporta codecs como H.264, H.265 y otros para exportar animaciones en formato MP4 o AVI.",
    category: "exportacion",
  },
];

// ============================================================
// TROUBLESHOOTING ITEMS
// ============================================================

export const troubleshootingItems: TroubleshootingItem[] = [
  // Instalación y Arranque
  {
    id: "1",
    title: "D5 Render no abre",
    description: "La aplicación no se inicia o se cierra inmediatamente después de hacer clic en el icono.",
    causes: [
      "Drivers de GPU desactualizados",
      "GPU no compatible con D5 Render",
      "Antivirus bloqueando la ejecución del programa",
    ],
    solutions: [
      "Actualizar los drivers de NVIDIA a la versión Studio (recomendado) o Game Ready más reciente",
      "Verificar que tu GPU sea compatible: D5 Render requiere una GPU NVIDIA RTX (serie 2000 o superior)",
      "Añadir D5 Render como excepción en tu antivirus y en Windows Defender",
      "Ejecutar D5 Render como administrador para verificar permisos",
    ],
    category: "instalacion",
    severity: "critico",
  },
  {
    id: "2",
    title: "Error de DirectX 12",
    description: "Aparece un mensaje de error indicando que DirectX 12 no está disponible o no es compatible.",
    causes: [
      "Windows no tiene DirectX 12 instalado",
      "Sistema operativo demasiado antiguo",
    ],
    solutions: [
      "Actualizar Windows 10 a la última versión (mínimo 1903) o usar Windows 11",
      "Instalar DirectX End-User Runtime desde el sitio oficial de Microsoft",
      "Verificar que tu GPU soporte DirectX 12 con la herramienta dxdiag (Win+R → dxdiag)",
      "Actualizar los drivers de la GPU a la última versión disponible",
    ],
    category: "instalacion",
    severity: "critico",
  },
  {
    id: "3",
    title: "Pantalla negra al iniciar",
    description: "D5 Render se abre pero muestra una pantalla negra sin contenido en el viewport.",
    causes: [
      "GPU incorrecta seleccionada en la configuración",
      "Drivers de GPU desactualizados o corruptos",
    ],
    solutions: [
      "Abrir Preferencias de D5 Render y seleccionar la GPU RTX correcta como dispositivo de renderizado",
      "En laptops con GPU híbrida, forzar el uso de la GPU dedicada en la configuración de NVIDIA",
      "Actualizar los drivers de la GPU a la versión más reciente",
      "Si persiste, realizar una instalación limpia de los drivers usando DDU (Display Driver Uninstaller)",
    ],
    category: "instalacion",
    severity: "critico",
  },
  {
    id: "4",
    title: "D5 Render se cierra al cargar escena",
    description: "La aplicación se cierra inesperadamente cuando intentas abrir o cargar una escena pesada.",
    causes: [
      "VRAM insuficiente para la escena",
      "Conflictos con otros programas que usan la GPU",
    ],
    solutions: [
      "Cerrar otros programas que consuman VRAM (navegadores con muchas pestañas, otros programas 3D)",
      "Reducir la calidad del viewport en Preferencias → Rendimiento",
      "Actualizar los drivers de la GPU a la última versión",
      "Aumentar el archivo de paginación del sistema en Configuración avanzada de Windows",
      "Reducir la complejidad de la escena eliminando objetos innecesarios",
    ],
    category: "instalacion",
    severity: "moderado",
  },
  {
    id: "5",
    title: "No encuentra la GPU RTX",
    description: "D5 Render no detecta la tarjeta gráfica RTX instalada en el sistema.",
    causes: [
      "Drivers de GPU antiguos o corruptos",
      "La GPU instalada no es de la serie RTX",
    ],
    solutions: [
      "Verificar el modelo de tu GPU usando GPU-Z o el Administrador de dispositivos",
      "Instalar los drivers NVIDIA Studio más recientes desde el sitio oficial",
      "Confirmar que tu GPU es de la serie RTX (2060 o superior recomendado)",
      "Reinstalar los drivers usando una instalación limpia con DDU",
    ],
    category: "instalacion",
    severity: "critico",
  },

  // Importación de Modelos
  {
    id: "6",
    title: "El modelo se importa sin materiales",
    description: "Después de importar un modelo 3D, todos los objetos aparecen con un material gris predeterminado sin texturas.",
    causes: [
      "Formato OBJ no soporta materiales integrados",
      "Archivos de textura no encontrados en la ruta original",
    ],
    solutions: [
      "Usar formato FBX en lugar de OBJ, ya que FBX soporta materiales y texturas embebidas",
      "Utilizar el plugin de sincronización directa de D5 Render para SketchUp, Revit o Rhino",
      "Verificar que los archivos de textura estén en la misma carpeta que el archivo 3D",
      "Reasignar manualmente los materiales en D5 Render usando la biblioteca de materiales",
    ],
    category: "importacion",
    severity: "moderado",
  },
  {
    id: "7",
    title: "Geometría faltante después de importar",
    description: "Partes del modelo 3D no aparecen en D5 Render tras la importación.",
    causes: [
      "Objetos ocultos en las capas del software original",
      "Geometría no válida o corrupta en el modelo original",
    ],
    solutions: [
      "En el software de modelado, verificar que todas las capas estén visibles antes de exportar",
      "Asegurar que no haya objetos en capas ocultas o congeladas",
      "Comprobar que la geometría sea válida (sin caras sueltas, normales invertidas o geometría no manifolds)",
      "Probar exportar solo los objetos faltantes para aislar el problema",
    ],
    category: "importacion",
    severity: "moderado",
  },
  {
    id: "8",
    title: "El modelo aparece muy grande o muy pequeño",
    description: "El modelo importado tiene una escala incorrecta, apareciendo enorme o diminuto en la escena.",
    causes: [
      "Unidades incorrectas configuradas al exportar desde el modelador",
      "El software de origen usa un sistema de unidades diferente",
    ],
    solutions: [
      "Verificar las unidades en el software de modelado (recomendado: metros para arquitectura)",
      "Al exportar FBX, asegurarse de que las unidades estén configuradas correctamente",
      "Usar la herramienta de escala al importar en D5 Render para ajustar el tamaño",
      "En SketchUp, verificar que el modelo esté modelado en metros antes de sincronizar",
    ],
    category: "importacion",
    severity: "leve",
  },
  {
    id: "9",
    title: "Error al importar archivo FBX",
    description: "D5 Render muestra un error o no puede importar un archivo FBX.",
    causes: [
      "Versión de FBX incompatible (demasiado antigua o demasiado nueva)",
      "El archivo contiene animaciones o características no soportadas",
    ],
    solutions: [
      "Exportar en formato FBX versión 2014 o superior desde el software de origen",
      "Verificar que el FBX no contenga animaciones o datos de skeleton no soportados",
      "Probar exportar con opciones simplificadas: sin animación, sin cámaras, sin luces embebidas",
      "Si el error persiste, probar exportar como OBJ y reasignar materiales manualmente",
    ],
    category: "importacion",
    severity: "moderado",
  },
  {
    id: "10",
    title: "El plugin de SketchUp no aparece",
    description: "Después de instalar el plugin de D5 Render para SketchUp, no aparece en la barra de herramientas.",
    causes: [
      "Instalación incorrecta del plugin",
      "Versión de SketchUp incompatible con el plugin",
    ],
    solutions: [
      "Reinstalar el plugin de D5 Render para SketchUp descargándolo desde el sitio oficial",
      "Verificar que tu versión de SketchUp sea compatible con la versión del plugin",
      "En SketchUp, ir a Ventana → Extensiones y verificar que D5 Render esté habilitado",
      "Ejecutar SketchUp como administrador e intentar la instalación nuevamente",
    ],
    category: "importacion",
    severity: "moderado",
  },

  // Iluminación y Renderizado
  {
    id: "11",
    title: "La escena se ve oscura",
    description: "El viewport o el render final se muestran demasiado oscuros, sin iluminación visible.",
    causes: [
      "Exposición configurada muy baja",
      "No hay fuentes de luz en la escena",
      "HDRI de entorno muy oscuro o desactivado",
    ],
    solutions: [
      "Ajustar el valor de exposición en la configuración de cámara (aumentar para más luz)",
      "Verificar que el sol o la luz HDRI estén activados en la configuración de entorno",
      "Agregar luces artificiales (puntuales, spot, area) para complementar la iluminación",
      "Cambiar el HDRI por uno más brillante o con más luz solar",
      "Verificar que los materiales no tengan un color difuso excesivamente oscuro",
    ],
    category: "iluminacion",
    severity: "leve",
  },
  {
    id: "12",
    title: "Reflexiones incorrectas o ausentes",
    description: "Las superficies reflectantes no muestran reflejos o estos se ven incorrectos.",
    causes: [
      "Material configurado sin reflectividad adecuada",
      "Rugosidad demasiado alta para una superficie reflectante",
    ],
    solutions: [
      "Seleccionar el material y ajustar el parámetro de rugosidad (roughness) a un valor bajo (0.0–0.2)",
      "Verificar que el mapa de reflexión esté correctamente asignado si se usa un material personalizado",
      "Para espejos, establecer rugosidad en 0 y metalicidad en 1",
      "Comprobar que el HDRI de entorno esté activado, ya que proporciona información de reflejos",
    ],
    category: "iluminacion",
    severity: "moderado",
  },
  {
    id: "13",
    title: "Ruido excesivo en el render",
    description: "La imagen renderizada presenta granulado o ruido visual que reduce la calidad.",
    causes: [
      "Pocos pases de render completados",
      "Escena con iluminación compleja que requiere más muestras",
    ],
    solutions: [
      "Aumentar el número de pases de render (recomendado: mínimo 500 para calidad estándar)",
      "Activar el Denoiser AI en la configuración de render para eliminar ruido automáticamente",
      "Usar más muestras de GI (iluminación global) en configuraciones avanzadas",
      "Para renders finales, usar al menos 1000–2000 pases o activar Denoiser con 300+ pases",
    ],
    category: "iluminacion",
    severity: "leve",
  },
  {
    id: "14",
    title: "Render muy lento",
    description: "El proceso de renderizado tarda mucho más de lo esperado para completar una imagen.",
    causes: [
      "Escena con geometría excesivamente pesada",
      "Demasiados reflejos y refracciones simultáneos",
      "VRAM saturada obligando a usar memoria del sistema",
    ],
    solutions: [
      "Optimizar la geometría: eliminar caras innecesarias, usar LOD para objetos lejanos",
      "Reducir la cantidad de materiales reflectantes y refractantes en la escena",
      "Cerrar otros programas para liberar VRAM de la GPU",
      "Usar la función de instanciación en lugar de duplicar objetos idénticos",
      "Reducir la resolución de texturas a 2K para objetos secundarios",
    ],
    category: "iluminacion",
    severity: "moderado",
  },
  {
    id: "15",
    title: "Sombras pixeladas",
    description: "Las sombras proyectadas en la escena se ven con bordes dentados o pixelados.",
    causes: [
      "Resolución de shadow map demasiado baja",
      "El tamaño del sol está configurado de forma que genera sombras muy duras",
    ],
    solutions: [
      "Aumentar la resolución de sombras en Preferencias → Calidad → Resolución de sombras",
      "Ajustar el tamaño del sol (Sun Size) para suavizar los bordes de las sombras",
      "Para sombras más suaves, aumentar el valor de Soft Shadow en la configuración de iluminación",
      "Verificar que la distancia de la cámara a los objetos no sea excesivamente grande",
    ],
    category: "iluminacion",
    severity: "leve",
  },

  // Materiales
  {
    id: "16",
    title: "El vidrio se ve opaco",
    description: "Los objetos que deberían ser transparentes como el cristal se ven sólidos u opacos.",
    causes: [
      "Material configurado como opaco en lugar de vidrio",
      "Parámetros de transmisión incorrectos",
    ],
    solutions: [
      "Cambiar el tipo de material a 'Vidrio' (Glass) en la plantilla de materiales",
      "Ajustar el parámetro de transmisión (transmission) a un valor alto (0.9–1.0)",
      "Configurar el IOR (Índice de Refracción) a 1.5 para vidrio estándar",
      "Reducir la rugosidad (roughness) a un valor cercano a 0 para un vidrio limpio",
      "Verificar que la opacidad no esté en un valor bajo; en vidrio se controla con transmisión",
    ],
    category: "materiales",
    severity: "moderado",
  },
  {
    id: "17",
    title: "Las texturas se ven borrosas",
    description: "Las texturas aplicadas a los materiales se muestran desenfocadas o sin detalle.",
    causes: [
      "Resolución de textura demasiado baja",
      "Mapeo UV incorrecto que estira o comprime la textura",
    ],
    solutions: [
      "Usar texturas de mayor resolución (4K o superior para superficies principales)",
      "Verificar y corregir el mapeo UV en el software de modelado original",
      "Ajustar la escala y repetición de la textura en las propiedades del material de D5 Render",
      "Comprobar que el filtro de textura no esté configurado con un blur excesivo",
    ],
    category: "materiales",
    severity: "leve",
  },
  {
    id: "18",
    title: "Material aparece en gris",
    description: "Después de importar o crear un material, este se muestra con un color gris uniforme sin textura.",
    causes: [
      "Mapa difuso (albedo) no cargado o no asignado",
      "Ruta del archivo de textura rota o no encontrada",
    ],
    solutions: [
      "Reasignar la textura difusa en la ranura correspondiente del material",
      "Verificar que la ruta del archivo de textura sea correcta y accesible",
      "Si la textura se ha movido, buscarla nuevamente usando el navegador de archivos de D5 Render",
      "Asegurar que el formato de textura sea compatible (JPG, PNG, TIFF, EXR)",
    ],
    category: "materiales",
    severity: "leve",
  },

  // Exportación
  {
    id: "19",
    title: "El video exportado se ve cortado",
    description: "El video resultante de la exportación no muestra la escena completa o está recortado.",
    causes: [
      "Resolución de exportación incorrecta",
      "Codec incompatible que produce artefactos",
      "Duración del timeline mal configurada",
    ],
    solutions: [
      "Verificar que la resolución de exportación coincida con el aspecto deseado (1920×1080, 3840×2160, etc.)",
      "Usar el codec H.264 para máxima compatibilidad con reproductores de video",
      "Ajustar la duración del timeline para que cubra toda la animación deseada",
      "Comprobar que los keyframes de cámara estén dentro del rango de tiempo exportado",
    ],
    category: "exportacion",
    severity: "moderado",
  },
  {
    id: "20",
    title: "El render panorámico tiene artefactos",
    description: "La imagen panorámica exportada muestra líneas visibles, costuras o zonas borrosas en las uniones.",
    causes: [
      "Pocos pases de render en la exportación panorámica",
      "Resolución insuficiente para el formato panorámico",
    ],
    solutions: [
      "Aumentar la calidad de render y el número de pases para la exportación panorámica",
      "Activar el Denoiser AI para suavizar transiciones y eliminar ruido",
      "Usar una resolución de al menos 8192×4096 para panorámicas de calidad",
      "Verificar que no haya objetos muy cerca de la cámara que puedan causar problemas de proyección",
    ],
    category: "exportacion",
    severity: "moderado",
  },
];

// ============================================================
// CATEGORY HELPERS (shared across pages)
// ============================================================

export const glossaryCategoryColors: Record<GlossaryCategoryKey, string> = {
  renderizado: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  iluminacion: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  materiales: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  camara: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  animacion: "bg-rose-500/15 text-rose-400 border-rose-500/20",
  exportacion: "bg-orange-500/15 text-orange-400 border-orange-500/20",
};

export const glossaryCategoryLabels: Record<GlossaryCategoryKey, string> = {
  renderizado: "Renderizado General",
  iluminacion: "Iluminación",
  materiales: "Materiales",
  camara: "Cámara",
  animacion: "Animación",
  exportacion: "Exportación",
};

export const troubleshootingCategoryColors: Record<TroubleshootingCategoryKey, string> = {
  instalacion: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  importacion: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  iluminacion: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  materiales: "bg-rose-500/15 text-rose-400 border-rose-500/20",
  exportacion: "bg-orange-500/15 text-orange-400 border-orange-500/20",
};

export const troubleshootingCategoryLabels: Record<TroubleshootingCategoryKey, string> = {
  instalacion: "Instalación y Arranque",
  importacion: "Importación de Modelos",
  iluminacion: "Iluminación y Renderizado",
  materiales: "Materiales",
  exportacion: "Exportación",
};

export const severityColors: Record<Severity, string> = {
  critico: "bg-red-500/15 text-red-400 border-red-500/25",
  moderado: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  leve: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
};

export const severityLabels: Record<Severity, string> = {
  critico: "Crítico",
  moderado: "Moderado",
  leve: "Leve",
};
