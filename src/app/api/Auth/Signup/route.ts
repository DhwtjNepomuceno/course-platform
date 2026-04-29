import { NextRequest, NextResponse } from "next/server";

import { SignupFields } from "@/app/utils";

export async function POST(req: NextRequest) {
  try {
    const body: SignupFields = await req.json();
    console.log("Body received:", body);

    if (!body.email || !body.password || !body.isAccepted) {
      return NextResponse.json(
        { error: "E-mail, password and accepting the Therms are required." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Data successfuly received.",
        data: body,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unexpected issue to procees the request", error)
    return NextResponse.json(
      { error: "Unexpected issue to process the request." },
      { status: 500 },
    );
  }
}
