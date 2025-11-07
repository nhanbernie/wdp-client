'use client'

import { useEffect, useRef } from 'react'
import { useGetPaymentStatusQuery } from '@/services/payments/payment.service'

interface UsePaymentStatusPollingOptions {
  orderCode: string | null
  enabled?: boolean
  interval?: number
  onSuccess?: () => void
  onError?: (error: any) => void
}

/**
 * Hook để polling payment status từ PayOS
 * Dùng khi webhook không hoạt động (development)
 */
export const usePaymentStatusPolling = ({
  orderCode,
  enabled = true,
  interval = 3000, // 3 seconds
  onSuccess,
  onError,
}: UsePaymentStatusPollingOptions) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasTriggeredSuccess = useRef(false)

  const { data, error, refetch } = useGetPaymentStatusQuery(orderCode || '', {
    skip: !orderCode || !enabled,
  })

  useEffect(() => {
    if (!orderCode || !enabled) {
      return
    }

    // Nếu đã thành công rồi thì không cần polling nữa
    if (data?.data?.payment?.status === 'SUCCESS' && !hasTriggeredSuccess.current) {
      hasTriggeredSuccess.current = true
      onSuccess?.()
      return
    }

    // Nếu đã failed thì cũng không cần polling
    if (data?.data?.payment?.status === 'FAILED') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      return
    }

    // Bắt đầu polling
    intervalRef.current = setInterval(() => {
      refetch()
    }, interval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [orderCode, enabled, interval, data, refetch, onSuccess])

  useEffect(() => {
    if (error) {
      onError?.(error)
    }
  }, [error, onError])

  return {
    payment: data?.data?.payment,
    isLoading: !data && !error,
    error,
    refetch,
  }
}

