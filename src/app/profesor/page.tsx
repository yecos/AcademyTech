"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  BookOpen,
  Plus,
  Edit3,
  Send,
  Eye,
  Layers,
  Users,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  FileText,
  Sparkles,
  Trash2,
  GripVertical,
  Video,
  Home,
  X,
  Save,
  AlertCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

// ─── Types ──────────────────────────────────────────────────────

interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string | null;
  color: string;
  courseCount: number;
}

interface TeacherCourse {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon: string | null;
  level: string;
  duration: string | null;
  status: string;
  categoryId: string | null;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
    slug: string;
  } | null;
  moduleCount: number;
  topicCount: number;
  enrollmentCount: number;
  modules: {
    id: string;
    number: number;
    title: string;
    description: string | null;
    topics: { id: string }[];
  }[];
}

// ─── Status helpers ─────────────────────────────────────────────

const statusLabels: Record<string, string> = {
  draft: "Borrador",
  pending_review: "Pendiente",
  published: "Publicado",
  rejected: "Rechazado",
};

const statusColors: Record<string, string> = {
  draft: "bg-gray-500/15 text-gray-600 dark:text-gray-400 border-gray-500/20",
  pending_review: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  published: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  rejected: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
};

const statusIcons: Record<string, React.ElementType> = {
  draft: FileText,
  pending_review: Clock,
  published: CheckCircle2,
  rejected: AlertCircle,
};

const levelLabels: Record<string, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

// ─── Step types for wizard ──────────────────────────────────────

interface ModuleForm {
  id?: string;
  title: string;
  description: string;
  topics: TopicForm[];
}

interface TopicForm {
  id?: string;
  name: string;
  difficulty: string;
  estimatedTime: string;
  videoUrl: string;
  content: string;
}

interface CourseForm {
  title: string;
  description: string;
  categoryId: string;
  level: string;
  duration: string;
  icon: string;
  modules: ModuleForm[];
}

const emptyModule = (): ModuleForm => ({
  title: "",
  description: "",
  topics: [],
});

const emptyTopic = (): TopicForm => ({
  name: "",
  difficulty: "basico",
  estimatedTime: "30 min",
  videoUrl: "",
  content: "",
});

const emptyCourseForm = (): CourseForm => ({
  title: "",
  description: "",
  categoryId: "",
  level: "principiante",
  duration: "",
  icon: "📚",
  modules: [],
});

// ─── Main Component ─────────────────────────────────────────────

