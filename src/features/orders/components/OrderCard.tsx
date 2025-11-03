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
import { useTheme } from '@/contexts/ThemeContext'

interface OrderCardProps {
  order: Order
  index: number
}

export function OrderCard({ order, index }: OrderCardProps) {
  const { colors } = useTheme()
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
        className="overflow-hidden border-2 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <CardHeader
          className="p-6 border-b-2"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.cardBackground,
          }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div
                    className="absolute inset-0 rounded-xl blur-md opacity-40"
                    style={{ backgroundColor: `${colors.accent}40` }}
                  />
                  <div
                    className="relative p-2 rounded-xl shadow-lg"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <StatusIcon className="h-5 w-5 text-white" />
                  </div>
                </motion.div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: colors.textSecondary }}
                  >
                    Mã đơn hàng
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{ color: colors.text }}
                  >
                    #{order.orderNumber}
                  </p>
                </div>
              </div>
            </div>

            <Badge
              className="text-sm font-bold px-4 py-2 rounded-xl shadow-lg"
              style={{
                backgroundColor: colors.accent,
                color: 'white',
              }}
            >
              {config.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6" style={{ backgroundColor: colors.cardBackground }}>
          {/* Order Items Preview */}
          <div className="space-y-3 mb-6">
            {order.items?.slice(0, 2).map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-2xl shadow-md border-2"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                }}
              >
                <div
                  className="relative w-16 h-16 rounded-xl overflow-hidden ring-2 shadow-md"
                  style={{ ringColor: colors.border }}
                >
                  <Image
                    src={item.thumbnail || '/placeholder.png'}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold truncate text-base"
                    style={{ color: colors.text }}
                  >
                    {item.productName}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: colors.textSecondary }}
                  >
                    SL: {item.quantity} × {item.unitPrice.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
              </motion.div>
            ))}
            {(order.items?.length ?? 0) > 2 && (
              <p
                className="text-sm text-center font-medium py-2 rounded-xl"
                style={{
                  color: colors.textSecondary,
                  backgroundColor: colors.cardBackgroundSecondary,
                }}
              >
                +{(order.items?.length ?? 0) - 2} sản phẩm khác
              </p>
            )}
          </div>

          {/* Order Info */}
          <div className="space-y-3">
            <div
              className="flex items-center justify-between p-4 rounded-2xl shadow-sm border"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: colors.border,
              }}
            >
              <span
                className="font-medium flex items-center gap-2"
                style={{ color: colors.textSecondary }}
              >
                <Calendar className="h-4 w-4" />
                Ngày đặt:
              </span>
              <span className="font-bold" style={{ color: colors.text }}>
                {new Date(order.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>

            <div
              className="flex items-center justify-between p-5 rounded-2xl shadow-md border-2"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: colors.accent,
              }}
            >
              <span
                className="font-bold flex items-center gap-2"
                style={{ color: colors.text }}
              >
                <Sparkles className="h-5 w-5" style={{ color: colors.accent }} />
                Tổng tiền:
              </span>
              <span
                className="text-2xl font-black"
                style={{ color: colors.accent }}
              >
                {order.totalAmount.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0" style={{ backgroundColor: colors.cardBackground }}>
          <Link href={`/orders/${order.id}`} className="w-full">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full h-14 text-white font-bold text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
                style={{ backgroundColor: colors.accent }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.accentSecondary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.accent
                }}
              >
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
