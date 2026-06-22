import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json({
        message: "Users successfully listed.",
        data: users,
        status: 200
    })
}