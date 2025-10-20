'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone, Package } from 'lucide-react'
import type { Order } from '@/services/orders/types'

interface OrderShippingInfoProps {
  order: Order
}

export function OrderShippingInfo({ order }: OrderShippingInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Card className="border-2 border-white shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden rounded-3xl">
        <CardHeader className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border-b-2 border-slate-200 p-6">
          <CardTitle className="flex items-center text-xl font-black">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl blur-lg opacity-40" />
              <div className="relative p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="ml-4 text-slate-900">Thông tin giao hàng</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6 p-6 bg-gradient-to-br from-white to-slate-50">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-5 bg-white rounded-2xl shadow-lg border-2 border-slate-200"
          >
            <h4 className="font-black mb-3 text-slate-900 flex items-center gap-2 text-base">
              <div className="p-2 rounded-xl bg-indigo-100">
                <span className="text-indigo-600">👤</span>
              </div>
              Người nhận
            </h4>
            <p className="text-lg text-slate-700 font-bold">{order.shippingName}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-5 bg-white rounded-2xl shadow-lg border-2 border-slate-200"
          >
            <h4 className="font-black mb-3 text-slate-900 flex items-center gap-2 text-base">
              <div className="p-2 rounded-xl bg-purple-100">
                <MapPin className="h-4 w-4 text-purple-600" />
              </div>
              Địa chỉ
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {order.shippingAddress}
              {order.shippingWard && `, ${order.shippingWard}`}
              {order.shippingDistrict && `, ${order.shippingDistrict}`}
              {order.shippingCity && `, ${order.shippingCity}`}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-2xl shadow-lg border-2 border-blue-200"
            >
              <h4 className="font-black mb-2 flex items-center text-slate-900 text-sm gap-1">
                <Phone className="h-4 w-4 text-blue-600" />
                SĐT
              </h4>
              <p className="text-sm text-slate-700 font-bold">{order.shippingPhone}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl shadow-lg border-2 border-purple-200"
            >
              <h4 className="font-black mb-2 text-slate-900 text-sm">💳 Thanh toán</h4>
              <p className="text-sm text-slate-700 font-bold uppercase">{order.paymentMethod}</p>
            </motion.div>
          </div>

          {order.trackingNumber && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-5 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl shadow-lg border-2 border-amber-300"
            >
              <h4 className="font-black mb-3 text-slate-900 flex items-center gap-2 text-base">
                <Package className="h-5 w-5 text-amber-600" />
                Mã vận đơn
              </h4>
              <p className="text-sm font-mono bg-white p-4 rounded-xl shadow-sm border-2 border-amber-200 font-black text-amber-600">
                {order.trackingNumber}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
