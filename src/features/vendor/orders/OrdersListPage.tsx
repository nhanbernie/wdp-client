'use client'

import React, { useState } from 'react'
import { useVendorOrders } from './hooks/useVendorOrders'
import { OrderCard } from './components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ShoppingBag, DollarSign, Package, TrendingUp } from 'lucide-react'
import type { OrderFilters } from '@/services/vendor/vendor.types'
import { useTheme } from '@/contexts/ThemeContext'

type OrderStatus =
  | 'pending'
  | 'admin_confirmed'
  | 'shipping'
  | 'delivered'
  | 'completed'
  | 'processing'
  | 'cancelled'
  | 'refunded'

export const OrdersListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all')
  const [filters, setFilters] = useState<OrderFilters>({})
  const { colors } = useTheme()

  const { orders, statistics, isLoading, statsLoading, refetch } = useVendorOrders(
    activeTab === 'all' ? {} : { ...filters, status: activeTab },
  )

  const tabs = [
    { value: 'all', label: 'Tất cả' },
    { value: 'pending', label: 'Chờ xác nhận' },
    { value: 'admin_confirmed', label: 'Đã xác nhận' },
    { value: 'shipping', label: 'Bắt đầu giao' },
    { value: 'delivered', label: 'Đã giao hàng' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'cancelled', label: 'Đã hủy' },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div>
        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2 flex items-center gap-3"
            style={{ color: colors.text }}
          >
            <ShoppingBag className="w-8 h-8" style={{ color: colors.accent }} />
            Quản lý đơn hàng
          </h1>
          <p style={{ color: colors.textSecondary }}>Theo dõi và quản lý các đơn hàng</p>
        </div>

        {/* Statistics Cards */}
        {!statsLoading && statistics && (
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  Tổng đơn hàng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" style={{ color: colors.accent }} />
                  <span className="text-2xl font-bold" style={{ color: colors.text }}>
                    {statistics.totalOrders}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  Khách hàng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" style={{ color: colors.warning }} />
                  <span className="text-2xl font-bold" style={{ color: colors.text }}>
                    {statistics.totalCustomers}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  Doanh thu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" style={{ color: colors.success }} />
                  <span className="text-2xl font-bold" style={{ color: colors.text }}>
                    {statistics.totalRevenue.toLocaleString('vi-VN')}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  Chờ xử lý
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" style={{ color: colors.warning }} />
                  <span className="text-2xl font-bold" style={{ color: colors.text }}>
                    {(statistics.ordersByStatus?.pending || 0) +
                      (statistics.ordersByStatus?.processing || 0)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  Đã giao
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" style={{ color: colors.success }} />
                  <span className="text-2xl font-bold" style={{ color: colors.text }}>
                    {statistics.ordersByStatus?.delivered || 0}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="mb-6">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: colors.accent }} />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4" style={{ color: colors.border }} />
                <p style={{ color: colors.textSecondary }}>Chưa có đơn hàng nào</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} onStatusUpdated={refetch} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
