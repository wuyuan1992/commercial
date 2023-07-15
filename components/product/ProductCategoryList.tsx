"use client"

import { Empty, Skeleton } from "@douyinfe/semi-ui"

import type { ProductCategory } from "@/types/product"

function ProductCategoryList({
  productCategories,
  isLoading,
}: {
  productCategories: ProductCategory[]
  isLoading: boolean
}) {
  return (
    <>
      <Skeleton loading={isLoading}>
        {ProductCategoryList.length === 0 ? (
          <Empty description="暂无分类" />
        ) : (
          <div
            className="grid justify-items-center gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            {/* {productCategories.map((productCategory) => (
              <ProductCategoryCard productCategory={productCategory} />
            ))} */}
          </div>
        )}
      </Skeleton>
    </>
  )
}

export default ProductCategoryList
