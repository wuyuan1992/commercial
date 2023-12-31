import { LegacyRef, useCallback, useRef, useState } from "react"
import {
  useCreateProductCategory,
  useRefreshState,
} from "@/requests/useProductCategory"
import { IconCopyAdd } from "@douyinfe/semi-icons"
import { Button, Form, Modal } from "@douyinfe/semi-ui"

import { ProductCategory } from "@/types/product"

type FormValues = Pick<ProductCategory, "name">

type FormInstance = Form<FormValues>

function CreateProductCategory() {
  const [visible, setVisible] = useState(false)
  const formRef = useRef<FormInstance>()
  const { mutate: createProductCategory, isLoading: isCreating } =
    useCreateProductCategory()

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

  const onSubmit = useCallback(
    async (values: FormValues) => {
      await createProductCategory(values)
      await refreshState(["productCategories"])
      onCancel()
    },
    [createProductCategory, refreshState, onCancel]
  )

  const afterClose = useCallback(() => {
    formRef.current?.formApi.reset()
  }, [])

  return (
    <>
      <Button
        size="small"
        icon={<IconCopyAdd size="small" />}
        block
        onClick={onOpen}
      >
        菜单
      </Button>
      <Modal
        title="创建菜单"
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

export default CreateProductCategory
