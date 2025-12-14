import { NextRequest, NextResponse } from "next/server"

export async function POST () {
    const response = NextResponse.json(
        { message: "Logout successfully" }
    )

    response.cookies.set(
        {
            name: "refreshToken",
            value: "0",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0),
            sameSite: "strict"
        }
    )
    return response
}