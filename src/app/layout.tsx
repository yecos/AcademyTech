import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { CourseDataProvider } from "@/hooks/use-course-context";
import { ServiceWorkerRegistration } from "@/components/sw-registration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Render Academy - Plataforma de Aprendizaje 3D",
  description:
    "Aprende las herramientas líderes de renderizado 3D con cursos interactivos, evaluaciones y seguimiento de progreso.",
  keywords: ["renderizado", "3D", "arquitectura", "curso", "aprender", "D5 Render", "Lumion", "V-Ray"],
  openGraph: {
    title: "Render Academy - Plataforma de Aprendizaje 3D",
    description:
      "Aprende las herramientas líderes del mercado con cursos interactivos y seguimiento de progreso.",
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Render Academy",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <AuthProvider>
            <CourseDataProvider>
              {children}
              <Toaster />
              <ServiceWorkerRegistration />
            </CourseDataProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
