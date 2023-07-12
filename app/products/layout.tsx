"use client"

import CreateProductCategory from "@/components/product/CreateProductCategory"
import ProductCategoryMenu from "@/components/product/ProductCategoryMenu"

interface ProductLayoutProps {
  children: React.ReactNode
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col gap-4">
        <ProductCategoryMenu />
        <CreateProductCategory />
      </div>
      <div className="p-4 ">{children}</div>
    </div>
  )
}
