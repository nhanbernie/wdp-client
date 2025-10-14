'use client'

import { useCallback } from 'react'
import { toast } from 'sonner'
import {
  useGetVendorsQuery,
  useApproveVendorMutation,
  useRejectVendorMutation,
  useSuspendVendorMutation,
  useDeleteVendorMutation,
} from '@/services/vendor/vendor.service'
import { VendorFilters } from '@/services/vendor/vendor.types'

export const useVendorManagement = (filters?: VendorFilters) => {
  const {
    data: vendorsData,
    isLoading,
    error,
    refetch,
  } = useGetVendorsQuery(filters || {}, {
    skip: false,
  })

  const [approveVendorMutation, { isLoading: approving }] = useApproveVendorMutation()
  const [rejectVendorMutation, { isLoading: rejecting }] = useRejectVendorMutation()
  const [suspendVendorMutation, { isLoading: suspending }] = useSuspendVendorMutation()
  const [deleteVendorMutation, { isLoading: deleting }] = useDeleteVendorMutation()

  const approveVendor = useCallback(
    async (id: string) => {
      try {
        await approveVendorMutation(id).unwrap()
        toast.success('Đã phê duyệt vendor thành công!')
        refetch()
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Phê duyệt vendor thất bại!'
        toast.error(errorMessage)
      }
    },
    [approveVendorMutation, refetch],
  )

  const rejectVendor = useCallback(
    async (id: string) => {
      try {
        await rejectVendorMutation(id).unwrap()
        toast.success('Đã từ chối vendor!')
        refetch()
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Từ chối vendor thất bại!'
        toast.error(errorMessage)
      }
    },
    [rejectVendorMutation, refetch],
  )

  const suspendVendor = useCallback(
    async (id: string) => {
      try {
        await suspendVendorMutation(id).unwrap()
        toast.success('Đã đình chỉ vendor!')
        refetch()
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Đình chỉ vendor thất bại!'
        toast.error(errorMessage)
      }
    },
    [suspendVendorMutation, refetch],
  )

  const deleteVendor = useCallback(
    async (id: string) => {
      try {
        await deleteVendorMutation(id).unwrap()
        toast.success('Đã xóa vendor thành công!')
        refetch()
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Xóa vendor thất bại!'
        toast.error(errorMessage)
      }
    },
    [deleteVendorMutation, refetch],
  )

  return {
    vendors: vendorsData?.data || [],
    pagination: (vendorsData as any)?.pagination,
    isLoading: isLoading || approving || rejecting || suspending || deleting,
    error,
    approveVendor,
    rejectVendor,
    suspendVendor,
    deleteVendor,
    refetch,
  }
}
