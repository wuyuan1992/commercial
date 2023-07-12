import { NextRequest, NextResponse } from "next/server"

import db from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const productCategories = await db.productCategory.findMany({
    include: {
      Product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  console.log({ productCategories })

  return NextResponse.json(productCategories)
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  console.log({ data })

  const productCategory = await db.productCategory.create({
    data,
  })

  return NextResponse.json(productCategory)
}
