'use client'

import { useCallback, useState } from 'react'
import { useToast } from '@/hooks/useToast'
import {
  useCreateVendorMutation,
  useGetMyVendorProfileQuery,
  useUpdateMyVendorProfileMutation,
} from '@/services/vendor/vendor.service'
import { CreateVendorRequest, UpdateVendorProfileRequest } from '@/services/vendor/vendor.types'
import { useRouter } from 'next/navigation'
import { useRoleGuard } from '@/hooks/useRoleGuard'

export const useVendor = () => {
  const router = useRouter()
  const toast = useToast()
  const { handleVendorUpdateSuccess } = useRoleGuard()
  const [error, setError] = useState<string | null>(null)

  // RTK Query hooks
  const [createVendorMutation, { isLoading: createLoading }] = useCreateVendorMutation()
  const [updateProfileMutation, { isLoading: updateLoading }] = useUpdateMyVendorProfileMutation()
  const {
    data: profileData,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useGetMyVendorProfileQuery()

  // Create vendor (for first-time registration)
  const handleSubmit = useCallback(
    async (vendorData: CreateVendorRequest, onSuccess?: (vendor: any) => void) => {
      try {
        setError(null)
        const result = await createVendorMutation(vendorData).unwrap()
        toast.success('Thành công', 'Đăng ký vendor thành công! Vui lòng chờ phê duyệt.')

        // Refresh token and profile after successful creation
        await handleVendorUpdateSuccess()

        if (onSuccess) {
          onSuccess(result.data)
        }

        // Redirect to status page
        router.push('/vendor/status')
        return result
      } catch (err: any) {
        const errorMessage = err?.data?.message || err?.message || 'Đăng ký vendor thất bại!'
        setError(errorMessage)
        toast.error('Lỗi', errorMessage)
        throw err
      }
    },
    [createVendorMutation, toast, handleVendorUpdateSuccess, router],
  )

  // Update vendor profile
  const updateProfile = useCallback(
    async (profileData: UpdateVendorProfileRequest) => {
      try {
        setError(null)
        const result = await updateProfileMutation(profileData).unwrap()
        toast.success('Thành công', 'Cập nhật thông tin vendor thành công!')

        // Refresh token and profile
        await handleVendorUpdateSuccess()
        await refetchProfile()

        return result
      } catch (err: any) {
        const errorMessage = err?.data?.message || err?.message || 'Cập nhật thất bại!'
        setError(errorMessage)
        toast.error('Lỗi', errorMessage)
        throw err
      }
    },
    [updateProfileMutation, toast, handleVendorUpdateSuccess, refetchProfile],
  )

  return {
    profile: profileData?.data,
    handleSubmit,
    updateProfile,
    loading: createLoading || updateLoading || profileLoading,
    error,
    refetchProfile,
  }
}
