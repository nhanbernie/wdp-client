"use client"

import { useCallback } from 'react'
import { toast } from 'sonner'
import {
  useCreateVendorMutation,
  useGetVendorsQuery,
  useGetVendorsByStatusQuery,
  useGetVendorByIdQuery,
  useGetMyVendorProfileQuery,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
  useApproveVendorMutation,
  useRejectVendorMutation,
  useSuspendVendorMutation,
} from '../../../services/vendor/vendor.service'
import { CreateVendorRequest, VendorFilters, Vendor } from '../../../services/vendor/vendor.types'

export const useVendor = (filters?: VendorFilters) => {
  // RTK Query hooks
  const [createVendorMutation, { isLoading: createLoading, error: createError }] =
    useCreateVendorMutation()
  const [updateVendorMutation, { isLoading: updateLoading, error: updateError }] =
    useUpdateVendorMutation()
  const [deleteVendorMutation, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteVendorMutation()
  const [approveVendorMutation, { isLoading: approveLoading, error: approveError }] =
    useApproveVendorMutation()
  const [rejectVendorMutation, { isLoading: rejectLoading, error: rejectError }] =
    useRejectVendorMutation()
  const [suspendVendorMutation, { isLoading: suspendLoading, error: suspendError }] =
    useSuspendVendorMutation()

  const {
    data: vendorsData,
    isLoading: fetchLoading,
    error: fetchError,
  } = useGetVendorsQuery(filters)
  const {
    data: myProfileData,
    isLoading: profileLoading,
    error: profileError,
  } = useGetMyVendorProfileQuery()

  // Method to get vendors by status
  const getVendorsByStatus = useCallback(
    (status: 'pending' | 'approved' | 'rejected' | 'suspended') => {
      return useGetVendorsByStatusQuery(status)
    },
    [],
  )

  // Actions
  const createVendor = useCallback(
    async (vendorData: CreateVendorRequest) => {
      return createVendorMutation(vendorData)
    },
    [createVendorMutation],
  )

  const updateVendor = useCallback(
    async (id: string, vendorData: Partial<CreateVendorRequest>) => {
      return updateVendorMutation({ id, data: vendorData })
    },
    [updateVendorMutation],
  )

  const deleteVendor = useCallback(
    async (id: string) => {
      return deleteVendorMutation(id)
    },
    [deleteVendorMutation],
  )

  const approveVendor = useCallback(
    async (id: string) => {
      return approveVendorMutation(id)
    },
    [approveVendorMutation],
  )

  const rejectVendor = useCallback(
    async (id: string) => {
      return rejectVendorMutation(id)
    },
    [rejectVendorMutation],
  )

  const suspendVendor = useCallback(
    async (id: string) => {
      return suspendVendorMutation(id)
    },
    [suspendVendorMutation],
  )

  const handleSubmit = useCallback(
    async (data: CreateVendorRequest, onSuccess?: (vendor: any) => void) => {
      try {
        const result = await createVendorMutation(data)

        if ('data' in result) {
          toast.success('Đăng ký vendor thành công!')
          onSuccess?.(result.data.data)
        } else if ('error' in result) {
          toast.error('Đăng ký vendor thất bại!')
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        toast.error('Có lỗi xảy ra, vui lòng thử lại!')
      }
    },
    [createVendorMutation],
  )

  return {
    // State
    vendors: vendorsData?.data || [],
    myProfile: myProfileData?.data,
    loading:
      createLoading ||
      updateLoading ||
      deleteLoading ||
      approveLoading ||
      rejectLoading ||
      suspendLoading ||
      fetchLoading ||
      profileLoading,
    error:
      createError ||
      updateError ||
      deleteError ||
      approveError ||
      rejectError ||
      suspendError ||
      fetchError ||
      profileError,
    pagination: vendorsData?.pagination,

    // Actions
    createVendor,
    updateVendor,
    deleteVendor,
    approveVendor,
    rejectVendor,
    suspendVendor,
    getVendorsByStatus,
    handleSubmit,
  }
}

export default useVendor
