import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    // ─────────────────────────────────────────────
    // STEP 1: Get authorization code
    // ─────────────────────────────────────────────
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "No authorization code found" },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // STEP 2: Exchange code for Google tokens
    // ─────────────────────────────────────────────
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });

    const token = await tokenRes.json();

    if (!token.access_token) {
      return NextResponse.json(
        { error: token.error_description || "Token exchange failed" },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // STEP 3: Fetch Google user info
    // ─────────────────────────────────────────────
    const userRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );

    const userInfo = await userRes.json();

    if (!userInfo?.email) {
      return NextResponse.json(
        { error: "Failed to fetch user info" },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // STEP 4: Find or create user
    // ─────────────────────────────────────────────
    let user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userInfo.email,
          name: userInfo.name ?? "",
          password: null, // OAuth user → no password
        },
      });
    }

    // ─────────────────────────────────────────────
    // STEP 5: Generate JWTs (sync)
    // ─────────────────────────────────────────────
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // ─────────────────────────────────────────────
    // STEP 6: Persist refresh token (revocable)
    // ─────────────────────────────────────────────
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // ─────────────────────────────────────────────
    // STEP 7: Redirect + set cookies
    // ─────────────────────────────────────────────
    const response = NextResponse.redirect(
      new URL("/dashboard", req.url)
    );

    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // important for OAuth redirects
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: false,
      maxAge: 60 * 15,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
