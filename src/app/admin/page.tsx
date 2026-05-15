"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Users,
  Activity,
  TrendingUp,
  Award,
  Search,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  Shield,
  BookOpen,
  Target,
  BarChart3,
  AlertTriangle,
  Sparkles,
  Tag,
  UserCog,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Clock,
  Eye,
  EyeOff,
  GripVertical,
  GraduationCap,
  Layers,
  UserPlus,
  BookPlus,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/hooks/use-auth";

// ── Types ──────────────────────────────────────────────────────

interface Stats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  pendingReviews: number;
  activeStudents: number;
  completionRate: number;
  avgQuizScore: number;
  totalTopics: number;
  moduleStats: ModuleStat[];
  scoreDistribution: {
    excellent: number;
    good: number;
    average: number;
    below: number;
  };
  coursesByCategory: CategoryBreakdown[];
  recentActivity: {
    enrollments: RecentEnrollment[];
    courses: RecentCourse[];
  };
}

interface ModuleStat {
  id: string;
  number: number;
  title: string;
  topicCount: number;
  completionRate: number;
  quizTakes: number;
  avgQuizScore: number;
}

interface CategoryBreakdown {
  id: string;
  name: string;
  icon: string;
  color: string;
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  pendingCourses: number;
}

interface RecentEnrollment {
  id: string;
  type: "enrollment";
  userName: string | null;
  courseTitle: string;
  date: string;
}

interface RecentCourse {
  id: string;
  type: "course_created";
  title: string;
  teacherName: string | null;
  status: string;
  date: string;
}

interface StudentRow {
  id: string;
  name: string;
  email: string;
  image: string | null;
  enrolledAt: string;
  progressPct: number;
  completedTopics: number;
  totalTopics: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  avgScore: number;
  lastActivity: string | null;
  streak: number;
}

interface AdminUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  createdAt: string;
  enrollmentCount: number;
  progressCount: number;
  courseCount: number;
}

interface AdminCourse {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  icon: string | null;
  status: string;
  published: boolean;
  level: string;
  duration: string | null;
  createdAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string;
    color: string;
  } | null;
  teacher: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  } | null;
  moduleCount: number;
  enrollmentCount: number;
}

interface AdminCategory {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string | null;
  color: string;
  order: number;
  published: boolean;
  createdAt: string;
  courseCount: number;
}

type TabType = "overview" | "students" | "courses" | "categories" | "users";

