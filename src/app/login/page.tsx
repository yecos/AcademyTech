"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [hasGoogleCredentials, setHasGoogleCredentials] = useState(true);

  useEffect(() => {
    fetch("/api/auth-config")
      .then((res) => res.json())
      .then((data) => {
        setHasGoogleCredentials(data.googleAvailable);
      })
      .catch(() => {
        setHasGoogleCredentials(false);
      });
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/");
    }
  }, [status, session, router]);

  const handleGoogleLogin = async () => {
    setIsLoading("google");
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch {
      setIsLoading(null);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading("guest");
    try {
      await signIn("guest", { callbackUrl: "/" });
    } catch {
      setIsLoading(null);
    }
  };

  // Don't render anything while checking auth status
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Login Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl">
          {/* Logo & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">
                Plan de Estudio Interactivo
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Academia{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                D5 Render
              </span>
            </h1>
            <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
              Inicia sesión para guardar tu progreso, notas y evaluaciones
              a través del curso completo.
            </p>
          </motion.div>

          {/* Login Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3"
          >
            {/* Google Login */}
            {hasGoogleCredentials && (
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading !== null}
                className="w-full h-12 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-xl gap-3 transition-all duration-200 hover:shadow-lg hover:shadow-white/5"
              >
                {isLoading === "google" ? (
                  <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                Iniciar sesión con Google
              </Button>
            )}

            {/* Guest Login */}
            <Button
              onClick={handleGuestLogin}
              disabled={isLoading !== null}
              className={`w-full h-12 font-medium rounded-xl gap-3 transition-all duration-200 ${
                hasGoogleCredentials
                  ? "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
              }`}
            >
              {isLoading === "guest" ? (
                <div className="animate-spin w-5 h-5 border-2 border-white/40 border-t-transparent rounded-full" />
              ) : (
                <User className="w-5 h-5" />
              )}
              Continuar como invitado
            </Button>
          </motion.div>

          {/* Divider with text */}
          {hasGoogleCredentials && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-3 my-6"
            >
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                o
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </motion.div>
          )}

          {/* Info text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Al continuar como invitado, se creará una cuenta temporal.
              Tu progreso se guardará localmente.{" "}
              <span className="text-emerald-400/70">
                Inicia sesión con Google para guardar tu progreso en la nube.
              </span>
            </p>
          </motion.div>
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full mt-6"
        />
      </motion.div>
    </div>
  );
}
