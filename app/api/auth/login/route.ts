import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt  from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body; // Remove unnecessary await

    const user = await prisma.user.findUnique({
      where: { email }
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
        { error: "Wrong password" },
        { status: 400 }
      );
    }

    // Generate tokens with BOTH id and email
    const accessToken = jwt.sign(
      { id: user.id, email: user.email }, // ← Added email
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email }, // ← Added email
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // **CRITICAL: Save refresh token to database**
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: refreshToken }
    });

    const response = NextResponse.json({
      message: "Login successfully",
      accessToken: accessToken
    });

    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
      path: "/",
    });

    return response;

  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Unknown Error", details: error.message },
      { status: 500 }
    );
  }
}