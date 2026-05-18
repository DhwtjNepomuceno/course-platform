import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (!auth) return NextResponse.redirect(new URL("/Login", req.url));

  const token = auth.startsWith("Bearer ") ? auth.slice(7) : auth;

  try {
    jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.next();
  } catch (e: unknown) {
    console.log(e)
    return NextResponse.redirect(new URL("/Login", req.url));
  }
}
