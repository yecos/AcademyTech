"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  GitCompare,
  CheckCircle2,
  XCircle,
  MinusCircle,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";

interface EngineData {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  tipo: string;
  tecnologia: string;
  vistaPreviaReal: boolean;
  calidadMaxima: string;
  velocidadRender: string;
  curvaAprendizaje: string;
  precio: string;
  plugins: string;
  animacion: string;
  render360: boolean;
  postProduccion: string;
  sistemaVegetacion: string;
  pros: string[];
  contras: string[];
  mejorCaso: string;
  scores: {
    calidad: number;
    velocidad: number;
    facilidad: number;
    vegetacion: number;
    animacion: number;
    precio: number;
  };
}

const engines: EngineData[] = [
  {
    name: "D5 Render",
    color: "emerald",
    bgColor: "bg-emerald-500/15",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    tipo: "Standalone",
    tecnologia: "Ray Tracing (GPU RTX)",
    vistaPreviaReal: true,
    calidadMaxima: "Alta",
    velocidadRender: "Rápida",
    curvaAprendizaje: "Baja",
    precio: "Gratis con límites / $348/año Pro",
    plugins: "SketchUp, Rhino, Revit, Archicad, 3ds Max, Blender",
    animacion: "Sí",
    render360: true,
    postProduccion: "Sí",
    sistemaVegetacion: "Avanzado",
    pros: [
      "Ray tracing en tiempo real con calidad visual excepcional",
      "Biblioteca de materiales y vegetación muy completa",
      "Curva de aprendizaje baja, interfaz intuitiva",
      "Versión gratuita funcional para uso personal",
    ],
    contras: [
      "Requiere GPU NVIDIA RTX para rendimiento óptimo",
      "Biblioteca de assets menor que Lumion",
      "Algunas funciones avanzadas solo en versión Pro",
    ],
    mejorCaso:
      "Visualización arquitectónica en tiempo real con énfasis en realismo y flujo de trabajo ágil",
    scores: {
      calidad: 90,
      velocidad: 92,
      facilidad: 88,
      vegetacion: 85,
      animacion: 80,
      precio: 85,
    },
  },
  {
    name: "Lumion",
    color: "blue",
    bgColor: "bg-blue-500/15",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-600 dark:text-blue-400",
    tipo: "Standalone",
    tecnologia: "Rasterización + Ray Tracing parcial",
    vistaPreviaReal: true,
    calidadMaxima: "Media-Alta",
    velocidadRender: "Rápida",
    curvaAprendizaje: "Baja",
    precio: "$1,599/año o $3,599 perpetuo",
    plugins: "SketchUp, Rhino, Revit, Archicad, 3ds Max",
    animacion: "Sí",
    render360: true,
    postProduccion: "Sí",
    sistemaVegetacion: "Avanzado",
    pros: [
      "Enorme biblioteca de assets, vegetación y efectos",
      "Interfaz extremadamente amigable para principiantes",
      "Excelente para renders rápidos de concepto",
      "Efectos atmosféricos y climáticos muy completos",
    ],
    contras: [
      "Precio elevado, sin versión gratuita",
      "Calidad de ray tracing inferior a D5 Render",
      "Requiere hardware potente para escenas grandes",
    ],
    mejorCaso:
      "Presentaciones rápidas de concepto arquitectónico con gran variedad de contenido predefinido",
    scores: {
      calidad: 78,
      velocidad: 85,
      facilidad: 92,
      vegetacion: 92,
      animacion: 82,
      precio: 55,
    },
  },
  {
    name: "Enscape",
    color: "purple",
    bgColor: "bg-purple-500/15",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-600 dark:text-purple-400",
    tipo: "Plugin",
    tecnologia: "Rasterización + Ray Tracing parcial",
    vistaPreviaReal: true,
    calidadMaxima: "Media",
    velocidadRender: "Rápida",
    curvaAprendizaje: "Baja",
    precio: "$599/año",
    plugins: "SketchUp, Rhino, Revit, Archicad, Vectorworks",
    animacion: "Básica",
    render360: true,
    postProduccion: "Básica",
    sistemaVegetacion: "Básico",
    pros: [
      "Integración directa dentro del software de modelado",
      "Curva de aprendizaje muy baja, sin cambio de contexto",
      "Sincronización en tiempo real con el modelo 3D",
      "Ideal para presentaciones de diseño iterativo",
    ],
    contras: [
      "Calidad visual limitada comparado con standalone",
      "Sistema de vegetación y biblioteca de assets limitados",
      "Funciones de animación y post-producción básicas",
    ],
    mejorCaso:
      "Iteración de diseño en tiempo real directamente desde el software BIM sin cambiar de aplicación",
    scores: {
      calidad: 65,
      velocidad: 90,
      facilidad: 95,
      vegetacion: 55,
      animacion: 50,
      precio: 65,
    },
  },
  {
    name: "V-Ray",
    color: "orange",
    bgColor: "bg-orange-500/15",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-600 dark:text-orange-400",
    tipo: "Plugin",
    tecnologia: "Ray Tracing CPU/GPU",
    vistaPreviaReal: false,
    calidadMaxima: "Alta",
    velocidadRender: "Lenta",
    curvaAprendizaje: "Alta",
    precio: "$740/año o $1,540 perpetuo",
    plugins: "SketchUp, Rhino, Revit, 3ds Max, Maya, Blender",
    animacion: "Sí",
    render360: true,
    postProduccion: "Sí",
    sistemaVegetacion: "No",
    pros: [
      "Calidad fotorrealista excepcional, estándar de la industria",
      "Control total sobre cada parámetro de iluminación y materiales",
      "Amplio ecosistema de plugins y soporte profesional",
      "Compositor de canales y post-producción avanzados integrados",
    ],
    contras: [
      "Tiempos de render largos, no es tiempo real",
      "Curva de aprendizaje muy alta",
      "No permite visualización interactiva fluida",
    ],
    mejorCaso:
      "Renders fotorrealistas de máxima calidad para presentaciones finales de alto nivel",
    scores: {
      calidad: 98,
      velocidad: 35,
      facilidad: 40,
      vegetacion: 30,
      animacion: 75,
      precio: 55,
    },
  },
  {
    name: "Twinmotion",
    color: "cyan",
    bgColor: "bg-cyan-500/15",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
    tipo: "Standalone",
    tecnologia: "Rasterización + Unreal Engine",
    vistaPreviaReal: true,
    calidadMaxima: "Media-Alta",
    velocidadRender: "Rápida",
    curvaAprendizaje: "Baja",
    precio: "Gratis para uso no comercial / $575/año",
    plugins: "SketchUp, Rhino, Revit, Archicad",
    animacion: "Sí",
    render360: true,
    postProduccion: "Básica",
    sistemaVegetacion: "Avanzado",
    pros: [
      "Basado en Unreal Engine, tecnología probada",
      "Gratis para uso no comercial y educación",
      "Excelente sistema de vegetación y efectos climáticos",
      "Integración con Datasmith para flujos BIM",
    ],
    contras: [
      "Calidad de materiales PBR inferior a D5 Render",
      "Interfaz menos intuitiva que D5 o Lumion",
      "Actualizaciones lentas y ecosistema de plugins reducido",
    ],
    mejorCaso:
      "Proyectos educativos y no comerciales que necesitan visualización en tiempo real con buen sistema de vegetación",
    scores: {
      calidad: 72,
      velocidad: 80,
      facilidad: 75,
      vegetacion: 88,
      animacion: 78,
      precio: 80,
    },
  },
];

