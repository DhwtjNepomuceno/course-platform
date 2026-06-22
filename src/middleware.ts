import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const protectedRoute =
    req.nextUrl.pathname.startsWith("/Home") ||
    req.nextUrl.pathname.startsWith("/api");

  if (!auth && protectedRoute) return NextResponse.redirect(new URL("/Login", req.url));

  if (!protectedRoute)
    try {
      if (!auth) {
        throw new Error("Token not found");
      }
      await jwtVerify(auth, SECRET);

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/Login", req.url));
    }
}

export const config = {
  matcher: ["/api/Users, "],
};
