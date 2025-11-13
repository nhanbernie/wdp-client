'use client'

import React from 'react'
import { Order } from '@/services/vendor/vendor.types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Package,
  Calendar,
  DollarSign,
  MapPin,
  User,
  Eye,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
} from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'

interface OrderCardProps {
  order: Order
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const router = useRouter()
  const { colors } = useTheme()

  const statusConfig: Record<string, { label: string; icon: any; color: string; bgColor: string }> =
    {
      pending: {
        label: 'Chờ xác nhận',
        icon: Clock,
        color: colors.warning,
        bgColor: `${colors.warning}20`,
      },
      processing: {
        label: 'Đang xử lý',
        icon: Package,
        color: colors.accent,
        bgColor: `${colors.accent}20`,
      },
      confirmed: {
        label: 'Đã xác nhận',
        icon: CheckCircle,
        color: colors.accent,
        bgColor: `${colors.accent}20`,
      },
      shipping: {
        label: 'Đang giao',
        icon: Truck,
        color: colors.accent,
        bgColor: `${colors.accent}20`,
      },
      delivered: {
        label: 'Đã giao',
        icon: CheckCircle,
        color: colors.success,
        bgColor: `${colors.success}20`,
      },
      cancelled: {
        label: 'Đã hủy',
        icon: XCircle,
        color: colors.error,
        bgColor: `${colors.error}20`,
      },
    }

  const paymentStatusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
    pending: {
      label: 'Chưa thanh toán',
      color: colors.textSecondary,
      bgColor: colors.cardBackgroundSecondary,
    },
    paid: { label: 'Đã thanh toán', color: colors.success, bgColor: `${colors.success}20` },
    failed: { label: 'Thanh toán thất bại', color: colors.error, bgColor: `${colors.error}20` },
    refunded: { label: 'Đã hoàn tiền', color: colors.warning, bgColor: `${colors.warning}20` },
  }

  const status = statusConfig[order.status] || statusConfig.pending
  const paymentStatus = paymentStatusConfig[order.paymentStatus] || paymentStatusConfig.pending
  const StatusIcon = status.icon

  return (
    <Card
      className="hover:shadow-md transition-shadow"
      style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
    >
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg" style={{ color: colors.text }}>
              {order.orderNumber}
            </h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Badge
              style={{
                backgroundColor: status.bgColor,
                color: status.color,
                backgroundImage: 'none',
                borderColor: 'transparent',
              }}
            >
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
            <Badge
              style={{
                backgroundColor: paymentStatus.bgColor,
                color: paymentStatus.color,
                backgroundImage: 'none',
                borderColor: 'transparent',
              }}
            >
              {paymentStatus.label}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          {/* Total */}
          <div
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ backgroundColor: `${colors.accent}10` }}
          >
            <span className="text-sm" style={{ color: colors.textSecondary }}>
              Tổng tiền:
            </span>
            <span className="text-lg font-bold" style={{ color: colors.accent }}>
              {parseInt(order.totalAmount || order.total || '0').toLocaleString('vi-VN')} VND
            </span>
          </div>

          {/* Customer */}
          {order.user && (
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 mt-1" style={{ color: colors.textSecondary }} />
              <div>
                <p className="text-sm font-medium" style={{ color: colors.text }}>
                  {order.user.lastName} {order.user.firstName}
                </p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {order.user.phoneNumber}
                </p>
              </div>
            </div>
          )}

          {/* Address */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-1" style={{ color: colors.textSecondary }} />
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              {order.shippingAddress}
            </p>
          </div>

          {/* Items Count */}
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" style={{ color: colors.textSecondary }} />
            <span className="text-sm" style={{ color: colors.textSecondary }}>
              {order.items.length} sản phẩm
            </span>
          </div>

          {/* View Details Button */}
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => router.push(`/vendor/orders/${order.id}`)}
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              borderColor: colors.border,
              color: colors.text,
            }}
          >
            <Eye className="w-4 h-4 mr-2" />
            Xem chi tiết
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
