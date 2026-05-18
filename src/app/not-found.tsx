import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full mx-4 text-center space-y-5">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center">
            <FileQuestion className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white">
            404
          </h1>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Página no encontrada
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <Link href="/">
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
