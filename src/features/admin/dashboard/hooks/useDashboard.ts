import { useState, useEffect } from 'react'
import { dashboardService } from '@/services/admin'
import type { DashboardStats, RevenueReportItem, RevenueReportParams } from '../../types'

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await dashboardService.getStats()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}

export const useRevenueReport = (params: RevenueReportParams) => {
  const [data, setData] = useState<RevenueReportItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReport = async () => {
    try {
      setLoading(true)
      setError(null)
      const report = await dashboardService.getRevenueReport(params)
      setData(report)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch revenue report')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReport()
  }, [params.startDate, params.endDate, params.groupBy])

  return {
    data,
    loading,
    error,
    refetch: fetchReport,
  }
}
