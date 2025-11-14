'use client'

import { useCallback } from 'react'
import {
  useGetWalletBalanceQuery,
  useDepositWalletMutation,
  useGetTransactionHistoryQuery,
  type DepositWalletRequest,
} from '@/services/vendor/vendor-wallet.service'
import { useToast } from '@/hooks/useToast'

export const useVendorWallet = () => {
  const toast = useToast()

  // Queries
  const {
    data: balanceData,
    isLoading: isLoadingBalance,
    refetch: refetchBalance,
  } = useGetWalletBalanceQuery()

  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    refetch: refetchTransactions,
  } = useGetTransactionHistoryQuery({ page: 1, limit: 20 })

  const [depositMutation, { isLoading: isDepositing }] = useDepositWalletMutation()

  const deposit = useCallback(
    async (depositData: DepositWalletRequest) => {
      try {
        const result = await depositMutation(depositData).unwrap()
        
        if (result.data?.payment?.data?.checkoutUrl) {
          window.open(result.data.payment.data.checkoutUrl, '_blank')
          toast.success('Đã tạo yêu cầu nạp tiền. Vui lòng thanh toán trên PayOS.')
        } else {
          toast.error('Không thể tạo yêu cầu nạp tiền')
        }

        return result
      } catch (error: any) {
        console.error('Deposit error:', error)
        toast.error(error?.data?.message || 'Nạp tiền thất bại')
        throw error
      }
    },
    [depositMutation, toast],
  )

  return {
    // Balance data
    balance: balanceData?.data,
    isLoadingBalance,
    refetchBalance,

    // Transactions
    transactions: transactionsData?.data || [],
    transactionsMeta: transactionsData
      ? {
          total: transactionsData.total,
          page: transactionsData.page,
          limit: transactionsData.limit,
          totalPages: transactionsData.totalPages,
        }
      : null,
    isLoadingTransactions,
    refetchTransactions,

    // Actions
    deposit,
    isDepositing,
  }
}

