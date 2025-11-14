'use client'

import React from 'react'
import { useGetOrderDetailQuery } from '@/services/vendor/vendor.service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { useTheme } from '@/contexts/ThemeContext'

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

const paymentStatusConfig: Record<string, { label: string }> = {
  pending: { label: 'Chưa thanh toán' },
  paid: { label: 'Đã thanh toán' },
  failed: { label: 'Thanh toán thất bại' },
  refunded: { label: 'Đã hoàn tiền' },
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ orderId }) => {
  const router = useRouter()
  const { data, isLoading, error } = useGetOrderDetailQuery(orderId)
  const { colors } = useTheme()

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: colors.background }}
      >
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: colors.accent }} />
      </div>
    )
  }

  if (error || !data?.data) {
    return (
      <div className="container mx-auto py-8 px-4" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <XCircle className="w-16 h-16 mx-auto mb-4" style={{ color: colors.error }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
            Không tìm thấy đơn hàng
          </h2>
          <p className="mb-6" style={{ color: colors.textSecondary }}>
            Đơn hàng không tồn tại hoặc bạn không có quyền truy cập
          </p>
          <Button
            onClick={() => router.push('/vendor/orders')}
            style={{ backgroundColor: colors.accent, color: colors.background }}
          >
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

  const getStatusColor = (orderStatus: string) => {
    switch (orderStatus) {
      case 'delivered':
        return colors.success
      case 'cancelled':
        return colors.error
      case 'pending':
        return colors.warning
      default:
        return colors.accent
    }
  }

  const getPaymentStatusColor = (payStatus: string) => {
    switch (payStatus) {
      case 'paid':
        return colors.success
      case 'failed':
        return colors.error
      default:
        return colors.warning
    }
  }

  return (
    <div
      className="container mx-auto py-8 px-4 max-w-6xl"
      style={{ backgroundColor: colors.background }}
    >
      <div>
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/vendor/orders')}
            className="mb-4"
            style={{ color: colors.text }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: colors.text }}>
                Chi tiết đơn hàng
              </h1>
              <p style={{ color: colors.textSecondary }}>Mã đơn: {order.orderNumber}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-lg"
                style={{ backgroundColor: `${getStatusColor(order.status)}20` }}
              >
                <StatusIcon className="w-4 h-4" style={{ color: getStatusColor(order.status) }} />
                <span style={{ color: getStatusColor(order.status), fontWeight: 'bold' }}>
                  {status.label}
                </span>
              </div>
              <div
                className="px-3 py-1 rounded-lg text-center"
                style={{
                  backgroundColor: `${getPaymentStatusColor(order.paymentStatus)}20`,
                  color: getPaymentStatusColor(order.paymentStatus),
                  fontWeight: 'bold',
                }}
              >
                {paymentStatus.label}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card
              className="rounded-lg border"
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              <CardHeader
                className="p-4 border-b"
                style={{
                  borderColor: colors.border,
                }}
              >
                <CardTitle
                  className="flex items-center gap-2 text-lg"
                  style={{ color: colors.text }}
                >
                  <Package className="w-5 h-5" style={{ color: colors.accent }} />
                  Sản phẩm ({order.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 border rounded-lg transition-colors"
                      style={{
                        backgroundColor: colors.cardBackgroundSecondary,
                        borderColor: colors.border,
                      }}
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
                        <h4 className="font-semibold" style={{ color: colors.text }}>
                          {item.product?.name}
                        </h4>
                        <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                          Số lượng: {item.quantity} {item.product?.stockUnit || 'sản phẩm'}
                        </p>
                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                          Đơn giá: {parseInt(item.unitPrice).toLocaleString('vi-VN')} VND
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold" style={{ color: colors.accent }}>
                          {parseInt(item.totalPrice).toLocaleString('vi-VN')} VND
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div
                  className="mt-6 pt-6 border-t space-y-3"
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex justify-between" style={{ color: colors.textSecondary }}>
                    <span>Tạm tính:</span>
                    <span>{parseInt(order.subtotal).toLocaleString('vi-VN')} VND</span>
                  </div>
                  <div className="flex justify-between" style={{ color: colors.textSecondary }}>
                    <span>Phí vận chuyển:</span>
                    <span>{parseInt(order.shippingFee).toLocaleString('vi-VN')} VND</span>
                  </div>
                  <div
                    className="flex justify-between text-lg font-bold pt-3 border-t"
                    style={{ borderColor: colors.border }}
                  >
                    <span style={{ color: colors.text }}>Tổng cộng:</span>
                    <span style={{ color: colors.accent }}>
                      {parseInt(order.totalAmount || order.total || '0').toLocaleString('vi-VN')}{' '}
                      VND
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Notes */}
            {order.customerNotes && (
              <Card
                className="rounded-lg border"
                style={{
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                }}
              >
                <CardHeader
                  className="p-4 border-b"
                  style={{
                    borderColor: colors.border,
                  }}
                >
                  <CardTitle style={{ color: colors.text }}>Ghi chú của khách hàng</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p style={{ color: colors.textSecondary }}>{order.customerNotes}</p>
                </CardContent>
              </Card>
            )}

            {/* Vendor Notes */}
            {order.notes && (
              <Card
                className="rounded-lg border"
                style={{
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                }}
              >
                <CardHeader
                  className="p-4 border-b"
                  style={{
                    borderColor: colors.border,
                  }}
                >
                  <CardTitle style={{ color: colors.text }}>Ghi chú nội bộ</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p style={{ color: colors.textSecondary }}>{order.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card
              className="rounded-lg border"
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              <CardHeader
                className="p-4 border-b"
                style={{
                  borderColor: colors.border,
                }}
              >
                <CardTitle
                  className="flex items-center gap-2 text-lg"
                  style={{ color: colors.text }}
                >
                  <User className="w-5 h-5" style={{ color: colors.accent }} />
                  Thông tin khách hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                {order.user && (
                  <>
                    <div>
                      <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                        Tên khách hàng
                      </p>
                      <p className="font-medium" style={{ color: colors.text }}>
                        {order.user.lastName} {order.user.firstName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" style={{ color: colors.textSecondary }} />
                      <p style={{ color: colors.text }}>{order.user.phoneNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" style={{ color: colors.textSecondary }} />
                      <p className="text-sm" style={{ color: colors.text }}>
                        {order.user.email}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card
              className="rounded-lg border"
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              <CardHeader
                className="p-4 border-b"
                style={{
                  borderColor: colors.border,
                }}
              >
                <CardTitle
                  className="flex items-center gap-2 text-lg"
                  style={{ color: colors.text }}
                >
                  <MapPin className="w-5 h-5" style={{ color: colors.accent }} />
                  Thông tin giao hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                <div>
                  <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                    Địa chỉ giao hàng
                  </p>
                  <p style={{ color: colors.text }}>{order.shippingAddress}</p>
                </div>

                {order.trackingNumber && (
                  <div>
                    <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                      Mã vận đơn
                    </p>
                    <p className="font-mono" style={{ color: colors.accent }}>
                      {order.trackingNumber}
                    </p>
                  </div>
                )}

                {order.shippingProvider && (
                  <div>
                    <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                      Đơn vị vận chuyển
                    </p>
                    <p style={{ color: colors.text }}>{order.shippingProvider}</p>
                  </div>
                )}

                {order.estimatedDelivery && (
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 mt-1" style={{ color: colors.textSecondary }} />
                    <div>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        Dự kiến giao hàng
                      </p>
                      <p className="font-medium" style={{ color: colors.text }}>
                        {format(new Date(order.estimatedDelivery), 'dd/MM/yyyy', { locale: vi })}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card
              className="rounded-lg border"
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              <CardHeader
                className="p-4 border-b"
                style={{
                  borderColor: colors.border,
                }}
              >
                <CardTitle
                  className="flex items-center gap-2 text-lg"
                  style={{ color: colors.text }}
                >
                  <DollarSign className="w-5 h-5" style={{ color: colors.accent }} />
                  Thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                <div>
                  <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                    Phương thức
                  </p>
                  <p className="font-medium" style={{ color: colors.text }}>
                    {order.paymentMethod}
                  </p>
                </div>

                {order.paymentTransactionId && (
                  <div>
                    <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                      Mã giao dịch
                    </p>
                    <p className="font-mono text-sm" style={{ color: colors.text }}>
                      {order.paymentTransactionId}
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t" style={{ borderColor: colors.border }}>
                  <div
                    className="px-3 py-1 rounded-lg inline-block"
                    style={{
                      backgroundColor: `${getPaymentStatusColor(order.paymentStatus)}20`,
                      color: getPaymentStatusColor(order.paymentStatus),
                      fontWeight: 'bold',
                    }}
                  >
                    {paymentStatus.label}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card
              className="rounded-lg border"
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              <CardHeader
                className="p-4 border-b"
                style={{
                  borderColor: colors.border,
                }}
              >
                <CardTitle style={{ color: colors.text }}>Lịch sử đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colors.accent }}
                      />
                      <div className="w-0.5 h-full" style={{ backgroundColor: colors.border }} />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium" style={{ color: colors.text }}>
                        Đơn hàng được tạo
                      </p>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>
                        {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </p>
                    </div>
                  </div>

                  {order.confirmedAt && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: colors.accent }}
                        />
                        <div className="w-0.5 h-full" style={{ backgroundColor: colors.border }} />
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-medium" style={{ color: colors.text }}>
                          Đã xác nhận
                        </p>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>
                          {format(new Date(order.confirmedAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </p>
                      </div>
                    </div>
                  )}

                  {order.shippedAt && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: colors.accent }}
                        />
                        <div className="w-0.5 h-full" style={{ backgroundColor: colors.border }} />
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-medium" style={{ color: colors.text }}>
                          Đã giao cho đơn vị vận chuyển
                        </p>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>
                          {format(new Date(order.shippedAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </p>
                      </div>
                    </div>
                  )}

                  {order.deliveredAt && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: colors.success }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: colors.text }}>
                          Đã giao hàng thành công
                        </p>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>
                          {format(new Date(order.deliveredAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </p>
                      </div>
                    </div>
                  )}

                  {order.cancelledAt && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: colors.error }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: colors.text }}>
                          Đơn hàng đã bị hủy
                        </p>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>
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
      </div>
    </div>
  )
}
