import { useCallback } from 'react'
import { toast } from 'sonner'
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '@/services/products'
import { CreateProductDto, UpdateProductDto } from '@/services/products/product.types'

export const useProductManagement = () => {
  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({
    page: 1,
    limit: 100,
  })

  const [createProductMutation, { isLoading: creating }] = useCreateProductMutation()
  const [updateProductMutation, { isLoading: updating }] = useUpdateProductMutation()
  const [deleteProductMutation, { isLoading: deleting }] = useDeleteProductMutation()

  const createProduct = useCallback(
    async (data: CreateProductDto) => {
      try {
        const result = await createProductMutation(data).unwrap()
        toast.success('Tạo sản phẩm thành công!')
        refetch()
        return result.data.id
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Tạo sản phẩm thất bại!'
        toast.error(errorMessage)
        throw error
      }
    },
    [createProductMutation, refetch],
  )

  const updateProduct = useCallback(
    async (id: string, data: UpdateProductDto) => {
      try {
        await updateProductMutation({ id, data }).unwrap()
        toast.success('Cập nhật sản phẩm thành công!')
        refetch()
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Cập nhật sản phẩm thất bại!'
        toast.error(errorMessage)
        throw error
      }
    },
    [updateProductMutation, refetch],
  )

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        await deleteProductMutation(id).unwrap()
        toast.success('Xóa sản phẩm thành công!')
        refetch()
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Xóa sản phẩm thất bại!'
        toast.error(errorMessage)
        throw error
      }
    },
    [deleteProductMutation, refetch],
  )

  return {
    products: productsData?.data?.items || [],
    pagination: productsData?.data?.pagination,
    isLoading: isLoading || creating || updating || deleting,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch,
  }
}
