// app/api/categories/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  // 💡 FIX: Nhận toàn bộ đối tượng context, không chỉ destructure { params }
  context: { params: { id: string } } 
) {
  console.log("-----------------------------------------");
  console.log("SERVER LOG: Received Params object:", context); 
  console.log("-----------------------------------------");
  try {
    const { id } = context.params; // Lấy giá trị ID từ context.params
    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }
    
    // Tiếp tục logic xóa (Đảm bảo folder dynamic là [id] và bạn đang xóa bằng _id)
    // Dựa trên schema Prisma của bạn, ID chính là _id
    const deleted = await prisma.category.delete({
      where: { id: id }, 
    });

    return NextResponse.json(
      { message: "Category deleted", deleted },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Delete error:", err);
    // Xử lý lỗi 404 Not Found (P2025) cho trường hợp không tìm thấy ID
    if (err.code === 'P2025') {
       return NextResponse.json({ error: "Category not found or already deleted." }, { status: 404 });
    }

    return NextResponse.json(
      { error: err.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}