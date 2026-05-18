"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User, Mail, Lock, Eye, EyeOff, UserPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthMode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [hasGoogleCredentials, setHasGoogleCredentials] = useState(true);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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
    setError(null);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch {
      setIsLoading(null);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading("guest");
    setError(null);
    try {
      await signIn("guest", { callbackUrl: "/" });
    } catch {
      setIsLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Ingresa un email válido");
      return;
    }

    if (!password || password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (authMode === "register") {
      if (!name.trim()) {
        setError("El nombre es requerido");
        return;
      }

      setIsLoading("register");
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name: name.trim() }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Error al crear la cuenta");
          setIsLoading(null);
          return;
        }

        // Registration successful, now sign in
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
          setIsLoading(null);
          return;
        }

        router.push("/");
      } catch {
        setError("Error de conexión. Intenta de nuevo.");
        setIsLoading(null);
      }
    } else {
      // Login mode
      setIsLoading("credentials");
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
          setIsLoading(null);
          return;
        }

        router.push("/");
      } catch {
        setError("Error de conexión. Intenta de nuevo.");
        setIsLoading(null);
      }
    }
  };

  const switchMode = (mode: AuthMode) => {
    setAuthMode(mode);
    setError(null);
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
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">
                Tu Plataforma de Aprendizaje Tecnológico
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Academy{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                Tech
              </span>
            </h1>
            <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
              {authMode === "login"
                ? "Inicia sesión para guardar tu progreso, notas y evaluaciones en todos tus cursos."
                : "Crea tu cuenta para acceder a todos los cursos y guardar tu progreso."}
            </p>
            <p className="text-[11px] text-gray-500 mt-2 tracking-wider">
              Arquitectura • Programación • Ciberseguridad • IA
            </p>
          </motion.div>

          {/* Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex rounded-xl bg-white/5 border border-white/10 p-1 mb-6"
          >
            <button
              onClick={() => switchMode("login")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                authMode === "login"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "text-gray-400 hover:text-gray-300 border border-transparent"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => switchMode("register")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                authMode === "register"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "text-gray-400 hover:text-gray-300 border border-transparent"
              }`}
            >
              Crear Cuenta
            </button>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email/Password Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="space-y-4"
          >
            {/* Name field - only in register mode */}
            <AnimatePresence>
              {authMode === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Tu nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email field */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading !== null}
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl gap-2 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 disabled:opacity-50"
            >
              {(isLoading === "credentials" || isLoading === "register") ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {authMode === "register" ? "Creando cuenta..." : "Iniciando sesión..."}
                </>
              ) : (
                <>
                  {authMode === "register" ? "Crear Cuenta" : "Iniciar Sesión"}
                </>
              )}
            </Button>
          </motion.form>

          {/* Divider with text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center gap-3 my-6"
          >
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">
              o continuar con
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* Social / Guest Login Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-3"
          >
            {/* Google Login */}
            {hasGoogleCredentials && (
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading !== null}
                className="w-full h-11 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-xl gap-3 transition-all duration-200 hover:shadow-lg hover:shadow-white/5 disabled:opacity-50"
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
                Google
              </Button>
            )}

            {/* Guest Login */}
            <Button
              onClick={handleGuestLogin}
              disabled={isLoading !== null}
              className={`w-full h-11 font-medium rounded-xl gap-3 transition-all duration-200 disabled:opacity-50 ${
                hasGoogleCredentials
                  ? "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
                  : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
              }`}
            >
              {isLoading === "guest" ? (
                <div className="animate-spin w-5 h-5 border-2 border-white/40 border-t-transparent rounded-full" />
              ) : (
                <User className="w-5 h-5" />
              )}
              Invitado
            </Button>
          </motion.div>

          {/* Info text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-[11px] text-gray-500 leading-relaxed">
              {authMode === "login" ? (
                <>
                  Al continuar como invitado, se creará una cuenta temporal.
                  Tu progreso se guardará localmente.{" "}
                  <span className="text-emerald-400/70">
                    Inicia sesión para guardar tu progreso en la nube.
                  </span>
                </>
              ) : (
                <>
                  Al crear una cuenta, podrás guardar tu progreso y acceder
                  a él desde cualquier dispositivo.{" "}
                  <span className="text-emerald-400/70">
                    Tu contraseña está protegida con cifrado seguro.
                  </span>
                </>
              )}
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
