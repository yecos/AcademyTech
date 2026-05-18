"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { useIsMobile } from "@/hooks/use-mobile";

// ============================================================
// Route → Page title mapping
// ============================================================

interface PageTitleInfo {
  title: string;
  subtitle?: string;
}

function getPageTitle(pathname: string): PageTitleInfo {
  // Exact matches
  const exactMap: Record<string, PageTitleInfo> = {
    "/": { title: "Inicio", subtitle: "Tu plataforma de aprendizaje" },
    "/buscar": { title: "Buscar", subtitle: "Busca temas, términos y soluciones" },
    "/glosario": { title: "Glosario", subtitle: "Términos de tecnología" },
    "/marcadores": { title: "Marcadores", subtitle: "Tus temas guardados" },
    "/atajos": { title: "Atajos", subtitle: "Atajos de teclado" },
    "/comparar": { title: "Comparar", subtitle: "Compara herramientas y funciones" },
    "/soluciones": { title: "Soluciones", subtitle: "Solución de problemas" },
    "/logros": { title: "Logros", subtitle: "Tus logros desbloqueados" },
    "/certificado": { title: "Certificado", subtitle: "Tu certificado de finalización" },
    "/perfil": { title: "Mi Perfil", subtitle: "Configuración de tu cuenta" },
    "/login": { title: "Iniciar Sesión", subtitle: "Accede a tu cuenta" },
    "/admin": { title: "Panel Admin", subtitle: "Administración del sistema" },
    "/profesor": { title: "Panel Profesor", subtitle: "Gestión de cursos" },
  };

  if (exactMap[pathname]) return exactMap[pathname];

  // Dynamic route patterns
  if (pathname.startsWith("/curso/")) {
    return { title: "Curso", subtitle: "Contenido del curso" };
  }
  if (pathname.startsWith("/categoria/")) {
    return { title: "Categoría", subtitle: "Cursos por categoría" };
  }
  if (pathname.startsWith("/modulo/")) {
    return { title: "Tema", subtitle: "Contenido del tema" };
  }
  if (pathname.startsWith("/admin/estudiante/")) {
    return { title: "Estudiante", subtitle: "Detalle del estudiante" };
  }
  if (pathname.startsWith("/profesor/curso/")) {
    return { title: "Editar Curso", subtitle: "Gestión del curso" };
  }

  return { title: "Academy Tech", subtitle: undefined };
}

// ============================================================
// TopBar Props
// ============================================================

interface TopBarProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

// ============================================================
// TopBar Component
// ============================================================

export function TopBar({ onMenuToggle }: TopBarProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { title, subtitle } = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-20 glass-card border-b border-gray-200/60 dark:border-white/5">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left side: Hamburger (mobile) + Page title */}
        <div className="flex items-center gap-3">
          {/* Hamburger menu button - always visible on mobile */}
          {isMobile && (
            <button
              onClick={onMenuToggle}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          )}

          {/* Page title */}
          <div>
            <h1 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] text-gray-500 dark:text-gray-400 hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right side: Notifications + ThemeToggle + UserMenu */}
        <div className="flex items-center gap-2">
          <NotificationsDropdown />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
