import { useCallback } from "react"
import request from "@/utils/request"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { Product, ProductCategory } from "@/types/product"

export function useRefreshState() {
  // Get QueryClient from the context
  const queryClient = useQueryClient()

  return useCallback(
    (keys: string[]) => {
      queryClient.invalidateQueries(keys)
    },
    [queryClient]
  )
}

function getAllProductCategories() {
  return request.get<(ProductCategory & { products: Partial<Product>[] })[]>(
    `/api/product-categories`
  )
}

function createProductCategory(payload: Pick<ProductCategory, "name">) {
  return request.post<ProductCategory>(`/api/product-categories`, payload)
}

function updateProductCategory(
  id: Pick<ProductCategory, "id">,
  payload: Partial<ProductCategory>
) {
  return request.put<ProductCategory>(`/api/product-categories/${id}`, payload)
}

function deleteProductCategory(id: Pick<ProductCategory, "id">) {
  return request.delete<void>(`/api/product-categories/${id}`)
}

export function useFetchAllProductCategories() {
  return useQuery({
    queryKey: ["productCategories"],
    queryFn: getAllProductCategories,
  })
}

export function useCreateProductCategory() {
  return useMutation({
    mutationFn: createProductCategory,
  })
}

export function useUpdateProductCategory() {
  return useMutation({
    mutationFn: updateProductCategory,
  })
}

export function useDeleteProductCategory() {
  return useMutation({
    mutationFn: deleteProductCategory,
  })
}
