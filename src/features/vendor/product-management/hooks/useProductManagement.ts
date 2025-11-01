'use client'

import { useCallback } from 'react'
import { useToast } from '@/hooks/useToast'
import {
  useGetVendorProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '@/services/vendor/vendor.service'
import { CreateProductRequest, UpdateProductRequest } from '@/services/vendor/vendor.types'

export const useProductManagement = () => {
  const toast = useToast()
  const { data: productsData, isLoading, error, refetch } = useGetVendorProductsQuery()

  const [createProductMutation, { isLoading: creating }] = useCreateProductMutation()
  const [updateProductMutation, { isLoading: updating }] = useUpdateProductMutation()
  const [deleteProductMutation, { isLoading: deleting }] = useDeleteProductMutation()

  const createProduct = useCallback(
    async (data: CreateProductRequest) => {
      try {
        // Convert to FormData
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
          if (value === undefined || value === null) return

          // Handle File for thumbnail
          if (key === 'thumbnail' && value instanceof File) {
            formData.append('thumbnail', value)
          }
          // Handle File[] for images
          else if (key === 'images' && Array.isArray(value)) {
            value.forEach((file) => {
              if (file instanceof File) {
                formData.append('images', file)
              }
            })
          }
          // Handle arrays and objects (stringify them)
          else if (
            Array.isArray(value) ||
            (typeof value === 'object' && !(value instanceof File))
          ) {
            formData.append(key, JSON.stringify(value))
          }
          // Handle primitives
          else {
            formData.append(key, String(value))
          }
        })

        const result = await createProductMutation(formData).unwrap()
        toast.success('Thành công', 'Tạo sản phẩm thành công!')
        refetch()
        return result.data.id
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Tạo sản phẩm thất bại!'
        toast.error('Lỗi', errorMessage)
        throw error
      }
    },
    [createProductMutation, refetch, toast],
  )

  const updateProduct = useCallback(
    async (id: string, data: UpdateProductRequest) => {
      try {
        // Convert to FormData
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
          if (value === undefined || value === null) return

          // Handle File for thumbnail
          if (key === 'thumbnail' && value instanceof File) {
            formData.append('thumbnail', value)
          }
          // Handle File[] for images
          else if (key === 'images' && Array.isArray(value)) {
            value.forEach((file) => {
              if (file instanceof File) {
                formData.append('images', file)
              }
            })
          }
          // Handle arrays and objects (stringify them)
          else if (
            Array.isArray(value) ||
            (typeof value === 'object' && !(value instanceof File))
          ) {
            formData.append(key, JSON.stringify(value))
          }
          // Handle primitives
          else {
            formData.append(key, String(value))
          }
        })
        const result = await updateProductMutation({ id, data: formData }).unwrap()
        toast.success('Thành công', 'Cập nhật sản phẩm thành công!')
        await refetch()
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Cập nhật sản phẩm thất bại!'
        toast.error('Lỗi', errorMessage)
        throw error
      }
    },
    [updateProductMutation, refetch, toast],
  )

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        await deleteProductMutation(id).unwrap()
        toast.success('Thành công', 'Xóa sản phẩm thành công!')
        refetch()
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Xóa sản phẩm thất bại!'
        toast.error('Lỗi', errorMessage)
        throw error
      }
    },
    [deleteProductMutation, refetch, toast],
  )

  // Safely extract products array from response
  const productsList = productsData?.data?.items || [] // Changed from 'products' to 'items'
  const pagination = productsData?.data?.pagination // Changed from 'meta' to 'pagination'

  return {
    products: productsList,
    pagination,
    isLoading: isLoading || creating || updating || deleting,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch,
  }
}
