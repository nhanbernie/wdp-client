'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useGetOrderDetailQuery } from '@/services/vendor/vendor.service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Loader2,
  ArrowLeft,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface OrderDetailPageProps {
  orderId: string
}

const statusConfig: Record<string, { label: string; icon: any; className: string }> = {
  pending: { label: 'Chờ xác nhận', icon: Clock, className: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Đang xử lý', icon: Package, className: 'bg-blue-100 text-blue-800' },
  admin_confirmed: { label: 'Đã xác nhận', icon: CheckCircle, className: 'bg-blue-100 text-blue-800' },
  shipping: { label: 'Đang giao', icon: Truck, className: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Đã giao', icon: CheckCircle, className: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Đã hủy', icon: XCircle, className: 'bg-red-100 text-red-800' },
  completed: { label: 'Hoàn thành', icon: CheckCircle, className: 'bg-green-100 text-green-800'},
}

const paymentStatusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: 'Chưa thanh toán', className: 'bg-gray-100 text-gray-800' },
  paid: { label: 'Đã thanh toán', className: 'bg-green-100 text-green-800' },
  failed: { label: 'Thanh toán thất bại', className: 'bg-red-100 text-red-800' },
  refunded: { label: 'Đã hoàn tiền', className: 'bg-orange-100 text-orange-800' },
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ orderId }) => {
  const router = useRouter()
  const { data, isLoading, error } = useGetOrderDetailQuery(orderId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error || !data?.data) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy đơn hàng</h2>
          <p className="text-gray-600 mb-6">
            Đơn hàng không tồn tại hoặc bạn không có quyền truy cập
          </p>
          <Button onClick={() => router.push('/vendor/orders')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Button>
        </div>
      </div>
    )
  }

  const order = data.data
  const status = statusConfig[order.status] || statusConfig.pending
  const paymentStatus = paymentStatusConfig[order.paymentStatus] || paymentStatusConfig.pending
  const StatusIcon = status.icon

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push('/vendor/orders')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Chi tiết đơn hàng</h1>
              <p className="text-gray-600">Mã đơn: {order.orderNumber}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={status.className}>
                <StatusIcon className="w-4 h-4 mr-1" />
                {status.label}
              </Badge>
              <Badge className={paymentStatus.className}>{paymentStatus.label}</Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Sản phẩm ({order.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product?.thumbnail || '/placeholder.png'}
                          alt={item.product?.name || 'Product'}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.product?.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Số lượng: {item.quantity} {item.product?.stockUnit || 'sản phẩm'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Đơn giá: {parseInt(item.unitPrice).toLocaleString('vi-VN')} VND
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">
                          {parseInt(item.totalPrice).toLocaleString('vi-VN')} VND
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính:</span>
                    <span>{parseInt(order.subtotal).toLocaleString('vi-VN')} VND</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển:</span>
                    <span>{parseInt(order.shippingFee).toLocaleString('vi-VN')} VND</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">
                      {parseInt(order.totalAmount || order.total || '0').toLocaleString('vi-VN')}{' '}
                      VND
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Notes */}
            {order.customerNotes && (
              <Card>
                <CardHeader>
                  <CardTitle>Ghi chú của khách hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{order.customerNotes}</p>
                </CardContent>
              </Card>
            )}

            {/* Vendor Notes */}
            {order.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Ghi chú nội bộ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{order.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Thông tin khách hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.user && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Tên khách hàng</p>
                      <p className="font-medium">
                        {order.user.lastName} {order.user.firstName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p>{order.user.phoneNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-sm">{order.user.email}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Thông tin giao hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Địa chỉ giao hàng</p>
                  <p className="text-gray-900">{order.shippingAddress}</p>
                </div>

                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Mã vận đơn</p>
                    <p className="font-mono text-blue-600">{order.trackingNumber}</p>
                  </div>
                )}

                {order.shippingProvider && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Đơn vị vận chuyển</p>
                    <p>{order.shippingProvider}</p>
                  </div>
                )}

                {order.estimatedDelivery && (
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Dự kiến giao hàng</p>
                      <p className="font-medium">
                        {format(new Date(order.estimatedDelivery), 'dd/MM/yyyy', { locale: vi })}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phương thức</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>

                {order.paymentTransactionId && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Mã giao dịch</p>
                    <p className="font-mono text-sm">{order.paymentTransactionId}</p>
                  </div>
                )}

                <div className="pt-3 border-t">
                  <Badge className={paymentStatus.className}>{paymentStatus.label}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử đơn hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <div className="w-0.5 h-full bg-gray-200" />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium">Đơn hàng được tạo</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </p>
                    </div>
                  </div>

                  {order.confirmedAt && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                        <div className="w-0.5 h-full bg-gray-200" />
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-medium">Đã xác nhận</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(order.confirmedAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </p>
                      </div>
                    </div>
                  )}

                  {order.shippedAt && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                        <div className="w-0.5 h-full bg-gray-200" />
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-medium">Đã giao cho đơn vị vận chuyển</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(order.shippedAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </p>
                      </div>
                    </div>
                  )}

                  {order.deliveredAt && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Đã giao hàng thành công</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(order.deliveredAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </p>
                      </div>
                    </div>
                  )}

                  {order.cancelledAt && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Đơn hàng đã bị hủy</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(order.cancelledAt), 'dd/MM/yyyy HH:mm', {
                            locale: vi,
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
