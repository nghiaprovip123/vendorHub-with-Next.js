import { prisma } from "@/lib/prisma"; // Corrected import
import { NextResponse } from "next/server";

// GET PRODUCT ---> NEED TO DOCUMENT ON CONFLUENCE
export async function GET(req: Request) {
    try {
        const products = await prisma.product.findMany()
        return NextResponse.json(
            {message: "fetch successfully products", productList: products},
            {status: 200}
        )
    }

    catch (err:any) {
        return NextResponse.json (
            {error: "fail to fetch products"},
            {status: 401}
        )
    }
}

// CREATE PRODUCT ---> NEED TO DOCUMENT ON CONFLUENCE
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { pid, title, cid, image, price } = body;

        if (!pid || !title) {
            return NextResponse.json(
                { error: "Product ID and Title are required" },
                { status: 400 }
            );
        }

        const newProduct = await prisma.product.create({
            data: {
                pid,
                title,
                cid,
                image,
                price,
            },
        });

        return NextResponse.json(
            { message: "Product created", product: newProduct },
            { status: 201 }
        );
    } 
    
    catch (error) {
        console.error("Create product error:", error);
        return NextResponse.json(
            { error: "Fail to create a new product." },
            { status: 500 }
        );
    }
}
