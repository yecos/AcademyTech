import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  // API routes - skip middleware (they have their own auth checks)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Public routes - always allow everyone
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname.startsWith("/curso/") ||
    pathname.startsWith("/categoria/") ||
    pathname === "/buscar"
  ) {
    return NextResponse.next();
  }

  // Not authenticated - redirect to login with callback URL
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role as string;

  // Admin routes - only allow admin role
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Teacher routes - only allow teacher or admin roles
  if (
    pathname.startsWith("/profesor") &&
    role !== "teacher" &&
    role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // All other authenticated routes (e.g. /perfil, /marcadores, /logros, /certificado)
  // are allowed since the user is authenticated
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.json|images|logo.svg|robots.txt).*)",
  ],
};
