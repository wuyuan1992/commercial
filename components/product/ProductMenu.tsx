"use client"

import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useFetchAllProductCategories } from "@/requests/useProductCategory"
import { IconFolderStroked } from "@douyinfe/semi-icons"

import NavBar from "../Nav"
import CreateProduct from "./CreateProduct"
import CreateProductCategory from "./CreateProductCategory"

function ProductMenu() {
  const router = useRouter()

  const { data: productCategories = [], isLoading } =
    useFetchAllProductCategories()

  const onSelect = useCallback(
    (item: { type: "category" | "product"; id: number }) => {
      console.log(item)
      router.push(`/products/${item.type}/${item.id}`)
    },
    [router]
  )

  const dataSource = useMemo(() => {
    return productCategories?.map((category) => {
      const categoryItem = {
        itemKey: `${category.id}`,
        text: category.name,
        items: [] as any[],
        isSubNav: false,
        icon: <IconFolderStroked />,
      }

      if (category.products?.length) {
        categoryItem.items = category.products.map((product) => ({
          itemKey: `${product.categoryId}-${product.id}`,
          text: product.name,
          indent: true,
        }))
      }

      return categoryItem
    })
  }, [productCategories])

  return (
    <NavBar
      items={dataSource}
      isLoading={isLoading}
      footer={<NavFooter />}
      onSelect={onSelect}
    />
  )
}

function NavFooter() {
  return (
    <div className="flex w-full items-center justify-between gap-4 ">
      <div className="flex-1">
        <CreateProductCategory />
      </div>
      <div className="flex-1">
        <CreateProduct />
      </div>
    </div>
  )
}

export default ProductMenu
