import React, { ReactNode } from "react"
import { Collapse, Empty, Skeleton } from "@douyinfe/semi-ui"

interface CollapseItem {
  key: string
  title: string
  content: ReactNode
}

interface CollapseMenuProps {
  dataSource: CollapseItem[]
  loading: boolean
}

function CollapseMenu({ dataSource, loading }: CollapseMenuProps) {
  if (!loading && !dataSource?.length) return <Empty description="暂无数据" />

  return (
    <Skeleton loading={loading}>
      <Collapse className="w-full">
        {dataSource.map(({ key, title, content }) => (
          <Collapse.Panel header={title} itemKey={key}>
            {content}
          </Collapse.Panel>
        ))}
      </Collapse>
    </Skeleton>
  )
}

export default CollapseMenu
