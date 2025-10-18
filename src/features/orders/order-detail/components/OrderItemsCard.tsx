'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, Sparkles, Truck } from 'lucide-react'
import type { Order } from '@/services/orders/types'

interface OrderItemsCardProps {
  order: Order
}

export function OrderItemsCard({ order }: OrderItemsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ y: -4 }}
    >
      <Card className="border-2 border-white shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl overflow-hidden">
        <CardHeader className="p-8 border-b-2 border-slate-200 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="flex items-center text-2xl font-black">
              <div className="relative mr-4">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-40" />
                <div className="relative p-3 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg">
                  <Package className="h-7 w-7 text-white" />
                </div>
              </div>
              <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Sản phẩm đã đặt
              </span>
            </CardTitle>
          </motion.div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-4">
            {/* Product Items */}
            {order.items?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group p-6 bg-white hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-slate-200"
              >
                <div className="flex items-center gap-6">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-slate-300 group-hover:ring-indigo-400 shadow-lg transition-all">
                    <Image
                      src={item.thumbnail || '/placeholder.png'}
                      alt={item.productName}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-xl">
                      <span className="text-white font-black text-sm">×{item.quantity}</span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2">
                      {item.productName}
                    </h4>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl">
                        <Package className="h-4 w-4 text-slate-600" />
                        <span className="text-sm font-bold text-slate-700">
                          Số lượng: {item.quantity}
                        </span>
                      </div>

                      <div className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg">
                        <span className="text-xl font-black text-white">
                          {item.totalPrice.toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <Separator className="my-6" />

            {/* Order Summary */}
            <div className="space-y-3 p-6 bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-3xl border-2 border-slate-200 shadow-inner">
              {/* Subtotal */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm"
              >
                <span className="text-slate-700 font-bold flex items-center gap-2">
                  <Package className="h-5 w-5 text-slate-600" />
                  Tạm tính:
                </span>
                <span className="text-xl font-black text-slate-900">
                  {order.subtotal.toLocaleString('vi-VN')}₫
                </span>
              </motion.div>

              {/* Shipping */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm"
              >
                <span className="text-slate-700 font-bold flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Phí vận chuyển:
                </span>
                <span className="text-xl font-black text-blue-600">
                  {order.shippingFee.toLocaleString('vi-VN')}₫
                </span>
              </motion.div>

              {/* Discount */}
              {order.discountAmount && order.discountAmount > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl shadow-sm border-2 border-emerald-200"
                >
                  <span className="text-emerald-700 font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                    Giảm giá:
                  </span>
                  <span className="text-xl font-black text-emerald-600">
                    -{order.discountAmount.toLocaleString('vi-VN')}₫
                  </span>
                </motion.div>
              )}

              <Separator className="my-4" />

              {/* Total */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-between items-center p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl"
              >
                <span className="text-white font-black text-xl flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  Tổng cộng:
                </span>
                <span className="text-3xl font-black text-white">
                  {order.totalAmount.toLocaleString('vi-VN')}₫
                </span>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
