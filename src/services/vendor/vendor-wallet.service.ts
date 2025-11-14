import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQuery'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

// Types
export interface WalletBalance {
  balance: number
  creditLimit: number
  availableBalance: number
  totalDeposited: number
  totalWithdrawn: number
  totalFeesPaid: number
}

export interface DepositWalletRequest {
  amount: number
  description?: string
}

export interface DepositWalletResponse {
  transaction: {
    id: string
    type: string
    status: string
    amount: number
    description: string
    createdAt: string
  }
  payment: {
    data: {
      checkoutUrl: string
      qrCode: string
    }
  }
}

export interface VendorTransaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'order_payout' | 'order_fee' | 'refund' | 'adjustment'
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  amount: number
  platformFee: number | null
  balanceBefore: number | null
  balanceAfter: number | null
  orderId: string | null
  description: string | null
  createdAt: string
  completedAt: string | null
}

export interface TransactionHistoryResponse {
  data: VendorTransaction[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const vendorWalletApi = createApi({
  reducerPath: 'vendorWalletApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['WalletBalance', 'WalletTransactions'],
  endpoints: (builder) => ({
    // Get wallet balance
    getWalletBalance: builder.query<{ data: WalletBalance }, void>({
      query: () => ({
        url: API_ENDPOINTS.VENDOR.WALLET.BALANCE,
        method: 'GET',
      }),
      providesTags: ['WalletBalance'],
    }),

    // Deposit money to wallet
    depositWallet: builder.mutation<
      { data: DepositWalletResponse },
      DepositWalletRequest
    >({
      query: (body) => ({
        url: API_ENDPOINTS.VENDOR.WALLET.DEPOSIT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WalletBalance', 'WalletTransactions'],
    }),

    // Get transaction history
    getTransactionHistory: builder.query<
      TransactionHistoryResponse,
      { page?: number; limit?: number }
    >({
      query: (params = {}) => ({
        url: API_ENDPOINTS.VENDOR.WALLET.TRANSACTIONS,
        method: 'GET',
        params,
      }),
      providesTags: ['WalletTransactions'],
    }),
  }),
})

export const {
  useGetWalletBalanceQuery,
  useDepositWalletMutation,
  useGetTransactionHistoryQuery,
} = vendorWalletApi

