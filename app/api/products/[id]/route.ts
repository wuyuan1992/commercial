import { NextRequest, NextResponse } from "next/server"

import db from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: any) {
  const id = parseInt(params.id, 10)

  const product = await db.product.findFirst({
    where: { id },
  })

  return NextResponse.json(product)
}

export async function PUT(request: NextRequest, { params }: any) {
  const payload = await request.json()
  const id = parseInt(params.id, 10)

  const product = await db.product.update({
    where: { id },
    data: payload,
  })

  return NextResponse.json(product)
}

export async function DELETE(request: NextRequest, { params }: any) {
  const id = parseInt(params.id, 10)

  await db.product.delete({
    where: { id },
  })

  return NextResponse.json({ success: true })
}
