import { NextResponse, NextRequest } from "next/server"
import { getSession } from "@/lib/session-helper"


export async function GET(req: NextRequest) {
    try {

        // Edogawa Reads the Query Parameters from URL

        // Edogawa Create a Session for the World
        const session = await getSession();
        session.cart_data_obj = session.cart_data_obj ?? {};

        // Check if Session is available 
        if (session.cart_data_obj) {
            session.cart_data_obj
            await session.save()
        }

        return NextResponse.json(
            {message: "Get successfully Cart Object", session: session.cart_data_obj},
            {status: 201}
        )

    }

    catch (err: any) {
        return NextResponse.json(
            { error: "Fail to get Cart Object from Session File" },
            { status: 500 }
        )
    }
}

