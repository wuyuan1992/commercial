import request from "@/utils/request"
import { useMutation, useQuery } from "@tanstack/react-query"

import type { Product } from "@/types/product"

function getProducts(category?: string) {
  if (!category) return request.get<Product[]>(`/api/products`)
  return request.get<Product[]>(`/api/products?category=${category}`)
}

function getProduct({ id }: { id: number }) {
  return request.get<Product>(`/api/products/${id}`)
}

function createProduct(
  payload: Pick<
    Product,
    "name" | "description" | "price" | "image" | "categoryId"
  >
) {
  return request.post<Product>(`/api/products`, payload)
}

function updateProduct({
  id,
  ...payload
}: Pick<Product, "id"> &
  Partial<
    Pick<
      Product,
      "name" | "description" | "price" | "image" | "status" | "categoryId"
    >
  >) {
  return request.put<Product>(`/api/products/${id}`, payload)
}

function deleteProduct({ id }: Pick<Product, "id">) {
  return request.delete<void>(`/api/products/${id}`)
}

export function useFetchAllProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  })
}

export function useFetchProductsByCategory(category: string) {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => getProducts(category),
  })
}

export function useFetchProduct(id: number) {
  return useQuery<Product>({
    queryKey: ["products", id],
    queryFn: () => getProduct({ id }),
  })
}

export function useCreateProduct(options?: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: options?.onSuccess,
  })
}

export function useUpdateProduct() {
  return useMutation({
    mutationFn: updateProduct,
  })
}

export function useDeleteProduct() {
  return useMutation({
    mutationFn: deleteProduct,
  })
}
