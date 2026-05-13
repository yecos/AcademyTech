"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  AlertTriangle,
  Search,
  X,
  ChevronRight,
  Zap,
  Download,
  Lightbulb,
  Palette,
  Upload,
  CircleAlert,
  CircleCheck,
  Wrench,
} from "lucide-react";

type CategoryKey =
  | "todos"
  | "instalacion"
  | "importacion"
  | "iluminacion"
  | "materiales"
  | "exportacion";

type Severity = "critico" | "moderado" | "leve";

interface TroubleshootingIssue {
  id: number;
  title: string;
  description: string;
  causes: string[];
  solutions: string[];
  category: CategoryKey;
  severity: Severity;
}

const categories: { key: CategoryKey; label: string; icon: React.ReactNode }[] = [
  { key: "todos", label: "Todos", icon: <CircleCheck className="w-3.5 h-3.5" /> },
  { key: "instalacion", label: "Instalación", icon: <Download className="w-3.5 h-3.5" /> },
  { key: "importacion", label: "Importación", icon: <Upload className="w-3.5 h-3.5" /> },
  { key: "iluminacion", label: "Iluminación", icon: <Lightbulb className="w-3.5 h-3.5" /> },
  { key: "materiales", label: "Materiales", icon: <Palette className="w-3.5 h-3.5" /> },
  { key: "exportacion", label: "Exportación", icon: <Zap className="w-3.5 h-3.5" /> },
];

const categoryColors: Record<CategoryKey, string> = {
  todos: "bg-white/10 text-gray-300 border-white/10",
  instalacion: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  importacion: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  iluminacion: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  materiales: "bg-rose-500/15 text-rose-400 border-rose-500/20",
  exportacion: "bg-orange-500/15 text-orange-400 border-orange-500/20",
};

const categoryLabels: Record<CategoryKey, string> = {
  todos: "Todos",
  instalacion: "Instalación y Arranque",
  importacion: "Importación de Modelos",
  iluminacion: "Iluminación y Renderizado",
  materiales: "Materiales",
  exportacion: "Exportación",
};

const severityConfig: Record<Severity, { label: string; color: string; icon: React.ReactNode }> = {
  critico: {
    label: "Crítico",
    color: "bg-red-500/15 text-red-400 border-red-500/25",
    icon: <CircleAlert className="w-3 h-3" />,
  },
  moderado: {
    label: "Moderado",
    color: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    icon: <AlertTriangle className="w-3 h-3" />,
  },
  leve: {
    label: "Leve",
    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    icon: <CircleCheck className="w-3 h-3" />,
  },
};

