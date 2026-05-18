"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Award,
  BookOpen,
  Calendar,
  Download,
  Eye,
  GraduationCap,
  Loader2,
  Shield,
  Sparkles,
  Star,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────

interface CategoryInfo {
  name: string;
  slug: string;
  color: string;
}

interface CertificateData {
  id: string;
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  issuedAt: string;
  certificateUrl: string | null;
  category: CategoryInfo | null;
}

interface EligibleCourse {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  totalTopics: number;
  category: CategoryInfo | null;
}

interface CertificateDetail {
  id: string;
  studentName: string;
  courseTitle: string;
  courseDescription: string | null;
  courseLevel: string;
  courseDuration: string | null;
  courseSlug: string;
  totalModules: number;
  totalTopics: number;
  completionDate: string;
  certificateUrl: string | null;
  category: CategoryInfo | null;
}

// ── Helpers ────────────────────────────────────────────────

function formatDateES(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatShortDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getCategoryColor(color: string): string {
  return color || "#10b981";
}

// ── Certificate Preview Component ──────────────────────────

function CertificatePreview({
  detail,
  onClose,
}: {
  detail: CertificateDetail;
  onClose: () => void;
}) {
  const certRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!certRef.current) return;
    setIsDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        backgroundColor: "#09090b",
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `certificado-${detail.courseSlug}-${detail.studentName.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      window.print();
    } finally {
      setIsDownloading(false);
    }
  }, [detail.courseSlug, detail.studentName]);

  const accentColor = detail.category
    ? getCategoryColor(detail.category.color)
    : "#10b981";

  const levelLabel: Record<string, string> = {
    principiante: "Principiante",
    intermedio: "Intermedio",
    avanzado: "Avanzado",
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Vista Previa del Certificado
        </DialogTitle>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
            size="sm"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isDownloading ? "Generando..." : "Descargar PNG"}
          </Button>
        </div>
      </div>

      {/* Certificate */}
      <div ref={certRef} className="print-only-cert">
        <div
          className="relative rounded-2xl overflow-hidden p-8 sm:p-12"
          style={{
            background: "#09090b",
            border: `2px solid ${accentColor}40`,
          }}
        >
          {/* Outer decorative borders */}
          <div
            className="absolute inset-3 sm:inset-5 rounded-xl pointer-events-none"
            style={{ border: `1px solid ${accentColor}30` }}
          />
          <div
            className="absolute inset-5 sm:inset-8 rounded-lg pointer-events-none"
            style={{ border: `1px solid ${accentColor}18` }}
          />

          {/* Corner decorations */}
          <div
            className="absolute top-3 left-3 sm:top-5 sm:left-5 w-8 h-8 rounded-tl-lg"
            style={{ borderTop: `2px solid ${accentColor}80`, borderLeft: `2px solid ${accentColor}80` }}
          />
          <div
            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-8 h-8 rounded-tr-lg"
            style={{ borderTop: `2px solid ${accentColor}80`, borderRight: `2px solid ${accentColor}80` }}
          />
          <div
            className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 w-8 h-8 rounded-bl-lg"
            style={{ borderBottom: `2px solid ${accentColor}80`, borderLeft: `2px solid ${accentColor}80` }}
          />
          <div
            className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-8 h-8 rounded-br-lg"
            style={{ borderBottom: `2px solid ${accentColor}80`, borderRight: `2px solid ${accentColor}80` }}
          />

          {/* Background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: `${accentColor}0D` }}
          />

          <div className="relative text-center space-y-6">
            {/* Seal */}
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}1A)`,
                    border: `2px solid ${accentColor}66`,
                  }}
                >
                  <Shield className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: accentColor }} />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 fill-amber-400" />
                </div>
              </div>
            </div>

            {/* Academy name */}
            <div>
              <p
                className="text-xs sm:text-sm font-medium uppercase tracking-[0.3em] mb-2"
                style={{ color: `${accentColor}B3` }}
              >
                Academy Tech
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Certificado de Finalización
              </h2>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to right, transparent, ${accentColor}80)` }} />
              <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
              <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to left, transparent, ${accentColor}80)` }} />
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
              Se otorga el presente certificado a
            </p>

            {/* Student Name */}
            <div className="py-4">
              <p
                className="text-3xl sm:text-4xl font-bold"
                style={{
                  background: `linear-gradient(to right, ${accentColor}CC, ${accentColor})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {detail.studentName}
              </p>
              <div
                className="mt-3 h-0.5 w-48 sm:w-64 mx-auto"
                style={{ background: `linear-gradient(to right, transparent, ${accentColor}80, transparent)` }}
              />
            </div>

            {/* Course details */}
            <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
              Ha completado satisfactoriamente el curso{" "}
              <span className="text-white font-medium">
                {detail.courseTitle}
              </span>
              {detail.totalModules > 0 && (
                <>
                  , abarcando{" "}
                  <span className="font-medium" style={{ color: accentColor }}>
                    {detail.totalModules} módulo{detail.totalModules !== 1 ? "s" : ""}
                  </span>{" "}
                  y{" "}
                  <span className="font-medium" style={{ color: accentColor }}>
                    {detail.totalTopics} tema{detail.totalTopics !== 1 ? "s" : ""}
                  </span>
                </>
              )}
              {detail.courseLevel && (
                <>
                  {" "}de nivel{" "}
                  <span className="font-medium" style={{ color: accentColor }}>
                    {levelLabel[detail.courseLevel] || detail.courseLevel}
                  </span>
                </>
              )}
              .
            </p>

            {/* Date */}
            <div className="pt-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Fecha de finalización
              </p>
              <p className="text-sm text-gray-300 font-medium">
                {formatDateES(detail.completionDate)}
              </p>
            </div>

            {/* Bottom decoration */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="h-px w-20" style={{ background: `linear-gradient(to right, transparent, ${accentColor}50)` }} />
              <div className="w-2 h-2 rounded-full" style={{ background: `${accentColor}66` }} />
              <div className="h-px w-20" style={{ background: `linear-gradient(to left, transparent, ${accentColor}50)` }} />
            </div>

            {/* Footer */}
            <div className="pt-2">
              <p className="text-xs text-gray-500">
                Academy Tech — Plataforma de Aprendizaje Tecnológico
              </p>
              <p className="text-[10px] text-gray-600 mt-1">
                ID: {detail.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Certificate Card Component ─────────────────────────────

function CertificateCard({
  cert,
  onView,
  index,
}: {
  cert: CertificateData;
  onView: (certId: string) => void;
  index: number;
}) {
  const accentColor = cert.category
    ? getCategoryColor(cert.category.color)
    : "#10b981";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card glass-card-hover rounded-xl p-5 transition-all duration-300 group"
      style={{ borderLeft: `3px solid ${accentColor}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
              style={{ background: `${accentColor}1A` }}
            >
              <Award className="w-4 h-4" style={{ color: accentColor }} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {cert.courseTitle}
              </h3>
              {cert.category && (
                <Badge
                  className="text-[10px] px-1.5 py-0 mt-0.5 border"
                  style={{
                    background: `${accentColor}1A`,
                    color: accentColor,
                    borderColor: `${accentColor}33`,
                  }}
                >
                  {cert.category.name}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatShortDate(cert.issuedAt)}
            </span>
            <span className="flex items-center gap-1">
              <FileCheck className="w-3 h-3" />
              Completado
            </span>
          </div>
        </div>

        <Button
          onClick={() => onView(cert.id)}
          variant="ghost"
          size="sm"
          className="shrink-0 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10 gap-1.5 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">Ver Certificado</span>
        </Button>
      </div>
    </motion.div>
  );
}

// ── Eligible Course Card ───────────────────────────────────

function EligibleCourseCard({
  course,
  onGenerate,
  isGenerating,
  index,
}: {
  course: EligibleCourse;
  onGenerate: (courseId: string) => void;
  isGenerating: boolean;
  index: number;
}) {
  const accentColor = course.category
    ? getCategoryColor(course.category.color)
    : "#10b981";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card rounded-xl p-5 transition-all duration-300 border border-dashed"
      style={{ borderColor: `${accentColor}40` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
              style={{ background: `${accentColor}1A` }}
            >
              <CheckCircle2 className="w-4 h-4" style={{ color: accentColor }} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {course.courseTitle}
              </h3>
              {course.category && (
                <Badge
                  className="text-[10px] px-1.5 py-0 mt-0.5 border"
                  style={{
                    background: `${accentColor}1A`,
                    color: accentColor,
                    borderColor: `${accentColor}33`,
                  }}
                >
                  {course.category.name}
                </Badge>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Curso completado — {course.totalTopics} temas finalizados
          </p>
        </div>

        <Button
          onClick={() => onGenerate(course.courseId)}
          disabled={isGenerating}
          size="sm"
          className="shrink-0 gap-1.5 text-white"
          style={{ backgroundColor: accentColor }}
        >
          {isGenerating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Award className="w-3.5 h-3.5" />
          )}
          Generar
        </Button>
      </div>
    </motion.div>
  );
}

// ── Empty State Component ──────────────────────────────────

function EmptyState({ hasAccount }: { hasAccount: boolean }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="glass-card rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
          <GraduationCap className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {hasAccount ? "Aún no tienes certificados" : "Inicia sesión para ver tus certificados"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
          {hasAccount
            ? "Completa cursos al 100% para obtener tus certificados de finalización. ¡Cada logro cuenta!"
            : "Inicia sesión para ver tus certificados y generar nuevos al completar tus cursos."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => router.push("/")}
            className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Explorar Cursos
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="mt-8 flex items-center justify-center gap-4 text-gray-300 dark:text-gray-700">
          <Award className="w-5 h-5" />
          <Star className="w-4 h-4" />
          <Shield className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page Component ────────────────────────────────────

export default function CertificadoPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [eligibleCourses, setEligibleCourses] = useState<EligibleCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCertDetail, setSelectedCertDetail] = useState<CertificateDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Fetch certificates
  const fetchCertificates = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/certificates");
      if (!res.ok) throw new Error("Error fetching certificates");

      const data = await res.json();
      setCertificates(data.certificates || []);
      setEligibleCourses(data.eligibleCourses || []);
    } catch (err) {
      console.error("Error fetching certificates:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      fetchCertificates();
    }
  }, [authLoading, fetchCertificates]);

  // View certificate detail
  const handleViewCertificate = async (certId: string) => {
    setIsDetailLoading(true);
    setPreviewOpen(true);

    try {
      const res = await fetch(`/api/certificates/${certId}`);
      if (!res.ok) throw new Error("Error fetching certificate detail");

      const data = await res.json();
      setSelectedCertDetail(data);
    } catch (err) {
      console.error("Error fetching certificate detail:", err);
      setPreviewOpen(false);
    } finally {
      setIsDetailLoading(false);
    }
  };

  // Generate certificate
  const handleGenerateCertificate = async (courseId: string) => {
    setIsGenerating(courseId);

    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error generating certificate:", errorData);
        return;
      }

      // Refresh the list
      await fetchCertificates();
    } catch (err) {
      console.error("Error generating certificate:", err);
    } finally {
      setIsGenerating(null);
    }
  };

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-600/3 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse flex items-center gap-2 text-gray-400">
              <Award className="w-5 h-5" />
              <span className="text-sm">Cargando certificados...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const hasCertificates = certificates.length > 0;
  const hasEligible = eligibleCourses.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-600/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6">
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
                Mis{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  Certificados
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tus certificados de finalización de cursos
              </p>
            </div>
          </div>
        </motion.header>

        {/* Not authenticated */}
        {!isAuthenticated && <EmptyState hasAccount={false} />}

        {/* Authenticated but no content */}
        {isAuthenticated && !hasCertificates && !hasEligible && (
          <EmptyState hasAccount={true} />
        )}

        {/* Content */}
        {isAuthenticated && (hasCertificates || hasEligible) && (
          <div className="space-y-8">
            {/* Stats summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="inline-flex p-2 rounded-lg bg-emerald-500/10 mb-2">
                  <Award className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {certificates.length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Certificado{certificates.length !== 1 ? "s" : ""} Obtenido{certificates.length !== 1 ? "s" : ""}
                </div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="inline-flex p-2 rounded-lg bg-amber-500/10 mb-2">
                  <Star className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {eligibleCourses.length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Disponible{eligibleCourses.length !== 1 ? "s" : ""} para Generar
                </div>
              </div>
            </motion.div>

            {/* Eligible courses section */}
            {hasEligible && (
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <Star className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Cursos Completados
                  </h2>
                  <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px]">
                    {eligibleCourses.length} pendiente{eligibleCourses.length !== 1 ? "s" : ""}
                  </Badge>
                </motion.div>

                <div className="space-y-3">
                  {eligibleCourses.map((course, i) => (
                    <EligibleCourseCard
                      key={course.courseId}
                      course={course}
                      onGenerate={handleGenerateCertificate}
                      isGenerating={isGenerating === course.courseId}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Earned certificates section */}
            {hasCertificates && (
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <Award className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Certificados Obtenidos
                  </h2>
                  <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                    {certificates.length}
                  </Badge>
                </motion.div>

                <div className="space-y-3">
                  {certificates.map((cert, i) => (
                    <CertificateCard
                      key={cert.id}
                      cert={cert}
                      onView={handleViewCertificate}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
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
              Certificados — Academy Tech —{" "}
              <span className="text-emerald-500/70 dark:text-emerald-400/70">
                {certificates.length} certificado{certificates.length !== 1 ? "s" : ""} emitido{certificates.length !== 1 ? "s" : ""}
              </span>
            </p>
          </div>
        </motion.footer>
      </div>

      {/* Certificate Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent
          className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-950 border-gray-200 dark:border-white/10"
          showCloseButton={true}
        >
          {isDetailLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cargando certificado...
                </p>
              </div>
            </div>
          ) : selectedCertDetail ? (
            <CertificatePreview
              detail={selectedCertDetail}
              onClose={() => setPreviewOpen(false)}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
