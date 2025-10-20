'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Sparkles, Calendar } from 'lucide-react'
import { statusConfig } from '../constants/order-status.constant'
import type { Order } from '@/services/orders/types'

interface OrderCardProps {
  order: Order
  index: number
}

export function OrderCard({ order, index }: OrderCardProps) {
  const config = statusConfig[order.status]
  const StatusIcon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Card
        className={`overflow-hidden border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl ${config.bgColor}`}
      >
        <CardHeader className="p-6 border-b-2 border-slate-200 bg-white/60 backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div
                    className={`absolute inset-0 ${config.progressColor} rounded-xl blur-md opacity-40`}
                  />
                  <div className={`relative p-2 ${config.progressColor} rounded-xl shadow-lg`}>
                    <StatusIcon className="h-5 w-5 text-white" />
                  </div>
                </motion.div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Mã đơn hàng
                  </p>
                  <p className="text-lg font-black text-slate-900">#{order.orderNumber}</p>
                </div>
              </div>
            </div>

            <Badge
              className={`${config.className} text-sm font-bold px-4 py-2 rounded-xl shadow-lg`}
            >
              {config.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Order Items Preview */}
          <div className="space-y-3 mb-6">
            {order.items?.slice(0, 2).map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md border-2 border-slate-200"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden ring-2 ring-slate-200 shadow-md">
                  <Image
                    src={item.thumbnail || '/placeholder.png'}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 truncate text-base">{item.productName}</p>
                  <p className="text-sm text-slate-600 font-medium">
                    SL: {item.quantity} × {item.unitPrice.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
              </motion.div>
            ))}
            {(order.items?.length ?? 0) > 2 && (
              <p className="text-sm text-slate-500 text-center font-medium py-2 bg-slate-50 rounded-xl">
                +{(order.items?.length ?? 0) - 2} sản phẩm khác
              </p>
            )}
          </div>

          {/* Order Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
              <span className="text-slate-600 font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Ngày đặt:
              </span>
              <span className="font-bold text-slate-900">
                {new Date(order.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>

            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-md border-2 border-indigo-200">
              <span className="text-slate-700 font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                Tổng tiền:
              </span>
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {order.totalAmount.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Link href={`/orders/${order.id}`} className="w-full">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all group">
                <Eye className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Xem chi tiết
              </Button>
            </motion.div>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
