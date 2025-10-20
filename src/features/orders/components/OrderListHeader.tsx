'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { ShoppingBag } from 'lucide-react'

interface OrderListHeaderProps {
  totalOrders: number
}

export function OrderListHeader({ totalOrders }: OrderListHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-8 p-10 rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-white shadow-2xl overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-200/30 to-purple-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative flex items-center gap-6">
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-50" />
          <div className="relative p-5 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
            <ShoppingBag className="h-12 w-12 text-white" />
          </div>
        </motion.div>

        {/* Title & Badge */}
        <div className="flex-1">
          <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Đơn hàng của tôi
          </h1>
          <p className="text-slate-600 text-lg font-medium">Quản lý và theo dõi đơn hàng của bạn</p>
        </div>

        {/* Total Orders Badge */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Badge className="px-6 py-3 text-lg font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl border-2 border-white/50 rounded-2xl">
            {totalOrders} đơn hàng
          </Badge>
        </motion.div>
      </div>
    </motion.div>
  )
}
