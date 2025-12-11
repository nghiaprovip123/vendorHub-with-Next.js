import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

function requireAuth(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const user = token && verifyToken(token);
  return user;
}

export async function GET(req: NextRequest) {
  try {
    const user = requireAuth(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const categories = await prisma.category.findMany();

    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { cid, title, image } = body;

    if (!cid || !title) {
      return NextResponse.json(
        { error: "cid and title are required" },
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        cid,
        title,
        image: image ?? "category.jpg",
      },
    });

    return NextResponse.json(
      { message: "Category created", category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category", details: error },
      { status: 500 }
    );
  }
}
