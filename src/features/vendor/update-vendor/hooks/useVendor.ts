'use client'

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
} from '@/services/vendor/vendor.service'
import { CreateVendorRequest, VendorFilters, Vendor } from '@/services/vendor/vendor.types'
import { useRouter } from 'next/navigation'
import { useRoleGuard } from '@/hooks/useRoleGuard'

export const useVendor = (filters?: VendorFilters) => {
  const router = useRouter()
  const { handleVendorUpdateSuccess } = useRoleGuard()

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
    refetch: refetchVendors,
  } = useGetVendorsQuery(filters, { skip: true }) // Skip auto-fetch
  const {
    data: myProfileData,
    isLoading: profileLoading,
    error: profileError,
    refetch: refetchMyProfile,
  } = useGetMyVendorProfileQuery(undefined, { skip: true }) // Skip auto-fetch

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
        const result = await createVendorMutation(data).unwrap()

        toast.success('Đăng ký vendor thành công!')

        // Refresh token and profile after successful vendor registration
        await handleVendorUpdateSuccess()

        router.push('/vendor-update/status')
        onSuccess?.(result.data)
      } catch (error: any) {
        if (error?.data?.message) {
          toast.error(error.data.message)
        } else if (error?.message) {
          toast.error(error.message)
        } else {
          toast.error('Đăng ký vendor thất bại! Vui lòng thử lại.')
        }
      }
    },
    [createVendorMutation, router, toast, handleVendorUpdateSuccess],
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
    pagination: (vendorsData as any)?.pagination || undefined,

    // Actions
    createVendor,
    updateVendor,
    deleteVendor,
    approveVendor,
    rejectVendor,
    suspendVendor,
    getVendorsByStatus,
    handleSubmit,

    // Manual fetch methods
    fetchVendors: refetchVendors,
    fetchMyProfile: refetchMyProfile,
  }
}

export default useVendor
