'use client'

import { useState } from 'react'
import {
  useGetMyVendorProfileQuery,
  useUpdateMyVendorProfileMutation,
} from '@/services/vendor/vendor.service'
import { UpdateVendorProfileRequest } from '@/services/vendor/vendor.types'
import { useToast } from '@/hooks/useToast'

export const useVendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const toast = useToast()

  const { data: profileData, isLoading, error, refetch } = useGetMyVendorProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyVendorProfileMutation()

  const handleUpdate = async (data: UpdateVendorProfileRequest) => {
    try {
      const result = await updateProfile(data).unwrap()
      toast.success('Thành công', 'Cập nhật thông tin thành công')
      setIsEditing(false)
      refetch()
      return result
    } catch (error: any) {
      toast.error('Lỗi', error?.data?.message || 'Không thể cập nhật thông tin')
      throw error
    }
  }

  return {
    profile: profileData?.data,
    isLoading,
    error,
    isEditing,
    setIsEditing,
    handleUpdate,
    isUpdating,
  }
}
