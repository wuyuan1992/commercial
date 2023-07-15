import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  IconArrowUpRight,
  IconEditStroked,
  IconShoppingBag,
} from "@douyinfe/semi-icons"
import { Button, IconButton } from "@douyinfe/semi-ui"

import { Product } from "@/types/product"

function ProductPreview({
  product: { id, name, description, price, image },
}: {
  product: Product
}) {
  return (
    <div
      className="relative flex w-full overflow-hidden rounded-lg border shadow-md"
      style={{
        background: "var(--semi-color-bg-2)",
        borderColor: "var(--semi-color-border)",
      }}
    >
      <div className="relative flex aspect-square h-60 flex-1 overflow-hidden rounded-lg">
        <img className="object-cover w-full" src={image} alt="product image" />
        {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span> */}
      </div>
      <div className="mt-4 flex flex-col gap-4 px-5 pb-5" style={{ flex: 2 }}>
        <h5
          className="text-2xl tracking-tight"
          style={{ color: "var(--semi-color-text-1)" }}
        >
          {name}
        </h5>

        <p
          className="text-sm"
          style={{ color: "var(--semi-color-text-3)", wordBreak: "break-all" }}
        >
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center justify-between">
            <p>
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--semi-color-text-1)" }}
              >
                ${price}
              </span>
              <span
                className="ml-2 inline-block text-sm line-through"
                style={{ color: "var(--semi-color-text-3)" }}
              >
                $699
              </span>
            </p>
          </div>

          <Button
            className="flex-12"
            icon={<IconArrowUpRight size="small" />}
            iconPosition="right"
            theme="solid"
          >
            访问商品链接
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductPreview
