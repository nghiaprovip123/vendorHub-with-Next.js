import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";


export async function GET( req: NextRequest ) {
    try {
   // [STEP 1] GET AUTHORIZATION CODE FROM CALLBACK URL AND PROCESS ERROR HANDLING
   const searchParams = await req.nextUrl.searchParams;
   const code = await searchParams.get("code")

   if(!code) {
       return NextResponse.json(
           { error: "No Authorization Code is Found" },
           { status: 400 }
       )
   }

   // [STEP 2] EXCHANGE AUTHORIZATION CODE FOR TOKENS FOR CLIENT PERMISSION
   const getTokens = await fetch(`https://oauth2.googleapis.com/token`, {
       method: "POST",
       headers: {
           "Content-Type": "application/x-www-form-urlencoded",
       },
       body: new URLSearchParams(
           {
               code,
               client_id: process.env.GOOGLE_CLIENT_ID!,
               client_secret: process.env.GOOGLE_CLIENT_SECRET!,
               redirect_url: process.env.REDIRECT_URI!,
               grant_type: "authorization_code"
           }
       )
   })

   const token = await getTokens.json();

   if(!token) {
       return NextResponse.json(
           { error: "Fail to Exchange Authorization Code" },
           { status: 400 }
       )
   }

   const getUserInfo = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
       headers: {
           Authorization: `Bearer ${token.access_token}`,
       }
   })

   const userInfo = await getUserInfo.json()

   if (!userInfo) {
       return NextResponse.json(
           { error: "Fail to fetch User Info" },
           { status: 400 }
       )
   }

   let findUserInfo = await prisma.user.findUnique(
       { where: {email: userInfo.email} }
   )

   if (!findUserInfo) {
       findUserInfo = await prisma.user.create(
           {
               data: {
                   email: userInfo.email,
                   name: userInfo.name || "",
                   password: ""
               }
           }
       )
   }

   const accessToken = await jwt.sign(
       {
           id: findUserInfo.id,
           email: findUserInfo.email,
       }, 
       process.env.JWT_SECRET!,
       {expiresIn: "15m"}
   )

   const refreshToken = await jwt.sign(
       {
           id: findUserInfo.id,
           email: findUserInfo.email,
       }, 
       process.env.JWT_SECRET!,
       {expiresIn: "7d"}
   );

   const response = NextResponse.redirect(
     new URL("/dashboard", req.url)
   );

   response.cookies.set(
       {
           name: "refreshToken",
           value: refreshToken,
           httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           maxAge: 60 * 60 * 24 * 7,
           sameSite: "strict",
           path: "/"
       }
   );

   return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: "Unknown Error" },
            { status: 500 }
        )
    }
 
}

