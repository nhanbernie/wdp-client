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
      cancelled: orders.filter((o: Order) => o.status === OrderStatus.CANCELLED).length,
    }
  }, [orders])

  // Loading State
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-8"
        style={{ backgroundColor: colors.background }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-30 animate-pulse"
              style={{
                backgroundColor: `${colors.accent}40`,
              }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="relative p-8 rounded-full shadow-2xl"
              style={{ backgroundColor: colors.cardBackground }}
            >
              <Loader2 className="h-16 w-16" style={{ color: colors.accent }} />
            </motion.div>
          </div>
          <p
            className="mt-6 text-xl font-bold"
            style={{ color: colors.text }}
          >
            Đang tải đơn hàng...
          </p>
        </motion.div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-8"
        style={{ backgroundColor: colors.background }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div
            className="p-6 rounded-3xl shadow-2xl border-2"
            style={{
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            }}
          >
            <div
              className="p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: colors.error }}
            >
              <AlertCircle className="h-10 w-10 text-white" />
            </div>
            <h3
              className="text-2xl font-black mb-2"
              style={{ color: colors.text }}
            >
              Không thể tải đơn hàng
            </h3>
            <p
              className="mb-6"
              style={{ color: colors.textSecondary }}
            >
              Vui lòng thử lại sau
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  // Get first order for progress tracker
  const firstOrder = filteredAndSortedOrders[0]

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        <OrderListHeader totalOrders={orders.length} />

        <OrderSearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dateSort={dateSort}
          onDateSortChange={setDateSort}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} counts={orderCounts} />

          {firstOrder && <OrderProgressTracker currentStatus={firstOrder.status} />}

          <TabsContent value={activeTab} className="mt-0">
            {filteredAndSortedOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div
                  className="p-8 rounded-3xl shadow-xl inline-block"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  }}
                >
                  <div className="flex items-center justify-center">
                  <Package className="h-16 w-16 mb-4" style={{ color: colors.accent }} />

                  </div>
                  <p
                    className="text-xl font-bold mb-2"
                    style={{ color: colors.text }}
                  >
                    Không có đơn hàng nào
                  </p>
                  <p style={{ color: colors.textSecondary }}>
                    Thử điều chỉnh bộ lọc hoặc tìm kiếm của bạn
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
