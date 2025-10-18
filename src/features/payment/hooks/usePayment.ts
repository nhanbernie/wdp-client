'use client'

import { useCallback } from 'react'
import {
  useCreatePaymentMutation,
  type CreatePaymentRequest,
} from '@/services/payments'
import { useToast } from '@/hooks/useToast'

export const usePayment = () => {
  const toast = useToast()

  // Mutations
  const [createPaymentMutation, { isLoading: isCreatingPayment }] = useCreatePaymentMutation()

  // Helper functions
  const createPayment = useCallback(
    async (paymentData: { orderId: string; amount: number; description?: string }) => {
      try {
        const timestamp = Date.now()
        const random = Math.floor(Math.random() * 10000)
        const orderCode = parseInt(`${timestamp}${random}`.slice(-15)) 

        // Giới hạn description tối đa 25 ký tự
        const limitedDescription = paymentData.description
          ? paymentData.description.substring(0, 25)
          : `Đơn hàng #${paymentData.orderId}`.substring(0, 25)

        const apiRequest: CreatePaymentRequest = {
          orderId: paymentData.orderId, // Sử dụng orderCode thay vì UUID
          amount: Number(paymentData.amount),
          description: limitedDescription,
        }

        const result = await createPaymentMutation(apiRequest).unwrap()
        toast.success('Tạo yêu cầu thanh toán thành công!')
        return result
      } catch (error: any) {
        console.error('Payment creation error:', error)
        console.error('Error details:', error?.data)
      }
    },
    [createPaymentMutation, toast],
  )

  return {
    // Loading states
    isCreatingPayment,

    // Actions
    createPayment,
  }
}