'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Clock, CheckCircle, MessageCircle, Calendar } from 'lucide-react'
import { statusConfig } from '../../constants/order-status.constant'
import type { Order } from '@/services/orders/types'

interface OrderStatusCardProps {
  order: Order
}

export function OrderStatusCard({ order }: OrderStatusCardProps) {
  const config = statusConfig[order.status]
  const StatusIcon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card
        className={`border-2 border-white shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl overflow-hidden ${config.bgColor}`}
      >
        <CardHeader className="p-8 border-b-2 border-slate-200 bg-white/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="flex items-center text-2xl font-black">
              <div className="relative mr-4">
                <div
                  className={`absolute inset-0 ${config.progressColor} rounded-2xl blur-lg opacity-40`}
                />
                <div className={`relative p-3 ${config.progressColor} rounded-2xl shadow-lg`}>
                  <StatusIcon className="h-7 w-7 text-white" />
                </div>
              </div>
              <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Trạng thái đơn hàng
              </span>
            </CardTitle>
          </motion.div>
        </CardHeader>

        <CardContent className="pt-8 p-8">
          <div className="space-y-6">
            {/* Current Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-slate-200"
            >
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                Trạng thái hiện tại
              </p>
              <Badge
                className={`${config.className} text-xl font-black px-6 py-3 rounded-2xl shadow-xl`}
              >
                {config.label}
              </Badge>
            </motion.div>

            {/* Order Info Items */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-white rounded-2xl shadow-lg border-2 border-slate-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-100 rounded-xl">
                    <Package className="h-5 w-5 text-indigo-600" />
                  </div>
                  <p className="text-sm font-bold text-slate-600">Mã đơn</p>
                </div>
                <p className="text-lg font-black text-slate-900">#{order.orderNumber}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-white rounded-2xl shadow-lg border-2 border-slate-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-100 rounded-xl">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <p className="text-sm font-bold text-slate-600">Ngày đặt</p>
                </div>
                <p className="text-lg font-black text-slate-900">
                  {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                </p>
              </motion.div>
            </div>

            {/* Tracking Number */}
            {order.trackingNumber && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl shadow-lg border-2 border-amber-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-xl">
                    <Package className="h-5 w-5 text-amber-600" />
                  </div>
                  <p className="text-base font-black text-slate-900">Mã vận đơn</p>
                </div>
                <p className="text-sm font-mono bg-white p-4 rounded-xl shadow-sm border-2 border-amber-200 font-black text-amber-600">
                  {order.trackingNumber}
                </p>
              </motion.div>
            )}

            {/* Delivery Info */}
            {order.actualDelivery && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 rounded-2xl shadow-lg border-2 border-emerald-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <p className="text-base font-black text-slate-900">Đã giao lúc</p>
                </div>
                <p className="text-lg font-bold text-emerald-700">
                  {new Date(order.actualDelivery).toLocaleString('vi-VN')}
                </p>
              </motion.div>
            )}

            {/* Notes */}
            {order.notes && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-blue-50 rounded-2xl shadow-lg border-2 border-blue-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-base font-black text-slate-900">Ghi chú</p>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{order.notes}</p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
