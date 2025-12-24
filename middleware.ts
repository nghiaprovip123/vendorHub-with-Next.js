import { NextRequest, NextResponse } from "next/server";

import { PUBLIC_PATHS } from "./src/constants/path";

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const { pathname } = req.nextUrl;
  
  const isPublicPath = PUBLIC_PATHS?.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!refreshToken && !isPublicPath) {
    return NextResponse.redirect(new URL("/authentication", req.url));
  }

  if (refreshToken && pathname === "/authentication") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};