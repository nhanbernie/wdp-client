'use client'

import React from 'react'
import { useAnalytics } from './hooks'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
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
} from 'lucide-react'

export const AnalyticsPage: React.FC = () => {
  const { userAnalytics, productAnalytics, loading, error } = useAnalytics()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <BarChart3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600" />
          </div>
          <p className="mt-6 text-gray-600 font-medium">Đang tải dữ liệu phân tích...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white rounded-2xl shadow-2xl p-8 border-2 border-red-200"
        >
          <div className="p-4 bg-gradient-to-br from-red-500 to-red-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">❌</span>
          </div>
          <h3 className="text-xl font-bold text-red-600 mb-2">Có lỗi xảy ra</h3>
          <p className="text-gray-600">{error}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 space-y-6">
      {/* Modern Header with Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100"
      >
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Thống kê & Phân tích
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Phân tích dữ liệu và hiệu suất hệ thống
            </p>
          </div>
        </div>
      </motion.div>

      {/* User Analytics - Modern Design */}
      {userAnalytics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Thống kê người dùng
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Users By Role Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-900">Người dùng theo vai trò</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="flex items-center gap-2 font-semibold text-gray-700">
                      <Crown className="h-4 w-4 text-yellow-600" />
                      Admin:
                    </span>
                    <span className="font-bold text-xl text-blue-600">
                      {userAnalytics.usersByRole.admin}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="flex items-center gap-2 font-semibold text-gray-700">
                      <ShoppingBag className="h-4 w-4 text-purple-600" />
                      Vendor:
                    </span>
                    <span className="font-bold text-xl text-purple-600">
                      {userAnalytics.usersByRole.vendor}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="flex items-center gap-2 font-semibold text-gray-700">
                      <Users className="h-4 w-4 text-green-600" />
                      User:
                    </span>
                    <span className="font-bold text-xl text-green-600">
                      {userAnalytics.usersByRole.user}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Top Customers Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-900">Top khách hàng</h3>
                </div>
                <div className="space-y-3">
                  {userAnalytics.topCustomers.slice(0, 5).map((customer, index) => (
                    <motion.div
                      key={customer.userId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg font-bold text-purple-600">#{index + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate text-sm">
                            {customer.email}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                              {customer.totalOrders} đơn
                            </span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                              {(customer.totalSpent / 1000000).toFixed(1)}M
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Growth Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-green-900">Tăng trưởng</h3>
                </div>
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    className="relative inline-block"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur-xl opacity-50"></div>
                    <p className="relative text-6xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                      {userAnalytics.userGrowth}%
                    </p>
                  </motion.div>
                  <p className="text-gray-700 mt-4 font-semibold flex items-center justify-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    Tăng trưởng người dùng
                  </p>
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(userAnalytics.userGrowth, 100)}%` }}
                      transition={{ delay: 0.6, duration: 1 }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Product Analytics - Modern Design */}
      {productAnalytics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Thống kê sản phẩm
            </h2>
          </div>

          {/* Best Selling Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card className="p-6 bg-white border-2 border-orange-200 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-orange-900">Sản phẩm bán chạy nhất</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                      <th className="p-4 text-left rounded-tl-xl font-bold">#</th>
                      <th className="p-4 text-left font-bold">Tên sản phẩm</th>
                      <th className="p-4 text-right font-bold">Đã bán</th>
                      <th className="p-4 text-right rounded-tr-xl font-bold">Doanh thu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productAnalytics.bestSellingProducts.map((product, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="border-b border-orange-100 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-colors duration-200"
                      >
                        <td className="p-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white font-bold text-sm">
                            {index + 1}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-gray-900">{product.productName}</td>
                        <td className="p-4 text-right">
                          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold text-sm">
                            {product.totalSold}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-bold text-green-600 flex items-center justify-end gap-1">
                            <DollarSign className="h-4 w-4" />
                            {product.revenue.toLocaleString('vi-VN')} VND
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* Categories Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card className="p-6 bg-white border-2 border-purple-200 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900">Hiệu suất danh mục</h3>
              </div>
              <div className="space-y-4">
                {productAnalytics.categoriesPerformance.map((category, index) => (
                  <motion.div
                    key={category.categoryId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏷️'}
                          </span>
                          <p className="font-bold text-lg text-gray-900">{category.categoryName}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {category.totalProducts} sản phẩm
                          </span>
                          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                            <ShoppingBag className="h-3 w-3" />
                            {category.totalSold} đã bán
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600 mb-1">💰 Doanh thu</p>
                        <p className="font-black text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {category.revenue.toLocaleString('vi-VN')} VND
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default AnalyticsPage
