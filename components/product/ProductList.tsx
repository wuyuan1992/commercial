"use client"

import { useCallback, useState } from "react"
import { Empty, Skeleton } from "@douyinfe/semi-ui"

import type { Product } from "@/types/product"
import EditProductModal from "@/components/product/EditProductModal"
import ProductCard from "@/components/product/ProductCard"

function ProductList({
  products,
  isLoading,
}: {
  products: Product[]
  isLoading: boolean
}) {
  const [product, setProduct] = useState<Product | null>(null)
  const onCancel = useCallback(() => setProduct(null), [])

  // 使用权限控制
  const isAdmin = true

  return (
    <>
      <Skeleton loading={isLoading}>
        {products.length === 0 ? (
          <Empty description="暂无商品" />
        ) : (
          <div
            className="grid justify-items-center gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            {products.map((product) => (
              <ProductCard
                product={product}
                onEdit={() => setProduct(product)}
                showEdit={isAdmin}
              />
            ))}
          </div>
        )}
      </Skeleton>

      {product && <EditProductModal product={product} onCancel={onCancel} />}
    </>
  )
}

export default ProductList
