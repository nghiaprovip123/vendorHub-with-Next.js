import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt  from "bcryptjs"
import jwt from"jsonwebtoken"

export async function POST(req: Request) {
  try {
    
    const body = await req.json();
    const {
      email,
      password
    } = await body

    const user = await prisma.user.findUnique(
      { where: { email } }
    )

    if(!user) {
      return NextResponse.json(
        { error: "User doesn't exist in the system" },
        { status: 400 }
      )
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
      return NextResponse.json(
        { error: "Wrong password" },
        { status: 400 }
      )
    }

    const accessToken = await jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    )

    const refreshToken = await jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    const response = await NextResponse.json(
      { message: "Login successfully", accessToken: accessToken }
    )

    response.cookies.set(
      {
        name: "refreshToken",
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        path: "/",
      })

      return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "Unknown Error" },
      { status: 500 }
    )
  }
}

