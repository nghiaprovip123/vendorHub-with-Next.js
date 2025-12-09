import { NextResponse, NextRequest } from "next/server"
import getSession from '@/lib/session-helper';

export async function POST (req: NextRequest) {
    try {

        // DECLARE THE VARIABLES
        const searchParams = req.nextUrl.searchParams
        const id = searchParams.get("id")
        const title = searchParams.get("title")
        const image = searchParams.get("image")
        const price = searchParams.get("price")
        const qty = searchParams.get("qty")
        const pid = searchParams.get("[id")

        // ERROR HANDLING IF VARIABLE VALUES DON'T EXIST
        if (!id || !title || !qty || !price || !image) {
            return NextResponse.json(
              { error: 'Missing required parameters' },
              { status: 400 }
            );
          }
          
        const session = await getSession();
        
        if (!session.cardObject) {
            session.cardObject = {}
        }

        const cartProduct = {
            title,
            qty: parseInt(qty),
            price: parseFloat(price),
            image: image || '',
            pid: id, // ← Changed 'id' to 'pid' to match CartItem interface
        };

        session.cardObject[id] = cartProduct;
    
        await session.save(); // SAVE THE SESSION

        return NextResponse.json(
            {
                sucess: true,
                data: session.cardObject,
                totalCartItems: Object.keys(session.cardObject).length
            }
        );   
    }
       catch (error) {
        console.error('Error adding to cart:', error);
        return NextResponse.json(
            { error: 'Failed to add to cart' },
            { status: 500 }
        );
    }
}