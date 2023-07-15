"use client"

import { useFetchAllProductCategories } from "@/requests/useProductCategory"
import { Empty } from "@douyinfe/semi-ui"

export default function HomePage() {
  // const recommendProducts = useRecommendProducts();
  const { data: productCategories } = useFetchAllProductCategories()

  return (
    <section className="flex flex-col items-stretch justify-start gap-4">
      <div>推荐商品列表</div>

      <div
        className="grid aspect-2/1 gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
        {productCategories?.length === 0 ? (
          <Empty description="暂无数据" />
        ) : (
          productCategories?.map((category) => (
            <div key={category.id}>
              <h3>{category.name}</h3>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
