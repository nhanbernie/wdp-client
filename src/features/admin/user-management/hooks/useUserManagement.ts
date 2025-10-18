'use client'

import { useCallback } from 'react'
import { toast } from 'sonner'
import {
  useGetUsersQuery,
  useGetUserActivityQuery,
  useBanUserMutation,
  useChangeUserRoleMutation,
} from '@/services/admin/admin.api'

export interface UserManagementFilters {
  page?: number
  limit?: number
  role?: string
  isActive?: boolean
  sortBy?: string
  order?: 'ASC' | 'DESC'
}

export const useUserManagement = (filters?: UserManagementFilters) => {
  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = useGetUsersQuery(filters || {})

  const [banUserMutation, { isLoading: banning }] = useBanUserMutation()
  const [changeRoleMutation, { isLoading: changingRole }] = useChangeUserRoleMutation()

  const banUser = useCallback(
    async (userId: string, reason: string) => {
      try {
        await banUserMutation({ userId, isActive: false, reason }).unwrap()
        toast.success('Đã cấm người dùng thành công!')
        refetch()
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Cấm người dùng thất bại!'
        toast.error(errorMessage)
      }
    },
    [banUserMutation, refetch],
  )

  const unbanUser = useCallback(
    async (userId: string) => {
      try {
        await banUserMutation({ userId, isActive: true, reason: 'Unbanned by admin' }).unwrap()
        toast.success('Đã bỏ cấm người dùng!')
        refetch()
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Bỏ cấm người dùng thất bại!'
        toast.error(errorMessage)
      }
    },
    [banUserMutation, refetch],
  )

  const changeRole = useCallback(
    async (userId: string, role: string, reason: string) => {
      try {
        await changeRoleMutation({ userId, role, reason }).unwrap()
        toast.success('Đã thay đổi vai trò người dùng!')
        refetch()
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Thay đổi vai trò thất bại!'
        toast.error(errorMessage)
      }
    },
    [changeRoleMutation, refetch],
  )

  return {
    users: usersData?.data?.data || [],
    pagination: usersData?.data?.meta,
    isLoading,
    error,
    banning,
    changingRole,
    banUser,
    unbanUser,
    changeRole,
    refetch,
  }
}

// Hook to get user activity details
export const useUserActivity = (userId: string) => {
  const { data, isLoading, error } = useGetUserActivityQuery(userId)

  return {
    activity: data?.data,
    isLoading,
    error,
  }
}
