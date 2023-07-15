import { LegacyRef, useCallback, useMemo, useRef, useState } from "react"
import { useCreateProduct, useUpdateProduct } from "@/requests/useProduct"
import {
  useFetchAllProductCategories,
  useRefreshState,
} from "@/requests/useProductCategory"
import { IconCopyAdd } from "@douyinfe/semi-icons"
import { Button, Form, Modal } from "@douyinfe/semi-ui"
import { pick } from "lodash"

import { Product } from "@/types/product"

type FormValues = Pick<
  Product,
  "name" | "categoryId" | "description" | "image"
> & {
  price: string
}

type FormInstance = Form<FormValues>

function EditProductModal({
  product,
  onCancel,
}: {
  product: Product
  onCancel: () => void
}) {
  const formRef = useRef<FormInstance>()
  const { mutate: updateProduct } = useUpdateProduct()

  const refreshState = useRefreshState()

  const onTriggerSubmit = useCallback(() => {
    formRef.current?.formApi.submitForm()
  }, [])

  const { productId, ...initValues } = useMemo(() => {
    const { id, price, ...values } = pick(product, [
      "id",
      "name",
      "categoryId",
      "description",
      "image",
      "price",
    ])

    return { ...values, price: price.toString(), productId: id }
  }, [product])

  const onSubmit = useCallback(
    async (values: FormValues) => {
      await updateProduct({
        ...values,
        id: productId,
        price: parseFloat(values.price),
      })
      await refreshState(["productCategories"])
      await refreshState(["products"])

      onCancel()
    },
    [updateProduct, productId, refreshState, onCancel]
  )

  const afterClose = useCallback(() => {
    formRef.current?.formApi.reset()
  }, [])

  const { data: productCategories = [], isLoading } =
    useFetchAllProductCategories()

  const optionList = useMemo(() => {
    return productCategories.map((category) => ({
      label: category.name,
      value: category.id,
    }))
  }, [productCategories])

  return (
    <Modal
      title="修改商品"
      visible
      onCancel={onCancel}
      onOk={onTriggerSubmit}
      afterClose={afterClose}
    >
      <Form
        ref={formRef as LegacyRef<FormInstance>}
        labelPosition="inset"
        layout="vertical"
        onSubmit={onSubmit}
        initValues={initValues}
      >
        <Form.Select
          field="categoryId"
          className="w-full"
          optionList={optionList}
          rules={[
            {
              required: true,
              message: "请选择分类",
            },
          ]}
          placeholder="请选择分类"
          label="分类"
        />

        <Form.Input
          field="name"
          rules={[
            {
              required: true,
              message: "请输入名称",
            },
          ]}
          placeholder="请输入名称"
          label="名称"
        />
        <Form.TextArea
          field="description"
          placeholder="请输入描述"
          label="描述"
        />
        <Form.Input
          field="price"
          type="number"
          placeholder="请输入价格"
          label="价格"
          rules={[
            {
              required: true,
              message: "请输入价格",
            },
            {
              min: 0,
              message: "价格不能小于0",
            },
          ]}
        />
        {/* <Form.Upload field="image" label="图片" action="" /> */}
        <Form.Input field="image" label="图片" />
      </Form>
    </Modal>
  )
}

export default EditProductModal
