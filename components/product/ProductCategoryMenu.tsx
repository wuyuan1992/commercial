"use client"

import { useMemo } from "react"
import { useFetchAllProductCategories } from "@/requests/useProductCategory"
import { Empty } from "@douyinfe/semi-ui"

import CollapseMenu from "../Collapse"

export default function ProductCategoryMenu() {
  const { data: productCategories = [], isLoading } =
    useFetchAllProductCategories()

  const dataSource = useMemo(() => {
    return productCategories?.map((category) => {
      const categoryItem = {
        key: category.id,
        title: category.name,
        content: <Empty description="no products io this category" />,
      }

      if (category.products?.length) {
        category.content = category.products.map((product) => (
          <div
            key={product.id}
            className="border-b border-gray-200 p-2"
            // onClick={() => router.push(`/products/${product.id}`)}
          >
            {product.name}
          </div>
        ))
      }

      return categoryItem
    })
  }, [productCategories])

  return <CollapseMenu dataSource={dataSource} loading={isLoading} />
}
