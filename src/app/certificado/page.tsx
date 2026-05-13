"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Download,
  GraduationCap,
  Sparkles,
  Star,
  Shield,
} from "lucide-react";
import { useStudyStore } from "@/lib/store";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";

export default function CertificadoPage() {
  const router = useRouter();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const getOverallProgress = useStudyStore((s) => s.getOverallProgress);
  const studentName = useStudyStore((s) => s.studentName);
  const setStudentName = useStudyStore((s) => s.setStudentName);
  const completionDate = useStudyStore((s) => s.completionDate);
  const setCompletionDate = useStudyStore((s) => s.setCompletionDate);

  const overallProgress = getOverallProgress();
  const isComplete = overallProgress === 100;

  const displayName = studentName || "Nombre del Estudiante";

  const formattedDate = completionDate
    ? new Date(completionDate).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const handleDownload = useCallback(async () => {
    if (!certificateRef.current) return;

    setIsDownloading(true);

    try {
      // Use html2canvas dynamically imported
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#09090b",
        useCORS: true,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `certificado-d5-render-${displayName.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // Fallback: use window.print()
      window.print();
    } finally {
      setIsDownloading(false);
    }
  }, [displayName]);

  // Auto-set completion date if 100% but no date
  if (isComplete && !completionDate) {
    setCompletionDate(new Date().toISOString());
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-600/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
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
              <Award className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Certificado de{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  Finalización
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Completa el 100% del curso para obtener tu certificado
              </p>
            </div>
          </div>
        </motion.header>

        {!isComplete ? (
          /* Not complete - motivational message */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-card rounded-2xl p-8 text-center max-w-lg mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <GraduationCap className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                ¡Sigue avanzando!
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Completa todos los temas del curso para desbloquear tu
                certificado de finalización. Estás muy cerca de lograrlo.
              </p>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Progreso del curso
                  </span>
                  <span className="text-lg font-bold text-emerald-500 dark:text-emerald-400">
                    {overallProgress}%
                  </span>
                </div>
                <div className="relative">
                  <Progress
                    value={overallProgress}
                    className="h-3 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden"
                  />
                  <motion.div
                    className="absolute top-0 left-0 h-3 rounded-full progress-emerald"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              <Button
                onClick={() => router.push("/")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Seguir aprendiendo
              </Button>
            </div>
          </motion.div>
        ) : (
          /* Complete - show certificate */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Name input */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="studentName"
                    className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
                  >
                    Nombre del estudiante
                  </label>
                  <input
                    id="studentName"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Ingresa tu nombre completo"
                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
                  />
                </div>
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading || !studentName.trim()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2 w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" />
                  {isDownloading ? "Generando..." : "Descargar Certificado"}
                </Button>
              </div>
              {!studentName.trim() && (
                <p className="text-xs text-amber-500/80 dark:text-amber-400/80 mt-2">
                  Ingresa tu nombre para poder descargar el certificado
                </p>
              )}
            </div>

            {/* Certificate Preview */}
            <div ref={certificateRef} className="print-only-cert">
              <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/30 bg-zinc-950 p-8 sm:p-12">
                {/* Outer decorative border */}
                <div className="absolute inset-3 sm:inset-5 rounded-xl border border-emerald-500/20 pointer-events-none" />
                <div className="absolute inset-5 sm:inset-8 rounded-lg border border-emerald-500/10 pointer-events-none" />

                {/* Corner decorations */}
                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 w-8 h-8 border-t-2 border-l-2 border-emerald-400/50 rounded-tl-lg" />
                <div className="absolute top-3 right-3 sm:top-5 sm:right-5 w-8 h-8 border-t-2 border-r-2 border-emerald-400/50 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 w-8 h-8 border-b-2 border-l-2 border-emerald-400/50 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-8 h-8 border-b-2 border-r-2 border-emerald-400/50 rounded-br-lg" />

                {/* Background decorative glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative text-center space-y-6">
                  {/* Seal / Badge */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 border-2 border-emerald-400/40 flex items-center justify-center">
                        <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" />
                      </div>
                      <div className="absolute -top-1 -right-1">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 fill-amber-400" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-emerald-400/70 uppercase tracking-[0.3em] mb-2">
                      Academia
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                      Certificado de Finalización
                    </h2>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-emerald-500/50" />
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-emerald-500/50" />
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
                    Se otorga el presente certificado a
                  </p>

                  {/* Student Name */}
                  <div className="py-4">
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                      {displayName}
                    </p>
                    <div className="mt-3 h-0.5 w-48 sm:w-64 mx-auto bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                  </div>

                  {/* Description body */}
                  <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
                    Ha completado satisfactoriamente el{" "}
                    <span className="text-white font-medium">
                      Plan de Estudio Completo de D5 Render
                    </span>
                    , abarcando{" "}
                    <span className="text-emerald-400 font-medium">
                      10 módulos
                    </span>{" "}
                    y{" "}
                    <span className="text-emerald-400 font-medium">
                      60 temas
                    </span>{" "}
                    sobre visualización arquitectónica en tiempo real.
                  </p>

                  {/* Date */}
                  <div className="pt-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Fecha de finalización
                    </p>
                    <p className="text-sm text-gray-300 font-medium">
                      {formattedDate}
                    </p>
                  </div>

                  {/* Bottom decoration */}
                  <div className="flex items-center justify-center gap-3 pt-4">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-500/30" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-500/30" />
                  </div>

                  {/* Signature line */}
                  <div className="pt-2">
                    <p className="text-xs text-gray-500">
                      Academia D5 Render — Programa de Formación en
                      Visualización Arquitectónica
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