// ── Main Component ─────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Stats
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Students
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [studentSearch, setStudentSearch] = useState("");
  const [sortField, setSortField] = useState<string>("enrolledAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Courses
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [courseStatusFilter, setCourseStatusFilter] = useState<string>("all");

  // Categories
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    icon: "📁",
    description: "",
    color: "#10b981",
  });

  // Users
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState<string>("all");

  // ── Data Fetching ──────────────────────────────────────────

  // Fetch stats
  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
      setIsLoadingStats(false);
    }
    if (isAdmin) loadStats();
  }, [isAdmin]);

  // Fetch students
  useEffect(() => {
    async function loadStudents() {
      try {
        const res = await fetch(
          `/api/admin/students?search=${encodeURIComponent(studentSearch)}&sort=${sortField}&order=${sortOrder}`
        );
        if (res.ok) {
          const data = await res.json();
          setStudents(data.students);
        }
      } catch (error) {
        console.error("Failed to load students:", error);
      }
      setIsLoadingStudents(false);
    }
    if (isAdmin) loadStudents();
  }, [isAdmin, studentSearch, sortField, sortOrder]);

  // Fetch courses
  const loadCourses = useCallback(async () => {
    try {
      const url = courseStatusFilter === "all"
        ? "/api/admin/courses"
        : `/api/admin/courses?status=${courseStatusFilter}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (error) {
      console.error("Failed to load courses:", error);
    }
    setIsLoadingCourses(false);
  }, [courseStatusFilter]);

  useEffect(() => {
    async function fetchCourses() {
      await loadCourses();
    }
    if (isAdmin) fetchCourses();
  }, [isAdmin, loadCourses]);

  // Fetch categories
  const loadCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
    setIsLoadingCategories(false);
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      await loadCategories();
    }
    if (isAdmin) fetchCategories();
  }, [isAdmin, loadCategories]);

  // Fetch users
  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("/api/admin/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (error) {
        console.error("Failed to load users:", error);
      }
      setIsLoadingUsers(false);
    }
    if (isAdmin) loadUsers();
  }, [isAdmin]);

  // ── Handlers ───────────────────────────────────────────────

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatRelativeDate = (dateString: string | null) => {
    if (!dateString) return "Nunca";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} sem`;
    return formatDate(dateString);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Category CRUD
  const handleCreateCategory = async () => {
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: categoryForm.name,
          slug: categoryForm.slug || generateSlug(categoryForm.name),
          icon: categoryForm.icon,
          description: categoryForm.description || null,
          color: categoryForm.color,
        }),
      });
      if (res.ok) {
        setShowCategoryForm(false);
        setCategoryForm({ name: "", slug: "", icon: "📁", description: "", color: "#10b981" });
        loadCategories();
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    try {
      const res = await fetch(`/api/admin/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: categoryForm.name,
          slug: categoryForm.slug || generateSlug(categoryForm.name),
          icon: categoryForm.icon,
          description: categoryForm.description || null,
          color: categoryForm.color,
        }),
      });
      if (res.ok) {
        setEditingCategory(null);
        setCategoryForm({ name: "", slug: "", icon: "📁", description: "", color: "#10b981" });
        loadCategories();
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta categoría?")) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadCategories();
      } else {
        const data = await res.json();
        alert(data.error || "Error al eliminar categoría");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleToggleCategoryPublished = async (cat: AdminCategory) => {
    try {
      const res = await fetch(`/api/admin/categories/${cat.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !cat.published }),
      });
      if (res.ok) loadCategories();
    } catch (error) {
      console.error("Error toggling category:", error);
    }
  };

  const startEditCategory = (cat: AdminCategory) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      description: cat.description || "",
      color: cat.color,
    });
  };

  // Course status management
  const handleCourseStatus = async (courseId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) loadCourses();
    } catch (error) {
      console.error("Error updating course status:", error);
    }
  };

  const handleToggleCoursePublished = async (course: AdminCourse) => {
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !course.published }),
      });
      if (res.ok) loadCourses();
    } catch (error) {
      console.error("Error toggling course published:", error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm("¿Estás seguro de eliminar este curso? Esta acción es irreversible.")) return;
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, { method: "DELETE" });
      if (res.ok) loadCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // User role management
  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  // ── Computed values ────────────────────────────────────────

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !userSearch ||
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === "all" || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  const studentCount = users.filter((u) => u.role === "student").length;
  const teacherCount = users.filter((u) => u.role === "teacher").length;
  const adminCount = users.filter((u) => u.role === "admin").length;

  // ── Status helpers ─────────────────────────────────────────

  const getStatusBadge = (status: string) => {
    const map: Record<string, { label: string; className: string }> = {
      draft: { label: "Borrador", className: "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10" },
      pending_review: { label: "Pendiente", className: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20" },
      published: { label: "Publicado", className: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20" },
      rejected: { label: "Rechazado", className: "bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20" },
    };
    const s = map[status] || map.draft;
    return <Badge className={`${s.className} text-xs font-medium`}>{s.label}</Badge>;
  };

  const getLevelBadge = (level: string) => {
    const map: Record<string, { label: string; className: string }> = {
      principiante: { label: "Principiante", className: "bg-sky-100 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400" },
      intermedio: { label: "Intermedio", className: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400" },
      avanzado: { label: "Avanzado", className: "bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400" },
    };
    const l = map[level] || map.principiante;
    return <Badge className={`${l.className} text-xs`}>{l.label}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const map: Record<string, { label: string; className: string }> = {
      student: { label: "Alumno", className: "bg-sky-100 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400" },
      teacher: { label: "Profesor", className: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
      admin: { label: "Admin", className: "bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-400" },
    };
    const r = map[role] || map.student;
    return <Badge className={`${r.className} text-xs`}>{r.label}</Badge>;
  };

  // ── Loading / Unauthorized states ─────────────────────────

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Acceso no autorizado
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            No tienes permisos para acceder al panel de administración.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            Volver al inicio
          </Button>
        </motion.div>
      </div>
    );
  }

  // ── Tab Configuration ──────────────────────────────────────

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: "overview", label: "Resumen", icon: BarChart3 },
    { id: "students", label: "Estudiantes", icon: Users },
    { id: "courses", label: "Cursos", icon: BookOpen },
    { id: "categories", label: "Categorías", icon: Tag },
    { id: "users", label: "Usuarios", icon: UserCog },
  ];

  // ── Render ─────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Inicio
            </Button>
          </div>
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
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/20">
              <Shield className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Panel de{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  Administración
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gestiona y monitorea tu plataforma educativa
              </p>
            </div>
          </div>
        </motion.header>

        {/* Tabs - scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-1 mb-6 p-1 glass-card rounded-xl overflow-x-auto"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ═══════════════════════════════════════════════════════
              OVERVIEW TAB
              ═══════════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Top Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatsCard
                  icon={<Users className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
                  iconBg="bg-emerald-500/10 border border-emerald-500/20"
                  label="Total Estudiantes"
                  value={isLoadingStats ? null : stats?.totalStudents ?? 0}
                />
                <StatsCard
                  icon={<GraduationCap className="w-5 h-5 text-amber-500 dark:text-amber-400" />}
                  iconBg="bg-amber-500/10 border border-amber-500/20"
                  label="Total Profesores"
                  value={isLoadingStats ? null : stats?.totalTeachers ?? 0}
                />
                <StatsCard
                  icon={<BookOpen className="w-5 h-5 text-sky-500 dark:text-sky-400" />}
                  iconBg="bg-sky-500/10 border border-sky-500/20"
                  label="Total Cursos"
                  value={isLoadingStats ? null : stats?.totalCourses ?? 0}
                />
                <StatsCard
                  icon={<AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400" />}
                  iconBg="bg-red-500/10 border border-red-500/20"
                  label="Revisiones Pendientes"
                  value={isLoadingStats ? null : stats?.pendingReviews ?? 0}
                />
              </div>

              {/* Second row stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatsCard
                  icon={<Activity className="w-5 h-5 text-sky-500 dark:text-sky-400" />}
                  iconBg="bg-sky-500/10 border border-sky-500/20"
                  label="Activos (7d)"
                  value={isLoadingStats ? null : stats?.activeStudents ?? 0}
                />
                <StatsCard
                  icon={<TrendingUp className="w-5 h-5 text-amber-500 dark:text-amber-400" />}
                  iconBg="bg-amber-500/10 border border-amber-500/20"
                  label="Completado"
                  value={isLoadingStats ? null : `${stats?.completionRate ?? 0}%`}
                />
                <StatsCard
                  icon={<Award className="w-5 h-5 text-violet-500 dark:text-violet-400" />}
                  iconBg="bg-violet-500/10 border border-violet-500/20"
                  label="Prom. Eval."
                  value={isLoadingStats ? null : `${stats?.avgQuizScore ?? 0}%`}
                />
                <StatsCard
                  icon={<Sparkles className="w-5 h-5 text-pink-500 dark:text-pink-400" />}
                  iconBg="bg-pink-500/10 border border-pink-500/20"
                  label="Temas Totales"
                  value={isLoadingStats ? null : stats?.totalTopics ?? 0}
                />
              </div>

              {/* Courses by Category + Recent Activity */}
              <div className="grid gap-6 lg:grid-cols-2 mb-8">
                {/* Courses by Category */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Cursos por Categoría
                    </h3>
                  </div>
                  {isLoadingStats ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
                      ))}
                    </div>
                  ) : stats?.coursesByCategory.length ? (
                    <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
                      {stats.coursesByCategory.map((cat, idx) => (
                        <motion.div
                          key={cat.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                          <span className="text-xl shrink-0">{cat.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {cat.name}
                              </span>
                              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 ml-2 shrink-0">
                                {cat.totalCourses}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-emerald-600 dark:text-emerald-400">{cat.publishedCourses} pub.</span>
                              <span className="text-xs text-amber-600 dark:text-amber-400">{cat.pendingCourses} pend.</span>
                              <span className="text-xs text-gray-400">{cat.draftCourses} borr.</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
                      No hay categorías disponibles
                    </p>
                  )}
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Actividad Reciente
                    </h3>
                  </div>
                  {isLoadingStats ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-72 overflow-y-auto custom-scrollbar">
                      {/* Recent enrollments */}
                      {stats?.recentActivity.enrollments.map((enr, idx) => (
                        <motion.div
                          key={enr.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="flex items-center gap-3"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 shrink-0">
                            <UserPlus className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-700 dark:text-gray-300 truncate">
                              <span className="font-medium">{enr.userName || "Usuario"}</span> se inscribió en{" "}
                              <span className="font-medium">{enr.courseTitle}</span>
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                              {formatRelativeDate(enr.date)}
                            </p>
                          </div>
                        </motion.div>
                      ))}

                      {/* Recent course creations */}
                      {stats?.recentActivity.courses.map((crs, idx) => (
                        <motion.div
                          key={crs.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: (idx + 5) * 0.05 }}
                          className="flex items-center gap-3"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 shrink-0">
                            <BookPlus className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-700 dark:text-gray-300 truncate">
                              <span className="font-medium">{crs.teacherName || "Profesor"}</span> creó{" "}
                              <span className="font-medium">{crs.title}</span>
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-gray-400 dark:text-gray-500">
                                {formatRelativeDate(crs.date)}
                              </p>
                              {getStatusBadge(crs.status)}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {(!stats?.recentActivity.enrollments.length && !stats?.recentActivity.courses.length) && (
                        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
                          No hay actividad reciente
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Score Distribution + Drop-off Points */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Score Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Distribución de Puntuaciones
                    </h3>
                  </div>
                  {isLoadingStats ? (
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-8 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
                      ))}
                    </div>
                  ) : stats ? (
                    <div className="space-y-3">
                      {[
                        { label: "Excelente (90-100%)", count: stats.scoreDistribution.excellent, color: "bg-emerald-500", textColor: "text-emerald-500 dark:text-emerald-400" },
                        { label: "Bueno (70-89%)", count: stats.scoreDistribution.good, color: "bg-sky-500", textColor: "text-sky-500 dark:text-sky-400" },
                        { label: "Regular (50-69%)", count: stats.scoreDistribution.average, color: "bg-amber-500", textColor: "text-amber-500 dark:text-amber-400" },
                        { label: "Bajo (<50%)", count: stats.scoreDistribution.below, color: "bg-red-500", textColor: "text-red-500 dark:text-red-400" },
                      ].map((item) => {
                        const total = stats.scoreDistribution.excellent + stats.scoreDistribution.good + stats.scoreDistribution.average + stats.scoreDistribution.below;
                        const pct = total > 0 ? (item.count / total) * 100 : 0;
                        return (
                          <div key={item.label}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
                              <span className={`text-xs font-bold ${item.textColor}`}>
                                {item.count} ({Math.round(pct)}%)
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full ${item.color} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </motion.div>

                {/* Drop-off Points */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Puntos de Abandono
                    </h3>
                  </div>
                  {isLoadingStats ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
                      ))}
                    </div>
                  ) : stats ? (
                    <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                      {[...stats.moduleStats]
                        .sort((a, b) => a.completionRate - b.completionRate)
                        .slice(0, 5)
                        .map((mod) => (
                          <div key={mod.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-500 dark:text-gray-400 shrink-0">
                              M{mod.number}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{mod.title}</span>
                                <span className="text-xs font-bold text-amber-500 dark:text-amber-400 ml-2 shrink-0">{mod.completionRate}%</span>
                              </div>
                              <div className="h-1.5 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ background: mod.completionRate < 20 ? "#ef4444" : mod.completionRate < 40 ? "#f59e0b" : "#10b981" }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${mod.completionRate}%` }}
                                  transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      {stats.moduleStats.length === 0 && (
                        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
                          No hay datos de módulos disponibles
                        </p>
                      )}
                    </div>
                  ) : null}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════
              STUDENTS TAB (unchanged from original)
              ═══════════════════════════════════════════════════════ */}
          {activeTab === "students" && (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all"
                  />
                </div>
              </motion.div>

              {/* Students Table */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className="overflow-x-auto max-h-96 overflow-y-auto custom-scrollbar">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 z-10">
                      <tr className="bg-gray-100/80 dark:bg-white/5 backdrop-blur-sm border-b border-gray-200 dark:border-white/5">
                        <th className="text-left px-4 py-3">
                          <button onClick={() => handleSort("name")} className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300">
                            Nombre {renderSortIcon("name")}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 hidden md:table-cell">
                          <button onClick={() => handleSort("email")} className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300">
                            Email {renderSortIcon("email")}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 hidden sm:table-cell">
                          <button onClick={() => handleSort("enrolledAt")} className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300">
                            Inscripción {renderSortIcon("enrolledAt")}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3">
                          <button onClick={() => handleSort("progressPct")} className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300">
                            Progreso {renderSortIcon("progressPct")}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 hidden lg:table-cell">
                          <button onClick={() => handleSort("quizzesCompleted")} className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300">
                            Evaluaciones {renderSortIcon("quizzesCompleted")}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 hidden lg:table-cell">
                          <button onClick={() => handleSort("avgScore")} className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300">
                            Promedio {renderSortIcon("avgScore")}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 hidden sm:table-cell">
                          <button onClick={() => handleSort("lastActivity")} className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300">
                            Última Actividad {renderSortIcon("lastActivity")}
                          </button>
                        </th>
                        <th className="px-4 py-3 w-10" />
                      </tr>
                    </thead>
                    <tbody>
                      {isLoadingStudents ? (
                        Array.from({ length: 5 }).map((_, i) => (
                          <tr key={i} className="border-b border-gray-100 dark:border-white/5">
                            <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/5 animate-pulse" /><div className="h-4 w-24 rounded bg-gray-200 dark:bg-white/5 animate-pulse" /></div></td>
                            <td className="px-4 py-3 hidden md:table-cell"><div className="h-4 w-32 rounded bg-gray-200 dark:bg-white/5 animate-pulse" /></td>
                            <td className="px-4 py-3 hidden sm:table-cell"><div className="h-4 w-20 rounded bg-gray-200 dark:bg-white/5 animate-pulse" /></td>
                            <td className="px-4 py-3"><div className="h-4 w-16 rounded bg-gray-200 dark:bg-white/5 animate-pulse" /></td>
                          </tr>
                        ))
                      ) : students.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-12 text-center">
                            <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No se encontraron estudiantes</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {studentSearch ? "Intenta con otro término de búsqueda" : "Aún no hay estudiantes inscritos"}
                            </p>
                          </td>
                        </tr>
                      ) : (
                        students.map((student, index) => (
                          <motion.tr
                            key={student.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/3 cursor-pointer transition-colors"
                            onClick={() => router.push(`/admin/estudiante/${student.id}`)}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                                  <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400">
                                    {student.name?.charAt(0)?.toUpperCase() || "?"}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</span>
                                  <span className="block text-xs text-gray-400 dark:text-gray-500 md:hidden">{student.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell"><span className="text-xs text-gray-500 dark:text-gray-400">{student.email}</span></td>
                            <td className="px-4 py-3 hidden sm:table-cell"><span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(student.enrolledAt)}</span></td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2 min-w-[100px]">
                                <div className="flex-1 h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full progress-emerald"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${student.progressPct}%` }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">{student.progressPct}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 hidden lg:table-cell"><span className="text-xs text-gray-500 dark:text-gray-400">{student.quizzesCompleted}/{student.totalQuizzes}</span></td>
                            <td className="px-4 py-3 hidden lg:table-cell">
                              <span className={`text-xs font-bold ${student.avgScore >= 80 ? "text-emerald-500 dark:text-emerald-400" : student.avgScore >= 50 ? "text-amber-500 dark:text-amber-400" : "text-red-500 dark:text-red-400"}`}>
                                {student.avgScore}%
                              </span>
                            </td>
                            <td className="px-4 py-3 hidden sm:table-cell"><span className="text-xs text-gray-500 dark:text-gray-400">{formatRelativeDate(student.lastActivity)}</span></td>
                            <td className="px-4 py-3"><ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600" /></td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════
              COURSES TAB (Enhanced)
              ═══════════════════════════════════════════════════════ */}
          {activeTab === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Filter bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 flex flex-wrap gap-2"
              >
                {[
                  { value: "all", label: "Todos" },
                  { value: "draft", label: "Borrador" },
                  { value: "pending_review", label: "Pendientes" },
                  { value: "published", label: "Publicados" },
                  { value: "rejected", label: "Rechazados" },
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setCourseStatusFilter(f.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      courseStatusFilter === f.value
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </motion.div>

              {/* Courses list */}
              <div className="space-y-4">
                {isLoadingCourses ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                      <div className="h-5 w-48 rounded bg-gray-200 dark:bg-white/5 mb-3" />
                      <div className="h-4 w-32 rounded bg-gray-200 dark:bg-white/5" />
                    </div>
                  ))
                ) : courses.length === 0 ? (
                  <div className="glass-card rounded-2xl p-12 text-center">
                    <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No se encontraron cursos</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {courseStatusFilter !== "all" ? "Prueba con otro filtro" : "Aún no hay cursos creados"}
                    </p>
                  </div>
                ) : (
                  courses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="glass-card rounded-2xl p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                              {course.title}
                            </h3>
                            {getStatusBadge(course.status)}
                            {getLevelBadge(course.level)}
                          </div>

                          {course.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                              {course.description}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            {course.teacher && (
                              <span className="flex items-center gap-1">
                                <GraduationCap className="w-3 h-3" />
                                {course.teacher.name || "Sin profesor"}
                              </span>
                            )}
                            {course.category && (
                              <span className="flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {course.category.name}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {course.moduleCount} módulos
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {course.enrollmentCount} inscritos
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(course.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          {course.status === "pending_review" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleCourseStatus(course.id, "published")}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-8"
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Aprobar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCourseStatus(course.id, "rejected")}
                                className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10 text-xs h-8"
                              >
                                <X className="w-3 h-3 mr-1" />
                                Rechazar
                              </Button>
                            </>
                          )}
                          {course.status === "published" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCourseStatus(course.id, "draft")}
                              className="text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20 hover:bg-amber-50 dark:hover:bg-amber-500/10 text-xs h-8"
                            >
                              <EyeOff className="w-3 h-3 mr-1" />
                              Despublicar
                            </Button>
                          )}
                          {(course.status === "draft" || course.status === "rejected") && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCourseStatus(course.id, "published")}
                              className="text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-xs h-8"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Publicar
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 text-xs h-8"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════
              CATEGORÍAS TAB (New)
              ═══════════════════════════════════════════════════════ */}
          {activeTab === "categories" && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header + Create button */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {categories.length} categorías
                  </span>
                </div>
                <Button
                  onClick={() => {
                    setShowCategoryForm(true);
                    setEditingCategory(null);
                    setCategoryForm({ name: "", slug: "", icon: "📁", description: "", color: "#10b981" });
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm h-9"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Crear Categoría
                </Button>
              </div>

              {/* Create/Edit Category Form */}
              <AnimatePresence>
                {(showCategoryForm || editingCategory) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card rounded-2xl p-6 mb-6 overflow-hidden"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                      {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          value={categoryForm.name}
                          onChange={(e) => {
                            setCategoryForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                              slug: prev.slug || generateSlug(e.target.value),
                            }));
                          }}
                          placeholder="Ej: Inteligencia Artificial"
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Slug *
                        </label>
                        <input
                          type="text"
                          value={categoryForm.slug}
                          onChange={(e) => setCategoryForm((prev) => ({ ...prev, slug: e.target.value }))}
                          placeholder="Ej: inteligencia-artificial"
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Icono (emoji)
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{categoryForm.icon}</span>
                          <input
                            type="text"
                            value={categoryForm.icon}
                            onChange={(e) => setCategoryForm((prev) => ({ ...prev, icon: e.target.value }))}
                            className="w-24 px-3 py-2 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                          />
                          <div className="flex gap-1">
                            {["📁", "💻", "🔒", "🤖", "🎨", "📐", "📊", "🌐", "🧪", "🎬"].map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => setCategoryForm((prev) => ({ ...prev, icon: emoji }))}
                                className="text-lg hover:scale-125 transition-transform"
                                type="button"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Color
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={categoryForm.color}
                            onChange={(e) => setCategoryForm((prev) => ({ ...prev, color: e.target.value }))}
                            className="w-10 h-10 rounded-lg border border-gray-200 dark:border-white/10 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={categoryForm.color}
                            onChange={(e) => setCategoryForm((prev) => ({ ...prev, color: e.target.value }))}
                            className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                          />
                          <div className="flex gap-1">
                            {["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"].map((c) => (
                              <button
                                key={c}
                                onClick={() => setCategoryForm((prev) => ({ ...prev, color: c }))}
                                className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-800 hover:scale-110 transition-transform"
                                style={{ backgroundColor: c }}
                                type="button"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Descripción
                        </label>
                        <textarea
                          value={categoryForm.description}
                          onChange={(e) => setCategoryForm((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Descripción de la categoría..."
                          rows={2}
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all resize-none"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm h-9"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        {editingCategory ? "Guardar Cambios" : "Crear Categoría"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowCategoryForm(false);
                          setEditingCategory(null);
                        }}
                        className="text-sm h-9"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Categories list */}
              {isLoadingCategories ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                      <div className="h-5 w-40 rounded bg-gray-200 dark:bg-white/5 mb-3" />
                      <div className="h-4 w-24 rounded bg-gray-200 dark:bg-white/5" />
                    </div>
                  ))}
                </div>
              ) : categories.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <Tag className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No hay categorías</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Crea tu primera categoría</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {categories.map((cat, index) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="glass-card rounded-2xl p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                            style={{ backgroundColor: `${cat.color}20`, border: `1px solid ${cat.color}30` }}
                          >
                            <span className="text-lg">{cat.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                {cat.name}
                              </h3>
                              {!cat.published && (
                                <Badge className="bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 text-xs">
                                  Oculta
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                              <span>/{cat.slug}</span>
                              <span>{cat.courseCount} curso{cat.courseCount !== 1 ? "s" : ""}</span>
                              {cat.description && (
                                <span className="truncate max-w-[200px]">{cat.description}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleToggleCategoryPublished(cat)}
                            className={`p-2 rounded-lg transition-colors ${
                              cat.published
                                ? "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                                : "text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                            }`}
                            title={cat.published ? "Ocultar" : "Mostrar"}
                          >
                            {cat.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => startEditCategory(cat)}
                            className="p-2 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════
              USUARIOS TAB (New)
              ═══════════════════════════════════════════════════════ */}
          {activeTab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Role count badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="bg-sky-100 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400 text-sm px-3 py-1">
                  <Users className="w-3 h-3 mr-1" />
                  {studentCount} alumno{studentCount !== 1 ? "s" : ""}
                </Badge>
                <Badge className="bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-sm px-3 py-1">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {teacherCount} profesor{teacherCount !== 1 ? "es" : ""}
                </Badge>
                <Badge className="bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-400 text-sm px-3 py-1">
                  <Shield className="w-3 h-3 mr-1" />
                  {adminCount} admin{adminCount !== 1 ? "s" : ""}
                </Badge>
              </div>

              {/* Search + Filter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  {[
                    { value: "all", label: "Todos" },
                    { value: "student", label: "Alumnos" },
                    { value: "teacher", label: "Profesores" },
                    { value: "admin", label: "Admins" },
                  ].map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setUserRoleFilter(f.value)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        userRoleFilter === f.value
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Users Table */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 z-10">
                      <tr className="bg-gray-100/80 dark:bg-white/5 backdrop-blur-sm border-b border-gray-200 dark:border-white/5">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="text-left px-4 py-3 hidden md:table-cell text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Rol
                        </th>
                        <th className="text-left px-4 py-3 hidden lg:table-cell text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Cursos Creados
                        </th>
                        <th className="text-left px-4 py-3 hidden sm:table-cell text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Fecha Registro
                        </th>
                        <th className="text-left px-4 py-3 hidden lg:table-cell text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Última Actividad
                        </th>
                        <th className="px-4 py-3 w-10" />
                      </tr>
                    </thead>
                    <tbody>
                      {isLoadingUsers ? (
                        Array.from({ length: 5 }).map((_, i) => (
                          <tr key={i} className="border-b border-gray-100 dark:border-white/5">
                            <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/5 animate-pulse" /><div className="h-4 w-24 rounded bg-gray-200 dark:bg-white/5 animate-pulse" /></div></td>
                            <td className="px-4 py-3 hidden md:table-cell"><div className="h-4 w-32 rounded bg-gray-200 dark:bg-white/5 animate-pulse" /></td>
                            <td className="px-4 py-3"><div className="h-4 w-16 rounded bg-gray-200 dark:bg-white/5 animate-pulse" /></td>
                          </tr>
                        ))
                      ) : filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-12 text-center">
                            <UserCog className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No se encontraron usuarios</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {userSearch || userRoleFilter !== "all" ? "Prueba con otros filtros" : "No hay usuarios registrados"}
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user, index) => (
                          <motion.tr
                            key={user.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                  user.role === "admin"
                                    ? "bg-violet-500/15"
                                    : user.role === "teacher"
                                      ? "bg-emerald-500/15"
                                      : "bg-sky-500/15"
                                }`}>
                                  <span className={`text-xs font-bold ${
                                    user.role === "admin"
                                      ? "text-violet-500 dark:text-violet-400"
                                      : user.role === "teacher"
                                        ? "text-emerald-500 dark:text-emerald-400"
                                        : "text-sky-500 dark:text-sky-400"
                                  }`}>
                                    {user.name?.charAt(0)?.toUpperCase() || "?"}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.name || "Sin nombre"}
                                  </span>
                                  <span className="block text-xs text-gray-400 dark:text-gray-500 md:hidden">
                                    {user.email}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell">
                              <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={user.role}
                                onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                                className="text-xs bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-2 py-1.5 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-emerald-500/50 cursor-pointer"
                                disabled={user.id === ""} // Prevent self-demotion handled by API
                              >
                                <option value="student">Alumno</option>
                                <option value="teacher">Profesor</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td className="px-4 py-3 hidden lg:table-cell">
                              {user.role === "teacher" || user.role === "admin" ? (
                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                  {user.courseCount} curso{user.courseCount !== 1 ? "s" : ""}
                                </span>
                              ) : (
                                <span className="text-xs text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3 hidden sm:table-cell">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(user.createdAt)}
                              </span>
                            </td>
                            <td className="px-4 py-3 hidden lg:table-cell">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {user.progressCount > 0 ? `${user.progressCount} actividades` : "Sin actividad"}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {getRoleBadge(user.role)}
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Reusable StatsCard Component ───────────────────────────────

function StatsCard({
  icon,
  iconBg,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | number | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${iconBg}`}>
          {icon}
        </div>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white">
        {value === null ? (
          <div className="h-9 w-16 rounded bg-gray-200 dark:bg-white/5 animate-pulse" />
        ) : (
          value
        )}
      </div>
    </motion.div>
  );
}
