'use client'

import {
  useGetMyQuoteRequestsQuery,
  useCancelQuoteRequestMutation,
} from '@/services/quote-requests'
import { QuoteRequestStatus } from '@/services/quote-requests/types'
import { useToast } from '@/hooks/useToast'

export const useMyQuoteRequests = (status?: QuoteRequestStatus) => {
  const toast = useToast()
  const { data, isLoading, error, refetch } = useGetMyQuoteRequestsQuery(
    status ? { status } : undefined,
  )
  const [cancelQuote, { isLoading: isCancelling }] = useCancelQuoteRequestMutation()

  const handleCancel = async (id: string) => {
    try {
      await cancelQuote(id).unwrap()
      toast.success('Thành công', 'Đã hủy yêu cầu')
      refetch()
    } catch (error: any) {
      toast.error('Lỗi', error?.data?.message || 'Không thể hủy yêu cầu')
      throw error
    }
  }

  return {
    quoteRequests: data?.data || [],
    isLoading,
    error,
    refetch,
    handleCancel,
    isCancelling,
  }
}
