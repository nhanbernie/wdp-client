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
      className="mb-6 p-6 rounded-lg border"
      style={{
        backgroundColor: colors.cardBackgroundSecondary,
        border: `1px solid ${colors.border}30`,
        boxShadow: `0 4px 12px ${colors.border}20`,
      }}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.textSecondary}10` }}>
          <ShoppingBag className="h-6 w-6" style={{ color: colors.textSecondary }} />
        </div>

        {/* Title & Badge */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1" style={{ color: colors.text }}>
            Đơn hàng của tôi
          </h1>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            Quản lý và theo dõi đơn hàng của bạn
          </p>
        </div>

        {/* Total Orders Badge */}
        <div
          className="px-4 py-2 rounded-lg"
          style={{
            backgroundColor: colors.cardBackgroundSecondary,
            border: `1px solid ${colors.border}30`,
            boxShadow: `0 4px 12px ${colors.border}20`,
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
