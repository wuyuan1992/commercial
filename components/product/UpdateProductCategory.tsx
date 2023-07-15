import { LegacyRef, useCallback, useMemo, useRef, useState } from "react"
import {
  useRefreshState,
  useUpdateProductCategory,
} from "@/requests/useProductCategory"
import { IconCopyAdd, IconEditStroked } from "@douyinfe/semi-icons"
import { Button, Form, Modal } from "@douyinfe/semi-ui"
import { pick } from "lodash"

import { ProductCategory } from "@/types/product"

type FormValues = Pick<ProductCategory, "name">

type FormInstance = Form<FormValues>

function UpdateProductCategory({
  productCategory,
}: {
  productCategory: ProductCategory
}) {
  const [visible, setVisible] = useState(false)
  const formRef = useRef<FormInstance>()
  const { mutate: updateProductCategory, isLoading: isCreating } =
    useUpdateProductCategory()

  const refreshState = useRefreshState()

  const onTriggerSubmit = useCallback(() => {
    formRef.current?.formApi.submitForm()
  }, [])

  const onOpen = useCallback(() => {
    setVisible(true)
  }, [])

  const onCancel = useCallback(() => {
    setVisible(false)
  }, [])

  const { id, ...initValues } = useMemo(() => {
    const { id, ...values } = pick(productCategory, ["id", "name"])

    return { ...values, id }
  }, [productCategory])

  const onSubmit = useCallback(
    async (values: FormValues) => {
      await updateProductCategory({ ...values, id })
      await refreshState(["productCategories"])
      onCancel()
    },
    [updateProductCategory, id, refreshState, onCancel]
  )

  const afterClose = useCallback(() => {
    formRef.current?.formApi.reset()
  }, [])

  return (
    <>
      <Button
        size="small"
        icon={<IconEditStroked size="small" />}
        block
        onClick={onOpen}
      >
        更新
      </Button>
      <Modal
        title="更新菜单"
        visible={visible}
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
          <Form.Input
            field="name"
            placeholder="请输入菜单名称"
            label="菜单名称"
          />
        </Form>
      </Modal>
    </>
  )
}

export default UpdateProductCategory
