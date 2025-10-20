import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import { apiClient } from '../api/apiClient'

export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalUsers: number
  totalProducts: number
  pendingOrders: number
  lowStockProducts: number
  todayRevenue: number
  todayOrders: number
  todayNewUsers: number
  revenueGrowth: number
  ordersGrowth: number
}

export interface RevenueReportItem {
  date: string
  revenue: number
  orderCount: number
}

export interface RevenueReportParams {
  startDate: string
  endDate: string
  groupBy?: 'day' | 'week' | 'month' | 'year'
}

export const dashboardService = {
  /**
   * Get dashboard statistics
   */
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>(API_ENDPOINTS.ADMIN.DASHBOARD_STATS)
    return response.data
  },

  /**
   * Get revenue report
   */
  getRevenueReport: async (params: RevenueReportParams): Promise<RevenueReportItem[]> => {
    const queryParams = new URLSearchParams({
      startDate: params.startDate,
      endDate: params.endDate,
      ...(params.groupBy && { groupBy: params.groupBy }),
    })

    const response = await apiClient.get<RevenueReportItem[]>(
      `${API_ENDPOINTS.ADMIN.REVENUE_REPORT}?${queryParams}`,
    )
    return response.data
  },
}
