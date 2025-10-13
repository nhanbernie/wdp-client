'use client'

import { CategorySearchParams } from '@/services/categories/category.type'
import { useGetCategoriesQuery } from '@/services/categories/categories.service'

export function useCategories(filters?: CategorySearchParams) {
  const { data, error, isLoading, isFetching, refetch } = useGetCategoriesQuery(
    filters || { page: 1, limit: 20 },
  )

  return {
    categories: data?.data?.items || [],
    pagination: data?.data?.pagination,
    loading: isLoading || isFetching,
    error,
    refetch,
  }
}
