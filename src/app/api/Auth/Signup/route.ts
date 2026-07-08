import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SignupRequest } from "@/utils";
import { hashPassword } from "@/utils/hash";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body: SignupRequest = await req.json();
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

    const token = jwt.sign(
        { email: body.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

    const createdUser = await prisma.user.create({
      data: {
        name: body.name,
        birthday: new Date(body.birthday),
        email: body.email,
        password: hashedPassword,
        token
      },
    });

    return NextResponse.json({
      message: "Data successfuly received.",
      successed: true,
      data: {
        token,
        user: {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
        },
      },
      status: 200,
    });
  } catch (error) {
    console.error("Unexpected issue to procees the request", error);

    return NextResponse.json(
      { error: "Unexpected issue to process the request.", 
        status: 500, 
        successed: false },
      { status: 500 },
    );
  }
}
