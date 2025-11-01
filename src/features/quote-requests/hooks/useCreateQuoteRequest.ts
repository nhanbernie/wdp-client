'use client'

import {
  useCreateQuoteRequestMutation,
  useGetMyQuoteRequestsQuery,
} from '@/services/quote-requests'
import { CreateQuoteRequestData } from '@/services/quote-requests/types'
import { useToast } from '@/hooks/useToast'

export const useCreateQuoteRequest = () => {
  const toast = useToast()
  const [createQuote, { isLoading }] = useCreateQuoteRequestMutation()
  const { refetch } = useGetMyQuoteRequestsQuery()

  const handleCreate = async (data: CreateQuoteRequestData) => {
    try {
      await createQuote(data).unwrap()
      toast.success('Thành công', 'Đã gửi yêu cầu báo giá')
      refetch()
    } catch (error: any) {
      toast.error('Lỗi', error?.data?.message || 'Gửi yêu cầu thất bại')
      throw error
    }
  }

  return { handleCreate, isLoading }
}
