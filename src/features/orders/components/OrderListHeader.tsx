'use client'

import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface OrderListHeaderProps {
  totalOrders: number
}

export function OrderListHeader({ totalOrders }: OrderListHeaderProps) {
  const { colors } = useTheme()

  return (
    <div
      className="p-6 rounded-lg"
      style={{
        // backgroundColor: colors.cardBackgroundSecondary,
        // border: `1px solid ${colors.border}20`,
      }}
    >
      <div className="flex items-center gap-4">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2 flex items-center gap-3"
            style={{ color: colors.text }}
          >
            Đơn hàng của tôi
          </h1>
          <p style={{ color: colors.textSecondary }}>Quản lý và theo dõi đơn hàng của bạn</p>
        </div>

        {/* Total Orders Badge */}
        <div
          className="px-4 py-2 rounded-lg"
          style={{
            backgroundColor: colors.cardBackgroundSecondary,
            border: `1px solid ${colors.border}20`,
          }}
        >
          <span className="text-sm font-medium" style={{ color: colors.text }}>
            {totalOrders} đơn hàng
          </span>
        </div>
      </div>
    </div>
  )
}
