import { prisma } from "@/lib/prisma"; // Corrected import
import { NextResponse } from "next/server";

// CREATE PRODUCT ---> NEED TO DOCUMENT ON CONFLUENCE
export async function POST(req:Request) {
    try {
        const body = await req.json();
        const {
            pid,
            categoryId,
            image,
            title,
            price,
        } = body
        if (!pid || !categoryId || !title) {
            return NextResponse.json(
                { error: "Product ID, Title, Category are missing out!" },
                { status: 400 }
            )
        }
        const newProduct = await prisma.product.create(
            {data: {
                categoryId,
                pid,
                image,
                title,
                price: Number(price),}
            },
        )
        return NextResponse.json(
            {message: "Product is create successfully", product: newProduct},
            {status: 201}
        )
    }
    catch (err: any) {
        return NextResponse.json (
            {error: "Unknown Error"},
            {status: 500}
        )
    }
}