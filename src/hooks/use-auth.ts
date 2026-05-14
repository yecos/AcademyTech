"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user ?? null;
  const isTeacher = user?.role === "teacher";
  const isAdmin = user?.role === "teacher" || user?.role === "admin";
  const isGuest = user?.email?.endsWith("@d5academy.guest") ?? false;

  const login = () => {
    router.push("/login");
  };

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const loginAsGuest = () => {
    signIn("guest", { callbackUrl: "/" });
  };

  const logout = () => {
    signOut({ callbackUrl: "/" });
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    isTeacher,
    isAdmin,
    isGuest,
    login,
    loginWithGoogle,
    loginAsGuest,
    logout,
  };
}
