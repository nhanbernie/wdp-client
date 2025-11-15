'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Sparkles, Calendar } from 'lucide-react'
import { statusConfig } from '../constants/order-status.constant'
import type { Order } from '@/services/orders/types'
import { OrderStatus } from '@/services/orders/types'
import { useTheme } from '@/contexts/ThemeContext'

interface OrderCardProps {
  order: Order
  index: number
}

// Helper function to get status colors
const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return { primary: '#F59E0B', secondary: '#F97316' } // amber/orange
    case OrderStatus.PROCESSING:
    case OrderStatus.ADMIN_CONFIRMED:
      return { primary: '#3B82F6', secondary: '#6366F1' } // blue/indigo
    case OrderStatus.SHIPPING:
      return { primary: '#6366F1', secondary: '#A855F7' } // indigo/purple
    case OrderStatus.DELIVERED:
    case OrderStatus.COMPLETED:
      return { primary: '#10B981', secondary: '#059669' } // emerald/green
    case OrderStatus.CANCELLED:
      return { primary: '#EF4444', secondary: '#F43F5E' } // red/rose
    case OrderStatus.REFUNDED:
      return { primary: '#A855F7', secondary: '#D946EF' } // purple/fuchsia
    default:
      return { primary: '#F4A800', secondary: '#F56F10' } // default accent
  }
}

export function OrderCard({ order, index }: OrderCardProps) {
  const { colors } = useTheme()
  const config = statusConfig[order.status]
  const StatusIcon = config.icon
  const statusColors = getStatusColor(order.status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="overflow-hidden border rounded-lg"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
          border: `1px solid ${colors.border}30`,
          boxShadow: `0 4px 12px ${colors.border}20`,
        }}
      >
        <CardHeader
          className="p-4 border-b"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.cardBackground,
          }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${statusColors.primary}15` }}>
                  <StatusIcon className="h-4 w-4" style={{ color: statusColors.primary }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.text }}>
                    Đơn hàng #{order.orderNumber}
                  </p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="px-3 py-1 rounded-lg"
              style={{
                backgroundColor: `${statusColors.primary}20`,
                boxShadow: `0 2px 8px ${statusColors.primary}20`,
              }}
            >
              <span className="text-xs font-semibold" style={{ color: statusColors.primary }}>
                {config.label}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4" style={{ backgroundColor: colors.cardBackground }}>
          {/* Order Items Preview */}
          <div className="space-y-2 mb-4">
            {order.items?.slice(0, 2).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                }}
              >
                <div
                  className="relative w-12 h-12 rounded-lg overflow-hidden"
                  style={{ backgroundColor: colors.border }}
                >
                  <Image
                    src={item.thumbnail || '/placeholder.png'}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm" style={{ color: colors.text }}>
                    {item.productName}
                  </p>
                  {/* Variant Name & SKU */}
                  {(item.variantName || item.sku) && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      {item.variantName && (
                        <Badge
                          className="px-2 py-0.5 text-xs font-medium capitalize"
                          style={{
                            backgroundImage: 'none',
                            backgroundColor: colors.accent + '20',
                            color: colors.accent,
                            borderColor: 'transparent',
                          }}
                        >
                          {item.variantName}
                        </Badge>
                      )}
                      {item.sku && (
                        <span
                          className="text-sm font-bold px-2 py-1 rounded"
                          style={{
                            backgroundColor: colors.cardBackgroundSecondary,
                            color: colors.text,
                          }}
                        >
                          SKU: {item.sku}
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                    SL: {item.quantity} × {item.unitPrice.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
              </div>
            ))}
            {(order.items?.length ?? 0) > 2 && (
              <p
                className="text-xs text-center py-2 rounded-lg"
                style={{
                  color: colors.textSecondary,
                  backgroundColor: colors.cardBackgroundSecondary,
                }}
              >
                +{(order.items?.length ?? 0) - 2} sản phẩm khác
              </p>
            )}
          </div>

          {/* Order Info - Footer content will be here */}
          <div className="space-y-3">
            <div
              className="flex items-center justify-between p-4 rounded-2xl shadow-sm border"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: colors.border,
              }}
            >
              <span
                className="font-medium flex items-center gap-2"
                style={{ color: colors.textSecondary }}
              >
                <Calendar className="h-4 w-4" />
                Ngày đặt:
              </span>
              <span className="font-bold" style={{ color: colors.text }}>
                {new Date(order.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>

            <div
              className="flex items-center justify-between p-5 rounded-2xl shadow-md border-2"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: colors.accent,
              }}
            >
              <span className="font-bold flex items-center gap-2" style={{ color: colors.text }}>
                <Sparkles className="h-5 w-5" style={{ color: colors.accent }} />
                Tổng tiền:
              </span>
              <span className="text-2xl font-black" style={{ color: colors.accent }}>
                {order.totalAmount.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0" style={{ backgroundColor: colors.cardBackground }}>
          <Link href={`/orders/${order.id}`} className="w-full">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full h-14 text-white font-bold text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
                style={{ backgroundColor: colors.accent }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.accentSecondary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.accent
                }}
              >
                <Eye className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Xem chi tiết
              </Button>
            </motion.div>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
