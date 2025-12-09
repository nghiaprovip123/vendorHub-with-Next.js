import { NextResponse, NextRequest } from "next/server"
import { getSession } from "@/lib/session-helper"

export async function PATCH(req: NextRequest) {
    try {


        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const qty = searchParams.get("qty");


        if (!id || !qty) {
            return NextResponse.json(
                {error: "Missing an important information"},
                {status: 400}
            )
        }

        const session = await getSession();

        session.cart_data_obj = session.cart_data_obj ?? {};

        if (session.cart_data_obj && session.cart_data_obj[id]) {
            session.cart_data_obj[id].qty = parseInt(qty)
            await session.save()
        }

        return NextResponse.json(
            { message: "Update the Cart successfully", session: session.cart_data_obj },
            { status: 201 }
        )
    }
    catch (err: any) {
        return NextResponse.json (
            { error: "Unknown Error"},
            { status: 500 } 
        )
    }
}
