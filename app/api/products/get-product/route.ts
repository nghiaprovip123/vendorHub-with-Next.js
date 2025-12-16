// import { prisma } from "@/lib/prisma"; // Corrected import
// import { NextResponse } from "next/server";

// // GET PRODUCT ---> NEED TO DOCUMENT ON CONFLUENCE
// export async function GET(req: Request) {
//     try {
//         const products = await prisma.product.findMany()
//         return NextResponse.json(
//             {message: "fetch successfully products", productList: products},
//             {status: 200}
//         )
//     }

//     catch (err:any) {
//         return NextResponse.json (
//             {error: "fail to fetch products"},
//             {status: 401}
//         )
//     }
// }

