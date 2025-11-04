'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Download, MessageCircle } from 'lucide-react'
import { statusConfig } from '../../constants/order-status.constant'
import type { Order } from '@/services/orders/types'
import { useTheme } from '@/contexts/ThemeContext'

interface OrderDetailHeaderProps {
  order: Order
  onDownloadInvoice?: () => void
  onContactSupport?: () => void
}

export function OrderDetailHeader({
  order,
  onDownloadInvoice,
  onContactSupport,
}: OrderDetailHeaderProps) {
  const { colors } = useTheme()
  const config = statusConfig[order.status]
  const StatusIcon = config.icon

  return (
    <div className="mb-6">
      <Card
        className="rounded-lg border p-6"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          {/* Back Button */}
          <Link href="/orders">
            <Button
              variant="outline"
              className="h-10 px-4 rounded-lg text-sm"
              style={{
                borderColor: colors.border,
                color: colors.text,
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>

          {/* Icon & Order Number */}
          <div className="flex items-center gap-3 flex-1">
            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: `${colors.accent}15` }}
            >
              <StatusIcon className="h-5 w-5" style={{ color: colors.accent }} />
            </div>

            <div>
              <p
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: colors.textSecondary }}
              >
                Chi tiết đơn hàng
              </p>
              <h1
                className="text-2xl font-bold"
                style={{ color: colors.text }}
              >
                #{order.orderNumber}
              </h1>
            </div>
          </div>

          {/* Status Badge */}
          <div
            className="px-4 py-2 rounded-lg"
            style={{
              backgroundColor: `${colors.accent}15`,
            }}
          >
            <span
              className="text-sm font-medium"
              style={{ color: colors.accent }}
            >
              {config.label}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onDownloadInvoice}
            className="flex-1 h-10 text-sm rounded-lg"
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
            <Download className="h-4 w-4 mr-2" />
            Tải hóa đơn
          </Button>

          <Button
            onClick={onContactSupport}
            className="flex-1 h-10 text-sm rounded-lg"
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
            <MessageCircle className="h-4 w-4 mr-2" />
            Liên hệ hỗ trợ
          </Button>
        </div>
      </Card>
    </div>
  )
}
