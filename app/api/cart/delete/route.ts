import { NextResponse , NextRequest } from "next/server"
import { getSession } from "@/lib/session-helper" 

export async function DELETE (req: NextRequest) {
    try {
        
        // Edogawa Reads Query Parametes
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");


        // Edogawa Validates for Input Data
        if (!id) {
            return NextResponse.json(
                { error: "Missing required information" },
                { status: 400 } // bad request
            )
        }

        // Edogawa Start a Session for the World
        const session = await getSession();
        
        // Define "cart_data_obj"
        session.cart_data_obj = session.cart_data_obj ?? {};

        // Delete Product in Cart Object
        if (session.cart_data_obj && session.cart_data_obj[id]) {
            delete session.cart_data_obj[id];
            await session.save()
        }
        // Return JSON Response to Client
        return NextResponse.json(
            { message: "Delete the Product Cart Successfully", data: session.cart_data_obj[id] },
            { status: 200 }
        )
    } 
    catch (err: any) {
        return NextResponse.json(
            { error: "Unknown Error"},
            { status: 500 }
        )
    }
}
