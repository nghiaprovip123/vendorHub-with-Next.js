// app/api/categories/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// DELETED API FOR CATEGORY
export async function DELETE(
  req: Request,
  context: { params: {id: string} }
) {
  const { id } = await context.params;   // ✔ MUST await

  console.log("ID:", id);

  if (!id) {
    return NextResponse.json(
      { error: "Category ID is required" },
      { status: 400 }
    );
  }

  try {
    const deleted = await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Category deleted",
      deleted,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return NextResponse.json(
        { error: "Category not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: err.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}


// VIEW CATEGORY DETAILS
export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    // ❗ FIX #1 — params is NOT a Promise. Do NOT use await.
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    // ❗ FIX #2 — findUnique requires exact key name
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (err: any) {
    console.error("View Category Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}