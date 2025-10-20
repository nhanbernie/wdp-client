import { useState, useEffect } from 'react'
import { analyticsService } from '@/services/admin'
import type { UserAnalytics, ProductAnalytics } from '../../types'

export const useAnalytics = () => {
  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics | null>(null)
  const [productAnalytics, setProductAnalytics] = useState<ProductAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      setError(null)
      const [userData, productData] = await Promise.all([
        analyticsService.getUserAnalytics(),
        analyticsService.getProductAnalytics(),
      ])
      setUserAnalytics(userData)
      setProductAnalytics(productData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  return {
    userAnalytics,
    productAnalytics,
    loading,
    error,
    refetch: fetchAnalytics,
  }
}
