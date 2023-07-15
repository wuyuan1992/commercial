"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { useFetchProductsByCategory } from "@/requests/useProduct"
import { useFetchAllProductCategories } from "@/requests/useProductCategory"
import {
  IconDeleteStroked,
  IconFolderOpen,
  IconHome,
} from "@douyinfe/semi-icons"
import { Breadcrumb, Button, Divider, Empty } from "@douyinfe/semi-ui"

import CreateProduct from "@/components/product/CreateProduct"
import DeleteProductCategory from "@/components/product/DeleteProductCategory"
import ProductList from "@/components/product/ProductList"
import UpdateProductCategory from "@/components/product/UpdateProductCategory"

function ProductDetail() {
  const { id } = useParams()
  const router = useRouter()
  const categoryId = useMemo(() => parseInt(id, 10), [id])

  const { data: productCategories = [] } = useFetchAllProductCategories()
  const { data: products = [], isLoading } = useFetchProductsByCategory(id)

  const productCategory = useMemo(() => {
    return productCategories.find((category) => category.id === categoryId)
  }, [productCategories, categoryId])

  if (!productCategory) return <Empty description="不存在的目录" />

  return (
    <div>
      <div className="flex items-center justify-between gap-4 ">
        <Breadcrumb
          routes={[
            {
              icon: <IconHome onClick={() => router.push("/products")} />,
            },
            {
              name: productCategory?.name ?? "-",
              icon: <IconFolderOpen />,
            },
          ]}
          separator=" / "
        />

        <div className="flex items-center justify-end gap-2">
          <UpdateProductCategory productCategory={productCategory} />

          <CreateProduct categoryId={categoryId} />

          <Divider layout="vertical" />
          <DeleteProductCategory productCategory={productCategory} />
        </div>
      </div>

      <div className="mt-4">
        <ProductList products={products} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default ProductDetail
