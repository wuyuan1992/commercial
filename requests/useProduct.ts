import request from "@/utils/request"
import { useMutation, useQuery } from "@tanstack/react-query"

import type { Product } from "@/types/product"

function getProductsByCategory(category?: string) {
  if (!category) return request.get<Product[]>(`/api/products`)
  return request.get<Product[]>(`/api/products?category=${category}`)
}

function createProduct(
  payload: Pick<
    Product,
    "name" | "description" | "price" | "image" | "categoryId"
  >
) {
  return request.post<Product>(`/api/products`, payload)
}

function updateProduct(id: Pick<Product, "id">, payload: Partial<Product>) {
  return request.put<Product>(`/api/products/${id}`, payload)
}

function deleteProduct(id: Pick<Product, "id">) {
  return request.delete<void>(`/api/products/${id}`)
}

export function useFetchAllProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  })
}

export function useFetchProductsByCategory(category: string) {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => getProductsByCategory(category),
  })
}

export function useCreateProduct({ onSuccess }: { onSuccess?: () => void }) {
  return useMutation({
    mutationKey: ["products", "create"],
    mutationFn: createProduct,
    onSuccess,
  })
}

export function useUpdateProduct() {
  return useMutation({
    mutationKey: ["products", "update"],
    mutationFn: updateProduct,
  })
}

export function useDeleteProduct() {
  return useMutation({
    mutationKey: ["products", "delete"],
    mutationFn: deleteProduct,
  })
}
