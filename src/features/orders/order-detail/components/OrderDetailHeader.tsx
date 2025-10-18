'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Download, MessageCircle, Sparkles } from 'lucide-react'
import { statusConfig } from '../../constants/order-status.constant'
import type { Order } from '@/services/orders/types'

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
  const config = statusConfig[order.status]
  const StatusIcon = config.icon

  return (
    <div className="relative mb-8">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-200/40 to-purple-200/40 rounded-full blur-3xl" />
      </div>

      <Card className="relative border-2 border-white shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-sm">
        <div className="p-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              {/* Back Button */}
              <Link href="/orders">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="h-14 px-6 rounded-2xl border-2 border-slate-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all shadow-md"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    <span className="font-bold">Quay lại</span>
                  </Button>
                </motion.div>
              </Link>

              {/* Icon & Order Number */}
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-50" />
                  <div className="relative p-5 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
                    <StatusIcon className="h-10 w-10 text-white" />
                  </div>
                </motion.div>

                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Chi tiết đơn hàng
                  </p>
                  <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    #{order.orderNumber}
                  </h1>
                </div>

                <Sparkles className="h-8 w-8 text-indigo-500" />
              </div>
            </div>

            {/* Status Badge */}
            <Badge
              className={`${config.className} text-lg font-black px-6 py-3 rounded-2xl shadow-xl`}
            >
              {config.label}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button
                onClick={onDownloadInvoice}
                className="w-full h-14 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white font-bold text-base rounded-2xl shadow-xl border-2 border-white/20"
              >
                <Download className="h-5 w-5 mr-2" />
                Tải hóa đơn
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button
                onClick={onContactSupport}
                className="w-full h-14 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-600 hover:via-indigo-600 hover:to-blue-700 text-white font-bold text-base rounded-2xl shadow-xl border-2 border-white/20"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Liên hệ hỗ trợ
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  )
}
