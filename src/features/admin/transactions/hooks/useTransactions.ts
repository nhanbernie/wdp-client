import { useState } from 'react'
import {
  useGetTransactionsQuery,
  useGetTransactionDetailsQuery,
  useGetTransactionAnalyticsQuery,
} from '@/services/admin/admin.api'
import type {
  TransactionFilters,
  TransactionDetails,
  TransactionAnalytics,
} from '../types'

export const useTransactions = (filters: TransactionFilters = {}) => {
  const { data, isLoading, error, refetch } = useGetTransactionsQuery(filters)

  return {
    transactions: data?.data || [],
    meta: data?.meta || {
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    },
    loading: isLoading,
    error: error ? (error as any).message || 'Failed to fetch transactions' : null,
    refetch,
  }
}

export const useTransactionDetails = (transactionId: string | null) => {
  const { data, isLoading, error, refetch } = useGetTransactionDetailsQuery(
    transactionId || '',
    { skip: !transactionId }
  )

  return {
    transaction: data as TransactionDetails | undefined,
    loading: isLoading,
    error: error ? (error as any).message || 'Failed to fetch transaction details' : null,
    refetch,
  }
}

export const useTransactionAnalytics = (
  startDate?: string,
  endDate?: string,
  groupBy: 'day' | 'week' | 'month' = 'day'
) => {
  const { data, isLoading, error, refetch } = useGetTransactionAnalyticsQuery({
    startDate,
    endDate,
    groupBy,
  })

  return {
    analytics: data as TransactionAnalytics | undefined,
    loading: isLoading,
    error: error ? (error as any).message || 'Failed to fetch transaction analytics' : null,
    refetch,
  }
}


