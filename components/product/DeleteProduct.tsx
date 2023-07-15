import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDeleteProduct } from "@/requests/useProduct"
import { useRefreshState } from "@/requests/useProductCategory"
import { Button, Popconfirm } from "@douyinfe/semi-ui"

import { Product } from "@/types/product"

function DeleteProduct({ product }: { product: Product }) {
  const { mutate: deleteProduct } = useDeleteProduct()
  const refreshState = useRefreshState()
  const router = useRouter()

  const onConfirm = useCallback(async () => {
    await deleteProduct({ id: product.id })

    await refreshState(["productCategories"])
    await refreshState(["products"])

    router.replace("/products")
  }, [deleteProduct, product.id, refreshState, router])

  return (
    <Popconfirm
      title={`确定是否删除「${product.name}」？`}
      content="此操作将不可逆"
      onConfirm={onConfirm}
      // onCancel={onCancel}
    >
      <Button type="danger" theme="light" size="small">
        删除
      </Button>
    </Popconfirm>
  )
}

export default DeleteProduct
