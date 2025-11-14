import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQuery'

export interface WalletBalance {
  balance: number
  creditLimit: number
  availableBalance: number
  totalDeposited: number
  totalWithdrawn: number
  totalFeesPaid: number
}

export interface WalletBalanceResponse {
  success: boolean
  data: WalletBalance
  message: string
}

export interface CreateWithdrawalRequest {
  amount: number
  notes?: string
}

export interface WithdrawalRequest {
  id: string
  vendorId: string
  amount: number
  status: 'pending' | 'approved' | 'paid' | 'rejected' | 'cancelled'
  bankName?: string
  bankAccountNumber?: string
  accountHolderName?: string
  notes?: string
  adminNotes?: string
  approvedBy?: string
  paidBy?: string
  approvedAt?: string
  paidAt?: string
  rejectedAt?: string
  createdAt: string
  updatedAt: string
}

export interface WithdrawalRequestResponse {
  success: boolean
  message: string
  data: WithdrawalRequest
}

export interface WithdrawalRequestListResponse {
  success: boolean
  message: string
  data: WithdrawalRequest[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Wallet', 'Withdrawal'],
  endpoints: (builder) => ({
    // Get wallet balance
    getWalletBalance: builder.query<WalletBalanceResponse, void>({
      query: () => '/vendors/wallet/balance',
      providesTags: ['Wallet'],
    }),

    // Create withdrawal request
    createWithdrawalRequest: builder.mutation<WithdrawalRequestResponse, CreateWithdrawalRequest>({
      query: (body) => ({
        url: '/vendors/wallet/withdraw',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wallet', 'Withdrawal'],
    }),

    // Get withdrawal requests
    getWithdrawalRequests: builder.query<WithdrawalRequestListResponse, { page?: number; limit?: number }>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.limit) queryParams.append('limit', params.limit.toString())
        return `/vendors/wallet/withdrawals?${queryParams}`
      },
      providesTags: ['Withdrawal'],
    }),
  }),
})

export const {
  useGetWalletBalanceQuery,
  useCreateWithdrawalRequestMutation,
  useGetWithdrawalRequestsQuery,
} = walletApi


