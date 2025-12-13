import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Change this to match your cookie name
    const refreshToken = req.cookies.get("refreshToken")?.value; // Changed from "refreshToken"
    
    console.log("Refresh token from cookie:", refreshToken);
    
    if (!refreshToken) {
      return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    
    console.log("Decoded token:", decoded);

    const userId = decoded.id;

    if (!userId) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 403 });
    }

    if (user.refreshToken !== refreshToken) {
        console.log("=== TOKEN MISMATCH DEBUG ===");
        console.log("Stored in DB:", user.refreshToken);
        console.log("Received from cookie:", refreshToken);
        console.log("Are they equal?", user.refreshToken === refreshToken);
        console.log("Stored length:", user.refreshToken?.length);
        console.log("Received length:", refreshToken.length);
        console.log("========================");
        return NextResponse.json({ error: "Token mismatch" }, { status: 403 });
      }

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    if (err instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ 
        error: "Invalid refresh token", 
        details: err.message 
      }, { status: 403 });
    }
    if (err instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ 
        error: "Refresh token expired", 
        details: err.message 
      }, { status: 403 });
    }
    return NextResponse.json({ 
      error: "Invalid refresh token",
      details: err instanceof Error ? err.message : "Unknown error"
    }, { status: 403 });
  }
}