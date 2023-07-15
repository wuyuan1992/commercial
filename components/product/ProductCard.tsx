import Link from "next/link"
import { useRouter } from "next/navigation"
import { IconArrowUpRight, IconEditStroked } from "@douyinfe/semi-icons"
import { Button, IconButton } from "@douyinfe/semi-ui"

import { Product } from "@/types/product"

function ProductCard({
  product: { id, name, price, image },
  onEdit,
  showEdit = false,
}: {
  product: Product
  onEdit: () => void
  showEdit?: boolean
}) {
  const link = `/products/product/${id}`

  const router = useRouter()

  return (
    <div
      className="relative flex max-w-xs flex-col overflow-hidden rounded-lg border  shadow-md"
      style={{
        background: "var(--semi-color-bg-2)",
        borderColor: "var(--semi-color-border)",
      }}
    >
      <div className="relative mx-3 mt-3 flex aspect-square h-60 overflow-hidden rounded-xl">
        <img className="object-cover w-full" src={image} alt="product image" />
        {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span> */}
      </div>
      <div className="mt-4 px-5 pb-5">
        <Link href={link}>
          <h5
            className="text-lg tracking-tight"
            style={{ color: "var(--semi-color-text-2)" }}
          >
            {name}
          </h5>
        </Link>
        <div className="mb-5 mt-2 flex items-center justify-between">
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
        <div className="flex items-center gap-1">
          <Button
            className="flex-12"
            icon={<IconArrowUpRight size="small" />}
            iconPosition="right"
            theme="solid"
            block
            onClick={() => router.push(link)}
          >
            查看详情
          </Button>
          {showEdit && (
            <IconButton
              icon={<IconEditStroked />}
              theme="light"
              onClick={onEdit}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
