import { NextResponse, NextRequest } from "next/server"

export async function GET ( req: Request ){
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

    googleAuthUrl.searchParams.append('client_id', process.env.GOOGLE_CLIENT_ID!);
    googleAuthUrl.searchParams.append('client_secret', process.env.GOOGLE_CLIENT_SECRET!);
    googleAuthUrl.searchParams.append('scope', "openid profile email");
    googleAuthUrl.searchParams.append('redirect_uri', "http://localhost:3000/api/auth/callback/google");
    googleAuthUrl.searchParams.append('response_type', "code");
    googleAuthUrl.searchParams.append('access_type', "offline");

    return NextResponse.redirect(googleAuthUrl.toString())
} 
