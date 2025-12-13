import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST( req: NextRequest ) {
    try {
        const body = await req.json();
        const {
            email,
            password
        } = await body;

        if(!email || !password) {
            return NextResponse.json(
                { error: "Missing important information" },
                { status: 400 } // BAD REQUEST
            )
        }

        const savePassword = await prisma.user.create(
            {
                data: { email, password }
            }
        );

        return NextResponse.json(
            { message: "Create an account successfullt" },
            { status: 201 }
        )
    }
    catch(err: any) {
        return NextResponse.json(
            { error: "Unknown Error" },
            { status: 500 }
        )
    }
}