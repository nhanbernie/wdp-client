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
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-8 p-10 rounded-3xl shadow-2xl overflow-hidden"
      style={{
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }}
    >
      <div className="relative flex items-center gap-6">
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <div
            className="relative p-5 rounded-3xl shadow-2xl"
            style={{ backgroundColor: colors.accent }}
          >
            <ShoppingBag className="h-12 w-12 text-white" />
          </div>
        </motion.div>

        {/* Title & Badge */}
        <div className="flex-1">
          <h1
            className="text-5xl font-black mb-2"
            style={{ color: colors.text }}
          >
            Đơn hàng của tôi
          </h1>
          <p
            className="text-lg font-medium"
            style={{ color: colors.textSecondary }}
          >
            Quản lý và theo dõi đơn hàng của bạn
          </p>
        </div>

        {/* Total Orders Badge */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <div
            className="px-6 py-3 text-lg font-black text-white shadow-xl rounded-2xl inline-flex items-center justify-center"
            style={{
              backgroundColor: colors.accent,
              backgroundImage: 'none',
              borderColor: 'transparent',
            }}
          >
            {totalOrders} đơn hàng
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
