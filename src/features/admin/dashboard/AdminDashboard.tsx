'use client'

import React from 'react'
import { useDashboard, useRevenueReport } from './hooks'
import { StatCard, RevenueChart } from './components'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Clock,
  AlertTriangle,
  LayoutDashboard,
  Loader2,
  Wallet,
  ArrowDown,
  CheckCircle,
  Building2,
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

      {/* Vendor & Wallet Statistics */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: colors.text }}>
          Thống kê Vendor & Ví
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Tổng số dư ví vendor"
            value={`${stats.totalWalletBalance.toLocaleString('vi-VN')} VND`}
            icon={<Wallet className="w-7 h-7 text-white" />}
            color="blue"
          />
          <StatCard
            title="Tiền đang chờ rút"
            value={`${stats.pendingWithdrawalAmount.toLocaleString('vi-VN')} VND`}
            icon={<Clock className="w-7 h-7 text-white" />}
            color="yellow"
          />
          <StatCard
            title="Tiền đã thanh toán"
            value={`${stats.totalPaidWithdrawals.toLocaleString('vi-VN')} VND`}
            icon={<CheckCircle className="w-7 h-7 text-white" />}
            color="green"
          />
          <StatCard
            title="Tổng số vendor"
            value={stats.totalVendors}
            icon={<Building2 className="w-7 h-7 text-white" />}
            color="purple"
          />
          <StatCard
            title="Yêu cầu chờ duyệt"
            value={stats.pendingWithdrawalCount}
            icon={<Clock className="w-7 h-7 text-white" />}
            color="yellow"
          />
          <StatCard
            title="Yêu cầu đã duyệt (chờ thanh toán)"
            value={stats.approvedWithdrawalCount}
            icon={<ArrowDown className="w-7 h-7 text-white" />}
            color="orange"
          />
        </div>

        {/* Vendor Statistics Table */}
        {stats.vendorWalletBalances && stats.vendorWalletBalances.length > 0 && (
          <Card style={{ background: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: colors.text }}>Thống kê theo Vendor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottomColor: colors.border }}>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>
                        Vendor
                      </th>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>
                        Trạng thái
                      </th>
                      <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>
                        Số dư khả dụng
                      </th>
                      <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>
                        Tổng phí sàn
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.vendorWalletBalances.map((vendor) => (
                      <tr
                        key={vendor.vendorId}
                        style={{ borderBottomColor: colors.border }}
                        className="hover:opacity-80"
                      >
                        <td className="py-3 px-4" style={{ color: colors.text }}>
                          {vendor.businessName}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{
                              backgroundColor:
                                vendor.status === 'approved'
                                  ? colors.success + '20'
                                  : vendor.status === 'pending'
                                  ? colors.warning + '20'
                                  : colors.error + '20',
                              color:
                                vendor.status === 'approved'
                                  ? colors.success
                                  : vendor.status === 'pending'
                                  ? colors.warning
                                  : colors.error,
                            }}
                          >
                            {vendor.status === 'approved'
                              ? 'Đã duyệt'
                              : vendor.status === 'pending'
                              ? 'Chờ duyệt'
                              : vendor.status === 'rejected'
                              ? 'Từ chối'
                              : vendor.status === 'suspended'
                              ? 'Tạm khóa'
                              : vendor.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold" style={{ color: colors.accent }}>
                          {vendor.availableBalance.toLocaleString('vi-VN')} VND
                        </td>
                        <td className="py-3 px-4 text-right font-semibold" style={{ color: colors.text }}>
                          {(vendor.totalFeesPaid || 0).toLocaleString('vi-VN')} VND
                        </td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr style={{ borderTopColor: colors.border, borderTopWidth: '2px' }}>
                      <td colSpan={2} className="py-3 px-4 font-bold" style={{ color: colors.text }}>
                        Tổng cộng
                      </td>
                      <td className="py-3 px-4 text-right font-bold" style={{ color: colors.accent }}>
                        {stats.vendorWalletBalances
                          .reduce((sum, v) => sum + v.availableBalance, 0)
                          .toLocaleString('vi-VN')}{' '}
                        VND
                      </td>
                      <td className="py-3 px-4 text-right font-bold" style={{ color: colors.success }}>
                        {stats.vendorWalletBalances
                          .reduce((sum, v) => sum + (v.totalFeesPaid || 0), 0)
                          .toLocaleString('vi-VN')}{' '}
                        VND
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
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
