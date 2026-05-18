import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcryptjs from "bcrypt";

export async function GET(req: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json({
        message: "Users successfully listed.",
        data: users,
        status: 200
    })
}