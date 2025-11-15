'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Loader2, AlertCircle, Package } from 'lucide-react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useGetOrdersQuery } from '@/redux/slices/ordersApiSlice'
import { OrderStatus } from '@/services/orders/types'
import type { Order } from '@/services/orders/types'
import { useTheme } from '@/contexts/ThemeContext'

import { OrderListHeader } from './components/OrderListHeader'
import { OrderSearchAndFilter } from './components/OrderSearchAndFilter'
import { OrderTabs } from './components/OrderTabs'
import { OrderCard } from './components/OrderCard'
import { OrderProgressTracker } from './components/OrderProgressTracker'

export function OrdersList() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateSort, setDateSort] = useState('newest')
  const { colors } = useTheme()

  // Fetch orders from API
  const {
    data: ordersResponse,
    isLoading,
    error,
  } = useGetOrdersQuery({
    page: 1,
    limit: 100,
  })

  // Get orders from response
  const orders = ordersResponse?.data || []

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders

    // Filter by active tab
    if (activeTab !== 'all') {
      filtered = filtered.filter((order: Order) => order.status === activeTab)
    }

    // Filter by status dropdown
    if (statusFilter !== 'all') {
      filtered = filtered.filter((order: Order) => order.status === statusFilter)
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order: Order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items?.some((item) =>
            item.productName.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      )
    }

    // Sort by date
    filtered = [...filtered].sort((a: Order, b: Order) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateSort === 'newest' ? dateB - dateA : dateA - dateB
    })

    return filtered
  }, [orders, activeTab, statusFilter, searchTerm, dateSort])

  // Count orders by status
  const orderCounts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o: Order) => o.status === OrderStatus.PENDING).length,
      processing: orders.filter((o: Order) => o.status === OrderStatus.PROCESSING).length,
      shipping: orders.filter((o: Order) => o.status === OrderStatus.SHIPPING).length,
      delivered: orders.filter((o: Order) => o.status === OrderStatus.DELIVERED).length,
      completed: orders.filter((o: Order) => o.status === OrderStatus.COMPLETED).length,
      cancelled: orders.filter((o: Order) => o.status === OrderStatus.CANCELLED).length,
    }
  }, [orders])

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto relative z-10 py-12 px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                <Loader2 className="h-8 w-8" style={{ color: colors.accent }} />
              </motion.div>
              <p
                className="mt-4 text-lg font-medium"
                style={{ color: colors.text }}
              >
                Đang tải đơn hàng...
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto relative z-10 py-12 px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md"
            >
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: colors.cardBackground,
                }}
              >
                <div
                  className="p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${colors.error}20` }}
                >
                  <AlertCircle className="h-8 w-8" style={{ color: colors.error }} />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: colors.text }}
                >
                  Không thể tải đơn hàng
                </h3>
                <p
                  className="text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  Vui lòng thử lại sau
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Get first order for progress tracker
  const firstOrder = filteredAndSortedOrders[0]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto relative z-10 py-4 px-6">
        <OrderListHeader totalOrders={orders.length} />

        <OrderSearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dateSort={dateSort}
          onDateSortChange={setDateSort}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} counts={orderCounts} />

          {firstOrder && <OrderProgressTracker currentStatus={firstOrder.status} />}

          <TabsContent value={activeTab} className="mt-4">
            {filteredAndSortedOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div
                  className="p-6 rounded-xl inline-block"
                  style={{
                    backgroundColor: colors.cardBackground,
                  }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: `${colors.textSecondary}10` }}
                    >
                      <Package className="h-12 w-12" style={{ color: colors.textSecondary }} />
                    </div>
                  </div>
                  <p
                    className="text-lg font-bold mb-2"
                    style={{ color: colors.text }}
                  >
                    Không có đơn hàng nào
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: colors.textSecondary }}
                  >
                    Thử điều chỉnh bộ lọc hoặc tìm kiếm của bạn
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredAndSortedOrders.map((order: Order, index: number) => (
                  <OrderCard key={order.id} order={order} index={index} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
