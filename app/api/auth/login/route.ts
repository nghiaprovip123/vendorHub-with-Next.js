import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist in the system" },
        { status: 400 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { message: "Wrong Password" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ token });
  } catch (err) {
    return NextResponse.json(
      { error: "Unknown Error" },
      { status: 500 }
    );
  }
}
