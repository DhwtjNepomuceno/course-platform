import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BackSignupFields } from "@/utils";
import { hashPassword } from "@/utils/hash";

export async function POST(req: NextRequest) {
  try {
    const body: BackSignupFields = await req.json();
    console.log("Body received:", body);
    const hashedPassword = await hashPassword(body.password);

    if (!body.email) {
      return NextResponse.json(
        { error: "E-mail is required." },
        { status: 400 },
      );
    }

    if (!body.password) {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 },
      );
    }
    const createdUser = await prisma.user.create({
      data: {
        name: body.name,
        birthday: new Date(body.birthday),
        email: body.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Data successfuly received.",
      data: createdUser,
      status: 200,
    });
  } catch (error) {
    console.error("Unexpected issue to procees the request", error);
    return NextResponse.json(
      { error: "Unexpected issue to process the request." },
      { status: 500 },
    );
  }
}