const comparisonCriteria = [
  { key: "tipo", label: "Tipo" },
  { key: "tecnologia", label: "Tecnología" },
  { key: "vistaPreviaReal", label: "Vista previa en tiempo real", type: "boolean" as const },
  { key: "calidadMaxima", label: "Calidad máxima" },
  { key: "velocidadRender", label: "Velocidad de render" },
  { key: "curvaAprendizaje", label: "Curva de aprendizaje" },
  { key: "precio", label: "Precio" },
  { key: "plugins", label: "Plugins de modelado" },
  { key: "animacion", label: "Animación" },
  { key: "render360", label: "Render 360°", type: "boolean" as const },
  { key: "postProduccion", label: "Post-producción" },
  { key: "sistemaVegetacion", label: "Sistema de vegetación" },
];

function BooleanValue({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mx-auto" />
  ) : (
    <XCircle className="w-4 h-4 text-red-400/60 mx-auto" />
  );
}

function ScoreBar({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-8 text-right">
        {value}
      </span>
    </div>
  );
}

type TabKey = "tabla" | "detalles" | "puntuacion";

export default function CompararPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("tabla");

  const tabs: { key: TabKey; label: string; icon: typeof BarChart3 }[] = [
    { key: "tabla", label: "Comparación", icon: GitCompare },
    { key: "detalles", label: "Pros y Contras", icon: Lightbulb },
    { key: "puntuacion", label: "Puntuaciones", icon: BarChart3 },
  ];

  const scoreLabels: { key: keyof EngineData["scores"]; label: string }[] = [
    { key: "calidad", label: "Calidad Visual" },
    { key: "velocidad", label: "Velocidad" },
    { key: "facilidad", label: "Facilidad de Uso" },
    { key: "vegetacion", label: "Vegetación" },
    { key: "animacion", label: "Animación" },
    { key: "precio", label: "Relación Calidad/Precio" },
  ];

  const scoreColorMap: Record<string, string> = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    cyan: "bg-cyan-500",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-600/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/curso/d5-render")}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
          <div className="flex items-center gap-2">
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/20">
              <GitCompare className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Comparación de{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  Motores de Render
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                D5 Render vs Lumion vs Enscape vs V-Ray vs Twinmotion
              </p>
            </div>
          </div>
        </motion.header>

        {/* Engine color legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          {engines.map((engine) => (
            <div
              key={engine.name}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${engine.bgColor} border ${engine.borderColor}`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${scoreColorMap[engine.color]}`}
              />
              <span className={`text-xs font-medium ${engine.textColor}`}>
                {engine.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-gray-100 dark:bg-white/3 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/8 hover:bg-gray-200 dark:hover:bg-white/6 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab content */}
        {activeTab === "tabla" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Horizontal scrollable table */}
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-white/5">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur z-10">
                        Criterio
                      </th>
                      {engines.map((engine) => (
                        <th
                          key={engine.name}
                          className={`text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider ${engine.textColor}`}
                        >
                          {engine.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonCriteria.map((criteria, idx) => (
                      <tr
                        key={criteria.key}
                        className={`border-b border-gray-100 dark:border-white/3 ${
                          idx % 2 === 0 ? "bg-gray-50/50 dark:bg-white/[0.01]" : ""
                        }`}
                      >
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 font-medium sticky left-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur z-10">
                          {criteria.label}
                        </td>
                        {engines.map((engine) => (
                          <td
                            key={engine.name}
                            className="text-center px-4 py-3 text-sm text-gray-500 dark:text-gray-400"
                          >
                            {criteria.type === "boolean" ? (
                              <BooleanValue
                                value={
                                  engine[criteria.key as keyof EngineData] as boolean
                                }
                              />
                            ) : (
                              <span>
                                {engine[criteria.key as keyof EngineData] as string}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "detalles" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {engines.map((engine, engineIdx) => (
              <motion.div
                key={engine.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: engineIdx * 0.05 }}
                className={`glass-card rounded-xl p-6 border ${engine.borderColor}`}
              >
                {/* Engine header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-3 h-8 rounded-full ${scoreColorMap[engine.color]}`}
                  />
                  <h3 className={`text-lg font-bold ${engine.textColor}`}>
                    {engine.name}
                  </h3>
                  <Badge
                    className={`${engine.bgColor} ${engine.textColor} border ${engine.borderColor} text-xs`}
                  >
                    {engine.tipo}
                  </Badge>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  {/* Pros */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                      <h4 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        Ventajas
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {engine.pros.map((pro, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/70 mt-0.5 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contras */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
                      <h4 className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wider">
                        Desventajas
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {engine.contras.map((contra, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <MinusCircle className="w-3.5 h-3.5 text-red-500/70 mt-0.5 shrink-0" />
                          {contra}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best use case */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      <h4 className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        Mejor uso
                      </h4>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {engine.mejorCaso}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "puntuacion" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Overall scores */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Puntuaciones Comparativas
                </h3>
              </div>

              <div className="space-y-8">
                {scoreLabels.map((scoreLabel) => (
                  <div key={scoreLabel.key}>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                      {scoreLabel.label}
                    </h4>
                    <div className="space-y-2.5">
                      {engines.map((engine) => (
                        <div key={engine.name} className="flex items-center gap-3">
                          <span
                            className={`text-xs font-medium w-24 shrink-0 ${engine.textColor}`}
                          >
                            {engine.name}
                          </span>
                          <div className="flex-1">
                            <ScoreBar
                              value={engine.scores[scoreLabel.key]}
                              color={scoreColorMap[engine.color]}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary card */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Resumen de Recomendaciones
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {engines.map((engine) => {
                  const totalScore = Object.values(engine.scores).reduce(
                    (a, b) => a + b,
                    0
                  );
                  const avgScore = Math.round(
                    totalScore / Object.keys(engine.scores).length
                  );
                  return (
                    <div
                      key={engine.name}
                      className={`rounded-lg p-4 ${engine.bgColor} border ${engine.borderColor}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm font-bold ${engine.textColor}`}
                        >
                          {engine.name}
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {avgScore}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {engine.mejorCaso}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pb-8 text-center"
        >
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Comparación de motores de renderizado —{" "}
              <span className="text-emerald-500/70 dark:text-emerald-400/70">
                Render Academy
              </span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
