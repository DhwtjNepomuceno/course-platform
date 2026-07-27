import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.password) {
      return NextResponse.json(
        {error: "Missing data."},
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {email: body.email},
    });

    if (!user) {
      return NextResponse.json(
        { error: "Account not found." },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await prisma.user.update({
      where: { email: body.email },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      {
        message: "Password changed successfully.",
        successed: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unexpected error." },
      { status: 500 }
    );
  }
}