export default function ProfessorPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isTeacher } = useAuth();

  // Courses state
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);

  // Create wizard state
  const [activeTab, setActiveTab] = useState("mis-cursos");
  const [currentStep, setCurrentStep] = useState(1);
  const [courseForm, setCourseForm] = useState<CourseForm>(emptyCourseForm());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  // Load data
  useEffect(() => {
    async function loadData() {
      try {
        const [courseRes, catRes] = await Promise.all([
          fetch("/api/teacher/courses"),
          fetch("/api/categories"),
        ]);
        if (courseRes.ok) setCourses(await courseRes.json());
        if (catRes.ok) setCategories(await catRes.json());
      } catch (error) {
        console.error("Failed to load data:", error);
      }
      setCoursesLoading(false);
    }
    loadData();
  }, []);

  // Auth check
  if (!authLoading && (!user || !isTeacher)) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-8 text-center max-w-sm"
        >
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Acceso No Autorizado
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Necesitas ser profesor o administrador para acceder a esta página.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5"
          >
            <Home className="w-4 h-4" />
            Volver al Inicio
          </Button>
        </motion.div>
      </div>
    );
  }

  // ─── Handlers ────────────────────────────────────────────────

  const handlePublish = async (courseId: string) => {
    try {
      const res = await fetch(`/api/teacher/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "pending_review" }),
      });
      if (res.ok) {
        toast.success("Curso enviado para revisión");
        setCourses((prev) =>
          prev.map((c) =>
            c.id === courseId ? { ...c, status: "pending_review" } : c
          )
        );
      } else {
        const data = await res.json();
        toast.error(data.error || "Error al publicar");
      }
    } catch {
      toast.error("Error de conexión");
    }
  };

  const handleCreateCourse = async () => {
    if (!courseForm.title.trim()) {
      toast.error("El título del curso es obligatorio");
      return;
    }

    setIsSubmitting(true);
    try {
      // Generate slug from title
      const slug = courseForm.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const res = await fetch("/api/teacher/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug || `curso-${Date.now()}`,
          title: courseForm.title,
          description: courseForm.description || null,
          icon: courseForm.icon || null,
          categoryId: courseForm.categoryId || null,
          level: courseForm.level,
          duration: courseForm.duration || null,
          status: "draft",
        }),
      });

      if (res.ok) {
        const newCourse = await res.json();

        // Add modules with topics
        for (let i = 0; i < courseForm.modules.length; i++) {
          const mod = courseForm.modules[i];
          if (!mod.title.trim()) continue;

          const modRes = await fetch(
            `/api/teacher/courses/${newCourse.id}/modules`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                number: i + 1,
                title: mod.title,
                description: mod.description || null,
              }),
            }
          );

          if (modRes.ok) {
            const createdModule = await modRes.json();

            for (let j = 0; j < mod.topics.length; j++) {
              const topic = mod.topics[j];
              if (!topic.name.trim()) continue;

              await fetch(`/api/teacher/courses/${newCourse.id}/topics`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  moduleId: createdModule.id,
                  name: topic.name,
                  number: j + 1,
                  difficulty: topic.difficulty,
                  estimatedTime: topic.estimatedTime,
                  videoUrl: topic.videoUrl || null,
                  content: topic.content || null,
                }),
              });
            }
          }
        }

        toast.success("Curso creado exitosamente");
        setCourseForm(emptyCourseForm());
        setCurrentStep(1);
        setActiveTab("mis-cursos");

        // Reload courses
        const courseRes = await fetch("/api/teacher/courses");
        if (courseRes.ok) setCourses(await courseRes.json());
      } else {
        const data = await res.json();
        toast.error(data.error || "Error al crear curso");
      }
    } catch {
      toast.error("Error de conexión");
    }
    setIsSubmitting(false);
  };

  const handleSubmitForReview = async () => {
    if (!courseForm.title.trim()) {
      toast.error("El título del curso es obligatorio");
      return;
    }

    setIsSubmitting(true);
    try {
      const slug = courseForm.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const res = await fetch("/api/teacher/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug || `curso-${Date.now()}`,
          title: courseForm.title,
          description: courseForm.description || null,
          icon: courseForm.icon || null,
          categoryId: courseForm.categoryId || null,
          level: courseForm.level,
          duration: courseForm.duration || null,
          status: "pending_review",
        }),
      });

      if (res.ok) {
        const newCourse = await res.json();

        for (let i = 0; i < courseForm.modules.length; i++) {
          const mod = courseForm.modules[i];
          if (!mod.title.trim()) continue;

          const modRes = await fetch(
            `/api/teacher/courses/${newCourse.id}/modules`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                number: i + 1,
                title: mod.title,
                description: mod.description || null,
              }),
            }
          );

          if (modRes.ok) {
            const createdModule = await modRes.json();

            for (let j = 0; j < mod.topics.length; j++) {
              const topic = mod.topics[j];
              if (!topic.name.trim()) continue;

              await fetch(`/api/teacher/courses/${newCourse.id}/topics`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  moduleId: createdModule.id,
                  name: topic.name,
                  number: j + 1,
                  difficulty: topic.difficulty,
                  estimatedTime: topic.estimatedTime,
                  videoUrl: topic.videoUrl || null,
                  content: topic.content || null,
                }),
              });
            }
          }
        }

        toast.success("Curso enviado para revisión");
        setCourseForm(emptyCourseForm());
        setCurrentStep(1);
        setActiveTab("mis-cursos");

        const courseRes = await fetch("/api/teacher/courses");
        if (courseRes.ok) setCourses(await courseRes.json());
      } else {
        const data = await res.json();
        toast.error(data.error || "Error al crear curso");
      }
    } catch {
      toast.error("Error de conexión");
    }
    setIsSubmitting(false);
  };

  // ─── Render ──────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
              Academy Tech
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <GraduationCap className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Mi Panel de{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  Profesor
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gestiona tus cursos y crea nuevo contenido
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="mis-cursos" className="gap-1.5">
              <BookOpen className="w-4 h-4" />
              Mis Cursos
            </TabsTrigger>
            <TabsTrigger value="crear-curso" className="gap-1.5">
              <Plus className="w-4 h-4" />
              Crear Curso
            </TabsTrigger>
          </TabsList>

          {/* ─── Mis Cursos Tab ──────────────────────────────── */}
          <TabsContent value="mis-cursos">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {coursesLoading ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="glass-card rounded-2xl p-6 animate-pulse"
                    >
                      <div className="h-6 w-40 rounded bg-gray-200 dark:bg-white/5 mb-3" />
                      <div className="h-4 w-32 rounded bg-gray-200 dark:bg-white/5 mb-4" />
                      <div className="flex gap-2">
                        <div className="h-8 w-20 rounded bg-gray-200 dark:bg-white/5" />
                        <div className="h-8 w-20 rounded bg-gray-200 dark:bg-white/5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : courses.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Aún no has creado ningún curso
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    ¡Crea tu primer curso!
                  </p>
                  <Button
                    onClick={() => setActiveTab("crear-curso")}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Crear Curso
                  </Button>
                </motion.div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {courses.map((course, index) => {
                    const StatusIcon = statusIcons[course.status] || FileText;
                    return (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        className="glass-card rounded-2xl p-6 relative group"
                      >
                        {/* Status badge */}
                        <div className="absolute top-4 right-4">
                          <Badge
                            className={`${statusColors[course.status] || statusColors.draft} text-[10px] flex items-center gap-1`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {statusLabels[course.status] || course.status}
                          </Badge>
                        </div>

                        {/* Course icon */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xl shrink-0">
                            {course.icon || "📚"}
                          </div>
                          <div className="flex-1 min-w-0 pr-16">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                              {course.title}
                            </h3>
                            {course.category && (
                              <span
                                className="text-xs font-medium px-1.5 py-0.5 rounded"
                                style={{
                                  backgroundColor: `${course.category.color}15`,
                                  color: course.category.color,
                                }}
                              >
                                {course.category.icon} {course.category.name}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            {course.moduleCount} mód.
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {course.topicCount} temas
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {course.enrollmentCount} estud.
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1.5 h-8 text-xs"
                            onClick={() =>
                              router.push(`/profesor/curso/${course.id}/editar`)
                            }
                          >
                            <Edit3 className="w-3 h-3" />
                            Editar
                          </Button>
                          {course.status === "draft" && (
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 h-8 text-xs"
                              onClick={() => handlePublish(course.id)}
                            >
                              <Send className="w-3 h-3" />
                              Publicar
                            </Button>
                          )}
                          {course.status === "published" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1.5 h-8 text-xs"
                              onClick={() =>
                                router.push(`/curso/${course.slug}`)
                              }
                            >
                              <Eye className="w-3 h-3" />
                              Vista Previa
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* ─── Crear Curso Tab ─────────────────────────────── */}
          <TabsContent value="crear-curso">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <button
                      onClick={() => step < currentStep && setCurrentStep(step)}
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
                        step === currentStep
                          ? "bg-emerald-500 text-white"
                          : step < currentStep
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 cursor-pointer"
                          : "bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {step < currentStep ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        step
                      )}
                    </button>
                    {step < 4 && (
                      <div
                        className={`w-8 h-0.5 ${
                          step < currentStep
                            ? "bg-emerald-500"
                            : "bg-gray-200 dark:bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Basic Info */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card rounded-2xl p-6"
                  >
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Información Básica
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Define los datos principales de tu curso
                    </p>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Título del Curso *</Label>
                        <Input
                          id="title"
                          placeholder="Ej: Introducción a Python"
                          value={courseForm.title}
                          onChange={(e) =>
                            setCourseForm((f) => ({
                              ...f,
                              title: e.target.value,
                            }))
                          }
                          className="mt-1.5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe de qué trata tu curso..."
                          value={courseForm.description}
                          onChange={(e) =>
                            setCourseForm((f) => ({
                              ...f,
                              description: e.target.value,
                            }))
                          }
                          className="mt-1.5 min-h-[100px]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Categoría</Label>
                          <Select
                            value={courseForm.categoryId}
                            onValueChange={(v) =>
                              setCourseForm((f) => ({ ...f, categoryId: v }))
                            }
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Seleccionar categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.icon} {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Nivel</Label>
                          <Select
                            value={courseForm.level}
                            onValueChange={(v) =>
                              setCourseForm((f) => ({ ...f, level: v }))
                            }
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="principiante">
                                Principiante
                              </SelectItem>
                              <SelectItem value="intermedio">
                                Intermedio
                              </SelectItem>
                              <SelectItem value="avanzado">Avanzado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="duration">Duración</Label>
                          <Input
                            id="duration"
                            placeholder="Ej: 10 horas"
                            value={courseForm.duration}
                            onChange={(e) =>
                              setCourseForm((f) => ({
                                ...f,
                                duration: e.target.value,
                              }))
                            }
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="icon">Icono (emoji)</Label>
                          <Input
                            id="icon"
                            placeholder="📚"
                            value={courseForm.icon}
                            onChange={(e) =>
                              setCourseForm((f) => ({
                                ...f,
                                icon: e.target.value,
                              }))
                            }
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button
                        onClick={() => setCurrentStep(2)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5"
                      >
                        Siguiente
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Modules */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card rounded-2xl p-6"
                  >
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Módulos del Curso
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Agrega los módulos que compondrán tu curso
                    </p>

                    <div className="space-y-4">
                      {courseForm.modules.map((mod, modIndex) => (
                        <motion.div
                          key={modIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass-card rounded-xl p-4 border border-gray-200/50 dark:border-white/5"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-sm font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                              {modIndex + 1}
                            </div>
                            <div className="flex-1 space-y-3">
                              <Input
                                placeholder="Nombre del módulo"
                                value={mod.title}
                                onChange={(e) => {
                                  const updated = [...courseForm.modules];
                                  updated[modIndex].title = e.target.value;
                                  setCourseForm((f) => ({
                                    ...f,
                                    modules: updated,
                                  }));
                                }}
                              />
                              <Textarea
                                placeholder="Descripción del módulo (opcional)"
                                value={mod.description}
                                onChange={(e) => {
                                  const updated = [...courseForm.modules];
                                  updated[modIndex].description = e.target.value;
                                  setCourseForm((f) => ({
                                    ...f,
                                    modules: updated,
                                  }));
                                }}
                                className="min-h-[60px]"
                              />
                              <div className="text-xs text-gray-400 dark:text-gray-500">
                                {mod.topics.length} tema
                                {mod.topics.length !== 1 ? "s" : ""} agregado
                                {mod.topics.length !== 1 ? "s" : ""}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                const updated = courseForm.modules.filter(
                                  (_, i) => i !== modIndex
                                );
                                setCourseForm((f) => ({
                                  ...f,
                                  modules: updated,
                                }));
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}

                      <Button
                        variant="outline"
                        onClick={() => {
                          setCourseForm((f) => ({
                            ...f,
                            modules: [...f.modules, emptyModule()],
                          }));
                        }}
                        className="w-full gap-1.5 border-dashed"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar Módulo
                      </Button>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="gap-1.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Anterior
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(3)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5"
                      >
                        Siguiente
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Topics */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card rounded-2xl p-6"
                  >
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Temas de los Módulos
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Agrega temas a cada módulo con contenido y recursos
                    </p>

                    {courseForm.modules.length === 0 ? (
                      <div className="text-center py-8">
                        <Layers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Primero necesitas agregar módulos en el paso anterior
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(2)}
                          className="mt-4 gap-1.5"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Ir a Módulos
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {courseForm.modules.map((mod, modIndex) => (
                          <div
                            key={modIndex}
                            className="glass-card rounded-xl border border-gray-200/50 dark:border-white/5 overflow-hidden"
                          >
                            <button
                              onClick={() =>
                                setExpandedModule(
                                  expandedModule === modIndex
                                    ? null
                                    : modIndex
                                )
                              }
                              className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                            >
                              <ChevronRight
                                className={`w-4 h-4 text-gray-400 transition-transform ${
                                  expandedModule === modIndex
                                    ? "rotate-90"
                                    : ""
                                }`}
                              />
                              <div className="flex items-center justify-center w-6 h-6 rounded bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                {modIndex + 1}
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white flex-1 text-left">
                                {mod.title || `Módulo ${modIndex + 1}`}
                              </span>
                              <Badge className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/8 text-[10px]">
                                {mod.topics.length} tema
                                {mod.topics.length !== 1 ? "s" : ""}
                              </Badge>
                            </button>

                            <AnimatePresence>
                              {expandedModule === modIndex && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: "auto" }}
                                  exit={{ height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 space-y-3 border-t border-gray-100 dark:border-white/5 pt-3">
                                    {mod.topics.map((topic, topicIndex) => (
                                      <div
                                        key={topicIndex}
                                        className="glass-card rounded-lg p-3 border border-gray-200/30 dark:border-white/3"
                                      >
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Tema {topicIndex + 1}
                                          </span>
                                          <button
                                            onClick={() => {
                                              const updated = [
                                                ...courseForm.modules,
                                              ];
                                              updated[modIndex].topics =
                                                updated[
                                                  modIndex
                                                ].topics.filter(
                                                  (_, i) => i !== topicIndex
                                                );
                                              setCourseForm((f) => ({
                                                ...f,
                                                modules: updated,
                                              }));
                                            }}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                          >
                                            <X className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                        <div className="space-y-2">
                                          <Input
                                            placeholder="Nombre del tema"
                                            value={topic.name}
                                            onChange={(e) => {
                                              const updated = [
                                                ...courseForm.modules,
                                              ];
                                              updated[modIndex].topics[
                                                topicIndex
                                              ].name = e.target.value;
                                              setCourseForm((f) => ({
                                                ...f,
                                                modules: updated,
                                              }));
                                            }}
                                            className="text-sm h-8"
                                          />
                                          <div className="grid grid-cols-2 gap-2">
                                            <Select
                                              value={topic.difficulty}
                                              onValueChange={(v) => {
                                                const updated = [
                                                  ...courseForm.modules,
                                                ];
                                                updated[modIndex].topics[
                                                  topicIndex
                                                ].difficulty = v;
                                                setCourseForm((f) => ({
                                                  ...f,
                                                  modules: updated,
                                                }));
                                              }}
                                            >
                                              <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="basico">
                                                  Básico
                                                </SelectItem>
                                                <SelectItem value="intermedio">
                                                  Intermedio
                                                </SelectItem>
                                                <SelectItem value="avanzado">
                                                  Avanzado
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                            <Input
                                              placeholder="Tiempo estimado"
                                              value={topic.estimatedTime}
                                              onChange={(e) => {
                                                const updated = [
                                                  ...courseForm.modules,
                                                ];
                                                updated[modIndex].topics[
                                                  topicIndex
                                                ].estimatedTime = e.target.value;
                                                setCourseForm((f) => ({
                                                  ...f,
                                                  modules: updated,
                                                }));
                                              }}
                                              className="h-8 text-xs"
                                            />
                                          </div>
                                          <Input
                                            placeholder="URL del video (YouTube, Vimeo)"
                                            value={topic.videoUrl}
                                            onChange={(e) => {
                                              const updated = [
                                                ...courseForm.modules,
                                              ];
                                              updated[modIndex].topics[
                                                topicIndex
                                              ].videoUrl = e.target.value;
                                              setCourseForm((f) => ({
                                                ...f,
                                                modules: updated,
                                              }));
                                            }}
                                            className="h-8 text-xs"
                                          />
                                          <Textarea
                                            placeholder="Contenido del tema (soporta Markdown)"
                                            value={topic.content}
                                            onChange={(e) => {
                                              const updated = [
                                                ...courseForm.modules,
                                              ];
                                              updated[modIndex].topics[
                                                topicIndex
                                              ].content = e.target.value;
                                              setCourseForm((f) => ({
                                                ...f,
                                                modules: updated,
                                              }));
                                            }}
                                            className="text-xs min-h-[60px]"
                                          />
                                        </div>
                                      </div>
                                    ))}
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        const updated = [
                                          ...courseForm.modules,
                                        ];
                                        updated[modIndex].topics.push(
                                          emptyTopic()
                                        );
                                        setCourseForm((f) => ({
                                          ...f,
                                          modules: updated,
                                        }));
                                      }}
                                      className="w-full gap-1.5 border-dashed h-8 text-xs"
                                    >
                                      <Plus className="w-3 h-3" />
                                      Agregar Tema
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                        className="gap-1.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Anterior
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(4)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5"
                      >
                        Siguiente
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card rounded-2xl p-6"
                  >
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Revisar y Enviar
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Verifica la información antes de crear tu curso
                    </p>

                    <div className="space-y-4">
                      {/* Basic Info Summary */}
                      <div className="glass-card rounded-xl p-4 border border-gray-200/50 dark:border-white/5">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-emerald-500" />
                          Información Básica
                        </h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">
                              Título:
                            </span>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {courseForm.title || "—"}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">
                              Nivel:
                            </span>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {levelLabels[courseForm.level] || courseForm.level}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">
                              Categoría:
                            </span>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {categories.find(
                                (c) => c.id === courseForm.categoryId
                              )?.name || "—"}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">
                              Duración:
                            </span>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {courseForm.duration || "—"}
                            </p>
                          </div>
                        </div>
                        {courseForm.description && (
                          <div className="mt-3">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Descripción:
                            </span>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                              {courseForm.description}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Modules Summary */}
                      <div className="glass-card rounded-xl p-4 border border-gray-200/50 dark:border-white/5">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-emerald-500" />
                          Estructura del Curso
                        </h3>
                        {courseForm.modules.length === 0 ? (
                          <p className="text-sm text-gray-400 dark:text-gray-500">
                            No se han agregado módulos
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {courseForm.modules.map((mod, modIndex) => (
                              <div
                                key={modIndex}
                                className="flex items-center gap-2 text-sm"
                              >
                                <span className="flex items-center justify-center w-5 h-5 rounded bg-emerald-500/10 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                  {modIndex + 1}
                                </span>
                                <span className="text-gray-700 dark:text-gray-300 font-medium">
                                  {mod.title || `Módulo ${modIndex + 1}`}
                                </span>
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                  ({mod.topics.length} temas)
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="glass-card rounded-xl p-3 text-center border border-gray-200/50 dark:border-white/5">
                          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {courseForm.modules.length}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Módulos
                          </div>
                        </div>
                        <div className="glass-card rounded-xl p-3 text-center border border-gray-200/50 dark:border-white/5">
                          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {courseForm.modules.reduce(
                              (sum, m) => sum + m.topics.length,
                              0
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Temas
                          </div>
                        </div>
                        <div className="glass-card rounded-xl p-3 text-center border border-gray-200/50 dark:border-white/5">
                          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {courseForm.icon}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Icono
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(3)}
                        className="gap-1.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Anterior
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={handleCreateCourse}
                          disabled={isSubmitting}
                          className="gap-1.5"
                        >
                          <Save className="w-4 h-4" />
                          Guardar Borrador
                        </Button>
                        <Button
                          onClick={handleSubmitForReview}
                          disabled={isSubmitting}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5"
                        >
                          <Send className="w-4 h-4" />
                          Enviar para Revisión
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
