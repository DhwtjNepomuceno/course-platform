import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcryptjs from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body) {
    return NextResponse.json(
      { error: "Failed to login: no data" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Email or password incorrect." },
      { status: 401 },
    );
  }

  const correctPassword = await bcryptjs.compare(body.password, user.password);

  if (!correctPassword) {
    return NextResponse.json(
      { error: "Email or password incorrect." },
      { status: 401 },
    );
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({
    message: "Login bem-sucedido",
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    successed: true,
    status: 200,
  });

  return response;
}
