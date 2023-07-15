import { NextRequest, NextResponse } from "next/server"

import { Product } from "@/types/product"
import db from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get("category") ?? ""

  let products: Product[] = []

  if (categoryId) {
    products = await db.product.findMany({
      where: {
        categoryId: parseInt(categoryId, 10),
      },
    })
  } else {
    products = await db.product.findMany()
  }

  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  const payload = await request.json()

  console.log(payload)

  const product = await db.product.create({
    data: payload,
  })

  return NextResponse.json(product)
}
