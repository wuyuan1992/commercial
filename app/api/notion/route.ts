import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"
import {
  BlockObjectRequest,
  BlockObjectRequestWithoutChildren,
} from "@notionhq/client/build/src/api-endpoints"

const notionAuth = process.env.NOTION_TOKEN ?? ""
const notionDatabaseId = process.env.NOTION_DATABASE_ID ?? ""

export async function POST(request: Request) {
  const tableBlock = await getTableBlockForCustomers([])

  const client = new Client({
    auth: notionAuth,
  })

  await client.pages.create({
    parent: {
      type: "page_id",
      page_id: notionDatabaseId,
    },
    properties: {
      title: [
        {
          type: "text",
          text: {
            content: `Customers-${new Date().toLocaleDateString()}`,
          },
        },
      ],
    },
    children: [tableBlock],
  })

  return NextResponse.json("success")
}

async function getTableBlockForCustomers(customers: any[]) {
  const cols = ["邮件", "手机", "地区", "ip", "时间", "内容"]
  const rows = customers.map((customer) => {
    return [
      customer.email,
      customer.mobile,
      customer.area,
      customer.ip,
      customer.createTime,
      customer.content,
    ]
  })

  return getTableBlock(cols, rows)
}

function getTableBlock(cols: string[], rows: string[][]) {
  const titleRow: BlockObjectRequestWithoutChildren = {
    type: "table_row",
    table_row: {
      cells: cols.map((title) => [
        {
          type: "text",
          text: {
            content: title,
          },
        },
      ]),
    },
  }

  const contentRows: BlockObjectRequestWithoutChildren[] = rows.map((cells) => {
    return {
      type: "table_row",
      table_row: {
        cells: cells.map((cell) => {
          return [
            {
              type: "text",
              text: {
                content: cell,
              },
            },
          ]
        }),
      },
    }
  })

  const result: BlockObjectRequest = {
    object: "block",
    type: "table",
    table: {
      table_width: cols.length,
      children: [titleRow, ...contentRows],
    },
  }

  return result
}
