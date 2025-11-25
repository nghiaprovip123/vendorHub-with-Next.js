// app/api/categories/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
