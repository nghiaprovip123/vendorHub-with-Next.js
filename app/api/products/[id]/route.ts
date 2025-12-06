import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


// DELETE A CERTAIN PRODUCT
export async function DELETE (
    req: Request,
    context: { params: {id: string} }
) {
    const { id } = await context.params

    if (!id) {
        return NextResponse.json(
            { error: "ID isn't found" },
            {status: 400} //status indicated for bad request
        )
    }

    try {
        const deleteProduct = await prisma.product.delete(
            {where: { id }},
        );
        return NextResponse.json(
            {message: "Sucessfully delete the product", product: deleteProduct},
            { status: 201 },
        )
    }
    
    catch (err:any) {
        return NextResponse.json (
            {error: "Unknown Error"},
            {status: 500} //Bad Request
        )
    }
}

// GET CERTAIN PRODUCT DETAILS
export async function GET (
    req: Request,
    context: {
        params: {
            id: string
        }
    }
) {
    const {id} = await context.params
    if (!id) {
        return NextResponse.json(
            {error: "id isn't exist. ."},
            {status: 400} //BAD REQUEST
        )
    }
    
    try {
        const viewCertainProduct = await prisma.product.findUnique({
                where: {id}
            }
        )
        return NextResponse.json(
            {message: "get product details successfully", product: viewCertainProduct},
            {status: 200}
        )
    }
    
    catch(err:any) {
        return NextResponse.json(
            {error: "Unknown Error"},
            {status: 500}
        )
    }
}