import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "No autorizado", status: 401 } as const;
  }
  if (session.user.role !== "teacher" && session.user.role !== "admin") {
    return { error: "Acceso no autorizado", status: 403 } as const;
  }
  return { userId: session.user.id, role: session.user.role } as const;
}
