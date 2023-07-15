import React, { useCallback } from "react"
import {
  IconSemiLogo,
  IconSetting,
  IconStar,
  IconUser,
} from "@douyinfe/semi-icons"
import { Nav, Skeleton } from "@douyinfe/semi-ui"
import { NavItems, OnSelectedData } from "@douyinfe/semi-ui/lib/es/navigation"

interface NavBarProps {
  items: NavItems
  isLoading: boolean
  onSelect: (item: { type: "category" | "product"; id: number }) => void
  footer?: React.ReactNode
}

function NavBar({ items, isLoading, footer, onSelect }: NavBarProps) {
  const onOpenChange = useCallback(
    (data: { itemKey?: string | number; isOpen?: boolean }) => {
      onSelect({
        type: "category",
        id: parseInt(data.itemKey as string, 10),
      })
    },
    [onSelect]
  )

  const onSelectChange = useCallback(
    (data: OnSelectedData) => {
      const { level, itemKey } = data.selectedItems[0] ?? {}
      if (level === 0) {
        onSelect({
          type: "category",
          id: parseInt(itemKey as string, 10),
        })
        return
      }

      if (level === 1) {
        const [_, productId] = (itemKey as string).split("-")
        onSelect({
          type: "product",
          id: parseInt(productId, 10),
        })
      }
    },
    [onSelect]
  )

  return (
    <Skeleton loading={isLoading}>
      <Nav
        items={items}
        bodyStyle={{
          height: "calc(100vh - 88px)",
        }}
        onOpenChange={onOpenChange}
        onSelect={onSelectChange}
        header={null}
        footer={footer}
      />
    </Skeleton>
  )
}

export default NavBar
