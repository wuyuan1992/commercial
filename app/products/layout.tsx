"use client"

import ProductMenu from "@/components/product/ProductMenu"

interface ProductLayoutProps {
  children: React.ReactNode
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div className="flex gap-4" style={{ height: "calc(100vh - 32px)" }}>
      <div className="h-full w-[240px]">
        <ProductMenu />
      </div>
      <div className="h-full flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}
