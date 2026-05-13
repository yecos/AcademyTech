"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BookOpen,
  Search,
  X,
} from "lucide-react";

type CategoryKey =
  | "todos"
  | "renderizado"
  | "iluminacion"
  | "materiales"
  | "camara"
  | "animacion"
  | "exportacion";

interface GlossaryTerm {
  term: string;
  definition: string;
  category: CategoryKey;
}

const categories: { key: CategoryKey; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "renderizado", label: "Renderizado" },
  { key: "iluminacion", label: "Iluminación" },
  { key: "materiales", label: "Materiales" },
  { key: "camara", label: "Cámara" },
  { key: "animacion", label: "Animación" },
  { key: "exportacion", label: "Exportación" },
];

const categoryColors: Record<CategoryKey, string> = {
  todos: "bg-white/10 text-gray-300 border-white/10",
  renderizado: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  iluminacion: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  materiales: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  camara: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  animacion: "bg-rose-500/15 text-rose-400 border-rose-500/20",
  exportacion: "bg-orange-500/15 text-orange-400 border-orange-500/20",
};

const categoryLabels: Record<CategoryKey, string> = {
  todos: "Todos",
  renderizado: "Renderizado General",
  iluminacion: "Iluminación",
  materiales: "Materiales",
  camara: "Cámara",
  animacion: "Animación",
  exportacion: "Exportación",
};

const glossaryTerms: GlossaryTerm[] = [
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

export default function GlosarioPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("todos");

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((item) => {
      const matchesCategory =
        activeCategory === "todos" || item.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const groupedTerms = useMemo(() => {
    if (activeCategory !== "todos") return { [activeCategory]: filteredTerms };
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const term of filteredTerms) {
      if (!groups[term.category]) groups[term.category] = [];
      groups[term.category].push(term);
    }
    return groups;
  }, [filteredTerms, activeCategory]);

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
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Glosario{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  D5 Render
                </span>
              </h1>
              <p className="text-sm text-gray-400">
                {glossaryTerms.length} términos de renderizado 3D y D5 Render
              </p>
            </div>
          </div>
        </motion.header>

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
              placeholder="Buscar término..."
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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  activeCategory === cat.key
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-white/3 text-gray-400 border-white/8 hover:bg-white/6 hover:text-gray-300"
                }`}
              >
                {cat.label}
                {cat.key !== "todos" && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    {glossaryTerms.filter((t) => t.category === cat.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Terms */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredTerms.length === 0 ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <Search className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  Sin resultados
                </h3>
                <p className="text-sm text-gray-400">
                  No se encontraron términos que coincidan con tu búsqueda.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedTerms).map(([category, terms]) => (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge
                        className={`${categoryColors[category as CategoryKey]} text-xs`}
                      >
                        {categoryLabels[category as CategoryKey]}
                      </Badge>
                      <div className="flex-1 h-px bg-white/5" />
                      <span className="text-xs text-gray-500">
                        {terms.length} términos
                      </span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {terms.map((item, index) => (
                        <motion.div
                          key={item.term}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.03,
                          }}
                          className="glass-card glass-card-hover rounded-xl p-4 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-sm font-semibold text-white">
                              {item.term}
                            </h3>
                            <Badge
                              className={`${categoryColors[item.category]} text-[9px] px-1.5 py-0 shrink-0`}
                            >
                              {categoryLabels[item.category]}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {item.definition}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Glosario de la Academia D5 Render —{" "}
              <span className="text-emerald-400/70">
                {glossaryTerms.length} términos definidos
              </span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
