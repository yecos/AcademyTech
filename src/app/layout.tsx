import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { CourseDataProvider } from "@/hooks/use-course-context";
import { ServiceWorkerRegistration } from "@/components/sw-registration";
import { AppLayout } from "@/components/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Academy Tech - Tu Plataforma de Aprendizaje Tecnológico",
  description:
    "Aprende Arquitectura, Programación, Ciberseguridad e Inteligencia Artificial con cursos interactivos, evaluaciones y seguimiento de progreso.",
  keywords: ["tecnología", "arquitectura", "programación", "ciberseguridad", "inteligencia artificial", "curso", "aprender", "academy tech"],
  openGraph: {
    title: "Academy Tech - Tu Plataforma de Aprendizaje Tecnológico",
    description:
      "Aprende Arquitectura, Programación, Ciberseguridad e IA con cursos interactivos y seguimiento de progreso.",
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Academy Tech",
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
              <AppLayout>
                {children}
              </AppLayout>
              <Toaster />
              <ServiceWorkerRegistration />
            </CourseDataProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
