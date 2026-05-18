import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, birthday, email, password } = body;

    if (!name || !birthday || !email || !password)
      NextResponse.json(
        { error: "E-mail, name, and password are required." },
        { status: 400 },
      );

    const newUser = await prisma.user.create({
      data: {
        name,
        birthday,
        email,
        password,
      },
    });

    return NextResponse.json(
      {
        message: "User created",
        user: {
          id: newUser.id,
          name: newUser.name,
          birthday: newUser.birthday,
          email: newUser.email,
        },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error: ", errorMessage);

    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { erro: 'This e-mail alredy exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
    try {
        const users = await prisma.user.findMany();

        return NextResponse.json({
            total: users.length,
            users,
        });
    } catch (error) {
        console.error("Error when listing users: ", error);
        return NextResponse.json(
      { erro: 'Error when listing users' },
      { status: 500 }
    );
    }
}
