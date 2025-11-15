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
  totalWalletBalance: number
  pendingWithdrawalAmount: number
  totalPaidWithdrawals: number
  totalVendors: number
  pendingWithdrawalCount: number
  approvedWithdrawalCount: number
  vendorWalletBalances: Array<{
    vendorId: string
    businessName: string
    status: string
    balance: number
    availableBalance: number
    totalFeesPaid: number
  }>
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
