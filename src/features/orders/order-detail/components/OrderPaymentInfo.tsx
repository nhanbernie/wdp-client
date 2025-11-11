'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Order } from '@/services/orders/types'
import { CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface OrderPaymentInfoProps {
  order: Order
}

export function OrderPaymentInfo({ order }: OrderPaymentInfoProps) {
  const { colors } = useTheme()

  const getPaymentStatusConfig = (status: string) => {
    const statusLower = status?.toLowerCase()
    if (statusLower === 'paid') {
      return {
        label: 'Đã thanh toán',
        icon: CheckCircle,
        color: colors.success,
      }
    } else if (statusLower === 'pending') {
      return {
        label: 'Đang chờ thanh toán',
        icon: Clock,
        color: colors.warning,
      }
    } else {
      return {
        label: 'Chưa thanh toán',
        icon: XCircle,
        color: colors.error,
      }
    }
  }

  const paymentStatusConfig = getPaymentStatusConfig(order.paymentStatus)
  const PaymentStatusIcon = paymentStatusConfig.icon

  return (
    <Card
      className="rounded-lg border overflow-hidden"
      style={{
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }}
    >
      <CardHeader
        className="p-4 border-b"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.cardBackground,
        }}
      >
        <CardTitle className="flex items-center text-lg font-bold">
          <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: `${colors.accent}15` }}>
            <CreditCard className="h-5 w-5" style={{ color: colors.accent }} />
          </div>
          <span style={{ color: colors.text }}>Thông tin thanh toán</span>
        </CardTitle>
      </CardHeader>
      <CardContent
        className="pt-4 p-4 space-y-4"
        style={{ backgroundColor: colors.cardBackground }}
      >
        <div
          className="flex justify-between items-center p-4 rounded-lg border"
          style={{
            backgroundColor: colors.cardBackgroundSecondary,
            borderColor: colors.border,
          }}
        >
          <span className="font-medium text-sm" style={{ color: colors.textSecondary }}>
            Phương thức:
          </span>
          <span
            className="font-bold uppercase text-sm px-3 py-1 rounded-lg"
            style={{
              backgroundColor: `${colors.accent}15`,
              color: colors.accent,
            }}
          >
            {order.paymentMethod}
          </span>
        </div>
        <div
          className="flex justify-between items-center p-4 rounded-lg border"
          style={{
            backgroundColor: colors.cardBackgroundSecondary,
            borderColor: colors.border,
          }}
        >
          <span className="font-medium text-sm" style={{ color: colors.textSecondary }}>
            Trạng thái:
          </span>
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-lg"
            style={{
              backgroundColor: `${paymentStatusConfig.color}15`,
            }}
          >
            <PaymentStatusIcon className="h-4 w-4" style={{ color: paymentStatusConfig.color }} />
            <span className="text-sm font-bold" style={{ color: paymentStatusConfig.color }}>
              {paymentStatusConfig.label}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
