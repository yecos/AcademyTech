import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Academia D5 Render - Plan de Estudio Interactivo",
  description:
    "Plataforma interactiva para seguir tu progreso en el curso de D5 Render. 10 módulos, 60 temas y evaluaciones para dominar el renderizado en tiempo real.",
  keywords: ["D5 Render", "renderizado", "3D", "arquitectura", "curso", "aprender"],
  openGraph: {
    title: "Academia D5 Render - Plan de Estudio Interactivo",
    description:
      "Sigue tu progreso en el curso completo de D5 Render con evaluaciones interactivas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
