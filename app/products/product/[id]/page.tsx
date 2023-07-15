"use client"

import { useParams, useRouter } from "next/navigation"
import { useFetchProduct } from "@/requests/useProduct"
import {
  IconDeleteStroked,
  IconFolderOpen,
  IconHome,
} from "@douyinfe/semi-icons"
import { Breadcrumb, Button, Divider, Empty, Spin } from "@douyinfe/semi-ui"

import DeleteProduct from "@/components/product/DeleteProduct"
import ProductPreview from "@/components/product/ProductPreview"
import UpdateProduct from "@/components/product/UpdateProduct"

function ProductCategoryDetail() {
  const { id } = useParams()
  const router = useRouter()

  const { data: product, isLoading } = useFetchProduct(parseInt(id, 10))

  if (isLoading) {
    return <Spin />
  }

  if (!product) {
    return <Empty description="不存在的商品" />
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Breadcrumb
          routes={[
            {
              icon: (
                <IconHome
                  size="small"
                  onClick={() => router.push("/products")}
                />
              ),
            },
            {
              name: product?.name ?? "-",
              icon: <IconFolderOpen size="small" />,
            },
          ]}
          separator=" / "
        />

        <div className="flex items-center justify-end gap-2">
          <UpdateProduct product={product} />
          <Divider layout="vertical" />
          <DeleteProduct product={product} />
        </div>
      </div>

      <div className="mt-4">
        <ProductPreview product={product} />
      </div>
    </div>
  )
}

export default ProductCategoryDetail
