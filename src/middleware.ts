import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (!auth) return NextResponse.redirect(new URL("/Login", req.url));

  const token = auth.startsWith("Bearer ") ? auth.slice(7) : auth;

  try {
    await jwtVerify(token, SECRET);

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/Login", req.url));
  }
}

export const config = {
  matcher: ["/api/Users"]
}