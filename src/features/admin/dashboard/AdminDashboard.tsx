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
} from 'lucide-react'

export const AdminDashboard: React.FC = () => {
  const { stats, loading, error } = useDashboard()

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto shadow-lg"></div>
          <p className="mt-6 text-gray-600 font-medium text-lg">Đang tải dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-2xl border-2 border-red-200">
          <div className="bg-gradient-to-r from-red-500 to-rose-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="space-y-8 bg-gradient-to-br from-gray-50 via-white to-primary/5 min-h-screen p-6">
      {/* Header with modern gradient */}

      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 rounded-2xl border-l-4 border-primary shadow-lg backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <LayoutDashboard className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-gray-600 mt-2 flex items-center gap-2">
                  <span className="font-semibold ">Tổng quan về hoạt động của hệ thống</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid with modern cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-3xl">📈</span> Thống kê tổng quan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatCard
              title="Tổng doanh thu"
              value={`${stats.totalRevenue.toLocaleString('vi-VN')} VND`}
              icon={<DollarSign className="w-7 h-7 text-white" />}
              trend={stats.revenueGrowth}
              trendLabel="so với hôm qua"
              color="blue"
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatCard
              title="Tổng đơn hàng"
              value={stats.totalOrders}
              icon={<ShoppingCart className="w-7 h-7 text-white" />}
              trend={stats.ordersGrowth}
              trendLabel="so với hôm qua"
              color="green"
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatCard
              title="Tổng người dùng"
              value={stats.totalUsers}
              icon={<Users className="w-7 h-7 text-white" />}
              color="purple"
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatCard
              title="Tổng sản phẩm"
              value={stats.totalProducts}
              icon={<Package className="w-7 h-7 text-white" />}
              color="orange"
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatCard
              title="Đơn hàng chờ xử lý"
              value={stats.pendingOrders}
              icon={<Clock className="w-7 h-7 text-white" />}
              color="yellow"
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatCard
              title="Sản phẩm sắp hết"
              value={stats.lowStockProducts}
              icon={<AlertTriangle className="w-7 h-7 text-white" />}
              color="red"
            />
          </div>
        </div>
      </div>

      {/* Today's Stats with modern design */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-3xl">🌟</span> Hoạt động hôm nay
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatCard
              title="Doanh thu hôm nay"
              value={`${stats.todayRevenue.toLocaleString('vi-VN')} VND`}
              icon={<DollarSign className="w-7 h-7 text-white" />}
              color="blue"
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatCard
              title="Đơn hàng hôm nay"
              value={stats.todayOrders}
              icon={<ShoppingCart className="w-7 h-7 text-white" />}
              color="green"
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatCard
              title="Người dùng mới hôm nay"
              value={stats.todayNewUsers}
              icon={<Users className="w-7 h-7 text-white" />}
              color="purple"
            />
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      {revenueData.length > 0 && <RevenueChart data={revenueData} />}
    </div>
  )
}

export default AdminDashboard
