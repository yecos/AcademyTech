"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full mx-4 text-center space-y-5">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-500 dark:text-amber-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            ¡Ups! Algo salió mal
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo o vuelve al inicio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={reset}
            className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            Reintentar
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 gap-2"
            >
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
