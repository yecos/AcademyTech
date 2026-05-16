"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  ChevronDown,
  Sparkles,
  Trash2,
  Video,
  Home,
  Save,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  ArrowLeft,
  Paperclip,
  ExternalLink,
  Menu,
  X,
  Download,
  Wand2,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/hooks/use-auth";
import { AIAssistant } from "@/components/AIAssistant";
import { toast } from "sonner";

// ─── Types ──────────────────────────────────────────────────────

interface TopicData {
  id: string;
  name: string;
  number: number;
  difficulty: string;
  estimatedTime: string;
  videoUrl: string | null;
  content: string | null;
  attachments: string | null;
}

interface ModuleData {
  id: string;
  number: number;
  title: string;
  description: string | null;
  topics: TopicData[];
}

interface CourseData {
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
  modules: ModuleData[];
}

interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  icon: string;
  color: string;
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

const difficultyLabels: Record<string, string> = {
  basico: "Básico",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

const levelLabels: Record<string, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

// ─── Attachment helper ──────────────────────────────────────────

interface Attachment {
  name: string;
  url: string;
}

function parseAttachments(raw: string | null): Attachment[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function stringifyAttachments(list: Attachment[]): string {
  return JSON.stringify(list);
}

// ─── YouTube embed helper ───────────────────────────────────────

function getYouTubeEmbedUrl(url: string): string | null {
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch)
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return null;
}

// ─── Main Component ─────────────────────────────────────────────

export default function CourseEditorPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const { user, isLoading: authLoading, isTeacher } = useAuth();

  const [course, setCourse] = useState<CourseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);

  // Editor state
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Topic edit form
  const [topicForm, setTopicForm] = useState<{
    name: string;
    difficulty: string;
    estimatedTime: string;
    videoUrl: string;
    content: string;
    attachments: Attachment[];
  }>({
    name: "",
    difficulty: "basico",
    estimatedTime: "30 min",
    videoUrl: "",
    content: "",
    attachments: [],
  });

  // Course basic info
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseLevel, setCourseLevel] = useState("principiante");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseIcon, setCourseIcon] = useState("📚");
  const [courseCategoryId, setCourseCategoryId] = useState("");

  // New module form
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleDesc, setNewModuleDesc] = useState("");
  const [showNewModuleForm, setShowNewModuleForm] = useState(false);

  // New topic form
  const [newTopicName, setNewTopicName] = useState("");
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [newTopicModuleId, setNewTopicModuleId] = useState<string | null>(null);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "module" | "topic";
    id: string;
    name: string;
  } | null>(null);

  // Select a topic and populate the form
  const selectTopic = (topicId: string, courseData?: CourseData) => {
    setSelectedTopicId(topicId);
    const source = courseData || course;
    if (!source) return;
    const topic = source.modules
      .flatMap((m) => m.topics)
      .find((t) => t.id === topicId);
    if (topic) {
      setTopicForm({
        name: topic.name,
        difficulty: topic.difficulty,
        estimatedTime: topic.estimatedTime,
        videoUrl: topic.videoUrl || "",
        content: topic.content || "",
        attachments: parseAttachments(topic.attachments),
      });
    }
  };

  // Load course data
  useEffect(() => {
    async function loadData() {
      try {
        const [courseRes, catRes] = await Promise.all([
          fetch(`/api/teacher/courses/${courseId}`),
          fetch("/api/categories"),
        ]);

        if (courseRes.ok) {
          const data: CourseData = await courseRes.json();
          setCourse(data);
          setCourseTitle(data.title);
          setCourseDescription(data.description || "");
          setCourseLevel(data.level);
          setCourseDuration(data.duration || "");
          setCourseIcon(data.icon || "📚");
          setCourseCategoryId(data.categoryId || "");

          // Auto-select first module/topic
          if (data.modules.length > 0) {
            setSelectedModuleId(data.modules[0].id);
            if (data.modules[0].topics.length > 0) {
              selectTopic(data.modules[0].topics[0].id, data);
            }
          }
        } else {
          toast.error("Curso no encontrado");
          router.push("/profesor");
        }

        if (catRes.ok) {
          setCategories(await catRes.json());
        }
      } catch (error) {
        console.error("Failed to load course:", error);
        toast.error("Error al cargar el curso");
      }
      setIsLoading(false);
    }
    loadData();
  }, [courseId, router]);

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

  const handleSaveCourse = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/teacher/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: courseTitle,
          description: courseDescription || null,
          level: courseLevel,
          duration: courseDuration || null,
          icon: courseIcon || null,
          categoryId: courseCategoryId || null,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCourse(updated);
        toast.success("Curso guardado");
      } else {
        const data = await res.json();
        toast.error(data.error || "Error al guardar");
      }
    } catch {
      toast.error("Error de conexión");
    }
    setIsSaving(false);
  };

  const handleSaveTopic = async () => {
    if (!selectedTopicId) return;
    setIsSaving(true);
    try {
      // Find the module this topic belongs to
      let topicModuleId = "";
      for (const mod of course?.modules || []) {
        if (mod.topics.find((t) => t.id === selectedTopicId)) {
          topicModuleId = mod.id;
          break;
        }
      }

      const res = await fetch(`/api/teacher/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modules: [
            {
              id: topicModuleId,
              topics: [
                {
                  id: selectedTopicId,
                  name: topicForm.name,
                  difficulty: topicForm.difficulty,
                  estimatedTime: topicForm.estimatedTime,
                  videoUrl: topicForm.videoUrl || null,
                  content: topicForm.content || null,
                  attachments: stringifyAttachments(topicForm.attachments),
                },
              ],
            },
          ],
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCourse(updated);
        toast.success("Tema guardado");
      } else {
        const data = await res.json();
        toast.error(data.error || "Error al guardar tema");
      }
    } catch {
      toast.error("Error de conexión");
    }
    setIsSaving(false);
  };

  const handlePublishCourse = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/teacher/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "pending_review" }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCourse(updated);
        toast.success("Curso enviado para revisión");
      } else {
        const data = await res.json();
        toast.error(data.error || "Error al publicar");
      }
    } catch {
      toast.error("Error de conexión");
    }
    setIsSaving(false);
  };

  const handleAddModule = async () => {
    if (!newModuleName.trim()) return;
    setIsSaving(true);
    try {
      const res = await fetch(
        `/api/teacher/courses/${courseId}/modules`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newModuleName,
            description: newModuleDesc || null,
          }),
        }
      );
      if (res.ok) {
        toast.success("Módulo agregado");
        setNewModuleName("");
        setNewModuleDesc("");
        setShowNewModuleForm(false);
        // Reload course
        const courseRes = await fetch(`/api/teacher/courses/${courseId}`);
        if (courseRes.ok) setCourse(await courseRes.json());
      } else {
        const data = await res.json();
        toast.error(data.error || "Error al agregar módulo");
      }
    } catch {
      toast.error("Error de conexión");
    }
    setIsSaving(false);
  };

  const handleAddTopic = async () => {
    if (!newTopicName.trim() || !newTopicModuleId) return;
    setIsSaving(true);
    try {
      const res = await fetch(
        `/api/teacher/courses/${courseId}/topics`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            moduleId: newTopicModuleId,
            name: newTopicName,
            difficulty: "basico",
            estimatedTime: "30 min",
          }),
        }
      );
      if (res.ok) {
        toast.success("Tema agregado");
        setNewTopicName("");
        setShowNewTopicForm(false);
        const courseRes = await fetch(`/api/teacher/courses/${courseId}`);
        if (courseRes.ok) {
          const updated = await courseRes.json();
          setCourse(updated);
          // Select the new topic
          const mod = updated.modules.find(
            (m: ModuleData) => m.id === newTopicModuleId
          );
          if (mod && mod.topics.length > 0) {
            selectTopic(mod.topics[mod.topics.length - 1].id, updated);
          }
        }
      } else {
        const data = await res.json();
        toast.error(data.error || "Error al agregar tema");
      }
    } catch {
      toast.error("Error de conexión");
    }
    setIsSaving(false);
  };

  const handleDeleteModule = async (moduleId: string) => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/teacher/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modules: [{ id: moduleId, _delete: true }],
        }),
      });
      if (res.ok) {
        toast.success("Módulo eliminado");
        if (selectedModuleId === moduleId) {
          setSelectedModuleId(null);
          setSelectedTopicId(null);
        }
        const courseRes = await fetch(`/api/teacher/courses/${courseId}`);
        if (courseRes.ok) setCourse(await courseRes.json());
      } else {
        toast.error("Error al eliminar módulo");
      }
    } catch {
      toast.error("Error de conexión");
    }
    setIsSaving(false);
    setDeleteTarget(null);
  };

  const handleDeleteTopic = async (topicId: string) => {
    // Find which module this topic belongs to
    let moduleId = "";
    for (const mod of course?.modules || []) {
      if (mod.topics.find((t) => t.id === topicId)) {
        moduleId = mod.id;
        break;
      }
    }
    if (!moduleId) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/teacher/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modules: [
            {
              id: moduleId,
              topics: [{ id: topicId, _delete: true }],
            },
          ],
        }),
      });
      if (res.ok) {
        toast.success("Tema eliminado");
        if (selectedTopicId === topicId) {
          setSelectedTopicId(null);
        }
        const courseRes = await fetch(`/api/teacher/courses/${courseId}`);
        if (courseRes.ok) setCourse(await courseRes.json());
      } else {
        toast.error("Error al eliminar tema");
      }
    } catch {
      toast.error("Error de conexión");
    }
    setIsSaving(false);
    setDeleteTarget(null);
  };

  const addAttachment = () => {
    setTopicForm((f) => ({
      ...f,
      attachments: [...f.attachments, { name: "", url: "" }],
    }));
  };

  const removeAttachment = (index: number) => {
    setTopicForm((f) => ({
      ...f,
      attachments: f.attachments.filter((_, i) => i !== index),
    }));
  };

  const updateAttachment = (
    index: number,
    field: "name" | "url",
    value: string
  ) => {
    setTopicForm((f) => ({
      ...f,
      attachments: f.attachments.map((a, i) =>
        i === index ? { ...a, [field]: value } : a
      ),
    }));
  };

  // ─── Selected topic data ────────────────────────────────────

  const selectedTopic = course?.modules
    .flatMap((m) => m.topics)
    .find((t) => t.id === selectedTopicId);

  const videoEmbedUrl = topicForm.videoUrl
    ? getYouTubeEmbedUrl(topicForm.videoUrl)
    : null;

  // ─── Loading state ──────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Cargando curso...
          </p>
        </div>
      </div>
    );
  }

  if (!course) return null;

  // ─── Render ──────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-gray-50/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/profesor")}
                className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Volver</span>
              </button>
              <div className="h-4 w-px bg-gray-200 dark:bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-lg">{course.icon || "📚"}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
                  {course.title}
                </span>
              </div>
              <Badge
                className={`${statusColors[course.status] || statusColors.draft} text-[10px]`}
              >
                {statusLabels[course.status] || course.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleSaveCourse}
                disabled={isSaving}
                className="gap-1.5 h-8 text-xs"
              >
                <Save className="w-3 h-3" />
                Guardar
              </Button>
              {course.status === "draft" && (
                <Button
                  size="sm"
                  onClick={handlePublishCourse}
                  disabled={isSaving}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 h-8 text-xs"
                >
                  <Send className="w-3 h-3" />
                  Publicar
                </Button>
              )}
              {course.status === "published" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push(`/curso/${course.slug}`)}
                  className="gap-1.5 h-8 text-xs"
                >
                  <Eye className="w-3 h-3" />
                  Vista Previa
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  window.open(`/api/export/course/${courseId}`, '_blank');
                }}
                className="gap-1.5 h-8 text-xs"
              >
                <Download className="w-3 h-3" />
                PDF
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Left Sidebar - Module/Topic tree */}
            <div
              className={`${
                sidebarOpen ? "w-72" : "w-0 overflow-hidden"
              } shrink-0 transition-all duration-300 hidden lg:block`}
            >
              <div className="glass-card rounded-2xl p-4 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Estructura
                  </h3>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => setShowNewModuleForm(true)}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* New Module Form */}
                <AnimatePresence>
                  {showNewModuleForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20"
                    >
                      <Input
                        placeholder="Nombre del módulo"
                        value={newModuleName}
                        onChange={(e) => setNewModuleName(e.target.value)}
                        className="h-7 text-xs mb-2"
                      />
                      <Input
                        placeholder="Descripción (opcional)"
                        value={newModuleDesc}
                        onChange={(e) => setNewModuleDesc(e.target.value)}
                        className="h-7 text-xs mb-2"
                      />
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={handleAddModule}
                          disabled={isSaving || !newModuleName.trim()}
                          className="h-7 text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex-1"
                        >
                          Agregar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowNewModuleForm(false)}
                          className="h-7 text-xs"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Module list */}
                <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                  {course.modules.map((mod) => (
                    <div key={mod.id}>
                      <div
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${
                          selectedModuleId === mod.id
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                        }`}
                        onClick={() => {
                          setSelectedModuleId(mod.id);
                          if (
                            selectedModuleId !== mod.id &&
                            mod.topics.length > 0
                          ) {
                            selectTopic(mod.topics[0].id);
                          } else {
                            setSelectedTopicId(null);
                          }
                        }}
                      >
                        <ChevronRight
                          className={`w-3 h-3 transition-transform ${
                            selectedModuleId === mod.id ? "rotate-90" : ""
                          }`}
                        />
                        <span className="text-xs font-medium flex-1 truncate">
                          {mod.number}. {mod.title}
                        </span>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all p-0.5"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ¿Eliminar módulo?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Se eliminará el módulo &quot;{mod.title}&quot; y
                                todos sus temas. Esta acción no se puede
                                deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteModule(mod.id)}
                                className="bg-red-600 hover:bg-red-500 text-white"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      {/* Topics under module */}
                      <AnimatePresence>
                        {selectedModuleId === mod.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-5 space-y-0.5 border-l border-gray-200 dark:border-white/10 pl-2"
                          >
                            {mod.topics.map((topic) => (
                              <div
                                key={topic.id}
                                className={`flex items-center gap-2 px-2 py-1 rounded text-xs cursor-pointer transition-colors ${
                                  selectedTopicId === topic.id
                                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-medium"
                                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                                }`}
                                onClick={() => selectTopic(topic.id)}
                              >
                                <BookOpen className="w-3 h-3 shrink-0" />
                                <span className="truncate flex-1">
                                  {topic.name}
                                </span>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                setNewTopicModuleId(mod.id);
                                setShowNewTopicForm(true);
                              }}
                              className="flex items-center gap-1 px-2 py-1 text-xs text-emerald-500 dark:text-emerald-400 hover:bg-emerald-500/5 rounded cursor-pointer w-full transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              Agregar tema
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {course.modules.length === 0 && (
                    <div className="text-center py-4">
                      <Layers className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Sin módulos aún
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile sidebar toggle */}
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg glass-card hover:bg-gray-100 dark:hover:bg-white/5 transition-colors shrink-0"
              >
                <Menu className="w-4 h-4 text-gray-500" />
              </button>
            )}

            {/* Right side - Edit form */}
            <div className="flex-1 min-w-0">
              {/* Course basic info (when no topic selected) */}
              {!selectedTopicId && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    Información del Curso
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Edita los datos principales del curso
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="course-title">Título</Label>
                        <Input
                          id="course-title"
                          value={courseTitle}
                          onChange={(e) => setCourseTitle(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="course-icon">Icono (emoji)</Label>
                        <Input
                          id="course-icon"
                          value={courseIcon}
                          onChange={(e) => setCourseIcon(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="course-desc">Descripción</Label>
                        <button
                          onClick={() => {
                            const aiBtn = document.querySelector('[data-ai-trigger]') as HTMLElement;
                            if (aiBtn) aiBtn.click();
                          }}
                          className="flex items-center gap-1 text-[10px] text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300 transition-colors"
                        >
                          <Wand2 className="w-3 h-3" />
                          Generar con IA
                        </button>
                      </div>
                      <Textarea
                        id="course-desc"
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        className="mt-1.5 min-h-[80px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label>Categoría</Label>
                        <Select
                          value={courseCategoryId}
                          onValueChange={setCourseCategoryId}
                        >
                          <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Seleccionar" />
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
                          value={courseLevel}
                          onValueChange={setCourseLevel}
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
                      <div>
                        <Label htmlFor="course-duration">Duración</Label>
                        <Input
                          id="course-duration"
                          value={courseDuration}
                          onChange={(e) => setCourseDuration(e.target.value)}
                          className="mt-1.5"
                          placeholder="Ej: 10 horas"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleSaveCourse}
                        disabled={isSaving}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        Guardar Cambios
                      </Button>
                    </div>
                  </div>

                  {/* Module & Topic overview for mobile */}
                  <div className="mt-8 lg:hidden">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Módulos y Temas
                    </h3>
                    <div className="space-y-2">
                      {course.modules.map((mod) => (
                        <div
                          key={mod.id}
                          className="glass-card rounded-xl p-3 border border-gray-200/50 dark:border-white/5"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {mod.number}. {mod.title}
                            </span>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button className="text-gray-400 hover:text-red-500 transition-colors">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Eliminar módulo?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Se eliminará el módulo &quot;{mod.title}
                                    &quot; y todos sus temas.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteModule(mod.id)}
                                    className="bg-red-600 hover:bg-red-500 text-white"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                          <div className="space-y-1 ml-3">
                            {mod.topics.map((topic) => (
                              <div
                                key={topic.id}
                                className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:text-emerald-500 transition-colors"
                                onClick={() => {
                                  setSelectedModuleId(mod.id);
                                  selectTopic(topic.id);
                                }}
                              >
                                <BookOpen className="w-3 h-3" />
                                {topic.name}
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                setNewTopicModuleId(mod.id);
                                setShowNewTopicForm(true);
                              }}
                              className="flex items-center gap-1 text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              Agregar tema
                            </button>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => setShowNewModuleForm(true)}
                        className="w-full gap-1.5 border-dashed h-8 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                        Agregar Módulo
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Topic Editor */}
              {selectedTopicId && selectedTopic && (
                <motion.div
                  key={selectedTopicId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Topic header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedTopicId(null)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors lg:hidden"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Editar Tema
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/5 gap-1.5 h-8 text-xs"
                          >
                            <Trash2 className="w-3 h-3" />
                            Eliminar
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              ¿Eliminar este tema?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Se eliminará el tema &quot;{selectedTopic.name}
                              &quot;. Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteTopic(selectedTopicId)}
                              className="bg-red-600 hover:bg-red-500 text-white"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button
                        size="sm"
                        onClick={handleSaveTopic}
                        disabled={isSaving}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 h-8 text-xs"
                      >
                        <Save className="w-3 h-3" />
                        Guardar
                      </Button>
                    </div>
                  </div>

                  {/* Topic form */}
                  <div className="glass-card rounded-2xl p-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="topic-name">Nombre del Tema</Label>
                        <Input
                          id="topic-name"
                          value={topicForm.name}
                          onChange={(e) =>
                            setTopicForm((f) => ({
                              ...f,
                              name: e.target.value,
                            }))
                          }
                          className="mt-1.5"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Dificultad</Label>
                          <Select
                            value={topicForm.difficulty}
                            onValueChange={(v) =>
                              setTopicForm((f) => ({ ...f, difficulty: v }))
                            }
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basico">Básico</SelectItem>
                              <SelectItem value="intermedio">
                                Intermedio
                              </SelectItem>
                              <SelectItem value="avanzado">Avanzado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="topic-time">Tiempo Estimado</Label>
                          <Input
                            id="topic-time"
                            value={topicForm.estimatedTime}
                            onChange={(e) =>
                              setTopicForm((f) => ({
                                ...f,
                                estimatedTime: e.target.value,
                              }))
                            }
                            className="mt-1.5"
                            placeholder="Ej: 30 min"
                          />
                        </div>
                      </div>

                      {/* Video URL */}
                      <div>
                        <Label
                          htmlFor="topic-video"
                          className="flex items-center gap-1.5"
                        >
                          <Video className="w-3.5 h-3.5" />
                          URL del Video
                        </Label>
                        <Input
                          id="topic-video"
                          value={topicForm.videoUrl}
                          onChange={(e) =>
                            setTopicForm((f) => ({
                              ...f,
                              videoUrl: e.target.value,
                            }))
                          }
                          className="mt-1.5"
                          placeholder="https://youtube.com/watch?v=... o https://vimeo.com/..."
                        />
                        {/* Video preview */}
                        {videoEmbedUrl && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 rounded-xl overflow-hidden border border-gray-200/50 dark:border-white/5"
                          >
                            <div className="relative w-full pt-[56.25%]">
                              <iframe
                                src={videoEmbedUrl}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Video preview"
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="topic-content"
                            className="flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Contenido (Markdown)
                          </Label>
                          <button
                            onClick={() => {
                              const aiBtn = document.querySelector('[data-ai-trigger]') as HTMLElement;
                              if (aiBtn) aiBtn.click();
                            }}
                            className="flex items-center gap-1 text-[10px] text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300 transition-colors"
                          >
                            <Wand2 className="w-3 h-3" />
                            Generar con IA
                          </button>
                        </div>
                        <Textarea
                          id="topic-content"
                          value={topicForm.content}
                          onChange={(e) =>
                            setTopicForm((f) => ({
                              ...f,
                              content: e.target.value,
                            }))
                          }
                          className="mt-1.5 min-h-[200px] font-mono text-sm"
                          placeholder="Escribe el contenido del tema aquí. Soporta Markdown: **negrita**, *cursiva*, `código`, etc."
                        />
                      </div>

                      {/* Attachments */}
                      <div>
                        <Label className="flex items-center gap-1.5 mb-3">
                          <Paperclip className="w-3.5 h-3.5" />
                          Adjuntos
                        </Label>
                        <div className="space-y-2">
                          {topicForm.attachments.map((att, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Input
                                placeholder="Nombre del archivo"
                                value={att.name}
                                onChange={(e) =>
                                  updateAttachment(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                                className="h-8 text-xs flex-1"
                              />
                              <Input
                                placeholder="URL del archivo"
                                value={att.url}
                                onChange={(e) =>
                                  updateAttachment(
                                    index,
                                    "url",
                                    e.target.value
                                  )
                                }
                                className="h-8 text-xs flex-1"
                              />
                              {att.url && (
                                <a
                                  href={att.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="shrink-0"
                                >
                                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 hover:text-emerald-500 transition-colors" />
                                </a>
                              )}
                              <button
                                onClick={() => removeAttachment(index)}
                                className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addAttachment}
                            className="gap-1.5 border-dashed h-7 text-xs w-full"
                          >
                            <Plus className="w-3 h-3" />
                            Agregar Adjunto
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New Topic Dialog */}
      <AlertDialog
        open={showNewTopicForm}
        onOpenChange={setShowNewTopicForm}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Agregar Nuevo Tema</AlertDialogTitle>
            <AlertDialogDescription>
              Agrega un tema al módulo seleccionado. Podrás editarlo después.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <Input
              placeholder="Nombre del tema"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              autoFocus
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAddTopic}
              disabled={!newTopicName.trim() || isSaving}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Agregar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* New Module Dialog (mobile) */}
      <AlertDialog
        open={showNewModuleForm && typeof window !== "undefined" && window.innerWidth < 1024}
        onOpenChange={(open) => !open && setShowNewModuleForm(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Agregar Nuevo Módulo</AlertDialogTitle>
            <AlertDialogDescription>
              Crea un nuevo módulo para tu curso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-3 py-2">
            <Input
              placeholder="Nombre del módulo"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
              autoFocus
            />
            <Input
              placeholder="Descripción (opcional)"
              value={newModuleDesc}
              onChange={(e) => setNewModuleDesc(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAddModule}
              disabled={!newModuleName.trim() || isSaving}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Agregar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* AI Assistant */}
      <AIAssistant
        onInsert={(content) => {
          if (selectedTopicId) {
            setTopicForm((f) => ({ ...f, content }));
          } else {
            setCourseDescription(content);
          }
        }}
        context={course ? `Curso: ${course.title}\nNivel: ${levelLabels[course.level]}\nDescripción: ${course.description || 'Sin descripción'}\nMódulos: ${course.modules.map((m) => m.title).join(', ')}${selectedTopicId ? `\nTema actual: ${topicForm.name}\nContenido actual: ${topicForm.content || 'Vacío'}` : ''}` : ''}
      />
    </div>
  );
}
