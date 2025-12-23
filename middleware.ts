import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const { pathname } = req.nextUrl;

  if (!refreshToken && pathname !== "/authentication") {
    return NextResponse.redirect(new URL("/authentication", req.url));
  }

  if (refreshToken && pathname === "/authentication") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|login).*)",
  ],
};
