import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST (req: Request) {
    try {
        const body = await req.json();
        const {
            oid,
            user_id,
            full_name,
            email,
            phone,
            address,
            city,
            state,
            price,
            shipping_method,
            sku
        } = await body


        if (!oid || !user_id || !phone){
            return NextResponse.json(
                { message: "Missing Required Information" },
                {status: 400}
            )
        }

        const newCartOrder = await prisma.cartOrder.create(
            {
                data: {
                    oid,
                    user_id,
                    full_name,
                    email,
                    phone,
                    address,
                    city,
                    state,
                    price,
                    shipping_method,
                    sku,
                }
            }
        )
        return NextResponse.json(
            { message: "Create a Cart Order Successfully", data: newCartOrder },
            { status: 201 }
        )
    }
    catch(err:any) {
        return NextResponse.json(
            { error: "Fail to Create a new Cart Order" },
            { status: 500 }
        )
    }
}