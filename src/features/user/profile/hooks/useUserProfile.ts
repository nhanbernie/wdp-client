'use client'

import { useGetProfileQuery, useUpdateProfileMutation } from '@/services/user/user.service'
import { useToast } from '@/hooks/useToast'
import { UpdateProfileFormData } from '../schemas/profile.schema'

export const useUserProfile = () => {
  const { data, isLoading, error, refetch } = useGetProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const toast = useToast()

  const handleUpdateProfile = async (formData: UpdateProfileFormData) => {
    try {
      await updateProfile(formData).unwrap()
      toast.success('Thành công', 'Cập nhật thông tin thành công')
      refetch()
    } catch (error: any) {
      toast.error('Lỗi', error?.data?.message || 'Cập nhật thất bại')
      throw error
    }
  }

  return {
    profile: data?.data,
    isLoading,
    error,
    handleUpdateProfile,
    isUpdating,
    refetch,
  }
}
