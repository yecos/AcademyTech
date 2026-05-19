// Multi-category tools data for Academy Tech
// Provides shortcuts, comparisons, troubleshooting, and glossary for all 4 categories
// Categories: arquitectura, programacion, ciberseguridad, ia

// ============================================================
// TYPES
// ============================================================

export interface Shortcut {
  keys: string[];
  description: string;
}

export interface ShortcutCategory {
  title: string;
  icon: string;
  shortcuts: Shortcut[];
}

export interface ComparisonEngine {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  tipo: string;
  tecnologia: string;
  pros: string[];
  contras: string[];
  mejorCaso: string;
  scores: Record<string, number>;
  details: Record<string, string | boolean>;
}

export interface ComparisonCriterion {
  key: string;
  label: string;
  type?: "boolean";
}

export interface ComparisonData {
  title: string;
  subtitle: string;
  engines: ComparisonEngine[];
  criteria: ComparisonCriterion[];
  scoreLabels: { key: string; label: string }[];
}

export type Severity = "critico" | "moderado" | "leve";

export interface TroubleshootingItem {
  id: string;
  title: string;
  description: string;
  causes: string[];
  solutions: string[];
  category: string;
  severity: Severity;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export interface CategoryToolConfig {
  title: string;
  subtitle: string;
  tipText: string;
  iconEmoji: string;
}

export interface CategoryToolsData {
  shortcuts: {
    config: CategoryToolConfig;
    categories: ShortcutCategory[];
  };
  comparisons: ComparisonData & { config: CategoryToolConfig };
  troubleshooting: {
    config: CategoryToolConfig;
    items: TroubleshootingItem[];
    categoryColors: Record<string, string>;
    categoryLabels: Record<string, string>;
  };
  glossary: {
    config: CategoryToolConfig;
    terms: GlossaryTerm[];
    categoryColors: Record<string, string>;
    categoryLabels: Record<string, string>;
  };
}

// ============================================================
// SEVERITY HELPERS (shared)
// ============================================================

export const severityColors: Record<string, string> = {
  critico: "bg-red-500/15 text-red-400 border-red-500/25",
  moderado: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  leve: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
};

export const severityLabels: Record<string, string> = {
  critico: "Crítico",
  moderado: "Moderado",
  leve: "Leve",
};

// ============================================================
// ARQUITECTURA (D5 Render / BIM)
// ============================================================

const arquitecturaShortcuts: ShortcutCategory[] = [
  {
    title: "Navegación",
    icon: "🧭",
    shortcuts: [
      { keys: ["W", "A", "S", "D"], description: "Navegación en primera persona" },
      { keys: ["Q", "E"], description: "Subir/Bajar en modo primera persona" },
      { keys: ["Rueda del ratón"], description: "Zoom" },
      { keys: ["Botón central"], description: "Orbitar" },
      { keys: ["Shift", "Botón central"], description: "Pan" },
      { keys: ["F"], description: "Enfocar objeto seleccionado" },
      { keys: ["Home"], description: "Vista inicial de la escena" },
    ],
  },
  {
    title: "Transformación",
    icon: "🔄",
    shortcuts: [
      { keys: ["W"], description: "Herramienta mover" },
      { keys: ["E"], description: "Herramienta rotar" },
      { keys: ["R"], description: "Herramienta escalar" },
      { keys: ["Ctrl", "Z"], description: "Deshacer" },
      { keys: ["Ctrl", "Y"], description: "Rehacer" },
      { keys: ["Ctrl", "D"], description: "Duplicar objeto" },
      { keys: ["Delete"], description: "Eliminar objeto" },
      { keys: ["Ctrl", "A"], description: "Seleccionar todo" },
      { keys: ["Ctrl", "Shift", "A"], description: "Deseleccionar todo" },
    ],
  },
  {
    title: "Archivo",
    icon: "📁",
    shortcuts: [
      { keys: ["Ctrl", "S"], description: "Guardar escena" },
      { keys: ["Ctrl", "O"], description: "Abrir escena" },
      { keys: ["Ctrl", "N"], description: "Nueva escena" },
      { keys: ["Ctrl", "Shift", "S"], description: "Guardar como" },
    ],
  },
  {
    title: "Vista",
    icon: "👁️",
    shortcuts: [
      { keys: ["1"], description: "Vista perspectiva" },
      { keys: ["2"], description: "Vista superior" },
      { keys: ["3"], description: "Vista frontal" },
      { keys: ["4"], description: "Vista lateral" },
      { keys: ["G"], description: "Mostrar/ocultar grid" },
      { keys: ["Ctrl", "H"], description: "Ocultar objeto seleccionado" },
    ],
  },
  {
    title: "Render",
    icon: "🎬",
    shortcuts: [
      { keys: ["Ctrl", "R"], description: "Iniciar render" },
      { keys: ["PrintScreen"], description: "Captura de pantalla" },
    ],
  },
];

const arquitecturaComparison: ComparisonData = {
  title: "Comparación de Motores de Render",
  subtitle: "D5 Render vs Lumion vs Enscape vs V-Ray vs Twinmotion",
  engines: [
    {
      name: "D5 Render", color: "emerald", bgColor: "bg-emerald-500/15", borderColor: "border-emerald-500/30", textColor: "text-emerald-600 dark:text-emerald-400",
      tipo: "Standalone", tecnologia: "Ray Tracing (GPU RTX)",
      pros: ["Ray tracing en tiempo real con calidad visual excepcional", "Biblioteca de materiales y vegetación muy completa", "Curva de aprendizaje baja, interfaz intuitiva", "Versión gratuita funcional para uso personal"],
      contras: ["Requiere GPU NVIDIA RTX para rendimiento óptimo", "Biblioteca de assets menor que Lumion", "Algunas funciones avanzadas solo en versión Pro"],
      mejorCaso: "Visualización arquitectónica en tiempo real con énfasis en realismo y flujo de trabajo ágil",
      scores: { calidad: 90, velocidad: 92, facilidad: 88, vegetacion: 85, animacion: 80, precio: 85 },
      details: { vistaPreviaReal: true, calidadMaxima: "Alta", velocidadRender: "Rápida", curvaAprendizaje: "Baja", precio: "Gratis con límites / $348/año Pro", plugins: "SketchUp, Rhino, Revit, Archicad, 3ds Max, Blender", animacion: "Sí", postProduccion: "Sí", sistemaVegetacion: "Avanzado" },
    },
    {
      name: "Lumion", color: "blue", bgColor: "bg-blue-500/15", borderColor: "border-blue-500/30", textColor: "text-blue-600 dark:text-blue-400",
      tipo: "Standalone", tecnologia: "Rasterización + Ray Tracing parcial",
      pros: ["Enorme biblioteca de assets, vegetación y efectos", "Interfaz extremadamente amigable para principiantes", "Excelente para renders rápidos de concepto", "Efectos atmosféricos y climáticos muy completos"],
      contras: ["Precio elevado, sin versión gratuita", "Calidad de ray tracing inferior a D5 Render", "Requiere hardware potente para escenas grandes"],
      mejorCaso: "Presentaciones rápidas de concepto arquitectónico con gran variedad de contenido predefinido",
      scores: { calidad: 78, velocidad: 85, facilidad: 92, vegetacion: 92, animacion: 82, precio: 55 },
      details: { vistaPreviaReal: true, calidadMaxima: "Media-Alta", velocidadRender: "Rápida", curvaAprendizaje: "Baja", precio: "$1,599/año o $3,599 perpetuo", plugins: "SketchUp, Rhino, Revit, Archicad, 3ds Max", animacion: "Sí", postProduccion: "Sí", sistemaVegetacion: "Avanzado" },
    },
    {
      name: "Enscape", color: "purple", bgColor: "bg-purple-500/15", borderColor: "border-purple-500/30", textColor: "text-purple-600 dark:text-purple-400",
      tipo: "Plugin", tecnologia: "Rasterización + Ray Tracing parcial",
      pros: ["Integración directa dentro del software de modelado", "Curva de aprendizaje muy baja, sin cambio de contexto", "Sincronización en tiempo real con el modelo 3D", "Ideal para presentaciones de diseño iterativo"],
      contras: ["Calidad visual limitada comparado con standalone", "Sistema de vegetación y biblioteca de assets limitados", "Funciones de animación y post-producción básicas"],
      mejorCaso: "Iteración de diseño en tiempo real directamente desde el software BIM sin cambiar de aplicación",
      scores: { calidad: 65, velocidad: 90, facilidad: 95, vegetacion: 55, animacion: 50, precio: 65 },
      details: { vistaPreviaReal: true, calidadMaxima: "Media", velocidadRender: "Rápida", curvaAprendizaje: "Baja", precio: "$599/año", plugins: "SketchUp, Rhino, Revit, Archicad, Vectorworks", animacion: "Básica", postProduccion: "Básica", sistemaVegetacion: "Básico" },
    },
    {
      name: "V-Ray", color: "orange", bgColor: "bg-orange-500/15", borderColor: "border-orange-500/30", textColor: "text-orange-600 dark:text-orange-400",
      tipo: "Plugin", tecnologia: "Ray Tracing CPU/GPU",
      pros: ["Calidad fotorrealista excepcional, estándar de la industria", "Control total sobre cada parámetro de iluminación y materiales", "Amplio ecosistema de plugins y soporte profesional", "Compositor de canales y post-producción avanzados integrados"],
      contras: ["Tiempos de render largos, no es tiempo real", "Curva de aprendizaje muy alta", "No permite visualización interactiva fluida"],
      mejorCaso: "Renders fotorrealistas de máxima calidad para presentaciones finales de alto nivel",
      scores: { calidad: 98, velocidad: 35, facilidad: 40, vegetacion: 30, animacion: 75, precio: 55 },
      details: { vistaPreviaReal: false, calidadMaxima: "Alta", velocidadRender: "Lenta", curvaAprendizaje: "Alta", precio: "$740/año o $1,540 perpetuo", plugins: "SketchUp, Rhino, Revit, 3ds Max, Maya, Blender", animacion: "Sí", postProduccion: "Sí", sistemaVegetacion: "No" },
    },
    {
      name: "Twinmotion", color: "cyan", bgColor: "bg-cyan-500/15", borderColor: "border-cyan-500/30", textColor: "text-cyan-600 dark:text-cyan-400",
      tipo: "Standalone", tecnologia: "Rasterización + Unreal Engine",
      pros: ["Basado en Unreal Engine, tecnología probada", "Gratis para uso no comercial y educación", "Excelente sistema de vegetación y efectos climáticos", "Integración con Datasmith para flujos BIM"],
      contras: ["Calidad de materiales PBR inferior a D5 Render", "Interfaz menos intuitiva que D5 o Lumion", "Actualizaciones lentas y ecosistema de plugins reducido"],
      mejorCaso: "Proyectos educativos y no comerciales que necesitan visualización en tiempo real con buen sistema de vegetación",
      scores: { calidad: 72, velocidad: 80, facilidad: 75, vegetacion: 88, animacion: 78, precio: 80 },
      details: { vistaPreviaReal: true, calidadMaxima: "Media-Alta", velocidadRender: "Rápida", curvaAprendizaje: "Baja", precio: "Gratis para uso no comercial / $575/año", plugins: "SketchUp, Rhino, Revit, Archicad", animacion: "Sí", postProduccion: "Básica", sistemaVegetacion: "Avanzado" },
    },
  ],
  criteria: [
    { key: "tipo", label: "Tipo" },
    { key: "tecnologia", label: "Tecnología" },
    { key: "vistaPreviaReal", label: "Vista previa en tiempo real", type: "boolean" },
    { key: "calidadMaxima", label: "Calidad máxima" },
    { key: "velocidadRender", label: "Velocidad de render" },
    { key: "curvaAprendizaje", label: "Curva de aprendizaje" },
    { key: "precio", label: "Precio" },
    { key: "plugins", label: "Plugins de modelado" },
    { key: "animacion", label: "Animación" },
    { key: "postProduccion", label: "Post-producción" },
    { key: "sistemaVegetacion", label: "Sistema de vegetación" },
  ],
  scoreLabels: [
    { key: "calidad", label: "Calidad Visual" },
    { key: "velocidad", label: "Velocidad" },
    { key: "facilidad", label: "Facilidad de Uso" },
    { key: "vegetacion", label: "Vegetación" },
    { key: "animacion", label: "Animación" },
    { key: "precio", label: "Relación Calidad/Precio" },
  ],
};

// Arquitectura troubleshooting (keep existing from search-data.ts)
const arquitecturaTroubleshooting: TroubleshootingItem[] = [
  { id: "a1", title: "D5 Render no abre", description: "La aplicación no se inicia o se cierra inmediatamente después de hacer clic.", causes: ["Drivers de GPU desactualizados", "GPU no compatible con D5 Render", "Antivirus bloqueando la ejecución"], solutions: ["Actualizar drivers NVIDIA a versión Studio", "Verificar que la GPU sea NVIDIA RTX serie 2000+", "Añadir D5 Render como excepción en el antivirus", "Ejecutar como administrador"], category: "instalacion", severity: "critico" },
  { id: "a2", title: "Error de DirectX 12", description: "Aparece un error indicando que DirectX 12 no está disponible.", causes: ["Windows sin DirectX 12", "Sistema operativo demasiado antiguo"], solutions: ["Actualizar Windows 10 (mínimo 1903) o usar Windows 11", "Instalar DirectX End-User Runtime", "Verificar compatibilidad con dxdiag", "Actualizar drivers de GPU"], category: "instalacion", severity: "critico" },
  { id: "a3", title: "Pantalla negra al iniciar", description: "D5 Render se abre pero muestra pantalla negra sin contenido.", causes: ["GPU incorrecta seleccionada", "Drivers corruptos"], solutions: ["Seleccionar GPU RTX correcta en Preferencias", "Forzar GPU dedicada en configuración NVIDIA", "Actualizar drivers de GPU", "Reinstalación limpia con DDU"], category: "instalacion", severity: "critico" },
  { id: "a4", title: "D5 Render se cierra al cargar escena", description: "La aplicación se cierra al abrir una escena pesada.", causes: ["VRAM insuficiente", "Conflictos con otros programas que usan la GPU"], solutions: ["Cerrar programas que consuman VRAM", "Reducir calidad del viewport en Preferencias", "Actualizar drivers de GPU", "Aumentar archivo de paginación del sistema", "Reducir complejidad de la escena"], category: "instalacion", severity: "moderado" },
  { id: "a5", title: "No encuentra la GPU RTX", description: "D5 Render no detecta la tarjeta gráfica RTX instalada.", causes: ["Drivers antiguos o corruptos", "La GPU no es de la serie RTX"], solutions: ["Verificar modelo de GPU con GPU-Z", "Instalar drivers NVIDIA Studio más recientes", "Confirmar que la GPU es serie RTX 2060+", "Reinstalar drivers con DDU"], category: "instalacion", severity: "critico" },
  { id: "a6", title: "El modelo se importa sin materiales", description: "Todos los objetos aparecen con material gris predeterminado.", causes: ["Formato OBJ no soporta materiales", "Archivos de textura no encontrados"], solutions: ["Usar formato FBX en lugar de OBJ", "Usar el plugin de sincronización directa", "Verificar que las texturas estén en la misma carpeta", "Reasignar materiales manualmente"], category: "importacion", severity: "moderado" },
  { id: "a7", title: "Geometría faltante después de importar", description: "Partes del modelo 3D no aparecen tras la importación.", causes: ["Objetos ocultos en capas del software original", "Geometría no válida o corrupta"], solutions: ["Verificar que todas las capas estén visibles antes de exportar", "Comprobar geometría (sin caras sueltas, normales invertidas)", "Exportar solo los objetos faltantes para aislar el problema"], category: "importacion", severity: "moderado" },
  { id: "a8", title: "El modelo aparece con escala incorrecta", description: "El modelo importado aparece muy grande o muy pequeño.", causes: ["Unidades incorrectas al exportar", "Sistema de unidades diferente en el software de origen"], solutions: ["Verificar unidades en el modelador (recomendado: metros)", "Configurar unidades correctamente al exportar FBX", "Usar herramienta de escala al importar en D5 Render"], category: "importacion", severity: "leve" },
  { id: "a9", title: "La escena se ve oscura", description: "El viewport o render se muestran demasiado oscuros.", causes: ["Exposición muy baja", "No hay fuentes de luz", "HDRI muy oscuro o desactivado"], solutions: ["Ajustar valor de exposición en la cámara", "Verificar que el sol o HDRI estén activados", "Agregar luces artificiales", "Cambiar HDRI por uno más brillante"], category: "iluminacion", severity: "leve" },
  { id: "a10", title: "Reflejos incorrectos o ausentes", description: "Las superficies reflectantes no muestran reflejos correctos.", causes: ["Material sin reflectividad adecuada", "Rugosidad demasiado alta"], solutions: ["Ajustar rugosidad a valor bajo (0.0-0.2)", "Verificar mapa de reflexión", "Para espejos: rugosidad 0, metalicidad 1", "Comprobar que HDRI de entorno esté activado"], category: "iluminacion", severity: "moderado" },
  { id: "a11", title: "Ruido excesivo en el render", description: "La imagen renderizada presenta granulado o ruido visual.", causes: ["Pocos pases de render completados", "Iluminación compleja que requiere más muestras"], solutions: ["Aumentar pases de render (mínimo 500)", "Activar Denoiser AI", "Usar más muestras de GI", "Para renders finales: 1000-2000 pases con Denoiser"], category: "iluminacion", severity: "leve" },
  { id: "a12", title: "Render muy lento", description: "El renderizado tarda mucho más de lo esperado.", causes: ["Geometría excesivamente pesada", "Demasiados reflejos/refracciones", "VRAM saturada"], solutions: ["Optimizar geometría, usar LOD", "Reducir materiales reflectantes/refractantes", "Cerrar otros programas para liberar VRAM", "Usar instanciación en lugar de duplicar", "Reducir resolución de texturas a 2K"], category: "iluminacion", severity: "moderado" },
  { id: "a13", title: "El vidrio se ve opaco", description: "Objetos que deberían ser transparentes se ven sólidos.", causes: ["Material configurado como opaco", "Parámetros de transmisión incorrectos"], solutions: ["Cambiar tipo de material a Vidrio (Glass)", "Ajustar transmisión a 0.9-1.0", "Configurar IOR a 1.5 para vidrio estándar", "Reducir rugosidad a casi 0"], category: "materiales", severity: "moderado" },
  { id: "a14", title: "Las texturas se ven borrosas", description: "Las texturas aplicadas se muestran desenfocadas o sin detalle.", causes: ["Resolución de textura demasiado baja", "Mapeo UV incorrecto"], solutions: ["Usar texturas de mayor resolución (4K+)", "Corregir mapeo UV en el software de modelado", "Ajustar escala y repetición de la textura", "Comprobar filtro de textura sin blur excesivo"], category: "materiales", severity: "leve" },
  { id: "a15", title: "El video exportado se ve cortado", description: "El video resultante no muestra la escena completa.", causes: ["Resolución de exportación incorrecta", "Codec incompatible", "Duración del timeline mal configurada"], solutions: ["Verificar resolución de exportación (1920×1080, 3840×2160)", "Usar codec H.264 para máxima compatibilidad", "Ajustar duración del timeline", "Comprobar keyframes de cámara dentro del rango"], category: "exportacion", severity: "moderado" },
];

// Arquitectura glossary (keep existing from search-data.ts)
const arquitecturaGlossary: GlossaryTerm[] = [
  { term: "Ray Tracing", definition: "Técnica de renderizado que simula el comportamiento físico de la luz trazando rayos desde la cámara hacia la escena. Produce imágenes fotorrealistas con reflejos, refracciones y sombras precisas.", category: "renderizado" },
  { term: "Rasterización", definition: "Método de renderizado que convierte objetos 3D en píxeles 2D proyectándolos sobre la pantalla. Es el método más rápido y utilizado en tiempo real.", category: "renderizado" },
  { term: "Denoiser", definition: "Algoritmo de posprocesamiento que elimina el ruido visual generado durante el renderizado con pocos pases. Permite obtener imágenes limpias con menos muestras.", category: "renderizado" },
  { term: "Viewport", definition: "Ventana de visualización en tiempo real donde se muestra la escena 3D durante la edición. Muestra una vista previa con iluminación y materiales aproximados.", category: "renderizado" },
  { term: "GI (Global Illumination)", definition: "Sistema de iluminación global que simula cómo la luz rebota entre superficies, creando efectos de color bleeding y luz indirecta realista.", category: "renderizado" },
  { term: "HDRI", definition: "Imagen de alto rango dinámico utilizada como mapa de entorno para iluminar la escena. Captura la iluminación real de un entorno y proporciona luces y reflejos realistas.", category: "iluminacion" },
  { term: "IES", definition: "Archivo estándar que describe la distribución de luz de una lámpara real. Permite reproducir con precisión el patrón de luz de luminarias específicas.", category: "iluminacion" },
  { term: "God Rays", definition: "Efecto visual de rayos de luz crepusculares que se producen cuando la luz atraviesa aberturas o bordeando objetos. Añade dramatismo a las escenas.", category: "iluminacion" },
  { term: "AO (Ambient Occlusion)", definition: "Técnica que simula el oscurecimiento en pliegues y esquinas donde la luz ambiental tiene dificultad para llegar. Añade profundidad y realismo.", category: "iluminacion" },
  { term: "Bloom", definition: "Efecto de posprocesamiento que crea un resplandor suave alrededor de fuentes de luz brillantes. Simula la dispersión luminosa en lentes.", category: "iluminacion" },
  { term: "PBR", definition: "Metodología de creación de materiales (Physically Based Rendering) que simula el comportamiento real de la luz. Usa parámetros como rugosidad y metalicidad.", category: "materiales" },
  { term: "Mapa Normal", definition: "Textura que simula relieve y detalles superficiales sin añadir geometría real. Altera la dirección de las normales para crear la ilusión de profundidad.", category: "materiales" },
  { term: "Rugosidad (Roughness)", definition: "Parámetro PBR que controla la microsuperficie. Valor bajo = reflejos nítidos; valor alto = aspecto mate. Va de 0 (espejo) a 1 (difuso).", category: "materiales" },
  { term: "Metalicidad", definition: "Parámetro PBR que define si un material se comporta como metal o dieléctrico. Metales (1) tintan reflejos con su color base; no metales (0) reflejan sin alteración.", category: "materiales" },
  { term: "IOR (Índice de Refracción)", definition: "Valor que indica cuánto se desvía la luz al atravesar un material transparente. Vidrio: ~1.5, agua: 1.33, diamante: 2.42.", category: "materiales" },
  { term: "DOF (Depth of Field)", definition: "Efecto de profundidad de campo que desenfoca las zonas fuera del rango de enfoque. Simula el comportamiento de lentes reales y dirige la atención.", category: "camara" },
  { term: "F-stop", definition: "Valor que indica la apertura del diafragma. f/1.4 produce poca profundidad de campo; f/16 mantiene todo enfocado.", category: "camara" },
  { term: "Distancia Focal", definition: "Distancia entre el centro óptico de la lente y el sensor (en mm). Determina ángulo de visión y perspectiva.", category: "camara" },
  { term: "FOV (Field of View)", definition: "Ángulo de visión que abarca la cámara en grados. FOV amplio (90°+) = gran angular; FOV estrecho (30°) = teleobjetivo.", category: "camara" },
  { term: "Keyframe", definition: "Fotograma clave que define un estado de una propiedad animada en un momento determinado. El software interpola automáticamente los valores intermedios.", category: "animacion" },
  { term: "Easing", definition: "Curva de aceleración/desaceleración aplicada a la interpolación. Easing suave produce movimientos naturales; lineal genera movimiento constante.", category: "animacion" },
  { term: "Motion Blur", definition: "Efecto de desenfoque de movimiento que simula la persistencia visual de objetos en movimiento rápido. Aporta realismo y cinematismo.", category: "animacion" },
  { term: "EXR", definition: "Formato de imagen de alto rango dinámico (OpenEXR) que almacena datos de color con precisión de punto flotante. Ideal para composición en posproducción.", category: "exportacion" },
  { term: "FBX", definition: "Formato de intercambio 3D de Autodesk que preserva geometría, materiales, animaciones y jerarquías. El más compatible entre programas 3D.", category: "exportacion" },
];

// ============================================================
// PROGRAMACIÓN (Desarrollo Web)
// ============================================================

const programacionShortcuts: ShortcutCategory[] = [
  {
    title: "Navegación",
    icon: "🧭",
    shortcuts: [
      { keys: ["Ctrl", "P"], description: "Abrir archivo rápidamente" },
      { keys: ["Ctrl", "G"], description: "Ir a línea" },
      { keys: ["Ctrl", "Shift", "O"], description: "Ir a símbolo en archivo" },
      { keys: ["Ctrl", "T"], description: "Ir a símbolo en workspace" },
      { keys: ["Alt", "←"], description: "Volver a la posición anterior" },
      { keys: ["Alt", "→"], description: "Avanzar a la posición siguiente" },
      { keys: ["Ctrl", "Tab"], description: "Cambiar entre archivos abiertos" },
    ],
  },
  {
    title: "Edición",
    icon: "✏️",
    shortcuts: [
      { keys: ["Alt", "↑"], description: "Mover línea arriba" },
      { keys: ["Alt", "↓"], description: "Mover línea abajo" },
      { keys: ["Ctrl", "Shift", "K"], description: "Eliminar línea" },
      { keys: ["Ctrl", "/"], description: "Comentar/descomentar línea" },
      { keys: ["Ctrl", "D"], description: "Seleccionar siguiente ocurrencia" },
      { keys: ["Ctrl", "Shift", "L"], description: "Seleccionar todas las ocurrencias" },
      { keys: ["Ctrl", "Space"], description: "Sugerencias de autocompletado" },
      { keys: ["F2"], description: "Renombrar símbolo" },
    ],
  },
  {
    title: "Multicursor",
    icon: "🖱️",
    shortcuts: [
      { keys: ["Alt", "Click"], description: "Añadir cursor secundario" },
      { keys: ["Ctrl", "Alt", "↑"], description: "Añadir cursor arriba" },
      { keys: ["Ctrl", "Alt", "↓"], description: "Añadir cursor abajo" },
      { keys: ["Ctrl", "Shift", "Alt", "Arrow"], description: "Selección en columna" },
      { keys: ["Shift", "Alt", "I"], description: "Insertar cursor al final de cada selección" },
    ],
  },
  {
    title: "Terminal y Archivos",
    icon: "💻",
    shortcuts: [
      { keys: ["Ctrl", "`"], description: "Abrir/cerrar terminal integrada" },
      { keys: ["Ctrl", "Shift", "`"], description: "Nueva terminal" },
      { keys: ["Ctrl", "N"], description: "Nuevo archivo" },
      { keys: ["Ctrl", "S"], description: "Guardar archivo" },
      { keys: ["Ctrl", "Shift", "S"], description: "Guardar como" },
      { keys: ["Ctrl", "W"], description: "Cerrar archivo actual" },
    ],
  },
  {
    title: "Búsqueda",
    icon: "🔍",
    shortcuts: [
      { keys: ["Ctrl", "F"], description: "Buscar en archivo" },
      { keys: ["Ctrl", "H"], description: "Buscar y reemplazar" },
      { keys: ["Ctrl", "Shift", "F"], description: "Buscar en todos los archivos" },
      { keys: ["Ctrl", "Shift", "H"], description: "Reemplazar en todos los archivos" },
      { keys: ["F3"], description: "Buscar siguiente ocurrencia" },
      { keys: ["Shift", "F3"], description: "Buscar ocurrencia anterior" },
    ],
  },
];

const programacionComparison: ComparisonData = {
  title: "Comparación de Frameworks Frontend",
  subtitle: "React vs Vue vs Angular vs Svelte vs Next.js",
  engines: [
    {
      name: "React", color: "blue", bgColor: "bg-blue-500/15", borderColor: "border-blue-500/30", textColor: "text-blue-600 dark:text-blue-400",
      tipo: "Biblioteca UI", tecnologia: "Virtual DOM + JSX",
      pros: ["Ecosistema masivo con miles de librerías y herramientas", "Gran comunidad y soporte de Meta (Facebook)", "Flexibilidad total para elegir herramientas complementarias", "React Native para desarrollo móvil con el mismo conocimiento"],
      contras: ["Requiere muchas decisiones de configuración (routing, estado, etc.)", "Curva de aprendizaje para patrones avanzados (hooks, context)", "Boilerplate significativo para proyectos grandes"],
      mejorCaso: "Aplicaciones web interactivas y escalables con equipo experimentado que necesita flexibilidad total",
      scores: { popularidad: 98, rendimiento: 82, facilidad: 70, ecosistema: 98, flexibilidad: 95, rendimientoSSR: 65 },
      details: { tipoRender: "Client-side (CSR)", curvaAprendizaje: "Media", bundleSize: "Mediano", ssrNativo: false, typescript: true, empresa: "Meta" },
    },
    {
      name: "Vue", color: "emerald", bgColor: "bg-emerald-500/15", borderColor: "border-emerald-500/30", textColor: "text-emerald-600 dark:text-emerald-400",
      tipo: "Framework progresivo", tecnologia: "Virtual DOM + Templates/JSX",
      pros: ["Curva de aprendizaje suave, ideal para principiantes", "Documentación excelente y muy bien organizada", "Sistema de reactividad intuitivo y potente", "Tamaño de bundle pequeño y rendimiento optimizado"],
      contras: ["Ecosistema más pequeño que React", "Menos oportunidades laborales en algunos mercados", "Algunos plugins de comunidad tienen calidad variable"],
      mejorCaso: "Proyectos que necesitan desarrollo rápido con equipo mixto (junior/senior) y buena experiencia de desarrollador",
      scores: { popularidad: 80, rendimiento: 88, facilidad: 90, ecosistema: 78, flexibilidad: 85, rendimientoSSR: 82 },
      details: { tipoRender: "CSR + SSR (Nuxt)", curvaAprendizaje: "Baja-Media", bundleSize: "Pequeño", ssrNativo: false, typescript: true, empresa: "Comunidad" },
    },
    {
      name: "Angular", color: "red", bgColor: "bg-red-500/15", borderColor: "border-red-500/30", textColor: "text-red-600 dark:text-red-400",
      tipo: "Framework completo", tecnologia: "Real DOM + TypeScript + DI",
      pros: ["Framework completo con todo incluido (routing, forms, HTTP, etc.)", "TypeScript nativo, tipado fuerte por defecto", "Arquitectura opinionada ideal para equipos grandes", "Soporte empresarial de Google y estabilidad a largo plazo"],
      contras: ["Curva de aprendizaje alta, muchos conceptos nuevos", "Bundle size grande para aplicaciones pequeñas", "Boilerplate excesivo para proyectos simples", "Menos popular en startups y proyectos pequeños"],
      mejorCaso: "Aplicaciones empresariales grandes con equipo estructurado que necesita convenciones fuertes y mantenibilidad a largo plazo",
      scores: { popularidad: 72, rendimiento: 75, facilidad: 50, ecosistema: 82, flexibilidad: 55, rendimientoSSR: 78 },
      details: { tipoRender: "CSR + SSR (Angular Universal)", curvaAprendizaje: "Alta", bundleSize: "Grande", ssrNativo: false, typescript: true, empresa: "Google" },
    },
    {
      name: "Svelte", color: "orange", bgColor: "bg-orange-500/15", borderColor: "border-orange-500/30", textColor: "text-orange-600 dark:text-orange-400",
      tipo: "Compilador", tecnologia: "Sin Virtual DOM, compilación en build time",
      pros: ["Rendimiento excepcional sin Virtual DOM", "Sintaxis más simple y menos código boilerplate", "Bundle size mínimo gracias a la compilación", "Reactividad nativa sin hooks ni setState"],
      contras: ["Ecosistema y comunidad más pequeños", "Menos librerías y componentes de terceros", "Menos oportunidades laborales en el mercado actual", "SvelteKit aún madurando comparado con Next.js"],
      mejorCaso: "Proyectos donde el rendimiento y la simplicidad del código son prioritarios, especialmente sitios web ligeros y aplicaciones interactivas",
      scores: { popularidad: 58, rendimiento: 95, facilidad: 88, ecosistema: 50, flexibilidad: 80, rendimientoSSR: 90 },
      details: { tipoRender: "SSR (SvelteKit)", curvaAprendizaje: "Baja", bundleSize: "Muy pequeño", ssrNativo: false, typescript: true, empresa: "Comunidad" },
    },
    {
      name: "Next.js", color: "gray", bgColor: "bg-gray-500/15", borderColor: "border-gray-500/30", textColor: "text-gray-600 dark:text-gray-400",
      tipo: "Meta-framework", tecnologia: "React + SSR/SSG + API Routes",
      pros: ["SSR y SSG nativos para SEO y rendimiento", "API Routes integradas para backend completo", "File-based routing que simplifica la estructura", "Soporte oficial de Vercel con deployment instantáneo"],
      contras: ["Más complejo que React puro para proyectos simples", "Opiniones fuertes sobre estructura y routing", "Dependencia del ecosistema React y sus limitaciones"],
      mejorCaso: "Aplicaciones web completas que necesitan SEO, rendering del servidor y API backend en un solo proyecto",
      scores: { popularidad: 90, rendimiento: 88, facilidad: 75, ecosistema: 92, flexibilidad: 82, rendimientoSSR: 95 },
      details: { tipoRender: "SSR + SSG + CSR", curvaAprendizaje: "Media", bundleSize: "Mediano", ssrNativo: true, typescript: true, empresa: "Vercel" },
    },
  ],
  criteria: [
    { key: "tipo", label: "Tipo" },
    { key: "tecnologia", label: "Tecnología" },
    { key: "tipoRender", label: "Tipo de renderizado" },
    { key: "curvaAprendizaje", label: "Curva de aprendizaje" },
    { key: "bundleSize", label: "Tamaño del bundle" },
    { key: "ssrNativo", label: "SSR nativo", type: "boolean" },
    { key: "typescript", label: "TypeScript nativo", type: "boolean" },
    { key: "empresa", label: "Empresa detrás" },
  ],
  scoreLabels: [
    { key: "popularidad", label: "Popularidad" },
    { key: "rendimiento", label: "Rendimiento" },
    { key: "facilidad", label: "Facilidad de Uso" },
    { key: "ecosistema", label: "Ecosistema" },
    { key: "flexibilidad", label: "Flexibilidad" },
    { key: "rendimientoSSR", label: "Rendimiento SSR" },
  ],
};

const programacionTroubleshooting: TroubleshootingItem[] = [
  { id: "p1", title: "Error 'Module not found'", description: "Al ejecutar la aplicación, aparece un error indicando que no se encuentra un módulo.", causes: ["Dependencia no instalada con npm install", "Nombre del módulo mal escrito en el import", "Ruta relativa incorrecta"], solutions: ["Ejecutar npm install para instalar todas las dependencias", "Verificar la ortografía exacta del nombre del módulo", "Comprobar que la ruta relativa sea correcta (usar ./ para archivos locales)", "Eliminar node_modules y package-lock.json, luego npm install de nuevo"], category: "codigo", severity: "critico" },
  { id: "p2", title: "CSS no se aplica correctamente", description: "Los estilos CSS no se muestran en la página o se aplican de forma inesperada.", causes: ["Especificidad CSS insuficiente", "Cache del navegador mostrando estilos antiguos", "Orden de carga de archivos CSS incorrecto"], solutions: ["Usar DevTools para inspeccionar qué estilos se están aplicando", "Limpiar cache del navegador (Ctrl+Shift+R)", "Aumentar especificidad del selector CSS", "Verificar el orden de importación de archivos CSS"], category: "estilos", severity: "moderado" },
  { id: "p3", title: "Página en blanco sin errores", description: "La aplicación carga pero muestra una página completamente blanca sin errores en consola.", causes: ["Componente raíz no renderizado", "Error silencioso en React con Error Boundary", "Falta el punto de montaje (div#root)"], solutions: ["Verificar que ReactDOM.createRoot() está apuntando al elemento correcto", "Comprobar que el div#root existe en index.html", "Revisar la consola del navegador para errores silenciosos", "Añadir Error Boundary para capturar errores de renderizado"], category: "codigo", severity: "critico" },
  { id: "p4", title: "Layout responsive roto en móvil", description: "El diseño se ve incorrecto en dispositivos móviles o pantallas pequeñas.", causes: ["Falta la etiqueta viewport meta", "Uso de px en lugar de unidades relativas", "Media queries con breakpoints incorrectos"], solutions: ["Añadir <meta name='viewport' content='width=device-width, initial-scale=1.0'>", "Usar unidades relativas (rem, em, %, vw, vh)", "Probar con DevTools en modo responsive (F12 → toggle device)", "Definir breakpoints estándar: 640px, 768px, 1024px, 1280px"], category: "responsive", severity: "moderado" },
  { id: "p5", title: "npm install falla con errores", description: "La instalación de dependencias con npm falla mostrando errores de resolución o permisos.", causes: ["Conflicto de versiones en package.json", "Cache de npm corrupta", "Permisos insuficientes en el directorio"], solutions: ["Ejecutar npm cache clean --force", "Eliminar node_modules y package-lock.json, reinstalar", "Verificar que Node.js y npm estén actualizados", "Usar npm install --legacy-peer-deps para conflictos de peer deps"], category: "entorno", severity: "critico" },
  { id: "p6", title: "API fetch devuelve CORS error", description: "Las peticiones a una API externa son bloqueadas por el error CORS del navegador.", causes: ["Servidor no envía headers Access-Control-Allow-Origin", "Petición desde origen diferente (puerto, dominio o protocolo)", "Falta preflight request para métodos no simples"], solutions: ["Configurar CORS en el servidor backend (Access-Control-Allow-Origin)", "Usar un proxy en desarrollo (proxy en vite.config.js o next.config.js)", "Para Next.js: crear API Route que actúe como proxy", "En desarrollo: usar extensión de navegador para deshabilitar CORS temporalmente"], category: "api", severity: "moderado" },
  { id: "p7", title: "JavaScript 'undefined is not a function'", description: "Error en tiempo de ejecución indicando que algo undefined no es una función.", causes: ["Variable no inicializada antes de llamarla como función", "Import incorrecto del módulo", "Acceso a propiedad de objeto null/undefined"], solutions: ["Verificar que la variable está definida antes de llamarla", "Usar optional chaining (?.) para accesos seguros", "Comprobar que el import del módulo sea correcto (default vs named)", "Añadir console.log para verificar el tipo de la variable"], category: "codigo", severity: "critico" },
  { id: "p8", title: "Build de producción falla", description: "La construcción del proyecto para producción (npm run build) genera errores.", causes: ["Errores de TypeScript no detectados en desarrollo", "Variables de entorno faltantes en producción", "Import de módulos solo disponibles en desarrollo"], solutions: ["Ejecutar TypeScript check (tsc --noEmit) antes de build", "Verificar que todas las env vars necesarias estén definidas", "Usar typeof window !== 'undefined' para código del navegador", "Revisar los errores específicos del build output"], category: "entorno", severity: "critico" },
  { id: "p9", title: "Animaciones CSS entrecortadas", description: "Las animaciones o transiciones CSS se ven a saltos, no fluidas.", causes: ["Animación de propiedades costosas (width, height, top, left)", "Falta de will-change o transform", "Demasiados elementos animados simultáneamente"], solutions: ["Animar solo transform y opacity (composición por GPU)", "Añadir will-change: transform a elementos animados", "Usar requestAnimationFrame para animaciones JS", "Reducir el número de elementos animados a la vez"], category: "estilos", severity: "leve" },
  { id: "p10", title: "Estado no se actualiza en React", description: "Al modificar una variable, la interfaz no refleja el cambio.", causes: ["Mutación directa del estado en lugar de usar setState", "Cierre (closure) obsoleto en funciones de callback", "Key incorrecta en listas que impide re-renderizado"], solutions: ["Nunca mutar el estado directamente, usar setState o el setter del hook", "Usar la forma funcional de setState: setState(prev => nuevoValor)", "Asegurar que las listas tengan keys únicas y estables", "Usar React DevTools para inspeccionar el estado del componente"], category: "codigo", severity: "moderado" },
  { id: "p11", title: "Fuentes no cargan correctamente", description: "Las fuentes personalizadas no se muestran o aparece texto invisible.", causes: ["Ruta incorrecta a los archivos de fuente", "Formato de fuente no soportado por el navegador", "Falta font-display en la declaración @font-face"], solutions: ["Verificar que la ruta al archivo de fuente sea correcta", "Proporcionar formatos woff2 y woff para máxima compatibilidad", "Añadir font-display: swap en @font-face", "Usar Google Fonts o un CDN para fuentes confiables"], category: "estilos", severity: "leve" },
  { id: "p12", title: "LocalStorage lanza error en SSR", description: "Error 'localStorage is not defined' al usar Next.js u otro framework SSR.", causes: ["Acceso a localStorage durante renderizado del servidor", "Código del navegador ejecutándose en contexto Node.js"], solutions: ["Envolver acceso a localStorage en useEffect (solo cliente)", "Usar typeof window !== 'undefined' como guardia", "Para Next.js: usar el hook useIsClient o dynamic import con ssr: false", "Considerar usar cookies en lugar de localStorage para datos SSR"], category: "entorno", severity: "moderado" },
];

const programacionGlossary: GlossaryTerm[] = [
  { term: "HTML", definition: "Lenguaje de marcado de hipertexto (HyperText Markup Language). Es la estructura base de toda página web, definiendo el contenido y su significado semántico mediante etiquetas.", category: "fundamentos" },
  { term: "CSS", definition: "Hojas de estilo en cascada (Cascading Style Sheets). Lenguaje que define la presentación visual de los documentos HTML: colores, tipografía, layout, animaciones y responsive design.", category: "fundamentos" },
  { term: "JavaScript", definition: "Lenguaje de programación que permite agregar interactividad y lógica a las páginas web. Es el único lenguaje que se ejecuta nativamente en los navegadores web.", category: "fundamentos" },
  { term: "DOM", definition: "Modelo de Objetos del Documento (Document Object Model). Representación en árbol de la estructura HTML que permite a JavaScript acceder y modificar dinámicamente el contenido de la página.", category: "fundamentos" },
  { term: "API", definition: "Interfaz de Programación de Aplicaciones (Application Programming Interface). Conjunto de reglas que permite que diferentes aplicaciones se comuniquen entre sí, típicamente mediante peticiones HTTP.", category: "fundamentos" },
  { term: "Responsive Design", definition: "Enfoque de diseño web que hace que las páginas se adapten automáticamente a diferentes tamaños de pantalla usando media queries, flexbox, grid y unidades relativas.", category: "diseno" },
  { term: "Flexbox", definition: "Modelo de layout CSS unidimensional que facilita la alineación y distribución de elementos dentro de un contenedor, ideal para componentes y barras de navegación.", category: "diseno" },
  { term: "CSS Grid", definition: "Sistema de layout CSS bidimensional que permite crear estructuras complejas de filas y columnas, ideal para layouts de página completos y diseños matriciales.", category: "diseno" },
  { term: "Componente", definition: "Unidad reutilizable de interfaz que encapsula HTML, CSS y JavaScript. Los componentes son la base de frameworks como React, Vue y Angular, promoviendo la modularidad.", category: "frameworks" },
  { term: "Virtual DOM", definition: "Representación ligera en memoria del DOM real. React lo utiliza para calcular diferencias (diffing) y actualizar solo los elementos que cambiaron, mejorando el rendimiento.", category: "frameworks" },
  { term: "Hooks", definition: "Funciones especiales en React (useState, useEffect, etc.) que permiten usar estado y otras características de React en componentes funcionales sin necesidad de clases.", category: "frameworks" },
  { term: "SSR", definition: "Renderizado del lado del servidor (Server-Side Rendering). Técnica donde el servidor genera el HTML completo antes de enviarlo al navegador, mejorando SEO y carga inicial.", category: "frameworks" },
  { term: "Node.js", definition: "Entorno de ejecución de JavaScript del lado del servidor basado en el motor V8 de Chrome. Permite usar JavaScript para backend, herramientas de build y scripts de automatización.", category: "herramientas" },
  { term: "npm", definition: "Gestor de paquetes de Node.js (Node Package Manager). El registro más grande de código abierto del mundo, con más de 2 millones de paquetes disponibles para instalar.", category: "herramientas" },
  { term: "Git", definition: "Sistema de control de versiones distribuido que rastrea cambios en el código fuente. Permite colaboración, ramas (branches), historial de cambios y reversión a versiones anteriores.", category: "herramientas" },
  { term: "Webpack", definition: "Bundler de módulos que transforma, minimiza y empaqueta archivos JavaScript, CSS, imágenes y otros recursos para producción de forma optimizada.", category: "herramientas" },
  { term: "TypeScript", definition: "Superset de JavaScript con tipado estático opcional. Mejora la mantenibilidad del código, detecta errores en tiempo de compilación y proporciona mejor autocompletado.", category: "lenguajes" },
  { term: "REST", definition: "Estilo arquitectónico para APIs (Representational State Transfer). Usa métodos HTTP (GET, POST, PUT, DELETE) y URLs para interactuar con recursos del servidor.", category: "lenguajes" },
  { term: "JSON", definition: "Formato ligero de intercambio de datos (JavaScript Object Notation). Estructura de pares clave-valor ampliamente usada en APIs y configuración de aplicaciones.", category: "lenguajes" },
  { term: "CORS", definition: "Mecanismo de seguridad del navegador (Cross-Origin Resource Sharing) que controla qué dominios pueden acceder a recursos de otro dominio, protegiendo contra solicitudes no autorizadas.", category: "seguridad" },
  { term: "HTTPS", definition: "Versión segura de HTTP que usa cifrado TLS/SSL para proteger la comunicación entre el navegador y el servidor, garantizando confidencialidad e integridad de los datos.", category: "seguridad" },
  { term: "XSS", definition: "Ataque de Cross-Site Scripting donde se inyecta código JavaScript malicioso en una página web que otros usuarios visualizan, permitiendo robar sesiones o datos.", category: "seguridad" },
];

// ============================================================
// CIBERSEGURIDAD
// ============================================================

const ciberseguridadShortcuts: ShortcutCategory[] = [
  {
    title: "Navegación en Terminal",
    icon: "🧭",
    shortcuts: [
      { keys: ["Ctrl", "A"], description: "Ir al inicio de la línea" },
      { keys: ["Ctrl", "E"], description: "Ir al final de la línea" },
      { keys: ["Ctrl", "R"], description: "Búsqueda inversa en historial" },
      { keys: ["Ctrl", "L"], description: "Limpiar pantalla" },
      { keys: ["Alt", "."], description: "Insertar último argumento del comando anterior" },
      { keys: ["Ctrl", "W"], description: "Borrar palabra anterior" },
      { keys: ["Ctrl", "U"], description: "Borrar desde cursor hasta inicio de línea" },
    ],
  },
  {
    title: "Sistema de Archivos",
    icon: "📁",
    shortcuts: [
      { keys: ["cd"], description: "Cambiar directorio" },
      { keys: ["ls", "-la"], description: "Listar archivos con detalles y ocultos" },
      { keys: ["pwd"], description: "Mostrar directorio actual" },
      { keys: ["find", "/", "-name"], description: "Buscar archivos por nombre" },
      { keys: ["grep", "-r"], description: "Buscar texto recursivamente en archivos" },
      { keys: ["chmod", "+x"], description: "Dar permisos de ejecución" },
    ],
  },
  {
    title: "Gestión de Procesos",
    icon: "⚙️",
    shortcuts: [
      { keys: ["Ctrl", "C"], description: "Terminar proceso actual" },
      { keys: ["Ctrl", "Z"], description: "Suspender proceso actual" },
      { keys: ["bg"], description: "Reanudar proceso suspendido en segundo plano" },
      { keys: ["fg"], description: "Traer proceso al primer plano" },
      { keys: ["ps", "aux"], description: "Listar todos los procesos" },
      { keys: ["kill", "-9"], description: "Forzar terminación de proceso" },
    ],
  },
  {
    title: "Redes",
    icon: "🌐",
    shortcuts: [
      { keys: ["ifconfig"], description: "Mostrar configuración de red" },
      { keys: ["netstat", "-tulnp"], description: "Mostrar puertos abiertos y conexiones" },
      { keys: ["ss", "-tulnp"], description: "Alternativa moderna a netstat" },
      { keys: ["curl", "-v"], description: "Petición HTTP con detalles" },
      { keys: ["wget"], description: "Descargar archivos de la web" },
      { keys: ["nslookup"], description: "Consultar DNS" },
    ],
  },
  {
    title: "Herramientas de Seguridad",
    icon: "🔒",
    shortcuts: [
      { keys: ["nmap", "-sV"], description: "Escaneo de puertos con detección de versión" },
      { keys: ["nmap", "-sS"], description: "Escaneo SYN stealth" },
      { keys: ["nikto", "-h"], description: "Escaneo de vulnerabilidades web" },
      { keys: ["sqlmap", "-u"], description: "Detección de inyección SQL" },
      { keys: ["hydra", "-l"], description: "Ataque de fuerza bruta" },
      { keys: ["aircrack-ng"], description: "Auditoría de redes WiFi" },
    ],
  },
];

const ciberseguridadComparison: ComparisonData = {
  title: "Comparación de Herramientas de Pentesting",
  subtitle: "Nmap vs Burp Suite vs Metasploit vs Wireshark vs OWASP ZAP",
  engines: [
    {
      name: "Nmap", color: "blue", bgColor: "bg-blue-500/15", borderColor: "border-blue-500/30", textColor: "text-blue-600 dark:text-blue-400",
      tipo: "Escáner de red", tecnologia: "Escaneo de puertos y servicios",
      pros: ["Estándar de la industria para descubrimiento de redes", "Scripts NSE extensibles para detección de vulnerabilidades", "Rápido y eficiente en escaneos grandes", "Documentación excepcional y comunidad activa"],
      contras: ["Interfaz CLI poco amigable para principiantes", "Zenmap (GUI) no está tan pulida", "Puede ser ruidoso y detectado por IDS/IPS"],
      mejorCaso: "Fase de reconocimiento y descubrimiento en auditorías de seguridad de red",
      scores: { funcionalidad: 90, facilidad: 65, versatilidad: 92, documentacion: 95, rendimiento: 88, precio: 98 },
      details: { interfaz: "CLI + Zenmap (GUI)", plataforma: "Multiplataforma", licencia: "GPL v2", certificacion: false, tipoHerramienta: "Reconocimiento" },
    },
    {
      name: "Burp Suite", color: "orange", bgColor: "bg-orange-500/15", borderColor: "border-orange-500/30", textColor: "text-orange-600 dark:text-orange-400",
      tipo: "Proxy web", tecnologia: "Interceptación y análisis HTTP/S",
      pros: ["El estándar de la industria para testing de aplicaciones web", "Proxy interceptor potente con repeater e intruder", "Extensibilidad mediante plugins (BApp Store)", "Comunidad profesional con recursos de aprendizaje"],
      contras: ["La versión gratuita es muy limitada", "Consumo elevado de memoria RAM", "Curva de aprendizaje para funciones avanzadas"],
      mejorCaso: "Pentesting de aplicaciones web con análisis profundo de peticiones HTTP/S y vulnerabilidades OWASP Top 10",
      scores: { funcionalidad: 95, facilidad: 70, versatilidad: 85, documentacion: 88, rendimiento: 72, precio: 50 },
      details: { interfaz: "GUI Java", plataforma: "Multiplataforma", licencia: "Comercial / Community gratis", certificacion: true, tipoHerramienta: "Aplicaciones Web" },
    },
    {
      name: "Metasploit", color: "red", bgColor: "bg-red-500/15", borderColor: "border-red-500/30", textColor: "text-red-600 dark:text-red-400",
      tipo: "Framework de explotación", tecnologia: "Exploits, payloads y post-explotación",
      pros: ["Base de datos de exploits más grande del mundo", "Integración con Nmap, Nessus y otras herramientas", "Módulos de post-explotación muy completos", "msfconsole CLI potente y scriptable"],
      contras: ["Complejidad alta para principiantes", "Puede ser demasiado para auditorías simples", "Requiere conocimiento profundo de vulnerabilidades"],
      mejorCaso: "Explotación controlada de vulnerabilidades conocidas y validación de hallazgos en pentesting profesional",
      scores: { funcionalidad: 95, facilidad: 50, versatilidad: 98, documentacion: 82, rendimiento: 78, precio: 80 },
      details: { interfaz: "CLI + Armitage (GUI)", plataforma: "Linux", licencia: "BSD / Comercial", certificacion: false, tipoHerramienta: "Explotación" },
    },
    {
      name: "Wireshark", color: "cyan", bgColor: "bg-cyan-500/15", borderColor: "border-cyan-500/30", textColor: "text-cyan-600 dark:text-cyan-400",
      tipo: "Analizador de protocolos", tecnologia: "Captura y análisis de paquetes de red",
      pros: ["Análisis de paquetes más detallado disponible", "Soporta más de 3000 protocolos de red", "Filtros de visualización extremadamente potentes", "Herramienta esencial para forense de red"],
      contras: ["Curva de aprendizaje alta para interpretar paquetes", "Consumo elevado de recursos en capturas largas", "No explota vulnerabilidades, solo analiza tráfico"],
      mejorCaso: "Análisis forense de red, depuración de protocolos y detección de comunicaciones maliciosas",
      scores: { funcionalidad: 92, facilidad: 55, versatilidad: 88, documentacion: 90, rendimiento: 75, precio: 98 },
      details: { interfaz: "GUI Qt", plataforma: "Multiplataforma", licencia: "GPL v2", certificacion: false, tipoHerramienta: "Análisis de Red" },
    },
    {
      name: "OWASP ZAP", color: "emerald", bgColor: "bg-emerald-500/15", borderColor: "border-emerald-500/30", textColor: "text-emerald-600 dark:text-emerald-400",
      tipo: "Proxy web", tecnologia: "Escaneo automatizado de vulnerabilidades web",
      pros: ["100% gratuito y open source, sin limitaciones", "Escaneo automatizado potente para vulnerabilidades comunes", "API REST completa para integración en CI/CD", "Proyecto oficial de OWASP, actualizado constantemente"],
      contras: ["Interfaz menos pulida que Burp Suite", "Rendimiento inferior en escaneos grandes", "Menos extensiones que Burp Suite"],
      mejorCaso: "Pentesting web automatizado y escaneos de seguridad en pipelines CI/CD con presupuesto limitado",
      scores: { funcionalidad: 82, facilidad: 75, versatilidad: 78, documentacion: 80, rendimiento: 70, precio: 100 },
      details: { interfaz: "GUI Java", plataforma: "Multiplataforma", licencia: "Apache 2.0", certificacion: false, tipoHerramienta: "Aplicaciones Web" },
    },
  ],
  criteria: [
    { key: "tipo", label: "Tipo" },
    { key: "tecnologia", label: "Tecnología" },
    { key: "interfaz", label: "Interfaz" },
    { key: "plataforma", label: "Plataforma" },
    { key: "licencia", label: "Licencia" },
    { key: "certificacion", label: "Certificación oficial", type: "boolean" },
    { key: "tipoHerramienta", label: "Fase de pentesting" },
  ],
  scoreLabels: [
    { key: "funcionalidad", label: "Funcionalidad" },
    { key: "facilidad", label: "Facilidad de Uso" },
    { key: "versatilidad", label: "Versatilidad" },
    { key: "documentacion", label: "Documentación" },
    { key: "rendimiento", label: "Rendimiento" },
    { key: "precio", label: "Relación Calidad/Precio" },
  ],
};

const ciberseguridadTroubleshooting: TroubleshootingItem[] = [
  { id: "c1", title: "Kali Linux no arranca en VM", description: "La máquina virtual con Kali Linux no inicia o se queda en pantalla negra.", causes: ["Virtualización no habilitada en BIOS", "Recursos de RAM/CPU insuficientes", "Imagen ISO corrupta"], solutions: ["Habilitar VT-x/AMD-V en la BIOS del host", "Asignar mínimo 2GB RAM y 2 CPUs a la VM", "Descargar nuevamente la ISO y verificar el checksum SHA256", "Usar VirtualBox en lugar de VMware si hay problemas de compatibilidad"], category: "entorno", severity: "critico" },
  { id: "c2", title: "Nmap no detecta puertos", description: "El escaneo con Nmap muestra todos los puertos como filtrados o cerrados.", causes: ["Firewall del objetivo bloqueando el escaneo", "Escaneo UDP en lugar de TCP", "Red con IDS/IPS que bloquea escaneos"], solutions: ["Usar nmap -sS para SYN scan (más sigiloso)", "Probar con -Pn para saltar descubrimiento de host", "Usar nmap -sV para detección de versión", "Verificar conectividad básica con ping primero"], category: "herramientas", severity: "moderado" },
  { id: "c3", title: "Burp Suite no intercepta tráfico", description: "El proxy de Burp Suite no captura las peticiones HTTP del navegador.", causes: ["Certificado CA de Burp no instalado en el navegador", "Proxy del navegador no configurado correctamente", "Aplicación usa certificate pinning"], solutions: ["Instalar el certificado CA de Burp en el navegador (http://burp/cert)", "Configurar proxy del navegador en 127.0.0.1:8080", "Para HTTPS: instalar certificado como Trusted Root CA", "Deshabilitar certificate pinning con Frida u Objection"], category: "herramientas", severity: "critico" },
  { id: "c4", title: "Metasploit no conecta a la base de datos", description: "Error al iniciar msfconsole indicando que no puede conectar a PostgreSQL.", causes: ["Servicio PostgreSQL no iniciado", "Base de datos no inicializada", "Credenciales incorrectas"], solutions: ["Iniciar PostgreSQL: systemctl start postgresql", "Inicializar la BD: msfdb init", "Verificar estado: systemctl status postgresql", "Reconfigurar: msfdb reinit"], category: "herramientas", severity: "moderado" },
  { id: "c5", title: "Permisos denegados en Kali", description: "Error 'Permission denied' al ejecutar scripts o acceder a archivos.", causes: ["Ejecutando como usuario normal sin sudo", "Archivo sin permisos de ejecución", "Directorio con permisos restrictivos"], solutions: ["Usar sudo antes del comando", "Dar permisos de ejecución: chmod +x script.sh", "Verificar permisos con ls -la", "Para pentesting: usar sudo -i para sesión root completa"], category: "entorno", severity: "moderado" },
  { id: "c6", title: "Wireshark no captura paquetes", description: "La interfaz de Wireshark no muestra ninguna captura de tráfico.", causes: ["Interfaz de red incorrecta seleccionada", "Falta de permisos para captura (pcap)", "No hay tráfico en la interfaz seleccionada"], solutions: ["Seleccionar la interfaz de red activa correcta", "Ejecutar con permisos: sudo wireshark o sudo dumpcap", "Verificar con ifconfig que la interfaz tenga tráfico", "Usar tcpdump -i eth0 para verificar captura desde CLI"], category: "herramientas", severity: "moderado" },
  { id: "c7", title: "Hydra falla en ataque de fuerza bruta", description: "El ataque con Hydra no funciona o produce muchos errores de conexión.", causes: ["Lista de contraseñas inadecuada", "Demasiados hilos causando bloqueo del servidor", "Protocolo o puerto incorrecto"], solutions: ["Usar listas de contraseñas como rockyou.txt", "Reducir número de hilos con -t (ej: -t 10)", "Verificar protocolo: hydra -l user -P pass.txt ssh://target", "Añadir -W para esperar entre intentos y evitar bloqueo"], category: "herramientas", severity: "leve" },
  { id: "c8", title: "VPN de laboratorio no conecta", description: "No se puede establecer conexión VPN con el laboratorio de práctica.", causes: ["Configuración VPN incorrecta", "Protocolo no soportado", "Credenciales del laboratorio expiradas"], solutions: ["Verificar archivo de configuración .ovpn", "Instalar OpenVPN: sudo apt install openvpn", "Conectar: sudo openvpn --config lab.ovpn", "Verificar credenciales y estado del laboratorio en la plataforma"], category: "entorno", severity: "critico" },
  { id: "c9", title: "Error 'Connection refused' en objetivo", description: "Las herramientas no pueden conectarse al objetivo del pentest.", causes: ["Servicio no ejecutándose en el puerto", "Firewall bloqueando la conexión", "IP del objetivo incorrecta"], solutions: ["Verificar que el servicio esté activo con nmap -sV", "Comprobar conectividad con ping y traceroute", "Verificar la IP correcta del objetivo", "Probar puertos alternativos o protocolos"], category: "red", severity: "moderado" },
  { id: "c10", title: "SQLMap no detecta inyección", description: "SQLMap no encuentra vulnerabilidades de inyección SQL en el parámetro probado.", causes: ["El parámetro no es vulnerable realmente", "WAF bloqueando las payloads", "Necesita técnicas de bypass más avanzadas"], solutions: ["Probar con --level=5 --risk=3 para más payloads", "Usar --tamper para evadir WAF (ej: --tamper=space2comment)", "Verificar manualmente con comillas simples si el parámetro es vulnerable", "Usar --random-agent para rotar User-Agent"], category: "herramientas", severity: "leve" },
];

const ciberseguridadGlossary: GlossaryTerm[] = [
  { term: "Pentesting", definition: "Prueba de penetración (Penetration Testing). Simulación controlada de un ataque cibernético para identificar vulnerabilidades en sistemas, redes o aplicaciones antes de que sean explotadas por atacantes reales.", category: "fundamentos" },
  { term: "Vulnerabilidad", definition: "Debilidad o fallo en un sistema que puede ser explotado por un atacante para comprometer la confidencialidad, integridad o disponibilidad de la información o del sistema.", category: "fundamentos" },
  { term: "Exploit", definition: "Código o técnica que aprovecha una vulnerabilidad específica para ejecutar acciones no autorizadas en un sistema. Los exploits son herramientas clave en el pentesting.", category: "fundamentos" },
  { term: "Payload", definition: "Código malicioso que se ejecuta después de que un exploit tiene éxito. Puede ser un reverse shell, un keylogger, o cualquier acción que el atacante quiera realizar en el sistema comprometido.", category: "fundamentos" },
  { term: "Firewall", definition: "Sistema de seguridad de red que monitoriza y controla el tráfico entrante y saliente basándose en reglas de seguridad predefinidas. Puede ser hardware, software o ambos.", category: "defensa" },
  { term: "IDS/IPS", definition: "Sistema de Detección/Prevención de Intrusiones. IDS detecta actividad sospechosa y alerta; IPS además toma medidas automáticas para bloquear la amenaza.", category: "defensa" },
  { term: "Cifrado", definition: "Proceso de transformar datos legibles en texto cifrado usando algoritmos matemáticos y claves. Solo quien posee la clave correcta puede descifrar y leer los datos originales.", category: "criptografia" },
  { term: "Hash", definition: "Función criptográfica unidireccional que convierte datos en una cadena fija de caracteres. Se usa para verificar integridad de datos y almacenar contraseñas de forma segura.", category: "criptografia" },
  { term: "PKI", definition: "Infraestructura de Clave Pública (Public Key Infrastructure). Sistema que gestiona certificados digitales y pares de claves para establecer comunicaciones seguras y autenticación.", category: "criptografia" },
  { term: "Phishing", definition: "Ataque de ingeniería social donde el atacante se hace pasar por una entidad confiable (banco, empresa) mediante correos o sitios web falsos para robar credenciales o información sensible.", category: "ataques" },
  { term: "Ransomware", definition: "Malware que cifra los archivos del sistema víctima y exige un rescate (generalmente en criptomonedas) para proporcionar la clave de descifrado y recuperar los datos.", category: "ataques" },
  { term: "DDoS", definition: "Ataque de Denegación de Servicio Distribuido donde múltiples sistemas comprometidos envían tráfico masivo a un objetivo, saturando sus recursos y haciéndolo inaccesible para usuarios legítimos.", category: "ataques" },
  { term: "Ingeniería Social", definition: "Técnica de manipulación psicológica que explota la confianza y comportamiento humano para obtener información confidencial o acceso a sistemas, sin necesidad de habilidades técnicas.", category: "ataques" },
  { term: "OWASP Top 10", definition: "Lista de las 10 vulnerabilidades web más críticas según OWASP. Incluye inyección SQL, XSS, autenticación rota y más. Es la referencia estándar para seguridad de aplicaciones web.", category: "estandares" },
  { term: "CVE", definition: "Vulnerabilidades y Exposiciones Comunes (Common Vulnerabilities and Exposures). Sistema estándar de nomenclatura que asigna identificadores únicos a vulnerabilidades de seguridad conocidas.", category: "estandares" },
  { term: "MITRE ATT&CK", definition: "Framework que describe las tácticas, técnicas y procedimientos (TTPs) que usan los adversarios cibernéticos. Esencial para entender y detectar patrones de ataque.", category: "estandares" },
  { term: "ISO 27001", definition: "Estándar internacional para sistemas de gestión de seguridad de la información (SGSI). Define requisitos para establecer, implementar y mejorar la seguridad de la información.", category: "estandares" },
  { term: "Red Team / Blue Team", definition: "Red Team simula ataques reales para probar defensas. Blue Team defiende y responde a incidentes. Ejercicios conjuntos mejoran la postura de seguridad de la organización.", category: "metodologias" },
  { term: "OSINT", definition: "Inteligencia de Fuentes Abiertas (Open Source Intelligence). Recopilación y análisis de información disponible públicamente (redes sociales, registros DNS, etc.) para evaluación de seguridad.", category: "metodologias" },
  { term: "Zero Day", definition: "Vulnerabilidad desconocida por el fabricante del software y sin parche disponible. Los ataques zero-day son extremadamente peligrosos porque no existe defensa conocida.", category: "fundamentos" },
];

// ============================================================
// IA (Inteligencia Artificial)
// ============================================================

const iaShortcuts: ShortcutCategory[] = [
  {
    title: "Jupyter Notebook",
    icon: "📓",
    shortcuts: [
      { keys: ["Shift", "Enter"], description: "Ejecutar celda y avanzar" },
      { keys: ["Ctrl", "Enter"], description: "Ejecutar celda sin avanzar" },
      { keys: ["Alt", "Enter"], description: "Ejecutar celda e insertar nueva debajo" },
      { keys: ["Esc"], description: "Modo comando" },
      { keys: ["Enter"], description: "Modo edición" },
      { keys: ["A"], description: "Insertar celda arriba (modo comando)" },
      { keys: ["B"], description: "Insertar celda abajo (modo comando)" },
      { keys: ["DD"], description: "Eliminar celda (modo comando)" },
    ],
  },
  {
    title: "Edición de Celdas",
    icon: "✏️",
    shortcuts: [
      { keys: ["M"], description: "Cambiar celda a Markdown" },
      { keys: ["Y"], description: "Cambiar celda a código" },
      { keys: ["Ctrl", "Shift", "-"], description: "Dividir celda en el cursor" },
      { keys: ["Shift", "↑/↓"], description: "Seleccionar múltiples celdas" },
      { keys: ["Ctrl", "D"], description: "Duplicar celda" },
    ],
  },
  {
    title: "Kernel",
    icon: "🧠",
    shortcuts: [
      { keys: ["I", "I"], description: "Interrumpir kernel" },
      { keys: ["0", "0"], description: "Reiniciar kernel" },
      { keys: ["Ctrl", "S"], description: "Guardar notebook" },
      { keys: ["Esc", "0", "0"], description: "Reiniciar y limpiar outputs" },
    ],
  },
  {
    title: "Python (General)",
    icon: "🐍",
    shortcuts: [
      { keys: ["Ctrl", "/"], description: "Comentar/descomentar en IDE" },
      { keys: ["Ctrl", "Space"], description: "Autocompletado" },
      { keys: ["Ctrl", "Shift", "F10"], description: "Ejecutar script en PyCharm" },
      { keys: ["Tab"], description: "Autocompletar / Indentar" },
      { keys: ["Shift", "Tab"], description: "Dedentar / Mostrar documentación" },
    ],
  },
  {
    title: "Google Colab",
    icon: "☁️",
    shortcuts: [
      { keys: ["Ctrl", "M", "B"], description: "Insertar celda de código abajo" },
      { keys: ["Ctrl", "M", "A"], description: "Insertar celda de código arriba" },
      { keys: ["Ctrl", "M", "M"], description: "Cambiar a celda de texto" },
      { keys: ["Ctrl", "M", "D"], description: "Eliminar celda" },
      { keys: ["Ctrl", "M", "H"], description: "Mostrar atajos de teclado" },
    ],
  },
];

const iaComparison: ComparisonData = {
  title: "Comparación de Frameworks de IA/ML",
  subtitle: "TensorFlow vs PyTorch vs Scikit-learn vs Keras vs Hugging Face",
  engines: [
    {
      name: "TensorFlow", color: "orange", bgColor: "bg-orange-500/15", borderColor: "border-orange-500/30", textColor: "text-orange-600 dark:text-orange-400",
      tipo: "Framework completo", tecnologia: "Grafos computacionales + Eager execution",
      pros: ["Ecosistema completo: TF Lite, TF.js, TFLite para deployment", "Production-ready con TF Serving y TF Extended (TFX)", "Excelente soporte para TPU y distribución", "Comunidad masiva y soporte de Google"],
      contras: ["API más compleja y verbosa que PyTorch", "Debugging más difícil por el modelo de grafos", "Cambios frecuentes de API entre versiones"],
      mejorCaso: "Proyectos de producción que necesitan deployment escalable en móviles, web o servidores con soporte TPU",
      scores: { productividad: 72, rendimiento: 90, facilidad: 60, deployment: 95, comunidad: 92, investigacion: 75 },
      details: { lenguajePrincipal: "Python / C++", curvaAprendizaje: "Alta", deployMovil: true, deployWeb: true, soporteGPU: true, empresa: "Google" },
    },
    {
      name: "PyTorch", color: "red", bgColor: "bg-red-500/15", borderColor: "border-red-500/30", textColor: "text-red-600 dark:text-red-400",
      tipo: "Framework de investigación", tecnologia: "Tensores dinámicos + Autograd",
      pros: ["API Pythonic e intuitiva, fácil de aprender", "Debugging nativo con herramientas estándar de Python", "Estándar de facto en investigación académica", "Eager execution por defecto, grafos dinámicos"],
      contras: ["Deployment en producción menos maduro que TF", "Ecosistema de producción más pequeño", "Consumo de memoria mayor en algunos casos"],
      mejorCaso: "Investigación en deep learning, prototipado rápido y proyectos académicos donde la flexibilidad y la facilidad de experimentación son prioritarias",
      scores: { productividad: 90, rendimiento: 85, facilidad: 92, deployment: 70, comunidad: 88, investigacion: 98 },
      details: { lenguajePrincipal: "Python / C++", curvaAprendizaje: "Media", deployMovil: true, deployWeb: false, soporteGPU: true, empresa: "Meta" },
    },
    {
      name: "Scikit-learn", color: "blue", bgColor: "bg-blue-500/15", borderColor: "border-blue-500/30", textColor: "text-blue-600 dark:text-blue-400",
      tipo: "Biblioteca de ML clásico", tecnologia: "Algoritmos tradicionales de ML",
      pros: ["API consistente y muy bien diseñada (fit/predict/transform)", "Excelente para ML clásico: clasificación, regresión, clustering", "Documentación excepcional con ejemplos prácticos", "Integración perfecta con NumPy, Pandas y Matplotlib"],
      contras: ["No soporta deep learning nativamente", "Limitado para datasets muy grandes (no distribuido)", "Sin soporte para GPU"],
      mejorCaso: "Proyectos de machine learning clásico con datasets tabulares, pipelines de preprocesamiento y modelos interpretables",
      scores: { productividad: 95, rendimiento: 72, facilidad: 95, deployment: 85, comunidad: 90, investigacion: 65 },
      details: { lenguajePrincipal: "Python / Cython", curvaAprendizaje: "Baja", deployMovil: false, deployWeb: false, soporteGPU: false, empresa: "Comunidad" },
    },
    {
      name: "Keras", color: "emerald", bgColor: "bg-emerald-500/15", borderColor: "border-emerald-500/30", textColor: "text-emerald-600 dark:text-emerald-400",
      tipo: "API de alto nivel", tecnologia: "Modelos secuenciales y funcionales sobre TensorFlow",
      pros: ["La API más fácil para deep learning, ideal para principiantes", "Prototipado rápido con pocas líneas de código", "Integración nativa con TensorFlow 2.x", "Excelente para modelos estándar: CNN, RNN, transformers"],
      contras: ["Menos flexibilidad para arquitecturas complejas o experimentales", "Limitado a lo que TensorFlow soporta por debajo", "Debugging de bajo nivel requiere entender TF"],
      mejorCaso: "Aprendizaje de deep learning y proyectos donde se necesita rapidez de desarrollo sobre arquitecturas de red estándar",
      scores: { productividad: 92, rendimiento: 78, facilidad: 98, deployment: 82, comunidad: 85, investigacion: 55 },
      details: { lenguajePrincipal: "Python", curvaAprendizaje: "Baja", deployMovil: true, deployWeb: true, soporteGPU: true, empresa: "Google" },
    },
    {
      name: "Hugging Face", color: "yellow", bgColor: "bg-yellow-500/15", borderColor: "border-yellow-500/30", textColor: "text-yellow-600 dark:text-yellow-400",
      tipo: "Plataforma de NLP/ML", tecnologia: "Transformers + Model Hub",
      pros: ["Acceso inmediato a miles de modelos pre-entrenados de NLP", "API simple para fine-tuning y inferencia", "Model Hub colaborativo con versionado de modelos", "Soporte multi-framework (PyTorch, TF, JAX)"],
      contras: ["Enfocado principalmente en NLP, menos para visión por computadora", "Depende de PyTorch/TF como backend", "Modelos grandes requieren mucha VRAM"],
      mejorCaso: "Proyectos de NLP y transformers que necesitan modelos pre-entrenados de última generación con mínimo código",
      scores: { productividad: 95, rendimiento: 82, facilidad: 88, deployment: 80, comunidad: 92, investigacion: 95 },
      details: { lenguajePrincipal: "Python", curvaAprendizaje: "Media", deployMovil: false, deployWeb: true, soporteGPU: true, empresa: "Hugging Face Inc." },
    },
  ],
  criteria: [
    { key: "tipo", label: "Tipo" },
    { key: "tecnologia", label: "Tecnología" },
    { key: "lenguajePrincipal", label: "Lenguaje principal" },
    { key: "curvaAprendizaje", label: "Curva de aprendizaje" },
    { key: "deployMovil", label: "Deploy en móvil", type: "boolean" },
    { key: "deployWeb", label: "Deploy en web", type: "boolean" },
    { key: "soporteGPU", label: "Soporte GPU", type: "boolean" },
    { key: "empresa", label: "Empresa detrás" },
  ],
  scoreLabels: [
    { key: "productividad", label: "Productividad" },
    { key: "rendimiento", label: "Rendimiento" },
    { key: "facilidad", label: "Facilidad de Uso" },
    { key: "deployment", label: "Deployment" },
    { key: "comunidad", label: "Comunidad" },
    { key: "investigacion", label: "Investigación" },
  ],
};

const iaTroubleshooting: TroubleshootingItem[] = [
  { id: "i1", title: "CUDA out of memory", description: "Error al entrenar un modelo indicando que la VRAM de la GPU se ha agotado.", causes: ["Batch size demasiado grande para la VRAM disponible", "Modelo con demasiados parámetros", "Fugas de memoria en el código (tensores no liberados)"], solutions: ["Reducir batch size progresivamente hasta que quepa en VRAM", "Usar gradient accumulation para simular batch grande", "Liberar memoria con torch.cuda.empty_cache()", "Usar mixed precision training (fp16) para reducir consumo a la mitad"], category: "entrenamiento", severity: "critico" },
  { id: "i2", title: "Modelo no aprende (loss constante)", description: "La función de pérdida no disminuye durante el entrenamiento.", causes: ["Learning rate demasiado alto o bajo", "Gradientes que desaparecen (vanishing gradients)", "Datos no normalizados o preprocesados incorrectamente"], solutions: ["Probar learning rates: 1e-3, 1e-4, 1e-5", "Usar gradient clipping para evitar explosión de gradientes", "Normalizar datos (media 0, desviación 1)", "Verificar que las etiquetas sean correctas y estén codificadas bien"], category: "entrenamiento", severity: "critico" },
  { id: "i3", title: "Overfitting severo", description: "El modelo tiene alta precisión en entrenamiento pero baja en validación.", causes: ["Dataset de entrenamiento demasiado pequeño", "Modelo con demasiada capacidad (parámetros)", "Falta de regularización"], solutions: ["Aumentar dataset con data augmentation", "Añadir dropout (0.3-0.5) entre capas", "Usar L2 regularization (weight decay)", "Aplicar early stopping basado en validation loss", "Reducir complejidad del modelo"], category: "entrenamiento", severity: "moderado" },
  { id: "i4", title: "CUDA no detectado por PyTorch", description: "PyTorch no reconoce la GPU NVIDIA disponible en el sistema.", causes: ["Drivers NVIDIA desactualizados", "Versión de PyTorch incompatible con la versión de CUDA", "Instalación de PyTorch sin soporte CUDA"], solutions: ["Actualizar drivers NVIDIA a la última versión", "Instalar PyTorch con CUDA: pip install torch --index-url https://download.pytorch.org/whl/cu118", "Verificar con torch.cuda.is_available()", "Comprobar versión CUDA con nvcc --version"], category: "entorno", severity: "critico" },
  { id: "i5", title: "Jupyter Notebook no arranca", description: "El servidor de Jupyter no se inicia o da error al abrir notebooks.", causes: ["Puerto 8888 ya en uso", "Instalación corrupta de Jupyter", "Conflictos de kernel de Python"], solutions: ["Usar puerto alternativo: jupyter notebook --port 8889", "Reinstalar: pip install --upgrade jupyter", "Crear entorno virtual limpio con conda o venv", "Matar procesos en puerto: lsof -i :8888"], category: "entorno", severity: "moderado" },
  { id: "i6", title: "Entrenamiento extremadamente lento", description: "El entrenamiento del modelo tarda mucho más de lo esperado por época.", causes: ["Entrenamiento en CPU en lugar de GPU", "DataLoader sin num_workers", "Operaciones innecesarias en el forward pass"], solutions: ["Verificar que el modelo y datos estén en GPU: .to(device)", "Añadir num_workers=4 y pin_memory=True al DataLoader", "Usar .cuda() o device='cuda' consistentemente", "Perfilizar con torch.profiler para identificar cuellos de botella"], category: "entrenamiento", severity: "moderado" },
  { id: "i7", title: "Dimensiones de tensor incorrectas", description: "Error deRuntimeError sobre dimensiones de tensor que no coinciden.", causes: ["Shape del input no corresponde a lo esperado por la capa", "Falta reshape o permute de tensores", "Batch dimension faltante o duplicada"], solutions: ["Imprimir shapes intermedias: print(tensor.shape)", "Usar tensor.reshape() o tensor.view() para ajustar dimensiones", "Asegurar que el input incluye batch dimension: (batch, channels, H, W)", "Usar tensor.unsqueeze(0) para añadir batch dimension"], category: "codigo", severity: "moderado" },
  { id: "i8", title: "Conda environment conflict", description: "Error al crear o activar entornos virtuales con Conda debido a conflictos de paquetes.", causes: ["Conflictos de versiones entre paquetes", "Conda cache corrupta", "Canales con prioridades incompatibles"], solutions: ["Usar conda clean --all para limpiar cache", "Crear entorno desde cero: conda create -n env python=3.10", "Usar mamba como alternativa más rápida: mamba create -n env", "Especificar canales: conda install -c conda-forge package"], category: "entorno", severity: "moderado" },
  { id: "i9", title: "NaN en la loss function", description: "La función de pérdida devuelve NaN (Not a Number) durante el entrenamiento.", causes: ["Learning rate demasiado alto causando overflow", "División por cero o log(0)", "Datos con valores infinitos o NaN"], solutions: ["Reducir learning rate significativamente", "Añadir epsilon a divisiones: x / (y + 1e-8)", "Usar torch.isnan() para detectar NaN en datos", "Clamp valores: torch.clamp(x, min=1e-7) antes de log"], category: "entrenamiento", severity: "critico" },
  { id: "i10", title: "ImportError de librerías de IA", description: "Error al importar torch, tensorflow, sklearn u otras librerías de IA.", causes: ["Librería no instalada en el entorno actual", "Versión de Python incompatible", "Conflicto entre instalaciones pip y conda"], solutions: ["Verificar instalación: pip list | grep torch", "Instalar versión correcta para tu Python: pip install torch", "No mezclar pip y conda en el mismo entorno", "Usar requirements.txt para reproducibilidad"], category: "entorno", severity: "critico" },
];

const iaGlossary: GlossaryTerm[] = [
  { term: "Machine Learning", definition: "Rama de la IA donde los algoritmos aprenden patrones a partir de datos sin ser programados explícitamente. Incluye aprendizaje supervisado, no supervisado y por refuerzo.", category: "fundamentos" },
  { term: "Deep Learning", definition: "Subcampo del ML que usa redes neuronales profundas con múltiples capas para aprender representaciones jerárquicas de datos. Excelente para imágenes, texto y audio.", category: "fundamentos" },
  { term: "Red Neuronal", definition: "Modelo computacional inspirado en el cerebro humano compuesto por capas de neuronas artificiales conectadas. Cada conexión tiene un peso que se ajusta durante el entrenamiento.", category: "fundamentos" },
  { term: "Entrenamiento", definition: "Proceso iterativo donde el modelo ajusta sus pesos internos para minimizar la diferencia entre sus predicciones y los valores reales, usando algoritmos de optimización como SGD o Adam.", category: "entrenamiento" },
  { term: "Inferencia", definition: "Fase donde el modelo entrenado realiza predicciones sobre datos nuevos que no ha visto antes. Es el uso del modelo en producción para generar resultados.", category: "entrenamiento" },
  { term: "Overfitting", definition: "Cuando el modelo aprende demasiado bien los datos de entrenamiento, incluyendo el ruido, y pierde capacidad de generalización. Funciona bien en entrenamiento pero mal con datos nuevos.", category: "entrenamiento" },
  { term: "Underfitting", definition: "Cuando el modelo es demasiado simple para capturar los patrones de los datos. Tiene bajo rendimiento tanto en entrenamiento como en validación.", category: "entrenamiento" },
  { term: "Learning Rate", definition: "Hiperparámetro que controla cuánto se ajustan los pesos del modelo en cada paso del entrenamiento. Muy alto causa inestabilidad; muy bajo hace el entrenamiento lento.", category: "hiperparametros" },
  { term: "Batch Size", definition: "Número de muestras procesadas antes de actualizar los pesos del modelo. Batch pequeño = actualizaciones frecuentes; batch grande = entrenamiento más estable pero más memoria.", category: "hiperparametros" },
  { term: "Epoch", definition: "Una pasada completa por todo el dataset de entrenamiento. Típicamente se entrenan modelos por decenas o cientos de epochs hasta que la loss converge.", category: "hiperparametros" },
  { term: "CNN", definition: "Red Neuronal Convolucional. Arquitectura especializada en procesar datos con estructura espacial como imágenes, usando filtros convolucionales que detectan patrones locales.", category: "arquitecturas" },
  { term: "RNN", definition: "Red Neuronal Recurrente. Arquitectura diseñada para datos secuenciales donde la salida de cada paso depende del paso anterior. Usada en NLP y series temporales.", category: "arquitecturas" },
  { term: "Transformer", definition: "Arquitectura basada en mecanismos de atención que procesa secuencias en paralelo en lugar de secuencialmente. Base de modelos como GPT, BERT y LLaMA.", category: "arquitecturas" },
  { term: "GAN", definition: "Red Generativa Adversaria. Par de redes (generador y discriminador) que compiten: el generador crea datos falsos y el discriminador distingue reales de falsos.", category: "arquitecturas" },
  { term: "Dataset", definition: "Conjunto de datos estructurados usado para entrenar y evaluar modelos de ML. Se divide típicamente en conjuntos de entrenamiento (70-80%), validación (10-15%) y test (10-15%).", category: "datos" },
  { term: "Data Augmentation", definition: "Técnica para aumentar el dataset aplicando transformaciones a los datos existentes: rotación, flip, zoom en imágenes; sinónimos y paráfrasis en texto.", category: "datos" },
  { term: "Feature Engineering", definition: "Proceso de crear nuevas variables (features) a partir de los datos brutos para mejorar el rendimiento del modelo. Es crucial en ML clásico.", category: "datos" },
  { term: "Loss Function", definition: "Función matemática que mide la diferencia entre las predicciones del modelo y los valores reales. El objetivo del entrenamiento es minimizar esta función.", category: "optimizacion" },
  { term: "Gradient Descent", definition: "Algoritmo de optimización que ajusta los pesos del modelo en dirección opuesta al gradiente de la loss function, buscando el mínimo que representa el mejor conjunto de pesos.", category: "optimizacion" },
  { term: "Fine-tuning", definition: "Técnica de tomar un modelo pre-entrenado en un dataset grande y re-entrenarlo en un dataset específico más pequeño, adaptando sus conocimientos a una tarea particular.", category: "tecnicas" },
  { term: "Transfer Learning", definition: "Método donde el conocimiento aprendido en una tarea se transfiere a otra relacionada. Permite obtener buenos resultados con pocos datos aprovechando modelos pre-entrenados.", category: "tecnicas" },
  { term: "GPU", definition: "Unidad de Procesamiento Gráfico. Procesador paralelo esencial para entrenar modelos de deep learning, acelerando las operaciones matriciales hasta 100x vs CPU.", category: "hardware" },
  { term: "TPU", definition: "Unidad de Procesamiento Tensorial (Tensor Processing Unit). Chip de Google diseñado específicamente para cálculos de ML, optimizado para operaciones de matrices de TensorFlow.", category: "hardware" },
];

// ============================================================
// ASSEMBLE ALL CATEGORY DATA
// ============================================================

export const categoryToolsData: Record<string, CategoryToolsData> = {
  arquitectura: {
    shortcuts: {
      config: { title: "Atajos de Teclado", subtitle: "Referencia rápida de los atajos de D5 Render", tipText: "Los atajos de teclado pueden variar según la versión de D5 Render y tu configuración regional. Personaliza tus atajos en Configuración → Atajos de teclado.", iconEmoji: "⌨️" },
      categories: arquitecturaShortcuts,
    },
    comparisons: {
      ...arquitecturaComparison,
      config: { title: "Comparación de Motores de Render", subtitle: "Análisis detallado de los principales motores de renderizado arquitectónico", tipText: "La mejor herramienta depende de tu flujo de trabajo, presupuesto y hardware disponible. Prueba las versiones gratuitas antes de decidir.", iconEmoji: "⚖️" },
    },
    troubleshooting: {
      config: { title: "Soluciones D5 Render", subtitle: "Problemas comunes y sus soluciones", tipText: "Si tu problema no aparece en esta lista, asegúrate de tener la última versión de D5 Render instalada. Muchos errores se corrigen en cada actualización.", iconEmoji: "🔧" },
      items: arquitecturaTroubleshooting,
      categoryColors: {
        instalacion: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
        importacion: "bg-violet-500/15 text-violet-400 border-violet-500/20",
        iluminacion: "bg-amber-500/15 text-amber-400 border-amber-500/20",
        materiales: "bg-rose-500/15 text-rose-400 border-rose-500/20",
        exportacion: "bg-orange-500/15 text-orange-400 border-orange-500/20",
      },
      categoryLabels: {
        instalacion: "Instalación y Arranque",
        importacion: "Importación de Modelos",
        iluminacion: "Iluminación y Renderizado",
        materiales: "Materiales",
        exportacion: "Exportación",
      },
    },
    glossary: {
      config: { title: "Glosario de Arquitectura 3D", subtitle: "Términos esenciales de visualización arquitectónica", tipText: "Dominar la terminología técnica es fundamental para comunicarte efectivamente con otros profesionales del diseño y la visualización.", iconEmoji: "📖" },
      terms: arquitecturaGlossary,
      categoryColors: {
        renderizado: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
        iluminacion: "bg-amber-500/15 text-amber-400 border-amber-500/20",
        materiales: "bg-violet-500/15 text-violet-400 border-violet-500/20",
        camara: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
        animacion: "bg-rose-500/15 text-rose-400 border-rose-500/20",
        exportacion: "bg-orange-500/15 text-orange-400 border-orange-500/20",
      },
      categoryLabels: {
        renderizado: "Renderizado",
        iluminacion: "Iluminación",
        materiales: "Materiales",
        camara: "Cámara",
        animacion: "Animación",
        exportacion: "Exportación",
      },
    },
  },

  programacion: {
    shortcuts: {
      config: { title: "Atajos de VS Code", subtitle: "Referencia rápida de los atajos de teclado de Visual Studio Code", tipText: "Puedes personalizar todos los atajos en VS Code: File → Preferences → Keyboard Shortcuts. También hay extensiones que añaden atajos específicos para frameworks.", iconEmoji: "⌨️" },
      categories: programacionShortcuts,
    },
    comparisons: {
      ...programacionComparison,
      config: { title: "Comparación de Frameworks Frontend", subtitle: "Análisis detallado de los principales frameworks para desarrollo web", tipText: "No existe el framework perfecto para todos los casos. Elige según las necesidades del proyecto, la experiencia del equipo y el ecosistema que mejor se adapte.", iconEmoji: "⚖️" },
    },
    troubleshooting: {
      config: { title: "Soluciones de Desarrollo Web", subtitle: "Problemas comunes y sus soluciones al programar", tipText: "La mayoría de errores de desarrollo se resuelven leyendo cuidadosamente el mensaje de error en la consola. Usa las DevTools del navegador (F12) como tu principal herramienta de diagnóstico.", iconEmoji: "🔧" },
      items: programacionTroubleshooting,
      categoryColors: {
        codigo: "bg-blue-500/15 text-blue-400 border-blue-500/20",
        estilos: "bg-violet-500/15 text-violet-400 border-violet-500/20",
        responsive: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
        entorno: "bg-amber-500/15 text-amber-400 border-amber-500/20",
        api: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
      },
      categoryLabels: {
        codigo: "Código JavaScript",
        estilos: "Estilos CSS",
        responsive: "Diseño Responsive",
        entorno: "Entorno de Desarrollo",
        api: "APIs y Servidor",
      },
    },
    glossary: {
      config: { title: "Glosario de Desarrollo Web", subtitle: "Términos esenciales para desarrollo web moderno", tipText: "El ecosistema web evoluciona constantemente. Mantente actualizado con la documentación oficial de MDN Web Docs y las release notes de los frameworks.", iconEmoji: "📖" },
      terms: programacionGlossary,
      categoryColors: {
        fundamentos: "bg-blue-500/15 text-blue-400 border-blue-500/20",
        diseno: "bg-violet-500/15 text-violet-400 border-violet-500/20",
        frameworks: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
        herramientas: "bg-amber-500/15 text-amber-400 border-amber-500/20",
        lenguajes: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
        seguridad: "bg-red-500/15 text-red-400 border-red-500/20",
      },
      categoryLabels: {
        fundamentos: "Fundamentos Web",
        diseno: "Diseño y Layout",
        frameworks: "Frameworks",
        herramientas: "Herramientas",
        lenguajes: "Lenguajes y Datos",
        seguridad: "Seguridad Web",
      },
    },
  },

  ciberseguridad: {
    shortcuts: {
      config: { title: "Atajos de Terminal Linux", subtitle: "Referencia rápida para terminal Linux y herramientas de seguridad", tipText: "Dominar los atajos de terminal acelera significativamente tu flujo de trabajo en pentesting. Practica hasta que sean automáticos.", iconEmoji: "⌨️" },
      categories: ciberseguridadShortcuts,
    },
    comparisons: {
      ...ciberseguridadComparison,
      config: { title: "Comparación de Herramientas de Pentesting", subtitle: "Análisis detallado de las principales herramientas de seguridad ofensiva", tipText: "Cada herramienta tiene su fortaleza en una fase específica del pentest. Un profesional completo domina múltiples herramientas y sabe cuándo usar cada una.", iconEmoji: "⚖️" },
    },
    troubleshooting: {
      config: { title: "Soluciones de Ciberseguridad", subtitle: "Problemas comunes en laboratorios y auditorías de seguridad", tipText: "Siempre verifica que tus herramientas estén actualizadas antes de una auditoría. Muchos errores se deben a versiones antiguas de herramientas o cambios en los sistemas objetivo.", iconEmoji: "🔧" },
      items: ciberseguridadTroubleshooting,
      categoryColors: {
        entorno: "bg-red-500/15 text-red-400 border-red-500/20",
        herramientas: "bg-amber-500/15 text-amber-400 border-amber-500/20",
        red: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
      },
      categoryLabels: {
        entorno: "Entorno y Configuración",
        herramientas: "Herramientas de Seguridad",
        red: "Redes y Conectividad",
      },
    },
    glossary: {
      config: { title: "Glosario de Ciberseguridad", subtitle: "Términos esenciales de seguridad informática y ethical hacking", tipText: "La terminología de ciberseguridad es extensa y evoluciona constantemente. Consulta MITRE ATT&CK y OWASP como referencias actualizadas.", iconEmoji: "📖" },
      terms: ciberseguridadGlossary,
      categoryColors: {
        fundamentos: "bg-red-500/15 text-red-400 border-red-500/20",
        defensa: "bg-blue-500/15 text-blue-400 border-blue-500/20",
        criptografia: "bg-violet-500/15 text-violet-400 border-violet-500/20",
        ataques: "bg-amber-500/15 text-amber-400 border-amber-500/20",
        estandares: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
        metodologias: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
      },
      categoryLabels: {
        fundamentos: "Fundamentos",
        defensa: "Defensa y Protección",
        criptografia: "Criptografía",
        ataques: "Tipos de Ataques",
        estandares: "Estándares y Frameworks",
        metodologias: "Metodologías",
      },
    },
  },

  ia: {
    shortcuts: {
      config: { title: "Atajos de Jupyter y Python", subtitle: "Referencia rápida para Jupyter Notebook, Colab y editores Python", tipText: "Jupyter permite personalizar atajos en Help → Edit Keyboard Shortcuts. En Colab, presiona Ctrl+M H para ver todos los atajos disponibles.", iconEmoji: "⌨️" },
      categories: iaShortcuts,
    },
    comparisons: {
      ...iaComparison,
      config: { title: "Comparación de Frameworks de IA/ML", subtitle: "Análisis detallado de los principales frameworks para machine learning y deep learning", tipText: "Para investigación, PyTorch es el estándar. Para producción, TensorFlow ofrece mejor ecosistema de deployment. Para principiantes, Keras o Scikit-learn son el mejor punto de partida.", iconEmoji: "⚖️" },
    },
    troubleshooting: {
      config: { title: "Soluciones de IA/ML", subtitle: "Problemas comunes en entrenamiento y despliegue de modelos", tipText: "La mayoría de problemas en ML se resuelven verificando los datos primero. Datos limpios y bien preprocesados resuelven el 80% de los problemas.", iconEmoji: "🔧" },
      items: iaTroubleshooting,
      categoryColors: {
        entrenamiento: "bg-violet-500/15 text-violet-400 border-violet-500/20",
        entorno: "bg-amber-500/15 text-amber-400 border-amber-500/20",
        codigo: "bg-blue-500/15 text-blue-400 border-blue-500/20",
      },
      categoryLabels: {
        entrenamiento: "Entrenamiento de Modelos",
        entorno: "Entorno y Configuración",
        codigo: "Código y Tensores",
      },
    },
    glossary: {
      config: { title: "Glosario de Inteligencia Artificial", subtitle: "Términos esenciales de machine learning y deep learning", tipText: "La IA avanza rápidamente. Sigue papers como ArXiv, blogs de investigación de Google/Meta/OpenAI y canales de YouTube especializados para mantenerte actualizado.", iconEmoji: "📖" },
      terms: iaGlossary,
      categoryColors: {
        fundamentos: "bg-violet-500/15 text-violet-400 border-violet-500/20",
        entrenamiento: "bg-blue-500/15 text-blue-400 border-blue-500/20",
        hiperparametros: "bg-amber-500/15 text-amber-400 border-amber-500/20",
        arquitecturas: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
        datos: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
        optimizacion: "bg-rose-500/15 text-rose-400 border-rose-500/20",
        tecnicas: "bg-orange-500/15 text-orange-400 border-orange-500/20",
        hardware: "bg-gray-500/15 text-gray-400 border-gray-500/20",
      },
      categoryLabels: {
        fundamentos: "Fundamentos de IA",
        entrenamiento: "Entrenamiento",
        hiperparametros: "Hiperparámetros",
        arquitecturas: "Arquitecturas de Red",
        datos: "Datos y Preprocesamiento",
        optimizacion: "Optimización",
        tecnicas: "Técnicas Avanzadas",
        hardware: "Hardware Acelerado",
      },
    },
  },
};

// Helper to get tools data for a category, falling back to arquitectura
export function getCategoryToolsData(categorySlug: string): CategoryToolsData {
  // Map category aliases
  const slugMap: Record<string, string> = {
    "inteligencia-artificial": "ia",
    "d5-render": "arquitectura",
    "diseno-arquitectonico-bim": "arquitectura",
    "desarrollo-web-completo": "programacion",
    "fundamentos-ciberseguridad": "ciberseguridad",
    "introduccion-inteligencia-artificial": "ia",
  };

  const resolvedSlug = slugMap[categorySlug] || categorySlug;
  return categoryToolsData[resolvedSlug] || categoryToolsData.arquitectura;
}

// Map course slugs to category slugs
export function courseSlugToCategorySlug(courseSlug: string): string {
  const map: Record<string, string> = {
    "d5-render": "arquitectura",
    "diseno-arquitectonico-bim": "arquitectura",
    "desarrollo-web-completo": "programacion",
    "fundamentos-ciberseguridad": "ciberseguridad",
    "introduccion-inteligencia-artificial": "ia",
  };
  return map[courseSlug] || "arquitectura";
}
