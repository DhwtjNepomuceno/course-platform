import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { sendResetMail } from "@/lib/mailer";

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
      { error: "Inexistent or invalid e-mail." },
      { status: 401 },
    );
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  await sendResetMail(user.email);

  const response = NextResponse.json({
    message: "Sending link to your E-mail.",
    data: {
      token,
      user: {
        email: user.email,
      },
    },
    successed: true,
    status: 200,
  });

  return response;
}