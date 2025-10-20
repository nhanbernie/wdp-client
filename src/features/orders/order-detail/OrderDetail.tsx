'use client'

import { motion } from 'framer-motion'
import { Loader2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGetOrderByIdQuery } from '@/redux/slices/ordersApiSlice'

import { OrderDetailHeader } from './components/OrderDetailHeader'
import { OrderStatusCard } from './components/OrderStatusCard'
import { OrderItemsCard } from './components/OrderItemsCard'
import { OrderShippingInfo } from './components/OrderShippingInfo'
import { OrderPaymentInfo } from './components/OrderPaymentInfo'
import { OrderActionsCard } from './components/OrderActionsCard'

interface OrderDetailProps {
  orderId: string
}

export function OrderDetail({ orderId }: OrderDetailProps) {
  // Fetch order by ID from API
  const { data: orderResponse, isLoading, error } = useGetOrderByIdQuery(orderId)

  // Get order data from response
  const orderData = orderResponse?.data

  // Handlers
  const handleDownloadInvoice = () => {
    console.log('Download invoice for order:', orderId)
    // Implement download invoice logic
  }

  const handleContactSupport = () => {
    console.log('Contact support for order:', orderId)
    // Implement contact support logic
  }

  const handleReorder = () => {
    console.log('Reorder:', orderId)
    // Implement reorder logic
  }

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
          <p className="mt-6 text-xl font-bold text-slate-700">Đang tải chi tiết đơn hàng...</p>
        </motion.div>
      </div>
    )
  }

  // Error State
  if (error || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-rose-50 to-red-50 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="p-8 bg-white rounded-3xl shadow-2xl border-2 border-red-200">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-6 bg-gradient-to-br from-red-500 to-rose-600 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center"
            >
              <XCircle className="h-12 w-12 text-white" />
            </motion.div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Không thể tải đơn hàng</h3>
            <p className="text-slate-600 mb-6">Vui lòng thử lại sau</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-2xl shadow-xl"
              >
                Thử lại
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 p-8">
      <div className="max-w-7xl mx-auto">
        <OrderDetailHeader
          order={orderData}
          onDownloadInvoice={handleDownloadInvoice}
          onContactSupport={handleContactSupport}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <OrderStatusCard order={orderData} />
            <OrderItemsCard order={orderData} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <OrderShippingInfo order={orderData} />
            <OrderPaymentInfo order={orderData} />
            <OrderActionsCard
              onReorder={handleReorder}
              onContactSupport={handleContactSupport}
              onDownloadInvoice={handleDownloadInvoice}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
