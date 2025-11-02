'use client'

import React from 'react'
import { Order } from '@/services/vendor/vendor.types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Package,
  Calendar,
  DollarSign,
  MapPin,
  User,
  Eye,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
} from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useRouter } from 'next/navigation'

interface OrderCardProps {
  order: Order
}

const statusConfig: Record<string, { label: string; icon: any; className: string }> = {
  pending: { label: 'Chờ xác nhận', icon: Clock, className: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Đang xử lý', icon: Package, className: 'bg-blue-100 text-blue-800' },
  confirmed: { label: 'Đã xác nhận', icon: CheckCircle, className: 'bg-blue-100 text-blue-800' },
  shipping: { label: 'Đang giao', icon: Truck, className: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Đã giao', icon: CheckCircle, className: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Đã hủy', icon: XCircle, className: 'bg-red-100 text-red-800' },
}

const paymentStatusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: 'Chưa thanh toán', className: 'bg-gray-100 text-gray-800' },
  paid: { label: 'Đã thanh toán', className: 'bg-green-100 text-green-800' },
  failed: { label: 'Thanh toán thất bại', className: 'bg-red-100 text-red-800' },
  refunded: { label: 'Đã hoàn tiền', className: 'bg-orange-100 text-orange-800' },
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const router = useRouter()
  const status = statusConfig[order.status] || statusConfig.pending
  const paymentStatus = paymentStatusConfig[order.paymentStatus] || paymentStatusConfig.pending
  const StatusIcon = status.icon

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{order.orderNumber}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={status.className}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
            <Badge className={paymentStatus.className}>{paymentStatus.label}</Badge>
          </div>
        </div>

        <div className="space-y-3">
          {/* Total */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm text-gray-600">Tổng tiền:</span>
            <span className="text-lg font-bold text-blue-600">
              {parseInt(order.totalAmount || order.total || '0').toLocaleString('vi-VN')} VND
            </span>
          </div>

          {/* Customer */}
          {order.user && (
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {order.user.lastName} {order.user.firstName}
                </p>
                <p className="text-sm text-gray-500">{order.user.phoneNumber}</p>
              </div>
            </div>
          )}

          {/* Address */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-1" />
            <p className="text-sm text-gray-600">{order.shippingAddress}</p>
          </div>

          {/* Items Count */}
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{order.items.length} sản phẩm</span>
          </div>

          {/* View Details Button */}
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => router.push(`/vendor/orders/${order.id}`)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Xem chi tiết
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
