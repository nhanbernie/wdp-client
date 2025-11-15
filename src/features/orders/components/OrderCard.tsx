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
        className="overflow-hidden rounded-xl"
        style={{
          backgroundColor: colors.cardBackground,
          border: `1px solid ${colors.border}20`,
        }}
      >
        <CardHeader
          className="p-4 border-b"
          style={{
            borderColor: `${colors.border}20`,
            backgroundColor: 'transparent',
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-sm font-semibold mb-0.5" style={{ color: colors.text }}>
                Đơn hàng #{order.orderNumber}
              </p>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                {new Date(order.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>

            <div
              className="px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${statusColors.primary}15`,
              }}
            >
              <span className="text-xs font-semibold" style={{ color: statusColors.primary }}>
                {config.label}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4" style={{ backgroundColor: 'transparent' }}>
          {/* Order Items Preview */}
          <div className="space-y-2 mb-4 border-b pb-4" style={{ borderColor: `${colors.border}20` }}>
            {order.items?.slice(0, 2).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3"
              >
                <div
                  className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0"
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
                  <p className="font-medium truncate text-xs mb-1" style={{ color: colors.text }}>
                    {item.productName}
                  </p>
                  {/* Variant Name & SKU */}
                  {(item.variantName || item.sku) && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.variantName && (
                        <Badge
                          className="px-2 py-0 text-xs font-medium capitalize rounded-full"
                          style={{
                            backgroundImage: 'none',
                            backgroundColor: `${colors.accent}15`,
                            color: colors.accent,
                            borderColor: 'transparent',
                          }}
                        >
                          {item.variantName}
                        </Badge>
                      )}
                      {item.sku && (
                        <span className="text-xs" style={{ color: colors.textSecondary }}>
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
                className="text-xs text-center py-1"
                style={{
                  color: colors.textSecondary,
                }}
              >
                +{(order.items?.length ?? 0) - 2} sản phẩm khác
              </p>
            )}
          </div>

          {/* Order Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: `${colors.border}20` }}>
              <span
                className="text-xs flex items-center gap-1.5"
                style={{ color: colors.textSecondary }}
              >
                <Calendar className="h-3 w-3" />
                Ngày đặt:
              </span>
              <span className="text-xs font-medium" style={{ color: colors.text }}>
                {new Date(order.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>

            <div
              className="flex items-center justify-between p-3 rounded-lg"
              style={{
                backgroundColor: `${colors.accent}10`,
              }}
            >
              <span className="font-medium flex items-center gap-1.5 text-sm" style={{ color: colors.text }}>
                Tổng tiền:
              </span>
              <span className="text-lg font-bold" style={{ color: colors.accent }}>
                {order.totalAmount.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-3" style={{ backgroundColor: 'transparent' }}>
          <Link href={`/orders/${order.id}`} className="w-full">
            <Button
              className="w-full h-10 text-white font-medium text-sm rounded-lg transition-all"
              style={{ backgroundColor: colors.accent }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.accentSecondary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.accent
              }}
            >
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              Xem chi tiết
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
