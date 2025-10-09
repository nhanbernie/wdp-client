import { useCallback } from 'react'
import { toast } from 'sonner'
import {
  useCreateVendorMutation,
  useGetVendorsQuery,
  useGetVendorByIdQuery,
  useGetMyVendorProfileQuery,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
  useApproveVendorMutation,
  useRejectVendorMutation,
  useSuspendVendorMutation,
} from '../../../services/vendor/vendor.service'
import { CreateVendorRequest, VendorFilters, Vendor } from '../../../types/vendor.types'

export const useVendor = (filters?: VendorFilters) => {
  // RTK Query hooks
  const [createVendorMutation, { isLoading: createLoading, error: createError }] = useCreateVendorMutation()
  const [updateVendorMutation, { isLoading: updateLoading, error: updateError }] = useUpdateVendorMutation()
  const [deleteVendorMutation, { isLoading: deleteLoading, error: deleteError }] = useDeleteVendorMutation()
  const [updateVendorStatusMutation, { isLoading: statusLoading, error: statusError }] = useUpdateVendorStatusMutation()
  
  const { data: vendorsData, isLoading: fetchLoading, error: fetchError } = useGetVendorsQuery(filters)

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

  const updateVendorStatus = useCallback(
    async (id: string, status: 'pending' | 'approved' | 'rejected') => {
      return updateVendorStatusMutation({ id, status })
    },
    [updateVendorStatusMutation],
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
    loading: createLoading || updateLoading || deleteLoading || statusLoading || fetchLoading,
    error: createError || updateError || deleteError || statusError || fetchError,
    pagination: vendorsData?.pagination,

    // Actions
    createVendor,
    updateVendor,
    deleteVendor,
    updateVendorStatus,
    handleSubmit,
  }
}

export default useVendor
