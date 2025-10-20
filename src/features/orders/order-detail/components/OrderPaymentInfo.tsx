'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Order } from '@/services/orders/types'
import { CreditCard } from 'lucide-react'

interface OrderPaymentInfoProps {
  order: Order
}

export function OrderPaymentInfo({ order }: OrderPaymentInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <Card className="border-2 border-white shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden rounded-3xl">
        <CardHeader className="bg-gradient-to-r from-purple-50 via-fuchsia-50 to-purple-50 border-b-2 border-slate-200 p-6">
          <CardTitle className="flex items-center text-xl font-black">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl blur-lg opacity-40" />
              <div className="relative p-3 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl shadow-lg">
                <CreditCard className="h-7 w-7 text-white" />
              </div>
            </div>
            <span className="ml-4 text-slate-900">Thông tin thanh toán</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 p-6 bg-gradient-to-br from-white to-purple-50/30">
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center p-5 bg-white rounded-2xl shadow-lg border-2 border-slate-200"
            >
              <span className="text-slate-700 font-bold">💳 Phương thức:</span>
              <span className="font-black uppercase text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl text-sm">
                {order.paymentMethod}
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center p-5 bg-white rounded-2xl shadow-lg border-2 border-slate-200"
            >
              <span className="text-slate-700 font-bold">📊 Trạng thái:</span>
              <Badge
                className={`${
                  order.paymentStatus?.toLowerCase() === 'paid'
                    ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white shadow-xl border-2 border-white/50'
                    : order.paymentStatus?.toLowerCase() === 'pending'
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-xl border-2 border-white/50'
                    : 'bg-gradient-to-r from-red-500 via-rose-500 to-red-600 text-white shadow-xl border-2 border-white/50'
                } text-sm px-4 py-2 rounded-xl font-black`}
              >
                {order.paymentStatus?.toLowerCase() === 'paid'
                  ? '✅ Đã thanh toán'
                  : order.paymentStatus?.toLowerCase() === 'pending'
                  ? '⏳ Đang chờ thanh toán'
                  : '❌ Chưa thanh toán'}
              </Badge>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
