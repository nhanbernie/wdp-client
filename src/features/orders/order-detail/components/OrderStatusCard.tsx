'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Clock, CheckCircle, MessageCircle, Calendar } from 'lucide-react'
import { statusConfig } from '../../constants/order-status.constant'
import type { Order } from '@/services/orders/types'
import { useTheme } from '@/contexts/ThemeContext'

interface OrderStatusCardProps {
  order: Order
}

export function OrderStatusCard({ order }: OrderStatusCardProps) {
  const { colors } = useTheme()
  const config = statusConfig[order.status]
  const StatusIcon = config.icon

  return (
    <Card
      className="rounded-lg border-0 overflow-hidden"
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
            <StatusIcon className="h-5 w-5" style={{ color: colors.accent }} />
          </div>
          <span style={{ color: colors.text }}>Trạng thái đơn hàng</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4" style={{ backgroundColor: colors.cardBackground }}>
        <div className="space-y-4">
          {/* Current Status */}
          <div
            className="text-center p-4 rounded-lg border"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              border: `1px solid ${colors.border}30`,
              boxShadow: `0 4px 12px ${colors.border}20`,
            }}
          >
            <p
              className="text-xs uppercase tracking-wider mb-2"
              style={{ color: colors.textSecondary }}
            >
              Trạng thái hiện tại
            </p>
            <div
              className="inline-block px-4 py-2 rounded-lg"
              style={{ backgroundColor: `${colors.accent}15` }}
            >
              <span className="text-sm font-medium" style={{ color: colors.accent }}>
                {config.label}
              </span>
            </div>
          </div>

          {/* Order Info Items */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                border: `1px solid ${colors.border}30`,
                boxShadow: `0 4px 12px ${colors.border}20`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${colors.textSecondary}10` }}
                >
                  <Package className="h-4 w-4" style={{ color: colors.textSecondary }} />
                </div>
                <p className="text-xs font-medium" style={{ color: colors.textSecondary }}>
                  Mã đơn
                </p>
              </div>
              <p className="text-sm font-bold" style={{ color: colors.text }}>
                #{order.orderNumber}
              </p>
            </div>

            <div
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                border: `1px solid ${colors.border}30`,
                boxShadow: `0 4px 12px ${colors.border}20`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${colors.textSecondary}10` }}
                >
                  <Clock className="h-4 w-4" style={{ color: colors.textSecondary }} />
                </div>
                <p className="text-xs font-medium" style={{ color: colors.textSecondary }}>
                  Ngày đặt
                </p>
              </div>
              <p className="text-sm font-bold" style={{ color: colors.text }}>
                {new Date(order.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>

          {/* Tracking Number */}
          {order.trackingNumber && (
            <div
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: colors.border,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${colors.textSecondary}10` }}
                >
                  <Package className="h-4 w-4" style={{ color: colors.textSecondary }} />
                </div>
                <p className="text-sm font-medium" style={{ color: colors.text }}>
                  Mã vận đơn
                </p>
              </div>
              <p
                className="text-sm font-mono p-3 rounded-lg border"
                style={{
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              >
                {order.trackingNumber}
              </p>
            </div>
          )}

          {/* Delivery Info */}
          {order.actualDelivery && (
            <div
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: colors.border,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${colors.success}20` }}>
                  <CheckCircle className="h-4 w-4" style={{ color: colors.success }} />
                </div>
                <p className="text-sm font-medium" style={{ color: colors.text }}>
                  Đã giao lúc
                </p>
              </div>
              <p className="text-sm font-medium" style={{ color: colors.text }}>
                {new Date(order.actualDelivery).toLocaleString('vi-VN')}
              </p>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: colors.border,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${colors.textSecondary}10` }}
                >
                  <MessageCircle className="h-4 w-4" style={{ color: colors.textSecondary }} />
                </div>
                <p className="text-sm font-medium" style={{ color: colors.text }}>
                  Ghi chú
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                {order.notes}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
