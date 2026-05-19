# Guia de Desarrollo con IA — AcademyTech

> **Archivo maestro de instrucciones** para cualquier agente de IA (GitHub Copilot, Cursor, Claude Code, etc.) que trabaje en este proyecto.  
> **Ultima actualizacion:** 2026-05-19  
> **Mantenido por:** @yecos

---

## Tabla de Contenidos

1. [Vision General del Proyecto](#1-vision-general-del-proyecto)
2. [Stack Tecnologico](#2-stack-tecnologico)
3. [Estructura de Archivos](#3-estructura-de-archivos)
4. [Reglas Criticas — OBLIGATORIAS](#4-reglas-criticas--obligatorias)
5. [Sistema de Temas por Categoria](#5-sistema-de-temas-por-categoria)
6. [Navegacion Multi-Categoria](#6-navegacion-multi-categoria)
7. [Convenciones de Codigo](#7-convenciones-de-codigo)
8. [Patrones de Componentes React](#8-patrones-de-componentes-react)
9. [API Routes — Convenciones](#9-api-routes--convenciones)
10. [Base de Datos — Prisma](#10-base-de-datos--prisma)
11. [Autenticacion — NextAuth](#11-autenticacion--nextauth)
12. [Estado Global — Zustand](#12-estado-global--zustand)
13. [UI — shadcn/ui y Tailwind](#13-ui--shadcnui-y-tailwind)
14. [Errores Conocidos y Trampas](#14-errores-conocidos-y-trampas)
15. [Flujo de Trabajo con Git](#15-flujo-de-trabajo-con-git)
16. [Checklist de Calidad Pre-Commit](#16-checklist-de-calidad-pre-commit)
17. [Comandos Utiles](#17-comandos-utiles)
18. [Variables de Entorno Requeridas](#18-variables-de-entorno-requeridas)
19. [Reglas Especificas para IA](#19-reglas-especificas-para-ia)

---

## 1. Vision General del Proyecto

**AcademyTech** es una plataforma de aprendizaje tecnologico en espanol que ofrece cursos interactivos con seguimiento de progreso, evaluaciones, certificados y herramientas de estudio. La plataforma soporta **4 categorias** de cursos, cada una con su propio sistema de temas visuales:

| Categoria | Slug | Color | Icono | Patron de Fondo |
|-----------|------|-------|-------|-----------------|
| Arquitectura | `arquitectura` | Emerald (#10b981) | Building2 | Geometrico |
| Programacion | `programacion` | Blue (#3b82f6) | Code | Codigo |
| Ciberseguridad | `ciberseguridad` | Red (#ef4444) | Shield | Hexagonal |
| Inteligencia Artificial | `ia` | Violet (#8b5cf6) | Brain | Neural |

**URL en produccion:** https://d5render.vercel.app  
**Lenguaje de la UI:** Espanol (siempre)  
**Lenguaje del codigo:** Ingles (nombres de variables, funciones, archivos)  

---

## 2. Stack Tecnologico

| Tecnologia | Version | Uso |
|------------|---------|-----|
| Next.js | 16.x | Framework principal (App Router) |
| React | 19.x | Biblioteca UI |
| TypeScript | 5.x | Lenguaje principal — **OBLIGATORIO** |
| Prisma | 6.x | ORM para PostgreSQL |
| NextAuth | 4.x | Autenticacion (Google + Credentials + Guest) |
| Tailwind CSS | 4.x | Estilos utilitarios |
| shadcn/ui | — | Componentes base (Radix UI) |
| Framer Motion | 12.x | Animaciones |
| Zustand | 5.x | Estado global del cliente |
| Recharts | 3.x | Graficos y visualizaciones |
| Monaco Editor | 4.x | Editor de codigo en vivo |
| Sonner | 2.x | Notificaciones toast |
| Lucide React | 0.525+ | Iconos |

**Runtime:** Bun (bun.lock presente)  
**Deploy:** Vercel  

---

## 3. Estructura de Archivos

```
AcademyTech/
├── prisma/
│   ├── schema.prisma          # Esquema de la base de datos (14+ modelos)
│   ├── migrations/            # Migraciones de Prisma
│   ├── seed.ts                # Seed principal
│   ├── seed-admin.ts          # Crear usuario admin
│   ├── seed-arquitectura.ts   # Seed curso arquitectura
│   ├── seed-programacion.ts   # Seed curso programacion
│   ├── seed-ciberseguridad.ts # Seed curso ciberseguridad
│   └── seed-ia.ts             # Seed curso IA
├── public/                    # Archivos estaticos
├── scripts/
│   └── build.sh               # Script de build personalizado
├── src/
│   ├── app/                   # App Router de Next.js
│   │   ├── layout.tsx         # Layout raiz
│   │   ├── page.tsx           # Pagina de inicio
│   │   ├── globals.css        # Estilos globales
│   │   ├── error.tsx          # Pagina de error
│   │   ├── not-found.tsx      # Pagina 404
│   │   ├── loading.tsx        # Loading global
│   │   ├── admin/             # Panel de administracion
│   │   ├── api/               # API Routes (~25 endpoints)
│   │   ├── atajos/            # Pagina de atajos de teclado
│   │   ├── buscar/            # Buscador global
│   │   ├── categoria/[slug]/  # Pagina de categoria
│   │   ├── certificado/       # Certificado del curso
│   │   ├── comparar/          # Comparacion de herramientas
│   │   ├── curso/[slug]/      # Pagina de curso
│   │   ├── glosario/          # Glosario de terminos
│   │   ├── login/             # Inicio de sesion
│   │   ├── logros/            # Logros y achievaciones
│   │   ├── marcadores/        # Marcadores/bookmarks
│   │   ├── modulo/[moduleId]/ # Modulo con temas
│   │   │   └── tema/[topicId]/
│   │   ├── perfil/            # Perfil del usuario
│   │   ├── profesor/          # Panel del profesor
│   │   └── soluciones/        # Soluciones de problemas
│   ├── components/
│   │   ├── ui/                # Componentes shadcn/ui
│   │   ├── admin/             # Componentes de admin
│   │   ├── AIAssistant.tsx    # Asistente de IA integrado
│   │   ├── AppLayout.tsx      # Layout principal con sidebar
│   │   ├── CategoryBackground.tsx  # Fondos tematicos por categoria
│   │   ├── CategoryThemeProvider.tsx # Provider de tema
│   │   ├── CodeSandbox.tsx    # Sandbox de codigo Monaco
│   │   ├── Sidebar.tsx        # Barra lateral de navegacion
│   │   ├── TopBar.tsx         # Barra superior
│   │   ├── quiz-dialog.tsx    # Dialogo de quiz
│   │   ├── module-card.tsx    # Tarjeta de modulo
│   │   ├── study-app.tsx      # App de estudio principal
│   │   ├── progress-overview.tsx # Vista de progreso
│   │   ├── course-reviews.tsx # Resenas de cursos
│   │   ├── notifications-dropdown.tsx # Dropdown de notificaciones
│   │   ├── auth-banner.tsx    # Banner de autenticacion
│   │   ├── auth-provider.tsx  # Provider de auth
│   │   ├── theme-provider.tsx # Provider de tema dark/light
│   │   ├── theme-toggle.tsx   # Toggle dark/light
│   │   ├── user-menu.tsx      # Menu de usuario
│   │   ├── curriculum-provider.tsx # Provider de curriculum
│   │   └── sw-registration.tsx # Service Worker registration
│   ├── hooks/                 # Custom React hooks
│   ├── lib/
│   │   ├── db.ts              # Re-exporta prisma client
│   │   ├── prisma.ts          # Singleton de Prisma Client
│   │   ├── auth.ts            # Configuracion de NextAuth
│   │   ├── admin-auth.ts      # Utilidades de auth admin
│   │   ├── category-themes.ts # Sistema completo de temas
│   │   ├── curriculum.ts      # Datos del curriculum (60KB)
│   │   ├── topic-content.ts   # Contenido de temas (305KB)
│   │   ├── tools-data.ts      # Datos de herramientas (98KB)
│   │   ├── search-data.ts     # Datos de busqueda (35KB)
│   │   ├── store.ts           # Store Zustand
│   │   ├── achievements.ts    # Sistema de achievaciones
│   │   ├── code-block-parser.ts # Parser de bloques de codigo
│   │   ├── quizzes/           # Datos de quizzes
│   │   └── utils.ts           # Utilidades generales (cn)
│   └── middleware.ts          # Middleware de auth y rutas
├── components.json            # Configuracion shadcn/ui
├── tailwind.config.ts         # Configuracion Tailwind
├── next.config.ts             # Configuracion Next.js
├── tsconfig.json              # Configuracion TypeScript
├── eslint.config.mjs          # Configuracion ESLint
└── package.json               # Dependencias
```

---

## 4. Reglas Criticas — OBLIGATORIAS

> ** Estas reglas son inviolables. Si la IA las incumple, el codigo NO debe ser aceptado.**

### 4.1 NUNCA hardcodear rutas de curso

```tsx
// ❌ PROHIBIDO — Nunca hardcodear un slug de curso
router.push("/curso/d5-render")
const url = `/modulo/abc?course=d5-render`

// ✅ CORRECTO — Siempre usar el parametro dinamico del curso
const searchParams = useSearchParams();
const courseSlug = searchParams.get("course");
const backUrl = courseSlug ? `/curso/${courseSlug}` : "/";
router.push(backUrl);
```

**Razon:** El proyecto ya tuvo un bug critico donde 9 paginas tenian rutas hardcodeadas a `/curso/d5-render`, causando que usuarios de otros cursos fueran redirigidos incorrectamente.

### 4.2 NUNCA hardcodear colores de categoria

```tsx
// ❌ PROHIBIDO — Nunca usar un color de categoria directo
<div className="bg-emerald-500/10 text-emerald-600">

// ✅ CORRECTO — Usar el sistema de temas de categoria
import { useCategoryTheme } from "@/components/CategoryThemeProvider";
const theme = useCategoryTheme();
<div className={`${theme.tailwind.bg} ${theme.tailwind.text}`}>
```

### 4.3 NUNCA usar `any` en TypeScript

```tsx
// ❌ PROHIBIDO
const data: any = fetchData();
function handler(req: any) { }

// ✅ CORRECTO — Siempre definir tipos
const data: CourseData = fetchData();
function handler(req: NextRequest) { }
```

### 4.4 SIEMPRE envolver `useSearchParams()` en `<Suspense>`

```tsx
// ❌ PROHIBIDO — Next.js lanza error sin Suspense
export default function MyPage() {
  const searchParams = useSearchParams();
  // ...
}

// ✅ CORRECTO
function MyPageContent() {
  const searchParams = useSearchParams();
  // ...
}

function MyPageFallback() {
  return <div>Cargando...</div>;
}

export default function MyPage() {
  return (
    <Suspense fallback={<MyPageFallback />}>
      <MyPageContent />
    </Suspense>
  );
}
```

### 4.5 SIEMPRE pasar el contexto del curso en la navegacion

```tsx
// ❌ PROHIBIDO — Pierde el contexto del curso
<a href="/modulo/abc/tema/1">

// ✅ CORRECTO — Preserva el contexto del curso
<a href={`/modulo/abc/tema/1${courseSlug ? `?course=${courseSlug}` : ""}`}>
```

### 4.6 NUNCA crear componentes cliente sin `"use client"`

```tsx
// ❌ PROHIBIDO — Componente con hooks sin directiva
import { useState } from "react";
export default function MyComponent() {
  const [count, setCount] = useState(0);

// ✅ CORRECTO
"use client";
import { useState } from "react";
export default function MyComponent() {
  const [count, setCount] = useState(0);
```

### 4.7 SIEMPRE usar el singleton de Prisma

```tsx
// ❌ PROHIBIDO — Crea multiples instancias de PrismaClient
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ CORRECTO — Usa el singleton
import { db } from "@/lib/db";
// o
import { prisma } from "@/lib/prisma";
```

### 4.8 CodeSandbox SOLO en cursos de programacion

```tsx
// ❌ PROHIBIDO — Mostrar sandbox en todos los cursos
<CodeSandboxSection />

// ✅ CORRECTO — Solo mostrar en cursos de programacion
{categorySlug === "programacion" && <CodeSandboxSection />}
```

---

## 5. Sistema de Temas por Categoria

El sistema de temas es el corazon visual de la plataforma. Cada categoria tiene un tema completo con colores, gradientes, patrones de fondo y clases Tailwind predefinidas.

### 5.1 Como funciona

1. **`src/lib/category-themes.ts`**: Define todos los temas en `CATEGORY_THEMES`
2. **`src/components/CategoryThemeProvider.tsx`**: Provee el tema via React Context
3. **`src/components/CategoryBackground.tsx`**: Renderiza fondos animados por categoria

### 5.2 Los 4 temas

| Propiedad | Arquitectura | Programacion | Ciberseguridad | IA |
|-----------|-------------|-------------|----------------|-----|
| primaryColor | #10b981 | #3b82f6 | #ef4444 | #8b5cf6 |
| Tailwind base | emerald | blue | red | violet |
| Pattern | geometric | code | hexagonal | neural |
| Icon | Building2 | Code | Shield | Brain |

### 5.3 Uso del provider

```tsx
import { CategoryThemeProvider, useCategoryTheme } from "@/components/CategoryThemeProvider";

// Envolver la pagina
<CategoryThemeProvider categorySlug="programacion">
  <MyPageContent />
</CategoryThemeProvider>

// Consumir el tema dentro
function MyPageContent() {
  const theme = useCategoryTheme();
  
  return (
    <div className={`${theme.tailwind.bg} ${theme.tailwind.border} rounded-lg`}>
      <h2 className={theme.tailwind.text}>Titulo</h2>
      <div className={theme.tailwind.gradient}>Gradiente</div>
    </div>
  );
}
```

### 5.4 Clases Tailwind disponibles en cada tema

Cada tema provee estas clases via `theme.tailwind`:

```
text / textDark      — Color de texto principal
bg / bgDark          — Fondo sutil (10-15% opacidad)
border / borderDark  — Borde sutil (20-25% opacidad)
gradient             — Clase de gradiente from-to
iconBg / iconBgDark  — Fondo para iconos
badge / badgeDark    — Estilo de badge/etiqueta
hoverBorder          — Borde al hover
progress             — Color de barra de progreso
button / buttonHover — Boton principal
shadow               — Sombra con color del tema
```

### 5.5 Regla de agregar nuevas categorias

Si se agrega una nueva categoria, se DEBE:
1. Agregar el tema en `CATEGORY_THEMES` en `category-themes.ts`
2. Agregar el patron de fondo en `CategoryBackground.tsx`
3. Agregar los datos de herramientas en `tools-data.ts`
4. Agregar el seed correspondiente en `prisma/`
5. Actualizar el middleware si tiene rutas protegidas

---

## 6. Navegacion Multi-Categoria

### 6.1 Patron de URL con contexto de curso

Todas las paginas que pertenecen a un curso DEBEN leer el parametro `course` del URL:

```tsx
const searchParams = useSearchParams();
const courseSlug = searchParams.get("course") || "d5-render"; // fallback para compatibilidad
const backUrl = courseSlug ? `/curso/${courseSlug}` : "/";
```

### 6.2 Paginas que DEBEN respetar este patron

- `/glosario` — Glosario de terminos
- `/marcadores` — Bookmarks
- `/atajos` — Atajos de teclado
- `/comparar` — Comparacion de herramientas
- `/soluciones` — Soluciones de problemas
- `/logros` — Achievaciones
- `/certificado` — Certificado
- `/buscar` — Buscador
- `/perfil` — Perfil del usuario

### 6.3 Rutas publicas vs protegidas

**Publicas (no requieren auth):**
- `/` (inicio)
- `/login`
- `/curso/[slug]`
- `/categoria/[slug]`
- `/buscar`

**Protegidas (requieren auth):**
- `/perfil`, `/marcadores`, `/logros`, `/certificado`, `/glosario`
- `/atajos`, `/comparar`, `/soluciones`

**Admin (requieren rol admin):**
- `/admin/*`

**Profesor (requieren rol teacher o admin):**
- `/profesor/*`

---

## 7. Convenciones de Codigo

### 7.1 Nomenclatura

| Elemento | Convencion | Ejemplo |
|----------|-----------|---------|
| Componentes | PascalCase | `ModuleCard.tsx`, `QuizDialog.tsx` |
| Hooks | camelCase con `use` | `useCategoryTheme` |
| Utilidades | camelCase | `formatDate`, `cn` |
| Tipos/Interfaces | PascalCase | `CategoryTheme`, `QuizResult` |
| Constantes | UPPER_SNAKE_CASE | `CATEGORY_THEMES`, `API_BASE` |
| API routes | kebab-case | `/api/course-data`, `/api/dashboard-stats` |
| Archivos pagina | `page.tsx` | Convencion Next.js |
| Archivos layout | `layout.tsx` | Convencion Next.js |
| Seed files | `seed-{categoria}.ts` | `seed-arquitectura.ts` |

### 7.2 Imports — Orden

```tsx
// 1. React / Next.js
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// 2. Librerias externas
import { motion } from "framer-motion";
import { toast } from "sonner";

// 3. Componentes internos
import { Sidebar } from "@/components/Sidebar";
import { CategoryThemeProvider } from "@/components/CategoryThemeProvider";

// 4. Tipos
import type { CategoryTheme } from "@/lib/category-themes";

// 5. Utilidades y datos
import { cn } from "@/lib/utils";
import { CATEGORY_THEMES } from "@/lib/category-themes";
```

### 7.3 Estructura de un componente

```tsx
"use client"; // Solo si usa hooks o interactividad

// Imports ordenados (ver 7.2)

// Tipos locales
interface MyComponentProps {
  title: string;
  courseId?: string;
}

// Componente
export function MyComponent({ title, courseId }: MyComponentProps) {
  // 1. Hooks (router, searchParams, zustand, etc.)
  const router = useRouter();
  
  // 2. Estado
  const [isLoading, setIsLoading] = useState(false);
  
  // 3. Efectos
  useEffect(() => { /* ... */ }, []);
  
  // 4. Handlers
  const handleClick = () => { /* ... */ };
  
  // 5. Render
  return (
    <div>...</div>
  );
}
```

### 7.4 Convencion de textos en la UI

**Todos los textos visibles por el usuario deben estar en espanol:**

```tsx
// ✅ CORRECTO
<button>Explorar Cursos</button>
<p>Aprende Arquitectura, Programacion, Ciberseguridad e IA</p>
<toast>Error al guardar los cambios</toast>

// ❌ PROHIBIDO
<button>Explore Courses</button>
<p>Learn Architecture, Programming, Cybersecurity and AI</p>
```

**Excepciones:** Nombres de tecnologias (React, TypeScript, Docker), comandos de codigo, terminos tecnicos estandarizados.

---

## 8. Patrones de Componentes React

### 8.1 Patron pagina con Suspense (OBLIGATORIO)

Toda pagina que use `useSearchParams()` DEBE seguir este patron:

```tsx
"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PageContent() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  // ... logica del componente
}

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-pulse text-gray-400">Cargando...</div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageContent />
    </Suspense>
  );
}
```

### 8.2 Patron pagina con CategoryThemeProvider

Las paginas que muestran contenido por categoria:

```tsx
"use client";
import { CategoryThemeProvider } from "@/components/CategoryThemeProvider";
import { CategoryBackground } from "@/components/CategoryBackground";

export default function CategoryPage() {
  return (
    <CategoryThemeProvider categorySlug={slug}>
      <CategoryBackground />
      {/* contenido de la pagina */}
    </CategoryThemeProvider>
  );
}
```

### 8.3 Patron componente shadcn/ui

Usar los componentes de `@/components/ui/` como base:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
```

### 8.4 Patron animaciones con Framer Motion

```tsx
import { motion } from "framer-motion";

// Animacion de entrada estandar
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* contenido */}
</motion.div>

// Variants para listas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

---

## 9. API Routes — Convenciones

### 9.1 Estructura de un endpoint

```typescript
// src/app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // 1. Verificar autenticacion (si es necesario)
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 2. Leer parametros
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    // 3. Validar parametros obligatorios
    if (!courseId) {
      return NextResponse.json(
        { error: "courseId es requerido" },
        { status: 400 }
      );
    }

    // 4. Consultar base de datos
    const data = await db.course.findUnique({
      where: { id: courseId },
      include: { modules: true },
    });

    // 5. Retornar respuesta
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API ERROR]", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Similar pattern...
}
```

### 9.2 Endpoints existentes

```
/api/achievements       — Logros del usuario
/api/admin/*            — Endpoints de administracion
/api/ai/*               — Integracion con IA
/api/auth-config        — Configuracion de auth
/api/auth/[...]         — NextAuth handlers
/api/bookmarks          — Marcadores
/api/categories         — Categorias
/api/certificates       — Certificados
/api/course-data        — Datos de cursos
/api/course             — Curso individual
/api/courses            — Lista de cursos
/api/curriculum         — Datos del curriculum
/api/dashboard-stats    — Estadisticas del dashboard
/api/enrollment         — Inscripciones
/api/export             — Exportar datos
/api/notes              — Notas del usuario
/api/notifications      — Notificaciones
/api/profile            — Perfil
/api/progress           — Progreso del usuario
/api/quiz               — Quizzes
/api/reset              — Reset de datos
/api/reviews            — Resenas
/api/sandbox            — Sandbox de codigo
/api/seed-courses       — Seed de cursos
/api/streak             — Rachas de estudio
/api/teacher/*          — Endpoints de profesor
```

### 9.3 Reglas para API routes

1. **Siempre** usar `try/catch` con respuesta de error 500
2. **Siempre** verificar autenticacion con `getServerSession(authOptions)` para rutas protegidas
3. **Siempre** validar parametros obligatorios antes de consultar la DB
4. **Nunca** exponer errores internos de Prisma al cliente
5. **Siempre** usar el singleton `db` de `@/lib/db`, nunca instanciar PrismaClient directamente
6. Mensajes de error en espanol para el usuario final

---

## 10. Base de Datos — Prisma

### 10.1 Modelos existentes

```
Account              — Cuentas de NextAuth
Session              — Sesiones de NextAuth
VerificationToken    — Tokens de verificacion
User                 — Usuarios (student/teacher/admin)
Category             — Categorias de cursos (4 categorias)
Course               — Cursos
Module               — Modulos dentro de un curso
Topic                — Temas dentro de un modulo
Enrollment           — Inscripcion de usuario a curso
UserProgress         — Progreso del usuario por tema
QuizResult           — Resultados de quizzes
UserNote             — Notas del usuario
Bookmark             — Marcadores
UserAchievement      — Achievaciones desbloqueadas
UserStreak           — Racha de estudio
Review               — Resenas de cursos
Notification         — Notificaciones
Certificate          — Certificados
```

### 10.2 Convenciones de schema

```prisma
// IDs siempre con cuid()
model MyModel {
  id String @id @default(cuid())
  // ...
}

// Slugs unicos para rutas publicas
model Course {
  slug String @unique
  // ...
}

// Relaciones siempre con onDelete: Cascade cuando tiene sentido
model UserProgress {
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  // ...
}

// Campos de texto largo usar @db.Text
model Course {
  description String? @db.Text
}

// Fechas de creacion siempre con @default(now())
model MyModel {
  createdAt DateTime @default(now())
}

// Campos booleanos con defaults explicitos
model Category {
  published Boolean @default(true)
}
```

### 10.3 Comandos de Prisma

```bash
# Generar el cliente (se ejecuta automaticamente con install)
npx prisma generate

# Crear migracion
npx prisma migrate dev --name nombre_descriptivo

# Aplicar migraciones en produccion
npx prisma migrate deploy

# Reset completo de la DB
npx prisma migrate reset --force

# Seed admin
tsx prisma/seed-admin.ts

# Seed todos los cursos
tsx prisma/seed-arquitectura.ts && tsx prisma/seed-programacion.ts && tsx prisma/seed-ciberseguridad.ts && tsx prisma/seed-ia.ts
```

### 10.4 Reglas para modificar el schema

1. **Siempre** crear una migracion con nombre descriptivo (`--name add_user_avatar`)
2. **Nunca** modificar migraciones ya aplicadas en produccion
3. **Siempre** agregar campos nuevos como opcionales (`String?`) primero, luego poblar, luego hacer requeridos si es necesario
4. **Siempre** actualizar los seeds correspondientes al cambiar el schema
5. **Nunca** eliminar modelos sin verificar que no hay dependencias en el codigo

---

## 11. Autenticacion — NextAuth

### 11.1 Proveedores configurados

1. **Google** — `GoogleProvider` (OAuth)
2. **Credentials** — Email + contrasena (bcrypt)
3. **Guest** — Acceso como invitado (crea usuario temporal)

### 11.2 Roles de usuario

| Rol | Valor | Permisos |
|-----|-------|----------|
| Estudiante | `student` | Acceso a cursos, perfil, herramientas |
| Profesor | `teacher` | Todo lo anterior + panel de profesor |
| Admin | `admin` | Acceso total + panel de admin |

### 11.3 Middleware de proteccion

El archivo `src/middleware.ts` maneja la proteccion de rutas:

- Rutas publicas: `/`, `/login`, `/curso/*`, `/categoria/*`, `/buscar`
- Rutas autenticadas: Requieren token JWT valido
- Rutas admin: Requieren `role === "admin"`
- Rutas profesor: Requieren `role === "teacher" || "admin"`

### 11.4 Uso en API routes

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const session = await getServerSession(authOptions);
if (!session?.user) {
  return NextResponse.json({ error: "No autorizado" }, { status: 401 });
}

// Verificar rol admin
if (session.user.role !== "admin") {
  return NextResponse.json({ error: "Prohibido" }, { status: 403 });
}
```

### 11.5 Uso en componentes cliente

```tsx
import { useSession } from "next-auth/react";

function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") return <LoadingSkeleton />;
  if (!session) return <AuthBanner />;
  
  return <AuthenticatedContent user={session.user} />;
}
```

---

## 12. Estado Global — Zustand

### 12.1 Store principal

El store esta en `src/lib/store.ts` y usa `persist` para localStorage:

```typescript
interface StudyStore {
  // Progreso
  completedTopics: Record<string, boolean>;
  quizResults: Record<string, QuizResult>;
  topicNotes: Record<string, string>;
  bookmarks: Record<string, boolean>;
  
  // Certificado
  studentName: string;
  completionDate: string | null;
  
  // Rachas
  lastStudyDate: string | null;
  currentStreak: number;
  longestStreak: number;
  
  // Achievaciones
  unlockedAchievements: Record<string, string>;
  
  // Navegacion
  currentView: 'modules' | 'topic';
  selectedModule: string | null;
  selectedTopic: number | null;
}
```

### 12.2 Reglas para el store

1. **Siempre** usar `persist` para datos que deben sobrevivir recarga
2. **Nunca** almacenar datos sensibles (tokens, contrasenas) en el store
3. **Siempre** proveer un metodo `resetAll()` en cada slice nuevo
4. Las keys del store usan el formato `"moduleId-topicIndex"` para topicos

---

## 13. UI — shadcn/ui y Tailwind

### 13.1 Componentes shadcn/ui disponibles

```
button, card, dialog, tabs, accordion, alert-dialog,
checkbox, label, progress, radio-group, select, separator,
slot
```

### 13.2 Convenciones de Tailwind

```tsx
// Clases en orden: estado -> layout -> espaciado -> tipografia -> visual -> animacion
<div className="
  flex items-center gap-3        // Layout
  px-3 py-2.5                   // Espaciado
  text-sm font-medium           // Tipografia
  bg-gray-100 dark:bg-white/5   // Visual
  rounded-lg                    // Bordes
  transition-colors              // Animacion
  hover:bg-gray-200             // Interaccion
">

// Siempre incluir variante dark para fondos y bordes
<div className="bg-gray-50 dark:bg-zinc-950">
<div className="border-gray-200/60 dark:border-white/5">
<div className="text-gray-900 dark:text-white">
```

### 13.3 Glassmorphism (efecto glass)

```tsx
// Clase reutilizable glass-card
<div className="glass-card">
  {/* equivalente a: bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl */}
</div>
```

### 13.4 Colores por categoria — Resumen rapido

```tsx
// Para uso rapido SIN el provider (solo cuando es imposible usarlo):
arquitectura  → emerald-*   (primary: #10b981)
programacion  → blue-*      (primary: #3b82f6)
ciberseguridad → red-*      (primary: #ef4444)
ia            → violet-*    (primary: #8b5cf6)

// PERO: Siempre preferir useCategoryTheme() cuando sea posible
```

---

## 14. Errores Conocidos y Trampas

### 14.1 Bug historico: Rutas hardcodeadas D5 Render

**Problema:** 9 paginas tenian `router.push("/curso/d5-render")` hardcodeado.  
**Solucion:** Se implemento el patron dinamico con `useSearchParams()`.  
**Leccion:** NUNCA hardcodear rutas de curso. Siempre usar el parametro `course`.  
**Archivos afectados:** glosario, marcadores, logros, certificado, buscar, soluciones, perfil, atajos, comparar.  
**Verificacion:** Buscar `d5-render` en el codigo. Solo debe aparecer como fallback en `modulo/[moduleId]/tema/[topicId]/page.tsx`.

### 14.2 Trampa: Colores de categoria hardcodeados

**Problema:** Las paginas de herramientas tenian colores emerald hardcodeados.  
**Solucion:** Se implemento `CategoryThemeProvider` y datos dinamicos en `tools-data.ts`.  
**Leccion:** Siempre usar el provider de tema, nunca asumir la categoria del usuario.

### 14.3 Trampa: Multiple PrismaClient en desarrollo

**Problema:** Next.js en modo desarrollo recarga los modulos, creando multiples instancias de PrismaClient y agotando las conexiones.  
**Solucion:** Se usa un singleton en `src/lib/prisma.ts` con `globalThis`.  
**Leccion:** Siempre importar `db` o `prisma` de los archivos existentes.

### 14.4 Trampa: useSearchParams sin Suspense

**Problema:** Next.js 14+ requiere que componentes con `useSearchParams()` esten dentro de `<Suspense>`.  
**Solucion:** Patron Content/Fallback/Page (ver seccion 8.1).  
**Leccion:** Siempre envolver en Suspense, el build fallara si no se hace.

### 14.5 Trampa: Textos en ingles en la UI

**Problema:** La IA puede generar textos en ingles por defecto.  
**Solucion:** Revision manual + checklist.  
**Leccion:** Todo texto visible DEBE estar en espanol.

---

## 15. Flujo de Trabajo con Git

### 15.1 Estrategia de branches

```
main              ← Produccion (deploy automatico a Vercel)
├── develop       ← Desarrollo activo
├── feature/xxx   ← Nuevas funcionalidades
├── fix/xxx       ← Correccion de bugs
├── refactor/xxx  ← Refactorizacion
└── docs/xxx      ← Cambios en documentacion
```

### 15.2 Convencion de commits

Usar **Conventional Commits** en espanol:

```
feat: agregar sistema de notificaciones
fix: corregir navegacion en pagina de glosario
refactor: migrar paginas a CategoryThemeProvider
docs: actualizar guia de desarrollo con IA
style: ajustar espaciado en tarjetas de modulo
test: agregar tests para API de progreso
chore: actualizar dependencias
```

### 15.3 Flujo de trabajo sugerido

1. Crear branch desde `develop`: `git checkout -b feature/mi-feature`
2. Desarrollar con la IA siguiendo ESTA guia
3. Verificar que el build pasa: `npm run build`
4. Verificar lint: `npm run lint`
5. Commit con mensaje descriptivo
6. Push y crear Pull Request hacia `develop`
7. Review y merge

---

## 16. Checklist de Calidad Pre-Commit

Antes de hacer commit, verificar:

- [ ] `npm run build` pasa sin errores
- [ ] `npm run lint` no muestra errores nuevos
- [ ] No hay rutas de curso hardcodeadas (buscar `/curso/d5-render` o similares)
- [ ] No hay colores de categoria hardcodeados (buscar `emerald-` fuera del tema)
- [ ] No hay `any` en TypeScript
- [ ] Todos los `useSearchParams()` estan dentro de `<Suspense>`
- [ ] Los links de navegacion preservan el contexto del curso (`?course=xxx`)
- [ ] Los textos de la UI estan en espanol
- [ ] Los componentes con hooks tienen `"use client"`
- [ ] Se usa el singleton de Prisma (`import { db } from "@/lib/db"`)
- [ ] Las API routes tienen manejo de errores con try/catch
- [ ] Las API routes protegidas verifican la sesion
- [ ] Los componentes nuevos usan shadcn/ui como base cuando es posible
- [ ] Las animaciones usan Framer Motion, no CSS puro
- [ ] Se incluyo variante dark (`dark:`) para estilos nuevos

---

## 17. Comandos Utiles

```bash
# Desarrollo
npm run dev                    # Iniciar servidor de desarrollo
npm run build                  # Build de produccion (usa scripts/build.sh)
npm run start                  # Iniciar servidor de produccion
npm run lint                   # Ejecutar ESLint

# Base de datos
npm run db:migrate             # Crear migracion nueva
npm run db:seed                # Ejecutar seed principal
npm run db:reset               # Reset completo de la DB
npm run seed:admin             # Crear usuario admin
npm run seed:arquitectura      # Seed curso arquitectura
npm run seed:programacion      # Seed curso programacion
npm run seed:ciberseguridad    # Seed curso ciberseguridad
npm run seed:ia                # Seed curso IA
npm run seed:all-courses       # Seed todos los cursos

# Post-install
npm run postinstall            # Genera Prisma Client automaticamente
```

---

## 18. Variables de Entorno Requeridas

```env
# Base de datos
DATABASE_URL="postgresql://user:password@localhost:5432/academytech"

# NextAuth
NEXTAUTH_SECRET="tu-secreto-super-seguro"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxx"

# Opcional — para funcionalidades avanzadas
# OPENAI_API_KEY="sk-xxx"
```

---

## 19. Reglas Especificas para IA

> **Esta seccion es la que la IA debe leer PRIMERO antes de generar cualquier codigo.**

### 19.1 Antes de escribir codigo

1. **Leer** el schema de Prisma para entender los modelos de datos
2. **Leer** `category-themes.ts` para entender el sistema de temas
3. **Leer** `middleware.ts` para entender la proteccion de rutas
4. **Buscar** si ya existe un componente similar antes de crear uno nuevo
5. **Verificar** que la pagina afectada usa `useSearchParams()` + `Suspense`

### 19.2 Al generar codigo nuevo

1. **Siempre** agregar `"use client"` a componentes con hooks
2. **Siempre** usar TypeScript con tipos explicitos (no `any`)
3. **Siempre** incluir variante dark en estilos Tailwind
4. **Siempre** usar componentes shadcn/ui existentes como base
5. **Siempre** usar `db` de `@/lib/db` para acceso a la base de datos
6. **Siempre** usar el `CategoryThemeProvider` para colores por categoria
7. **Siempre** pasar el parametro `course` en links de navegacion
8. **Siempre** escribir textos de UI en espanol
9. **Siempre** incluir manejo de errores (try/catch) en API routes
10. **Siempre** incluir loading states (skeleton/pulse) para datos asincronos

### 19.3 Al modificar codigo existente

1. **Nunca** cambiar la interfaz publica de un componente sin actualizar todos los usos
2. **Nunca** eliminar un campo del schema Prisma sin crear una migracion
3. **Nunca** cambiar rutas de API sin actualizar el frontend
4. **Nunca** remover el wrapper `<Suspense>` de una pagina
5. **Nunca** cambiar el singleton de Prisma por una nueva instancia
6. **Siempre** mantener compatibilidad hacia atras con los 4 cursos existentes
7. **Siempre** verificar que el build pasa despues de cambios

### 19.4 Al crear nuevas paginas

1. Seguir el patron Suspense (seccion 8.1)
2. Agregar la ruta al middleware si requiere autenticacion
3. Agregar la entrada en el Sidebar si es una pagina principal
4. Usar `CategoryThemeProvider` si muestra contenido por categoria
5. Agregar el link con contexto de curso (`?course=xxx`)

### 19.5 Al crear nuevas API routes

1. Seguir el patron de la seccion 9.1
2. Verificar autenticacion si la ruta es protegida
3. Validar parametros de entrada
4. Manejar errores con try/catch
5. Retornar codigos HTTP apropiados (200, 400, 401, 403, 404, 500)
6. Agregar la ruta en esta documentacion

### 19.6 Patrones prohibidos

```tsx
// ❌ NUNCA hacer esto
any type
new PrismaClient()
router.push("/curso/d5-render")
className="bg-emerald-500" (sin provider)
useSearchParams() sin Suspense
hardcoded course slug en navegacion
texto en ingles en la UI
Componente con hooks sin "use client"
```

### 19.7 patron de verificacion obligatorio

Despues de cada cambio significativo, la IA DEBE ejecutar:

```bash
npm run build   # Verificar que compila
npm run lint    # Verificar que no hay errores de lint
```

Y reportar cualquier error encontrado.

---

## Apendice A: Mapa de Dependencias Clave

```
page.tsx (cualquier pagina)
  └── CategoryThemeProvider
        ├── useCategoryTheme() → category-themes.ts
        └── CategoryBackground.tsx → category-themes.ts
  
  └── useSearchParams() → Suspense boundary
        └── courseSlug → navegacion dinamica

API route (cualquier endpoint)
  └── getServerSession(authOptions) → auth.ts
  └── db → prisma.ts → PrismaClient singleton
  └── Prisma schema → PostgreSQL

Componente de estudio
  └── useStudyStore() → store.ts → Zustand + localStorage
  └── quiz-dialog.tsx → QuizResult type
  └── progress-overview.tsx → UserProgress model
```

## Apendice B: Glosario de Terminos del Proyecto

| Termino | Significado |
|---------|-------------|
| Curso | Unidad principal de aprendizaje (ej: D5 Render, Python, Pentesting) |
| Modulo | Seccion dentro de un curso |
| Tema | Leccion individual dentro de un modulo |
| Categoria | Agrupacion de cursos (arquitectura, programacion, ciberseguridad, ia) |
| Slug | Identificador URL-friendly (ej: `d5-render`, `ciberseguridad`) |
| Racha | Dias consecutivos de estudio del usuario |
| Logro/Achievement | Meta desbloqueable por el usuario |
| Certificado | Documento de finalizacion de un curso |
| Herramientas | Seccion de atajos, comparar, soluciones, glosario, marcadores |
| Glass card | Componente visual con efecto glassmorphism |

---

**Fin del documento.** Este archivo debe mantenerse actualizado con cada cambio significativo en la arquitectura del proyecto.
