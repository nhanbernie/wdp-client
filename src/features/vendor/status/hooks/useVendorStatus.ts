'use client'

import { useCallback } from 'react'
import { useGetMyVendorProfileQuery } from '@/services/vendor/vendor.service'

export const useVendorStatus = () => {
  const { data: profileData, isLoading, error, refetch } = useGetMyVendorProfileQuery()

  const getStatusInfo = useCallback(() => {
    if (!profileData?.data?.approvedStatus) {
      return {
        status: 'pending',
        title: 'Đang chờ duyệt',
        description: 'Hồ sơ của bạn đang được xem xét',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        details: [
          'Thời gian xử lý: 1-3 ngày làm việc',
          'Bạn sẽ nhận được thông báo qua email',
          'Vui lòng kiểm tra email thường xuyên',
        ],
      }
    }

    switch (profileData.data.approvedStatus) {
      case 'approved':
        return {
          status: 'approved',
          title: 'Đã được duyệt',
          description: 'Chúc mừng! Bạn đã trở thành vendor',
          color: 'text-green-500',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          details: [
            'Bạn có thể bắt đầu bán hàng ngay',
            'Truy cập dashboard vendor để quản lý',
            'Liên hệ hỗ trợ nếu cần trợ giúp',
          ],
        }
      case 'rejected':
        return {
          status: 'rejected',
          title: 'Bị từ chối',
          description: 'Hồ sơ không đáp ứng yêu cầu',
          color: 'text-red-500',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          details: [
            'Kiểm tra email để biết lý do từ chối',
            'Cập nhật thông tin và nộp lại',
            'Liên hệ hỗ trợ để được hướng dẫn',
          ],
        }
      case 'suspended':
        return {
          status: 'suspended',
          title: 'Bị tạm ngưng',
          description: 'Tài khoản vendor bị tạm ngưng',
          color: 'text-orange-500',
          bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          borderColor: 'border-orange-200 dark:border-orange-800',
          details: [
            'Kiểm tra email để biết lý do',
            'Liên hệ hỗ trợ để khôi phục',
            'Tuân thủ quy định để tránh bị ngưng',
          ],
        }
      default:
        return {
          status: 'pending',
          title: 'Đang chờ duyệt',
          description: 'Hồ sơ của bạn đang được xem xét',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          details: [
            'Thời gian xử lý: 1-3 ngày làm việc',
            'Bạn sẽ nhận được thông báo qua email',
            'Vui lòng kiểm tra email thường xuyên',
          ],
        }
    }
  }, [profileData])

  return {
    profile: profileData?.data,
    statusInfo: getStatusInfo(),
    loading: isLoading,
    error,
    refetch,
  }
}
