import { prisma } from "@/lib/prisma"; // Corrected import
import { NextResponse } from "next/server";

// GET -> Fetch Categories.
export async function GET() {
  try {
    // This query is correctly structured to fetch all records from the 'Category' model.
    const categories = await prisma.category.findMany(); 

    // Returns a successful JSON response.
    return NextResponse.json({ categories });
  } catch (error) {
    // Returns a structured error response on failure.
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST → Create Category.
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { cid, title, image } = body

    if (!cid || !title) {
      return NextResponse.json(
        { error: "cid and title are required" },
        { status: 400 }
      )
    }
    const newCategory = await prisma.category.create({
      data: {
        cid,
        title,
        image: image ?? "category.jpg",
      },
    })
    return NextResponse.json(
      { message: "Category created", category: newCategory },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category", details: error },
      { status: 500 }
    )
  }
}

