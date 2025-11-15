'use client'

import { motion } from 'framer-motion'
import { Loader2, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useGetOrderByIdQuery, useReorderMutation } from '@/redux/slices/ordersApiSlice'
import { cartApi } from '@/services/cart'
import { useAppDispatch } from '@/redux/hooks'
import { useTheme } from '@/contexts/ThemeContext'
import { useToast } from '@/hooks/useToast'

import { OrderDetailHeader } from './components/OrderDetailHeader'
import { OrderStatusCard } from './components/OrderStatusCard'
import { OrderItemsCard } from './components/OrderItemsCard'
import { OrderShippingInfo } from './components/OrderShippingInfo'
import { OrderPaymentInfo } from './components/OrderPaymentInfo'
import { OrderActionsCard } from './components/OrderActionsCard'
import { generateInvoicePDF } from '@/utils/invoice'

interface OrderDetailProps {
  orderId: string
}

export function OrderDetail({ orderId }: OrderDetailProps) {
  const { colors } = useTheme()
  const router = useRouter()
  const toast = useToast()
  const dispatch = useAppDispatch()
  
  // Fetch order by ID from API
  const { data: orderResponse, isLoading, error } = useGetOrderByIdQuery(orderId)

  // Reorder mutation
  const [reorder, { isLoading: isReordering }] = useReorderMutation()

  // Get order data from response
  const orderData = orderResponse?.data

  // Handlers
  const handleDownloadInvoice = async () => {
    if (orderData) {
      try {
        await generateInvoicePDF(orderData)
      } catch (error) {
        console.error('Error generating invoice:', error)
        toast.error('Không thể tải hóa đơn. Vui lòng thử lại sau.')
      }
    }
  }

  const handleContactSupport = () => {
    // Implement contact support logic
  }

  const handleReorder = async () => {
    try {
      const result = await reorder({
        orderId,
        data: { addToCart: true },
      }).unwrap()

      if (result.success) {
        // Invalidate cart tags to trigger refetch in cart page
        dispatch(cartApi.util.invalidateTags(['Cart']))

        // Show success message
        if (result.unavailableItems && result.unavailableItems.length > 0) {
          const unavailableCount = result.unavailableItems.length
          const addedCount = result.data?.addedCount || 0
          toast.success(
            `Đã thêm ${addedCount} sản phẩm vào giỏ hàng. ${unavailableCount} sản phẩm không khả dụng.`,
          )
          // Show details of unavailable items
          const unavailableNames = result.unavailableItems
            .map((item) => item.productName)
            .join(', ')
          toast.info(`Sản phẩm không khả dụng: ${unavailableNames}`)
        } else {
          toast.success(result.message || 'Đã thêm sản phẩm vào giỏ hàng thành công!')
        }

        // Navigate to cart page after a short delay
        setTimeout(() => {
          router.push('/cart')
        }, 1000)
      }
    } catch (error: any) {
      console.error('Reorder error:', error)
      toast.error(
        error?.data?.message ||
          error?.message ||
          'Không thể mua lại đơn hàng. Vui lòng thử lại sau.',
      )
    }
  }

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
                Đang tải chi tiết đơn hàng...
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Error State
  if (error || !orderData) {
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
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                }}
              >
                <div
                  className="p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${colors.error}20` }}
                >
                  <XCircle className="h-8 w-8" style={{ color: colors.error }} />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: colors.text }}
                >
                  Không thể tải đơn hàng
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: colors.textSecondary }}
                >
                  Vui lòng thử lại sau
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="text-sm rounded-lg"
                  style={{
                    backgroundColor: colors.textSecondary,
                    color: 'white',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.text
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.textSecondary
                  }}
                >
                  Thử lại
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto relative z-10 py-4 px-6">
        <OrderDetailHeader
          order={orderData}
          onDownloadInvoice={handleDownloadInvoice}
          onContactSupport={handleContactSupport}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            <OrderStatusCard order={orderData} />
            <OrderItemsCard order={orderData} />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <OrderShippingInfo order={orderData} />
            <OrderPaymentInfo order={orderData} />
            <OrderActionsCard
              order={orderData}
              onReorder={handleReorder}
              onContactSupport={handleContactSupport}
              onDownloadInvoice={handleDownloadInvoice}
              isReordering={isReordering}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