const issues: TroubleshootingIssue[] = [
  // Instalación y Arranque
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
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

export default function SolucionesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("todos");

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesCategory =
        activeCategory === "todos" || issue.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.causes.some((c) =>
          c.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        issue.solutions.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const groupedIssues = useMemo(() => {
    if (activeCategory !== "todos")
      return { [activeCategory]: filteredIssues };
    const groups: Record<string, TroubleshootingIssue[]> = {};
    for (const issue of filteredIssues) {
      if (!groups[issue.category]) groups[issue.category] = [];
      groups[issue.category].push(issue);
    }
    return groups;
  }, [filteredIssues, activeCategory]);

  const severityCounts = useMemo(() => {
    return {
      critico: filteredIssues.filter((i) => i.severity === "critico").length,
      moderado: filteredIssues.filter((i) => i.severity === "moderado").length,
      leve: filteredIssues.filter((i) => i.severity === "leve").length,
    };
  }, [filteredIssues]);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-600/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="text-gray-400 hover:text-white hover:bg-white/5 mb-6 gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/20">
              <AlertTriangle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Soluciones{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  D5 Render
                </span>
              </h1>
              <p className="text-sm text-gray-400">
                {issues.length} problemas comunes y sus soluciones
              </p>
            </div>
          </div>
        </motion.header>

        {/* Severity summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-6"
        >
          <div className="glass-card rounded-xl p-4 flex flex-wrap items-center gap-4">
            <span className="text-xs text-gray-500 font-medium">
              Severidad:
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-xs text-gray-400">
                  {severityCounts.critico} Críticos
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs text-gray-400">
                  {severityCounts.moderado} Moderados
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-gray-400">
                  {severityCounts.leve} Leves
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar problema, causa o solución..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  activeCategory === cat.key
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-white/3 text-gray-400 border-white/8 hover:bg-white/6 hover:text-gray-300"
                }`}
              >
                {cat.icon}
                {cat.label}
                {cat.key !== "todos" && (
                  <span className="ml-1 text-[10px] opacity-60">
                    {issues.filter((t) => t.category === cat.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Issues */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredIssues.length === 0 ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <Search className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  Sin resultados
                </h3>
                <p className="text-sm text-gray-400">
                  No se encontraron problemas que coincidan con tu búsqueda.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedIssues).map(
                  ([category, categoryIssues]) => (
                    <div key={category}>
                      {/* Category header */}
                      <div className="flex items-center gap-2 mb-4">
                        <Badge
                          className={`${categoryColors[category as CategoryKey]} text-xs`}
                        >
                          {categoryLabels[category as CategoryKey]}
                        </Badge>
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-xs text-gray-500">
                          {categoryIssues.length}{" "}
                          {categoryIssues.length === 1
                            ? "problema"
                            : "problemas"}
                        </span>
                      </div>

                      {/* Accordion items */}
                      <Accordion type="multiple" className="space-y-2">
                        {categoryIssues.map((issue, index) => (
                          <motion.div
                            key={issue.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.05,
                            }}
                          >
                            <AccordionItem
                              value={`issue-${issue.id}`}
                              className="glass-card rounded-xl border-0 overflow-hidden data-[state=open]:border-emerald-500/15 transition-colors duration-300"
                            >
                              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/3 transition-colors duration-200 [&[data-state=open]]:border-b [&[data-state=open]]:border-white/5">
                                <div className="flex items-center gap-3 text-left flex-1 min-w-0">
                                  <div
                                    className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${severityConfig[issue.severity].color}`}
                                  >
                                    {severityConfig[issue.severity].icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                      <h3 className="text-sm font-semibold text-white truncate">
                                        {issue.title}
                                      </h3>
                                      <Badge
                                        className={`${severityConfig[issue.severity].color} text-[9px] px-1.5 py-0 shrink-0`}
                                      >
                                        {severityConfig[issue.severity].label}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-1">
                                      {issue.description}
                                    </p>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4">
                                <div className="space-y-4 pt-2">
                                  {/* Description */}
                                  <div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                      {issue.description}
                                    </p>
                                  </div>

                                  {/* Causes */}
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <CircleAlert className="w-3.5 h-3.5 text-red-400/70" />
                                      <h4 className="text-xs font-semibold text-red-400/90 uppercase tracking-wider">
                                        Causas
                                      </h4>
                                    </div>
                                    <ul className="space-y-1.5">
                                      {issue.causes.map((cause, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-2 text-xs text-gray-400"
                                        >
                                          <ChevronRight className="w-3 h-3 text-red-400/50 shrink-0 mt-0.5" />
                                          <span>{cause}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Solutions */}
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <Wrench className="w-3.5 h-3.5 text-emerald-400/70" />
                                      <h4 className="text-xs font-semibold text-emerald-400/90 uppercase tracking-wider">
                                        Soluciones
                                      </h4>
                                    </div>
                                    <ul className="space-y-1.5">
                                      {issue.solutions.map((solution, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-2 text-xs text-gray-300"
                                        >
                                          <span className="shrink-0 w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-[9px] font-bold mt-0.5">
                                            {i + 1}
                                          </span>
                                          <span>{solution}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </motion.div>
                        ))}
                      </Accordion>
                    </div>
                  )
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tip section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-10 glass-card rounded-xl p-5 border-emerald-500/10"
        >
          <div className="flex items-start gap-3">
            <Wrench className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">
                Consejo
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Si tu problema no aparece en esta lista, asegúrate de tener la
                última versión de D5 Render instalada. Muchos errores se
                corrigen en cada actualización. También puedes consultar la{" "}
                <span className="text-emerald-400/80">
                  comunidad oficial de D5 Render
                </span>{" "}
                o contactar al soporte técnico con tu archivo de registro
                (log) para obtener ayuda personalizada.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Soluciones de la Academia D5 Render —{" "}
              <span className="text-emerald-400/70">
                {issues.length} problemas documentados
              </span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
