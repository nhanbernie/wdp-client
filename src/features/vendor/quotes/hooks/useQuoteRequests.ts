'use client'

import {
  useGetVendorQuoteRequestsQuery,
  useRespondToQuoteMutation,
} from '@/services/vendor/vendor.service'
import { RespondQuoteRequest } from '@/services/vendor/vendor.types'
import { useToast } from '@/hooks/useToast'

type QuoteStatus = 'pending' | 'quoted' | 'accepted' | 'rejected' | 'expired' | 'cancelled'

export const useQuoteRequests = (statusFilter?: QuoteStatus) => {
  const toast = useToast()
  const { data, isLoading, error, refetch } = useGetVendorQuoteRequestsQuery(
    statusFilter ? { status: statusFilter } : undefined,
  )

  const [respondToQuote, { isLoading: isResponding }] = useRespondToQuoteMutation()

  const handleRespond = async (quoteId: string, responseData: RespondQuoteRequest) => {
    try {
      await respondToQuote({ id: quoteId, data: responseData }).unwrap()
      toast.success('Thành công', 'Đã gửi báo giá thành công')
      refetch()
    } catch (error: any) {
      toast.error('Lỗi', error?.data?.message || 'Không thể gửi báo giá')
      throw error
    }
  }

  return {
    quoteRequests: data?.data || [],
    isLoading,
    error,
    handleRespond,
    isResponding,
    refetch,
  }
}
