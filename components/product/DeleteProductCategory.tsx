import { useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  useDeleteProductCategory,
  useRefreshState,
} from "@/requests/useProductCategory"
import { Button, Popconfirm } from "@douyinfe/semi-ui"

import { ProductCategory } from "@/types/product"

function DeleteProductCategory({
  productCategory,
}: {
  productCategory: ProductCategory
}) {
  const { mutate: deleteProductCategory } = useDeleteProductCategory()
  const refreshState = useRefreshState()
  const router = useRouter()

  const onConfirm = useCallback(async () => {
    await deleteProductCategory({ id: productCategory.id })

    await refreshState(["productCategories"])

    router.replace("/products")
  }, [deleteProductCategory, productCategory.id, refreshState, router])

  return (
    <Popconfirm
      title={`确定是否删除「${productCategory.name}」？`}
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

export default DeleteProductCategory
