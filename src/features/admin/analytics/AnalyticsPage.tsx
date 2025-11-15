'use client'

import React from 'react'
import { useAnalytics } from './hooks'
import { Card } from '@/components/ui/card'
import {
  BarChart3,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  ShoppingBag,
  Award,
  Crown,
  Target,
  Loader2,
  XCircle,
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export const AnalyticsPage: React.FC = () => {
  const { colors } = useTheme()
  const { userAnalytics, productAnalytics, loading, error } = useAnalytics()

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: colors.backgroundGradient }}
      >
        <div className="text-center">
          <div className="relative">
            <Loader2 className="animate-spin h-16 w-16 mx-auto" style={{ color: colors.accent }} />
          </div>
          <p className="mt-6 font-medium" style={{ color: colors.textSecondary }}>
            Đang tải dữ liệu phân tích...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: colors.backgroundGradient }}
      >
        <div
          className="text-center rounded-2xl shadow-2xl p-8 border-2"
          style={{ background: colors.cardBackground, borderColor: colors.error }}
        >
          <div
            className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
            style={{ background: colors.error }}
          >
            <XCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: colors.error }}>
            Có lỗi xảy ra
          </h3>
          <p style={{ color: colors.textSecondary }}>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 space-y-6" style={{ background: colors.backgroundGradient }}>
      {/* Modern Header with Gradient */}
      <div
        className="rounded-2xl shadow-xl p-8 border"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
          border: `1px solid ${colors.border}30`,
          boxShadow: `0 4px 12px ${colors.border}20`,
        }}
      >
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl shadow-lg" style={{ background: colors.accent }}>
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold" style={{ color: colors.text }}>
              Thống kê & Phân tích
            </h1>
            <p className="mt-2 flex items-center gap-2" style={{ color: colors.textSecondary }}>
              <TrendingUp className="h-4 w-4" />
              Phân tích dữ liệu và hiệu suất hệ thống
            </p>
          </div>
        </div>
      </div>

      {/* User Analytics - Modern Design */}
      {userAnalytics && (
        <div className="space-y-4">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl shadow-lg" style={{ background: colors.success }}>
              <Users className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold" style={{ color: colors.text }}>
              Thống kê người dùng
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Users By Role Card */}
            <div>
              <Card
                className="p-6 border-2 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  border: `1px solid ${colors.border}30`,
                  boxShadow: `0 4px 12px ${colors.border}20`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ background: colors.accent }}>
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: colors.text }}>
                    Người dùng theo vai trò
                  </h3>
                </div>
                <div className="space-y-3">
                  <div
                    className="flex justify-between items-center p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    style={{ background: colors.background }}
                  >
                    <span
                      className="flex items-center gap-2 font-semibold"
                      style={{ color: colors.text }}
                    >
                      <Crown className="h-4 w-4" style={{ color: colors.warning }} />
                      Admin:
                    </span>
                    <span className="font-bold text-xl" style={{ color: colors.accent }}>
                      {userAnalytics.usersByRole.admin}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    style={{ background: colors.background }}
                  >
                    <span
                      className="flex items-center gap-2 font-semibold"
                      style={{ color: colors.text }}
                    >
                      <ShoppingBag className="h-4 w-4" style={{ color: colors.accentSecondary }} />
                      Vendor:
                    </span>
                    <span className="font-bold text-xl" style={{ color: colors.accentSecondary }}>
                      {userAnalytics.usersByRole.vendor}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    style={{ background: colors.background }}
                  >
                    <span
                      className="flex items-center gap-2 font-semibold"
                      style={{ color: colors.text }}
                    >
                      <Users className="h-4 w-4" style={{ color: colors.success }} />
                      User:
                    </span>
                    <span className="font-bold text-xl" style={{ color: colors.success }}>
                      {userAnalytics.usersByRole.user}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Top Customers Card */}
            <div>
              <Card
                className="p-6 border-2 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  border: `1px solid ${colors.border}30`,
                  boxShadow: `0 4px 12px ${colors.border}20`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ background: colors.accentSecondary }}>
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: colors.text }}>
                    Top khách hàng
                  </h3>
                </div>
                <div className="space-y-3">
                  {userAnalytics.topCustomers.slice(0, 5).map((customer, index) => (
                    <div
                      key={customer.userId}
                      className="p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                      style={{ background: colors.background }}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className="text-lg font-bold"
                          style={{ color: colors.accentSecondary }}
                        >
                          #{index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-semibold truncate text-sm"
                            style={{ color: colors.text }}
                          >
                            {customer.email}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-semibold"
                              style={{
                                background: colors.accentSecondary + '20',
                                color: colors.accentSecondary,
                              }}
                            >
                              {customer.totalOrders} đơn
                            </span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-semibold"
                              style={{ background: colors.success + '20', color: colors.success }}
                            >
                              {(customer.totalSpent / 1000000).toFixed(1)}M
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Growth Card */}
            <div>
              <Card
                className="p-6 border-2 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  border: `1px solid ${colors.border}30`,
                  boxShadow: `0 4px 12px ${colors.border}20`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ background: colors.success }}>
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: colors.text }}>
                    Tăng trưởng
                  </h3>
                </div>
                <div className="text-center py-4">
                  <div className="relative inline-block">
                    <p className="relative text-6xl font-black" style={{ color: colors.success }}>
                      {userAnalytics.userGrowth}%
                    </p>
                  </div>
                  <p
                    className="mt-4 font-semibold flex items-center justify-center gap-2"
                    style={{ color: colors.textSecondary }}
                  >
                    <TrendingUp className="h-4 w-4" style={{ color: colors.success }} />
                    Tăng trưởng người dùng
                  </p>
                  <div
                    className="mt-4 h-2 rounded-full overflow-hidden"
                    style={{ background: colors.cardBackgroundSecondary }}
                  >
                    <div
                      className="h-full transition-all duration-1000"
                      style={{
                        width: `${Math.min(userAnalytics.userGrowth, 100)}%`,
                        background: colors.success,
                      }}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Product Analytics - Modern Design */}
      {productAnalytics && (
        <div className="space-y-4">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl shadow-lg" style={{ background: colors.warning }}>
              <Package className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold" style={{ color: colors.text }}>
              Thống kê sản phẩm
            </h2>
          </div>

          {/* Best Selling Products */}
          <div>
            <Card
              className="p-6 border-2 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                border: `1px solid ${colors.border}30`,
                boxShadow: `0 4px 12px ${colors.border}20`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ background: colors.warning }}>
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                  Sản phẩm bán chạy nhất
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr style={{ background: colors.accent, color: 'white' }}>
                      <th className="p-4 text-left rounded-tl-xl font-bold">#</th>
                      <th className="p-4 text-left font-bold">Tên sản phẩm</th>
                      <th className="p-4 text-right font-bold">Đã bán</th>
                      <th className="p-4 text-right rounded-tr-xl font-bold">Doanh thu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productAnalytics.bestSellingProducts.map((product, index) => (
                      <tr
                        key={index}
                        className="border-b hover:shadow-md transition-colors duration-200"
                        style={{ borderColor: colors.border }}
                      >
                        <td className="p-4">
                          <span
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm text-white"
                            style={{ background: colors.warning }}
                          >
                            {index + 1}
                          </span>
                        </td>
                        <td className="p-4 font-semibold" style={{ color: colors.text }}>
                          {product.productName}
                        </td>
                        <td className="p-4 text-right">
                          <span
                            className="inline-block px-3 py-1 rounded-full font-bold text-sm"
                            style={{
                              background: colors.accentSecondary + '20',
                              color: colors.accentSecondary,
                            }}
                          >
                            {product.totalSold}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <span
                            className="font-bold flex items-center justify-end gap-1"
                            style={{ color: colors.success }}
                          >
                            <DollarSign className="h-4 w-4" />
                            {product.revenue.toLocaleString('vi-VN')} VND
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Categories Performance */}
          <div>
            <Card
              className="p-6 border-2 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                border: `1px solid ${colors.border}30`,
                boxShadow: `0 4px 12px ${colors.border}20`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ background: colors.accentSecondary }}>
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                  Hiệu suất danh mục
                </h3>
              </div>
              <div className="space-y-4">
                {productAnalytics.categoriesPerformance.map((category, index) => (
                  <div
                    key={category.categoryId}
                    className="p-4 rounded-xl border-2 hover:shadow-lg transition-all duration-200"
                    style={{
                      background: colors.cardBackgroundSecondary,
                      borderColor: colors.border,
                    }}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Award
                            className="w-6 h-6"
                            style={{
                              color:
                                index === 0
                                  ? colors.warning
                                  : index === 1
                                  ? colors.textSecondary
                                  : colors.accent,
                            }}
                          />
                          <p className="font-bold text-lg" style={{ color: colors.text }}>
                            {category.categoryName}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span
                            className="px-3 py-1 rounded-full font-semibold flex items-center gap-1"
                            style={{
                              background: colors.accentSecondary + '20',
                              color: colors.accentSecondary,
                            }}
                          >
                            <Package className="h-3 w-3" />
                            {category.totalProducts} sản phẩm
                          </span>
                          <span
                            className="px-3 py-1 rounded-full font-semibold flex items-center gap-1"
                            style={{ background: colors.warning + '20', color: colors.warning }}
                          >
                            <ShoppingBag className="h-3 w-3" />
                            {category.totalSold} đã bán
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                          <DollarSign className="inline h-3 w-3" /> Doanh thu
                        </p>
                        <p className="font-black text-xl" style={{ color: colors.success }}>
                          {category.revenue.toLocaleString('vi-VN')} VND
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnalyticsPage
