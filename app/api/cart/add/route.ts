import { NextResponse , NextRequest } from "next/server"
import { getSession } from "@/lib/session-helper" 

export async function POST (req: NextRequest) {
    try {
        
        // Edogawa Reads Query Parametes
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const title = searchParams.get("title")
        const image = searchParams.get("image")
        const qty = searchParams.get("qty")
        const price = searchParams.get("price")
        const pid = searchParams.get("pid")

        // Edogawa Validates for Input Data
        if (!id || !image || !title || !qty || !price || !pid) {
            return NextResponse.json(
                { error: "Missing required information" },
                { status: 400 } // bad request
            )
        }

        // Edogawa Start a Session for the World
        const session = await getSession();
        
        // Edogawa Creates an Product Cart's Properties
        const ProductCardProperties = {
            title,
            image,
            qty: parseInt(qty),
            price: parseInt(qty),
            pid,
        }

        // Define "cart_data_obj"
        session.cart_data_obj = session.cart_data_obj ?? {}

        // Assign Received Parameter to "cart_data_obj" -> Create a Cart
        session.cart_data_obj[id] = ProductCardProperties

        // Save the 7 Days Session as Mentioned Configuration
        await session.save()

        // Return JSON Response to Client
        return NextResponse.json(
            { message: "Add to Cart Successfully", data: session.cart_data_obj },
            { status: 201 }
        )
    } 
    catch (err: any) {
        return NextResponse.json(
            { error: "Unknown Error"},
            { status: 500 }
        )
    }
}
