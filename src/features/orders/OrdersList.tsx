'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useGetOrdersQuery } from '@/redux/slices/ordersApiSlice'
import { OrderStatus } from '@/services/orders/types'
import type { Order } from '@/services/orders/types'

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="relative p-8 bg-white rounded-full shadow-2xl"
            >
              <Loader2 className="h-16 w-16 text-indigo-600" />
            </motion.div>
          </div>
          <p className="mt-6 text-xl font-bold text-slate-700">Đang tải đơn hàng...</p>
        </motion.div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-rose-50 to-red-50 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="p-6 bg-white rounded-3xl shadow-2xl border-2 border-red-200">
            <div className="p-4 bg-gradient-to-br from-red-500 to-rose-600 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Không thể tải đơn hàng</h3>
            <p className="text-slate-600 mb-6">Vui lòng thử lại sau</p>
          </div>
        </motion.div>
      </div>
    )
  }

  // Get first order for progress tracker
  const firstOrder = filteredAndSortedOrders[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 p-8">
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
                <div className="p-8 bg-white rounded-3xl shadow-xl border-2 border-slate-200 inline-block">
                  <p className="text-6xl mb-4">📦</p>
                  <p className="text-xl font-bold text-slate-900 mb-2">Không có đơn hàng nào</p>
                  <p className="text-slate-600">Thử điều chỉnh bộ lọc hoặc tìm kiếm của bạn</p>
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
