'use client'

import React from 'react'
import { useDashboard, useRevenueReport } from './hooks'
import { StatCard, RevenueChart } from './components'
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Clock,
  AlertTriangle,
  LayoutDashboard,
  Loader2,
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export const AdminDashboard: React.FC = () => {
  const { stats, loading, error } = useDashboard()
  const { colors } = useTheme()

  // Get revenue report for current month
  const startDate = new Date()
  startDate.setDate(1)
  const endDate = new Date()

  const { data: revenueData } = useRevenueReport({
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    groupBy: 'day',
  })

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: colors.backgroundGradient }}
      >
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin mx-auto" style={{ color: colors.accent }} />
          <p className="mt-6 font-medium text-lg" style={{ color: colors.textSecondary }}>
            Đang tải dashboard...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: colors.backgroundGradient }}
      >
        <div
          className="text-center p-8 rounded-2xl shadow-2xl"
          style={{
            background: colors.cardBackground,
            borderWidth: '2px',
            borderColor: colors.error,
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{ background: colors.error }}
          >
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
            Có lỗi xảy ra
          </h3>
          <p style={{ color: colors.error }}>{error}</p>
        </div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="space-y-8 min-h-screen p-6" style={{ background: colors.backgroundGradient }}>
      {/* Header */}
      <div
        className="p-8 rounded-2xl shadow-lg"
        style={{
          background: colors.cardBackground,
          borderLeftWidth: '4px',
          borderLeftColor: colors.accent,
        }}
      >
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl shadow-lg" style={{ background: colors.accent }}>
            <LayoutDashboard className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold" style={{ color: colors.text }}>
              Dashboard
            </h1>
            <p className="mt-2" style={{ color: colors.textSecondary }}>
              Tổng quan về hoạt động của hệ thống
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: colors.text }}>
          Thống kê tổng quan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Tổng doanh thu"
            value={`${stats.totalRevenue.toLocaleString('vi-VN')} VND`}
            icon={<DollarSign className="w-7 h-7 text-white" />}
            trend={stats.revenueGrowth}
            trendLabel="so với hôm qua"
            color="blue"
          />
          <StatCard
            title="Tổng đơn hàng"
            value={stats.totalOrders}
            icon={<ShoppingCart className="w-7 h-7 text-white" />}
            trend={stats.ordersGrowth}
            trendLabel="so với hôm qua"
            color="green"
          />
          <StatCard
            title="Tổng người dùng"
            value={stats.totalUsers}
            icon={<Users className="w-7 h-7 text-white" />}
            color="purple"
          />
          <StatCard
            title="Tổng sản phẩm"
            value={stats.totalProducts}
            icon={<Package className="w-7 h-7 text-white" />}
            color="orange"
          />
          <StatCard
            title="Đơn hàng chờ xử lý"
            value={stats.pendingOrders}
            icon={<Clock className="w-7 h-7 text-white" />}
            color="yellow"
          />
          <StatCard
            title="Sản phẩm sắp hết"
            value={stats.lowStockProducts}
            icon={<AlertTriangle className="w-7 h-7 text-white" />}
            color="red"
          />
        </div>
      </div>

      {/* Today's Stats */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: colors.text }}>
          Hoạt động hôm nay
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Doanh thu hôm nay"
            value={`${stats.todayRevenue.toLocaleString('vi-VN')} VND`}
            icon={<DollarSign className="w-7 h-7 text-white" />}
            color="blue"
          />
          <StatCard
            title="Đơn hàng hôm nay"
            value={stats.todayOrders}
            icon={<ShoppingCart className="w-7 h-7 text-white" />}
            color="green"
          />
          <StatCard
            title="Người dùng mới hôm nay"
            value={stats.todayNewUsers}
            icon={<Users className="w-7 h-7 text-white" />}
            color="purple"
          />
        </div>
      </div>

      {/* Revenue Chart */}
      {revenueData.length > 0 && <RevenueChart data={revenueData} />}
    </div>
  )
}

export default AdminDashboard
